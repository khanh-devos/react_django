
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Grid} from "@material-ui/core";
import React, { Component } from 'react';

import { getMediumItem } from '../../../actions/mediumItem';
import ModalSelection from './ModalSelection';



class TypeShowing extends Component {
    constructor(props){
        super(props);
        
    }

    static propTypes = {
        mediumItem: PropTypes.object.isRequired,
        getMediumItem: PropTypes.func.isRequired,
    }


    handleMediumItem = (item)=>{
        //console.log(item);
        this.props.getMediumItem(item);
    }

    render(){
    const props = this.props;
    
    return (
    <div id={props.id} className="category-type-box">

        <div style={{textAlign:'left'}}>
        <label>{props.type.toUpperCase()} : </label>
        </div>

        <div className='menu-item-box'>
        {
            props.list.map( (item) => 
            <div key={item.id} className="item-self">
                
                <h3> {item.name} </h3>
                <div className='typeShowing-img-frame'>
                    <img src={item.img} className='menu-item-image'
                    width={'95%'} height={'80%'} />
                </div>
                
                {/* <button className='button-class-1' 
                        onClick={()=>this.handleMediumItem(item)} >Select</button> */}

                <ModalSelection item={item}
                    handleSelect={()=>this.handleMediumItem(item)} />
            </div>  
        )}
        
        </div>

        <button className="button-class-1" 
                style={{float:"right"}}
                onClick={this.props.moveToTop}
                >Top</button>
        
        <br/><br /><br/><hr />
    </div>
    )}
};

const mapStateToProps = state => ({
    mediumItem: state.mediumItemRD,
});

export default connect(mapStateToProps, { getMediumItem })(TypeShowing);