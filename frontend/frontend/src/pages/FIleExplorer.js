import React, { useState, useEffect, useCallback, useMemo } from "react";
import {
  VscNewFile,
  VscNewFolder,
  VscFolder,
  VscFolderOpened,
  VscFile,
  VscTrash,
  VscEdit,
  VscCopy,
  VscChevronRight,
  VscChevronDown,
  VscClose,
  VscRefresh,
} from "react-icons/vsc";
import {
  SiJavascript,
  SiPython,
  SiHtml5,
  SiCss3,
  SiJson,
  SiReact,
  SiTypescript,
  SiMarkdown,
} from "react-icons/si";
import localforage from "localforage";

const getFileIcon = (name) => {
  const extension = name.split(".").pop().toLowerCase();
  switch (extension) {
    case "js":
      return <SiJavascript className="icon" style={{ color: "#F0DB4F" }} />;
    case "py":
      return <SiPython className="icon" style={{ color: "#3776AB" }} />;
    case "html":
      return <SiHtml5 className="icon" style={{ color: "#E34F26" }} />;
    case "css":
      return <SiCss3 className="icon" style={{ color: "#1572B6" }} />;
    case "json":
      return <SiJson className="icon" style={{ color: "#000000" }} />;
    case "jsx":
    case "tsx":
      return <SiReact className="icon" style={{ color: "#61DAFB" }} />;
    case "ts":
      return <SiTypescript className="icon" style={{ color: "#3178C6" }} />;
    case "md":
      return <SiMarkdown className="icon" style={{ color: "#000000" }} />;
    default:
      return <VscFile className="icon" />;
  }
};

const getFolderColor = (name) => {
  const lowerName = name.toLowerCase();
  if (lowerName.includes("src")) return "#C8C8C8";
  if (lowerName.includes("components")) return "#61DAFB";
  if (lowerName.includes("pages")) return "#F0DB4F";
  if (lowerName.includes("utils")) return "#3776AB";
  if (lowerName.includes("styles")) return "#1572B6";
  if (lowerName.includes("assets")) return "#E34F26";
  if (lowerName.includes("tests")) return "#FF6347";
  return "#C8C8C8";
};

function FileExplorer() {
  const [fileSystem, setFileSystem] = useState({});
  const [expandedFolders, setExpandedFolders] = useState({});
  const [selectedItem, setSelectedItem] = useState(null);
  const [contextMenu, setContextMenu] = useState(null);
  const [showRootPrompt, setShowRootPrompt] = useState(true);
  const [newItem, setNewItem] = useState(null);
  const [renamingItem, setRenamingItem] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    loadFileSystem();
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  useEffect(() => {
    saveFileSystem(fileSystem);
    setShowRootPrompt(Object.keys(fileSystem).length === 0);
  }, [fileSystem]);

  const handleClickOutside = useCallback(
    (event) => {
      if (contextMenu && !event.target.closest(".context-menu")) {
        setContextMenu(null);
      }
      if (newItem && !event.target.closest(".new-item-input")) {
        setNewItem(null);
      }
      if (renamingItem && !event.target.closest(".rename-form")) {
        setRenamingItem(null);
      }
    },
    [contextMenu, newItem, renamingItem]
  );

  const loadFileSystem = async () => {
    try {
      const savedFileSystem = await localforage.getItem("fileSystem");
      if (savedFileSystem && Object.keys(savedFileSystem).length > 0) {
        setFileSystem(savedFileSystem);
        setExpandedFolders({ "": true });
        setShowRootPrompt(false);
      } else {
        setShowRootPrompt(true);
      }
    } catch (error) {
      console.error("Error loading file system:", error);
    }
  };

  const saveFileSystem = async (newFileSystem) => {
    try {
      await localforage.setItem("fileSystem", newFileSystem);
    } catch (error) {
      console.error("Error saving file system:", error);
    }
  };

  const createItem = (type, path = "") => {
    setNewItem({ type, path });
    setExpandedFolders((prev) => ({ ...prev, [path]: true }));
    setShowRootPrompt(false);
  };

  const handleNewItemSubmit = (e) => {
    e.preventDefault();
    const name = e.target.itemName.value.trim();
    if (name && newItem) {
      setFileSystem((prevFileSystem) => {
        const newFileSystem = { ...prevFileSystem };
        let current = newFileSystem;
        if (newItem.path) {
          const parts = newItem.path.split("/");
          for (const part of parts) {
            current = current[part].children;
          }
        }
        current[name] =
          newItem.type === "file"
            ? { type: "file", content: "" }
            : { type: "folder", children: {} };
        return newFileSystem;
      });

      if (newItem.type === "folder") {
        setExpandedFolders((prev) => ({
          ...prev,
          [newItem.path ? `${newItem.path}/${name}` : name]: true,
        }));
      }
      setNewItem(null);
    }
  };

  const startRenaming = (path) => {
    setRenamingItem(path);
    setContextMenu(null);
  };

  const handleRenameSubmit = (e, path) => {
    e.preventDefault();
    const newName = e.target.newName.value.trim();
    if (newName && newName !== path.split("/").pop()) {
      renameItem(path, newName);
    }
    setRenamingItem(null);
  };

  const renameItem = (path, newName) => {
    setFileSystem((prevFileSystem) => {
      const newFileSystem = { ...prevFileSystem };
      const parts = path.split("/");
      const oldName = parts.pop();
      let current = newFileSystem;

      for (const part of parts) {
        current = current[part].children;
      }

      current[newName] = { ...current[oldName] };
      delete current[oldName];

      return newFileSystem;
    });

    if (path === selectedItem) {
      const newPath = path.split("/").slice(0, -1).concat(newName).join("/");
      setSelectedItem(newPath);
    }

    setExpandedFolders((prev) => {
      const newExpanded = { ...prev };
      if (newExpanded[path]) {
        const newPath = path.split("/").slice(0, -1).concat(newName).join("/");
        delete newExpanded[path];
        newExpanded[newPath] = true;
      }
      return newExpanded;
    });
  };

  const deleteItem = (path) => {
    setFileSystem((prevFileSystem) => {
      const newFileSystem = { ...prevFileSystem };
      const parts = path.split("/");
      const name = parts.pop();
      let current = newFileSystem;
      for (const part of parts) {
        if (!current[part]) return prevFileSystem;
        current = current[part].children;
      }
      if (current[name]) {
        delete current[name];
        if (path === selectedItem) {
          setSelectedItem(null);
        }
        setExpandedFolders((prev) => {
          const newExpanded = { ...prev };
          Object.keys(newExpanded).forEach((key) => {
            if (key === path || key.startsWith(`${path}/`)) {
              delete newExpanded[key];
            }
          });
          return newExpanded;
        });
      }
      return newFileSystem;
    });
  };

  const toggleFolder = (path) => {
    setExpandedFolders((prev) => ({
      ...prev,
      [path]: !prev[path],
    }));
  };

  const handleItemClick = (e, path, isFolder) => {
    e.stopPropagation();
    setSelectedItem(path);
    if (isFolder) {
      toggleFolder(path);
    } else {
      console.log(`Opening file: ${path}`);
    }
  };

  const handleContextMenu = (e, path, isFolder) => {
    e.preventDefault();
    setContextMenu({
      x: e.clientX,
      y: e.clientY,
      path,
      isFolder,
    });
  };

  const handleDragStart = (e, path) => {
    e.dataTransfer.setData("text/plain", path);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, targetPath) => {
    e.preventDefault();
    const sourcePath = e.dataTransfer.getData("text/plain");
    if (sourcePath !== targetPath) {
      moveItem(sourcePath, targetPath);
    }
  };

  const moveItem = (sourcePath, targetPath) => {
    setFileSystem((prevFileSystem) => {
      const newFileSystem = { ...prevFileSystem };
      const sourceItem = getItemByPath(newFileSystem, sourcePath);
      const targetItem = getItemByPath(newFileSystem, targetPath);

      if (sourceItem && targetItem && targetItem.type === "folder") {
        const sourceParent = getParentByPath(newFileSystem, sourcePath);
        const sourceName = sourcePath.split("/").pop();

        delete sourceParent[sourceName];
        targetItem.children[sourceName] = sourceItem;
      }

      return newFileSystem;
    });
  };

  const getItemByPath = (fileSystem, path) => {
    const parts = path.split("/");
    let current = fileSystem;
    for (const part of parts) {
      if (!current[part]) return null;
      current = current[part].children || current[part];
    }
    return current;
  };

  const getParentByPath = (fileSystem, path) => {
    const parts = path.split("/");
    parts.pop();
    let current = fileSystem;
    for (const part of parts) {
      if (!current[part]) return null;
      current = current[part].children;
    }
    return current;
  };

  const refreshFileSystem = useCallback(async () => {
    setIsRefreshing(true);
    try {
      await loadFileSystem();
    } catch (error) {
      console.error("Error refreshing file system:", error);
    } finally {
      setIsRefreshing(false);
    }
  }, []);

  const renderFileSystem = useCallback(
    (fs, path = "", depth = 0) => {
      return (
        <>
          {Object.entries(fs).map(([name, item]) => {
            const itemPath = path ? `${path}/${name}` : name;
            const isFolder = item.type === "folder";
            const isSelected = itemPath === selectedItem;
            const isExpanded = expandedFolders[itemPath];
            const folderColor = getFolderColor(name);

            return (
              <div
                key={itemPath}
                className="file-system-item"
                style={{ paddingLeft: `${depth * 16}px` }}
              >
                <div
                  className={`${isFolder ? "folder-header" : "file-entry"} ${
                    isSelected ? "selected" : ""
                  }`}
                  onClick={(e) => handleItemClick(e, itemPath, isFolder)}
                  onContextMenu={(e) =>
                    handleContextMenu(e, itemPath, isFolder)
                  }
                  draggable
                  onDragStart={(e) => handleDragStart(e, itemPath)}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, itemPath)}
                >
                  {isFolder && (
                    <span
                      className="folder-arrow"
                      onClick={() => toggleFolder(itemPath)}
                    >
                      {isExpanded ? <VscChevronDown /> : <VscChevronRight />}
                    </span>
                  )}
                  {isFolder ? (
                    isExpanded ? (
                      <VscFolderOpened
                        className="icon"
                        style={{ color: folderColor }}
                      />
                    ) : (
                      <VscFolder
                        className="icon"
                        style={{ color: folderColor }}
                      />
                    )
                  ) : (
                    getFileIcon(name)
                  )}
                  {renamingItem === itemPath ? (
                    <form
                      onSubmit={(e) => handleRenameSubmit(e, itemPath)}
                      className="rename-form"
                    >
                      <input
                        type="text"
                        name="newName"
                        defaultValue={name}
                        autoFocus
                        onBlur={() => setRenamingItem(null)}
                      />
                    </form>
                  ) : (
                    <span className="item-name">{name}</span>
                  )}
                </div>
                {isFolder && isExpanded && (
                  <div className="folder-contents">
                    {renderFileSystem(item.children, itemPath, depth + 1)}
                  </div>
                )}
              </div>
            );
          })}
          {newItem && newItem.path === path && (
            <div
              className="new-item-input"
              style={{ paddingLeft: `${depth * 16}px` }}
            >
              <form onSubmit={handleNewItemSubmit}>
                <input
                  type="text"
                  name="itemName"
                  autoFocus
                  placeholder={`Enter ${newItem.type} name...`}
                  onBlur={() => setNewItem(null)}
                />
              </form>
            </div>
          )}
        </>
      );
    },
    [
      newItem,
      renamingItem,
      expandedFolders,
      selectedItem,
      handleItemClick,
      handleContextMenu,
      handleDragStart,
      handleDrop,
      toggleFolder,
    ]
  );

  return (
    <div className="file-explorer">
      <div className="explorer-header">
        <h2>EXPLORER</h2>
        <div className="header-actions">
          <button
            className={`refresh-button ${isRefreshing ? "refreshing" : ""}`}
            onClick={refreshFileSystem}
            title="Refresh"
            disabled={isRefreshing}
          >
            <VscRefresh />
          </button>
          <VscNewFolder
            className="icon"
            onClick={() => createItem("folder", "")}
            title="New Folder"
          />
          <VscNewFile
            className="icon"
            onClick={() => createItem("file", "")}
            title="New File"
          />
        </div>
      </div>
      {showRootPrompt ? (
        <div className="root-prompt">
          <h2>Welcome!</h2>
          <button onClick={() => createItem("folder", "")}>
            <VscNewFolder className="icon" /> Create Folder
          </button>
        </div>
      ) : (
        <div className="file-system-container">
          {renderFileSystem(fileSystem)}
        </div>
      )}
      {contextMenu && (
        <div
          className="context-menu"
          style={{ top: contextMenu.y, left: contextMenu.x }}
        >
          <div className="context-menu-header">
            <span>Actions</span>
            <VscClose
              className="close-icon"
              onClick={() => setContextMenu(null)}
            />
          </div>
          {contextMenu.isFolder && (
            <>
              <div
                onClick={() => {
                  createItem("file", contextMenu.path);
                  setContextMenu(null);
                }}
              >
                <VscNewFile className="icon" /> New File
              </div>
              <div
                onClick={() => {
                  createItem("folder", contextMenu.path);
                  setContextMenu(null);
                }}
              >
                <VscNewFolder className="icon" /> New Folder
              </div>
            </>
          )}
          <div
            onClick={() => {
              startRenaming(contextMenu.path);
              setContextMenu(null);
            }}
          >
            <VscEdit className="icon" /> Rename
          </div>
          <div
            onClick={() => {
              /* Implement copy functionality */
              setContextMenu(null);
            }}
          >
            <VscCopy className="icon" /> Copy
          </div>
          <div
            onClick={() => {
              deleteItem(contextMenu.path);
              setContextMenu(null);
            }}
          >
            <VscTrash className="icon" /> Delete
          </div>
        </div>
      )}
    </div>
  );
}

export default FileExplorer;
