import React, { Component } from 'react';
import { connect } from 'react-redux';
import uuid from 'uuid';
import { dataURLtoBlob, updateObject } from '../../../../../shared/utility';
import * as actions from '../../../../../store/actions/index';

class mediaItem extends Component {
    state= {
        url: null
    };
    
  render() {
      let preview = null
      if (this.props.url) {
        preview = (
            <img src={this.props.url} alt="pics" className="site-form__itm--det__view-select--media__wrapper--preview "/>
        )
      }

    return (
        <div className="site-form__itm--det__view-select--media">
            <div className="site-form__itm--det__view-select--media__wrapper">
            { preview }
            </div>
        </div>
    );
  }
};


const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(null, mapDispatchToProps)(mediaItem);