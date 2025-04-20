function getCookie(cname) {
   var name = cname + "=";
   var decodedCookie = decodeURIComponent(document.cookie);
   var ca = decodedCookie.split(';');
        for(var i = 0; i <ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
    return "";
}

if (getCookie("kartik_lang").trim() === "") {
    document.cookie = "kartik_lang=en; path=/";
}

if (typeof native === "boolean" && !native) {
    try {
        global.lp   = getCookie("kartik_lang");
        global.ll_length = getCookie("kartik_i18n_" + lp) - 1 + 2;
        global.ll_raw = "";
        
        for (i = 1; i <= ll_length; i++) {
            global.ll_raw = ll_raw + getCookie("kartik_i18n_" + lp + "_" + (i - 1));
        }
        
        global.lang = JSON.parse(ll_raw);
    } catch (e) {
        console.error(e);
        global.lp   = "en";
        global.lang = JSON.parse(window.fetch("./lang/" + lp + ".json").toString());
    }    
} else {
    if (typeof webview !== "undefined") {
        console.log("Delaying language files loading");
        if (location.hash === "#ready") {
            try {
                global.lp   = require('electron').remote.getCurrentWindow().lp.trim();
                global.lang = JSON.parse(require('fs').readFileSync("./lang/" + lp + ".json").toString());
            } catch (e) {
                console.error(e);
                global.lp   = "en";
                global.lang = JSON.parse(require('fs').readFileSync("./lang/" + lp + ".json").toString());
            }
        }
    } else {
        try {
            global.lp   = require('electron').remote.getCurrentWindow().lp.trim();
            global.lang = JSON.parse(require('fs').readFileSync("./lang/" + lp + ".json").toString());
        } catch (e) {
            console.error(e);
            global.lp   = "en";
            global.lang = JSON.parse(require('fs').readFileSync("./lang/" + lp + ".json").toString());
        }
    }
}
