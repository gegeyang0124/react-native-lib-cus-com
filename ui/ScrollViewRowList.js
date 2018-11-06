/**
 * Created by Administrator on 2018/4/30.
 */
import PropTypes  from 'prop-types';
import React, {Component} from 'react';
import {
    View,
    Text,
    ScrollView,
} from 'react-native';
import {
    StyleSheetAdapt,
    Tools,
    Theme,
} from "../api/api";

import {TextIcon} from "./TextIcon";
import {ItemRowTitle} from "./ItemRowTitle";
import {TextIconBg} from "./TextIconBg";

export class ScrollViewRowList extends Component{

    //属性注释及类型,所有的属性对象都是句柄模式（类型时number），类似C语言中的指针
    static propTypes = {
        frameStyle:PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.object,
            PropTypes.array
        ]),//按钮框样式
        imageFrameStyle:PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.object,
            PropTypes.array
        ]),//按钮框样式
        iconStyle:PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.object,
            PropTypes.array
        ]),//图片样式
        text: PropTypes.string,//标题文本
        /**
         * 成员：{
            progress://进度  若有数字则显示 无此字段、null、undefind则不显示
            icon:'',//图片
            text：''//显示文本
            imageFrameStyle:'',//logok框样式
            iconToast://提示图片
            textToast://提示文本
           }
         * **/
        dataList:PropTypes.array,//数组列
        isScroll:PropTypes.bool,//是否滚动
        isHorizontal:PropTypes.bool,//是否水平排布，默认true水平
        /**
         * 点击事件 回传（item，i）；点击项所有数据item，和数组下标i
         * **/
        onPress:PropTypes.func,//点击事件
        isProgress:PropTypes.bool,//是否显示加载 默认是true
    };

    /**
     * 设置默认属性
     * **/
    static defaultProps = {
        isScroll:true,
        isHorizontal:true,
        isProgress:true,
        dataList:[]
    }

    renderItem = (items, index) => {
        const {onPress,imageFrameStyle,isProgress,iconStyle} = this.props;
        return (
            items.progress != undefined && isProgress
                ?  <TextIconBg key={index}
                               style={styles.iconView}
                               frameStyle={[imageFrameStyle,items.imageFrameStyle]}
                               icon={items.icon}
                               iconStyle={[styles.iconViewIcon,iconStyle,items.iconStyle]}
                               text={items.text}
                               progress={items.progress}
                               textStyle={styles.iconViewText}
                               onPress={()=>items.onPress&&items.onPress(items,index)||onPress&&onPress(items,index)}/>

                : <TextIcon key={index}
                            iconToast={items.iconToast}
                            textToast={items.textToast}
                            style={styles.iconView}
                            frameStyle={[imageFrameStyle,items.imageFrameStyle]}
                            icon={items.icon}
                            iconStyle={[styles.iconViewIcon,iconStyle]}
                            text={items.text}
                            textStyle={styles.iconViewText}
                            onPress={()=>items.onPress&&items.onPress(items,index)||onPress&&onPress(items,index)}/>

        )

    }

    render() {

        const {isScroll,dataList,frameStyle,isHorizontal,text} = this.props;

        return (
            <View style={[styles.scrollRowStyle,frameStyle]}>
                {/*  <Text style={styles.scrollTitleStyle}>
                    {text}
                </Text>*/}
                {
                    text&& <ItemRowTitle text1={text}
                                         frameStyle={styles.titleFrame}/>
                }


                {
                    isScroll
                        ? <ScrollView horizontal={isHorizontal}
                                      scrollEnabled={false}>
                            {
                                dataList.map(this.renderItem)
                            }
                        </ScrollView>
                        : <View style={[styles.frameStyle_2,{flexDirection:isHorizontal ? 'row' : 'column'}]}>
                            {
                                dataList.map(this.renderItem)
                            }
                        </View>
                }

            </View>
        );
    }
}

const styles = StyleSheetAdapt.create({
    titleFrame:{
        borderBottomWidth:Theme.Border.borderWidth,
        borderBottomColor:Theme.Colors.themeColor,
        marginLeft:-10,
        // marginBottom:10,
    },
    scrollRowStyle: {
        // borderBottomWidth: 1,
        // borderColor: 'rgba(00, 00, 00, 0.8)',
        // borderStyle: 'dashed',
        // paddingBottom: 10,
    },
    scrollTitleStyle: {
        marginLeft: 20,
        marginTop: 10,
        fontSize:25,
        marginBottom:10,
    },
    iconView: {
        flex:1,
        flexDirection: 'column',
        //backgroundColor: "yellow",
        /*  margin: 20,
          marginBottom: 0,
          marginTop: 0,*/
        height:230,
        alignItems: "center",
        justifyContent: "center",
    },
    iconViewIcon: {
        width: 100,
        height: 100,
        // tintColor:"#FF6B01",
    },
    iconViewText: {
        //padding: 0,
        marginTop:Tools.platformType ? 5 : -10,
        //paddingTop:5,
        fontSize: Theme.Font.fontSize,
    },

    frameStyle_2:{

    },
});
