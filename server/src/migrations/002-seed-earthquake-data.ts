import fs from "fs";
import csvParser from "csv-parser";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import db from "../config/db.js";
import {CSVDataRow} from "../types/csvdata.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const collectionName = "earthquakes";
const csvFilePath = resolve(__dirname, "../..", "data", "earthquakes1970-2014.csv");
console.log(csvFilePath);
export const up = async () => {
    const collection = db.collection(collectionName);

    const count = await collection.countDocuments();
    if (count > 0) {
        console.log(`Clearing existing documents in collection: ${collectionName}`);
        await collection.deleteMany({});
    }

    const data: CSVDataRow[] = [];
    return new Promise<void>((resolve, reject) => {
        fs.createReadStream(csvFilePath)
            .pipe(csvParser())
            .on("data", (row: Record<string, string>) => {
                const datetime = new Date(row.DateTime);
                if (!isNaN(datetime.getTime())) {
                    data.push({
                        date: datetime,
                        location: `${row.Latitude},${row.Longitude}`,
                        magnitude: parseFloat(row.Magnitude),
                    });
                }
            })
            .on("end", async () => {
                if (data.length > 0) {
                    await collection.insertMany(data);
                    console.log(`Inserted ${data.length} records into '${collectionName}'`);
                } else {
                    console.log("No data found in the CSV file.");
                }
                resolve();
            })
            .on("error", (error) => {
                console.error("Error reading the CSV file:", error);
                reject(error);
            });
    });
};

export const down = async () => {
    const collection = db.collection(collectionName);
    console.log(`Clearing all data from collection: ${collectionName}`);
    await collection.deleteMany({});
};
