if (location.hash === "#ready") {
    files = require('@electron/remote').getCurrentWindow().modsfiles;
    global.HTML = window;

    for (file of files) {
        var script = document.createElement('script');
        script.src = "file://" + file.replaceAll("\\", "/");
        document.head.appendChild(script)
    }
}