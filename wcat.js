let fs = require("fs");

let inputArr = process.argv.slice(2); //Taking input

let optionsArr = []; //initiliazing options array
let filesArr = []; //initiliazing files array

for (let i = 0; i < inputArr.length; i++) {
  let firstChar = inputArr[i].charAt(0);

  if (firstChar == "-") {
    //checking for options or path
    optionsArr.push(inputArr[i]); //pushing in options array
  } else {
    filesArr.push(inputArr[i]); //pushing in files array
  }
}

let allFilesContent = "";

for (let i = 0; i < filesArr.length; i++) {
  if (fs.existsSync(filesArr[i]) == true) {
    //checking if file path is correct or not
    let content = fs.readFileSync(filesArr[i]);
    allFilesContent += "\r\n" + content;
  } else {
    console.log("File doesn't exist ");
    return;
  }
}

let arr = allFilesContent.split("\r\n"); //creating an array of content in files

if (optionsArr.length == 0) {
  console.log(allFilesContent);
} else {
  if (optionsArr.includes("-n") == true && optionsArr.includes("-b") == true) {
    //checking for edge case if b and n exists togther

    let n1 = optionsArr.indexOf("-n");
    let b1 = optionsArr.indexOf("-b");

    if (n1 > b1) {
      //comparaing which operation occurs first
      for (let i = n1; i < optionsArr.length; i++) {
        if (optionsArr[i] == "-b" || optionsArr[i] == "-n") {
          optionsArr.splice(i, 1);
          i--;
        }
      }
    } else {
        for (let i = b1; i < optionsArr.length; i++) {
            if (optionsArr[i] == "-b" || optionsArr[i] == "-n") {
              optionsArr.splice(i, 1);
              i--;
            }
          }
    }
  }

  // operation for -s command
  if (optionsArr.includes("-s") == true) {
    let output = [];

    for (let i = 1; i < arr.length; i++) {
      if (arr[i] != "") {
        output.push(arr[i]);
      } else if (arr[i] == "" && arr[i - 1] != "") {
        output.push(arr[i]);
      }
    }
    arr = output;
  }

  //operation for -n command
  if (optionsArr.includes("-n") == true) {
    let output = [];

    for (let i = 0; i < arr.length; i++) {
      output.push(i + 1 + " " + arr[i]);
    }
    arr = output;
  }

  //operation for -b command
  if (optionsArr.includes("-b") == true) {
    let counter = 1;
    let output = [];

    for (let i = 0; i < arr.length; i++) {
      if (arr[i] != "") {
        output.push(counter++ + " " + arr[i]);
      } else {
        output.push(arr[i]);
      }
    }
    arr = output;
  }

  console.log(arr.join("\n"));
}
