import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
    View,
    Image,
    Text,
    TouchableOpacity,
} from 'react-native';

import {
    StyleSheetAdapt,
    Theme,
} from "../api/api";
import ImageLeft from 'lib-images-zy/rightBlack.png';

/**
 * 双文本并且右边有个图标 控件
 * **/
export class TextDoubleIcon extends Component{

    //属性注释及类型,所有的属性对象都是句柄模式（类型时number），类似C语言中的指针
    static propTypes = {
        frameStyle:PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.object,
            PropTypes.array
        ]),//框样式
        icon: PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.bool
        ]),//图标,图片 可为空
        /**
         * 图标样式
         */
        iconStyle: PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.object
        ]),
        /**
         * 显示文本。左边
         */
        textLeft: PropTypes.string,
        /**
         * 显示文本。右边
         */
        textRight: PropTypes.string,
        /**
         * 文本样式样式 左边
         */
        textStyleLeft: PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.array,
            PropTypes.object
        ]),
        isShowRight:PropTypes.bool,//是否显示右边UI 默认显示 true
        /**
         * 文本样式样式 右边
         */
        textStyleRight: PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.array,
            PropTypes.object
        ]),
        /**
         * 框的样式 左边
         * **/
        frameStyleLeft:PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.object
        ]),
        /**
         * 框的样式 右边
         */
        frameStyleRight: PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.object
        ]),
    };

    /**设置默认属性
     * **/
    static defaultProps = {
        isShowRight:true,
    }

    render() {
        const {frameStyle,isShowRight} = this.props;
        return (
            <TouchableOpacity {...this.props}
                              style={[styles.iconViewRow,this.props.style,frameStyle]} >

                {
                    this.props.textLeft == undefined
                        ? null
                        : <View style={[styles.iconViewRowC1,this.props.frameStyleLeft]}>
                            <Text style={[styles.iconViewRowText,this.props.textStyleLeft]}>
                                {this.props.textLeft}
                            </Text>
                        </View>
                }

                {
                    isShowRight&&<View style={styles.iconViewRowC2}>
                        <View style={[styles.iconViewRowC21,this.props.frameStyleRight]}>
                            <Text style={[styles.iconViewRowText,this.props.textStyleRight]}>
                                {this.props.textRight}
                            </Text>
                            {
                                this.props.icon != null ?
                                    <Image source={this.props.icon == true
                                        ? ImageLeft
                                        : this.props.icon}
                                           style={[styles.iconViewRowIconRight,this.props.iconStyle]} />
                                    : null
                            }
                        </View>
                    </View>
                }

            </TouchableOpacity>
        );
    }

}

const styles = StyleSheetAdapt.create({

    viewRow:{

    },
    iconViewRow: {
        //backgroundColor: "blue",
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth:0.5,
        borderBottomColor:"#5b5b5b",
    },
    iconViewRowC1:{
        flex:1,
        justifyContent:"center",
        //backgroundColor: "red",

    },
    iconViewRowC2:{
        flex:1,
        //flexDirection: 'column',
        // backgroundColor: "yellow",
        alignItems:"flex-end",
    },
    iconViewRowC21:{
        //flexDirection: 'column',
        // backgroundColor: "yellow",
        flexDirection: 'row',
        alignItems:"center",
        justifyContent:"center",
        paddingRight:20,

    },
    iconViewRowText: {
        fontSize:20,
        padding:5,
        paddingRight:10,
        // color:"#000000"
    },
    iconViewRowTextLeft: {

    },
    iconViewRowTextRight: {
        right:0,

    },
    iconViewRowIconRight: {
        width:20,
        height:20,
        resizeMode:"contain",
        tintColor:Theme.Colors.themeColor,
    },

});