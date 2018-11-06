import React, {Component} from 'react';
import PropTypes  from 'prop-types';
import {
    View,
    ScrollView,
} from 'react-native';
import {
    StyleSheetAdapt,

} from "./../api/api";
import {TitleBlock} from "./TitleBlock";

/**
 * TitleBlock的列表
 * **/
export class TitleBlockList extends Component {

//属性注释及类型,所有的属性对象都是句柄模式（类型时number），类似C语言中的指针
    static propTypes = {
        frameStyle:PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.object,
            PropTypes.array
        ]),//框样式
        itemRowFrame:PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.object,
            PropTypes.array
        ]),//行框样式
        verticalBarStyle:PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.object,
            PropTypes.array
        ]),//竖杠样式
        textStyle:PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.object,
            PropTypes.array
        ]),//文本样式
        textFrame:PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.object,
            PropTypes.array
        ]),//文本框样式
        textCenterStyle:PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.object,
            PropTypes.array
        ]),//中间文本样式

        onPress:PropTypes.func,//图片点击事件 回传（成员，index）
        /**
         成员：{
          textTop:PropTypes.string,//按钮文字 上边
          textDown:PropTypes.string,//按钮文字 下边
          textCenter:PropTypes.string,//按钮文字 中间
          textRight:PropTypes.string,//按钮文字 右边
          color:PropTypes.string,//textCenter的文本颜色，竖杠颜色
          }
         * **/
        isScroll:PropTypes.bool,//是否可以滚动 默认是false
        dataList:PropTypes.array,//数据数组


    }

    /**
     * 设置默认属性
     * **/
    static defaultProps = {
        dataList:[],
        isScroll:false
    }

    constructor(props) {
        super(props);

    }


    renderItem = (item,i)=>{
        const {onPress,verticalBarStyle,textFrame,textStyle,
            textCenterStyle,itemRowFrame} = this.props;

        return(
            <TitleBlock key={i}
                        frameStyle={itemRowFrame}
                        color={item.color}
                        textCenterStyle={textCenterStyle}
                        verticalBarStyle={verticalBarStyle}
                        onPress={()=>onPress&&onPress(item,i)}
                        textTop={item.textTop}
                        textStyle={textStyle}
                        textFrame={textFrame}
                        textRight={item.textRight}
                        textCenter={item.textCenter}
                        textDown={item.textDown}
                        icon={item.icon}/>
        );
    }

    render() {
        const {frameStyle,dataList,isScroll} = this.props;


        return (
            isScroll
            && <ScrollView style={[styles.frameStyleScroll,frameStyle]}
                           horizontal={true}
                           scrollEnabled={true}>
                {
                    dataList.map(this.renderItem)
                }
            </ScrollView>
            || <View style={[styles.frameStyle,frameStyle]}>
                {
                    dataList.map(this.renderItem)
                }
            </View>
        );
    }
}

const styles = StyleSheetAdapt.create({
    frameStyleScroll:{
        width:'w',
    },
    frameStyle: {
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        flexDirection:'row',
    },

});