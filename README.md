# Beagle Bone Black File Manager

An USB file manager for the Beagle Bone Black

## Description
In the late 2016, Apple released a new Macbook. At first glance, it was a good model because it has high-speed CPU, maximum 16GB memory and other great hardware. The only problem of the new Macbook was it has 4-port of USB-C which is unfamiliar with people. To use his/her own device that has just a normal cable of USB, we need to buy a USB-to-USB-C converter and it has at least $10 cost. It was not only USB’s problem, but also the other type of cable’s problem such as HDMI or Thunderbolt. Because of that, many previous Apple user was not satisfied with those USB-C. Converter is always needed to use the previous type of cable, even we simply need to see whether file exist or not within a specific extra storage. 

To solve this problem, we decided to use the BeagleBone Black Wireless to check the status of extra storage and then make possible to copy/paste file within directories. Since BeagleBone Black has a common USB port, we can use of it as well as check our previous device. 

## Requirements

##### Name 
Extra HDD reader and its utility 
##### Purpose 
Check the status of extra storage and then make possible to copy/paste file within directories 
##### Input 
7 push buttons including LEFT, RIGHT, UP, DOWN, ENTER, RESET and POWER. 
Any Type of Extra HardDisk 
##### Output 
4.3 Inch TFT LCD 480 x 272 
##### Functions 
1. Folder List 
2. Copy Files 
3. Paste Files 
##### Performance 
Updates screen within 0.25 seconds if user click the display-on button 
##### Manufacturing cost 
$165 
##### Power 
5V DC 
##### Physical size and weight 
3.4" (L) x 2.1" (W) 
1.4 oz (39.68 g) 

## SW Specification
*	Language: JavaScript
*	IDE: Cloud9 (basic of BeagleBone)
*	Main Backend: Node.js with SMTP library
*	File Reader: file descriptor library for the node.js
*	Used Libraries: FS (File Descriptor) for the node.js

## SW FlowChart

## Functions
Our project is implementing the reader for the extra-storage reader and its utility. When user connect via USB, if it is kind of storage then we’ll show user the folder tree and wait user’s action. We have a five possible actions (functions):
### 1. folderList(char[] location)
User can see the current folder’s folder list.
```javascript
// Read folder
var folderList = function(location){
    
    fs.readdir(location, (err, files) => {
      files.forEach(file => {
        console.log(file);
      });
    })
}

```
### 2.copyFiles(String[] fileList)
User can copy the multiple file that user selected. When this function is run, the list of files will copy into the buffer and it will use when user run the pasteFiles() function. If there is some buffer, the buffer will be cleared and filled current file list out.
```javascript
//copy file (one)
var copyFile = function(fileName, path){
  buffers.push({
    fileName:fileName,
    path:path,
    fullPath:path+"/name"
  });
}

//copy file (one)
var copyFiles = function(fileNames, path){
	fileNames.forEach(function(name){
		  buffers.push({
		    fileName:name,
		    path:path,
		    fullPath:path+"/name"
		  });

	})
}

```
### 3. pasteFiles(String curr_location)
User can paste the file that previously copied. Whatever it copied, the real copy object is that user recently did the copied files. Paste cannot do the previous copied file.
```javascript
// paste files
var pasteFiles = function(destFolder){
  buffers.forEach(function(file){
    fs.createReadStream(file.path).pipe(fs.createWriteStream(destFolder+"/"+file.fileName));  
  });
  
  buffers = [];
}

```
### 4. sendFileTo(String filename, String email) (Not Implemented)
User also share his/her specific file via email by using the SMTP and Wireless. If the machine does not connected by the internet, this method cannot work correctly and show user the error message.

### 5. errorMsg(String msg)
Show the error message in the GUI when any errors were occurred.
```javascript
// Error Msg
var errorMsg = function(msg){
	console.log(msg);
}

## License

[MIT](LICENSE.md) © [Matthew Chang](https://www.matthewlab.com)
```

