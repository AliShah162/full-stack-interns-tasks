const path = require('path');

const filePath = '/users/john/projects/app.js';

// ----- GET FILE INFO -----
path.basename(filePath);        // 'app.js'
path.dirname(filePath);         // '/users/john/projects'
path.extname(filePath);         // '.js'

// ----- PARSE PATH -----
const parsed = path.parse(filePath);
console.log(parsed);
// {
//   root: '/',
//   dir: '/users/john/projects',
//   base: 'app.js',
//   ext: '.js',
//   name: 'app'
// }

// ----- JOIN PATHS (ALWAYS USE THIS!) -----
const fullPath = path.join('users', 'john', 'projects', 'app.js');
// Works on Windows too: 'users\\john\\projects\\app.js'

// ----- RESOLVE PATH -----
const resolved = path.resolve('projects', 'app.js');
// '/current/working/directory/projects/app.js'

// ----- GET CURRENT DIR -----
path.dirname(__filename);   // Current file's directory