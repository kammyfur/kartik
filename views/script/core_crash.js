global.gameCrashed = false;
crashSound = new Audio("./sfx/gamecrash.wav");

function destroy() {
    global.gameCrashed = true;
    crashSound.play();
    require('@electron/remote').webContents.fromId(webview.getWebContentsId()).forcefullyCrashRenderer();
    try { musicElement.pause(); } catch (e) {}
}

function spawnError(crashReport) {
    document.getElementById("error-outer").style.display = "flex";
    document.getElementById("crash-dump").value = crashReport;
    destroy();
}

const crashHandler = require('electron').ipcRenderer;

crashHandler.on('crashreport', (event, args) => {
    spawnError(args);
})