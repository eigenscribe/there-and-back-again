# Flask backend for personal portfolio website
# This serves the React frontend and provides any needed API endpoints

from flask import Flask, send_from_directory, send_file, jsonify
from flask_cors import CORS
from werkzeug.exceptions import NotFound
import os

# Create Flask app
app = Flask(__name__)

# Enable CORS for React frontend
CORS(app)

# Get the directory paths
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
CLIENT_BUILD_DIR = os.path.join(os.path.dirname(BASE_DIR), 'client', 'dist')
PUBLIC_DIR = os.path.join(os.path.dirname(BASE_DIR), 'public')

@app.route('/')
def serve_index():
    """Serve the React app's main page"""
    try:
        return send_from_directory(CLIENT_BUILD_DIR, 'index.html')
    except FileNotFoundError:
        return "React build not found. Please run 'npm run build' in the client directory.", 404

@app.route('/api/health')
def health_check():
    """Simple health check endpoint"""
    return jsonify({"status": "healthy", "message": "Flask backend is running"})

@app.route('/assets/<path:filename>')
def serve_public_assets(filename):
    """Serve assets from public directory (logos, images, etc.)"""
    public_assets = os.path.join(PUBLIC_DIR, 'assets')
    dist_assets = os.path.join(CLIENT_BUILD_DIR, 'assets')
    try:
        return send_from_directory(public_assets, filename)
    except (NotFound, FileNotFoundError):
        # Fallback to React build assets for CSS/JS files
        try:
            return send_from_directory(dist_assets, filename)
        except (NotFound, FileNotFoundError):
            return "Asset not found", 404

@app.route('/<path:path>')
def serve_static_files(path):
    """Serve static files from React build or fallback to React Router"""
    # Try to serve from React build directory
    try:
        return send_from_directory(CLIENT_BUILD_DIR, path)
    except (NotFound, FileNotFoundError):
        # If not found, serve index.html for React Router
        try:
            return send_from_directory(CLIENT_BUILD_DIR, 'index.html')
        except (NotFound, FileNotFoundError):
            return "File not found", 404

if __name__ == '__main__':
    # Run with debug mode and allow external connections
    # Port 5000 is required for Replit environment
    app.run(host='0.0.0.0', port=5000, debug=True)