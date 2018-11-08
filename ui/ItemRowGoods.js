/**
 * Created by Administrator on 2018/5/6.
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

/**
 * 商品行组件 水平行，从左到右内容分别是，左边一张图片，中间有可支持5行竖直的文本行，其次是商品价格 最右边一个按钮（如加入购物车）
 * **/
export class ItemRowGoods extends Component {

    //属性注释及类型,所有的属性对象都是句柄模式（类型时number），类似C语言中的指针
    static propTypes = {
        frameStyle:PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.object,
            PropTypes.array
        ]),//框样式
        onPress:PropTypes.func,//整个ui点击事件点击事件 此事件调用其余事件无效
        onPressLeft:PropTypes.func,//左边点击事件
        onPressCenter:PropTypes.func,//中间点击事件
        onPressRight:PropTypes.func,//右边点击事件
        icon:PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.object,
            PropTypes.string
            //React.PropTypes.instanceOf(Message)
        ]),//图标
        isShowIcon:PropTypes.bool,//图片是否显示，默认true 显示
        color:PropTypes.string,//左边和右边文本的颜色
        isIconCirle:PropTypes.bool,//图片是否是圆形，默认flase 正方形
        text0:PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.string,
            PropTypes.object
            //React.PropTypes.instanceOf(Message)
        ]),//文本 左边竖着文本
        text1_1:PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.string,
            PropTypes.object
            //React.PropTypes.instanceOf(Message)
        ]),//文本 第1行第1个
        text1_1_Style:PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.object,
            PropTypes.array
        ]),//文本样式 第1行第1个
        text1_2:PropTypes.string,//文本 第1行第2个
        text1_2_Style:PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.object,
            PropTypes.array
        ]),//文本样式 第1行第2个
        text2_1:PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.string
            //React.PropTypes.instanceOf(Message)
        ]),//文本 第2行第1个
        text2_2:PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.string,
            PropTypes.object
            //React.PropTypes.instanceOf(Message)
        ]),//文本 第2行第2个
        text3_1:PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.string,
            PropTypes.object
            //React.PropTypes.instanceOf(Message)
        ]),//文本 第3行第1个
        text3_2:PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.string,
            PropTypes.object
            //React.PropTypes.instanceOf(Message)
        ]),//文本 第3行第2个
        text4_1:PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.string,
            PropTypes.object
            //React.PropTypes.instanceOf(Message)
        ]),//文本 第4行第1个
        text4_2:PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.string,
            PropTypes.object
            //React.PropTypes.instanceOf(Message)
        ]),//文本 第4行第2个
        text5:PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.string,
            PropTypes.object
            //React.PropTypes.instanceOf(Message)
        ]),//文本  右边文本

        textBtn:PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.string,
            PropTypes.object
            //React.PropTypes.instanceOf(Message)
        ]),//文本 按钮
        btnFrameStyle:PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.object,
            PropTypes.array
        ]),//按钮框样式


        textStyle:PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.object,
            PropTypes.array
        ]),//文本样式 改变所有文本的样式
        isShowBtnRight:PropTypes.bool,//是否显示右边按钮，默认true 显示
        //所有属性附加到PickDropdown
    }

    /**
     * 设置默认属性
     * **/
    static defaultProps = {
        isIconCirle:false,
        isShowBtnRight:true,
        isShowIcon:true,
        textBtn:"  加入\n购物车",
    }

    getImage(){
        const {icon} = this.props;

        if(typeof(icon) == 'string'){
            return {
                uri:icon
            };
        }
        else if(typeof(icon) == 'object' && !icon.uri){
            return null;
        }

        return icon;
    }

    measure(){
        return new Promise((resolve,reject)=>{
            this.ui.measure((fx, fy, width, height, px, py) => {
                /**
                 * console.log("width:" + width); //控件宽
                 console.log("height:" + height);//控件高
                 console.log("fx:" + fx); //距离父控件左端 x的偏移量
                 console.log("fy:" + fy); //距离父控件上端 y的偏移量
                 console.log("px:" + px); //距离屏幕左端 x的偏移量
                 console.log("py:" + py); //距离屏幕上端 y的偏移量
                 * **/
                let m = {fx:fx,fy:fy,px: px, py: py, w: width, h: height};
                // alert(JSON.stringify(m))
                // callback && callback();
                resolve(m);
            });
        });
    }

    render() {

        const {text2_2,frameStyle,text1_1_Style,isIconCirle,text0,text5,color,onPress,
            text3_1,text1_1,text2_1,text1_2,text3_2,isShowBtnRight,text1_2_Style,
            isShowIcon,textStyle,textBtn,btnFrameStyle} = this.props;

        return (
            <TouchableOpacity ref={c=>this.ui = c}
                              style={[styles.itemRowFrame,text0&&styles.itemRowFrame0
                              ||{},frameStyle]}
                              disabled={onPress == undefined}
                              onPress={onPress}>
                {
                    text0!=undefined&&<View style={[styles.itemRowText0F,color?{backgroundColor:color}:{}]}>
                        <Text style={[styles.itemRowText1,styles.itemRowText0,textStyle]}>
                            {text0}
                        </Text>
                    </View>
                }

                {
                    isShowIcon
                    && <View style={[styles.itemRowFrame1_0,text0!=undefined&&styles.frameMargin||{}]}>
                        <TouchableOpacity onPress={this.props.onPressLeft}
                                          disabled={onPress != undefined}>
                            <Image source={this.getImage()}
                                   style={[styles.itemRowLeftIcon,isIconCirle&&styles.itemRowLeftIcon_Circle||{}]}/>
                        </TouchableOpacity>
                    </View>
                }

                <View style={[styles.itemRowFrame1_1,text0!=undefined&&styles.frameMargin||{}]}>
                    <TouchableOpacity onPress={this.props.onPressCenter}
                                      disabled={onPress != undefined}
                                      style={styles.itemRowFrame1_1_1}>
                        {
                            (text1_1 || text1_2) &&   <View style={styles.itemRowFrame2}>
                                <View style={styles.itemRowFrame2_1}>
                                    <Text style={[styles.itemRowText1,styles.textTag,textStyle,text1_1_Style]}>
                                        {
                                            text1_1
                                        }
                                    </Text>
                                </View>

                                <View style={styles.itemRowFrame2_2}>
                                    <Text style={[styles.itemRowText2,textStyle,text1_2_Style]}>
                                        {
                                            text1_2
                                        }
                                    </Text>
                                </View>
                            </View>
                        }

                        {
                            (text2_1 || text2_2) && <View style={styles.itemRowFrame2}>

                                <View style={styles.itemRowFrame2_1}>
                                    <Text style={[styles.itemRowText1,textStyle]}>
                                        {
                                            text2_1
                                        }
                                    </Text>
                                </View>

                                <View style={styles.itemRowFrame2_2}>
                                    <Text style={[styles.itemRowText2,styles.itemRowText2Price,textStyle]}>
                                        {
                                            text2_2
                                        }
                                    </Text>
                                </View>

                            </View>
                        }


                        {
                            (text3_1 || text3_2) && <View style={styles.itemRowFrame2}>
                                <View style={styles.itemRowFrame2_1}>
                                    <Text style={[styles.itemRowText1,textStyle]}>
                                        {
                                            text3_1
                                        }
                                    </Text>
                                </View>
                                <View style={styles.itemRowFrame2_2}>
                                    <Text style={[styles.itemRowText2,textStyle]}>
                                        {
                                            this.props.text3_2
                                        }
                                    </Text>
                                </View>

                            </View>
                        }


                        {
                            this.props.text4_1 != undefined
                                ? <View style={styles.itemRowFrame2}>
                                    <View style={styles.itemRowFrame2_1}>
                                        <Text style={[styles.itemRowText1,textStyle]}>
                                            {
                                                this.props.text4_1
                                            }
                                        </Text>
                                    </View>
                                    <View style={styles.itemRowFrame2_2}>
                                        <Text style={[styles.itemRowText2,textStyle]}>
                                            {
                                                this.props.text4_2
                                            }
                                        </Text>
                                    </View>

                                </View>
                                : null
                        }
                    </TouchableOpacity>

                </View>

                {
                    isShowBtnRight && <View style={[styles.itemRowFrame1_2,text5!=undefined&&styles.frameMargin||{}]}>
                        {
                            text5!=undefined&&<Text style={[styles.text5Style0,color?{color:color}:{}]}>
                                No.
                                <Text style={[styles.text5Style]}>
                                    {text5}
                                </Text>
                            </Text>
                            ||<TouchableOpacity onPress={this.props.onPressRight}
                                                disabled={onPress?true:false}
                                                style={[styles.itemRowFrame1_2_1,btnFrameStyle]}>
                                <Text style={styles.itemRowFrame1_2_1Txt}>
                                    {textBtn}
                                </Text>
                            </TouchableOpacity>
                        }

                    </View>
                }



            </TouchableOpacity>
        );
    }
}

const styles = StyleSheetAdapt.create({
    frameMargin:{
        margin:10,
    },

    text5Style0:{
        fontSize:Theme.Font.fontSize,
        color:Theme.Colors.minorColor,
    },
    text5Style:{
        fontSize:50,
    },

    itemRowFrame0:{
        padding:0,
        borderBottomWidth:0,
    },

    itemRowFrame:{
        flexDirection:'row',
        // alignItems:'center',
        // justifyContent:'center',
        // flex:1,
        borderColor:Theme.Colors.borderColor,
        borderBottomWidth:Theme.Border.borderWidth,
        padding:10,
        backgroundColor:Theme.Colors.foregroundColor,
    },
    itemRowFrame1_0:{
        // flex:2,
        // alignItems:'center',
        // justifyContent:'center',
        // paddingLeft:10,
        paddingRight:10,
        /*alignItems:'center',
         justifyContent:'center',*/
    },
    itemRowFrame1_1:{
        flex:7,
        // alignItems:'center',
        // justifyContent:'center',
    },
    itemRowFrame1_1_1:{
        // backgroundColor:'red',
        flex:1,
    },
    itemRowFrame1_2:{
        flex:3,
        alignItems:'center',
        justifyContent:'center',
    },
    itemRowLeftIcon:{
        width:100,
        height:100,
        // height:150 * 0.75,
        resizeMode: Image.resizeMode.contain,

    },
    itemRowLeftIcon_Circle:{
        resizeMode: Image.resizeMode.stretch,
        borderRadius:50,
    },
    itemRowFrame2_1:{
        // flex:1,
        // alignItems:'center',
        justifyContent:'center',
    },
    itemRowFrame2_2:{
        // flex:1,
        justifyContent:'center',
    },
    itemRowFrame2:{
        flex:1,
        flexDirection:'row',

        justifyContent:'space-between',
    },
    itemRowText:{
        fontSize:Theme.Font.fontSize,

    },
    textTag:{
        color:Theme.Colors.fontcolor,
        fontSize:Theme.Font.fontSize,
    },
    itemRowText0F:{
        backgroundColor:Theme.Colors.backgroundColor3,
        alignItems:'center',
        justifyContent:'center',
        width:Theme.Font.fontSize * 2,
        marginRight:10,
    },
    itemRowText0:{
        color:Theme.Colors.foregroundColor,
        width:Theme.Font.fontSize,
        lineHeight:Theme.Font.fontSize + 10,
    },
    itemRowText1:{
        fontSize:Theme.Font.fontSize_1_1,
        color:Theme.Colors.minorColor,
        // backgroundColor:'blue',
        marginBottom:0,
        // alignSelf:"center",
        // flex:8,
    },
    itemRowText2:{
        fontSize:Theme.Font.fontSize_1_1,
        color:Theme.Colors.minorColor,
        // backgroundColor:'blue',
        alignSelf:"center",
    },
    itemRowText2Price:{
        color:Theme.Colors.themeColor,
    },
    itemRowFrame1_2_1:{
        // backgroundColor:Theme.Colors.backgroundColorBtn,
        backgroundColor:Theme.Colors.themeColor,
        borderRadius:10,
        padding:10,
    },
    itemRowFrame1_2_1Txt:{
        color:"#FFFFFF",
    },
});