# Force Browser Extension Data

Force Browser Extension Data is a script to rewrite `browser.storage.local` configuration which is stored at ${ProfD}/browser-extension-data/storage.js.
It is aimed to force specific configuration to an addon which is based on WebExtension.

# How to use

Define a preference for addons, like:

```
pref("extensions.forcebrowserextensiondata.<uuid of target addon>", "{\"key\": \"value\"}");
```

# Usecase for MCD

```
// Disable to show https://helpx.adobe.com/acrobat/kb/acrobat-pro-firefox-extension.html during install process
pref("extensions.forcebrowserextensiondata.web2pdfextension.17@acrobat.adobe.com", "{\"extnfte\":{\"name\":\"fte\"}}");
```
