let fs = require('fs');

// 可以创建多层级文件夹
function mkdir(path, callback) {
  
  let pathArr = path.toString().split('/');

  for (let i=1; i<pathArr.length; i++) {
    let newPath = pathArr.slice(0, i+1).join('/');

    // 判断路径是否存在
    let exists = fs.existsSync(newPath);
    if (exists) {
      return;
    }

    fs.mkdirSync(newPath);
  }

  callback && callback();
}

module.exports = mkdir;