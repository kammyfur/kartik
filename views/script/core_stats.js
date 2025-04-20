const fs = require('fs');
const homedir = require('@electron/remote').getCurrentWindow().homedir;

session = null;
timer = null;
current = null;

webview.addEventListener('dom-ready', () => {
    try {
        if (webview.getURL() !== current) {
            if (session !== null) {
                require('electron').ipcRenderer.send('addstats', { catalog: "times", key: session, add: Math.floor((new Date() - timer)/1000) });

                session = null;
                timer = null;
                current = null;
            }
        }

        if (webview.getURL().endsWith("game.html")) { //        Local
            session = "local";
            timer = new Date();
            current = webview.getURL();
        }
        if (webview.getURL().endsWith("game.html?sp")) { //     Singleplayer
            session = "single";
            timer = new Date();
            current = webview.getURL();
        }
        if (webview.getURL().endsWith("game.html?online")) { // Online
            session = "online";
            timer = new Date();
            current = webview.getURL();
        }
    } catch (e) {}
})

window.addEventListener("beforeunload", function(e){
    try {
        if (session !== null) {
            require('electron').ipcRenderer.send('addstatsandclose', { catalog: "times", key: session, add: Math.floor((new Date() - timer)/1000) });

            session = null;
            timer = null;
            current = null;

            e.preventDefault();
            return false;
        }
    } catch (e) {}
}, false);