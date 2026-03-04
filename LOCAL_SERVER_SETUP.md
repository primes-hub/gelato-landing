# Local Server Setup Guide

## Problem
The project was being accessed via `file://` protocol, which causes:
- CSS files not loading (ERR_FILE_NOT_FOUND)
- JavaScript CORS errors
- Cookie-related issues

## Solution: Run via HTTP://LOCALHOST

### Option 1: Windows Batch File (Easiest)
1. **Run the batch file:**
   - Double-click `START_SERVER.bat` in the project root
   - The server will start on `http://localhost:8000`
   - Open your browser and navigate to: `http://localhost:8000`

2. **Stop the server:**
   - Press `Ctrl+C` in the command prompt window

**Requirements:** Python (included with many Windows installations)

---

### Option 2: Python Command Line
If the batch file doesn't work, manually start the server:

1. **Open Command Prompt (Win+R, type `cmd`, press Enter)**

2. **Navigate to the project folder:**
   ```
   cd C:\Users\ULTRA\Desktop\sample\gelato-landing
   ```

3. **Start the HTTP server:**
   ```
   python -m http.server 8000
   ```
   or
   ```
   python3 -m http.server 8000
   ```

4. **Open your browser:**
   - Go to: `http://localhost:8000`

5. **Stop the server:**
   - Press `Ctrl+C` in the command prompt

---

### Option 3: Node.js / npm
If you have Node.js installed:

1. **Install http-server globally:**
   ```
   npm install -g http-server
   ```

2. **Navigate to project folder and start:**
   ```
   cd C:\Users\ULTRA\Desktop\sample\gelato-landing
   http-server
   ```

3. **Open your browser:**
   - Go to the URL shown in the terminal (usually `http://localhost:8080`)

---

### Option 4: Visual Studio Code Live Server
If using VS Code:

1. **Install the Live Server extension:**
   - Open VS Code
   - Go to Extensions (Ctrl+Shift+X)
   - Search for "Live Server" by Ritwick Dey
   - Click Install

2. **Start Live Server:**
   - Right-click on `index.html`
   - Select "Open with Live Server"
   - Your browser will open automatically at `http://localhost:5500`

---

## Verifying the Fix

After running the server:
1. Open Chrome DevTools (F12)
2. Go to Console tab
3. Check for any red error messages
4. Verify all CSS files are loading (Network tab)
5. Confirm no ERR_FILE_NOT_FOUND errors

All resources should now load correctly!

---

## CSS File Paths
The following CSS files are correctly referenced and will load when using http://localhost:

- `sass/style1459.css` ✓
- `vendor/ax5ui/ax5dialog.css` ✓
- `css/ax-5-ui-custom067a.css` ✓
- `css/lang_en.css` ✓
- `css/dispenser.css` ✓
- CDN resources (Font Awesome, Google Fonts, XE Icon) ✓

---

## Why This Works

When you use `file://` protocol:
- ❌ Local resource loading is blocked by CORS
- ❌ Cookies cannot be accessed
- ❌ Many features don't work

When you use `http://localhost`:
- ✅ All local resources load correctly
- ✅ Cookies work properly
- ✅ Full functionality enabled
- ✅ Mimics production environment

---

## Questions?
If you encounter issues:
1. Ensure Python/Node.js is installed
2. Check that you're in the correct directory
3. Make sure port 8000 (or 8080/5500) is not in use by another application
4. Try a different port: `python -m http.server 9000`
