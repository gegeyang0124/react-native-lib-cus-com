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
} from "../api";

const RN = require('react-native');
const Img = RN.Image;

/**
 * 左边带图标的文本 控件
 */
export class TextIcon extends Component {

    //属性注释及类型,所有的属性对象都是句柄模式（类型时number），类似C语言中的指针
    static propTypes = {
        frameStyle:PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.object,
            PropTypes.array
        ]),//按钮框样式
        icon:PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.string,
            PropTypes.object
        ]),//输入框图标,图片
        /**
         * 图标样式
         */
        iconStyle: PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.object,
            PropTypes.array
        ]),//图片样式,
        /**
         * 显示文本。
         */
        text: PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.string
        ]),
        /**
         * 文本样式样式
         */
        textStyle: PropTypes.oneOfType([
            PropTypes.object,
            PropTypes.number,
            PropTypes.array
        ]),
        /**
         * 文本框样式
         */
        textFrameStyle: PropTypes.oneOfType([
            PropTypes.object,
            PropTypes.number,
            PropTypes.array
        ]),
        iconToast:PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number,
        ]),//提示图片
        textToast:PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number,
        ]),//提示文本
        onPressImage:PropTypes.func,//图片点击事件
        onPress:PropTypes.func,//点击事件 传入此事件 其他事件无效
        onPressText:PropTypes.func,//文本点击事件
    };


    getPressDisabled(){
        const {onPressImage,onPressText,onPress} = this.props;

        let obj = {
            isOnPress:onPress ? false : true,
            isOnPressImage:true,
            isOnPressText:true
        };

        if(obj.isOnPress){
            obj.isOnPressImage =  onPressImage
                ? false
                : true;
            obj.isOnPressText = onPressText
                ? false
                : true;
        }
        return obj;
    }

    setIcon = (e) => {
        // console.info("e.nativeEvent",e.nativeEvent)
        // this.setState(e.nativeEvent);

        let ly = e.nativeEvent.layout;

        this.iconViewRef&&this.iconViewRef.setNativeProps({
            style:[
                styles.imgFrame,
                {
                    width:ly.width,
                    height:ly.height
                }
            ]
        });

        // this.iconViewRef.setNativeProps({style:[styles.imgFrame]});
    }

    getImg(iconToast){
        if(typeof iconToast == 'string'){
            iconToast = {uri:iconToast};
        }
        return iconToast;
    }

    render() {

        const {onPressImage,onPressText,text,onPress,textStyle,
            frameStyle,textFrameStyle,textToast,iconToast} = this.props;

        const presCan = this.getPressDisabled();

        return (

            <TouchableOpacity style={[
                styles.frameStyle,
                this.props.style,
                frameStyle
            ]}
                              disabled={presCan.isOnPress}
                              onPress={()=>{
                                  onPress&&onPress();
                              }}
                              onLayout={this.setIcon}>

                {
                    (textToast||iconToast)&&<View style={styles.imgFrame}
                                                  ref={c=>this.iconViewRef=c}>
                        <Img
                            style={[
                                styles.imgIcon
                            ]}
                            source={this.getImg(iconToast)}
                        />
                        <Text style={styles.textIcon}>
                            {textToast}
                        </Text>
                    </View>
                }



                <TouchableOpacity onPress={()=>{
                    onPressImage&&onPressImage();
                }}
                                  disabled={presCan.isOnPressImage}>
                    <Img style={[
                        {resizeMode: Img.resizeMode.contain},
                        this.props.iconStyle
                    ]}
                         source={this.getImg(this.props.icon)}/>
                </TouchableOpacity>

                {
                    text == undefined ?
                        null :
                        <TouchableOpacity onPress={()=>{
                            onPressText&&onPressText();
                        }}
                                          disabled={presCan.isOnPressText}
                                          style={textFrameStyle}>
                            <Text style={[styles.textStyle,textStyle]}>
                                {text}
                            </Text>
                        </TouchableOpacity>
                }



            </TouchableOpacity>
        );
    }
}

const styles = StyleSheetAdapt.create({
    textStyle:{
        fontSize:20,
    },
    frameStyle:{
        flexDirection: 'row',
        // backgroundColor:'blue',
        // alignItems:'center',
        // justifyContent:'center',
    },

    imgIcon:{
        width:50,
        height:50,
        resizeMode: Img.resizeMode.contain,
        // position: "absolute",
    },
    imgFrame:{
        alignItems:'flex-end',
        zIndex: -10, //z轴方向的层级，越大越在顶部
        position: "absolute",
    },
    textIcon:{
        // position: "absolute",
        marginRight:16,
        marginTop:-29,
        color:Theme.Colors.foregroundColor,
    },
});
