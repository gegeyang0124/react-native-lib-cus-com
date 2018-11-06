import React, {Component} from 'react';
import PropTypes  from 'prop-types';
import {
    View,
} from 'react-native';
import {
    StyleSheetAdapt,
    Theme,
} from "./../api/api";
import {TitleBlockList} from "./TitleBlockList";
import {ItemRowTitle} from "./ItemRowTitle";
import {TitleBlock} from "./TitleBlock";
import {BarHorizontalTitleSection} from './BarHorizontalTitleSection';

/**
 * 目标幕模块 上部有header文本 中间有TitleBlockList
 * 下边有TitleBlock文本提示(下左)和BarHorizontalTitleSection（对比进程 下右）
 * **/
export class TitleBlockTarget extends Component {

//属性注释及类型,所有的属性对象都是句柄模式（类型时number），类似C语言中的指针
    static propTypes = {
        frameStyle:PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.object,
            PropTypes.array
        ]),//框样式

        title:PropTypes.string,//头部header提示文本
        // onPress:PropTypes.func,//图片点击事件 回传（成员，index）
        /**
         成员：{
          textDown:PropTypes.string,//按钮文字 下边
          textCenter:PropTypes.string,//按钮文字 中间
          textRight:PropTypes.string,//按钮文字 右边
          }
         * **/
        titleBlockList:PropTypes.array,//数据
        /**
         成员： {
                    textTop:PropTypes.string,//按钮文字 上边
                    textDown:PropTypes.string,//按钮文字 下边
                    textCenter:PropTypes.string,//按钮文字 中间
                    textRight:PropTypes.string,//按钮文字 右边
                    color:PropTypes.string,//textCenter的文本颜色，竖杠颜色
                 }
         * **/
        titleBlockOptions:PropTypes.object,//数据对象 下边有TitleBlock文本提示 不传不显示
        /**
         成员： {
                    textRight:'',//进度对比条左边文本 null不显示
                    textLeft:'',//进度对比条右边边文本 null不显示
                    progress:0,//所占比值0～1 默认是1
                 }
         * **/
        progressList:PropTypes.array,// 进度对比条数组 底部
        /**
         成员： {
                    textRight:'',//进度对比条左边文本 null不显示
                    textLeft:'',//进度对比条右边边文本 null不显示
                    progress:0,//所占比值0～1 默认是1
                 }
         * **/
        progressTopList:PropTypes.array,//进度对比条数组 顶部
        children:PropTypes.object,//子UI 支持
        textCenterBlockStyle:PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.object,
            PropTypes.array
        ]),//TitleBlockList 中间文本样式
        textBlockStyle:PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.object,
            PropTypes.array
        ]),//TitleBlockList 文本样式
    }

    /**
     * 设置默认属性
     * **/
    static defaultProps = {
        isScroll:false,

    }

    constructor(props) {
        super(props);

    }

    render() {
        const {frameStyle,title,titleBlockList,titleBlockOptions,progressList,
            progressTopList,children,textCenterBlockStyle,textBlockStyle} = this.props;


        return (
            <View style={[styles.frameStyle,frameStyle]}>
                <ItemRowTitle text1={title}
                              frameStyle={styles.titleFrame}
                              isShowPillar={false}/>

                {
                    progressTopList&&<BarHorizontalTitleSection options={{
                        sectionList:[
                            {
                                progressList:progressTopList
                            }
                        ]
                    }} frameBarStyle={styles.bHTSFrame2}/>
                }



                <TitleBlockList frameStyle={styles.titleBLFrame}
                                textCenterStyle={textCenterBlockStyle}
                                textStyle={textBlockStyle}
                                dataList={titleBlockList}/>

                {
                    (titleBlockOptions||progressList)&&<View style={styles.perDown}>
                        {
                            titleBlockOptions&&<TitleBlock isShowIconLeft={false}
                                                           textCenter={titleBlockOptions.textCenter}
                                                           textRight={titleBlockOptions.textRight}
                                                           textDownStyle={styles.textTB}
                                                           textDown={titleBlockOptions.textDown}/>
                        }

                        {
                            progressList&&<BarHorizontalTitleSection options={{
                                sectionList:[
                                    {
                                        progressList:progressList
                                    }
                                ]
                            }} frameStyle={styles.bHTSFrame}/>
                        }


                    </View>
                }

                {children}
            </View>
        );
    }
}

const styles = StyleSheetAdapt.create({
    bHTSFrame2:{
        flexDirection:'row',
    },
    bHTSFrame:{
        flex:3,
        borderLeftWidth:Theme.Border.borderWidth,
        borderLeftColor:Theme.Colors.themeColor,
    },
    perDown:{
        flexDirection:'row',
        marginTop:10,
        marginBottom:10,
    },

    textTB:{
        fontSize:Theme.Font.fontSize,
        color:Theme.Colors.fontcolor,
    },

    titleBLFrame:{
        paddingTop:10,
        paddingBottom:10,
    },

    titleFrame:{
        borderBottomColor:Theme.Colors.themeColor,
        borderBottomWidth:Theme.Border.borderWidth,
        marginLeft:10,
        marginRight:10,
    },

    frameStyle: {
        backgroundColor:Theme.Colors.foregroundColor,
        // flex:1,
        // alignItems:'center',
        // justifyContent:'center',
        // flexDirection:'row',
    },

});