if (require('@electron/remote').getCurrentWindow().music) {
    info("MusicMgr", "Playing win.mp3");
    require('electron').ipcRenderer.send('newmusic', kresources.music['win'].file);
}