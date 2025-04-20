if (location.search === "?sp") {
    if ((location.hash.substr(4) - 1 + 2) == 1) {
        require('@electron/remote').getCurrentWindow().dstate = lang.discord.win[0];
        require('@electron/remote').getCurrentWindow().ddetails = lang.discord.game[1];
    } else {
        require('@electron/remote').getCurrentWindow().dstate = lang.discord.win[1];
        require('@electron/remote').getCurrentWindow().ddetails = lang.discord.game[1];
    }
} else {
    require('@electron/remote').getCurrentWindow().dstate = lang.discord.win[0];
    require('@electron/remote').getCurrentWindow().ddetails = lang.discord.game[2];
}