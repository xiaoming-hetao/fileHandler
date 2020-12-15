// 剪切文件功能可以通过rename方法实现
let fs = require('fs');

let mkdir = require('./mkdir');

function cut(src, dist) {
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

    // 判断是否是文件剪切
    if (fs.statSync(src).isFile()) {
        filename = src.toString().match(/\/([^\/]+)$/g)[0];
        distPath = dist + filename;
        fs.renameSync(src, distPath);
    } else {
        // 如果是文件夹剪切
        let paths = fs.readdirSync(src);
        for (let i=0; i<paths.length; i++) {
            srcPath = src + '/' + paths[i];
            distPath = dist + '/' + paths[i];
            fs.renameSync(srcPath, distPath);
        }
    }

}

module.exports = cut;