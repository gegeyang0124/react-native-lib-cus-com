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
    Tools,
} from './../api/api'
import {ImageBg} from "./ImageBg";

import {
    Circle,//修改了Circle的formatText 使其可以传入自定义UI
} from 'react-native-progress-cus';

const RN = require('react-native');
const Img = RN.Image;

/**
 *  圆进程,可以放底图 中间可放进度百分比、其他文本、 控件
 */
export class TextIconBg extends Component {

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
        isInner:PropTypes.bool,//是否加载条在图片内，true：是，false：不是，加载条在外部（即，加载条包裹图片）默认是true
        size:PropTypes.number,//UI大小
        /**
         * 图标样式
         */
        iconStyle: PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.object,
            PropTypes.array
        ]),//图片样式

        /**
         * 图标框样式
         */
        iconFrameStyle: PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.object,
            PropTypes.array
        ]),//图片样式
        /**
         * 显示文本。
         */
        text: PropTypes.string,
        /**
         * 文本样式样式
         */
        textStyle: PropTypes.oneOfType([
            PropTypes.object,
            PropTypes.number,
            PropTypes.array
        ]),
        sizeProgress:PropTypes.number,//进度条大小
        progress:PropTypes.number,//进度 0~1
        onPressImage:PropTypes.func,//图片点击事件
        onPress:PropTypes.func,//点击事件
        onPressText:PropTypes.func,//文本点击事件
        color:PropTypes.string,//进度颜色
        unfilledColor:PropTypes.string,//剩余进度颜色
        children:PropTypes.element,//子元素UI

        renderInnerUI:PropTypes.func,//内圆渲染UI 回调函数
    };

    static defaultProps = {
        isInner:true,
        color:Theme.Colors.appRedColor,
        unfilledColor:Theme.Colors.foregroundColor,
    };

    constructor(props) {
        super(props);

        this.size = 50;
    }

    getProgressSize(){
        let {iconStyle,sizeProgress,size} = this.props;
        if(!size){
            let style = Tools.getStyle(iconStyle);
            size = sizeProgress ||
                (
                    style.width
                        ? style.width * 0.8
                        : StyleSheetAdapt.getWidth(this.size)
                );
        }

        return size;
    }

    renderItem = ()=>{
        const {icon,iconStyle,renderInnerUI} = this.props;
        if(renderInnerUI){
            return renderInnerUI();
        }
        return(
            <Img source={icon}
                 style={[styles.iconStyle,iconStyle]}/>
        );
    }

    getThickness(){
        const {size} = this.props;
        let w = 5;

        if(size){
            w = size / this.size * w;
        }

        return StyleSheetAdapt.getWidth(w);
    }

    render() {

        const {onPressImage,onPressText,text,onPress,textStyle,
            frameStyle,children,iconStyle,icon,progress,isInner,
            iconFrameStyle,unfilledColor,color} = this.props;

        // {...this.props}

        return (

            <View style={[
                {flexDirection: 'row'},
                this.props.style,
                frameStyle
            ]}>
                <TouchableOpacity style={iconFrameStyle}
                                  onPress={()=>{
                    onPressImage&&onPressImage()||onPress&&onPress();
                }}>

                    {
                        isInner&&<ImageBg style={[iconStyle,styles.imageStyle]}
                                        imageStyle={iconStyle}
                                        source={icon}>
                            {
                                children||
                                <Circle size={this.getProgressSize()} // 圆的直径
                                        style={styles.circleStyle}
                                        progress={progress||0}
                                        unfilledColor={unfilledColor} // 剩余进度的颜色
                                        color={color}
                                        thickness={this.getThickness()} // 内圆厚度
                                        showsText={false}/>
                            }
                        </ImageBg>
                        || (children||
                            <Circle size={this.getProgressSize()} // 圆的直径
                                    style={styles.circleStyle}
                                    progress={progress||0}
                                    unfilledColor={unfilledColor} // 剩余进度的颜色
                                    color={color}
                                    thickness={this.getThickness()} // 内圆厚度
                                    showsText={true}
                                    isCenterDefaultUI={false}
                                    formatText={this.renderItem}/>)
                    }


                </TouchableOpacity>

                {
                    text == undefined ?
                        null :
                        <TouchableOpacity onPress={()=>{
                            onPressText&&onPressText()||onPress&&onPress();
                        }}>
                            <Text style={textStyle}>
                                {text}
                            </Text>
                        </TouchableOpacity>
                }


            </View>
        );
    }
}

const styles = StyleSheetAdapt.create({
    imageStyle:{
        justifyContent:'center',
        alignItems:'center',
    },
    circleStyle:{
        marginTop:-10,
    },
    iconStyle:{
        width:50,
        height:'50dw'
    },
});
