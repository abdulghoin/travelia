// import Packages
import React, {Component} from 'react'
import Helmet from 'react-helmet'
import {Link} from 'react-router'
import {connect} from 'react-redux'

// import Components
import ButtonLoader from 'ButtonLoader'

// import Actions
import {login} from 'usersActions'

// import Stores
@connect((store)=>{
  return{
    login_error : store.users.error
  }
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
    this.setState({login_loader : true})
    this.props.dispatch(login(email, password, remember_me))
    .then(()=>{
      this.setState({login_loader : false})
      this.props.dispatch(push('/dashboard'))
    })
    .catch((error)=>{
      this.setState({login_loader : false})
    })
  }

  render() {
    let {email, password, show_password, remember_me, login_loader} = this.state
    let {login_error} = this.props
    let login = email !== '' && password !== ''? true : false
    let email_error = ''
    let password_error = ''
    if (login_error!=null) {
      switch (login_error.status) {
        case 404:
          email_error = login_error.data[0].error_message
        break;
        case 401:
          password_error = login_error.data[0].error_message
        break;
        default:
      }
    }
    return(
      <div class="card card-login mx-auto mt-5">
        <Helmet title='Log In'/>
        <div class="card-header">Login</div>
        <div class="card-body">
          <div class='form'>
            <div class="form-group">
              <label for="email">Email address</label>
              <input
                class={`form-control ${email_error!=''? 'error_field': ''}`}
                id="email"
                type="email"
                aria-describedby="emailHelp"
                placeholder="Enter email"
                value={email}
                onChange={this.onEmailChange}
              />
              {
                email_error != '' &&
                <p class='error_text'>{email_error}</p>
              }
            </div>
            <div class="form-group">
              <label for="password">Password</label>
              <div class="input-group">
                <input
                  class={`form-control ${password_error!=''? 'error_field': ''}`}
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
              {
                password_error != '' &&
                <p class='error_text'>{password_error}</p>
              }
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
              {login_loader && <ButtonLoader/>}
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
