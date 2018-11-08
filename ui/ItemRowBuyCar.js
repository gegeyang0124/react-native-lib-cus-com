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
    TextInput,
} from 'react-native';

import {
    StyleSheetAdapt,
    Theme,
    Tools,
} from "./../api/api";
import {ButtonImage} from './ButtonImage';

import ImageAdd from 'lib-images-zy/add.png';
import ImageSub from 'lib-images-zy/sub.png';
import IamgeBelowIcon from 'lib-images-zy/belowIcon.png';

/**
 * 需要修改js封装层 leftText rightText 样式中flex去掉 ，
 * onClick事件传出是否选中，true或false
 * leftText和rightText样式删掉
 * rightTextStyle和leftTextStyle样式改成PropTypes.oneOfType([
 PropTypes.object,
 PropTypes.number
 ])
 * **/
import CheckBox from 'react-native-check-box-zy';
import {VideoView} from "./VideoView";

/**
 * 购物车行元素UI
 * 左至右，有勾选框、图片、文本、数量输入UI；
 * **/
export class ItemRowBuyCar extends Component {

    text:string;//TextInput输入内容

    //属性注释及类型,所有的属性对象都是句柄模式（类型时number），类似C语言中的指针
    static propTypes = {
        frameStyle:PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.object,
            PropTypes.array
        ]),//框样式
        onPressChecked:PropTypes.func,//左边勾选框事件，回传是否选中，true：选中，false：不选中
        onPress:PropTypes.func,//整行点击事件
        onPressLeft:PropTypes.func,//左边点击事件
        onPressCenter:PropTypes.func,//中间点击事件
        onPressRight1:PropTypes.func,//右边模块的左边 点击事件
        onPressRight2:PropTypes.func,//右边模块的右边 点击事件
        onTextChanged:PropTypes.func,//文本输入变化 事件
        onTextBlur:PropTypes.func,//文本输入离开焦点 事件
        isShowCheckBox:PropTypes.bool,//是否显示选择框，默认显示true ；隐藏：false
        isChecked:PropTypes.bool,//选择框是否选中
        disabledPress:PropTypes.bool,//所有点击无效，默认false 有效
        icon:PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.object,
            PropTypes.string
            //React.PropTypes.instanceOf(Message)
        ]),//图标
        text1_1:PropTypes.string,//文本 第1行第1个
        text1_2:PropTypes.string,//文本 第1行第2个
        text2_1:PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.string,
            PropTypes.object
            //React.PropTypes.instanceOf(Message)
        ]),//文本 第2行第1个
        text2_2:PropTypes.string,//文本 第2行第2个
        text2_2Style:PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.object,
            PropTypes.array
        ]),//文本 第3行第1个
        text3_1:PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.string,
            PropTypes.object,
            //React.PropTypes.instanceOf(Message)
        ]),//文本 第3行第1个
        text3_1Style:PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.object,
            PropTypes.array
        ]),//文本样式 第3行第1个
        text3_2:PropTypes.string,//文本 第3行第2个
        text3_2Style:PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.object,
            PropTypes.array
        ]),//文本样式 第3行第2个
        text4_1:PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.string,
            PropTypes.object,
            //React.PropTypes.instanceOf(Message)
        ]),//文本 第4行第1个
        text4_2:PropTypes.string,//文本 第4行第2个
        textRight:PropTypes.string,//文本 右边模块

        isShowRight:PropTypes.bool,//是否显示右边UI 默认显示true
        isShowLeft:PropTypes.bool,//是否显示左边UI 默认显示true

        isInput:PropTypes.bool,//是否输入，true:输入，不输入
        valueInput:PropTypes.string,//输入框的值

        isShowIconRight:PropTypes.bool,//是否显示右边右箭头图标，默认false 不显示
    }

    /**
     * 设置默认属性
     * **/
    static defaultProps = {
        isInput:false,
        isShowCheckBox:true,
        isShowRight:true,
        isShowLeft:true,
        disabledPress:false,
        isShowIconRight:false,
    }

    constructor(props) {
        super(props);

        this.state = {
            value:null,//文本值
        }

    }

    setText(value){
        value = value + '';
        this.setState({
            value:value
        });
    }

    getImage(){
        const {icon} = this.props;
        let image = null;
        if(icon){
            if(typeof(icon) == 'number'){
                image = icon
            }
            else if(typeof(icon) == 'string' && icon.indexOf('http') == 0){
                image = {
                    uri:icon
                };
            }
        }
        return image;
    }

    renderFile(){
        const {icon,onPressLeft,disabledPress,onPress} = this.props;
        let image = null;
        let isVideo = false;
        if(icon){
            if(typeof(icon) == 'number'){
                image = icon
            }
            else if(typeof(icon) == 'string' && icon.indexOf('http') == 0){
                image = {
                    uri:icon
                };
                if(!(icon.indexOf(".j") > -1 || icon.indexOf(".pn") > - 1)){
                    isVideo = true;
                }
            }
        }

        return(
            isVideo&&<VideoView frameStyle={styles.itemRowLeftIcon}/>
            ||<TouchableOpacity onPress={onPressLeft||onPress}
                                source={image}
                                disabled={disabledPress}>
                <Image source={image}
                       style={styles.itemRowLeftIcon}/>
            </TouchableOpacity>
        );
    }

    render() {
        const {isShowCheckBox,frameStyle,text3_1Style,isShowRight,isShowLeft,
            onPressLeft,onPress,onPressCenter,disabledPress,text2_2Style,
            text3_2Style,isShowIconRight,text3_1,text4_1,text2_1} = this.props;

        return (
            <View style={[styles.itemRowFrame,frameStyle]}>

                {
                    isShowLeft&&<View>
                        {
                            isShowCheckBox
                                ? <CheckBox style={styles.itemRowCheckBox}
                                            isChecked={this.props.isChecked}
                                            onClick={(isChecked)=>{
                                                this.props.onPressChecked == undefined
                                                    ? null
                                                    : this.props.onPressChecked(isChecked);
                                            }}
                                            checkBoxColor={Theme.Colors.themeColor}/>
                                : null
                        }
                    </View>
                }


                <View style={styles.itemRowFrame1_0}>
                    {
                        this.renderFile()
                    }
                </View>

                <View style={styles.itemRowFrame1_1}>
                    <TouchableOpacity onPress={onPressCenter||onPress}
                                      disabled={disabledPress}
                                      style={styles.itemRowFrame1_1_1}>
                        <View style={styles.itemRowFrame2}>
                            <View style={styles.itemRowFrame2_1}>
                                <Text style={styles.itemRowText1}>
                                    {
                                        this.props.text1_1

                                    }
                                </Text>
                            </View>

                            <View style={styles.itemRowFrame2_2}>
                                <Text style={styles.itemRowText2}>
                                    {
                                        this.props.text1_2
                                    }
                                </Text>
                            </View>
                        </View>

                        <View style={styles.itemRowFrame2}>

                            <View style={styles.itemRowFrame2_1}>
                                {
                                    typeof text2_1 != 'object'
                                    && <Text style={styles.itemRowText1}>
                                        {
                                            text2_1

                                        }
                                    </Text>
                                    || text2_1
                                }

                            </View>

                            <View style={styles.itemRowFrame2_2}>
                                <Text style={[styles.itemRowText2,styles.itemRowText2Price,text2_2Style]}>
                                    {
                                        this.props.text2_2
                                    }
                                </Text>
                            </View>

                        </View>

                        <View style={styles.itemRowFrame2}>
                            <View style={styles.itemRowFrame2_1}>
                                {
                                    typeof text3_1 != 'object'
                                    && <Text style={[styles.itemRowText1,text3_1Style]}>
                                        {
                                            text3_1

                                        }
                                    </Text>
                                    || text3_1
                                }
                            </View>
                            <View style={styles.itemRowFrame2_2}>
                                <Text style={[styles.itemRowText2,text3_2Style]}>
                                    {
                                        this.props.text3_2
                                    }
                                </Text>
                            </View>

                        </View>

                        {
                            text4_1 != undefined
                                ? <View style={styles.itemRowFrame2}>
                                    <View style={styles.itemRowFrame2_1}>
                                        {
                                            typeof text4_1 == 'object'
                                            && text4_1
                                            || <Text style={[styles.itemRowText1,styles.itemRowText2Price]}>
                                                {
                                                    this.props.text4_1
                                                }

                                            </Text>
                                        }

                                    </View>
                                    <View style={styles.itemRowFrame2_2}>
                                        <Text style={styles.itemRowText2}>
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
                    isShowRight&&<View style={styles.itemRowFrame1_2}>
                        {
                            this.props.isInput
                                ?  <View style={styles.itemRowFrame1_2_1}>
                                    <ButtonImage icon={ImageSub}
                                                 onPress={()=>this.props.onPressRight1(this)}
                                                 style={styles.itemRowFrame1_2_1_IconFrame}
                                                 iconStyle={styles.itemRowFrame1_2_1_Icon}/>
                                    <TextInput style={styles.itemRowTextInput}
                                               value={this.state.value == null ? this.props.valueInput : this.state.value}
                                               defaultValue={this.props.valueInput}
                                               keyboardType={'numeric'}
                                        // onChange={()=>{alert('hj')}}
                                               onBlur={()=>{
                                                   this.props.onTextBlur == undefined
                                                       ? null
                                                       : this.props.onTextBlur(this.text,this)
                                               }}
                                               onChangeText={text => {
                                                   this.text = text;
                                                   this.setText(text);
                                                   this.props.onTextChanged == undefined
                                                       ? null
                                                       : this.props.onTextChanged(text,this)
                                               }}
                                    ></TextInput>
                                    <ButtonImage icon={ImageAdd}
                                                 onPress={()=>this.props.onPressRight2(this)}
                                                 style={styles.itemRowFrame1_2_1_IconFrame}
                                                 iconStyle={styles.itemRowFrame1_2_1_Icon}/>
                                </View>
                                :  <View style={styles.itemRowFrame1_2_1}>
                                    <Text style={styles.itemRowText2}>
                                        {
                                            this.props.textRight
                                        }
                                    </Text>
                                </View>
                        }


                    </View>
                    ||isShowIconRight&&<View style={styles.imageFrame0}>
                        <ButtonImage disabled={disabledPress}
                                     style={styles.imageFrame}
                                     iconStyle={styles.iconStyle}
                                     icon={IamgeBelowIcon}/>
                    </View>
                }


            </View>
        );
    }
}

const styles = StyleSheetAdapt.create({
    imageFrame0:{
        justifyContent:'center',
        alignItems:"center",
        width:50,
    },
    imageFrame:{
        width:30,
        height:30,
    },
    iconStyle:{
        transform:[{ rotateZ: '-90deg' }],
        // tintColor:Theme.Colors.themeColor,
    },

    itemRowFrame:{
        flexDirection:'row',
        // alignItems:'center',
        // justifyContent:'center',
        // flex:1,
        borderColor:Theme.Colors.borderColor,
        borderBottomWidth:Theme.Border.borderWidth,
        padding:10,
        /*alignItems:'center',
         justifyContent:'center',*/
    },
    itemRowCheckBox:{
        flex: 1,
        // padding: 10,
        justifyContent:'center',
        alignItems:"center"
    },
    itemRowTextInput:Tools.platformType
        ? {
            width:100,
            height:31.5,
            borderColor:Theme.Colors.borderColor,
            borderWidth:0.5,
            fontSize:Theme.Font.fontSize,
            color:"#000000",
            // margin:5,
            marginLeft:5,
            marginRight:5,
        }
        :{
            width:100,
            // height:31.5,
            borderColor:Theme.Colors.borderColor,
            // borderWidth:0.5,
            fontSize:Theme.Font.fontSize,
            color:"#000000",

            padding:0,
            paddingBottom:5,
            paddingLeft:10,

            // margin:5,
            marginLeft:5,
            marginRight:5,
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
        flex:4,
        alignItems:'center',
        justifyContent:'center',
    },
    itemRowLeftIcon:{
        width:150,
        height:150 * 0.75,
        resizeMode: Image.resizeMode.contain,
    },
    itemRowFrame2_1:{
        // flex:1,

    },
    itemRowFrame2_2:{
        // flex:1,
        // margin:0,
    },
    itemRowFrame2:{
        flex:1,
        flexDirection:'row',
        // alignItems:'center',
        // justifyContent:'center',
        justifyContent:'space-between',
    },
    itemRowText:{
        fontSize:Theme.Font.fontSize,

    },
    itemRowText1:{
        fontSize:Theme.Font.fontSize,
        // backgroundColor:'blue',
        marginBottom:0,
        // alignSelf:"center",
        // flex:8,
    },
    itemRowText2:{
        fontSize:Theme.Font.fontSize,
        // backgroundColor:'blue',
        alignSelf:"center",
    },
    itemRowText2Price:{
        color:Theme.Colors.themeColor,
    },
    itemRowFrame1_2_1:{
        /*  backgroundColor:Theme.Colors.backgroundColorBtn,
         borderRadius:10,
         padding:10,*/
        flexDirection:'row',
    },
    itemRowFrame1_2_1_IconFrame:{
        width:30,
        height:30,
    },
    itemRowFrame1_2_1_Icon:{
        tintColor:Theme.Colors.themeColor,
    },
    itemRowFrame1_2_1Txt:{
        color:"#FFFFFF",
    },
});