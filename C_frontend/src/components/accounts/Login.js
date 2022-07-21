import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom';

import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';

import { Grid } from '@material-ui/core'


export class Login extends Component {
  static propTypes = {
      login: PropTypes.func.isRequired,
      isAuthenticated: PropTypes.bool
  }

  state = {
      username: "k1",
      password: "123",
  }    
  
  onSubmit = e => {
      e.preventDefault();

      console.log('Submit');
      this.props.login(
          this.state.username,
          this.state.password
      )
  }

  onChange = e => this.setState({ 
    [e.target.name]: e.target.value 
  })

  render() {
      if (this.props.isAuthenticated) {
          return <Redirect to='/' />
      }

      const {username, password } = this.state;

      return (
      <>
          <div style={{width:"50vw", marginLeft:"10vw"}}>

            <h2>Login : </h2>
            <form onSubmit={this.onSubmit}>
                
                  <div className="input-label">
                    <span>Username : </span>
                    </div>
                  
                  <div className="input-box">
                    <input
                        type="text"
                        name="username"
                        onChange={this.onChange}
                        value={username}
                        />
                  </div>
                
                
                
                  <div className="input-label">
                    <span>Password : </span>
                    </div>
                  
                  <div className="input-box">
                    <input
                        type="password"
                        name="password"
                        onChange={this.onChange}
                        value={password}
                        />
                  </div>
                
                
                  <div className='input-label label-fake'>fake</div>

                  <div className='input-box'>
                    <button type="submit" className='button-class-1'>
                        Login</button>
                  </div>
                
                <div className="form-footer">
                  <p>
                      Dont have an account ? 
                      <Link to='/register'> Register</Link> 
                  </p>
                </div>
            </form>

          </div>
      </>
      )
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.authRD.isAuthenticated,
})

export default connect(mapStateToProps, { login } )(Login);