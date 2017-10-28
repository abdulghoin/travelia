// import Packages
import React, {Component} from 'react'
import Helmet from 'react-helmet'
import {Link} from 'react-router'
import {connect} from 'react-redux'

// import Components
import ButtonLoader from 'ButtonLoader'

// import Actions
import {register} from 'usersActions'

// import Stores
@connect((store)=>{
  return{}
})

class Register extends Component {
  constructor() {
    super()
    this.state = {
      first_name : '',
      last_name : '',
      email : '',
      password : '',
      confirm_password : '',
      register_loader : false,
      error : null
    }
  }

  onFirstNameChange=(e)=>{
    this.setState({first_name : e.target.value})
  }

  onLastNameChange=(e)=>{
    this.setState({last_name : e.target.value})
  }

  onEmailChange=(e)=>{
    this.setState({email : e.target.value})
  }

  onPasswordChange=(e)=>{
    this.setState({confirm_password : '', password : e.target.value})
  }

  onConfirmPasswordChange=(e)=>{
    this.setState({confirm_password : e.target.value})
  }

  onRegister=()=>{
    let {first_name, last_name, email, password} = this.state
    this.setState({register_loader : true, error : null})
    this.props.dispatch(register(first_name, last_name, email, password))
    .then(()=>{
      this.setState({register_loader : false})
      this.props.dispatch(push('/login'))
    })
    .catch((error)=>{
      this.setState({register_loader : false, error})
    })
  }

  render() {
    let {first_name, last_name, email, password, confirm_password, register_loader, error} = this.state
    let error_confirm = password !== confirm_password? true : false
    let register = first_name !== '' && last_name !== '' && email !== '' && password !== '' && !error_confirm ? true : false

    let email_error = ''
    if (error != null) {
      switch (error.status) {
        case 422:
          email_error = error.data[0].error_message
        break;
        default:

      }
    }
    return(
      <section class="card card-register mx-auto mt-5">
        <Helmet title='Register' />
        <div class="card-header">Register an Account</div>
        <div class="card-body">
          <div class='form'>
            <div class="form-group">
              <div class="form-row">
                <div class="col-md-6">
                  <label for="first_name">First name</label>
                  <input
                    class="form-control"
                    id="first_name"
                    type="text"
                    aria-describedby="nameHelp"
                    placeholder="Enter first name"
                    value={first_name}
                    onChange={this.onFirstNameChange}
                  />
                </div>
                <div class="col-md-6">
                  <label for="last_name">Last name</label>
                  <input
                    class="form-control"
                    id="last_name"
                    type="text"
                    aria-describedby="nameHelp"
                    placeholder="Enter last name"
                    value={last_name}
                    onChange={this.onLastNameChange}
                  />
                </div>
              </div>
            </div>
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
              <div class="form-row">
                <div class="col-md-6">
                  <label for="password">Password</label>
                  <input
                    class="form-control"
                    id="password"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={this.onPasswordChange}
                  />
                </div>
                <div class="col-md-6">
                  <label for="confirm_password">Confirm password</label>
                  <input
                    class={`${error_confirm?'errorfield':''} form-control`}
                    id="confirm_password"
                    type="password"
                    placeholder="Confirm password"
                    value={confirm_password}
                    onChange={this.onConfirmPasswordChange}
                    disabled={password==''?true: false}
                  />
                </div>
              </div>
            </div>
            <button
              class={`${!register? 'disabled': ''} btn btn-primary btn-block`}
              onClick={register? this.onRegister: null}
            >
              {register_loader && <ButtonLoader/>}
              Register
            </button>
          </div>
          <div class="text-center">
            <Link class="d-block small mt-3" to="/login">Login Page</Link>
            <Link class="d-block small" to="/forgot-password">Forgot Password?</Link>
          </div>
        </div>
      </section>
    )
  }
}

export default Register
