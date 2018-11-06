/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow TextInput自动提示输入
 */

import React, {Component} from 'react';
import {
    View,
} from 'react-native';
import PropTypes  from 'prop-types';
import {
    Image,
    TouchableOpacity,
} from 'react-native';
import {
    Tools,
    StyleSheetAdapt,
} from "../api/api";
/**
 * 修改DatePicker底层增加属性hideHeader //隐藏头部显示内容，默认是false
 * **/
import DatePickerRoot from 'react-native-datepicker';

export class DatePicker extends Component {


    //属性注释及类型,所有的属性对象都是句柄模式（类型时number），类似C语言中的指针
    static propTypes = {
        mode:PropTypes.string,//日期模式
        onDateChange:PropTypes.func,//回传时间戳
    }

    /**
     * 设置默认属性
     * **/
    static defaultProps = {
        mode:"datetime"
    }

    constructor(props) {
        super(props);
    }

    show() {
        // this.datePicker.setModalVisible(true);
        this.datePicker.onPressDate();
    }

    render() {

        const {mode,onDateChange} = this.props;
        return (

            <View style={styles.dateFrame}>
                <DatePickerRoot ref={(compoent)=>{
                    this.datePicker = compoent;
                }}
                                hideHeader={true}
                    // style={{width: 200,height:200}}

                                date={Tools.timeFormatConvert((new Date()).getTime(),"YYYY-MM-DD HH:mm:ss")}
                                mode={mode}
                                placeholder="select date"
                                is24Hour={true}
                                format={"YYYY-MM-DD HH:mm:ss"}
                    /* minDate="2016-05-01"
                     maxDate="2016-06-01"*/
                                confirmBtnText="确定"
                                cancelBtnText="取消"
                                customStyles={{
                                    datePicker:styles.datePicker
                                    // ... You can check the source to find the other keys.
                                }}
                                onDateChange={(date,date1) => {
                                    // alert(date)
                                    if(onDateChange!=undefined)
                                    {
                                        onDateChange(Tools.timeFormatConvert(date1));
                                    }
                                }}
                />
            </View>

        );
    }
}

const styles = StyleSheetAdapt.create({
    dateFrame:{
        position:"absolute",
    },
    datePicker:{
        width:'w',
        // resizeMode:"contain",
    }
});