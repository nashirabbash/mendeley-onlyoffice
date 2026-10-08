# ADR 0001: Automatic Desktop OAuth Handshake via In-App Modal / Loopback Server

## Status
Proposed

## Context
In ONLYOFFICE Desktop Editors on Linux (CEF / Chromium sandbox), opening external system browsers via `window.open` breaks cross-process DOM access (`window.opener`). The external browser cannot directly pass tokens back to ONLYOFFICE, and `window.close()` cannot close the user's external browser tab due to standard browser security policies. Users expect a seamless login flow where clicking "Sign In" opens a login window, authenticates, automatically closes the window upon success, and instantly reloads their reference library without manual copy-pasting.

## Decision
Implement a 100% automated desktop auth mechanism using one of two native approaches:
1. **In-App ONLYOFFICE Modal Dialog (`ShowWindow`)**: Open the OAuth login flow inside an internal ONLYOFFICE modal dialog. The modal captures the token on redirect via `window.Asc.plugin.sendToPlugin` or DOM monitoring, closes itself automatically with `Asc.plugin.executeCommand("close", "")`, and triggers the library load.
2. **Local Loopback HTTP Receiver (`http://127.0.0.1:32845/callback`)**: Run a local HTTP receiver that captures the redirect code/token, serves an auto-closing HTML response (`window.close()`), and pushes the token into the plugin.

## Consequences
- Eliminates manual token copy-paste completely.
- Automatically transitions the sidebar from login state to the populated reference library view.
- Requires registering the matching Redirect URL (`https://...` or `http://127.0.0.1...`) in the Mendeley Developer Portal.
