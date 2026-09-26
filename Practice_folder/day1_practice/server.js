import  sum from  './math.js'
import   os  from  'os'
console.log(`sum of 10 and  20 ${sum(10,20)}`)
console.log(os.type())

if (os.type()==='Windows_NT'){
    console.log('this is window')
}


else{
    console.log("this is mac")
}


console.log(`platform :${os.platform} , cpu process:${os.cpus},architecture  method:${os.arch}`)





import path from 'path';
import { fileURLToPath } from 'url';

// 1. Get the current file's absolute URL and convert it to a file path
const __filename = fileURLToPath(import.meta.url);

// 2. Extract the directory name from that file path
const __dirname = path.dirname(__filename);

// 3. Now you can use __dirname safely!
const fullPath = path.join(__dirname, 'math.js');
console.log(fullPath);
// Output will be the exact full absolute path on your machine!

