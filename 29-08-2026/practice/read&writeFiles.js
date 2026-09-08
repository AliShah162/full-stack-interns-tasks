const fs = require('fs');

const file = 'my-file.txt';

// STEP 1: READ first
console.log(' Step 1: Reading file...');
fs.readFile(file, 'utf8', (err, data) => {
    if (err) {
        console.log(' Error reading:', err.message);
        return;
    }
    console.log(' Current content:', data);
    console.log('─'.repeat(30));
    
    // STEP 2: WRITE (only after READ finishes)
    console.log(' Step 2: Writing to file...');
    fs.writeFile(file, 'This is new content!', (err) => {
        if (err) {
            console.log(' Error writing:', err);
            return;
        }
        console.log(' File written!');
        console.log('─'.repeat(30));
        
        // STEP 3: APPEND (only after WRITE finishes)
        console.log(' Step 3: Appending to file...');
        fs.appendFile(file, '\nThis is appended!', (err) => {
            if (err) {
                console.log(' Error appending:', err);
                return;
            }
            console.log(' Content appended!');
            console.log('─'.repeat(30));
            
            // STEP 4: READ again to see final result
            console.log(' Step 4: Reading final file...');
            fs.readFile(file, 'utf8', (err, finalData) => {
                if (err) {
                    console.log(' Error reading:', err);
                    return;
                }
                console.log(' Final content:');
                console.log(finalData);
                console.log(' Done!');
            });
        });
    });
});