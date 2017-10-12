// import Packages
import React, {Component} from 'react'
import Helmet from 'react-helmet'
import {Link} from 'react-router'
import {connect} from 'react-redux'

// import Actions
import {forgotPassword} from 'usersActions'

// import Stores
@connect((store)=>{
  return{}
})

class ForgotPassword extends Component {
  constructor() {
    super()
    this.state = {
      email : '',
      send_loader : false,
      reset_success : false,
      error : null
    }
  }

  onEmailChange=(e)=>{
    this.setState({email : e.target.value})
  }

  onSendEmail=()=>{
    this.setState({send_loader : true, error : null, reset_success : false})
    this.props.dispatch(forgotPassword(this.state.email))
    .then(()=>{
      this.setState({send_loader : false, reset_success : true})
    })
    .catch((error)=>{
      this.setState({send_loader : false, error})
    })
  }

  render() {
    let {email} = this.state
    return(
      <div class="card card-login mx-auto mt-5">
        <Helmet title='Forgot Password' />
        <div class="card-header">Reset Password</div>
        <div class="card-body">
          <div class="text-center mt-4 mb-5">
            <h4>Forgot your password?</h4>
            <p>Enter your email address and we will send you instructions on how to reset your password.</p>
          </div>
          <div class='form'>
            <div class="form-group">
              <input
                class="form-control"
                id="email"
                type="email"
                aria-describedby="emailHelp"
                placeholder="Enter email address"
                value={email}
                onChange={this.onEmailChange}
              />
            </div>
            <button
              class={`${email!==''?'':'disabled'} btn btn-primary btn-block`}
              onClick={email!==''?this.onSendEmail:null}
            >Reset Password</button>
          </div>
          <div class="text-center">
            <Link class="d-block small mt-3" to="/register">Register an Account</Link>
            <Link class="d-block small" to="/login">Login Page</Link>
          </div>
        </div>
      </div>
    )
  }
}

export default ForgotPassword
