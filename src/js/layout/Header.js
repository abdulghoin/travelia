// import Packages
import React, {Component} from 'react'
import {push} from 'react-router-redux'
import {IndexLink} from 'react-router'
import {connect} from 'react-redux'

// import Components
import ButtonLoader from 'ButtonLoader'

// import Actions
import {login} from 'usersActions'

// import Stores
@connect((store)=>{
  return{}
})

class Header extends Component {
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
      this.props.dispatch(push('register'))
    })
    .catch((error)=>{
      this.setState({login_loader : false, error})
    })
  }

  render() {
    let {location} = this.props
    let {email, password, show_password, remember_me, login_loader, error} = this.state
    let login = email !== '' && password !== ''? true : false
    return(
      <nav class='navbar navbar-inverse bg-inverse fixed-top'>
        <div class='row'>
          <IndexLink
            to='/'
            class='navbar-brand col'
          >
            Travelia
          </IndexLink>

          {
            location == '/'&&
            <div class="form-inline">
              <input
                class="form-control mr-sm-2"
                id="email"
                type="email"
                aria-describedby="emailHelp"
                value={email}
                onChange={this.onEmailChange}
                placeholder="email"
              />

              <div class="input-group mr-sm-2">
                <input
                  class="form-control"
                  id="password"
                  type={show_password?'text':'password'}
                  value={password}
                  onChange={this.onPasswordChange}
                  placeholder="password"
                />
                <span
                  class="input-group-addon"
                  onClick={this.onShowPasswoedChange}
                >{show_password?'Hidden':'Show'}</span>
              </div>
              <button
                type="submit"
                class={`${!login? 'disabled': ''} btn btn-primary my-sm-0`}
                onClick={login? this.onLogin : null}
              >
                {login_loader && <ButtonLoader />}
                Log In
              </button>
            </div>
          }
        </div>
      </nav>
    )
  }
}

export default Header
