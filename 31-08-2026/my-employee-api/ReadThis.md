so all this backend process to just use that api endpoint of mine to use in frontned in a function which creates a user when clicked on it.

* Controller Folder
Right now if we put all the data of routes logic in just one ./routes/employees.js file, it will become messy, so we what we do, we write all the routes logic in folder named controllers/employeeControlller.js, and then simply use its functions in the actual routes/employee.js file instead of writing all the logic, we just impport the routes logics from the controller file!


* Service File
Bascillay a controller has 3 workings going on, two http requests and a DB, what we do is that we take the DB line of code to services folder, so the controller can only do the http work.


* Full picture
HTTP Request
    ↓
Routes        ← URL map
    ↓
Controllers   ← HTTP in/out
    ↓
Services      ← business logic + DB
    ↓
Models        ← schema
    ↓
Database