var b = require('bonescript');
var fs = require('fs');
var path = require('path');
/*
var tessel = require('tessel');
var sdcardlib = require('sdcard');

var sdcard = sdcardlib.use(tessel.port['A']);

console.log("start");

var buffers = [];
var curr_path = '/media/card/';

sdcard.on('ready', function() {
  sdcard.getFilesystems(function(err, fss) {
    var fs = fss[0];
    console.log('Writing...');
    fs.writeFile('someFile.txt', 'Hey Tessel SDCard!', function(err) {
      console.log('Write complete. Reading...');
      fs.readFile('someFile.txt', function(err, data) {
        console.log('Read:\n', data.toString());
      });
    });
  });
});
*/

b.pinMode('P8_15', b.INPUT);

setInterval(check,1000);
function check(){
  b.digitalRead('P8_15', checkButton);
}

function checkButton(x) {
  console.log(x.value);
}




const emptyDir = require('empty-dir');

setInterval(check,100);
var isPrinted = false;
function check() {

  if (!emptyDir.sync("/media/sdcard") && fs.existsSync("/media/sdcard") && !isPrinted) {
      //folderList("/Volumes/Untitled");
      isPrinted = true;
      walk("/media/sdcard", function(err, results) {
        if (err) throw err;
        console.log(results);


      });
      console.log(isPrinted);

  }else{
    isPrinted = false;
  }
}

var walk = function(dir, done) {
  var results = [];
  fs.readdir(dir, function(err, list) {
    if (err) return done(err);
    var pending = list.length;
    if (!pending) return done(null, results);
    list.forEach(function(file) {
      file = path.resolve(dir, file);
      fs.stat(file, function(err, stat) {
        if (stat && stat.isDirectory()) {
          walk(file, function(err, res) {
            results = results.concat(res);
            if (!--pending) done(null, results);
          });
        } else {
          results.push(file);
          if (!--pending) done(null, results);
        }
      });
    });
  });
};


// Read folder
function folderList(location){

    fs.readdir(location, (err, files) => {
      if(files !== undefined){
        files.forEach(file => {
          console.log(file);
        });
      }

    })
}

//copy file (one)
function copyFile(fileName, path){
  buffers.push({
    fileName:fileName,
    path:path,
    fullPath:path+"/name"
  });
}

//copy file (one)
function copyFiles(fileNames, path){
	fileNames.forEach(function(name){
		  buffers.push({
		    fileName:name,
		    path:path,
		    fullPath:path+"/name"
		  });

	})
}

// paste files
function pasteFiles(destFolder){
  buffers.forEach(function(file){
    fs.createReadStream(file.path).pipe(fs.createWriteStream(destFolder+"/"+file.fileName));
  });

  buffers = [];
}

// goto
function gotoFolder(folderName) {
	curr_path += "/"+folderName;
}

// upper folder
function gotoFolder(folderName) {
	curr_path = '/media/card/';
}

// Error Msg
function errorMsg(msg){
	console.log(msg);
}

// If ctrl+c is hit, free resources and exit.
process.on('SIGINT', function () {
  process.exit();
});
