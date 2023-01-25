import { execFile, spawn } from "child_process"

export const routingAlgo = async () => {

    const child = spawn("./src/services/riders/exe", ["300", "10", "12.971599", "77.638725"])
    //C:\Users\jayan\Desktop\Jayanth\Coding\Inter IIT 2023\backend\src\services\riders\exe
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


