const Users = require('./controllers/UsersController')

const routes = app => {
  // Users
  app.route('/api/users')
    .post(Users.register)
    .get(Users.loginRequired, Users.getUsers)
    .put(Users.loginRequired, Users.updateUser) // hanya bisa update account sendiri
    .delete(Users.loginRequired, Users.deleteUser) // hanya bisa hapus account sendiri

  app.route('/api/users/:id')
    .get(Users.loginRequired, Users.getUser)
    // .put(Users.loginRequired, Users.updateUser) // bisa update account orang lain
    // .delete(Users.loginRequired, Users.deleteUser) // bisa hapus account orang lain

  app.post('/api/users/login', Users.login)
  app.post('/api/users/verify', Users.loginRequired, Users.verify)
  app.post('/api/users/logout', Users.loginRequired, Users.logout)
  app.post('/api/users/forgot-password', Users.loginRequired, Users.forgotPassword)

  // run app
  // handle every other route with index.html, which will contain
  // a script tag to your application's JavaScript file(s).
  app.get('*', (req, res)=>{
   res.sendFile(path.resolve(__dirname, 'src', 'index.html'))
  })
}

module.exports = routes
