const _ = require('lodash')

const TravelsController = app => {
  let _travels = []

  // create
  app.post('/api/travels', (req, res)=>{
    console.log(req.body);
    _travels.push(req.body)
    res.json({"info" : "travel created"})
  })

  // read
  app.get('/api/travels', (req, res)=>{
    // res.json(_travels)
    console.log(req.query);
    res.send('okay')
  })

  // read
  // app.get('/api/travels?token=token', (req, res)=>{
  //   // res.send('travel'+ req.params.id + )
  //   res.json(req)
  // })

  // update
  app.put('/api/travels/:id', (req, res)=>{
    res.send('update')
  })

  // delete
  app.delete('/api/travels/:id', (req, res)=>{
    res.send('delete')
  })
}

module.exports = TravelsController
