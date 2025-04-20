document.write("KartikX (" + require('../package.json').name + ") " +require('../package.json').version);
document.write(" on " + require('os').type() + " (" + require('os').version() + ", " + require('os').arch() +") version " + require('os').release() + "<br>")
cores = require('os').cpus()
if (cores.length > 1) {
    document.write(cores.length + " processors<br>");
} else {
    document.write(cores.length + " processor<br>");
}
document.write(((process.memoryUsage().heapUsed/1024)/1024).toFixed(2) + " MB heap memory used, " + ((process.memoryUsage().heapTotal/1024)/1024).toFixed(2) + " MB heap memory total, " + ((process.memoryUsage().rss/1024)/1024).toFixed(2) + " MB virtual memory");