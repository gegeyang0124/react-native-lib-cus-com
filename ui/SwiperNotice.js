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
} from "../api/api";
import {ImageBg} from './ImageBg';

const RN = require('react-native');
const Img = RN.Image;

import Swiper from 'react-native-swiper';

/**
 * 主页公告轮播
 * **/
export class SwiperNotice extends Component{

    //属性注释及类型,所有的属性对象都是句柄模式（类型时number），类似C语言中的指针
    static propTypes = {
        /**
         * 成员，item = {
           icon:'',//图片地址或require图片
           onPress:func,//回调事件
           title:'',//标题
           content:'',//内容
           author:'',//发布人
           time:'',//时间
         }
         * **/
        dataList:PropTypes.array,//数据数组
        onPressSwiper:PropTypes.func,//Swiper点击事件
    }

    /**
     * 设置默认属性
     * **/
    static defaultProps = {
        dataList:[],
    }

    renderView(item,index) {
        return(
            <TouchableOpacity key={index}
                              onPress={()=>item.onPress(item,index)}
                              style={styles.titlesInfo}>

                <ImageBg source={
                    typeof(item.icon) == "string"
                        ? {uri:item.icon}
                        : item.icon
                }
                       style={styles.noticeImg}
                       imageStyle={{resizeMode:"stretch"}} >
                    <Text style={styles.noticeToastText}>
                        <Text style={styles.noticeToastTitle}>
                            【{item.title}】
                        </Text>
                        {item.content}
                    </Text>
                    <View style={styles.noticeToastTimeFrame}>
                        <View style={styles.noticeToastH}></View>
                        <Text style={[styles.noticeToastTitle,styles.noticeToastTime]}>
                            {item.time}
                        </Text>
                    </View>
                </ImageBg>

            </TouchableOpacity>
        );


        return(
            <TouchableOpacity key={index}
                              onPress={()=>item.onPress(item,index)}
                              style={styles.titlesInfo}>

                <View style={styles.titlesInfo_1}>
                    <Img source={
                        typeof(item.icon) == "string"
                            ? {uri:item.icon}
                            : item.icon
                    }
                           style={styles.titlesInfoIcon}/>

                </View>

                <View style={styles.titlesInfo_2}>
                    <View>
                        <Text style={styles.titlesInfo_2_title}>
                            {item.title}
                        </Text>
                        <Text style={styles.titlesInfo_2_cnt}>
                            {item.content}
                        </Text>
                    </View>
                    <View style={styles.titlesInfo_2_2}>
                        <Text style={styles.titlesInfo_2_cnt}>
                            {item.author}
                        </Text>
                        <Text style={styles.titlesInfo_2_cnt}>
                            {item.time}
                        </Text>
                    </View>
                </View>

            </TouchableOpacity>
        );

    }

    render () {

        if(this.props.dataList.length > 0)
        {
            let dataList = [];
            this.props.dataList.forEach((val,i,arr)=>{
                dataList.push(this.renderView(val,i));
            });

            return (
                <Swiper horizontal={true}
                        height={StyleSheetAdapt.getHeight(styleV.noticeImg.height)}
                        loop={true}
                        paginationStyle={styles.paginationStyle}
                        autoplayTimeout={2}
                        autoplay={ true }>
                    {
                        dataList.map(value=>value)
                    }
                </Swiper>
            );
        }
        else
        {
            return(null);
        }
    }
}

const styleV = {
    noticeToastTimeFrame:{
        flexDirection:'row',
        alignItems:'center',
        // justifyContent:'center',
        paddingLeft:30,
    },
    noticeToastH:{
        borderBottomColor:Theme.Colors.activeBtnColor,
        borderBottomWidth:Theme.Border.borderWidth2,
        width:60,
    },
    noticeToastTime:{
        fontSize:Theme.Font.fontSize_2,
        marginLeft:20,
    },
    noticeToastTitle:{
        color:Theme.Colors.activeBtnColor,
    },
    noticeToastText:{
        fontSize:Theme.Font.fontSize,
        color:Theme.Colors.foregroundColor,
        margin:10,
    },
    noticeImg:{
        width:'w',
        height:300,
    },


    titlesInfoFrame:{
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:Theme.Colors.foregroundColor,
        marginTop:10,
    },
    titlesInfoFrame_1:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'flex-end',
        marginTop:0,
    },
    titlesInfoNoticeIcon:{
        alignItems:'center',
        justifyContent:'center',
        width:200,
        height:60,
        marginTop:10,
    },
    titlesInfoNoticeIcon2:{
        resizeMode:"contain",
        marginTop:-25,
        width:'w',
    },
    titlesInfoNoticeText: {
        fontSize: Theme.Font.fontSize1,
        color:Theme.Colors.colorFontBtn,
        marginRight:30,
        fontWeight:'bold',
    },
    titlesInfo:{
        flex: 1,
        // marginTop:20,
        flexDirection:'row',
    },
    titlesInfo_1:{
        flex:1,
        // backgroundColor:'yellow',
        alignItems:'center',
        justifyContent:'center',
    },
    titlesInfo_2:{
        flex:2,
        // backgroundColor:'red',
    },
    titlesInfo_2_2:{
        alignItems:'flex-end',
        justifyContent:'center',
        marginRight:20,
    },
    titlesInfo_2_title:{
        color:Theme.Colors.themeColor,
        fontSize: Theme.Font.fontSize1,
    },
    titlesInfo_2_cnt:{
        marginTop:5,
        fontSize: Theme.Font.fontSize_1,
        color:Theme.Colors.minorColor,
    },
    titlesInfoIcon:{
        resizeMode:'contain',
        width:200,
        height:200,
    },
    paginationStyle:{
        left:300,
    },
};
const styles = StyleSheetAdapt.create(styleV);