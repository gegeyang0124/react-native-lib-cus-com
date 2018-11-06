/**
 * Created by Administrator on 2018/6/18.
 */
import React, {Component} from 'react';
import PropTypes  from 'prop-types';
import {
    View,
} from 'react-native';
import {
    StyleSheetAdapt,
    Theme,
} from "./../api/api";
import {TextChange} from "./TextChange";
import {VideoView} from "./VideoView";

/**
 * 可以查看图片，成行排列 每张图片下部可以有提示文字
 * **/
export class VideoList extends Component {

    //属性注释及类型,所有的属性对象都是句柄模式（类型时number），类似C语言中的指针
    static propTypes = {
        frameStyle:PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.object,
            PropTypes.array
        ]),//按钮框样式
        iconStyle:PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.object,
            PropTypes.array
        ]),//图片样式
        textStyle:PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.object,
            PropTypes.array
        ]),//文本样式
        isShowImage:PropTypes.bool,//是否启用查看大图，默认启用true
        text:PropTypes.string,//底部文本
        onPressText:PropTypes.func,//文本点击  回传（成员，index）
        onPress:PropTypes.func,//图片点击事件 回传（成员，index）
        /**
         成员：{
          text:'',文本，
          uri:'',视频
          }
         或视频路径
         * **/
        dataList:PropTypes.array,//按钮数组
        renderImageBottom:PropTypes.func,//image底部显示UI回调函数，回传成员和数组地址
    }

    /**
     * 设置默认属性
     * **/
    static defaultProps = {
        dataList:[],
        isShowImage:true,
    }

    constructor(props) {
        super(props);

        this.imageList = [];

    }


    renderImageBottom = (item,i)=>{

        const {textStyle,onPressText,text} = this.props;
        // "签到地址:广东省广州市珠江东路6号\n签到时间:2018-06-25 15:33:33"
        return(
            <View style={styles.iconFrame_1}>

                <TextChange text={text||item.text}
                            onPress={()=>onPressText&&onPressText(item,i)}
                            textStyle={[styles.textStyle,textStyle]}/>
            </View>
        );
    }

    renderItem = (item,i)=>{
        const {iconStyle,dataList,renderImageBottom,isShowImage,onPress} = this.props;
        const uri = typeof(item.uri) == 'number'
            ? item.uri
            : typeof(item.uri) == 'string'
                ? {uri:item.uri}
                : item;
        return(
            <View key={i}
                  style={[styles.iconFrame,i == (dataList.length - 1) ? styles.iconFrameRight : {}]}>

                <VideoView source={uri}
                           style={[styles.iconStyle,iconStyle]}
                           onPress={()=>{
                               onPress&&onPress(item,i);
                           }}/>
                {
                    renderImageBottom&&renderImageBottom(item,i)||this.renderImageBottom(item,i)
                }
            </View>
        );
    }

    getDataList(){
        const {dataList} = this.props;
        let d = [];
        let imageList = [];
        dataList.forEach((v,i,a)=>{
            if(typeof v == 'string' || typeof v == 'number'){
                imageList.push(v);
                d.push({uri:v});
            }
            else {
                d.push(v);
                imageList.push(v.uri);
            }
        });
        this.imageList = imageList;

        return d;
    }

    render() {
        const {frameStyle} = this.props;

        const dataList = this.getDataList();

        return (
            <View style={[styles.frameStyle,frameStyle]}>
                {
                    dataList.map(this.renderItem)
                }
            </View>
        );
    }
}

const styles = StyleSheetAdapt.create({
    frameStyle: {
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        flexDirection:'row',
    },
    iconFrame:{
        // flex:1,
        alignItems:'center',
        justifyContent:'center',
        marginLeft:10,
        // backgroundColor:'yellow'
    },
    iconFrameRight:{
        marginRight:10,
    },
    iconStyle:{
        width:250,
        height:'250dw',
    },
    iconFrame_1:{
        alignItems:'center',
        justifyContent:'flex-end',
        marginBottom:10,
        flexDirection:'column',
    },
    textStyle:{
        fontSize:Theme.Font.fontSize_2,
    }
});