import React, { useState, useEffect } from "react";

const problems = [
  {
    id: 1,
    title: "Two Sum",
    difficulty: "Easy",
    acceptance: "47.2%",
    completed: false,
    description:
      "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
    examples: [
      { input: "[2,7,11,15], target = 9", output: "[0,1]" },
      { input: "[3,2,4], target = 6", output: "[1,2]" },
    ],
    starterCode: {
      python: "def twoSum(nums, target):\n    # Write your code here\n    pass",
      javascript:
        "function twoSum(nums, target) {\n    // Write your code here\n}",
      java: "class Solution {\n    public int[] twoSum(int[] nums, int target) {\n        // Write your code here\n        return new int[]{0,0};\n    }\n}",
      cpp: "#include <vector>\nclass Solution {\npublic:\n    vector<int> twoSum(vector<int>& nums, int target) {\n        // Write your code here\n        return {0,0};\n    }\n};",
    },
  },
  {
    id: 2,
    title: "Palindrome Number",
    difficulty: "Easy",
    acceptance: "52.8%",
    completed: false,
    description:
      "Given an integer x, return true if x is a palindrome, and false otherwise.",
    examples: [
      { input: "121", output: "true" },
      { input: "-121", output: "false" },
    ],
    starterCode: {
      python: "def isPalindrome(x):\n    # Write your code here\n    pass",
      javascript: "function isPalindrome(x) {\n    // Write your code here\n}",
      java: "class Solution {\n    public boolean isPalindrome(int x) {\n        // Write your code here\n        return false;\n    }\n}",
      cpp: "class Solution {\npublic:\n    bool isPalindrome(int x) {\n        // Write your code here\n        return false;\n    }\n};",
    },
  },
];

const languages = [
  { value: "python", label: "Python" },
  { value: "javascript", label: "JavaScript" },
  { value: "java", label: "Java" },
  { value: "cpp", label: "C++" },
  { value: "c", label: "C" },
  { value: "csharp", label: "C#" },
  { value: "typescript", label: "TypeScript" },
  { value: "go", label: "Go" },
  { value: "rust", label: "Rust" },
  { value: "ruby", label: "Ruby" },
  { value: "php", label: "PHP" },
  { value: "swift", label: "Swift" },
  { value: "kotlin", label: "Kotlin" },
  { value: "r", label: "R" },
  { value: "dart", label: "Dart" },
  { value: "scala", label: "Scala" },
  { value: "perl", label: "Perl" },
  { value: "haskell", label: "Haskell" },
  { value: "lua", label: "Lua" },
  { value: "elixir", label: "Elixir" },
  { value: "sql", label: "SQL" },
  { value: "shell", label: "Shell Script" },
  { value: "matlab", label: "MATLAB" },
  { value: "objectivec", label: "Objective-C" },
  { value: "groovy", label: "Groovy" },
  { value: "fsharp", label: "F#" },
  { value: "coffeescript", label: "CoffeeScript" },
  { value: "clojure", label: "Clojure" },
  { value: "vbnet", label: "VB.NET" },
  { value: "assembly", label: "Assembly" },
  { value: "julia", label: "Julia" },
  { value: "fortran", label: "Fortran" },
  { value: "lisp", label: "Lisp" },
  { value: "ada", label: "Ada" },
  { value: "pascal", label: "Pascal" },
];

// --------------------------------------------------------------------
// Component: ProblemList
// --------------------------------------------------------------------
const ProblemList = ({ onProblemSelect }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("All");
  const [problemsState, setProblemsState] = useState(problems);

  const handleProblemClick = (problem) => {
    onProblemSelect(problem);
  };

  const toggleCompletion = (e, problemId) => {
    e.stopPropagation();
    setProblemsState((prevProblems) =>
      prevProblems.map((prob) =>
        prob.id === problemId ? { ...prob, completed: !prob.completed } : prob
      )
    );
  };

  const filteredProblems = problemsState.filter((problem) => {
    const matchesSearch = problem.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesDifficulty =
      selectedDifficulty === "All" || problem.difficulty === selectedDifficulty;
    return matchesSearch && matchesDifficulty;
  });

  return (
    <div style={styles.problemListContainer}>
      <div style={styles.filterSection}>
        <input
          type="text"
          placeholder="Search problems..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={styles.searchInput}
        />
        <div style={styles.difficultyFilters}>
          {["All", "Easy", "Medium", "Hard"].map((difficulty) => (
            <button
              key={difficulty}
              onClick={() => setSelectedDifficulty(difficulty)}
              style={{
                ...styles.filterButton,
                backgroundColor:
                  selectedDifficulty === difficulty
                    ? "rgba(56, 189, 248, 0.2)"
                    : "transparent",
              }}
            >
              {difficulty}
            </button>
          ))}
        </div>
      </div>

      <div style={styles.problemList}>
        <div style={styles.problemListHeader}>
          <div style={styles.headerCell}>Status</div>
          <div style={styles.headerCell}>Title</div>
          <div style={styles.headerCell}>Difficulty</div>
          <div style={styles.headerCell}>Acceptance</div>
        </div>
        {filteredProblems.map((problem) => (
          <div
            key={problem.id}
            style={styles.problemRow}
            onClick={() => handleProblemClick(problem)}
          >
            <div style={styles.cell}>
              <div
                onClick={(e) => toggleCompletion(e, problem.id)}
                style={styles.checkbox}
              >
                {problem.completed ? "✓" : ""}
              </div>
            </div>
            <div style={{ ...styles.cell, color: "#2196f3" }}>
              {problem.title}
            </div>
            <div
              style={{
                ...styles.cell,
                color:
                  problem.difficulty === "Easy"
                    ? "#00b8a3"
                    : problem.difficulty === "Medium"
                    ? "#ffc01e"
                    : "#ff375f",
              }}
            >
              {problem.difficulty}
            </div>
            <div style={styles.cell}>{problem.acceptance}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

// --------------------------------------------------------------------
// Component: CodingInterface
// --------------------------------------------------------------------
const CodingInterface = ({ problem, onBack }) => {
  const [state, setState] = useState({
    language: "python",
    code: "",
    output: "",
    isRunning: false,
    showDescription: true,
  });

  useEffect(() => {
    setState((prev) => ({
      ...prev,
      code: problem.starterCode[state.language] || "",
    }));
  }, [state.language, problem]);

  const handleRunCode = async () => {
    setState((prev) => ({ ...prev, isRunning: true, output: "Running..." }));

    try {
      const response = await fetch("http://localhost:5000/compile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          language: state.language,
          code: state.code,
        }),
      });

      const data = await response.json();
      setState((prev) => ({
        ...prev,
        isRunning: false,
        output: data.error || data.output || "Execution completed",
      }));
    } catch (error) {
      setState((prev) => ({
        ...prev,
        isRunning: false,
        output: "Error: Could not connect to the server",
      }));
    }
  };

  return (
    <div style={styles.codingInterface}>
      <div style={styles.navbar}>
        <button onClick={onBack} style={styles.backButton}>
          ← Problems
        </button>
        <button
          onClick={() =>
            setState((prev) => ({
              ...prev,
              showDescription: !prev.showDescription,
            }))
          }
          style={styles.toggleButton}
        >
          {state.showDescription ? "◀" : "▶"}
        </button>
      </div>

      <div style={styles.mainContent}>
        {state.showDescription && (
          <div style={styles.descriptionPanel}>
            <h1 style={styles.problemTitle}>{problem.title}</h1>
            <span
              style={{
                ...styles.difficultyBadge,
                backgroundColor:
                  problem.difficulty === "Easy"
                    ? "#00b8a3"
                    : problem.difficulty === "Medium"
                    ? "#ffc01e"
                    : "#ff375f",
              }}
            >
              {problem.difficulty}
            </span>

            <div style={styles.description}>{problem.description}</div>

            <div style={styles.examples}>
              <h3>Examples:</h3>
              {problem.examples.map((example, idx) => (
                <div key={idx} style={styles.exampleBox}>
                  <div>Input: {example.input}</div>
                  <div>Output: {example.output}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div style={styles.editorPanel}>
          <div style={styles.toolbar}>
            <select
              value={state.language}
              onChange={(e) =>
                setState((prev) => ({ ...prev, language: e.target.value }))
              }
              style={styles.languageSelect}
            >
              {languages.map((lang) => (
                <option key={lang.value} value={lang.value}>
                  {lang.label}
                </option>
              ))}
            </select>
            <button
              onClick={handleRunCode}
              disabled={state.isRunning}
              style={{
                ...styles.runButton,
                opacity: state.isRunning ? 0.7 : 1,
              }}
            >
              {state.isRunning ? "Running..." : "Run"}
            </button>
          </div>

          <textarea
            value={state.code}
            onChange={(e) =>
              setState((prev) => ({ ...prev, code: e.target.value }))
            }
            style={styles.codeEditor}
            spellCheck="false"
          />

          <div style={styles.outputConsole}>
            <div style={styles.consoleHeader}>Output</div>
            <pre style={styles.consoleContent}>
              {state.output || "Run your code to see the output"}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

// --------------------------------------------------------------------
// Component: App
// --------------------------------------------------------------------
const App = () => {
  const [selectedProblem, setSelectedProblem] = useState(null);

  return (
    <div style={styles.container}>
      {selectedProblem ? (
        <CodingInterface
          problem={selectedProblem}
          onBack={() => setSelectedProblem(null)}
        />
      ) : (
        <ProblemList onProblemSelect={setSelectedProblem} />
      )}
    </div>
  );
};

const styles = {
  container: {
    height: "100vh",
    background: "linear-gradient(145deg, #0A1929 0%, #0F2942 100%)",
    color: "#F8FAFC",
    fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
  },

  problemListContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    padding: "24px",
  },

  filterSection: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    marginBottom: "20px",
  },

  searchInput: {
    padding: "12px 16px",
    borderRadius: "8px",
    backgroundColor: "rgba(15, 41, 66, 0.5)",
    border: "1px solid rgba(148, 163, 184, 0.1)",
    color: "#F8FAFC",
    fontSize: "14px",
    width: "100%",
    outline: "none",
  },

  difficultyFilters: {
    display: "flex",
    gap: "12px",
  },

  filterButton: {
    padding: "8px 16px",
    borderRadius: "6px",
    border: "1px solid rgba(148, 163, 184, 0.1)",
    color: "#F8FAFC",
    fontSize: "14px",
    cursor: "pointer",
    background: "transparent",
  },

  problemList: {
    padding: "24px",
    backgroundColor: "rgba(15, 41, 66, 0.5)",
    borderRadius: "12px",
    border: "1px solid rgba(148, 163, 184, 0.1)",
  },

  problemListHeader: {
    display: "grid",
    gridTemplateColumns: "80px 1fr 120px 120px",
    padding: "14px",
    backgroundColor: "rgba(26, 54, 93, 0.5)",
    borderRadius: "8px",
    marginBottom: "8px",
  },

  headerCell: {
    fontWeight: "600",
    color: "#94A3B8",
    fontSize: "13px",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },

  problemRow: {
    display: "grid",
    gridTemplateColumns: "80px 1fr 120px 120px",
    padding: "14px",
    borderRadius: "8px",
    cursor: "pointer",
    borderBottom: "1px solid rgba(148, 163, 184, 0.1)",
    "&:hover": {
      backgroundColor: "rgba(56, 189, 248, 0.03)",
    },
  },

  cell: {
    padding: "12px 8px",
    fontSize: "14px",
    display: "flex",
    alignItems: "center",
  },

  checkbox: {
    width: "20px",
    height: "20px",
    border: "2px solid rgba(148, 163, 184, 0.3)",
    borderRadius: "4px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    color: "#38BDF8",
    fontSize: "14px",
  },

  codingInterface: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },

  navbar: {
    padding: "16px 24px",
    backgroundColor: "rgba(26, 54, 93, 0.95)",
    borderBottom: "1px solid rgba(148, 163, 184, 0.1)",
    display: "flex",
    alignItems: "center",
    gap: "16px",
  },

  backButton: {
    padding: "10px 18px",
    backgroundColor: "rgba(148, 163, 184, 0.1)",
    border: "1px solid rgba(148, 163, 184, 0.2)",
    borderRadius: "6px",
    color: "#ffffff",
    cursor: "pointer",
    fontSize: "14px",
  },

  toggleButton: {
    padding: "10px 18px",
    backgroundColor: "rgba(148, 163, 184, 0.1)",
    border: "1px solid rgba(148, 163, 184, 0.2)",
    borderRadius: "6px",
    color: "#ffffff",
    cursor: "pointer",
    fontSize: "14px",
  },

  mainContent: {
    display: "flex",
    flex: 1,
    overflow: "hidden",
    gap: "24px",
    padding: "24px",
  },

  descriptionPanel: {
    width: "40%",
    padding: "28px",
    backgroundColor: "rgba(15, 41, 66, 0.5)",
    borderRight: "1px solid rgba(148, 163, 184, 0.1)",
    borderRadius: "12px",
    overflow: "auto",
  },

  problemTitle: {
    fontSize: "24px",
    fontWeight: "600",
    color: "#F8FAFC",
    marginBottom: "16px",
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },

  difficultyBadge: {
    padding: "4px 12px",
    borderRadius: "12px",
    fontSize: "12px",
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    color: "#ffffff",
  },

  description: {
    marginBottom: "24px",
    lineHeight: "1.7",
    color: "#94A3B8",
    fontSize: "15px",
  },

  examples: {
    marginTop: "24px",
  },

  exampleBox: {
    backgroundColor: "rgba(26, 54, 93, 0.3)",
    padding: "16px",
    borderRadius: "8px",
    marginTop: "12px",
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: "13px",
    border: "1px solid rgba(148, 163, 184, 0.1)",
  },

  editorPanel: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    padding: "28px",
    gap: "20px",
  },

  toolbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px 0",
    borderBottom: "1px solid rgba(148, 163, 184, 0.1)",
    marginBottom: "16px",
  },

  languageSelect: {
    padding: "8px 12px",
    borderRadius: "6px",
    backgroundColor: "rgba(148, 163, 184, 0.1)",
    border: "1px solid rgba(148, 163, 184, 0.2)",
    color: "#F8FAFC",
    fontSize: "14px",
    cursor: "pointer",
    outline: "none",
  },

  runButton: {
    padding: "10px 18px",
    backgroundColor: "#38BDF8",
    border: "none",
    borderRadius: "6px",
    color: "#ffffff",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "600",
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },

  codeEditor: {
    flex: 1,
    backgroundColor: "rgba(10, 25, 41, 0.7)",
    color: "#E2E8F0",
    fontFamily: "'JetBrains Mono', monospace",
    padding: "20px",
    border: "1px solid rgba(148, 163, 184, 0.1)",
    fontSize: "14px",
    lineHeight: "1.6",
    borderRadius: "8px",
    resize: "none",
    outline: "none",
  },

  outputConsole: {
    height: "240px",
    backgroundColor: "rgba(26, 54, 93, 0.5)",
    borderRadius: "12px",
    overflow: "hidden",
  },

  consoleHeader: {
    padding: "12px 16px",
    backgroundColor: "rgba(26, 54, 93, 0.5)",
    borderBottom: "1px solid rgba(148, 163, 184, 0.1)",
    fontSize: "13px",
    fontWeight: "600",
    color: "#94A3B8",
  },

  consoleContent: {
    padding: "16px",
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: "13px",
    lineHeight: "1.6",
    color: "#E2E8F0",
    height: "calc(100% - 45px)",
    overflowY: "auto",
  },
};

export default App;
