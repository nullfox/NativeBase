/* @flow */
'use strict';

import React from 'react';
import {View, Image, ScrollView} from 'react-native';
import ViewNB from './View';
import Header from './Header';
import Content from './Content';
import Footer from './Footer';
import Fab from './Fab';
import NativeBaseComponent from '../Base/NativeBaseComponent';
import _ from 'lodash';
import computeProps from '../../Utils/computeProps';

export default class Container extends NativeBaseComponent {

  propTypes: {
        style : React.PropTypes.object
    }

  checkComponentRole(component, role) {
		return component.props && component.props.role && component.props.role === role;
	}

  renderHeader() {
    if(Array.isArray(this.props.children)) {
      return _.find(this.props.children, function(item) {
        if(item && (item.type == Header || this.checkComponentRole(item, 'header'))) {
          return true;
        }
      });
    }

    else {
      if(this.props.children && (this.props.children.type == Header || this.checkComponentRole(this.props.children, 'header'))) {
        return this.props.children;
      }
    }
  }
  renderContent() {
    if(Array.isArray(this.props.children)) {

      return _.filter(this.props.children, function(item) {
        if(item && (item.type == ViewNB || item.type == Content || item.type == Image || item.type == View || item.type == ScrollView || item.type == Fab )) {

          return true;
        }
      });
    }

    else {
      if(this.props.children && (this.props.children.type == Content || this.props.children.type == ViewNB || this.props.children.type == View || this.props.children.type == Image || this.props.children.type == ScrollView)) {
        return this.props.children;
      }
    }
  }
  renderFooter() {
    if(Array.isArray(this.props.children)) {
      return _.find(this.props.children, function(item) {
        if(item && item.type == Footer) {
          return true;
        }
      });
    }

    else {
      if(this.props.children && this.props.children.type == Footer) {
        return this.props.children;
      }
    }
  }
  prepareRootProps() {

    var type = {
      flex: 1
    }

    var defaultProps = {
      style: type
    }

    return computeProps(this.props, defaultProps);
  }
  render() {
    return(
      <View ref={c => this._root = c} {...this.prepareRootProps()}>

        {this.renderHeader()}

        {this.renderContent()}

        {this.renderFooter()}

      </View>
    );

  }

}
