if (require('@electron/remote').getCurrentWindow().music) {
    info("MusicMgr", "Playing stats.mp3");
    require('electron').ipcRenderer.send('newmusic', kresources.music['stats'].file);
}