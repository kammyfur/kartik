global.quitting = false;

startHooks.push(() => {
    global.pause = (stat) => {
        if (stat) {
            if (location.search === "?sp") {
                require('@electron/remote').getCurrentWindow().dstate = lang.discord.game[3];
                require('@electron/remote').getCurrentWindow().ddetails = lang.discord.game[1];
            } else {
                require('@electron/remote').getCurrentWindow().dstate = lang.discord.game[3];
                require('@electron/remote').getCurrentWindow().ddetails = lang.discord.game[2];
            }
            warn("Suspend", "Game paused");
            Sound.pause();
            if (require('@electron/remote').getCurrentWindow().music) {
                shouldMusicPlay = false;
                require('electron').ipcRenderer.send('prefademusic', "");
            }
            if (typeof e !== "undefined") {
                if (e.currentTime < e.duration) {
                    e.pause();
                }
            }
            if (typeof b !== "undefined") {
                b.pause();
            }
            paused = true;
            document.getElementById('box').classList.add('paused');
            $("#paused").show();
        } else {
            if (location.search === "?sp") {
                require('@electron/remote').getCurrentWindow().dstate = lang.discord.game[0];
                require('@electron/remote').getCurrentWindow().ddetails = lang.discord.game[1];
            } else {
                require('@electron/remote').getCurrentWindow().dstate = lang.discord.game[0];
                require('@electron/remote').getCurrentWindow().ddetails = lang.discord.game[2];
            }
            warn("Suspend", "Game resumed");
            Sound.pause();
            if (require('@electron/remote').getCurrentWindow().music) {
                shouldMusicPlay = true;
                require('electron').ipcRenderer.send('preunfademusic', "");
            }
            if (typeof me !== "undefined") {
                if (me.currentTime < me.duration) {
                    me.play();
                }
            }
            if (typeof b !== "undefined") {
                b.play();
            }
            paused = false;
            document.getElementById('box').classList.remove('paused');
            $("#paused").hide();
        }
    }

    global.selectOption = () => {
        item = document.querySelector(".selected a").id;
        Sound.click();

        switch (item) {
            case 'continue':
                pause(false);
                break;
            case 'hitboxes':
                if (hitshow) {
                    hitshow = false;
                    document.getElementById("circuit").classList.remove("hitboxes");
                    document.getElementById('hitboxes').innerText = lang.game.gpause.showhb;
                    info("GameWindow", "Hitboxes hidden");
                } else {
                    hitshow = true;
                    document.getElementById("circuit").classList.add("hitboxes");
                    document.getElementById('hitboxes').innerText = lang.game.gpause.hidehb;
                    info("GameWindow", "Hitboxes shown");
                }
                break;
            case 'quit':
                if (online) {
                    global.quitting = true;
                    clientWriter(JSON.stringify({
                        t: "ipc",
                        action: "abort",
                        message: null
                    }) + "|")
                }
                keysEnabled = false;
                require('electron').ipcRenderer.send('prefademusic', "");
                $("#box").fadeOut(500);
                $("#bg").fadeOut(500);
                $("#paused").fadeOut(500);
                setTimeout(() => {
                    info("GameWindow", "Switching control to MenuWindow");
                    location.href = "menu.html?back";
                }, 1000)
                break;
        }
    }
})