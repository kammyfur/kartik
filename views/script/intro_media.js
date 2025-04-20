if (require('@electron/remote').getCurrentWindow().music) {
    info("MusicMgr", "Playing title.mp3");
    require('electron').ipcRenderer.send('newmusic', kresources.music['title'].file);
}