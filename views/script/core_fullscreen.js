window.addEventListener("load", () => {
    require('@electron/remote').getCurrentWindow().show();

    if (location.hash === "#ready") {
        const Nest = require("./nest/abi");

        $(document).keydown(function(e) {
            if (e.keyCode === 122 || e.keyCode === 121 || e.keyCode === 112) { // F11/F1/F10
                if (!require('@electron/remote').getCurrentWindow().fullScreen && require('@electron/remote').getCurrentWindow().fullScreenable) {
                    require('@electron/remote').getCurrentWindow().setFullScreen(true);
                } else {
                    require('@electron/remote').getCurrentWindow().setFullScreen(false);
                }
            }
        })

        $(document).keydown(function(e) {
            currentNest = Nest.load(homedir + "/.KartikX/current.kfnx");

            if (e.keyCode === 122 || e.keyCode === 121 || e.keyCode === 112) {
                if (currentNest.config.fullscreen) {
                    currentNest.config.fullscreen = false;
                    Nest.export(homedir + "/.KartikX/current.kfnx", currentNest);
                    require('electron').ipcRenderer.send("reloadNest")
                } else {
                    currentNest.config.fullscreen = true;
                    Nest.export(homedir + "/.KartikX/current.kfnx", currentNest);
                    require('electron').ipcRenderer.send("reloadNest");
                }
            }
        })

        currentNest = Nest.load(homedir + "/.KartikX/current.kfnx");
        if (currentNest.config.fullscreen) {
            require('@electron/remote').getCurrentWindow().setFullScreen(true);
        } else {
            currentNest.config.fullscreen = false;
            Nest.export(homedir + "/.KartikX/current.kfnx", currentNest);
            require('electron').ipcRenderer.send("reloadNest")
        }
    }
})