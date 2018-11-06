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
    Image
} from 'react-native';
import {
    StyleSheetAdapt,
    Theme,
    Tools,
} from "./../api/api";


/**
 * 左边具有竖杠 中间上部具有大文本紧挨着右边具有较小本 大文本下边有小文本
 * **/
export class TitleBlock extends Component {

    //属性注释及类型,所有的属性对象都是句柄模式（类型时number），类似C语言中的指针
    static propTypes = {
        frameStyle:PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.object,
            PropTypes.array
        ]),//框样式

        verticalBarStyle:PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.object,
            PropTypes.array
        ]),//竖杠样式
        textFrame:PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.object,
            PropTypes.array
        ]),//文本框样式
        textStyle:PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.object,
            PropTypes.array
        ]),//文本样式

        textTop:PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.string
        ]),//文本 上边
        textTopStyle:PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.object,
            PropTypes.array
        ]),//上边文本样式
        textDown:PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.string
        ]),//文本 下边
        textDownStyle:PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.object,
            PropTypes.array
        ]),//下边文本样式
        textCenter:PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.string
        ]),//文本 中间
        textCenterStyle:PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.object,
            PropTypes.array
        ]),//中间文本样式
        textRight:PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.string
        ]),//文本 右边
        icon:PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.string
        ]),
        isShowIconLeft:PropTypes.bool,//是否显示左边图标 默认true，显示

        color:PropTypes.string,//textCenter的文本颜色，竖杠颜色

        onPress:PropTypes.func,//点击事件

    }

    /**
     * 设置默认属性
     * **/
    static defaultProps = {
        isShowIconLeft:true,
    }

    constructor(props) {
        super(props);
    }

    render() {

        const {frameStyle,textDown,textCenter,textRight,isShowIconLeft,onPress,textDownStyle,
            verticalBarStyle,textFrame,textTop,textStyle,textTopStyle,textCenterStyle,color,icon} = this.props;

        return(
            <TouchableOpacity style={[styles.score_params_1_1,frameStyle]}
                              onPress={onPress}>
                {
                    /*isShowIconLeft&&<View style={[
                        styles.score_params_1_1_titleIco,
                        verticalBarStyle,color
                        &&
                        {
                            backgroundColor:color
                        }
                    ]}></View>*/
                }

                <View style={[styles.scpre_params_1_1_view,
                    color&&{borderLeftColor:color},
                    isShowIconLeft&&{}||{borderLeftWidth:0},
                    textFrame]}>
                    {
                        textTop&&<Text style={[styles.scpre_params_1_1_text,textStyle,textTopStyle]}>
                            {textTop}
                        </Text>
                    }
                    <Text style={[styles.scpre_params_1_1_text,textStyle]}>
                        <Text style={[styles.scpre_params_1_1_text_number,textCenterStyle,color&&{
                            color:color
                        }]}>
                            {textCenter}
                        </Text>
                        {textRight}
                    </Text>
                    <Text style={[styles.scpre_params_1_1_text,textStyle,textDownStyle]}>
                        {textDown}
                    </Text>

                </View>
                {icon&&<Image source={icon} style={styles.image}/>}
            </TouchableOpacity>
        );


    }
}

const styles = StyleSheetAdapt.create({
    score_params_1_1:{
        flexDirection:'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        flex:1,
        backgroundColor:Theme.Colors.foregroundColor,
        // borderColor: Theme.Colors.minorColor,
        // borderBottomWidth:Theme.Border.borderWidth,
    },
    image:{
        width:20,
        height:50,
        resizeMode:'center',
        marginLeft:20
    },
    score_params_1_1_titleIco:{
        marginLeft:30,
        width:3,
        height:70,
        backgroundColor:Theme.Colors.themeColor,
    },
    scpre_params_1_1_view:{
        borderLeftColor:Theme.Colors.themeColor,
        borderLeftWidth:Theme.Border.borderWidth2,
        marginLeft:15,
        padding:2,
        paddingLeft:10,
    },
    scpre_params_1_1_text:{
        color:Theme.Colors.minorColor,
        fontSize:Theme.Font.fontSize_1,
    },
    scpre_params_1_1_text_number:{
        color:Theme.Colors.themeColor,
        fontSize:Theme.Font.fontSize3,
    },
});