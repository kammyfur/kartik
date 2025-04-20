startHooks.push(() => {
    info("MusicMgr", "Playing game" + i + ".mp3");
    if (require('@electron/remote').getCurrentWindow().music) require('electron').ipcRenderer.send('newmusic', kresources.music['game' + i].file);
})

if (location.search === "?online") {
    if (require('@electron/remote').getCurrentWindow().music) require('electron').ipcRenderer.send('newmusic', kresources.music['prepare'].file);
}
