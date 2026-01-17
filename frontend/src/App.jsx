import { useState, useEffect } from 'react';
import { Excalidraw } from '@excalidraw/excalidraw';
import CanvasList from './components/CanvasList';
import './App.css';

const STORAGE_KEY = 'excalidraw_notes';

function App() {
  const [canvases, setCanvases] = useState([]);
  const [currentCanvas, setCurrentCanvas] = useState(null);
  const [excalidrawAPI, setExcalidrawAPI] = useState(null);
  const [showSidebar, setShowSidebar] = useState(true);

  useEffect(() => {
    loadCanvases();
  }, []);

  // Auto-save functionality
  useEffect(() => {
    if (!excalidrawAPI) return;

    const autoSave = () => {
      if (!currentCanvas?.id) return;

      const elements = excalidrawAPI.getSceneElements();
      const appState = excalidrawAPI.getAppState();

      const data = {
        elements,
        appState: {
          viewBackgroundColor: appState.viewBackgroundColor,
        },
      };

      const updated = canvases.map(c =>
        c.id === currentCanvas.id
          ? { ...c, data: JSON.stringify(data), updated_at: new Date().toISOString() }
          : c
      );
      saveCanvasesToStorage(updated);
    };

    // Set up auto-save interval (every 2 seconds)
    const intervalId = setInterval(autoSave, 2000);

    return () => clearInterval(intervalId);
  }, [excalidrawAPI, currentCanvas, canvases]);

  const loadCanvases = () => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setCanvases(JSON.parse(stored));
    }
  };

  const saveCanvasesToStorage = (updatedCanvases) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedCanvases));
    setCanvases(updatedCanvases);
  };

  const loadCanvas = (id) => {
    const canvas = canvases.find(c => c.id === id);
    if (!canvas || !excalidrawAPI) return;

    const canvasData = JSON.parse(canvas.data);
    excalidrawAPI.updateScene(canvasData);
    setCurrentCanvas({ id, name: canvas.name });
  };

  const createNewNote = () => {
    if (!excalidrawAPI) return;

    const name = prompt('Enter note name:');
    if (!name) return;

    const elements = excalidrawAPI.getSceneElements();
    const appState = excalidrawAPI.getAppState();

    const data = {
      elements,
      appState: {
        viewBackgroundColor: appState.viewBackgroundColor,
      },
    };

    const newCanvas = {
      id: Date.now(),
      name,
      data: JSON.stringify(data),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const updated = [newCanvas, ...canvases];
    saveCanvasesToStorage(updated);
    setCurrentCanvas({ id: newCanvas.id, name });
  };

  const startNewNote = () => {
    if (excalidrawAPI) {
      excalidrawAPI.resetScene();
    }
    setCurrentCanvas(null);
  };

  const deleteCanvas = (id) => {
    if (!confirm('Are you sure you want to delete this note?')) return;

    const updated = canvases.filter(c => c.id !== id);
    saveCanvasesToStorage(updated);

    if (currentCanvas?.id === id) {
      startNewNote();
    }
  };

  const renameNote = () => {
    if (!currentCanvas?.id) return;

    const newName = prompt('Enter new note name:', currentCanvas.name);
    if (!newName || newName === currentCanvas.name) return;

    const updated = canvases.map(c =>
      c.id === currentCanvas.id
        ? { ...c, name: newName, updated_at: new Date().toISOString() }
        : c
    );
    saveCanvasesToStorage(updated);
    setCurrentCanvas({ ...currentCanvas, name: newName });
  };

  return (
    <div className="app">
      <div className="toolbar">
        <button onClick={() => setShowSidebar(!showSidebar)}>
          {showSidebar ? '◀' : '▶'} Notes
        </button>
        <span
          className="canvas-name"
          onClick={renameNote}
          style={{ cursor: currentCanvas ? 'pointer' : 'default' }}
          title={currentCanvas ? 'Click to rename' : ''}
        >
          {currentCanvas ? currentCanvas.name : 'Untitled Note'}
        </span>
      </div>

      <div className="main-content">
        {showSidebar && (
          <CanvasList
            canvases={canvases}
            currentCanvasId={currentCanvas?.id}
            onLoadCanvas={loadCanvas}
            onDeleteCanvas={deleteCanvas}
            onCreateNewNote={createNewNote}
          />
        )}

        <div className="excalidraw-wrapper">
          <Excalidraw
            excalidrawAPI={(api) => setExcalidrawAPI(api)}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
