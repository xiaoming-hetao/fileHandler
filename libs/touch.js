// 创建文件的思路是逐级创建文件夹之后最终对应的文件

let fs = require('fs');

function touch(path, callback) {
    let pathArr = path.toString().split('/');

    for (let i=1; i<pathArr.length; i++) {
        let newPath = pathArr.slice(0, i+1).join('/');

        // 判断文件或者文件夹是否存在
        let exists = fs.existsSync(newPath);
        if (exists) {
            return;
        }

        // 数组的最后一项则创建文件
        if (i === pathArr.length-1) {
            let fd = fs.openSync(newPath, 'w');
            fs.closeSync(fd);
        } else {//非数组最后一项则创建文件夹
            fs.mkdirSync(newPath);
        }
    }

    callback && callback();
}

module.exports = touch;