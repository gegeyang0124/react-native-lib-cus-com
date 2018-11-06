'use strict';
import PropTypes  from 'prop-types';
import {Dimensions} from "react-native";
var React = require('react');
var ReactNative = require('react-native');
var Button = require('./button');
var FadeInView = require('./fade_in_view');
var { Modal, StyleSheet, TouchableOpacity, View } = ReactNative;

/*var ActionModal = React.createClass({
  render: function() {
    return (
      <FadeInView visible={this.props.modalVisible} backgroundColor={this.props.backgroundColor}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.props.modalVisible}
          onRequestClose={this.props.onCancel}>
          <View style={styles.modalContainer}>
            <TouchableOpacity style={styles.container} onPress={this.props.onCancel}></TouchableOpacity>
            {this.props.children}
            <Button onPress={this.props.onCancel} text={this.props.buttonText || "Cancel"} />
          </View>
        </Modal>
      </FadeInView>
    );
  }
});*/

class ActionModal extends React.Component{

//属性注释及类型,所有的属性对象都是句柄模式（类型时number），类似C语言中的指针
    static propTypes = {
        frameStyle:PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.object,
            PropTypes.array
        ]),//按钮框样式
    }

    render() {

        const {frameStyle} = this.props;

        return (
            <FadeInView visible={this.props.modalVisible}
                        backgroundColor={this.props.backgroundColor}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.props.modalVisible}
                    onRequestClose={this.props.onCancel}>
                    <View style={styles.modalContainer}>
                        <TouchableOpacity style={styles.container}
                                          onPress={this.props.onCancel}></TouchableOpacity>
                        <View style={[styles.frameStyle,frameStyle]}>
                            {this.props.children}
                        </View>
                        <Button onPress={this.props.onCancel}
                                text={this.props.buttonText || "Cancel"} />
                    </View>
                </Modal>
            </FadeInView>
        );
    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1
    },
    modalContainer: {
        flex: 1,
        // padding: 8,
        paddingBottom: 0,
        justifyContent: "flex-end"
    },
    frameStyle:{
        height: ReactNative.Dimensions.get('window').height * 0.3,
    }
});

module.exports = ActionModal;
