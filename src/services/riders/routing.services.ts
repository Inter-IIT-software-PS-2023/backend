import { execFile, spawn } from "child_process"

export const routingAlgo = async () => {
    execFile("g++", ["-std=c++17", "./src/algorithms/routingAlgo.cpp", "-ljsoncpp", "-lcurl", "-o", "./src/algorithms/routingAlgo.exe"], (error, stdout, stderr) => {
    //execFile("g++ -std=c++17 ./src/algorithms/routingAlgo.cpp -ljsoncpp -lcurl -o ./src/algorithms/routingAlgo.exe"], (error, stdout, stderr) => {
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
        .on("exit", async () => {
            const child = spawn("./src/algorithms/routingAlgo.exe 300 10 12.971599 77.638725")
            // child.stdin.write("300 10 12.971599 77.638725");
            // child.stdin.write("5 2");
            // child.stdin.end();
            // for (let i = 0; i < 5; i++) { 
            //     child.stdin.write(`${i} ${i + 1}`)
            // }
            child.stdin.end()
            const childProcessResp = new Promise((resolve, reject) => {
                child.stdout.on("data", (data) => {
                    resolve(data)
                })
                child.stderr.on("data", (data) => {
                    reject(data)
                })
            })
            return await childProcessResp
        })
}


