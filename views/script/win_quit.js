setInterval(() => {
    if (require('@electron/remote').getCurrentWindow().controllerAttached) {
        document.getElementById('progress').innerText = lang.win.quit[1];
    } else {
        document.getElementById('progress').innerText = lang.win.quit[0];
    }
}, 100)