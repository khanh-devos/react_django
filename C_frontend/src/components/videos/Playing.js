import * as React from 'react';
import { Box, Button, Modal } from '@material-ui/core';



const style = {
  position: 'absolute',
  top: '50%',
  left: '40%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,

};

export class Playing extends React.Component {
  constructor(props){
    super(props);
    this.state = { open: false };
  }

  handleOpen = () => {
    this.setState({open: true});
    //this.props.handleSelect();
    
  }
  
  handleClose = () => this.setState({open: false});


  render(){

  const file = this.props.file;
  //Add id into fields to avoid React rules:

  return (
    <div>
      <button className='button-class-1' 
              onClick={this.handleOpen}>Play</button>
      
      <Modal open={this.state.open}  
             onClose={this.handleClose}>
        <Box sx={style} id="Video-Box">
            
            <video width="500vw" height="300vw" controls >
                <source src={file} type="video/mp4" />
                Your browser does not support the video tag.
            </video>

        </Box>
      </Modal>

    </div>
  )}
}



export default Playing;