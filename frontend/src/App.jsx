import { useState, useEffect } from 'react';
import { Excalidraw } from '@excalidraw/excalidraw';
import CanvasList from './components/CanvasList';
import './App.css';

const STORAGE_KEY = 'excalidraw_canvases';

function App() {
  const [canvases, setCanvases] = useState([]);
  const [currentCanvas, setCurrentCanvas] = useState(null);
  const [excalidrawAPI, setExcalidrawAPI] = useState(null);
  const [showSidebar, setShowSidebar] = useState(true);

  useEffect(() => {
    loadCanvases();
  }, []);

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

  const saveCanvas = () => {
    if (!excalidrawAPI) return;

    const elements = excalidrawAPI.getSceneElements();
    const appState = excalidrawAPI.getAppState();

    const data = {
      elements,
      appState: {
        viewBackgroundColor: appState.viewBackgroundColor,
      },
    };

    if (currentCanvas?.id) {
      const updated = canvases.map(c =>
        c.id === currentCanvas.id
          ? { ...c, data: JSON.stringify(data), updated_at: new Date().toISOString() }
          : c
      );
      saveCanvasesToStorage(updated);
      alert('Canvas saved successfully!');
    } else {
      const name = prompt('Enter canvas name:');
      if (!name) return;

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
      alert('Canvas saved successfully!');
    }
  };

  const createNewCanvas = () => {
    if (excalidrawAPI) {
      excalidrawAPI.resetScene();
    }
    setCurrentCanvas(null);
  };

  const deleteCanvas = (id) => {
    if (!confirm('Are you sure you want to delete this canvas?')) return;

    const updated = canvases.filter(c => c.id !== id);
    saveCanvasesToStorage(updated);

    if (currentCanvas?.id === id) {
      createNewCanvas();
    }
  };

  return (
    <div className="app">
      <div className="toolbar">
        <button onClick={() => setShowSidebar(!showSidebar)}>
          {showSidebar ? '◀' : '▶'} Canvases
        </button>
        <span className="canvas-name">
          {currentCanvas ? currentCanvas.name : 'New Canvas'}
        </span>
        <div className="toolbar-actions">
          <button onClick={createNewCanvas}>New Canvas</button>
          <button onClick={saveCanvas} className="save-btn">Save Canvas</button>
        </div>
      </div>

      <div className="main-content">
        {showSidebar && (
          <CanvasList
            canvases={canvases}
            currentCanvasId={currentCanvas?.id}
            onLoadCanvas={loadCanvas}
            onDeleteCanvas={deleteCanvas}
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
