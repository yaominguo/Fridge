const express = require('express')
const bodyParser = require('body-parser')
const Article = require('./db').Article
const read = require('node-readability')

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

const port = process.env.PORT || 3000

app.get('/articles', (req, res, next) => {
  Article.all((err, articles) => {
    if (err) return next(err)
    res.send(articles)
  })
})
app.post('/articles', (req, res, next) => {
  const url = req.body.url
  read(url, (err, result) => {
    if (err || !result) res.status(500).send('Error downloading article')
    Article.create(
      {title: result.title, content: result.content},
      (err, article) => {
        if (err) return next(err)
        res.send('OK')
      }
    )
  })
})
app.get('/articles/:id', (req, res, next) => {
  const id = req.params.id
  Article.find(id, (err, article) => {
    if (err) return next(err)
    res.send(article)
  })
})
app.delete('/articles/:id', (req, res, next) => {
  const id = req.params.id
  Article.delete(id, (err) => {
    if (err) return next(err)
    res.send({message: 'Deleted'})
  })
})

app.listen(port, () => {
  console.log(`Express web app available at http://localhost:${port}`)
})

module.exports = app