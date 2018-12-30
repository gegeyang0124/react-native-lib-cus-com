/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow TextInput自动提示输入
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
import {ButtonChange} from "./ButtonChange";
import {DatePicker} from "./DatePicker";

const FORMATS = {
    'date': 'YYYY-MM-DD',
    'datetime': 'YYYY-MM-DD HH:mm',
    'time': 'HH:mm'
};

/**
 * 时间选择按钮控件 可选择时间显示 并回传时间
 * **/
export class ButtonTime extends Component {

    //属性注释及类型,所有的属性对象都是句柄模式（类型时number），类似C语言中的指针
    static propTypes = {
        frameStyle:PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.object,
            PropTypes.array
        ]),//框样式
        frameBtnStyle:PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.object,
            PropTypes.array
        ]),//按钮框样式
        defaultText:PropTypes.string,//默认显示文本
        textStyle:PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.object,
            PropTypes.array
        ]),//文本样式
        type:PropTypes.string,//按扭类型，"opacity"：显示隐藏；'light'：高亮
        onPress:PropTypes.func,//点击事件
        /**
         * 回传数据：{
               timestamp：int,//时间戳
               timeformat：string,//时间显示文本格式
            }
         * **/
        onChange:PropTypes.func,//时间选择回传事件
        format:PropTypes.string,//时间显示格式 默认"YYYY-MM-DD HH:mm:ss"

        mode:PropTypes.string,//日期模式 'date': 'YYYY-MM-DD','datetime': 'YYYY-MM-DD HH:mm','time': 'HH:mm'

        isReset:PropTypes.bool,//是否重置 默认false不重置；true重置（以只显示defaultText）
        disabled:PropTypes.bool,//是否无效 默认false 有效
    }

    /**
     * 设置默认属性
     * **/
    static defaultProps = {
        defaultText:null,
        mode:"datetime",
        isReset:false,
        disabled:false,
        // format:"YYYY-MM-DD HH:mm:ss",
    }

    initState(){
        const {mode,defaultText,format = FORMATS[mode]} = this.props;
        this.state = {
            defaultText:defaultText ? defaultText :Tools.timeFormatConvert(new Date().getTime(),format),
        };
    }

    constructor(props) {
        super(props);
        this.initState();
    }

    onChange = (date)=>{
        const {mode,format = FORMATS[mode],onChange,isReset} = this.props;
        let timeformat = Tools.timeFormatConvert(date,format);

        if(!isReset){
            this.setState({
                defaultText:timeformat
            });
        }

        onChange&&onChange({
            timestamp:date,
            timeformat:timeformat
        });
    }

    onPress = ()=>{
        const {onPress} = this.props;
        this.datePicker.show();
        onPress&&onPress();
    }

    render() {

        const {frameStyle,type,textStyle,frameBtnStyle,mode,isReset,disabled} = this.props;
        const defaultText = isReset ? this.props.defaultText : this.state.defaultText;

        return (
            <View style={frameStyle}>


                <DatePicker ref={(compoent)=>{
                    this.datePicker = compoent;
                }}

                            mode={mode}
                            onDateChange={this.onChange}/>

                <ButtonChange frameBtnStyle={[styles.btnFrame,frameBtnStyle]}
                              type={type}
                              disabled={disabled}
                              onPress={this.onPress}
                              textStyle={[styles.textStyle,textStyle]}
                              text={defaultText}/>

            </View>
        );


    }
}

const styles = StyleSheetAdapt.create({
    textStyle:{
        color:Theme.Colors.fontcolor_1,
    },
    btnFrame:{
        backgroundColor:Theme.Colors.transparent,
        borderWidth:0.5,
        padding:0,
        width:300,
        height:30,
    },
});