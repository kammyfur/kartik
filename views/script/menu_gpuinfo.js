if (require('os').platform === "darwin") {
    document.getElementById("gpuinfo").style.display = "none";
}

if (require('os').platform !== "darwin") {
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
    document.getElementById("gpusupportperc").innerText = gpuperct + "%";

    document.getElementById("gpuinfo_progressbar").style.width = gpuperct + "%";
    if (gpuperct < 50) {
        document.getElementById("gpuinfo_progressbar").style.background = "rgba(128, 0, 0, .5)";
        document.getElementById("gpusupport-1").style.backgroundColor = "rgba(255,183,183,0.5)";
    } else if (gpuperct < 75) {
        document.getElementById("gpuinfo_progressbar").style.background = "rgba(128, 128, 0, .5)";
        document.getElementById("gpusupport-2").style.backgroundColor = "rgba(253,255,183,0.5)";
    } else {
        document.getElementById("gpuinfo_progressbar").style.background = "rgba(0, 128, 0, .5)";
        document.getElementById("gpusupport-3").style.backgroundColor = "rgba(183,255,183,0.5)";
    }
}

if (require('os').platform !== "darwin") {
    gpuinfo = require('@electron/remote').app.getGPUFeatureStatus();
    document.write("kartik<br>");
    document.write("├ kartik.accel<br>");
    if (gpuinfo['2d_canvas'].startsWith("enabled")) {
        document.write("│ ├ <span style='color:lightgreen;'>kartik.accel.Canvas</span><br>");
    } else {
        document.write("│ ├ <span style='color:lightcoral;'>kartik.accel.Canvas</span><br>");
    }
    if (gpuinfo['gpu_compositing'].startsWith("enabled")) {
        document.write("│ ├ <span style='color:lightgreen;'>kartik.accel.Compositing</span><br>");
    } else {
        document.write("│ ├ <span style='color:lightcoral;'>kartik.accel.Compositing</span><br>");
    }
    if (gpuinfo['video_decode'].startsWith("enabled")) {
        document.write("│ └ <span style='color:lightgreen;'>kartik.accel.VideoDecode</span><br>");
    } else {
        document.write("│ └ <span style='color:lightcoral;'>kartik.accel.VideoDecode</span><br>");
    }
    document.write("├ kartik.raster<br>");
    if (gpuinfo['multiple_raster_threads'].startsWith("enabled")) {
        document.write("│ ├ <span style='color:lightgreen;'>kartik.raster.Threaded</span><br>");
    } else {
        document.write("│ ├ <span style='color:lightcoral;'>kartik.raster.Threaded</span><br>");
    }
    if (gpuinfo['oop_rasterization'].startsWith("enabled")) {
        document.write("│ ├ <span style='color:lightgreen;'>kartik.raster.ObjectOP</span><br>");
    } else {
        document.write("│ ├ <span style='color:lightcoral;'>kartik.raster.ObjectOP</span><br>");
    }
    if (gpuinfo['rasterization'].startsWith("enabled")) {
        document.write("│ └ <span style='color:lightgreen;'>kartik.raster.Common</span><br>");
    } else {
        document.write("│ └ <span style='color:lightcoral;'>kartik.raster.Common</span><br>");
    }
    document.write("└ kartik.renderer<br>");
    if (gpuinfo['opengl'].startsWith("enabled")) {
        document.write(" &nbsp;├ <span style='color:lightgreen;'>kartik.renderer.OpenGL</span><br>");
    } else {
        document.write(" &nbsp;├ <span style='color:lightcoral;'>kartik.renderer.OpenGL</span><br>");
    }
    if (gpuinfo['webgl'].startsWith("enabled")) {
        document.write(" &nbsp;├ <span style='color:lightgreen;'>kartik.renderer.WebGL</span><br>");
    } else {
        document.write(" &nbsp;├ <span style='color:lightcoral;'>kartik.renderer.WebGL</span><br>");
    }
    if (gpuinfo['skia_renderer'].startsWith("enabled")) {
        document.write(" &nbsp;├ <span style='color:lightgreen;'>kartik.renderer.Skia</span><br>");
    } else {
        document.write(" &nbsp;├ <span style='color:lightcoral;'>kartik.renderer.Skia</span><br>");
    }
    if (gpuinfo['vulkan'].startsWith("enabled")) {
        document.write(" &nbsp;└ <span style='color:lightgreen;'>kartik.renderer.Vulkan</span><br>");
    } else {
        document.write(" &nbsp;└ <span style='color:lightcoral;'>kartik.renderer.Vulkan</span></span><br>");
    }
} else {
    document.write("You are using macOS<br><br>KartikX can't detect GPU info<br>for Apple macOS.");
}

document.onkeydown = (e) => {
    if (e.shiftKey) {
        document.getElementById('gpuinfo-inner').style.opacity = "1";
        document.getElementById('gpuinfo-inner').style.height = "max-content";
        document.getElementById('gpuinfo-outer').style.display = "none";
    } else {
        document.getElementById('gpuinfo-inner').style.opacity = "0";
        document.getElementById('gpuinfo-inner').style.height = "0";
        document.getElementById('gpuinfo-outer').style.display = "";
    }
}

document.onkeyup = (e) => {
    document.getElementById('gpuinfo-inner').style.opacity = "0";
    document.getElementById('gpuinfo-inner').style.height = "0";
    document.getElementById('gpuinfo-outer').style.display = "";
}

require('systeminformation').graphics().then((data) => {
    document.getElementById("gpuinfo-model").innerText = data.controllers[0].model;
    vram = data.controllers[0].vram;

    if (vram > 1024) {
        vrams = (vram/1024).toFixed(1) + " GiB";
    } else {
        vrams = (vram).toFixed(1) + " MiB";
    }

    document.getElementById("gpuinfo-vram").innerText = vrams + " VRAM";
})