import React, {Component} from 'react';
import PropTypes  from 'prop-types';
import {
    View,
    Text,
    TouchableOpacity,
} from 'react-native';

import {
    StyleSheetAdapt,
    Theme,
} from "./../api/api";
import {ButtonImage} from './ButtonImage';
import {ImageBg} from './ImageBg';

import ImageRightBlack from 'lib-images-zy/rightBlack.png';
import ImageSatusNormal from 'lib-images-zy/statusNormal.png';
import ImageStatusContract from 'lib-images-zy/statusContract.png';
import ImageStatusFight from 'lib-images-zy/statusFight.png';
import ImageCustomerLevel from "lib-images-zy/customerLevel.png";

type Props = {};
/**
 * 文本行组件 5行文本 右边有个箭头图标
 * **/
export class ItemRowFeedback extends Component<Props> {

    static itemRowFirst = null;

    //属性注释及类型,所有的属性对象都是句柄模式（类型时number），类似C语言中的指针
    static propTypes = {
        frameStyle:PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.object,
            PropTypes.array
        ]),//外部框样式
        text1_1:PropTypes.oneOfType([
            PropTypes.object,
            PropTypes.string
        ]),//文本 第1行第1个
        text1_2:PropTypes.oneOfType([
            /**
             * 可以有4列文本  //已添加第5列
             * {text_1:'',text_2:'',text_3:''',text_4:''}
             * **/
            PropTypes.object,
            PropTypes.string
        ]),//文本 第1行第2个
        text2_1:PropTypes.oneOfType([
            PropTypes.object,
            PropTypes.string
        ]),//文本 第2行第1个
        text2_2:PropTypes.oneOfType([
            PropTypes.object,
            PropTypes.string
        ]),//文本 第2行第2个
        text3_1:PropTypes.oneOfType([
            PropTypes.object,
            PropTypes.string
        ]),//文本 第3行第1个
        text3_2:PropTypes.oneOfType([
            PropTypes.object,
            PropTypes.string
        ]),//文本 第3行第2个
        text4_1:PropTypes.oneOfType([
            PropTypes.object,
            PropTypes.string
        ]),//文本 第4行第1个
        text4_2:PropTypes.oneOfType([
            PropTypes.object,
            PropTypes.string
        ]),//文本 第4行第2个
        text5_1:PropTypes.oneOfType([
            PropTypes.object,
            PropTypes.string
        ]),//文本 第5行第1个
        text5_2:PropTypes.oneOfType([
            PropTypes.object,
            PropTypes.string
        ]),//文本 第5行第2个
        textStyle:PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.object,
            PropTypes.array
        ]),//所有文本的样式
        isShowIcon:PropTypes.bool,//是否显示图标，默认显示，true,
        onPress:PropTypes.func,//点击事件
        btnId:PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.string
        ]),//框的句柄ID
        // getSelf:PropTypes.func,//回传他
    }

    /**
     * 设置默认属性
     * **/
    static defaultProps = {
        isShowIcon:true
    }

    render() {

        const {text1_1,text1_2,text2_1,text2_2,text3_1,text3_2,text4_1,text4_2,text5_1,text5_2,
            textStyle,isShowIcon,frameStyle,onPress} = this.props;

        return (
            <TouchableOpacity style={[styles.itemRowFrame,frameStyle]}
                              ref={(com)=>{
                                  this.btn = com;//this.refs[btnId])
                                  // getSelf(com);
                                  return com;
                              }}
                              onPress={()=>{onPress && onPress(this.btn)}}>

                <View style={styles.itemRowFrame1_1}>
                    <View style={styles.itemRowFrame2}>
                        <View style={styles.itemRowFrame2_1}>
                            <Text style={[styles.itemRowText1,styles.text1_1,textStyle]}>
                                {
                                    text1_1
                                }
                            </Text>
                        </View>

                        <View style={styles.itemRowFrame2_2}>
                            {
                                typeof(text1_2) == 'object' ?
                                    <View style={styles.customerItemFrame_statusBtnFrame}>
                                        {
                                            text1_2.text_1 == undefined ?
                                                null :
                                                <ImageBg source={ImageSatusNormal}
                                                       imageStyle={styles.customerItemFrame_statusBtnFrameImageStyle}
                                                       style={styles.customerItemFrame_statusBtnFrameImage}>
                                                    <Text style={styles.customerItemFrame_text}>
                                                        {
                                                            text1_2.text_1
                                                        }
                                                    </Text>
                                                </ImageBg>
                                        }

                                        {
                                            text1_2.text_2 == undefined ?
                                                null :
                                                <ImageBg source={ImageStatusContract}
                                                       imageStyle={styles.customerItemFrame_statusBtnFrameImageStyle}
                                                       style={styles.customerItemFrame_statusBtnFrameImage}>
                                                    <Text style={styles.customerItemFrame_text}>
                                                        {
                                                            text1_2.text_2
                                                        }
                                                    </Text>
                                                </ImageBg>
                                        }

                                        {
                                            text1_2.text_3 == undefined ?
                                                null :
                                                <ImageBg source={ImageStatusFight}
                                                       imageStyle={styles.customerItemFrame_statusBtnFrameImageStyle}
                                                       style={styles.customerItemFrame_statusBtnFrameImage}>
                                                    <Text style={styles.customerItemFrame_text}>
                                                        {
                                                            text1_2.text_3
                                                        }
                                                    </Text>
                                                </ImageBg>
                                        }

                                        {
                                            text1_2.text_4 == undefined ?
                                                null :
                                                <ImageBg source={ImageStatusFight}
                                                       imageStyle={styles.customerItemFrame_statusBtnFrameImageStyle}
                                                       style={styles.customerItemFrame_statusBtnFrameImage}>
                                                    <Text style={styles.customerItemFrame_text}>
                                                        {
                                                            text1_2.text_4
                                                        }
                                                    </Text>
                                                </ImageBg>
                                        }

                                        {
                                            text1_2.text_5 == undefined ?
                                                null :
                                                <ImageBg source={ImageCustomerLevel}
                                                       imageStyle={styles.customerItemFrame_statusBtnFrameImageStyle}
                                                       style={styles.customerItemFrame_statusBtnFrameImage}>
                                                    <Text style={styles.customerItemFrame_text}>
                                                        {
                                                            text1_2.text_5
                                                        }
                                                    </Text>
                                                </ImageBg>
                                        }

                                    </View> :
                                    <Text style={[styles.itemRowText1,styles.itemRowText2,textStyle]}>
                                        {
                                            text1_2
                                        }
                                    </Text>
                            }

                        </View>

                    </View>
                    <View style={styles.itemRowFrame2}>
                        <View style={styles.itemRowFrame2_1}>
                            <Text style={[styles.itemRowText1,textStyle]}>
                                {
                                    text2_1
                                }
                            </Text>
                        </View>
                        <View style={styles.itemRowFrame2_2}>
                            <Text style={[styles.itemRowText1,styles.itemRowText2,textStyle]}>
                                {
                                    text2_2
                                }
                            </Text>

                        </View>

                    </View>
                    <View style={styles.itemRowFrame2}>
                        <View style={styles.itemRowFrame2_1}>
                            <Text style={[styles.itemRowText1,textStyle]}>
                                {
                                    text3_1
                                }
                            </Text>
                        </View>
                        <View style={styles.itemRowFrame2_2}>
                            <Text style={[styles.itemRowText1,styles.itemRowText2,textStyle]}>
                                {
                                    text3_2
                                }
                            </Text>
                        </View>

                    </View>

                    {
                        text4_1 != undefined
                            ? <View style={styles.itemRowFrame2}>
                                <View style={styles.itemRowFrame2_1}>
                                    <Text style={[styles.itemRowText1,textStyle]}>
                                        {
                                            text4_1
                                        }
                                    </Text>
                                </View>
                                <View style={styles.itemRowFrame2_2}>
                                    <Text style={[styles.itemRowText1,styles.itemRowText2,textStyle]}>
                                        {
                                            text4_2
                                        }
                                    </Text>
                                </View>

                            </View>
                            : null
                    }

                    {
                        text5_1 != undefined
                            ? <View style={styles.itemRowFrame2}>
                                <View style={styles.itemRowFrame2_1}>
                                    <Text style={[styles.itemRowText1,textStyle]}>
                                        {
                                            text5_1
                                        }
                                    </Text>
                                </View>
                                <View style={styles.itemRowFrame2_2}>
                                    <Text style={[styles.itemRowText1,styles.itemRowText2,textStyle]}>
                                        {
                                            text5_2
                                        }
                                    </Text>
                                </View>

                            </View>
                            : null
                    }

                </View>

                {
                    isShowIcon ?   <View style={styles.itemRowFrame1_2}>
                        <ButtonImage icon={ImageRightBlack}
                                     style={styles.itemRowIcon}
                                     iconStyle={{ tintColor:Theme.Colors.themeColor}}/>
                    </View> : null
                }


            </TouchableOpacity>
        );
    }
}

const styles = StyleSheetAdapt.create({
    itemRowFrame:{
        flexDirection:'row',
        // alignItems:'center',
        // justifyContent:'center',
        flex:1,
        // borderColor:Theme.Colors.borderColor,
        borderColor:Theme.Colors.minorColor,
        borderBottomWidth:Theme.Border.borderWidth,
        paddingBottom:10,
    },
    itemRowFrame1_1:{
        flex:9,
        // alignItems:'center',
        // justifyContent:'center',
    },
    itemRowFrame1_2:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
    },
    itemRowFrame2_1:{
        // flex:1,
        // backgroundColor:'blue',
    },
    itemRowFrame2_2:{
        // flex:1,
        // backgroundColor:'yellow',
    },
    itemRowFrame2:{
        flex:1,
        flexDirection:'row',
        padding:10,
        paddingBottom:0,
        justifyContent:'space-between',
    },
    itemRowText1:{

        fontSize:Theme.Font.fontSize_1,
        color:Theme.Colors.minorColor,
        // backgroundColor:'yellow',
        // alignSelf:"center",
        // flex:8,
    },
    itemRowText2:{
        // fontSize:Theme.Font.fontSize,
        // backgroundColor:'blue',
        alignSelf:"center",
    },
    itemRowIcon:{
        width:30,
        height:30,
    },

    text1_1:{
        color:Theme.Colors.fontcolor,
    },

    customerItemFrame:{
        borderLeftWidth:0,
    },
    customerItemFrame_1:{
        marginTop:10,
    },
    customerItemFrame_statusBtnFrame:{
        flex:1,
        flexDirection: 'row',
        alignItems:'center',
        justifyContent:'center',
    },
    customerItemFrame_statusBtnFrameImage:{
        // flex:1,
        width: 100,
        height: 30,
        alignItems:'center',
        justifyContent:'center',
        marginRight:10,
        // padding:0,
        // resizeMode:'center',
    },
    customerItemFrame_statusBtnFrameImageStyle:{
        resizeMode:'contain',
        width: 100,
        height: 30,
    },
    customerItemFrame_text:{
        color:Theme.Colors.foregroundColor,
        fontSize:Theme.Font.fontSize_2,
        fontWeight:"bold",
        // marginTop:10,
        marginLeft:15,
        // zIndex:111,
    },
});