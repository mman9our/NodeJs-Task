const fs = require("fs");
const csv = require("csv-parser");

function readCSV(filepath, onData) {
    return new Promise((resolve, reject) => {
        fs.createReadStream(filepath)
            .pipe(csv({}))
            .on("data", onData)
            .on("end", () => {
                console.log(`CSV file ${filepath} read successfully`);
                resolve();
            })
            .on("error", (err) => {
                reject(`Error reading CSV file ${filepath}: ${err}`);
            });
    });
}

function saveToFile(data, filepath) {
    return new Promise((resolve, reject) => {
        fs.writeFile(filepath, JSON.stringify(data), (err) => {
            if (err) {
                reject(`Error saving to file ${filepath}: ${err}`);
            } else {
                console.log(`Data saved to file ${filepath}`);
                resolve();
            }
        });
    });
}

function readJsonFile(filepath, onRead) {
    fs.readFile(filepath, (err, data) => {
        if (err) {
            console.error(`Error reading from file ${filepath}:`, err);
        } else {
            try {
                const jsonData = JSON.parse(data);
                onRead(jsonData);
            } catch (e) {
                console.error(`Error parsing JSON from file ${filepath}:`, e);
            }
        }
    });
}

// Example usage:
async function main() {
    const users = [];

    await readCSV("users.csv", (data) => {
        users.push(data);
    });

    await saveToFile(users, "users.json");

    readJsonFile("users.json", (data) => {
        console.log(`Read ${data.length} users from JSON file`);
    });
}

main();