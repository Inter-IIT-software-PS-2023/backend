import { execFile } from "child_process"

export const routingAlgo = async () => {
    const child = console.log("child process")
    execFile("g++", ["./src/temp/hi.cpp", "-o", "./src/temp/hi.exe"], (error, stdout, stderr) => {
        if (error) {
            console.log(error)
            return error;
        }
        else {
            execFile("./src/temp/hi.exe", (error, stdout, stderr) => {
                if (error) {
                    console.log(error);
                } else {
                    console.log(`what is printed to the console: ${stdout}`)
                }
            })
        }
    })
}