import React, { useState, useEffect } from "react";
import "../styles/project.css";

const ProjectManager = () => {
  const [activeSection, setActiveSection] = useState("projects");
  const [currentPath, setCurrentPath] = useState([]);
  const [filesStructure, setFilesStructure] = useState({
    projects: [
      {
        id: "1",
        name: "ai-learning-platform",
        type: "folder",
        path: "/ai-learning-platform",
        children: [
          {
            id: "2",
            name: "frontend",
            type: "folder",
            path: "/ai-learning-platform/frontend",
            children: [],
          },
        ],
      },
    ],
    trash: [],
    recent: [],
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);
  const [viewMode, setViewMode] = useState("grid");
  const [contextMenu, setContextMenu] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const [newItemName, setNewItemName] = useState("");
  const [newItemType, setNewItemType] = useState("");
  const [isRenaming, setIsRenaming] = useState(null);
  const [renameName, setRenameName] = useState("");

  const getCurrentItems = () => {
    let items = filesStructure[activeSection];
    if (activeSection === "projects") {
      for (const pathSegment of currentPath) {
        const folder = items.find((item) => item.id === pathSegment);
        items = folder ? folder.children : [];
      }
    }
    return items;
  };

  const getFullPath = () => {
    if (activeSection !== "projects") return "";
    let path = "";
    let items = filesStructure.projects;
    for (const pathId of currentPath) {
      const folder = items.find((item) => item.id === pathId);
      if (folder) {
        path += "/" + folder.name;
        items = folder.children;
      }
    }
    return path || "/";
  };

  const handleContextMenu = (e, item) => {
    e.preventDefault();
    setContextMenu({
      x: e.pageX,
      y: e.pageY,
      item,
    });
  };

  const updateStructure = (newStructure) => {
    setFilesStructure((prev) => ({
      ...prev,
      projects: newStructure,
    }));
  };

  const addToRecent = (item) => {
    const newRecent = [
      { ...item, accessedAt: new Date().toISOString() },
      ...filesStructure.recent.filter((f) => f.id !== item.id).slice(0, 9),
    ];
    setFilesStructure((prev) => ({
      ...prev,
      recent: newRecent,
    }));
  };

  const createNewItem = () => {
    if (!newItemName.trim()) return;

    const newItem = {
      id: Date.now().toString(),
      name: newItemName,
      type: newItemType,
      path: getFullPath() + "/" + newItemName,
      children: newItemType === "folder" ? [] : undefined,
      createdAt: new Date().toISOString(),
      modifiedAt: new Date().toISOString(),
    };

    let newStructure = [...filesStructure.projects];
    if (currentPath.length > 0) {
      const updateChildren = (items) => {
        return items.map((item) => {
          if (item.id === currentPath[currentPath.length - 1]) {
            return {
              ...item,
              children: [...item.children, newItem],
            };
          }
          if (item.children) {
            return {
              ...item,
              children: updateChildren(item.children),
            };
          }
          return item;
        });
      };
      newStructure = updateChildren(newStructure);
    } else {
      newStructure.push(newItem);
    }

    updateStructure(newStructure);
    setNewItemName("");
    setIsCreating(false);
    setNewItemType("");
  };

  const handleDelete = (itemToDelete) => {
    if (activeSection === "trash") {
      // Permanent delete from trash
      setFilesStructure((prev) => ({
        ...prev,
        trash: prev.trash.filter((item) => item.id !== itemToDelete.id),
      }));
    } else {
      // Move to trash and remove from projects
      const removeItemFromStructure = (items) => {
        return items.filter((item) => {
          if (item.id === itemToDelete.id) {
            return false;
          }
          if (item.children) {
            item.children = removeItemFromStructure(item.children);
          }
          return true;
        });
      };

      setFilesStructure((prev) => {
        const newProjects = removeItemFromStructure([...prev.projects]);
        return {
          ...prev,
          trash: [
            ...prev.trash,
            { ...itemToDelete, deletedAt: new Date().toISOString() },
          ],
          projects: newProjects,
        };
      });
    }
    setContextMenu(null);
  };

  const handleRename = (item) => {
    if (!renameName.trim()) return;

    const updateItems = (items) => {
      return items.map((i) => {
        if (i.id === item.id) {
          return {
            ...i,
            name: renameName,
            path: i.path.replace(i.name, renameName),
            modifiedAt: new Date().toISOString(),
          };
        }
        if (i.children) {
          return {
            ...i,
            children: updateItems(i.children),
          };
        }
        return i;
      });
    };

    const newStructure = updateItems(filesStructure.projects);
    updateStructure(newStructure);
    setIsRenaming(null);
    setRenameName("");
    setContextMenu(null);
  };

  const handleRestore = (item) => {
    setFilesStructure((prev) => ({
      ...prev,
      projects: [...prev.projects, { ...item, deletedAt: null }],
      trash: prev.trash.filter((i) => i.id !== item.id),
    }));
  };

  return (
    <div className="project-manager" onClick={() => setContextMenu(null)}>
      <aside className="sidebar">
        <div className="logo">
          <span className="logo-icon">⚡</span>
          <span className="logo-text">ProjectHub</span>
        </div>
        <nav className="nav-menu">
          <button
            className={`nav-item ${
              activeSection === "projects" ? "active" : ""
            }`}
            onClick={() => {
              setActiveSection("projects");
              setCurrentPath([]);
            }}
          >
            <span className="nav-icon">📁</span>
            <span className="nav-text">Projects</span>
          </button>
          <button
            className={`nav-item ${activeSection === "recent" ? "active" : ""}`}
            onClick={() => {
              setActiveSection("recent");
              setCurrentPath([]);
            }}
          >
            <span className="nav-icon">🕒</span>
            <span className="nav-text">Recent</span>
          </button>
          <button
            className={`nav-item ${activeSection === "trash" ? "active" : ""}`}
            onClick={() => {
              setActiveSection("trash");
              setCurrentPath([]);
            }}
          >
            <span className="nav-icon">🗑️</span>
            <span className="nav-text">Trash</span>
          </button>
        </nav>
      </aside>

      <main className="main-content">
        <header className="content-header">
          <div className="path-navigation">
            {activeSection === "projects" && (
              <>
                <button
                  className="path-item"
                  onClick={() => setCurrentPath([])}
                >
                  Projects
                </button>
                {currentPath.map((pathId, index) => {
                  let items = filesStructure.projects;
                  let pathName = "";
                  for (let i = 0; i <= index; i++) {
                    const folder = items.find(
                      (item) => item.id === currentPath[i]
                    );
                    if (folder) {
                      pathName = folder.name;
                      items = folder.children;
                    }
                  }
                  return (
                    <React.Fragment key={pathId}>
                      <span className="path-separator">/</span>
                      <button
                        className="path-item"
                        onClick={() =>
                          setCurrentPath(currentPath.slice(0, index + 1))
                        }
                      >
                        {pathName}
                      </button>
                    </React.Fragment>
                  );
                })}
              </>
            )}
          </div>

          <div className="header-actions">
            <div className="search-bar">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button
              className="view-toggle"
              onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
            >
              <span className="nav-icon">
                {viewMode === "grid" ? "📋" : "📑"}
              </span>
            </button>
            {activeSection === "projects" && (
              <div className="new-item-actions">
                <button
                  className="new-item-btn"
                  onClick={() => {
                    setIsCreating(true);
                    setNewItemType("folder");
                  }}
                >
                  <span className="nav-icon">📁</span>
                  <span className="nav-text">New Folder</span>
                </button>
                <button
                  className="new-item-btn"
                  onClick={() => {
                    setIsCreating(true);
                    setNewItemType("file");
                  }}
                >
                  <span className="nav-icon">📄</span>
                  <span className="nav-text">New File</span>
                </button>
              </div>
            )}
          </div>
        </header>

        {isCreating && (
          <div className="new-item-form">
            <input
              type="text"
              placeholder={`Enter ${newItemType} name`}
              value={newItemName}
              onChange={(e) => setNewItemName(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && createNewItem()}
              autoFocus
            />
            <button onClick={createNewItem}>Create</button>
            <button
              onClick={() => {
                setIsCreating(false);
                setNewItemName("");
              }}
            >
              Cancel
            </button>
          </div>
        )}

        <div className={`content-grid ${viewMode}`}>
          {getCurrentItems()
            .filter((item) =>
              item.name.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .map((item) => (
              <div
                key={item.id}
                className={`item-card ${
                  selectedItems.includes(item.id) ? "selected" : ""
                }`}
                onClick={() => {
                  if (item.type === "folder") {
                    setCurrentPath([...currentPath, item.id]);
                    addToRecent(item);
                  }
                }}
                onContextMenu={(e) => handleContextMenu(e, item)}
              >
                <div className="item-icon">
                  {item.type === "folder" ? "📁" : "📄"}
                </div>
                <div className="item-details">
                  {isRenaming === item.id ? (
                    <input
                      type="text"
                      className="rename-input"
                      value={renameName}
                      onChange={(e) => setRenameName(e.target.value)}
                      onBlur={() => handleRename(item)}
                      onKeyPress={(e) =>
                        e.key === "Enter" && handleRename(item)
                      }
                      autoFocus
                      onClick={(e) => e.stopPropagation()}
                    />
                  ) : (
                    <div className="item-name">{item.name}</div>
                  )}
                  <div className="item-meta">
                    Modified: {new Date(item.modifiedAt).toLocaleDateString()}
                  </div>
                </div>
              </div>
            ))}
        </div>

        {contextMenu && (
          <div
            className="context-menu"
            style={{ top: contextMenu.y, left: contextMenu.x }}
            onClick={(e) => e.stopPropagation()}
          >
            {activeSection !== "trash" && (
              <>
                <button
                  onClick={() => {
                    setIsRenaming(contextMenu.item.id);
                    setRenameName(contextMenu.item.name);
                    setContextMenu(null);
                  }}
                >
                  Rename
                </button>
                <button onClick={() => handleDelete(contextMenu.item)}>
                  Move to Trash
                </button>
              </>
            )}
            {activeSection === "trash" && (
              <>
                <button onClick={() => handleRestore(contextMenu.item)}>
                  Restore
                </button>
                <button onClick={() => handleDelete(contextMenu.item)}>
                  Delete Forever
                </button>
              </>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default ProjectManager;
