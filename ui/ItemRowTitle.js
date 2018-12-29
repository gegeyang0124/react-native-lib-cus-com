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
    Image,
} from 'react-native';
import {
    StyleSheetAdapt,
    Theme,
} from "./../api/api";
import {ButtonChange} from "./ButtonChange";

/**
 * 左边具有标题的提示的UI 右边具有标识或UI的 UI控件
 * **/
export class ItemRowTitle extends Component {

    //属性注释及类型,所有的属性对象都是句柄模式（类型时number），类似C语言中的指针
    static propTypes = {
        frameStyle:PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.object,
            PropTypes.array
        ]),//框样式
        btnStyle:PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.object,
            PropTypes.array
        ]),//按钮框样式
        text1:PropTypes.string,//按钮文字 左边
        text2:PropTypes.string,//按钮文字 右边
        textStyle:PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.object,
            PropTypes.array
        ]),//文本样式
        text2Style:PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.object,
            PropTypes.array
        ]),//文本2样式
        viewLeft:PropTypes.object,//左边附加ui
        viewRight:PropTypes.object,//右边边附加ui
        onPressRight:PropTypes.func,//右边事件
        isShowPillar:PropTypes.bool,//是否显示竖杠,默认true 显示
        isShowIcon:PropTypes.bool,//是否显示箭头logo,默认false 不显示

        onPress:PropTypes.func,//点击事件
    }



    /**
     * 设置默认属性
     * **/
    static defaultProps = {
        isShowPillar:true,
        isShowIcon:false
    }



    render() {

        const {frameStyle,text1,textStyle,viewLeft,btnStyle,viewRight,
            text2,onPressRight,text2Style,isShowPillar,onPress,isShowIcon} = this.props;

        return(
            <TouchableOpacity style={[styles.frameStyle,frameStyle]}
                              onPress={onPress}
                              disabled={onPress?false:true}>
                <View style={[styles.frameStyle_1,styles.titlesInfoFrame1_1_1]}>
                    {
                        isShowPillar
                            ? <View style={styles.titlesInfoFrame1_1_1_1}></View>
                            : null
                    }

                    {
                        typeof(text1) == 'string' && viewLeft == undefined
                            ?  <Text style={[styles.titlesInfoFrame1_1_1_1_Text,{marginLeft:isShowPillar ? 20 : 0},textStyle]}>
                                {
                                    text1
                                }
                            </Text>
                            : typeof(viewLeft) == 'object'
                            ? viewLeft
                            : null
                    }

                </View>

                {
                    (text2 != undefined || viewRight != undefined) &&
                    <View style={[styles.frameStyle_2]}>
                        {
                            // typeof(viewRight) == 'string' || viewRight == undefined
                            (typeof(text2) == 'string' || typeof(text2) == 'number') && viewRight == undefined
                                ? <ButtonChange text={text2}
                                                style={styles.btnStyle}
                                                onPress={onPressRight}
                                                frameStyle={[styles.frameStyleBtn,btnStyle]}
                                                textStyle={text2Style}/>
                                : typeof(viewRight) == 'object'
                                ? viewRight
                                : null
                        }

                    </View>
                }

                {
                    isShowIcon
                    && <View style={styles.versionRowFrame}>
                        <Image source={require('images/rightBlack.png')}
                               style={[styles.versionRowIcon]}></Image>
                    </View>
                }

            </TouchableOpacity>
        );


    }
}

const styles = StyleSheetAdapt.create({
    versionRowFrame:{
        justifyContent:'center',
        alignItems: 'center',
    },
    versionRowIcon:{
        width:20,
        height:20,
        resizeMode:"contain",
        marginRight:20,
    },

    frameStyle:{
        flexDirection:'row',
    },
    frameStyle_1:{
        flex:1,
    },
    frameStyle_2:{
        flex:1,
        alignItems: 'flex-end',
        justifyContent:'center',


    },
    frameStyleBtnFrame:{
        justifyContent:'center',
        alignItems: 'center',
    },
    frameStyleBtn:{
        width:130,
        marginRight:10,
        justifyContent:'center',
        alignItems: 'center',

    },
    btnStyle:{
        padding:5,
    },

    titlesInfoFrame1_1_1:{
        margin:10,
        flexDirection:'row',
        // alignItems:'center',
        // paddingBottom:10,
        // borderBottomWidth:1,
        // borderBottomColor:Theme.Colors.themeColor,
    },
    titlesInfoFrame1_1_1_1_Text:{
        fontSize:Theme.Font.fontSize,
        // marginLeft:20,
    },
    titlesInfoFrame1_1_1_1:{
        width:5,
        // height:30,
        backgroundColor:Theme.Colors.themeColor,
    },
});