const fs = require('fs');

// ----- READ FILES -----
// Async (non-blocking) - PREFERRED
fs.readFile('file.txt', 'utf8', (err, data) => {
    if (err) console.error(err);
    console.log(data);
});

// Sync (blocking) - Use sparingly
const data = fs.readFileSync('file.txt', 'utf8');

// ----- WRITE FILES -----
fs.writeFile('file.txt', 'Hello World!', (err) => {
    if (err) console.error(err);
    console.log('File saved!');
});

// ----- CREATE FOLDERS -----
fs.mkdir('my-folder', (err) => {
    if (err) console.error(err);
    console.log('Folder created!');
});

// ----- DELETE FILES -----
fs.unlink('file.txt', (err) => {
    if (err) console.error(err);
    console.log('File deleted!');
});

// ----- CHECK IF EXISTS -----
if (fs.existsSync('file.txt')) {
    console.log('File exists!');
}

// ----- READ FOLDER CONTENTS -----
fs.readdir('./', (err, files) => {
    console.log(files); // ['file1.txt', 'file2.txt', ...]
});