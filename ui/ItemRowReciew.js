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
} from 'react-native';
import {
    StyleSheetAdapt,
    Theme,
} from "./../api/api";

/**
 * 多个ui平分一行 水平
 * **/
export class ItemRowReciew extends Component {

    //属性注释及类型,所有的属性对象都是句柄模式（类型时number），类似C语言中的指针
    static propTypes = {
        frameStyle:PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.object,
            PropTypes.array
        ]),//框样式
        text1Style1:PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.object,
            PropTypes.array
        ]),//文本1样式
        text1Style2:PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.object,
            PropTypes.array
        ]),//文本2样式
        /**
         * 成员：{
           text1:'',//文本1 左或上
           text2:'',//文本2 右或下
          }
         * **/
        dataList:PropTypes.array,//数据源数组
    }



    /**
     * 设置默认属性
     * **/
    static defaultProps = {
        dataList:[],
    }


    renderItem = (item,i)=>{
        const {text1Style1,text1Style2} = this.props;
        return (
            <View key={i}
                  style={styles.frameStyle_1}>
                <Text style={[styles.text1,text1Style1]}>
                    {item.text1}
                </Text>
                <Text style={[styles.text2,text1Style2]}>
                    {item.text2}
                </Text>
            </View>
        );
    }

    render() {

        const {frameStyle,dataList} = this.props;

        return(
            <View style={[styles.frameStyle,frameStyle]}>
                {
                    dataList.map(this.renderItem)
                }
            </View>
        );


    }
}

const styles = StyleSheetAdapt.create({
    frameStyle:{

        flexDirection:'row',
        // backgroundColor:'yellow',
        width:'w',
        // height:100,
        alignItems:'center',
        justifyContent:'center',
    },
    frameStyle1:{
        flex:1,
        flexDirection:'row',
        backgroundColor:'yellow',
        width:100,
        height:100,
    },
    frameStyle_1:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        height:70,
        borderBottomWidth:Theme.Border.borderWidth,
        borderBottomColor:Theme.Colors.minorColor,
    },
    text1:{
        fontSize:Theme.Font.fontSize_2,
        color:Theme.Colors.minorColor,
    },
    text2:{
        fontSize:Theme.Font.fontSize,
        color:Theme.Colors.themeColor,
        marginTop:5,
    },

});