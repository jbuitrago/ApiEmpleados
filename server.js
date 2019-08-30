var express = require('express')
var app = express()
var HTTP_PORT = 8000

// Routes
var routes_departments = require('./routes/departments');
var routes_employees = require('./routes/employees');
var routes_offices = require('./routes/offices');


app.use('/api', routes_departments);
app.use('/api', routes_employees);
app.use('/api', routes_offices);


app.listen(HTTP_PORT, function () {
    console.log('Listening on port ' + HTTP_PORT)
})
