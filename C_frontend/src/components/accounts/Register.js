import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';

import { register } from "../../actions/auth";
import { createMessage } from "../../actions/message";

import { Grid } from '@material-ui/core';

export class Register extends Component {
  state = {
      username: "k",
      email: "k@gmail.com",
      password: "123",
      password2: "123"
  }    

  static propTypes = {
      register: PropTypes.func.isRequired,
      createMessage: PropTypes.func.isRequired,
      isAuthenticated: PropTypes.bool.isRequired
  }
  
  onSubmit = e => {
      e.preventDefault();
      const { username, email, password, password2 } = this.state;
      
      if (password !== password2) {
          this.props.createMessage({ 
              passwordNotMatch: 'Passwords do not match' });
      } 
      else {
          const newUser = {
              password,
              username,
              email,
          };
          
          this.props.register(newUser);
      }
  }

  onChange = e => this.setState({ [e.target.name]: e.target.value })

  render() {
      const {username, email, password, password2} = this.state;

      if (this.props.isAuthenticated){
          return <Redirect to="/" />
      }

      return (
          
          <div style={{width:"50vw", marginLeft:"10vw"}} >
              <h2>Register : </h2>
              <form onSubmit={this.onSubmit}>
                
                  <div className='input-label' >
                    <span>Username : </span>
                    </div>
                  
                  <div className='input-box' >
                    <input
                        type="text"
                        name="username"
                        onChange={this.onChange}
                        value={username}
                        />
                        </div>

                  <div className='input-label' >
                    <span>Email : </span>
                  </div>
                  
                  <div className='input-box' >
                    <input
                        type="email"
                        name="email"
                        onChange={this.onChange}
                        value={email}
                        />
                        </div>

                  <div className='input-label' >
                    <span>Password : </span>
                    </div>
                  
                  <div className='input-box' >
                    <input
                        type="password"
                        name="password"
                        onChange={this.onChange}
                        value={password}
                        />
                        </div>
                  

                  <div className='input-label' >
                    <span>Pass again : </span>
                    </div>
                  
                  <div className='input-box' >
                    <input
                        type="password"
                        name="password2"
                        onChange={this.onChange}
                        value={password2}
                        />
                        </div>

                <div className='input-label label-fake' >fake</div>  
                <div className='input-label' >
                  <button type="submit" className="button-class-1">
                          Submit</button>
                </div>

                <div className='form-footer'>
                  <p>
                      Already have account ? 
                      <Link to='/login'> Login</Link>
                  </p>
                </div>

              </form>
          </div>
        
      )
  }
}


const mapStateToProps = state => ({
  isAuthenticated: state.authRD.isAuthenticated,
})

export default connect(mapStateToProps, {register, createMessage} )(Register)