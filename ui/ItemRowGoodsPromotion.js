/**
 * Created by Administrator on 2018/5/5.
 */
import React, {Component} from 'react';
import PropTypes  from 'prop-types';
import {
    View,
} from 'react-native';

import {
    StyleSheetAdapt,
    Tools,
    Theme,
} from "./../api/api";
import {ButtonImage} from "./ButtonImage";
import {ButtonChange} from "./ButtonChange";

/**
 * 促销活动Item；一张图片，图片左下角和右下角分别有一个按钮
 * **/
export class ItemRowGoodsPromotion extends Component{

    //属性注释及类型,所有的属性对象都是句柄模式（类型时number），类似C语言中的指针
    static propTypes = {
        onPressLeft:PropTypes.func,//左边按钮点击事件
        onPressImage:PropTypes.func,//图片点击事件
        onPressRight:PropTypes.func,//右边按钮点击事件
        icon:PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.object
            //React.PropTypes.instanceOf(Message)
        ]),//图标
        text1:PropTypes.string,//文本 左边按钮
        text2:PropTypes.string,//文本 右边按钮
    }


    render() {

        return (
            <View style={styles.itemRowFrame}>
                <View style={styles.itemRowFrame1}>
                    <ButtonImage onPress={this.props.onPressImage}
                                 icon={this.props.icon}
                                 style={styles.itemRowIcon}
                                 iconStyle={styles.itemRowIcon}/>
                </View>
                <View style={styles.itemRowFrame2}>
                    <ButtonChange text={this.props.text1}
                                  onPress={this.props.onPressLeft}
                                  style={styles.itemRowBtn}/>
                    <ButtonChange text={this.props.text2}
                                  onPress={this.props.onPressRight}
                                  style={styles.itemRowBtn}/>
                </View>
            </View>
        );
    }
}

const styles = StyleSheetAdapt.create({
    itemRowFrame:{
        // height:100,
        flexDirection:'column',
        padding:10,
        borderColor:Theme.Colors.borderColor,
        borderBottomWidth:Theme.Border.borderWidth,
    },
    itemRowFrame1:{
        flexDirection:'row',
        // backgroundColor:'blue',
        alignItems:"center",
        justifyContent:"center",
    },
    itemRowFrame2:{
        flexDirection:'row',
        // backgroundColor:'red',
        justifyContent:'space-between',

    },
    itemRowIcon:{
        width:'0.99w',
        height:350,
    },
    itemRowBtn:{
        margin:10,
        marginBottom:0,
    },
});
