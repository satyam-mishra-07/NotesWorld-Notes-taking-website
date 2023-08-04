const express = require("express");
const path = require("path");
const fs = require('fs');
const app = express();

const port = 5500

// EXPRESS SPECIFIC STUFF
app.use('static', express.static('static'))
app.use(express.static(path.join('static')));
app.use(express.urlencoded())

// ENDPOINTS
app.get('/contact.html', (req, res) => {
    app.use('static', express.static('static'));
    app.use(express.static(path.join('static')));
})

app.post('/contact.html', (req, res) => {
    nameofuser = req.body.forName;
    email = req.body.forEmail;
    number = req.body.forNumber
    issue = req.body.forIssue

    let outputToWrite = `
    Name: ${nameofuser}
    Email Address: ${email}
    Mobile Number: ${number}
    His Issue: ${issue}
    `;
    fs.appendFileSync('data.txt', outputToWrite);

    app.use('static', express.static('static'));
    app.use(express.static(path.join('static')));
})

app.listen(port, () => {
    console.log("All Ok");
})
