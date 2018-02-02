{
    // Force Browser Extension Data for Firefox 60 and later
    const { classes: Cc, interfaces: Ci, utils: Cu } = Components;
    const { Services } = Cu.import('resource://gre/modules/Services.jsm', {});
    const { FileUtils } = Cu.import('resource://gre/modules/FileUtils.jsm', {});
    const { OS } = Cu.import("resource://gre/modules/osfile.jsm", {});

    const log = (aMessage) => {
	Services.console.logStringMessage(`[forcebrowserextensiondata] ${aMessage}`);
    };

    const getDescendantPrefs = (aRoot) => {
	return Services.prefs.getChildList(aRoot, {}).sort();
    };

    const tryInitializeStorageJs = () => {
	const prefix = 'extensions.forcebrowserextensiondata.';
	for (let addonPref of getDescendantPrefs(prefix)) {
	    let file = Services.dirsvc.get('ProfD', Ci.nsIFile);
	    file.append('browser-extension-data');
	    if (!file.exists()) {
		file.create(Ci.nsIFile.DIRECTORY_TYPE, FileUtils.PERMS_DIRECTORY);
	    }
	    const uuid = addonPref.substring(prefix.length);
	    file.append(uuid);
	    if (!file.exists()) {
		file.create(Ci.nsIFile.DIRECTORY_TYPE, FileUtils.PERMS_DIRECTORY);
	    }
	    file.append('storage.js');
	    value = getPref(addonPref);
	    if (!file.exists()) {
		OS.File.open(file.path, {create:true}).then (fd => {
		    fd.close();
		    OS.File.writeAtomic(file.path, value, { tmpPath: file.path + ".tmp" });
		});
	    } else {
		OS.File.read(file.path, {}).then (contents => {
		    let storage = JSON.parse(contents);
		    // TODO: support partially update
		    OS.File.writeAtomic(file.path, JSON.stringify(storage), { tmpPath: file.path + ".tmp" });
		}).then(null, error => {
		    try {
			OS.File.writeAtomic(file.path, value, { tmpPath: file.path + ".tmp" });
		    } catch(e) {
			// ignore error for missing local storage
		    }
		});
	    }
	}
    }

    Services.prefs.addObserver("extensions.webextensions.uuids", function(aSubject, aTopic, aData) {
	if (aData == "extensions.webextensions.uuids" && aTopic == "nsPref:changed")
	    tryInitializeStorageJs();
    }, false);
    tryInitializeStorageJs();
}
