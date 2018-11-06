import React, {Component} from 'react';
import PropTypes  from 'prop-types';
import {
    View,
    Text,
} from 'react-native';
import {
    StyleSheetAdapt,
    Theme,
} from "./../api/api";
import {ResultProgressBlock} from './ResultProgressBlock';
import {BarHorizontalTitleSection} from './BarHorizontalTitleSection';
import {TitleBlockList} from './TitleBlockList';

/**
 * 区域模块 上部有header文本 中间有ResultProgressBlock（业绩进度模块）
 * 下边有TitleBlock文本提示(下左)和BarHorizontalTitleSection（对比进程 下右）
 * **/
export class TitleBlockTargetArea extends Component {

//属性注释及类型,所有的属性对象都是句柄模式（类型时number），类似C语言中的指针
    static propTypes = {
        frameStyle:PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.object,
            PropTypes.array
        ]),//框样式

        status:PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number //默认是0
        ]),
        title:PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number //默认是0
        ]),//头部header提示文本
        progressCircle:PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number //默认是0
        ]),//圆形图表进度
        timeCircle:PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number //默认是0
        ]),//时间进度
        onPressTitleRight:PropTypes.func,//模块上部header右边按钮
        /**
         成员： {
                    textRight:'',//进度对比条左边文本 null不显示
                    textLeft:'',//进度对比条右边边文本 null不显示
                    progress:0,//所占比值0～1 默认是1
                    colors1:'',//颜色值，默认灰色
                 }
         * **/
        progressResultList:PropTypes.array,//上部进度对比数组（圆形图表进度 右边）

        /**
         成员： {
                    title:'',//头部header提示文本
                    progressList:[//进程对比数组 下部行左边
                           {
                                textRight:'',//进度对比条左边文本 null不显示
                                textLeft:'',//进度对比条右边边文本 null不显示
                                progress:0,//所占比值0～1 默认是1
                                colors1:'',//颜色值，默认灰色
                           }
                    ]，

                    titleBlockList:[
                          {
                               textTop:PropTypes.string,//按钮文字 上边
                               textDown:PropTypes.string,//按钮文字 下边
                               textCenter:PropTypes.string,//按钮文字 中间
                               textRight:PropTypes.string,//按钮文字 右边
                          }
                    ]
               }
         * **/
        progressTargetList:PropTypes.array,//数据数组

    }


    /**
     * 设置默认属性
     * **/
    static defaultProps = {
        progressResultList:[],
        progressTargetList:[],
    }

    constructor(props) {
        super(props);

    }

    renderItem = (item,i)=>{
        return(
            <View key={i}
                  style={styles.titleProgressFrame}>
                <View>
                    <Text style={styles.titleProgressText}>
                        {item.title}
                    </Text>
                </View>

                <View style={styles.targetFrame}>

                    <BarHorizontalTitleSection frameStyle={styles.targetProgressFrame}
                                               options={{
                                                   sectionList:[
                                                       {
                                                           progressList:item.progressList
                                                       }
                                                   ]
                                               }} />

                    <TitleBlockList frameStyle={styles.targetTitleFrame}
                                    verticalBarStyle={styles.verticalBarStyle}
                                    textFrame={styles.textFrame}
                                    textStyle={styles.tBTextStyle}
                                    textCenterStyle={styles.tBTextCenterStyle}
                                    dataList={item.titleBlockList}/>
                </View>
            </View>
        );
    }

    render() {
        const {frameStyle,progressResultList,onPressTitleRight,progressCircle,
            title,status,progressTargetList,timeCircle} = this.props;


        return (
            <View style={[styles.frameStyle,frameStyle]}>
                <ResultProgressBlock progressCircle={progressCircle}
                                     timeCircle={timeCircle}
                                     frameStyle={styles.resultFrame}
                                     titleLeft={title}
                                     status={status}
                                     options={{
                                         sectionList:[
                                             {
                                                 progressList:progressResultList
                                             }
                                         ]
                                     }}
                                     onPressTitleRight={onPressTitleRight}/>
                {
                    progressTargetList.map(this.renderItem)
                }

            </View>
        );
    }
}

const styles = StyleSheetAdapt.create({
    titleProgressFrame:{
        paddingTop:5,
        paddingBottom:5,
        marginTop:5,
        marginLeft:5,
        marginRight:5,
        borderTopColor:Theme.Colors.themeColor,
        borderTopWidth:Theme.Border.borderWidth,
    },
    titleProgressText:{
        fontSize:Theme.Font.fontSize_1,
        color:Theme.Colors.themeColor,
        marginLeft:20,
    },

    tBTextCenterStyle:{
        fontSize:Theme.Font.fontSize1,
    },
    tBTextStyle:{
        fontSize:Theme.Font.fontSize_2,
    },
    textFrame:{
        marginLeft:15,
    },
    verticalBarStyle:{
        marginLeft:5,
    },

    targetProgressFrame:{
        flex:2,
        // backgroundColor:'red',
    },
    targetTitleFrame:{
        flex:3,
    },
    targetFrame:{
        flexDirection:'row',
    },

    resultFrame:{
        backgroundColor:Theme.Colors.transparent,
    },

    frameStyle: {
        backgroundColor:Theme.Colors.foregroundColor,
        // flex:1,
        // alignItems:'center',
        // justifyContent:'center',
        // flexDirection:'row',
    },

});