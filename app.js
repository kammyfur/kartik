console.log("KartikX " + require('./package.json').version + "\n");
process.chdir('./resources/app');

global.start = new Date();
global.KartikRoot = __dirname;
global.shouldExitIfClosed = false;
const { app, BrowserWindow } = require('electron');
const fs = require("fs");

(async () => {
    process.on('uncaughtException', (error) => {
        console.log(error.stack);
        process.exit(2);
    })

    process.on('unhandledRejection', (reason) => {
        console.log("Promise Rejection: " + reason);
        id = new Date().toISOString();

        require('fs').writeFileSync(homedir + "/.KartikX/crashes/" + id + ".txt", "KartikX Bootstraper Crash (in promise)\n\n" + reason);
        if (require('os').platform() === "win32") {
            require('child_process').exec("runtime\\kartik-crash.bat");
        } else if (require('os').platform() === "darwin") {
            require('child_process').exec("./runtime/kartik-crash-mac.sh");
        } else {
            require('child_process').exec("./runtime/kartik-crash.sh");
        }
        process.exit(2);
    })

    if (process.argv[2] === "m") {
        if (!require('fs').existsSync(__dirname + "/data")) {
            require('fs').mkdirSync(__dirname + "/data");
        }
        global.homedir = __dirname + "/data";
    } else {
        global.homedir = require('os').userInfo().homedir;
    }

    /* --------------------- */

    app.setAppLogsPath(homedir + "/.KartikX/logs");
    app.setPath("crashDumps", homedir + "/.KartikX/dumps");
    app.setPath('userData', homedir + "/.KartikX/storage");
    app.whenReady().then(async () => {

        slpm = require('os-locale');
        slpw = await slpm();
        slpo = slpw.substr(0, 2);
        slng = require('./lang/languages.json');
        if (Object.keys(slng).includes(slpo)) {
            dlp = slpo;
        } else {
            dlp = "en";
        }


        if (!require('fs').existsSync(homedir + "/.KartikX")) {
            require('fs').mkdirSync(homedir + "/.KartikX")
        }

        if (!require('fs').existsSync(homedir + "/.KartikX/crashes")) {
            require('fs').mkdirSync(homedir + "/.KartikX/crashes")
        }

        if (!require('fs').existsSync(homedir + "/.KartikX/mods")) {
            require('fs').mkdirSync(homedir + "/.KartikX/mods")
        }

        if (require('fs').existsSync(homedir + "/.KartikX/build")) {
            require('fs').rmSync(homedir + "/.KartikX/build", { recursive: true })
        }
        require('fs').mkdirSync(homedir + "/.KartikX/build")


        const fs = require('fs');
        const Nest = require('./nest/abi');

        if (fs.existsSync(homedir + "/.KartikX/config") && fs.existsSync(homedir + "/.KartikX/config/voice.txt") && fs.existsSync(homedir + "/.KartikX/config/online.txt") && fs.existsSync(homedir + "/.KartikX/config/music.txt") && fs.existsSync(homedir + "/.KartikX/config/lang.txt") && fs.existsSync(homedir + "/.KartikX/stats.json")) {
            Nest.convert(homedir + "/.KartikX/current.kfnx", homedir + "/.KartikX");
        } else {
            if (!fs.existsSync(homedir + "/.KartikX/current.kfnx")) {
                Nest.generate(homedir + "/.KartikX/current.kfnx");
            } else {
                fs.copyFileSync(homedir + "/.KartikX/current.kfnx", homedir + "/.KartikX/latest.kfnx");
            }
        }

        global.currentNest = Nest.load(homedir + "/.KartikX/current.kfnx");

        currentNest._version = require('./package.json').version;
        Nest.export(homedir + "/.KartikX/current.kfnx", currentNest);

        /* --------------------- */

        require('@electron/remote/main').initialize();

        function createWindow () {

            lp = currentNest.config.lang

            time = new Date() - start;
            global.shouldExitIfClosed = true;

            win.pwidth = 720;
            win.pheight = 540;
            win.log = console.log;

            win.debug = process.argv[2] === "d";
            win.channel = "eap";
            win.cmdlineargs = process.argv;
            win.scale = 1.2;
            win.update = dimga;
            win.gamepads = [];
            win.controllerAttached = false;
            win.webview = null;
            win.dstate = "Kartik";
            win.ddetails = "Kartik";
            win.mods = mods;

            win.modsfiles = compiledTypeScriptFiles;
            win.homedir = homedir;

            win.lp = lp;
            win.music = currentNest.config.music;
            win.voice = currentNest.config.voice;

            win.online = currentNest.config.online;
            win.nest = currentNest;

            win.resources = resources;
            global.currentSongValue = null;

            require('./lang/preload.js');
            require('./discord/client.js');

            if (win.debug) {
                win.openDevTools();
            }

            win.webContents.send('ready', true);

            win.webContents.on('dom-ready', () => {
                musicIpc = require('electron').ipcMain;
                musicIpc.on('newmusic', (event, value) => {
                    if (music) {
                        win.webContents.send('setmusic', value);
                    }
                })

                musicIpc.on('reloadNest', (event) => {
                    currentNest = Nest.load(homedir + "/.KartikX/current.kfnx");
                    win.nest = currentNest;
                })

                const LevelsAPI = require('./views/script/global_levelsapi');
                const lvl = new LevelsAPI();

                stats = currentNest.stats;
                musicIpc.on('addstats', (event, value) => {
                    currentNest.stats[value.catalog][value.key] = currentNest.stats[value.catalog][value.key] + value.add;
                    Nest.export(homedir + "/.KartikX/current.kfnx", currentNest);
                    currentNest = Nest.load(homedir + "/.KartikX/current.kfnx");
                    win.nest = currentNest;

                    if (value.key === "laps" && currentNest.auth) {
                        auth = currentNest.auth;
                        level = lvl.correspond(currentNest.stats["ingame"]["laps"], "256") - 1 + 1;

                        if (level !== auth.level) {
                            currentNest.auth.level = level;
                            Nest.export(homedir + "/.KartikX/current.kfnx", currentNest);
                            currentNest = Nest.load(homedir + "/.KartikX/current.kfnx");
                            win.nest = currentNest;
                            if (level < 200) {
                                win.webContents.send("notification", {title: lang.polymer.levelup[0], message: lang.polymer.levelup[1] + " " + level + " " + lang.polymer.levelup[2]});
                            } else {
                                win.webContents.send("notification", {title: lang.polymer.finished[0], message: lang.polymer.finished[1]});
                            }
                        }
                    }
                })
                musicIpc.on('addstatsandclose', (event, value) => {
                    currentNest.stats[value.catalog][value.key] = currentNest.stats[value.catalog][value.key] + value.add;
                    Nest.export(homedir + "/.KartikX/current.kfnx", currentNest);
                    currentNest = Nest.load(homedir + "/.KartikX/current.kfnx");
                    win.nest = currentNest;
                    win.destroy();
                })
            })
        }

        logo = "logo/logo.png";
        channel = " ";
        global.dimg = "official";
        global.dimga = "stable";
        global.dchan = "KartikX Stable";

        global.win = new BrowserWindow({
            width: 1220,
            height: 720,
            minWidth: 720,
            minHeight: 540,
            resizeable: true,
            resizable: true,
            maximizable: true,
            show: false,
            enableLargerThanScreen: true,
            icon: logo,
            backgroundColor: "#000000",
            title: "Kartik",
            webPreferences: {
                nodeIntegration: true,
                contextIsolation: false,
                enableRemoteModule: true,
                webviewTag: true,
                disableBlinkFeatures: "MediaSessionService",
            }
        })
        win.loadFile('./index.html')
        win.setMenu(null);
        win.webContents.once('dom-ready', () => {
            win.show();
            global.importedTypeScriptFiles = [];
            global.compiledTypeScriptFiles = [];
            require('./modding/resources');
            require('./modding/parser');
            require('./modding/compiler');
            require('./typescript/preloader');
            createWindow();
        })
    })

    app.on('window-all-closed', () => {
        if (shouldExitIfClosed) {
            app.quit()
        }
    })
})();
