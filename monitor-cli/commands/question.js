const program = require('commander')
const option = program.parse(process.argv).args[0]
const defaultName = typeof option === 'string' ? option : 'monitor-project'
const tplList = require(`${__dirname}/../templates`)
const tplLists = Object.keys(tplList) || []
module.exports = [
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