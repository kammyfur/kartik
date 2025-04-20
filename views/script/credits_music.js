if (require('@electron/remote').getCurrentWindow().music) {
    info("MusicMgr", "Playing settings.mp3");
    require('electron').ipcRenderer.send('newmusic', kresources.music['credits'].file);
}