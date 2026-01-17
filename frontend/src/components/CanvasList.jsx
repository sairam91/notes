import './CanvasList.css';

function CanvasList({ canvases, currentCanvasId, onLoadCanvas, onDeleteCanvas, onCreateNewNote }) {
  return (
    <div className="canvas-list">
      <div className="canvas-list-header">
        <h3>My Notes</h3>
      </div>
      <div className="canvas-list-content">
        {canvases.length === 0 ? (
          <div className="empty-state">
            No notes yet. Create one!
          </div>
        ) : (
          <ul>
            {canvases.map((canvas) => (
              <li
                key={canvas.id}
                className={currentCanvasId === canvas.id ? 'active' : ''}
              >
                <div
                  className="canvas-item"
                  onClick={() => onLoadCanvas(canvas.id)}
                >
                  <div className="canvas-info">
                    <div className="canvas-name">{canvas.name}</div>
                    <div className="canvas-date">
                      {new Date(canvas.updated_at).toLocaleDateString()}
                    </div>
                  </div>
                </div>
                <button
                  className="delete-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteCanvas(canvas.id);
                  }}
                  title="Delete note"
                >
                  🗑️
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="new-note-btn-container">
        <button className="new-note-btn" onClick={onCreateNewNote}>
          + New Note
        </button>
      </div>
    </div>
  );
}

export default CanvasList;
