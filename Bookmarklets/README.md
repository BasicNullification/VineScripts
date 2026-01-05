# Bookmarklets

Bookmarklets are small JavaScript programs that run when you click a bookmark in your browser.

## Folder Structure
- **Top level** (`.min.js` files) - Minified, production-ready versions. **Use these for actual bookmarks.**
- **source/** - Unminified source files. For viewing and development only.

## Installation

1. Open your browser's bookmarks manager
2. Create a new bookmark
3. Copy the entire contents of any `.min.js` file from the top level
4. Paste it as the bookmark URL
5. Click the bookmark to run it

**Note:** The source files can technically work as bookmarks, but comments and formatting can sometimes cause issues. Always use the `.min.js` versions for reliable functionality.

⚠️ Unlike userscripts, bookmarklets are unable to check for updates. If you are experiencing issues with a bookmarklet, first check back here to see if it has been updated since you added it to your browser (check the **Changelog** under the script on this page), if not then [create a new issue](https://github.com/BasicNullification/VineScripts/issues/new?labels=Bookmarklet) and let me know about it.

# Bookmarkets

## Amazon Vine AI - Random Page Button

Navigates to a random Vine AI (Additional Items) page without repeating pages you've already visited in the current session.

**First use:** If you're not already viewing an AI page, it will start at page 1 to discover the total number of available pages. After that, it will select random pages throughout your session, skipping any you've already visited.

**Smart recall:** If you leave and return to an AI page, the bookmarklet remembers the highest page count from your session, so it can continue picking from the full range rather than resetting to page 1.

**Limitations:** Smart recall is only available in the current tab (i.e. "session"). If you use another tab, the session starts over and it will not remember the pages you previously visited or the last-known max page count.

### Changelog

| Version   | Date      | Notes |
|-----------|-----------|-------|
| v1.1.0 |01/05/2026 | ▸ Works smarter by adding visited URLs to session storage, preventing repeat visits to the same page during a session. ***Note:** Since this uses the browser's session storage, it will "forget" the visited pages once you close the tab.*<br>▸ Now remembers the last total page count in case you temporarily navigated away from an AI page. If you return and the current page doesn't show pagination, it will use the remembered count. Also stored in session storage *(clears when leaving tab)*. |
| [v1.0.0](https://raw.githubusercontent.com/BasicNullification/VineScripts/0452ba7c4a1466516e38242f67a966e3e3af0e3b/Bookmarklets/Amazon%20Vine%20AI%20-%20Random%20Page%20Button.min.js) |12/17/2025 | Initial Release |