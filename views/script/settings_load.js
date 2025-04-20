info("OptnWindow", "Restoring settings...");

if (require('@electron/remote').getCurrentWindow().music) {
    if (location.search === "?credits") {
        require('electron').ipcRenderer.send('newmusic', kresources.music['title'].file);
    }
    document.getElementById("setting-music").innerText = "1";
} else {
    document.getElementById("setting-music").innerText = "0";
}

slang = require('@electron/remote').getCurrentWindow().lp;
langs = require('../lang/languages.json');

if (Object.keys(langs).includes(slang)) {
    document.getElementById("setting-lang").innerText = langs[slang];
} else {
    document.getElementById("setting-lang").innerText = slang;
}
