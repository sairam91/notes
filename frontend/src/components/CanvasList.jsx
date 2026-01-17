import './CanvasList.css';

function CanvasList({ canvases, currentCanvasId, onLoadCanvas, onDeleteCanvas }) {
  return (
    <div className="canvas-list">
      <div className="canvas-list-header">
        <h3>My Canvases</h3>
      </div>
      <div className="canvas-list-content">
        {canvases.length === 0 ? (
          <div className="empty-state">
            No canvases yet. Create one!
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
                  title="Delete canvas"
                >
                  🗑️
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default CanvasList;
