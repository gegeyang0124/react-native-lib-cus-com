/**
 * Created by Administrator on 2018/5/6.
 */
import PropTypes  from 'prop-types';
import React, {Component} from 'react';
import {
    View,
    Text,
    TextInput,
} from 'react-native';

import {
    Tools,
} from "./../api/api";
import {PickDropdown} from './PickDropdown';

/**
 * 月份下拉框 （基于PickDropdown）
 * **/
export class PickDropdownMonth extends Component {

    //属性注释及类型,所有的属性对象都是句柄模式（类型时number），类似C语言中的指针
    static propTypes = {
        frameStyle:PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.object,
            PropTypes.array
            //React.PropTypes.instanceOf(Message)
        ]),//外部框样式
        format:PropTypes.string,//日期格式
        onChange:PropTypes.func,//选择变化事件 回传时间戳

    }

    /**
     * 设置默认属性
     * **/
    static defaultProps = {
        format:"YYYY-MM"
    }

    constructor(props) {
        super(props);

        this.state = {
            pickedDate:Tools.timeFormatConvert(undefined,this.props.format)
        };
    }

    onShowMonPicker = ()=>{

        const {format,onChange} = this.props;

        Tools.pickMonth(retJson =>{
            let val = (new Date(retJson[0],retJson[1] - 1,1,0,0,0)).getTime();

            this.setState({
                pickedDate:Tools.timeFormatConvert(val,format)
            });

            onChange&&onChange(val);
        });

        return false;
    }

    render() {

        const {frameStyle} = this.props;
        const {pickedDate} = this.state;

        return (
            <PickDropdown onDropdownWillShow={this.onShowMonPicker}
                          style={frameStyle}
                          defaultValue={pickedDate}
                          selectedIndex={0}
                          clearDrop={true}
                          options={[pickedDate]}/>
        );
    }
}
