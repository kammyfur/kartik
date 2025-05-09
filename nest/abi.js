const fs = require('fs');
var zlib = require('zlib');

module.exports = {
    export(file, obj) {
        fs.writeFileSync(file, zlib.deflateSync(Buffer.from(Buffer.from(JSON.stringify(obj)).toString("base64")).toString("hex")))
    },

    load(file) {
        if (typeof window !== "undefined") {
            require('@electron/remote').getCurrentWindow().log("[1] Loading KFNv2 at " + file)
        } else {
            console.log("[0] Loading KFNv2 at " + file)
        }
        data = fs.readFileSync(file)
        uncomp = zlib.inflateSync(data).toString();

        b1 = Buffer.from(uncomp, "hex").toString("utf-8");
        item = Buffer.from(b1, "base64").toString("utf-8");

        decoded = JSON.parse(item);

        return decoded;
    },

    generate(file) {
        o = {
            "_version": "<unknown>",
            "stats": {
                "times": {
                    "single": 0,
                    "local": 0,
                    "online": 0
                },
                "results": {
                    "wins": 0,
                    "loses": 0
                },
                "ingame": {
                    "walls": 0,
                    "laps": 0,
                    "turns": 0
                }
            },
            "auth": null,
            "config": {
                "lang": "en",
                "music": true,
                "online": true,
                "voice": false
            }
        }

        this.export(file, o);
    },

    convert(file, dotkartik) {
        if (fs.existsSync(dotkartik + "/authentication.json")) {
            auth = JSON.parse(fs.readFileSync(dotkartik + "/authentication.json"));
        } else {
            auth = null;
        }

        o = {
            "_version": "<unknown>",
            "stats": JSON.parse(fs.readFileSync(dotkartik + "/stats.json").toString()),
            "auth": auth,
            "config": {
                "lang": fs.readFileSync(dotkartik + "/config/lang.txt").toString().trim(),
                "music": fs.readFileSync(dotkartik + "/config/music.txt").toString().trim() === "1",
                "online": fs.readFileSync(dotkartik + "/config/online.txt").toString().trim() === "1",
                "voice": fs.readFileSync(dotkartik + "/config/voice.txt").toString().trim() === "1"
            }
        }

        this.export(file, o);
    }
}