import React, {Component} from 'react';
import PropTypes  from 'prop-types';
import {
    Image,
    View,
    TextInput,
} from 'react-native';

/**
 * 左边带图标的输入框 控件
 */
export class TextInputIcon extends Component {

    //属性注释及类型,所有的属性对象都是句柄模式（类型时number），类似C语言中的指针
    static propTypes = {
        icon:PropTypes.number,//输入框图标,图片
        /**
         * 输入框样式。
         */
        // inputRowStyle: PropTypes.object,
        /**
         * 图标框样式
         */
        iconFrameStyle: PropTypes.number,
        /**
         * 图标样式
         */
        iconStyle:PropTypes.number,
        /**
         * 输入样式
         */
        textInputStyle:PropTypes.number,

        onBlur:PropTypes.func,
    };


    render() {


        return (

            //style={this.props.inputStyles.inputRowStyle}
            <View {...this.props}
                  style={[{flexDirection:'row'},this.props.style]} >
                <View style={this.props.iconFrameStyle}>
                    <Image source={this.props.icon}
                           style={this.props.iconStyle} />
                </View>
                <TextInput
                    placeholder={this.props.placeholder}
                    style={[this.props.textInputStyle,{padding:0}]}
                    value={this.props.value}
                    keyboardType={this.props.keyboardType}
                    secureTextEntry={this.props.secureTextEntry}
                    onChangeText={this.props.onChangeText}
                    onBlur={this.props.onBlur}
                    underlineColorAndroid='rgba(0,0,0,0)'>

                </TextInput>

            </View>

        );
    }
}
