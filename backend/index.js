var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');

var fs = require('fs');

var baseDir = '/data/'
var basePath = __dirname + baseDir;

var isDirectory = function (path) {
  try {
    var dir = fs.statSync(basePath + path);

    return dir && dir.isDirectory();
  } catch (e) {
    return false;
  }
};

var isFile = function (path) {
  try {
    var file = fs.statSync(basePath + path);

    return file && file.isFile();
  } catch (e) {
    return false;
  }
};

app.use(bodyParser.json());
app.use(express.static(basePath));

app.get('/folders', function (req, res) {
  console.log('hi getting foders');
  var paths = [];
  var subdir = req.query.nodeId || '';
  var items = fs.readdirSync(basePath + subdir);

  for (var i = 0; i < items.length; i++) {
    var name = items[i];
    var stat = fs.statSync(basePath + subdir + '/' + name);
    if (stat && stat.isDirectory()) {
      var dir = {
        id: subdir + '/' + name,
        name: name,
        title: name,
        children: []
      };

      paths.push(dir);
    }
  }

  res.json(paths);

});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

