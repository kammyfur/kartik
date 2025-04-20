if (location.hash === "#ready") {
    global.musicElement = new Audio();
    const musicIpc = require('electron').ipcRenderer;

    musicIpc.on('setmusic', (event, args) => {
        musicElement.src = args;
        musicElement.play();
        musicElement.volume = 1;
        musicElement.loop = true;
        /*if (!musicElement.paused) {
            csi1 = setInterval(() => {
                if (musicElement.volume <= 0.05) {
                    clearInterval(csi1);
                    musicElement.src = args;
                    musicElement.play();
                    musicElement.volume = 0;
                    csi2 = setInterval(() => {
                        if (musicElement.volume >= 0.95) {
                            clearInterval(csi2);
                            return;
                        }
                        musicElement.volume = musicElement.volume + 0.05;
                    }, 100)
                    return;
                }
                musicElement.volume = musicElement.volume - 0.05;
            }, 100)
        } else {
            musicElement.src = args;
            musicElement.play();
        }*/
        /*try { csp1.volume = 0; } catch (e) {}
        try { csp2.volume = 0; } catch (e) {}
        song = args;

        if (song !== null && song !== "" && csng !== song) {
            if (cspn === 1) {
                if (csp1 !== null) {
                    csi1 = setInterval(() => {
                        if (csp1.volume <= 0.05) {
                            csp1.pause();
                            csp1.volume = 0;
                            clearInterval(csi1);
                            return;
                        }
                        csp1.volume = csp1.volume - 0.05;
                    }, 100)
                }
                csp2 = new Audio(song);
                csp2.volume = 0;
                csp2.loop = true;
                csp2.play();
                csi2 = setInterval(() => {
                    if (csp2.volume >= 0.95) {
                        clearInterval(csi2);
                        return;
                    }
                    csp2.volume = csp2.volume + 0.05;
                }, 100)
                csng = song;
                cspn = 2;
            } else {
                if (csp2 !== null) {
                    csi2 = setInterval(() => {
                        if (csp2.volume <= 0.05) {
                            csp2.pause();
                            csp2.volume = 0;
                            clearInterval(csi2);
                            return;
                        }
                        csp2.volume = csp2.volume - 0.05;
                    }, 100)
                }
                csp1 = new Audio(song);
                csp1.volume = 0;
                csp1.loop = true;
                csp1.play();
                csi1 = setInterval(() => {
                    if (csp1.volume >= 0.95) {
                        clearInterval(csi1);
                        return;
                    }
                    csp1.volume = csp1.volume + 0.05;
                }, 100)
                csng = song;
                cspn = 1;
            }
        }*/
    })

    musicIpc.on('fademusic', (event) => {
        if (!musicElement.paused) {
            csi1 = setInterval(() => {
                if (musicElement.volume <= 0.3) {
                    clearInterval(csi1);
                    return;
                }
                musicElement.volume = musicElement.volume - 0.05;
            }, 100)
        }
    })

    musicIpc.on('unfademusic', (event) => {
        if (!musicElement.paused) {
            csi1 = setInterval(() => {
                if (musicElement.volume >= 0.95) {
                    clearInterval(csi1);
                    return;
                }
                musicElement.volume = musicElement.volume + 0.05;
            }, 100)
        }
    })

}