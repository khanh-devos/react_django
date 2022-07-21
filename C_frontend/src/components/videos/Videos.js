import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getVideos } from '../../actions/video';

import {Slider} from '@material-ui/core';
import Playing from './Playing';
// import { Grid, Input, Typography } from "@material-ui/core";



export class Videos extends Component {
  static propTypes = {
    videos: PropTypes.array.isRequired,
    getVideos: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,

  }

  componentDidMount = ()=>{
    this.props.getVideos();
  }



  render() {
    if (!this.props.isAuthenticated) {
      return <>Please login first</>
    }

    return (
      <div className='db-1-body'>
      <h2>DB server 1 was set slowly</h2>
      {
      this.props.videos.map(v => <div key={v.id}>
        
        {v.name}
        <Playing file={v.content} />
        

      </div>)

      }</div>
    )
  }
}

const mapStateToProps = (state) => ({
  videos: state.videoRD.videos,
  isAuthenticated: state.authRD.isAuthenticated,

})


export default connect(mapStateToProps, { getVideos } )(Videos);
//export default Videos;
