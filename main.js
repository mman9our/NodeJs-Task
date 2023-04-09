const fs = require("fs");
const csv = require("csv-parser");

const users = [];

fs.createReadStream("users.csv")
    .pipe(csv({}))
    .on("data", (data) => {
        // Convert each line of data to a JS object and push it to the users array
        users.push(data);
    })
    .on("end", () => {
        // Write the users array as a JSON file
        fs.writeFile("users.json", JSON.stringify(users), (err) => {
            if (err) throw err;
            else
                console.log("Users data saved to users.json file");
        });
    });