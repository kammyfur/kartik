if (native) {global.$ = require('jquery');} else {var script = document.createElement('script');script.src = './webinit/jquery.js';script.type = 'text/javascript';document.getElementsByTagName('head')[0].appendChild(script);}

if (native && require('@electron/remote').getCurrentWindow().debug) {
    document.write('<link rel="stylesheet" href="' + atob("Li92aWV3cy9jb21tb24vZGVidWcuY3Nz") + '">');
}
