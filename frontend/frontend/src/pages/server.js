const express = require("express");
const http = require("http");
const WebSocket = require("ws");
const pty = require("node-pty");
const os = require("os");
const path = require("path");
const fs = require("fs");

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Set the initial working directory to the user's home directory
const initialWorkingDirectory = os.homedir();

function createShell(ws, currentWorkingDirectory) {
  const shell = pty.spawn(
    process.platform === "win32" ? "powershell.exe" : "bash",
    [],
    {
      name: "xterm-color",
      cols: 80,
      rows: 30,
      cwd: currentWorkingDirectory,
      env: { ...process.env, FORCE_COLOR: "true" },
    }
  );

  shell.on("data", (data) => {
    if (ws.readyState === WebSocket.OPEN) {
      // Remove default prompt but preserve color codes
      const customizedData = data.replace(
        /[\r\n]*[\w\-\.]+@[\w\-\.]+:[\~\w\/\-\.]+[$#]\s*$/g,
        ""
      );
      ws.send(
        JSON.stringify({
          type: "output",
          content: customizedData,
        })
      );
    }
  });

  shell.on("exit", (code) => {
    console.log(`Shell process exited with code ${code}`);
    if (ws.readyState === WebSocket.OPEN) {
      ws.send(
        JSON.stringify({
          type: "shellExit",
          content: `Shell process exited with code ${code}. Reconnecting...`,
        })
      );
      // Recreate the shell after a short delay
      setTimeout(() => createShell(ws, currentWorkingDirectory), 1000);
    }
  });

  return shell;
}

wss.on("connection", (ws) => {
  console.log("New WebSocket connection established");
  let currentWorkingDirectory = initialWorkingDirectory;
  let shell = createShell(ws, currentWorkingDirectory);

  const sendPrompt = () => {
    ws.send(
      JSON.stringify({
        type: "prompt",
        content: `\r\n\x1b[1;32magent ai \x1b[1;34m${path.basename(
          currentWorkingDirectory
        )}\x1b[0m $ `,
      })
    );
  };

  const sendDirectoryUpdate = () => {
    ws.send(
      JSON.stringify({
        type: "directoryUpdate",
        content: currentWorkingDirectory,
      })
    );
  };

  ws.on("message", (msg) => {
    try {
      const { type, content } = JSON.parse(msg);
      if (type === "input") {
        const command = content.trim();
        if (command.startsWith("cd ")) {
          const newDir = command.slice(3).trim();
          const newPath = path.resolve(currentWorkingDirectory, newDir);
          if (fs.existsSync(newPath) && fs.statSync(newPath).isDirectory()) {
            currentWorkingDirectory = newPath;
            shell.write(`${command}\n`);
            sendDirectoryUpdate();
          } else {
            ws.send(
              JSON.stringify({
                type: "output",
                content: `\nDirectory not found: ${newDir}\n`,
              })
            );
            sendPrompt();
          }
        } else if (command === "exit") {
          if (currentWorkingDirectory !== initialWorkingDirectory) {
            currentWorkingDirectory = initialWorkingDirectory;
            shell.write(`cd "${initialWorkingDirectory}"\n`);
            ws.send(
              JSON.stringify({
                type: "output",
                content: "\nReturned to initial directory.\n",
              })
            );
            sendDirectoryUpdate();
          } else {
            ws.send(
              JSON.stringify({
                type: "output",
                content: "\nAlready in the initial directory.\n",
              })
            );
          }
          sendPrompt();
        } else {
          shell.write(`${command}\n`);
        }
      } else if (type === "resize") {
        shell.resize(content.cols, content.rows);
      }
    } catch (error) {
      console.error("Error processing message:", error);
    }
  });

  ws.on("close", () => {
    console.log("WebSocket connection closed");
    shell.kill();
  });

  // Send initial prompt and directory
  sendDirectoryUpdate();
  sendPrompt();
});

const PORT = process.env.PORT || 3001;

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

server.on("error", (error) => {
  console.error("Server error:", error);
});

process.on("uncaughtException", (error) => {
  console.error("Uncaught exception:", error);
});

process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
});
