---
title: Connect the browser extension
slug: docs/guides/browser-extension
---

1. [Install the extension](/#extension) for your browser.
2. Start Surge with `surge` in a terminal or run `surge server` for a headless setup.
3. Copy the token from **Settings → Extension** in the TUI, or run `surge token` as the user running Surge.
4. Open the extension settings and paste the token. For Surge running on the same device, use the default address, `localhost:1700`.
5. Start a download in the browser and check that it appears in your Surge queue.

## Troubleshoot the connection

- Check that Surge is running and that the port in the extension matches the server port.
- If you started the TUI with `--no-server`, restart it without that flag so the extension can connect.
- If Surge rejects the token, copy it again from the running instance. If the address is on a different machine, follow [Connect to a remote server](/docs/guides/connect-to-a-remote-server/).

See the [Surge privacy policy](/privacy/) for information about the application and extension.
