// import Packages
import React, {Component} from 'react'
import Helmet from 'react-helmet'
import {Link} from 'react-router'
import {connect} from 'react-redux'

// import Actions
import {login} from 'usersActions'

// import Stores
@connect((store)=>{
  return{}
})

class Login extends Component {
  constructor() {
    super()
    this.state = {
      email : '',
      password : '',
      show_password : false,
      remember_me : false,
      login_loader : false,
      error : null
    }
  }

  onEmailChange =(e)=>{
    this.setState({email : e.target.value})
  }

  onPasswordChange =(e)=>{
    this.setState({password : e.target.value})
  }

  onShowPasswoedChange =()=>{
    this.setState({show_password : !this.state.show_password})
  }

  onRememberMeChange =()=>{
    this.setState({remember_me : !this.state.remember_me})
  }

  onLogin =()=>{
    let {email, password, remember_me} = this.state;
    this.setState({login_loader : true, error : null})
    this.props.dispatch(login(email, password, remember_me))
    .then(()=>{
      this.setState({login_loader : false})
      this.props.dispatch(push('/dashboard'))
    })
    .catch((error)=>{
      this.setState({login_loader : false, error})
    })
  }

  render() {
    let {email, password, show_password, remember_me, login_loader, error} = this.state
    let login = email !== '' && password !== ''? true : false
    return(
      <div class="card card-login mx-auto mt-5">
        <Helmet title='Log In'/>
        <div class="card-header">Login</div>
        <div class="card-body">
          <div class='form'>
            <div class="form-group">
              <label for="email">Email address</label>
              <input
                class="form-control"
                id="email"
                type="email"
                aria-describedby="emailHelp"
                placeholder="Enter email"
                value={email}
                onChange={this.onEmailChange}
              />
            </div>
            <div class="form-group">
              <label for="password">Password</label>
              <div class="input-group">
                <input
                  class="form-control"
                  id="password"
                  type={show_password?'text':'password'}
                  placeholder="Password"
                  value={password}
                  onChange={this.onPasswordChange}
                />
                <span
                  class="input-group-addon"
                  onClick={this.onShowPasswoedChange}
                >{show_password?'Hidden':'Show'}</span>
              </div>
            </div>
            <div class="form-group">
              <div class="form-check">
                <label class="form-check-label">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    checked={remember_me}
                    onChange={this.onRememberMeChange}
                  /> Remember Password</label>
              </div>
            </div>
            <button
              class={`${!login? 'disabled': ''} btn btn-primary btn-block`}
              onClick={login? this.onLogin : null}
            >
              Login
            </button>
          </div>
          <div class="text-center">
            <Link class="d-block small mt-3" to="/register">Register an Account</Link>
            <Link class="d-block small" to="/forgot-password">Forgot Password?</Link>
          </div>
        </div>
      </div>
    )
  }
}

export default Login
