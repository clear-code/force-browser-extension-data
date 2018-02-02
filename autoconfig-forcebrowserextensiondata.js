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

}
