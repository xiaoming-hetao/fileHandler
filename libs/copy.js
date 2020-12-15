// 复制文件的同时需要创建文件夹和文件

let fs = require('fs');
let mkdir = require('./mkdir');

function copy(src, dist) {
    // 被复制的路径是否存在
    let existsSrc = fs.existsSync(src);

    // 要输出的路径是否存在
    let existsDist = fs.existsSync(dist);
    let filename, distPath, srcPath, readAble, writeAble;
    if (!existsSrc) {
        return;
    }

    // 输出路径不存在则创建文件夹
    if (!existsDist) {
        mkdir(dist);
    }

    // 判断是否为文件复制
    if (fs.statSync(src).isFile()) {
        // 利用正则获取路径中的文件名
        filename = src.toString().match(/\/([^\/]+)$/g)[0];
        distPath = dist + filename;

        // 利用文件流写入文件内容
        readAble = fs.createReadStream(src);
        writeAble = fs.createWriteStream(distPath);
        readAble.pipe(writeAble);
    } else {
        // 路径是文件夹的处理逻辑
        let paths = fs.readdirSync(src);
        for (let i=0; i<paths.length; i++) {
            srcPath = src + '/' + paths[i];
            distPath = dist + '/' + paths[i];
        }

        // 是文件夹中的文件则通过文件流创建和写入文件
        if (fs.statSync(srcPath).isFile()) {
            readAble = fs.createReadStream(srcPath);
            writeAble = fs.createWriteStream(distPath);
            readAble.pipe(writeAble);
        } else if (fs.statSync(srcPath).isDirectory()) {
            copy(srcPath, distPath);
        }
    }
}

module.exports = copy;