import { execFile, spawn } from "child_process"

export const routingAlgo = async () => {

    const child = spawn("./src/services/riders/exe", ["300", "10", "12.971599", "77.638725"])
    const childProcessResp = new Promise((resolve, reject) => {
        child.stdout.on("data", (data: Buffer) => {
            console.log(data.toString())
            resolve(data.toString())
        })
        child.stderr.on("data", (data: Buffer) => {
            console.log(data.toString())
            reject(data.toString())
        })
    })
    return await childProcessResp

    // const childProcessResp = new Promise((resolve, reject) => {
    //     execFile("./exe", ["300", "10", "12.971599", "77.638725"], (err, data) => {
    //         if (err) {
    //             console.log("\n\n\nError\n\n\n")
    //             console.log(err)
    //             reject(err)
    //         }
    //         else {
    //             console.log("\n\n\Data\n\n\n")
    //             resolve(data)
    //         }
    //     })
    // })
    // return await childProcessResp
}


