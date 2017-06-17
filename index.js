var express = require("express"),
    express_handlebars = require("express-handlebars"),
    exphbs = require('express-handlebars'),
    specificUserFilePoolFileUtil = require("./routes/userfilesInfo");

// github = require('octonode'),
// client = github.client();

var app = express();

app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

app.use(express.static(__dirname + '/public'));

app.get("/", function(req, res) {
    res.render("home")
});
app.get("/logdata", function(req, res) {
    res.render("home", {
        repo: JSON.stringify(specificUserFilePoolFileUtil.specificUserFilePool().getRepoName()),
        NumeberOfFiles: specificUserFilePoolFileUtil.specificUserFilePool().getNumberOfRepoContent().length
    });
});

app.get("/logdataFileNumber", function(req, res) {
    res.send(noFiles);
});
var port = 3000;
app.listen(port || process.env.PORT, function() {
    console.log("Now listening to port :" + port);
});
