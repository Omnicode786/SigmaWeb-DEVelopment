import fs from "fs";

// ---------------------------
// Synchronous Write & Read
// ---------------------------

// writeFileSync is synchronous so it blocks the code until it’s done
// also does NOT take a callback, so don’t even try passing one here
fs.writeFileSync(
    "BEASTSYNC.txt", 
    "Muzammil is the BEAST and this is synchronous write file function from fs"
);
console.log("Sync file write done");

// readFileSync is also synchronous, directly returns the file contents
const text = fs.readFileSync("BEASTSYNC.txt", "utf-8");
console.log("Sync read says:", text);


// ---------------------------
// Async Functions but making them behave sync using await
// ---------------------------

// fs.writeFile is async so it doesn’t return directly, we wrap it in a Promise
function writeFiles(path, dataString) {
    return new Promise((resolve, reject) => {
        fs.writeFile(path, dataString, (err) => {
            if (err) reject(err);
            else resolve("Async write done");
        });
    });
}

// fs.readFile is async so same thing, wrap in a Promise
function readFiles(path, encoding = "utf-8") {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            fs.readFile(path, encoding, (err, data) => {
                if (err) reject(err);
                else resolve(data);
            });
        }, 2000);  // Delay inside the Promise
    });
}


// ---------------------------
// Now using them like they are sync (thanks to await)
// ---------------------------
(async function main() {
    console.log("File async is starting");

    await writeFiles(
        "BEASTASYNC.txt", 
        "Muzammil is the BEAST and this is asynchronous write file function from fs which I just made act like sync"
    );
    console.log("Async file write done");

    const asyncText = await readFiles("BEASTASYNC.txt");
    console.log("Async read says:", asyncText);

    console.log("File async is exiting");
})();
