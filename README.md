# Excalidraw Multi-Canvas Application

A simple Excalidraw application with support for multiple canvases. All data is stored locally in your browser's localStorage - no backend, no password, just draw!

## Features

- **Multiple Canvases** - Create and manage unlimited drawing canvases
- **Local Storage** - All data stored in your browser
- **Offline First** - Works completely offline, no server needed
- **Simple & Fast** - No login, no setup, just start drawing
- Clean, modern UI with canvas list sidebar

## Quick Start

### Running the Application

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies (first time only):
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and go to: **http://localhost:3000**

That's it! Start drawing immediately.

## How to Use

1. **Draw**: Use Excalidraw's tools to create your drawings
2. **Save Canvas**: Click "Save Canvas" and enter a name
3. **Create New Canvas**: Click "New Canvas" to start a fresh drawing
4. **Switch Canvas**: Click on any canvas in the sidebar to load it
5. **Delete Canvas**: Click the trash icon next to a canvas to delete it
6. **Toggle Sidebar**: Click "◀ Canvases" to hide/show the sidebar

## Data Storage

All canvases are stored in your browser's localStorage under the key: `excalidraw_canvases`

### Backing Up Your Data

To export all your canvases:

1. Open browser DevTools (F12)
2. Go to Console tab
3. Run:
   ```javascript
   console.log(localStorage.getItem('excalidraw_canvases'));
   ```
4. Copy the output and save it to a file

To restore from backup:

1. Open browser DevTools (F12)
2. Go to Console tab
3. Run:
   ```javascript
   localStorage.setItem('excalidraw_canvases', 'paste-your-backup-here');
   ```
4. Refresh the page

## Technology Stack

- React 18
- Vite
- @excalidraw/excalidraw
- Browser localStorage API

## Project Structure

```
my_notes/
├── frontend/
│   ├── src/
│   │   ├── App.jsx              # Main application
│   │   ├── App.css
│   │   ├── components/
│   │   │   ├── CanvasList.jsx   # Canvas sidebar
│   │   │   └── CanvasList.css
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
├── .gitignore
└── README.md
```

## Notes

- All drawings are stored in browser localStorage
- Canvas data includes elements and app state
- Maximum localStorage size varies by browser (typically 5-10MB)
- Clearing browser data will delete all canvases
- No collaboration features (single-user, local application)
- Works completely offline once loaded

## Troubleshooting

### Port already in use

If port 3000 is already in use, Vite will automatically try the next available port (3001, 3002, etc.)

### Canvas Not Saving

Make sure you're clicking "Save Canvas" after making changes. The canvas is not auto-saved.

### Browser Storage Full

If you get storage errors:
1. Delete old canvases you don't need
2. Export important canvases (see "Backing Up Your Data" above)
3. Clear old data from localStorage

### Lost Data

If you accidentally clear your browser data:
- Your canvases are permanently lost
- Always keep backups of important drawings
- Consider exporting canvases regularly

## Deployment

This app is configured for deployment on Vercel. See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions.

### Quick Deploy to Vercel:

1. Push code to GitHub
2. Import project on [vercel.com](https://vercel.com)
3. Deploy automatically
4. Configure custom domain in Vercel settings

The app will be live at your custom domain with automatic HTTPS and global CDN.

## License

This project uses the Excalidraw library which is MIT licensed.
