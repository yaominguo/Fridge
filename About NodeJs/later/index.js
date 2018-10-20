const express = require('express')
const bodyParser = require('body-parser')

const app = express()
const articles = [
  {title: 'Example'}
]
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

const port = process.env.PORT || 3000

// curl http://localhost:3000/articles 触发
app.get('/articles', (req, res, next) => {
  res.send(articles)
})
// curl --data "title=Example2" http://localhost:3000/articles 触发
app.post('/articles', (req, res, next) => {
  const article = {title: req.body.title}
  articles.push(article)
  res.send(articles)
})
// curl http://localhost:3000/articles/0 触发
app.get('/articles/:id', (req, res, next) => {
  const id = req.params.id
  console.log('Fetching:', id)
  res.send(articles[id])
})
// curl -X DELETE http://localhost:3000/articles/0 触发
app.delete('/articles/:id', (req, res, next) => {
  const id = req.params.id
  console.log('Deleting:', id)
  delete articles[id]
  res.send({message: 'Deleted'})
})

app.listen(port, () => {
  console.log(`Express web app available at http://localhost:${port}`)
})