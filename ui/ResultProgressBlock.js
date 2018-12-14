/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow TextInput自动提示输入
 */

import React, {Component} from 'react';
import PropTypes  from 'prop-types';
import {
    View,
    Image,
    Text,
} from 'react-native';
import {
    StyleSheetAdapt,
    Theme,
} from "./../api/api";
import {TextDoubleIcon} from './TextDoubleIcon';
import {ChartCircleProgress} from './ChartCircleProgress';
import {BarHorizontalTitleSection} from './BarHorizontalTitleSection';

import laughImg from './../res/laughImg.png';
import cryImg from './../res/cryImg.png';
import striveImg from './../res/striveImg.png';


/**
 * 业务进度块 类似于进度对比表，有显示的基本内容，还有条状的对比图
 * **/
export class ResultProgressBlock extends Component {

    //属性注释及类型,所有的属性对象都是句柄模式（类型时number），类似C语言中的指针
    static propTypes = {
        frameStyle:PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.object,
            PropTypes.array
        ]),//框样式
        progressCircle:PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number //默认是0
        ]),//圆形图表进度
        timeCircle:PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number //默认是0
        ]),//时间进度
        title1Circle:PropTypes.string,//圆形图表 头部提示1
        title2Circle:PropTypes.string,//圆形图表 头部提示2
        status:PropTypes.number,//判断业绩情况
        titleCenterCircle:PropTypes.string,//圆形图表 头部提示2
        titleLeft:PropTypes.string,//模块上部header左边文本
        titleRight:PropTypes.string,//模块title右边文本
        onPressTitleRight:PropTypes.func,//模块上部header右边按钮

        /**
         * {
             titleList:[{
                title:''，//提示文本
                color://,进度对比条color颜色 默认灰色

             }]//上部提示列

             sectionList:[//分块对比进度进度列
               {
                 title:'',//左边提示文本 无不显示
                 progressList:[//对比进度列
                 {
                    textRight:'',//进度对比条左边文本 null不显示
                    textLeft:'',//进度对比条右边边文本 null不显示
                    progress:0,//所占比值0～1 默认是1
                 }
                 ]
               }]

            }
         * **/
        options:PropTypes.object,

    }

    /**
     * 设置默认属性
     * **/
    static defaultProps = {
        progressCircle:0,
        options:{
            titleList:[],
            sectionList:[]
        },
        title1Circle:"完成进度",
        title2Circle:"用时进度",
        titleCenterCircle:"业绩",
        status:0,//默认完成
        titleRight:'查看更多',
        titleLeft:'业绩进度',
    }


    render() {

        const {frameStyle,progressCircle,titleCenterCircle,title1Circle
            ,title2Circle,timeCircle,status,options,titleRight,onPressTitleRight,titleLeft} = this.props;

        return(
            <View style={[styles.titlesInfoFrame1_2,frameStyle]}>
                <View style={styles.titlesInfoFrame1_1_1}>
                    <View style={styles.titlesInfoFrame1_1_1_1}></View>
                    <Text style={styles.titlesInfoFrame1_1_1_1_Text}>
                        {titleLeft}
                    </Text>
                    {
                        status == 0 ? <Image source={laughImg} style={styles.imageStyle}/> :
                            status == 1 ?  <Image source={cryImg} style={styles.imageStyle}/> :
                                status == 2 ?  <Image source={striveImg} style={styles.imageStyle}/> : null

                    }

                    {
                        onPressTitleRight&&<TextDoubleIcon textRight={titleRight}
                                                           onPress={onPressTitleRight}
                                                           style={styles.TextDoubleIcon1}
                                                           frameStyleRight={styles.TextDoubleIcon2}
                                                           textStyleRight={styles.TextDoubleIcon3}
                                                           icon={true}/>
                    }

                </View>

                <View style={styles.titlesInfoFrame1_2_2}>
                    <ChartCircleProgress title1Progress={progressCircle}
                                         title2Progress={timeCircle}
                                         title1={title1Circle}
                                         title2={title2Circle}
                                         titleCenter={titleCenterCircle}/>

                    <BarHorizontalTitleSection textRightProgressStyle={styles.textRightProgressStyle}
                                               options={options}/>

                </View>
            </View>
        );


    }
}

const styles = StyleSheetAdapt.create({

    imageStyle:{
        marginLeft:20,
        width:25,
        height:25,
    },
    textRightProgressStyle:{
        width:100,
    },

    titlesInfoFrame1_2_2:{
        flexDirection:'row',
        height:140,
    },
    TextDoubleIcon3:{
        padding:0,
        color:Theme.Colors.themeColor,
    },
    TextDoubleIcon2:{
        paddingRight:0
    },
    TextDoubleIcon1:{
        alignItems: 'flex-start',
        // justifyContent:'center',
        borderBottomWidth:0,
        flex:1,
        padding:0,
    },
    titlesInfoFrame1_2:{
        flex:3,
        backgroundColor:Theme.Colors.foregroundColor,
    },
    titlesInfoFrame1_1_1:{
        margin:10,
        flexDirection:'row',
        paddingBottom:10,
        borderBottomWidth:1,
        borderBottomColor:Theme.Colors.themeColor,
    },
    titlesInfoFrame1_1_1_1:{
        width:5,
        // height:30,
        backgroundColor:Theme.Colors.themeColor,
    },
    titlesInfoFrame1_1_1_1_Text:{
        fontSize:Theme.Font.fontSize,
        marginLeft:20,
    },
});