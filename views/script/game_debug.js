global.debugshow = false;
global.pingshow = false;

function oil(id) {
    return "\nO" + id +": " + document.getElementById('oil' + id + '').style.left.split("px")[0] + " " + document.getElementById('oil' + id + '').style.top.split("px")[0] + " / " + document.getElementById('oil' + id + '').style.transform.split("rotate(")[1].split("deg)")[0];
}

$(document).keydown((e) => {
    if (e.keyCode === 114) { // F3
        if (debugshow) {
            global.debugshow = false;
            document.getElementById("debug").style.display = "none";
        } else {
            global.debugshow = true;
            document.getElementById("debug").style.display = "";
        }
    }
    if (e.keyCode === 116) { // F5
        if (pingshow) {
            global.pingshow = false;
            document.getElementById('ping-chart').style.display = "none";
            document.getElementById('ping-outer').style.display = "none";
        } else {
            global.pingshow = true;
            document.getElementById('ping-chart').style.display = "flex";
            document.getElementById('ping-outer').style.display = "flex";
        }
    }
})

if (require('os').platform() !== "darwin") {
    gpuinfo = require('@electron/remote').app.getGPUFeatureStatus();
    gpuscore = 0;
    maxscore = 10;
    if (gpuinfo['2d_canvas'].startsWith("enabled")) {
        if (gpuinfo['2d_canvas'] === "enabled") {
            gpuscore++;
        } else {
            gpuscore += 0.5;
        }
    }
    if (gpuinfo['gpu_compositing'].startsWith("enabled")) {
        if (gpuinfo['gpu_compositing'] === "enabled") {
            gpuscore++;
        } else {
            gpuscore += 0.5;
        }
    }
    if (gpuinfo['video_decode'].startsWith("enabled")) {
        if (gpuinfo['video_decode'] === "enabled") {
            gpuscore++;
        } else {
            gpuscore += 0.5;
        }
    }
    if (gpuinfo['multiple_raster_threads'].startsWith("enabled")) {
        if (gpuinfo['multiple_raster_threads'] === "enabled") {
            gpuscore++;
        } else {
            gpuscore += 0.5;
        }
    }
    if (gpuinfo['oop_rasterization'].startsWith("enabled")) {
        if (gpuinfo['oop_rasterization'] === "enabled") {
            gpuscore++;
        } else {
            gpuscore += 0.5;
        }
    }
    if (gpuinfo['rasterization'].startsWith("enabled")) {
        if (gpuinfo['rasterization'] === "enabled") {
            gpuscore++;
        } else {
            gpuscore += 0.5;
        }
    }
    if (gpuinfo['opengl'].startsWith("enabled")) {
        if (gpuinfo['opengl'] === "enabled") {
            gpuscore++;
        } else {
            gpuscore += 0.5;
        }
    }
    if (gpuinfo['skia_renderer'].startsWith("enabled")) {
        if (gpuinfo['skia_renderer'] === "enabled") {
            gpuscore++;
        } else {
            gpuscore += 0.5;
        }
    }
    if (gpuinfo['vulkan'].startsWith("enabled")) {
        if (gpuinfo['vulkan'] === "enabled") {
            gpuscore++;
        } else {
            gpuscore += 0.5;
        }
    }
    if (gpuinfo['webgl'].startsWith("enabled")) {
        if (gpuinfo['webgl'] === "enabled") {
            gpuscore++;
        } else {
            gpuscore += 0.5;
        }
    }

    gpuperct = (gpuscore/maxscore)*100;
} else {
    gpuperct = 100;
}

pubver = require('../package.json').version;
pvpart = pubver.split(".");
if (pvpart.length === 3) {
    intver = pvpart[0] + "." + pvpart[1];
} else {
    intver = "unknown";
}

if (require('@electron/remote').getCurrentWindow().mods.length > 0) {
    release = "mods+" + require('@electron/remote').getCurrentWindow().mods.length;
} else {
    release = "official";
}

if (gpuperct < 25) {
    perf = "fast";
} else if (gpuperct < 50) {
    perf = "fancy";
} else {
    perf = "fabulous";
}

if (location.search === "") {
    game = "Local multiplayer game";
} else if (location.search === "?sp") {
    game = "Singleplayer game";
} else if (location.search === "?online") {
    if (location.hash === "#legacy") {
        game = require("../online/server.json").ktpv1.hostname + ":" + require("../online/server.json").ktpv1.port;
    } else {
        game = require("../online/server.json").ktpv2.hostname + ":" + require("../online/server.json").ktpv2.port;
    }
}

tps = -1;
cping = -1;
changedDataLeft = "playing: %false%"
changedDataRight = ""
immutableDataLeft = "KartikX " + pubver + " (" + intver + "/official+" + release + ")\n%tps% tps T:" + perf + ";vsync\n" + game + " @ %ping% ms ticks";
immutableDataRight = "Electron: " + process.versions.electron + " " + process.arch;

credits = "Debug: start runtime with debug argument\nFor help: https://kartik.hopto.org"

setInterval(() => {
    if (!debugshow) { return; }


    leftparts = (immutableDataLeft + "\n" + changedDataLeft + "\n\n" + credits).split("\n");
    lefttext = "<span style='background:rgba(101,101,101,0.75);font-family: &apos;Source Code Pro&apos;, &apos;JetBrains Mono&apos;, &apos;Ubuntu Mono&apos;, &apos;Consolas&apos;, &apos;Lucida Console&apos;, &apos;Courier New&apos;, monospace;padding:1px;'>" + leftparts.join("</span><br><span style='background:rgba(101,101,101,0.75);font-family: &apos;Source Code Pro&apos;, &apos;JetBrains Mono&apos;, &apos;Ubuntu Mono&apos;, &apos;Consolas&apos;, &apos;Lucida Console&apos;, &apos;Courier New&apos;, monospace;padding:1px;'>") + "</span>";

    rightparts = (immutableDataRight + "\n" + changedDataRight).split("\n");
    righttext = "<span style='background:rgba(101,101,101,0.75);font-family: &apos;Source Code Pro&apos;, &apos;JetBrains Mono&apos;, &apos;Ubuntu Mono&apos;, &apos;Consolas&apos;, &apos;Lucida Console&apos;, &apos;Courier New&apos;, monospace;padding:1px;'>" + rightparts.join("</span><br><span style='background:rgba(101,101,101,0.75);font-family: &apos;Source Code Pro&apos;, &apos;JetBrains Mono&apos;, &apos;Ubuntu Mono&apos;, &apos;Consolas&apos;, &apos;Lucida Console&apos;, &apos;Courier New&apos;, monospace;padding:1px;'>") + "</span>";

    document.getElementById("debug-left").innerHTML = lefttext.replaceAll("%tps%", tps).replaceAll("%ping%", cping).replaceAll("%false%", "<span style='color:red;font-family: &apos;Source Code Pro&apos;, &apos;JetBrains Mono&apos;, &apos;Ubuntu Mono&apos;, &apos;Consolas&apos;, &apos;Lucida Console&apos;, &apos;Courier New&apos;, monospace;'>false</span>").replaceAll("%true%", "<span style='color:green;font-family: &apos;Source Code Pro&apos;, &apos;JetBrains Mono&apos;, &apos;Ubuntu Mono&apos;, &apos;Consolas&apos;, &apos;Lucida Console&apos;, &apos;Courier New&apos;, monospace;'>true</span>");
    document.getElementById("debug-right").innerHTML = righttext;
}, 100)

var filterStrength = 20;
var frameTime = 0, lastLoop = new Date, thisLoop;

setInterval(() => {
    if (!debugshow) { return; }

    var thisFrameTime = (thisLoop=new Date) - lastLoop;
    frameTime+= (thisFrameTime - frameTime) / filterStrength;
    lastLoop = thisLoop;
}, 50)

require('systeminformation').graphics().then((data) => {
    global.gpudata = data;
});

setInterval(() => {
    if (!debugshow) { return; }

    tps = (1000/frameTime).toFixed(1);

    if (typeof ping === "number") {
        cping = ping;
    } else {
        cping = 0;
    }

    if (started) {
        changedDataLeft = "playing: %true%";
        changedDataLeft += "\n\n0$: XY: " + document.getElementById('car0').style.left.split("px")[0] + " / " + document.getElementById('car0').style.top.split("px")[0]

        c0rotate = document.getElementById('car0').style.transform.split("rotate(")[1].split("deg)")[0];
        if (c0rotate === "90") {
            changedDataLeft += "\n0$: Facing: south (Towards negative Y)";
        } else if (c0rotate === "-90") {
            changedDataLeft += "\n0$: Facing: north (Towards negative Y)";
        } else if (c0rotate === "0") {
            changedDataLeft += "\n0$: Facing: east (Towards positive X)";
        } else if (c0rotate === "180") {
            changedDataLeft += "\n0$: Facing: west (Towards negative X)";
        }

        changedDataLeft += "\n0$: Speed: A: " + car0cspeed.toFixed(2) + " R: " + (car0speed - car0cspeed).toFixed(2) + " M: " + car0speed.toFixed(2);

        changedDataLeft += "\n0$: Laps: " + document.getElementById('laps-car0').innerText + "/5";
        changedDataLeft += "\n0$: Model: " + selectedModel0;
        changedDataLeft += "\n0$: Collision: " + (car0collisionon ? "%true%" : "%false%");

        changedDataLeft += "\n\n1$: XY: " + document.getElementById('car1').style.left.split("px")[0] + " / " + document.getElementById('car1').style.top.split("px")[0]

        c0rotate = document.getElementById('car1').style.transform.split("rotate(")[1].split("deg)")[0];
        if (c0rotate === "90") {
            changedDataLeft += "\n1$: Facing: south (Towards negative Y)";
        } else if (c0rotate === "-90") {
            changedDataLeft += "\n1$: Facing: north (Towards negative Y)";
        } else if (c0rotate === "0") {
            changedDataLeft += "\n1$: Facing: east (Towards positive X)";
        } else if (c0rotate === "180") {
            changedDataLeft += "\n1$: Facing: west (Towards negative X)";
        }

        changedDataLeft += "\n1$: Speed: A: " + car1cspeed.toFixed(2) + " R: " + (car1speed - car1cspeed).toFixed(2) + " M: " + car1speed.toFixed(2);

        changedDataLeft += "\n1$: Laps: " + document.getElementById('laps-car1').innerText + "/5";
        changedDataLeft += "\n1$: Model: " + selectedModel1;
        changedDataLeft += "\n1$: Collision: " + (car1collisionon ? "%true%" : "%false%");
        changedDataLeft += "\n" + oil(0) + oil(1) + oil(2) + oil(3) + oil(4);
        changedDataLeft += "\n\nMusic: " + i;
        changedDataLeft += "\nCircuit: " + rand;

    } else {
        changedDataLeft = "playing: %false%"
    }

    usedMem = (process.memoryUsage().heapUsed / 1000000).toFixed(2);
    totalMem = (process.memoryUsage().heapTotal / 1000000).toFixed(2);
    percMem = Math.round((process.memoryUsage().heapUsed / process.memoryUsage().heapTotal)*100);
    allocateMem = (process.memoryUsage().rss / 1000000).toFixed(2);

    changedDataRight = "Mem: " + percMem + "% " + usedMem + "/" + totalMem + "MB"
    changedDataRight += "\nAllocated: " + allocateMem + "MB"
    changedDataRight += "\n\nCPU: (" + process.getCPUUsage().percentCPUUsage.toFixed(2) + "%) " + require('os').cpus().length + "x " + require('os').cpus()[0].model.trim() + " @ " + (require('os').cpus()[0].speed/1000).toFixed(2) + "GHz"

    try {
        changedDataRight += "\n\nDisplay: " + window.innerWidth + "x" + window.innerHeight + " (" + gpudata.controllers[0].vendor + ")";
        changedDataRight += "\n" + gpudata.controllers[0].model;

        try {
            if (gpudriverdata.gpuDevice[0].driverVendor !== undefined) {
                dvendor = gpudriverdata.gpuDevice[0].driverVendor;
            } else {
                dvendor = "&lt;Unknown&gt;";
            }
            if (gpudriverdata.gpuDevice[0].driverVersion !== undefined) {
                dversion = gpudriverdata.gpuDevice[0].driverVersion;
            } else {
                dversion = "&lt;Unknown&gt;";
            }
        } catch (e) {
            dvendor = "&lt;Unknown&gt;";
            dversion = "&lt;Unknown&gt;";
        }
        changedDataRight += "\n" + dvendor + " - " + dversion;
    } catch (e) {
        console.error(e);
    }
},100);

window.addEventListener("load", () => {
    require('@electron/remote').app.getGPUInfo('complete').then((data) => {
        global.gpudriverdata = data;
    });
})