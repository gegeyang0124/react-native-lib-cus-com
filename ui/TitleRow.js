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
    Image,
} from 'react-native';
import {
    StyleSheetAdapt,
    Theme,
    Tools,
} from "./../api/api";

import ImageLeftWhite from 'images/leftWhite.png';

/**
 * 左边具有按钮logo的UI 右边具有按钮 中间具有按钮UI控件
 * **/
export class TitleRow extends Component {

    //属性注释及类型,所有的属性对象都是句柄模式（类型时number），类似C语言中的指针
    static propTypes = {
        frameStyle:PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.object,
            PropTypes.array
        ]),//框样式

        icon:PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.string,
            PropTypes.object
        ]),//图片 所有
        iconStyle:PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.object,
            PropTypes.array
        ]),//图片样式
        iconLeft:PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.string,
            PropTypes.object
        ]),//图片 左边
        iconLeftStyle:PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.object,
            PropTypes.array
        ]),//图片样式 左边
        iconRight:PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.string,
            PropTypes.object
        ]),//图片 右边
        iconRightStyle:PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.object,
            PropTypes.array
        ]),//图片样式 右边
        textLeft:PropTypes.string,//按钮文字 左边
        textCenterTop:PropTypes.element,//中间文本 上部UI
        textCenter:PropTypes.string,//按钮文字 中边
        textCenterStyle:PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.object,
            PropTypes.array
        ]),//文本样式 中间
        textRight:PropTypes.string,//按钮文字 右边

        isShowIconLeft:PropTypes.bool,//是否显示左边图标 默认true，显示
        isShowIconRight:PropTypes.bool,//是否显示右边图标 默认true，显示
        isShowIconCenter:PropTypes.bool,//是否显示中间图标 默认true，显示

        onPressLeft:PropTypes.func,//左边边事件
        onPressCenter:PropTypes.func,//左边边事件 isDateUse为true则回传日期
        onPressRight:PropTypes.func,//右边事件

        isDateUse:PropTypes.bool,//是否启用日期选择功能(目前只有月份选择)，默认true 启用
        isDateToCur:PropTypes.bool,//是否日期到当前月 默认true 是
        dateFormat:PropTypes.string,//日期格式，默认'YYYY年MM月'
    }

    /**
     * 设置默认属性
     * **/
    static defaultProps = {
        isShowPillar:true,
        isShowIconLeft:true,
        isShowIconRight:true,
        isShowIconCenter:true,
        isDateUse:true,
        dateFormat:'YYYY年MM月',
        isDateToCur:true,
    }

    constructor(props) {
        super(props);

        this.curTimeObj = Tools.getTimeByRank(null,1);

        this.onPress.bind(this);

        this.state = {
            down:false,
            dateText:this.props.isDateUse&&Tools.timeFormatConvert(
                this.curTimeObj.time1,
                this.props.dateFormat)||null
        };
    }


    onPress(type){
        const {onPressLeft, onPressCenter, onPressRight,isDateUse,dateFormat,
            isShowIconCenter,isDateToCur} = this.props;
        switch (type){
            case 0:{
                if(isDateUse){
                    this.curTimeObj = Tools.getTimeByRank(this.curTimeObj.time1 - Tools.ONE_DAY_TIME,1);
                    onPressLeft&&onPressLeft(this.curTimeObj.time1);

                    let state = {
                        dateText:Tools.timeFormatConvert(this.curTimeObj.time1,dateFormat)
                    };
                    this.setState(state);
                }
                else{
                    onPressLeft&&onPressLeft();
                }

                break;
            }
            case 1:{
                isShowIconCenter&&this.setState({
                    down:!this.state.down
                });

                if(isDateUse)
                {
                    Tools.pickMonth(retJson =>{

                        let curTimeObj = Tools.getTimeByRank(
                            (new Date(retJson[0],retJson[1] - 1,1,0,0,0)).getTime(),
                            1);

                        if(isDateToCur && (curTimeObj.time1 > (new Date).getTime())){
                            return;
                        }

                        this.curTimeObj = curTimeObj;

                        /* this.selectValue.type3.startTime = Tools.timeFormatConvert(val,"YYYY-MM-DD HH:mm:ss");

                         let beginDate = new Date(val);
                         if(beginDate.getMonth() == 11)
                         {
                             val = (new Date(beginDate.getFullYear() + 1,0,1,0,0,0)).getTime();
                         }
                         else
                         {
                             val = (new Date(beginDate.getFullYear(), beginDate.getMonth() + 1,1,0,0,0)).getTime();
                         }

                         this.selectValue.type3.endTime = Tools.timeFormatConvert(val - 1000,"YYYY-MM-DD HH:mm:ss");*/
                        onPressCenter&&onPressCenter(this.curTimeObj.time1);

                        let state = {
                            dateText:Tools.timeFormatConvert(this.curTimeObj.time1,dateFormat)
                        };
                        isShowIconCenter&&(state.down = !this.state.down);
                        this.setState(state);
                    });
                }
                else {
                    onPressCenter&&onPressCenter();
                }

                break;
            }
            case 2:{
                if(isDateUse){
                    if(isDateToCur && (this.curTimeObj.time2 > (new Date).getTime())){
                        return;
                    }

                    this.curTimeObj = Tools.getTimeByRank(this.curTimeObj.time2 + Tools.ONE_DAY_TIME,1);

                    onPressRight&&onPressRight(this.curTimeObj.time1);

                    let state = {
                        dateText:Tools.timeFormatConvert(this.curTimeObj.time1,dateFormat)
                    };
                    this.setState(state);
                }
                else {
                    onPressRight&&onPressRight();
                }

                break;
            }
        }
    }

    getImage(type){
        const {icon,iconLeft,iconRight} = this.props;

        let image = ImageLeftWhite;
        if(type == 0){
            if(iconLeft){
                image = iconLeft;
            }
            else if(icon){
                image = icon;
            }
        }
        else {
            if(iconRight){
                image = iconLeft;
            }
            else if(icon){
                image = icon;
            }
        }

        return image;
    }

    render() {

        const {frameStyle,textLeft,textCenter,textRight,isShowIconLeft,
            isShowIconCenter,isShowIconRight,isDateUse,iconStyle,
            icon,iconLeft,iconRight,iconRightStyle,iconLeftStyle,
            textCenterStyle,textCenterTop} = this.props;

        const {down,dateText} = this.state;

        return(
            <View style={[styles.frameStyle,frameStyle]}>
                <View style={styles.frameStyle_1}>
                    <TouchableOpacity style={styles.frameStyle_1_1}
                                      activeOpacity={0}
                                      onPress={()=>this.onPress(0)}>
                        {
                            isShowIconLeft&&<Image source={this.getImage(0)}
                                                   style={[
                                                       styles.image,
                                                       icon||iconLeft
                                                           ? {}
                                                           : {
                                                               tintColor:Theme.Colors.minorColor,
                                                           },
                                                       iconStyle,
                                                       iconLeftStyle
                                                   ]}/>
                        }

                        {
                            textLeft
                            &&  <Text style={styles.frameStyle_1_text}>
                                {textLeft}
                            </Text>
                        }

                    </TouchableOpacity>
                </View>

                <View style={styles.frameStyle_2}>
                    <TouchableOpacity style={styles.frameStyle_1_2}
                                      activeOpacity={0}
                                      onPress={()=>this.onPress(1)}>
                        {
                            textCenterTop
                        }
                        <View style={styles.frameStyle_1_2_1}>
                            <Text style={[styles.frameStyle_2_text,textCenterStyle]}>
                                {isDateUse&&dateText||textCenter}
                            </Text>
                            {
                                isShowIconCenter&&<View style={styles.imageCenterFrame}>
                                    <Image source={ImageLeftWhite}
                                           style={[
                                               styles.image,
                                               styles.imageCenter,
                                               down&&styles.imageRight
                                           ]}/>
                                </View>
                            }
                        </View>

                    </TouchableOpacity>
                </View>

                <View style={styles.frameStyle_3}>
                    <TouchableOpacity style={styles.frameStyle_1_3}
                                      activeOpacity={0}
                                      onPress={()=>this.onPress(2)}>
                        {
                            textRight
                            && <Text style={styles.frameStyle_1_text}>
                                {textRight}
                            </Text>
                        }

                        {
                            isShowIconRight&&<Image source={this.getImage(1)}
                                                    style={[
                                                        styles.image,
                                                        styles.imageRight,
                                                        icon||iconRight
                                                            ? {}
                                                            : {
                                                                tintColor:Theme.Colors.minorColor,
                                                            },
                                                        iconStyle,
                                                        iconRightStyle
                                                    ]}/>
                        }

                    </TouchableOpacity>

                </View>
            </View>
        );


    }
}

const styles = StyleSheetAdapt.create({
    imageCenterFrame:{
        backgroundColor:Theme.Colors.themeColor,
        borderRadius:Theme.Font.fontSize,
        width:Theme.Font.fontSize + 5,
        height:Theme.Font.fontSize + 5,
        justifyContent:'center',
        alignItems: 'center',
    },
    imageCenter:{
        transform:[
            {rotateZ:'-90deg'}
        ],
        tintColor:Theme.Colors.foregroundColor,
        width:Theme.Font.fontSize,
        height:Theme.Font.fontSize,
    },
    imageRight:{
        transform:[
            {rotateY:'180deg'}
        ],
    },
    image:{
        width:Theme.Font.fontSize,
        height:Theme.Font.fontSize,
        resizeMode:'contain',
    },
    frameStyle_1_text:{
        color:Theme.Colors.minorColor,
        fontSize:Theme.Font.fontSize,
    },
    frameStyle_2_text:{
        color:Theme.Colors.themeColor,
        fontSize:Theme.Font.fontSize,
    },
    frameStyle_1_1:{
        flexDirection:'row',
        marginLeft:20,
        justifyContent:'center',
        alignItems: 'center',
    },
    frameStyle_1_2:{
        // flexDirection:'row',
        justifyContent:'center',
        alignItems: 'center',
    },
    frameStyle_1_2_1:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems: 'center',
    },
    frameStyle_1_3:{
        flexDirection:'row',
        marginRight:20,
        justifyContent:'center',
        alignItems: 'center',
    },
    frameStyle:{
        flexDirection:'row',
    },
    frameStyle_1:{
        flex:1,
        alignItems: 'flex-start',
        justifyContent:'center',
        // backgroundColor:'red',
    },
    frameStyle_2:{
        flex:1,
        justifyContent:'center',
        alignItems: 'center',
        flexDirection:'row',
        // backgroundColor:'blue',
    },
    frameStyle_3:{
        flex:1,
        alignItems: 'flex-end',
        justifyContent:'center',
        // flexDirection:'row',
        // backgroundColor:'green',
    },


});