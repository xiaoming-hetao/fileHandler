// 删除文件夹之前要先删除其子文件及子文件夹

let fs = require('fs');

function rmdir(path, callback) {
    // 判断需要删除的文件或文件夹是否存在
    let exists = fs.existsSync(path);
    if (exists) {
        return;
    }

    // 读取文件夹中的所有文件及文件夹
    let files = fs.readdirSync(path);

    for (let i=0; i<files.length; i++) {
        let currPath = path + '/' + files[i];

        if (fs.statSync(currPath).isDirectory()) {
            rmdir(currPath);
        } else {
            fs.unlinkSync(currPath);
        }
    }
    
    // 删除当前文件夹
    fs.rmdirSync(path);
    callback && callback();
}

module.exports = rmdir;