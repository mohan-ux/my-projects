import React, { useState, useEffect } from "react";

const styles = {
  root: {
    minHeight: "100vh",
    backgroundColor: "#0A0C10",
    color: "#E5E7EB",
    padding: "2.5rem",
    fontFamily: "Inter, system-ui, -apple-system, sans-serif",
  },
  container: {
    maxWidth: "1400px",
    margin: "0 auto",
  },
  header: {
    marginBottom: "4rem",
    position: "relative",
  },
  headerTitle: {
    fontSize: "3.25rem",
    fontWeight: "800",
    background:
      "linear-gradient(135deg, #60A5FA 0%, #A78BFA 50%, #F472B6 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    margin: "0",
    letterSpacing: "-0.02em",
  },
  headerSubtitle: {
    color: "#9CA3AF",
    fontSize: "1.125rem",
    marginTop: "1rem",
  },
  metricsContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
    gap: "2rem",
    marginBottom: "4rem",
  },
  cycleMetric: {
    backgroundColor: "#151820",
    borderRadius: "24px",
    padding: "2rem",
    position: "relative",
    overflow: "hidden",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    boxShadow: "0 4px 24px rgba(0, 0, 0, 0.2)",
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
    "&:hover": {
      transform: "translateY(-4px)",
      boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
    },
  },
  metricCircle: {
    position: "relative",
    width: "180px",
    height: "180px",
    margin: "0 auto 1.5rem",
  },
  svg: {
    transform: "rotate(-90deg)",
    width: "100%",
    height: "100%",
    filter: "drop-shadow(0 0 8px rgba(0, 0, 0, 0.3))",
  },
  circleBackground: {
    fill: "none",
    stroke: "rgba(255, 255, 255, 0.1)",
    strokeWidth: "10",
  },
  circleProgress: {
    fill: "none",
    strokeWidth: "10",
    strokeLinecap: "round",
    transition: "stroke-dashoffset 1s ease-in-out",
  },
  metricContent: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    textAlign: "center",
    width: "100%",
  },
  metricValue: {
    fontSize: "2.5rem",
    fontWeight: "700",
    marginBottom: "0.5rem",
    background: "linear-gradient(135deg, #E5E7EB 0%, #FFFFFF 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  metricLabel: {
    fontSize: "1rem",
    color: "#9CA3AF",
    textTransform: "uppercase",
    letterSpacing: "0.1em",
    fontWeight: "600",
  },
  taskSection: {
    backgroundColor: "#151820",
    borderRadius: "24px",
    padding: "2.5rem",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    boxShadow: "0 4px 24px rgba(0, 0, 0, 0.2)",
  },
  taskForm: {
    display: "flex",
    gap: "1.5rem",
    marginBottom: "3rem",
  },
  input: {
    flex: "1",
    backgroundColor: "#1F2937",
    border: "2px solid rgba(255, 255, 255, 0.1)",
    borderRadius: "12px",
    padding: "1rem 1.5rem",
    color: "#FFFFFF",
    fontSize: "1.125rem",
    outline: "none",
    transition: "border-color 0.2s ease, box-shadow 0.2s ease",
    "&:focus": {
      borderColor: "#3B82F6",
      boxShadow: "0 0 0 4px rgba(59, 130, 246, 0.2)",
    },
  },
  addButton: {
    backgroundColor: "#3B82F6",
    color: "white",
    border: "none",
    borderRadius: "12px",
    padding: "1rem 2rem",
    fontSize: "1.125rem",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.2s ease",
    "&:hover": {
      backgroundColor: "#2563EB",
      transform: "translateY(-2px)",
    },
    "&:active": {
      transform: "translateY(0)",
    },
  },
  taskList: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  taskItem: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "#1F2937",
    borderRadius: "16px",
    padding: "1.25rem",
    transition: "all 0.2s ease",
    border: "1px solid rgba(255, 255, 255, 0.05)",
    "&:hover": {
      transform: "translateX(4px)",
      backgroundColor: "#252F3F",
    },
  },
  checkbox: {
    width: "28px",
    height: "28px",
    borderRadius: "50%",
    border: "2px solid rgba(255, 255, 255, 0.2)",
    marginRight: "1.25rem",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.2s ease",
    color: "#FFFFFF",
    fontSize: "1rem",
  },
  taskText: {
    flex: "1",
    fontSize: "1.125rem",
    margin: "0 1.25rem",
    transition: "all 0.2s ease",
  },
  deleteButton: {
    backgroundColor: "rgba(239, 68, 68, 0.1)",
    border: "none",
    color: "#EF4444",
    fontSize: "1.5rem",
    cursor: "pointer",
    width: "36px",
    height: "36px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.2s ease",
    "&:hover": {
      backgroundColor: "rgba(239, 68, 68, 0.2)",
      transform: "scale(1.1)",
    },
  },
};

const CycleMetric = ({ value, max, label, color }) => {
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const progress = (value / max) * circumference;
  const gradientId = `gradient-${label.toLowerCase().replace(/\s+/g, "-")}`;

  return (
    <div style={styles.cycleMetric}>
      <div style={styles.metricCircle}>
        <svg style={styles.svg} viewBox="0 0 140 140">
          <defs>
            <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: color[0] }} />
              <stop offset="100%" style={{ stopColor: color[1] }} />
            </linearGradient>
          </defs>
          <circle style={styles.circleBackground} cx="70" cy="70" r={radius} />
          <circle
            style={{
              ...styles.circleProgress,
              stroke: `url(#${gradientId})`,
              strokeDasharray: circumference,
              strokeDashoffset: circumference - progress,
            }}
            cx="70"
            cy="70"
            r={radius}
          />
        </svg>
        <div style={styles.metricContent}>
          <div style={styles.metricValue}>{value}</div>
          <div style={styles.metricLabel}>{label}</div>
        </div>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [metrics, setMetrics] = useState({
    total: 0,
    completed: 0,
    inProgress: 0,
    cycle: 0,
  });

  useEffect(() => {
    const completed = tasks.filter((task) => task.completed).length;
    const inProgress = tasks.length - completed;
    const cycleTime =
      tasks.length > 0 ? Math.round((completed / tasks.length) * 100) : 0;

    setMetrics({
      total: tasks.length,
      completed,
      inProgress,
      cycle: cycleTime,
    });
  }, [tasks]);

  const addTask = (e) => {
    e.preventDefault();
    if (newTask.trim()) {
      setTasks([
        ...tasks,
        {
          id: Date.now(),
          text: newTask,
          completed: false,
          createdAt: new Date(),
        },
      ]);
      setNewTask("");
    }
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div style={styles.root}>
      <div style={styles.container}>
        <header style={styles.header}>
          <h1 style={styles.headerTitle}></h1>
          <p style={styles.headerSubtitle}>Track your task completion</p>
        </header>

        <div style={styles.metricsContainer}>
          <CycleMetric
            value={metrics.cycle}
            max={100}
            label="Cycle Completion"
            color={["#60A5FA", "#3B82F6"]}
          />
          <CycleMetric
            value={metrics.completed}
            max={metrics.total || 1}
            label="Completed Tasks"
            color={["#34D399", "#059669"]}
          />
          <CycleMetric
            value={metrics.inProgress}
            max={metrics.total || 1}
            label="In Progress"
            color={["#FBBF24", "#D97706"]}
          />
        </div>

        <div style={styles.taskSection}>
          <form onSubmit={addTask} style={styles.taskForm}>
            <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="Add new task..."
              style={styles.input}
            />
            <button type="submit" style={styles.addButton}>
              Add Task
            </button>
          </form>

          <div style={styles.taskList}>
            {tasks.map((task) => (
              <div
                key={task.id}
                style={{
                  ...styles.taskItem,
                  opacity: task.completed ? 0.7 : 1,
                }}
              >
                <div
                  onClick={() => toggleTask(task.id)}
                  style={{
                    ...styles.checkbox,
                    backgroundColor: task.completed ? "#059669" : "transparent",
                    borderColor: task.completed
                      ? "#059669"
                      : "rgba(255, 255, 255, 0.2)",
                  }}
                >
                  {task.completed && "✓"}
                </div>
                <span
                  style={{
                    ...styles.taskText,
                    textDecoration: task.completed ? "line-through" : "none",
                    color: task.completed ? "#9CA3AF" : "#E5E7EB",
                  }}
                >
                  {task.text}
                </span>
                <button
                  onClick={() => deleteTask(task.id)}
                  style={styles.deleteButton}
                  aria-label="Delete task"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
