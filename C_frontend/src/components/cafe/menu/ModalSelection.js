import * as React from 'react';
import { Box, Button, Modal } from '@material-ui/core';
import ItemSet from './ItemSet';



const style = {
  position: 'absolute',
  top: '0vw',
  left: "0vw",
  transform: 'translate(5vw, 1vw)',
  
  bgcolor: 'background.paper',
  border: '0.1vw solid #000',
  borderRadius: "1vw",
  boxShadow: 24,
  p: 4,

};

export class ModalSelection extends React.Component {
  constructor(props){
    super(props);
    this.state = { open: false };
  }

  handleOpen = () => {
    this.setState({open: true});
    this.props.handleSelect();
  }
  
  handleClose = () => this.setState({open: false});

  render(){
  const item = this.props.item;
  //Add id into fields to avoid React rules:

  return (
    <div>
      <button className='button-class-1 item-select-button' 
              onClick={this.handleOpen}>Select</button>
      
      <Modal open={this.state.open}  
             onClose={this.handleClose}>
        <Box sx={style} className='modal-container'>
            
            <ItemSet item={item} handleClose={this.handleClose} />

        </Box>
      </Modal>

    </div>
  )}
}



export default ModalSelection;