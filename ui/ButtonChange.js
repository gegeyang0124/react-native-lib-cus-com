/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow TextInput自动提示输入
 */

import React, {Component} from 'react';
import PropTypes  from 'prop-types';
import {
    View,
    Text,
    TouchableOpacity,
    TouchableHighlight,
} from 'react-native';
import {StyleSheetAdapt} from "./../api/StyleSheetAdapt";
import {Theme} from "./../api/Theme";

export class ButtonChange extends Component {

    //属性注释及类型,所有的属性对象都是句柄模式（类型时number），类似C语言中的指针
    static propTypes = {
        frameStyle:PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.object,
            PropTypes.array
        ]),//框样式
        frameBtnStyle:PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.object,
            PropTypes.array
        ]),//按钮框样式
        text:PropTypes.string,//按钮文字
        textStyle:PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.object,
            PropTypes.array
        ]),//文本样式
        type:PropTypes.string,//按扭类型
        style:PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.object,
            PropTypes.array
        ]),//按钮样式
        onPress:PropTypes.func,//点击事件
    }

    TYPE = {
        opacity:"opacity",//显示隐藏
        light:'light'
    }

    /**
     * 设置默认属性
     * **/
    static defaultProps = {
        type:"opacity"
    }



    render() {

        const {frameStyle,type,text,textStyle,style,onPress,frameBtnStyle} = this.props;

        if(type == this.TYPE.opacity)
        {
            return (
                <View style={frameStyle}>
                    <TouchableOpacity {...this.props}
                                      style={[styles.btnFrame,style,frameBtnStyle]}
                                      onPress={()=>{
                                          if(onPress != undefined)
                                          {
                                              onPress();
                                          }
                                      }}
                                      delayLongPress={500}
                                      delayPressIn={0}
                                      delayPressOut={0}
                                      activeOpacity={0}
                    >
                        <Text style={[styles.btnText,textStyle]}>
                            {text}
                        </Text>
                    </TouchableOpacity>
                </View>
            );
        }
        else
        {
            return (
                <View style={frameStyle}>
                    <TouchableHighlight {...this.props}
                                        style={[styles.btnFrame,style]}
                                        onPress={()=>{
                                            if(onPress != undefined)
                                            {
                                                onPress();
                                            }
                                        }}
                                        underlayColor={Theme.Colors.activeBtnColor}
                                        delayLongPress={500}
                                        delayPressIn={0}
                                        delayPressOut={0}
                                        activeOpacity={0}>
                        <Text style={[styles.btnText,textStyle]}>
                            {text}
                        </Text>
                    </TouchableHighlight>
                </View>
            );
        }


    }
}

const styles = StyleSheetAdapt.create({
    btnFrame:{
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:Theme.Colors.themeColor,
        borderRadius:5,
        padding:10,
    },
    btnText:{
        color:Theme.Colors.colorFontBtn,
        fontSize:Theme.Font.fontSize,
    },
});