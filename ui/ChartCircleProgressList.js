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
} from 'react-native';
import {
    StyleSheetAdapt,
    Theme,
    Tools,
} from "./../api/api";

import {ChartCircleProgress} from './ChartCircleProgress';
import {ItemRowTitle} from './ItemRowTitle';


/**
 * ChartCircleProgress列表 有title
 * **/
export class ChartCircleProgressList extends Component {

    //属性注释及类型,所有的属性对象都是句柄模式（类型时number），类似C语言中的指针
    static propTypes = {
        frameStyle:PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.object,
            PropTypes.array
        ]),//框样式

        title:PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number
        ]),//提示文本，
        /**
         成员：{
          title1Progress：int,//圆形图表进程
          titleCenter:"挑战",//圆形中心文本
          title1："完成进度"，//提示1文本
          title2："用时进度"//提示2文本
          titleBlockList:[],//提示块数组
          成员：{
                  textTop:PropTypes.string,//按钮文字 上边
                  textDown:PropTypes.string,//按钮文字 下边
                  textCenter:PropTypes.string,//按钮文字 中间
                  textRight:PropTypes.string,//按钮文字 右边
                  color:PropTypes.string,//textCenter的文本颜色，竖杠颜色
                }


          }
         * **/
        dataList:PropTypes.array,
    }

    /**
     * 设置默认属性
     * **/
    static defaultProps = {
        dataList:[],
        title:'业绩'
    }

    renderItem = (item,i)=>{
        return(
            <ChartCircleProgress key={i}
                                 titleBlockList={item.titleBlockList}
                                 title1Progress={item.title1Progress}
                                 titleCenter={item.titleCenter}
                                 title1={item.title1}
                                 title2={item.title2}/>
        );
    }

    render() {

        const {frameStyle,dataList,title} = this.props;

        return(
            <View style={[styles.frameStyle,frameStyle]}>
                <ItemRowTitle text1={title}
                              frameStyle={styles.titleFrame}/>
                <View style={styles.frameStyle_1}>
                    {
                        dataList.map(this.renderItem)
                    }
                </View>
            </View>
        );


    }
}

const styles = StyleSheetAdapt.create({
    titleFrame:{
        borderBottomColor:Theme.Colors.themeColor,
        borderBottomWidth:Theme.Border.borderWidth,
    },
    frameStyle_1:{
        flexDirection:'row',
        marginTop:10,
    },
    frameStyle:{
        backgroundColor:Theme.Colors.foregroundColor,
    },

});