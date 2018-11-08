/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow TextInput自动提示输入
 */

import React, {Component} from 'react';
import PropTypes  from 'prop-types';
import {
    Image,
    TouchableOpacity,
} from 'react-native';
import {
    Tools,
    StyleSheetAdapt,
    Theme,
} from "../api/api";
import {TextChange} from "./TextChange";

/**
 * 图片按钮
 * **/
export class ButtonImage extends Component {

    //属性注释及类型,所有的属性对象都是句柄模式（类型时number），类似C语言中的指针
    static propTypes = {
        frameStyle:PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.object,
            PropTypes.array,
            //React.PropTypes.instanceOf(Message)
        ]),//框样式
        style:PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.object,
            PropTypes.array,
            //React.PropTypes.instanceOf(Message)
        ]),//框样式
        icon:PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.string,
            PropTypes.object
            //React.PropTypes.instanceOf(Message)
        ]),//图片
        iconStyle:PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.object,
            PropTypes.array,
            //React.PropTypes.instanceOf(Message)
        ]),//图标样式
        isDel:PropTypes.bool,//是否显示logo，默认是false，不显示
        onPressDel:PropTypes.func,//删除事件按钮
        onPress:PropTypes.func,//点击事件
        onLongPress:PropTypes.func,//长按事件
    }

    /**
     * 设置默认属性
     * **/
    static defaultProps = {
        style:{
            width:StyleSheetAdapt.getWidth(50),
            height:StyleSheetAdapt.getHeight(50),
        },
        isDel:false,
    }

    styles = {};
    getStyle()
    {
        this.styles = Tools.getStyle(this.props.style);
        // Tools.toast("s: " + JSON.stringify(this.props.iconStyle))
        return this.styles;
    }

    getIcon(){
        const {icon} = this.props;
        let img = icon;
        if(typeof icon == 'number'){
            img = icon;
        }
        else if(typeof icon == 'string'){
            img = {uri:icon};
        }

        return img;
    }

    render() {

        const {isDel,iconStyle,style,onPressDel,frameStyle} = this.props;

        return (

            <TouchableOpacity {...this.props}
                              delayLongPress={500}
                              delayPressIn={0}
                              delayPressOut={0}
                              style={[styles.frameStyle,style,frameStyle]}
                // activeOpacity={0.85}
                              activeOpacity={0}>
                {
                    isDel
                        ? <TextChange text={"X"}
                                      textStyle={styles.del}
                                      onPress={()=>{
                                          onPressDel&&onPressDel();
                                      }}
                                      style={styles.delFrame}/>
                        : null
                }


                <Image source={this.getIcon()}
                       style={[
                           styles.iconStyle,
                           {width:this.getStyle().width,height:this.styles.height},
                           iconStyle
                       ]}/>



            </TouchableOpacity>
        );
    }
}

const styles = StyleSheetAdapt.create({
    frameStyle:{
        zIndex:1,
    },

    iconStyle:{
        resizeMode: Image.resizeMode.contain,
        // resizeMode:"contain",
    },

    del:{
        color:Theme.Colors.themeColor,
        fontSize:Theme.Font.fontSize2,
        // backgroundColor:"blue",
        paddingLeft:10,
        paddingRight:10,
        zIndex:999,
    },
    delFrame:{
        // backgroundColor:"yellow",
        position:'absolute',
        zIndex:999,
        top:0,
        right:-10,
    },
});