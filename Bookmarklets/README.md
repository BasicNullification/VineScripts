# Bookmarklets

Bookmarklets are small JavaScript programs that run when you click a bookmark in your browser.

## Folder Structure
- **Top level** (`.min.js` files) - Minified, production-ready versions. **Use these for actual bookmarks.**
- **source/** - Unminified source files. For editing and development only.

## Installation

1. Open your browser's bookmarks manager
2. Create a new bookmark
3. Copy the entire contents of any `.min.js` file from the top level
4. Paste it as the bookmark URL
5. Click the bookmark to run it

**Note:** The source files can technically work as bookmarks, but comments and formatting can sometimes cause issues. Always use the `.min.js` versions for reliable functionality.
