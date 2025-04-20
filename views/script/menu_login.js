global.loggingIn = false;
homedir = require('@electron/remote').getCurrentWindow().homedir;

function startLogin() {
    loggingIn = true;

    document.getElementById('loggingIn').style.display = "flex";
    var http = require('http');

    reqid = 0;

    var server = http.createServer(function (req, res) {

        const queryObject = require('querystring').parse(req.url,true);
        token = queryObject[Object.keys(queryObject)[0]];
        res.end(lang.polymer.loginClose);
        reqid++;

        if (reqid === 1) {
            document.getElementById("loggingIn").innerText = lang.polymer.gatheringLogin
            require('@electron/remote').getCurrentWindow().focus();
            server.close();

            playerData = {
                "picture": null,
                "name": null,
                "level": -1,
                "token": token
            };

            playerData.picture = $.ajax({
                type: "GET",
                url: 'https://kartik.hopto.org/online/ingame/api/profile.picture.php?kartik_online_token=' + token,
                async: false,
                error: (e) => { throw e; }
            }).responseText.trim();

            playerData.name = $.ajax({
                type: "GET",
                url: 'https://kartik.hopto.org/online/ingame/api/profile.name.php?kartik_online_token=' + token,
                async: false,
                error: (e) => { throw e; }
            }).responseText.trim();

            playerData.level = $.ajax({
                type: "GET",
                url: 'https://kartik.hopto.org/online/ingame/api/profile.level.php?kartik_online_token=' + token,
                async: false,
                error: (e) => { throw e; }
            }).responseText.trim() - 1 + 1;

            if (playerData.level >= 0 && playerData.name !== null && playerData.picture !== null) {
                console.log(playerData);
                loggingIn = false;
                document.getElementById('loggingIn').style.display = "none";
                currentNest.auth = playerData;
                Nest.export(homedir + "/.KartikX/current.kfnx", currentNest);require('electron').ipcRenderer.send("reloadNest")
                keysEnabled = false;
                require('electron').ipcRenderer.send('prefademusic', "");
                $("#box").fadeOut(500);
                setTimeout(() => {
                    location.href = "menu.html";
                }, 1000)
            } else {
                throw new Error("Incomplete information received");
            }
        }

    });

    server.listen(14552);

    console.log('Waiting for login requests on port 14552')
    require('open')("https://kartik.hopto.org/online/ingame");
}

window.addEventListener('load', () => {
    onlineMode = false;

    window.fetch("https://kartik.hopto.org/latest.php?v=" + require('@electron/remote').getCurrentWindow().update).then((data) => {
        data.blob().then((a) => {
            a.text().then((b) => {
                onlineMode = true;
                postOnlineMode();
            }).catch((e) => {
                require('@electron/remote').getCurrentWindow().webContents.send("notification", {title: lang.polymer.error[0], message: lang.polymer.error[1]});
                console.error(e);
                onlineMode = false;
                postOnlineMode();
                document.getElementById("loginIntro").innerText = lang.polymer.error[2];
            })
        }).catch((e) => {
            require('@electron/remote').getCurrentWindow().webContents.send("notification", {title: lang.polymer.error[0], message: lang.polymer.error[1]});
            console.error(e);
            onlineMode = false;
            postOnlineMode();
            document.getElementById("loginIntro").innerText = lang.polymer.error[2];
        })
    }).catch((e) => {
        require('@electron/remote').getCurrentWindow().webContents.send("notification", {title: lang.polymer.error[0], message: lang.polymer.error[1]});
        console.error(e);
        onlineMode = false;
        postOnlineMode();
        document.getElementById("loginIntro").innerText = lang.polymer.error[2];
    })
})

function logout() {
    $.ajax({
        type: "GET",
        url: 'https://kartik.hopto.org/online/ingame/api/profile.logout.php?kartik_online_token=' + currentNest.auth.token,
        async: false,
        error: (e) => { throw e; }
    }).responseText.trim();
    currentNest.auth = null;
    Nest.export(homedir + "/.KartikX/current.kfnx", currentNest);require('electron').ipcRenderer.send("reloadNest")
}

function postOnlineMode() {
    try {
        if (currentNest.auth !== null) {
            console.log(currentNest.auth);
            tokenvalidity = $.ajax({
                type: "GET",
                url: 'https://kartik.hopto.org/online/ingame/api/profile.token.php?kartik_online_token=' + currentNest.auth.token,
                async: false,
                error: (e) => { throw e; }
            }).responseText.trim();

            if (tokenvalidity !== "true") {
                require('@electron/remote').getCurrentWindow().webContents.send("notification", {title: lang.polymer.token[0], message: lang.polymer.token[1]});
                logout();
            }
        }

        if (currentNest.auth === null || !onlineMode) {
            $(document).keydown(function(e) {
                if (e.keyCode === 76 && !loggingIn && onlineMode) {
                    startLogin();
                }
            })
        } else {
            $(document).keydown(function(e) {
                if (e.keyCode === 76 && !loggingIn && onlineMode) {
                    logout();
                    location.reload();
                }
            })

            authData = currentNest.auth;

            document.getElementById('loginIntro').style.display = "none";
            document.getElementById('loginUser').style.display = "grid";

            olevel = $.ajax({
                type: "GET",
                url: 'https://kartik.hopto.org/online/ingame/api/profile.level.php?kartik_online_token=' + authData.token,
                async: false,
                error: (e) => { throw e; }
            }).responseText.trim() - 1 + 1;

            if (authData.level > olevel) {
                $.ajax({
                    type: "GET",
                    url: 'https://kartik.hopto.org/online/ingame/api/set.level.php?kartik_online_token=' + authData.token + "&level=" + authData.level,
                    async: false,
                    error: (e) => { throw e; }
                });
            } else if (authData.level < olevel) {
                authData.level = $.ajax({
                    type: "GET",
                    url: 'https://kartik.hopto.org/online/ingame/api/profile.level.php?kartik_online_token=' + authData.token,
                    async: false,
                    error: (e) => { throw e; }
                }).responseText.trim() - 1 + 1;
                currentNest.auth = authData;
                Nest.export(homedir + "/.KartikX/current.kfnx", currentNest);require('electron').ipcRenderer.send("reloadNest")
            }

            ostats = JSON.parse($.ajax({
                type: "GET",
                url: 'https://kartik.hopto.org/online/ingame/api/profile.stats.php?kartik_online_token=' + authData.token,
                async: false,
                error: (e) => { throw e; }
            }).responseText.trim())

            if (ostats === null) {
                cstats = currentNest.stats;
            } else {
                cstats = {};

                for (group in currentNest.stats) {
                    cstats[group] = {};

                    for (item in currentNest.stats[group]) {
                        if (ostats[group][item]) {
                            if (ostats[group][item] > currentNest.stats[group][item]) {
                                cstats[group][item] = ostats[group][item];
                            } else {
                                cstats[group][item] = currentNest.stats[group][item];
                            }
                        } else {
                            cstats[group][item] = currentNest.stats[group][item];
                        }
                    }
                }
            }

            $.ajax({
                type: "GET",
                url: 'https://kartik.hopto.org/online/ingame/api/set.stats.php?kartik_online_token=' + authData.token + "&stats=" + Buffer.from(JSON.stringify(cstats)).toString("base64"),
                async: false,
                error: (e) => { throw e; }
            });

            currentNest.stats = JSON.parse($.ajax({
                type: "GET",
                url: 'https://kartik.hopto.org/online/ingame/api/profile.stats.php?kartik_online_token=' + authData.token,
                async: false,
                error: (e) => { throw e; }
            }).responseText.trim());
            Nest.export(homedir + "/.KartikX/current.kfnx", currentNest);require('electron').ipcRenderer.send("reloadNest")

            document.getElementById('kto-picture').src = authData.picture;
            document.getElementById('kto-username').innerText = authData.name;
            if (authData.level < 200) {
                document.getElementById('kto-level').innerText = authData.level;
            } else {
                document.getElementById('kto-level').innerText = lang.polymer.ktoMaxLevel;
            }
        }
    } catch (e) {
        require('@electron/remote').getCurrentWindow().webContents.send("notification", {title: lang.polymer.error[0], message: lang.polymer.error[1]});
        console.error(e);
        onlineMode = false;
        document.getElementById("loginIntro").innerText = lang.polymer.error[2];
    }
}