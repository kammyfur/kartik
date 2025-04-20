if (location.search !== "?noreset") {
    console.log("back");
    if (require('@electron/remote').getCurrentWindow().music) require('electron').ipcRenderer.send('newmusic', kresources.music['title'].file);
}
info("MenuWindow", "Menu opened");
