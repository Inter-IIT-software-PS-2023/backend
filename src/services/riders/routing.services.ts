import { spawn, exec } from "child_process"
import { PrismaClient } from "@prisma/client"
import fs from "fs"
import path from "path"

const prisma = new PrismaClient()


export const routingAlgo = async () => {

    const consignments = await prisma.order.findMany({
        include: {
            address: true
        }
    }) as any
    const noOfOrders = consignments.length
    const noOfRiders = await prisma.rider.count()
    const noOfHours = 5
    const warehouseLocation = {
        lat: 12.971599,
        lng: 77.638725
    }
    let algoInput = {
        noOfOrders: noOfOrders,
        noOfRiders: noOfRiders,
        warehouseLocation: warehouseLocation,
        consignments: consignments
    } as any
    const execPath = path.join(__dirname, "../../../src/algorithms/exe")
    const inputFilePath = path.join(__dirname, "../../../src/algorithms/routingInput.txt")
    const outputFilePath = path.join(__dirname, "../../../src/algorithms/routingOutput.txt")
    algoInput = JSON.stringify(algoInput)
    algoInput.replace("\n", " ")
    const algoOutput = new Promise((resolve, reject) => {
        fs.writeFile(inputFilePath, algoInput, (err) => {
            if (err) {
                reject({ err: err.message })
            }
            else {
                // const child = spawn(execPath, [noOfHours.toString(), "<", inputFilePath, ">", outputFilePath])
                // child.on("close", (msg) => {
                //     console.log("\n\n\n Child process exited \n\n\n")
                //     console.log("msg ", msg)
                //     fs.readFile(outputFilePath, (err, data) => {
                //         if (err)
                //             reject({ err: err.message })
                //         else {
                //             resolve(JSON.parse(data.toString()))
                //         }
                //     })
                // })
                // child.stderr.on("data", (data: Buffer) => {
                //     console.log(data.toString())
                //     reject({ err: data.toString() })
                // })
                // child.on("error", (err) => {
                //     console.log("\n\n\n Error \n\n\n")
                //     console.log("err ", err)
                //     reject({ err: err.message })
                // })

                const resp = exec(`"${execPath}" ${noOfHours} < "${inputFilePath}" > "${outputFilePath}"`, (err, stdout, stderr) => {
                    if (err) {
                        console.log("err ", err)
                        reject({ err: err.message })
                    }
                    console.log("stdout ", stdout)
                    console.log("stderr ", stderr)
                    fs.readFile(outputFilePath, (err, data) => {
                        if (err)
                            reject({ err: err.message })
                        else {
                            resolve(JSON.parse(data.toString()))
                        }
                    })
                })
            }
        })
    })
    return algoOutput
}