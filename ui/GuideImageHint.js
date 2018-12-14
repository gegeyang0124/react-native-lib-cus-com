/**
 * Created by Administrator on 2018/5/6.
 */
import React, {Component} from 'react';
import PropTypes  from 'prop-types';
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
} from 'react-native';

import {
    StyleSheetAdapt,
    Theme,
    Tools,
} from "./../api/api";
import {ImageBg} from './ImageBg';

import ImageIconTaskGuide from "./../res/iconTaskGuide.png";
import ImageIconTaskGuidePast from "./../res/iconTaskGuidePast.png";
import ImageIconTaskGuideActive from "./../res/iconTaskGuideActive.png";
import ImageIconTaskGuideFinish from "./../res/iconTaskGuideFinish.png";
import ImageIconTaskGuideFinishActive from "./../res/iconTaskGuideFinishActive.png";

import ImageIconTaskGuideSquare from "./../res/iconTaskGuideSquare.png";
import ImageIconTaskGuideSquarePast from "./../res/iconTaskGuideSquarePast.png";
import ImageIconTaskGuideSquareActive from "./../res/iconTaskGuideSquareActive.png";

/**
 * 任务头部水平提示导航栏
 * **/
export class GuideImageHint extends Component {

    //属性注释及类型,所有的属性对象都是句柄模式（类型时number），类似C语言中的指针
    static propTypes = {
        frameStyle:PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.object,
            PropTypes.array
        ]),//外部框样式
        frameImageListStyle:PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.object,
            PropTypes.array
        ]),//内部部框样式
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
        onPress:PropTypes.func,//点击事件 回传(item,i) item：数组成员，i：数组地址
        iconType:PropTypes.string,//图片类型（"circle","square"）默认是："circle"
        isScroll:PropTypes.bool,//是否可以滚动 默认false 不能滚动

        /*icon:PropTypes.oneOfType([
         PropTypes.number,
         PropTypes.string
         ]),//一般状态logo，//图片/网络图片地址
         iconActive:PropTypes.oneOfType([
         PropTypes.number,
         PropTypes.string
         ]),//激活状态logo，//图片/网络图片地址
         iconPast:PropTypes.oneOfType([
         PropTypes.number,
         PropTypes.string
         ]),//过去状态，logo，//图片/网络图片地址*/
        /*color:PropTypes.string,//一般状态logo颜色
         colorActive:PropTypes.string,//激活状态logo颜色，
         colorPast:PropTypes.string,//过去状态，logo颜色，*/

        /**
         * 成员：{
           icon:''，一般状态logo，//图片/网络图片地址
           // iconActive:'',//激活状态logo，//图片/网络图片地址
           // iconPast:'',//过去状态，logo，//图片/网络图片地址
           color：''，//一般状态logo颜色，
           // colorActive:'',//激活状态logo颜色，
           // colorPast:'',//过去状态，logo颜色，
           text:'',//显示文字
           status:0,//0：一般状态，-1：过去状态，1：激活状态，2：完成状态; 默认为0
           }
         * **/
        dataList:PropTypes.array,//图片配置数组
    };

    /**
     * 设置默认属性
     * **/
    static defaultProps = {
        // iconPast:ImageIconTaskGuidePast,
        // iconActive:ImageIconTaskGuideActive,
        // icon:ImageIconTaskGuide,
        iconType:"circle",
        isScroll:false,
    };

    renderItem = (item,i)=>{
        // alert(JSON.stringify(item))
        const {iconStyle,textStyle,dataList,onPress,iconType} = this.props;
        const style = iconType == "circle" ? i == 0 ?
            styles.iconStyleLeft : dataList.length == (i + 1) ?
                styles.iconStyleFinish :
                {}
            : {};
        const textColor = item.status == undefined || item.status == 0 ?
            {} :
            {
                color:item.status == -1 ?
                    Theme.Colors.themeColor :
                    Theme.Colors.appRedColor

            };

        let icon = null;
        if(item.icon == undefined) {
            if(iconType == "circle"){
                if(dataList.length == (i + 1))
                {
                    if(item.status == undefined || item.status == 0) {
                        icon = ImageIconTaskGuideFinish;
                    }
                    else {
                        icon = ImageIconTaskGuideFinishActive;
                    }
                }
                else if(item.status == undefined || item.status == 0) {
                    icon = ImageIconTaskGuide;
                }
                else if(item.status == -1){
                    icon = ImageIconTaskGuidePast;
                }
                else if(item.status == 1){
                    icon = ImageIconTaskGuideActive;
                }
            }
            else {
                if(item.status == undefined || item.status == 0) {
                    icon = ImageIconTaskGuideSquare;
                }
                else if(item.status == -1){
                    icon = ImageIconTaskGuideSquarePast;
                }
                else if(item.status == 1){
                    icon = ImageIconTaskGuideSquareActive;
                }
            }
        }
        else
        {
            icon = item.icon;
        }

        const IMG = <ImageBg key={i}
                           source={icon}
                           style={[styles.iconStyle,style,iconStyle]} >
            <Text style={[
                styles.textStyle,
                textColor,
                dataList.length == (i + 1) ?
                    styles.textStyleFinish :
                    {},
                textStyle
            ]}>
                {item.text}
            </Text>
        </ImageBg>;

        return(
            onPress&&<TouchableOpacity key={"t" + i}
                                       onPress={()=>onPress&&onPress(item,i)}>
                {IMG}
            </TouchableOpacity> || IMG
        );
    };

    getImageFrame(){
        const {iconStyle,dataList} = this.props;
        const style1 = Tools.getStyle(styles.iconStyle);
        const style2 = Tools.getStyle(iconStyle);
        let style = {
            width: style1.height,
            height:style2.height == undefined ? style1.height : style2.height
        };
        style.width = style.height * dataList.length;

        return style;

    }

    render() {

        // const {frameStyle,dataList} = this.props;
        const {frameStyle,dataList,frameImageListStyle,isScroll} = this.props;
        const guideFrame_1 = this.getImageFrame();

        return (
            <View style={[styles.guideFrame,frameStyle]}>

                {
                    isScroll
                    && <ScrollView style={[frameImageListStyle]}>
                        {
                            dataList.map(this.renderItem)
                        }
                    </ScrollView>
                    || <View style={[styles.guideFrame_1,guideFrame_1,frameImageListStyle]}>
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
    guideFrame:{
        // flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:Theme.Colors.foregroundColor,
    },
    guideFrame_1:{
        // flex:1,
        // height:100,
        // width:400,
        // backgroundColor:'yellow',
        flexDirection:'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    guideFrame_1_1:{
        flex:1,
        // backgroundColor:'blue',
        // height:100,
        // width:100,
    },
    iconStyle:{
        width:100,
        height:'100dw',
        marginRight:10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconStyleLeft:{
        marginLeft:10,
    },
    iconStyleFinish:{
        height:100 * 180 / 216 + "dw",
        width:100 * 180 / 216,
    },
    textStyle:{
        fontSize:Theme.Font.fontSize_1,
        marginRight:15,
    },
    textStyleFinish:{
        marginRight:0,
    },
});