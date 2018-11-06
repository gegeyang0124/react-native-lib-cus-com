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
} from 'react-native';
import {
    StyleSheetAdapt,
    Theme,
    Tools,
} from "./../api/api";

import {ItemRowSwitch} from "./ItemRowSwitch";
import {ItemRowGuideTripApply} from "./ItemRowGuideTripApply";

/**
 * 具有ItemRowTitle提示的下拉展示控件框
 * **/
export class ItemRowTableSwitch extends Component {

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
        ]),//头部显示文本

        /**
         成员：{
             text1:'',//  文本
             text2:'',//  文本
             text3:'',//  文本
             text4:'',//  文本
          }
         * **/
        dataList:PropTypes.array,//元素
    }

    constructor(props) {
        super(props);

    }


    /**
     * 设置默认属性
     * **/
    static defaultProps = {
        dataList:[],
    }

    renderItem = (item,i)=>{
        return(
            <ItemRowGuideTripApply key={i}
                                   textStyle={styles.itemRowText}
                                   frameStyle={styles.tableFrame}
                                   text3={item.text1}
                                   text4={item.text2}
                                   text5={item.text3}
                                   text6={item.text4}
                                   text2={false}
                                   text7={false}
                                   text1={false}/>
        );
    }

    render() {

        const {frameStyle,title,dataList} = this.props;


        return(
            <ItemRowSwitch frameStyle={[styles.frameStyle,frameStyle]}
                           titleFrameStyle={styles.titleFrameStyle}
                           isShowPillar={true}
                           isShowChildrenDefault={true}
                           textHeaderLeft={title}>

                {
                    dataList.map(this.renderItem)
                }

            </ItemRowSwitch>
        );


    }
}

const styles = StyleSheetAdapt.create({
    titleFrameStyle:{
        backgroundColor:Theme.Colors.foregroundColor,
    },
    frameStyle:{
        backgroundColor:Theme.Colors.foregroundColor,
    },


});