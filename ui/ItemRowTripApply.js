import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
} from 'react-native';

import {
    StyleSheetAdapt,
    Theme,
    Tools
} from "./../api/api";
import {
    PickDropdown
} from './PickDropdown';
import {TextChange} from "./TextChange";

/**
 * 出差样式UI，左边文本提示文字，右边可以是：下拉框，输入框，文本
 * **/
export class ItemRowTripApply extends Component {

    //属性注释及类型,所有的属性对象都是句柄模式（类型时number），类似C语言中的指针
    static propTypes = {
        frameStyle:PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.object,
            PropTypes.array
            //React.PropTypes.instanceOf(Message)
        ]),//外部框样式
        frameLabelStyle:PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.object,
            PropTypes.array
            //React.PropTypes.instanceOf(Message)
        ]),//label框样式
        text:PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.string
        ]),//显示文本 第一行第1个
        textStyle:PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.object,
            PropTypes.array
            //React.PropTypes.instanceOf(Message)
        ]),//label样式PropTypes.string
        text2:PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.string
        ]),//显示文本 第一行第二个
        onPressRight:PropTypes.func,//右边文字点击事件
        text2Style:PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.object,
            PropTypes.array
            //React.PropTypes.instanceOf(Message)
        ]),//label样式
        viewCenterProps:PropTypes.object,//中间ui属性
        isStar:PropTypes.bool,//是否显示星点,默认显示，true
        text3:PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.string
        ]),//显示文本 第一行第3个 此属性传入则'*'不显示
        text3Style:PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.object,
            PropTypes.array
            //React.PropTypes.instanceOf(Message)
        ]),//label样式 第一行第3个
        viewCenter:PropTypes.oneOfType([
            PropTypes.string,//'input'：//输入框，'pickDown'：下拉框,'text':显示框,默认是'pickDown'
            PropTypes.object,//UI Ele
        ]),//中间UI
    }

    /**
     * 设置默认属性
     * **/
    static defaultProps = {
        clearDrop:false,//重置下拉框 true:重置，false，不重置，默认false
        isStar:true,//是否显示星点,默认显示，true
        viewCenter:'pickDown',//'input'：输入框，'pickDown'：下拉框,'text':显示框,默认是'pickDown'
    }

    constructor(props) {
        super(props);
    }

    getInputWidth(){
        const {frameLabelStyle} = this.props;
        let style = {};
        if(frameLabelStyle){
            let s1 = Tools.getStyle(frameLabelStyle);
            if(s1.flex){
                let s2 = Tools.getStyle(styles.titleFrame_1_1);
                if(s1.flex > s2.flex){
                    let s3 = Tools.getStyle(styles.titleFrame_textInput);
                    style.width = s3.width - StyleSheetAdapt.getWidth(
                        (s1.flex - s2.flex) / (s1.flex - s2.flex + 10) + "w"
                    );
                }
            }
        }

        return style;
    }

    render() {
        const {viewCenterProps,frameStyle,text,isStar,viewCenter,text2,
            frameLabelStyle,textStyle,text2Style,onPressRight,text3,text3Style} = this.props;

        return (
            <View style={[styles.titleFrame_1,frameStyle]}>
                <View style={[styles.titleFrame_1_1,frameLabelStyle]}>
                    <Text style={[styles.titleFrame_Text,textStyle]}>
                        {
                            text
                        }
                    </Text>
                </View>

                <View style={styles.titleFrame_1_2}>
                    {
                        typeof (viewCenter) == "string" ?
                            viewCenter == "pickDown" ?
                                <PickDropdown {...viewCenterProps}
                                              style={styles.titleFrame_PickDown}/> :
                                viewCenter == 'input' ?
                                    <TextInput {...viewCenterProps}
                                               defaultValue={
                                                   viewCenterProps && viewCenterProps.defaultValue
                                                       ? viewCenterProps.defaultValue
                                                       : text2 != null ? (text2 + '') : text2
                                               }
                                               style={[
                                                   styles.titleFrame_textInput,
                                                   this.getInputWidth(),
                                                   viewCenterProps&&viewCenterProps.style]}/> :
                                    viewCenter == 'text' && onPressRight
                                        ? <TextChange text={text2}
                                                      onPress={onPressRight}/>
                                        : viewCenter == 'text'
                                        ? <Text style={[styles.titleFrame_Text2,text2Style]}>
                                            {
                                                text2
                                            }
                                        </Text> :
                                        null :
                            typeof (viewCenter) == "object" ?
                                viewCenter
                                : null
                    }


                </View>

                <View style={styles.titleFrame_1_3}>
                    <Text style={[styles.titleFrame_Text,text3Style]}>
                        {
                            text3 ? text3 : isStar ? '*' : ''
                        }
                    </Text>
                </View>

            </View>
        );
    }
}

const styles = StyleSheetAdapt.create({
    titleFrame: {
        marginTop: 10,
        backgroundColor: Theme.Colors.foregroundColor,
        paddingTop: 10,
        paddingBottom: 10,
        height: 100,
    },
    titleFrame_1: {
        flexDirection: 'row',
        flex: 1,
        // height:50,
    },
    titleFrame_1_1: {
        flex: 1.5,
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    titleFrame_1_2: {
        flex: 8,
        alignItems: 'flex-start',
        justifyContent: 'center',
        marginLeft: 10,
    },
    titleFrame_1_3: {
        flex: 0.5,
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    titleFrame_textInput: Tools.platformType
        ? {
            fontSize: Theme.Font.fontSize,
            width: StyleSheetAdapt.getWidth("0.73w") + StyleSheetAdapt.getWidth(Theme.Height.height1) + "n",
            height: Theme.Height.height1,
            borderWidth: Theme.Border.borderWidth,
            borderRadius: Theme.Border.borderRadius,
            borderColor: Theme.Colors.minorColor,
        }
        : {
            fontSize: Theme.Font.fontSize,
            width: StyleSheetAdapt.getWidth("0.73w") + StyleSheetAdapt.getWidth(Theme.Height.height1) + "n",
            height: Theme.Height.height1,
            padding: 0,
            paddingLeft: 0,
            paddingBottom: 10,
            marginTop: 15,
            marginLeft: -15,
            // borderWidth:Theme.Border.borderWidth,
            // borderRadius:Theme.Border.borderRadius,
            // borderColor:Theme.Colors.minorColor,
        },
    titleFrame_btnFrame: {
        width: Theme.Width.width1 + Theme.Height.height1,
    },
    titleFrame_Text: {
        color: Theme.Colors.themeColor,
        fontSize: Theme.Font.fontSize,
        // alignSelf: "stretch",
        // textAlign:"auto"
    },
    titleFrame_Text2:{
        fontSize: Theme.Font.fontSize,
    },
    titleFrame_PickDown: {
        width: '0.73w',
    },
});