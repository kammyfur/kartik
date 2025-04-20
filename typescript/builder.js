const os = require('os');
const fs = require('fs');
const { dialog } = require('electron');

if (os.platform() === "win32") {
    cmd = "typescript\\engine-win32.exe";
} else {
    cmd = "./typescript/engine-" + os.platform();
}

fs.copyFileSync("./typescript/interface.ts", homedir + "/.KartikX/build/kartik.ts");

cp = require('child_process').spawnSync(cmd, [ "./node_modules/typescript/bin/tsc", "--skipLibCheck", "--removeComments", "--sourceMap", "-m", "commonjs", "--target", "es6", homedir + "/.KartikX/build/kartik.ts" ], { cwd: KartikRoot });
if (cp.status !== 0) {
    try { console.error(cp.stdout.toString()); } catch (e) {}
    throw new Error("Subprocess exited with code " + cp.status);
}

fs.unlinkSync(homedir + "/.KartikX/build/kartik.ts");

module.exports = (source, destination) => {
    if (os.platform() === "win32") {
        source = source.replaceAll("/", "\\");
        destination = destination.replaceAll("/", "\\");
    }

    console.log(destination.substr(0, destination.length - 3));
    fs.copyFileSync(source, destination.substr(0, destination.length - 3));
    fs.writeFileSync(destination.substr(0, destination.length - 3), fs.readFileSync(destination.substr(0, destination.length - 3)).toString().replaceAll("$KARTIK:", homedir.replaceAll("\\", "\\\\") + "/.KartikX/build/kartik.js"))
    cp = require('child_process').spawnSync(cmd, [ "./node_modules/typescript/bin/tsc", "--skipLibCheck", "--removeComments", "--sourceMap", "-m", "commonjs", "--target", "es5", destination.substr(0, destination.length - 3) ], { cwd: KartikRoot });
    if (cp.status !== 0) {
        if (cp.stdout !== undefined) {
            dialog.showMessageBoxSync(
                {
                    type: "error",
                    title: "KMP Mod Loader",
                    message: "On package " + item + ": KMP-API building " + source + ":\n\n" + cp.stdout.toString().trim() + "\n\nEXITING."
                }
            )
            process.exit(2);
        } else {
            throw new Error("Subprocess exited with code " + cp.status);
        }
    }
    compiledTypeScriptFiles.push(destination.substr(0, destination.length - 6) + ".js");

    lines = fs.readFileSync(destination.substr(0, destination.length - 6) + ".js").toString().split("\n");
    lines[1] = "";
    fs.writeFileSync(destination.substr(0, destination.length - 6) + ".js", lines.join("\n"));
}
