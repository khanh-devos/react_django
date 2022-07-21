import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getDoubleDBVideo } from '../../actions/video';

import Playing from './Playing';
// import { Grid, Input, Typography } from "@material-ui/core";



export class DoubleDB extends Component {
  static propTypes = {
    videosDB: PropTypes.array.isRequired,
    getDoubleDBVideo: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,

  }

  componentDidMount = ()=>{
    this.props.getDoubleDBVideo();
  }



  render() {
    if (!this.props.isAuthenticated) {
      return <>Please login first</>
    }

    return (
      <div className='double-DB-body'>
      <h2>2 DB servers with same content, 1 is slow 1 is fast</h2>
      {
      this.props.videosDB.map(v => <div key={v.id}>
        
        {v.name}
        <Playing file={v.content} />
        

      </div>)

      }</div>
    )
  }
}

const mapStateToProps = (state) => ({
  videosDB: state.videoDoubleDBRD.videosDB,
  isAuthenticated: state.authRD.isAuthenticated,

})


export default connect(mapStateToProps, { getDoubleDBVideo } )(DoubleDB);
//export default Videos;
