import { execFile, spawn } from "child_process"

export const routingAlgo = async () => {

    const child = spawn("./exe", ["300", "10", "12.971599", "77.638725"])
    child.stdin.end()
    const childProcessResp = new Promise((resolve, reject) => {
        child.stdout.on("data", (data) => {
            console.log(data)
            resolve(data)
        })
        child.stderr.on("data", (data) => {
            console.log(data)
            reject(data)
        })
    })
    return await childProcessResp
}


