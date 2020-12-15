// 删除之前只需判断提供的路径是否为文件

let fs = require('fs');

function remove(path, callback) {
    let exists = fs.existsSync(path);

    if (!exists) {
        return;
    }

    // 判断传入的路径是否为文件
    if (fs.statSync(path).isFile()) {
        fs.unlinkSync(path);

        callback && callback();
    }
}

module.exports = remove;