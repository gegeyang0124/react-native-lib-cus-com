import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
    View,
    Text,
    TouchableOpacity,
} from 'react-native';

import {
    StyleSheetAdapt,
    Theme,
    Tools
} from "./../api/api";
import {ButtonChange} from "./ButtonChange";

/**
 * 行单元格，一行内可支持1到7个单元格，可组合成表格。
 * **/
export class ItemRowGuideTripApply extends Component {

    //属性注释及类型,所有的属性对象都是句柄模式（类型时number），类似C语言中的指针
    static propTypes = {
        frameStyle:PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.object,
            PropTypes.array
            //React.PropTypes.instanceOf(Message)
        ]),//外部框样式
        frameStyleChild:PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.object,
            PropTypes.array
            //React.PropTypes.instanceOf(Message)
        ]),//子框样式
        text1:PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.object,
            PropTypes.number,
            PropTypes.bool //控制此UI是否显示
        ]),//显示文本,从左至右第一个
        text1Style:PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.object,
            PropTypes.array
            //React.PropTypes.instanceOf(Message)
        ]),//文本样式 从左至右第一个
        onPress1:PropTypes.func,//点击事件 从左至右第1个
        text2:PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.object,
            PropTypes.number,
            PropTypes.bool //控制此UI是否显示
        ]),//显示文本,从左至右第二个
        text2Style:PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.object,
            PropTypes.array
            //React.PropTypes.instanceOf(Message)
        ]),//文本样式 从左至右第2个
        text3:PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.object,
            PropTypes.number,
            PropTypes.bool //控制此UI是否显示
        ]),//显示文本,从左至右第三个
        text4:PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.object,
            PropTypes.number,
            PropTypes.bool //控制此UI是否显示
        ]),//显示文本,从左至右第4个
        text5:PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number,
            PropTypes.object,
            PropTypes.bool //控制此UI是否显示
        ]),//显示文本,从左至右第5个
        text6:PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.object,
            PropTypes.number,
            PropTypes.bool //控制此UI是否显示
        ]),//显示文本,从左至右第6个
        text6Style:PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.object,
            PropTypes.array
            //React.PropTypes.instanceOf(Message)
        ]),//文本样式 从左至右第6个
        frameChild6Style:PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.object,
            PropTypes.array
            //React.PropTypes.instanceOf(Message)
        ]),//文本框样式 从左至右第6个
        text7:PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number,
            PropTypes.object,
            PropTypes.bool //控制此UI是否显示
        ]),//显示文本,从左至右第7个
        text7Style:PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.object,
            PropTypes.array
            //React.PropTypes.instanceOf(Message)
        ]),//文本样式 从左至右第7个
        onPress7:PropTypes.func,//点击事件 从左至右第7个
        onPress:PropTypes.func,//点击事件 从左至右第7个 (为支持老板暂时不废弃)
        textStyle:PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.object,
            PropTypes.array
            //React.PropTypes.instanceOf(Message)
        ]),//文本样式

    }


    constructor(props) {
        super(props);
    }

    render() {
        const {frameStyle,text1,text2,text3,text4,text5,text6,text7,textStyle,
            onPress,frameStyleChild,text1Style,text2Style,text7Style,onPress1,
            onPress7,text6Style,frameChild6Style} = this.props;

        return (
            <View style={[styles.titleFrame1_1,frameStyle]}>
                {
                    (typeof(text1) == 'string'
                        || typeof(text1) == 'number'
                        || (typeof(text1) == 'boolean' && text1 == true))
                        ?  <TouchableOpacity style={[styles.titleFrame1_1_1,frameStyleChild]}
                                             onPress={onPress1}>
                            <Text style={[styles.itemRowText,textStyle,text1Style]}>
                                {text1}
                            </Text>
                        </TouchableOpacity>
                        : typeof(text1) == 'object'
                        ? text1
                        : null
                }

                {
                    (typeof(text2) == 'string'
                        || typeof(text2) == 'number'
                        || (typeof(text2) == 'boolean' && text3 == true))
                        ? <View style={[styles.titleFrame1_1_1,frameStyleChild]}>
                            <Text style={[styles.itemRowText,textStyle,text2Style]}>
                                {text2}
                            </Text>
                        </View>
                        : typeof(text2) == 'object'
                        ? text2
                        : null
                }

                {
                    (typeof(text3) == 'string'
                        || typeof(text3) == 'number'
                        || (typeof(text3) == 'boolean' && text3 == true))
                        ? <View style={[styles.titleFrame1_1_1,styles.titleFrame1_1_3,frameStyleChild]}>
                            <Text style={[styles.itemRowText,textStyle]}>
                                {text3}
                            </Text>
                        </View>
                        : typeof(text3) == 'object'
                        ? text3
                        : null
                }

                {
                    (typeof(text4) == 'string'
                        || typeof(text4) == 'number'
                        || (typeof(text4) == 'boolean' && text4 == true))
                        ? <View style={[styles.titleFrame1_1_1,
                            styles.titleFrame1_1_4,
                            frameStyleChild]}>
                            <Text style={[styles.itemRowText,textStyle]}>
                                {text4}
                            </Text>
                        </View>
                        : typeof(text4) == 'object'
                        ? text4
                        : null
                }

                {
                    (typeof(text5) == 'string'
                        || typeof(text5) == 'number'
                        || (typeof(text5) == 'boolean' && text5 == true))
                        ? <View style={[styles.titleFrame1_1_1,styles.titleFrame1_1_4,frameStyleChild]}>
                            <Text style={[styles.itemRowText,textStyle]}>
                                {text5}
                            </Text>
                        </View>
                        : typeof(text5) == 'object'
                        ? text5
                        : null
                }

                {
                    (typeof(text6) == 'string'
                        || typeof(text6) == 'number'
                        || (typeof(text6) == 'boolean' && text6 == true))
                        ? <View style={[styles.titleFrame1_1_1,styles.titleFrame1_1_6,frameStyleChild,frameChild6Style]}>
                            {
                                onPress == undefined ?
                                    <Text style={[styles.itemRowText,textStyle,text6Style]}>
                                        {text6 == null ? '--' : text6}
                                    </Text> :
                                    <Text style={[styles.itemRowBtnText,textStyle,text6Style]}>
                                        {text6 == null ? '--' : text6}
                                    </Text>
                            }
                        </View>
                        : typeof(text6) == 'object'
                        ? text6
                        : null
                }

                {
                    (typeof(text7) == 'string'
                        || typeof(text7) == 'number'
                        || (typeof(text7) == 'boolean' && text7 == true))
                        ? <TouchableOpacity style={[styles.titleFrame1_1_1,styles.titleFrame1_1_7,frameStyleChild]}
                                            onPress={onPress7}>
                            {
                                onPress == undefined ?
                                    <Text style={[styles.itemRowText,textStyle,text7Style]}>
                                        {text7}
                                    </Text> :
                                    <ButtonChange text={text7}
                                                  onPress={onPress}
                                                  style={styles.itemRowBtnFrame}
                                                  textStyle={[styles.itemRowBtnText,textStyle]}/>
                            }

                        </TouchableOpacity>
                        : typeof(text7) == 'object'
                        ? text7
                        : null
                }

            </View>
        );
    }
}

const styles = StyleSheetAdapt.create({
    titleFrame1_1:{
        // flex:1,
        flexDirection:'row',
    },
    titleFrame1_1_1:{
        flex:1.3,
        alignItems:'center',
        justifyContent:'center',
        borderColor:Theme.Colors.minorColor,
        borderBottomWidth:Theme.Border.borderWidth,
        borderRightWidth:Theme.Border.borderWidth,
        padding:10,
    },
    titleFrame1_1_3:{
        flex:2.1,
    },
    titleFrame1_1_4:{
        flex:1.6,
    },
    titleFrame1_1_6:{
        flex:1,
    },
    titleFrame1_1_7:{
        flex:0.9,
    },
    itemRowText:{
        fontSize:Theme.Font.fontSize_1_1,
        color:Theme.Colors.minorColor,
    },
    itemRowBtnFrame:{
        backgroundColor:Theme.Colors.transparent,
    },
    itemRowBtnText:{
        fontSize:Theme.Font.fontSize_1_1,
        color:Theme.Colors.themeColor,
    },


});