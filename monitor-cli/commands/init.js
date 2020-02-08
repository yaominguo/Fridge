const {prompt} = require('inquirer')
const program = require('commander')
const chalk = require('chalk')
const download = require('download-git-repo')
const org = require('ora')
const fs = require('fs')

const option = program.parse(process.argv).args[0]
const defaultName = typeof option === 'string' ? option : 'monitor-project'
const tplList = require(`${__dirname}/../templates`)
const tplLists = Object.keys(tplList) || []
const questionList = [
  {
    type: 'input',
    name: 'name',
    message: 'Project name',
    default: defaultName,
    filter(val) {
      return val.trim()
    },
    validate(val) {
      const validate = (val.trim().split(' ').length === 1)
      return validate || 'Project name is not allowed to have spaces.'
    },
    transformer(val) {
      return val
    },
  },
  {
    type: 'list',
    name: 'template',
    message: 'Project tempalte',
    choices: tplLists,
    default: tplLists[0],
    validate(val) {
      return true
    },
    transformer(val) {
      return val
    },
  },
  {
    type: 'input',
    name: 'description',
    message: 'Project description',
    default: 'A monitor Project',
    validate(val) {
      return true
    },
    transformer(val) {
      return val
    },
  },
  {
    type: 'input',
    name: 'author',
    message: 'Author',
    default: 'Guo',
    validate (val) {
      return true
    },
    transformer(val) {
      return val
    }
  }
]

module.exports = prompt(questionList)
  .then(({name, template, description, author}) => {
    const projectName = name
    const templateName = template
    const gitPlace = tplList[templateName]['place']
    const gitBranch = tplList[templateName]['branch']
    const spinner = org('Downloading, wait a moment please ...')
    spinner.start()
    download(`${gitPlace}${gitBranch}`, `./${projectName}`, err => {
      if (err) {
        console.log(chalk.red(err))
        process.exit()
      }
      fs.readFile(`./${projectName}/package.json`, 'utf8', (err, data) => {
        if (err) {
          spinner.stop()
          console.error(err)
          return
        }
        const packageJson = JSON.parse(data)
        packageJson.name = name
        packageJson.description = description
        packageJson.author = author
        const updatePackageJson = JSON.stringify(packageJson, null, 2)
        fs.writeFile(`./${projectName}/package.json`, updatePackageJson, 'utf8', err => {
          if (err) {
            spinner.stop()
            console.error(err)
            return
          }
          spinner.stop()
          console.log(chalk.green('Project init complete!'))
          console.log(`
            ${chalk.bgWhite.black('--------Run Application--------')}
            ${chalk.yellow(`cd ${name}`)}
            ${chalk.yellow('npm install')}
            ${chalk.yellow('npm start')}
          `)
        })
      })
    })
  })