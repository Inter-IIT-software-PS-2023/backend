import { execFile, spawn } from "child_process"

export const routingAlgo = async () => {
    execFile("g++", ["./src/temp/hi.cpp", "-o", "./src/temp/hi.exe"], (error, stdout, stderr) => {
        if (error) {
            console.log("error", error)
            return error;
        }
        // else {
        //     execFile("./src/temp/hi.exe", (error, stdout, stderr) => {
        //         if (error) {
        //             console.log(error);
        //         } else {
        //             console.log(`what is printed to the console: ${stdout}`)
        //         }
        //     })
        // }
        if (stderr) {
            console.log("stderr", stderr)
            return stderr
        }
    })
        .on("exit", () => {
            const child = spawn("./src/temp/hi.exe")
            child.stdin.write("5 3 4 6");
            // child.stdin.write("5 2");
            // child.stdin.end();
            // for (let i = 0; i < 5; i++) { 
            //     child.stdin.write(`${i} ${i + 1}`)
            // }
            child.stdin.end()
            child.stdout.on("data", (data) => {
                console.log(`child stdout:\n${data}`);
            });
        })
}


