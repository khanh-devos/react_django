import React, { Component } from 'react'
import { withAlert } from 'react-alert';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';



class Alerts extends Component {
    static propType = {
        error: PropTypes.object.isRequired,
        message: PropTypes.object.isRequired,
    }

    state = {
        showing: false,
        showTime: 3000,
        error: "",
        success: ""
    }

    closeAlert = ()=> this.setState({ 
        showing: false,
        error: "",
        success: "",
     });

    showError = (info)=>{
        this.setState({
            showing: true,
            error: info
        })

        setTimeout(this.closeAlert, 3000);
    }

    showSuccess = (info)=>{
        this.setState({
            showing: true,
            success: info
        })

        setTimeout(this.closeAlert, 3000);
    }

    

    componentDidUpdate(prevProps) {
        const { error, message } = this.props;
        const showError = this.showError;
        const showSuccess = this.showSuccess;

        if (error !== prevProps.error) {    
            error.msg.non_field_errors && showError(error.msg.non_field_errors.join())
            error.msg.username && showError(error.msg.username);
            error.msg.email && showError(error.msg.email);
            error.msg.detail && showError(error.msg.detail);

            //plotting graph
            error.msg.plottingErr && showError(error.msg.plottingErr);

            //For input new menu item
            error.msg.img && showError("Img field : " + error.msg.img);

            //check unique name of new item
            error.msg.name && showError(error.msg.name.join());
            
        }

        if (message !== prevProps.message) {    
            message.passwordNotMatch && this.showError(message.passwordNotMatch)
            message.action && showSuccess(message.action)

        }

        

    }
    
    
    render() {
        return (
        <>
        {
            this.state.showing ? 
            this.state.error !== "" ?
                <div className='alert-class-1'>{this.state.error}</div>
                :
                <div className='alert-class-2'>{this.state.success}</div>
            
            : 
            <></>
        }

        </>
        )
    }
}

const mapStateToProps = state => ({
    error: state.msgErrorRD,
    message: state.messageRD,
})

export default connect(mapStateToProps)(Alerts);
