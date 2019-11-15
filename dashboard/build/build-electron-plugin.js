// 用于打包时在dist目录中输出electron.js和package.json
const fs = require('fs')
const path = require('path')

class BuildElectronPlugin {
  apply(compiler) {
    compiler.plugin('emit', (compilation, callback) => {
      const filename = path.join(__dirname, '../electron.js')
      const outFilename = (filename.split('/')).pop()

      new Promise((resolve, reject) => {
        fs.readFile(filename, (err, data) => {
          if (err) {
            reject(err)
          } else {
            resolve(data)
          }
        })
      }).then(res => {
        const jsonText = `{"main": "${outFilename}"}`
        compilation.assets[outFilename.toString()] = {
          source () {
            return res;
          },
          size () {
            return fs.statSync(filename).size;
          }
        }
        compilation.assets['package.json'] = {
          source () {
            return jsonText
          },
          size () {
            return jsonText.length
          }
        }
      })
      callback();
    });
  }
}

module.exports = BuildElectronPlugin;
