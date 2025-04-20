Object.keys(process.versions).forEach((e) => {
    v = process.versions[e];
    document.write("<div>" + e.substr(0, 1).toUpperCase() + e.substr(1) + " contributors</div>");
})
dirs = require('fs').readdirSync("./node_modules");
dirs.forEach((dir) => {
    if (!dir.startsWith(".") && !dir.startsWith("@") && dir !== "electron") {
        j = JSON.parse(require('fs').readFileSync("./node_modules/" + dir + "/package.json").toString());
        if (typeof j.author === "string") {
            document.write("<div>" + j.author + "</div>");
        } else {
            document.write("<div>" + j.name.substr(0, 1).toUpperCase() + j.name.substr(1) + " authors</div>");
        }
    }
})