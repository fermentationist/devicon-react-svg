const {readFile, writeFile, readdir} = require("fs");
const folder = process.argv[2] || "./!SVG";
console.log('folder', folder)
// readdir(folder, "utf-8", async (error, data) => {
//     if (error) {
//         console.log(error);
//         return;
//     }
//     console.log(data);
//     const svgPaths = await data.map(async fileName => {
//         const iconName = fileName.slice(0, -4);
//         const svgPath = await readFile(`${folder}/${fileName}`, "utf-8", async (err, fileData) => {
//             // console.log("†† ", getSVGPath(fileData))
            
//             // const out = {
//             //     [iconName]: getSVGPath(fileData),
//             // };

//             return new Promise((resolve, reject) => {
//                 if (err) {
//                     reject(err);
//                 }
//                 // console.log(getSVGPath(fileData));
                
//                 resolve((getSVGPath(fileData)));
//             });
//         });
//         console.log("≤≥", svgPath)
//         return svgPath;
//     });
// });
const getFileNamesPromise = dirPath => {
    return new Promise((resolve, reject) => {
        readdir(dirPath, "utf-8", (error, data) => {
            if (error) {
                reject(error);
            }
            resolve(data);
        });
    });
}
// const getFileNames = async (dirPath) => {
//     const names = await readdir(dirPath, "utf-8", async (error, data) => {
		
//         // console.log("∂", data)
//         return await data ? data : console.log(error);
//     });
//     console.log('TCL: getFileNames ->  names', names)
//     return names
// }

const readFilePromise = filePath => {
    return new Promise((resolve, reject) => {
        readFile(filePath, "utf-8", (error, data) => {
            if (error) {
                reject(error);
            }
            resolve(data);
        });
    });
}
const processFile = async (filePath) => {
    const data = await readFilePromise(filePath);
    return getSVGPath(data);
}

const main = async (fileDir) => {
    // let outputData = [];
    const fileNames = await getFileNamesPromise(fileDir);
    const iconDataArray = fileNames.map(async (fileName) => {
        const filePath = `${fileDir}/${fileName}`;
        const extractedPaths = await processFile(filePath);
        return ({
            [fileName.slice(0, -4)]: extractedPaths,
        });
        // console.log(iconDataArray)
    });
    let outputObject = {};
    const outputData = await Promise.all(iconDataArray)
    outputData.forEach((icon) => {
        outputObject = {
            ...outputObject,
            ...icon,
        }
    });
    const stringifiedOutput = JSON.stringify(await outputObject);
    const dataToWrite = "module.exports = " + stringifiedOutput + ";"
    writeFile("extractedSVGPaths.js", dataToWrite, "utf-8", x => x);
}

main(folder);


const getSVGPath = (fileData, outputArray = []) => {
    // console.log(`getSVGPath(fileData, ${outputArray}) called`);
    const firstPath = fileData.indexOf("d=\"");
    if (firstPath === -1) {
        return outputArray;
    }
    const start = firstPath + 3;
    // console.log('start', start);

    const end = fileData.slice(start).indexOf("\"") + start;
    // console.log('end', end);
    const path = fileData.slice(start, end);
    // console.log('path', path);
    outputArray.push(path);
    const remainder = fileData.slice(end);
    return getSVGPath(remainder, outputArray);
}
