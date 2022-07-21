import React, { Component } from 'react';
import { Link, Redirect, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';

const MyNavLink = (props)=>(
<NavLink to={props.TO} 
         exact activeStyle={{color:'darkgreen', 
                            fontWeight:'bold', 
                            fontFamily:"revert"}} 
         style={{marginRight:"1vw"}} >{props.URL}
</NavLink>
)

export class Headers extends Component {
  static propTypes = {
    authRD: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired,
  }

  handleLogout= ()=>{
    this.props.logout();
    
  }

  render() {

    const registerLoginLink = (<>
      <MyNavLink TO="/login" URL="login" />
      <MyNavLink TO="/register" URL="register" />
      
    </>)

    const LogoutLink = (<>
      <MyNavLink TO="/sales" URL="salesOrders" />
      <MyNavLink TO="/newItem" URL="New Item" />
      <MyNavLink TO="/video" URL="single-DB" />
      <MyNavLink TO="/double" URL="double-DB" />

      <button style={{marginRight:"1vw"}}
            onClick={()=> this.handleLogout()}>logout</button>
    </>)


    //----------------------------------//
    //-----------RETURN HERE------------//
    return (<div className='header-links-box'>
      <div>
        <div className="strong-label">
          
          {
            this.props.authRD.isAuthenticated ?  
                <div className="profile-container">
                  
                  <div className='profile-class-1'>
                    <MyNavLink TO="/profile" URL="Profile" />
                  </div>

                  <div className="profile-class-2"
                      >Hello {this.props.authRD.user.username}
                  </div>
                </div>
                :
                <></>
          }
        </div>
      </div>

      <h2 className="strong-label">CAFE STORE MANAGEMENT </h2>

      <MyNavLink TO="/" URL="DashBoard" />
      {
        this.props.authRD.isAuthenticated ?
          LogoutLink : registerLoginLink
      }
      
      
    </div>)
  }
}

const mapStateToProps = state=> ({
  authRD: state.authRD
})

export default connect(mapStateToProps, { logout })(Headers);
