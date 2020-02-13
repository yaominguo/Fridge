const {prompt} = require('inquirer')
const chalk = require('chalk')
const download = require('download-git-repo')
const ora = require('ora')
const fs = require('fs')

const tplList = require(`${__dirname}/../templates`)
const questionList = require('./question')

module.exports = prompt(questionList).then(({name, template, description, author}) => {
  const projectName = name
  const templateName = template
  const gitPlace = tplList[templateName]['place']
  const gitBranch = tplList[templateName]['branch']
  let spinner = ora('Downloading, wait a moment please ...').start()
  download(`${gitPlace}${gitBranch}`, `./${projectName}`, err => {
    if (err) {
      spinner.fail(err)
      spinner.stop()
      process.exit()
    }
    spinner = spinner.succeed('Download complete. Initing project now ...')
    fs.readFile(`./${projectName}/package.json`, 'utf8', (err, data) => {
      if (err) {
        spinner.fail(err)
        spinner.stop()
        return
      }
      const packageJson = JSON.parse(data)
      packageJson.name = name
      packageJson.description = description
      packageJson.author = author
      const updatePackageJson = JSON.stringify(packageJson, null, 2)
      fs.writeFile(`./${projectName}/package.json`, updatePackageJson, 'utf8', err => {
        if (err) {
          spinner.fail(err)
          spinner.stop()
          return
        }
        spinner.succeed('Project init complete!')
        spinner.stop()
        console.log(`
          ${chalk.bgWhite.black('--------Start your project--------')}
          ${chalk.yellow(`cd ${name}`)}
          ${chalk.yellow('npm install')}
          ${chalk.yellow('npm start')}
        `)
      })
    })
  })
})