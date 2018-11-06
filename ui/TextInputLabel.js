import React, {Component} from 'react';
import PropTypes  from 'prop-types';
import {
    View,
    TextInput,
    Text,
} from 'react-native';
import {
    StyleSheetAdapt,
    Theme,
} from './../api/api';

/**
 * 带文字label 的输入框的输入框 控件
 */
export class TextInputLabel extends Component {

    //属性注释及类型,所有的属性对象都是句柄模式（类型时number），类似C语言中的指针
    static propTypes = {
        frameStyle:PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.object,
            PropTypes.array
        ]),//外部框样式
        textLabel:PropTypes.string,//标识文本
        textLabelStyle:PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.object,
            PropTypes.array
        ]),//标识文本样式
        textLabelFrameStyle:PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.object,
            PropTypes.array
        ]),//标识文本框样式
        textInputProps:PropTypes.object,//输入框属性 TextInput的各种属性 json
        textInputFrameStyle:PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.object,
            PropTypes.array
        ]),//输入框外框样式

        viewUI:PropTypes.element,//下边/右边UI
        labelUI:PropTypes.element,//上边/左边UI
    };

    /**
     * 设置默认属性
     * **/
    static defaultProps = {
    };


    render() {

        const {frameStyle,textLabel,textLabelStyle,textInputProps,
            textLabelFrameStyle,textInputFrameStyle,viewUI,labelUI} = this.props;

        return (

            //style={this.props.inputStyles.inputRowStyle}
            <View style={frameStyle} >

                <View style={[styles.textFrame,textLabelFrameStyle]}>
                    {
                        labelUI && labelUI
                        ||  <Text style={[styles.textLabelStyle,textLabelStyle]}>
                            {textLabel}
                        </Text>
                    }

                </View>

                <View style={[styles.textFrame,textInputFrameStyle]}>
                    {
                        viewUI&&viewUI
                        || <TextInput {...textInputProps}
                                      multiline = {
                                          textInputProps
                                              ? textInputProps.multiline !== undefined
                                              ? textInputProps.multiline
                                              : true
                                              : true
                                      }
                                      style={[styles.textInputStyle,textInputProps ? textInputProps.style : {}]}
                                      underlineColorAndroid='rgba(0,0,0,0)'/>

                    }

                </View>

            </View>

        );
    }
}

const styles = StyleSheetAdapt.create({
    textInputStyle:{
        borderColor:Theme.Colors.minorColor,
        borderWidth:Theme.Border.borderWidth,
        width:'0.9w',
        height:200,
        borderRadius:Theme.Border.borderRadius,
        fontSize:Theme.Font.fontSize_1,
        padding:5,
    },
    textLabelStyle:{
        fontSize:Theme.Font.fontSize
    },
    textFrame:{
        margin:10,
    },
});