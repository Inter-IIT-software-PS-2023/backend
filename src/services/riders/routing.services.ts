import { spawn } from "child_process"
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
                console.log("\n\n\n\n\n", execPath)
                console.log("\n\n\n\n\n", inputFilePath)
                console.log("\n\n\n\n\n", outputFilePath)
                const child = spawn(execPath, [noOfHours.toString(), "<", inputFilePath, ">", outputFilePath])
                child.stdout.on("data", () => {
                    fs.readFile(outputFilePath, (err, data) => {
                        if (err)
                            reject({ err: err.message })
                        else {
                            resolve(JSON.parse(data.toString()))
                        }
                    })
                })
                child.stderr.on("data", (data: Buffer) => {
                    console.log(data.toString())
                    reject({ err: data.toString() })
                })
            }
        })
    })
    return algoOutput
}