window.addEventListener("load", () => {
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

        gpuperct = (gpuscore / maxscore) * 100;

        if (gpuperct < 30) {
            console.warn("Bad GPU support, disabling GPU-accelerated content");
            var head = document.getElementsByTagName('HEAD')[0];
            var link = document.createElement('link');
            link.rel = 'stylesheet';
            link.type = 'text/css';
            link.href = './common/compatibilityMode.css';
            head.appendChild(link);
        }
    }
})
