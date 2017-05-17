//var b = require('bonescript');
var fs = require('fs');
var path = require('path');
var readline = require('readline');
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

// Copy (Folder List -> Select -> Buffer)
/*b.pinMode('P8_15', b.INPUT);

setInterval(check2,1000);
function check1(){
  b.digitalRead('P8_15', checkButton);
}

function checkButton(x) {
  console.log(x.value);
}*/
var curr_path = "/media/sdcard";
var mode = "";
var buffers = [];
readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);
process.stdin.on('keypress', (str, key) => {

  if (key.ctrl && key.name === 'c') {
    process.exit();
  } else {
    /*console.log(`You pressed the "${str}" key`);
    console.log();
    console.log(key);
    console.log();*/
    console.log('\033[2J');
    console.log("=========== File Lists ==========");
    console.log("Current Path: "+curr_path);
    folderList(curr_path);
    mode = "";
    switch(key.name){
      case "return":
        mode = "ENTER";

        if(selected_file !== undefined){
          if(!fs.lstatSync(curr_path+"/"+selected_file).isDirectory()){
            console.log("It is not a directory!");
          }else{
            selected_x = 0;
            noOfFile =0 ;
            curr_path += "/"+selected_file;
            console.log('\033[2J');
            console.log("=========== File Lists ==========");
            console.log("Current Path: "+curr_path);
            folderList(curr_path);
          }
        }

        break;
      case "left":
        mode = "PASTE";
        pasteFiles(curr_path);
        noOfFile++;
        console.log(selected_file+" Pasted!");
        console.log('\033[2J');
        console.log("=========== File Lists ==========");
        console.log("Current Path: "+curr_path);
        folderList(curr_path);
        break;
      case "right":
        mode = "COPY_1";
        copyFile(selected_file, curr_path);
        console.log(selected_file+" Copied!");
        break;
      case "up":
        console.log("up");
        selected_x--;
        if(0 > selected_x) selected_x = 0;
        break;
      case "down":
        selected_x++;
        if(noOfFile > selected_x) selected_x--;
        console.log("down");
        break;
    }
  }
});
console.log('Press any button...');

const emptyDir = require('empty-dir');

//setInterval(check2,100);
var isPrinted = false;
function check2() {
  if (!emptyDir.sync("/Volumes/Untitled") && fs.existsSync("/Volumes/Untitled")) {
  //if (!emptyDir.sync("/media/sdcard") && fs.existsSync("/media/sdcard") && !isPrinted) {
      //folderList("/Volumes/Untitled");
      folderList("/media/sdcard");

  }
}

var selected_x = 0;
var selected_file;
var noOfFile = 0;
// Read folder
function folderList(location){

    fs.readdir(location, (err, files) => {
      var i = 0;
      if(files !== undefined){
        files.forEach(file => {
          if(i === selected_x){
              console.log("[x]"+file);
              selected_file = file;
          }else{
              console.log("[ ]"+file);
          }
          i++;

        });
      }
      noOfFile = i;
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
