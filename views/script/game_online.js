if (location.search === "?online") {
    document.getElementById('online-login').style.display = "";
    if (location.hash === "#legacy") {
        document.write(`<` + `script src="../online/global_ktpv1.js"></` + `script>`);
    } else {
        document.write(`<` + `script src="../online/global_ktpv2.js"></` + `script>`);
    }
} else {
    startHooks.forEach((hook) => {
        hook(this);
    })
    document.getElementById('ping').style.display = "none";
}