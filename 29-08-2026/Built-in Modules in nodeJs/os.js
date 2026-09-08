const os = require('os');

// ----- SYSTEM INFO -----
os.platform();          // 'darwin' (Mac), 'win32' (Windows), 'linux'
os.release();           // '22.6.0' (OS version)
os.hostname();          // 'My-MacBook.local'

// ----- CPU INFO -----
os.cpus();              // Array with CPU info (model, speed)
os.cpus().length;       // Number of CPU cores

// ----- MEMORY INFO -----
os.totalmem();          // Total RAM in bytes
os.freemem();           // Free RAM in bytes

// ----- USER INFO -----
os.homedir();           // '/Users/username'
os.userInfo();          // { username: 'john', uid: 501, ... }

// ----- NETWORK -----
os.networkInterfaces(); // Network adapters info

// ----- UPTIME -----
os.uptime();            // System uptime in seconds