import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { changePassword } from '../../actions/auth';
import { createMessage } from '../../actions/message';
import { Redirect } from 'react-router-dom';
import { Grid } from '@material-ui/core';


export class Profile extends Component {
  static propType = {
    isAuthenticated: PropTypes.bool.isRequired,
    user: PropTypes.object.isRequired,

    changePassword: PropTypes.func.isRequired,
    createMessage: PropTypes.func.isRequired
  }

  state = {
    old_pass: "",
    new_pass: "",
    new_pass2: ""
  }

  handleChange=(e)=>{
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  Submit=(e)=>{
    e.preventDefault();
    const {old_pass, new_pass, new_pass2} = this.state;

    if (new_pass !== new_pass2) {
      this.props.createMessage({action: "new_passwords are not the same !"})
    }
    else {
      this.props.changePassword(old_pass, new_pass);
    }

    
  }

  render() {
    if (!this.props.isAuthenticated) {
      return <Redirect to="/login" />
    }

    return (
    <div className='profile-class'>
      <h3>PROFILE : </h3>
      <span>username : {this.props.user.username}</span><br/>
      <span>email : {this.props.user.email}</span><br />

      <h3>Change password</h3>

      <form onSubmit={this.Submit} style={{width: "60vw"}}>
        <Grid container spacing={1} >
          
          <Grid item xs={4}>
            <span style={{float:"right"}} >Old_password: </span>
            </Grid>
          <Grid item xs={8}>
            <input name="old_pass" type="password" required
                  value={this.state.old_pass}
                  onChange={this.handleChange} /><br/>
            </Grid>

          <Grid item xs={4}>
            <span style={{float:"right"}} >New_password: </span>
            </Grid>
          <Grid item xs={8}>
            <input name="new_pass" type="password" required 
                  value={this.state.new_pass}
                  onChange={this.handleChange} /><br/>
            </Grid>

          <Grid item xs={4}>
            <span style={{float:"right"}} >New_pass again: </span>
            </Grid>
          <Grid item xs={8} >
            <input name="new_pass2" type="password" required
                  value={this.state.new_pass2}
                  onChange={this.handleChange} /><br/>
            </Grid>

          <Grid item xs={4}>
              <button className='button-class-1'  
              style={{float:"right", marginBottom:"10vw"}}
              >SUBMIT</button>
            </Grid>
          <Grid item xs={8} ></Grid>
        </Grid>
      </form>

    </div>
    )
  }
}

const mapStateToProps = state =>({
  isAuthenticated: state.authRD.isAuthenticated,
  user: state.authRD.user
})

export default connect(mapStateToProps,  {changePassword, createMessage})(Profile)