import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
    View,
    Text,
    TouchableOpacity,
} from 'react-native';

import {
    StyleSheetAdapt,
    Theme,
    Tools
} from "./../api/api";
import {ButtonChange} from "./ButtonChange";
import CheckBox from 'react-native-check-box';

export class ItemRowGuideApplyType extends Component {

    //属性注释及类型,所有的属性对象都是句柄模式（类型时number），类似C语言中的指针
    static propTypes = {
        frameStyle:PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.object,
            PropTypes.array
            //React.PropTypes.instanceOf(Message)
        ]),//外部框样式
        textStyle:PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.object,
            PropTypes.array
            //React.PropTypes.instanceOf(Message)
        ]),//文本样式
        text1:PropTypes.string,//文本 左边
        text2:PropTypes.string,//文本 右边
        onPress:PropTypes.func,//点击事件,回传一个参数是否选中，bool型
    }


    constructor(props) {
        super(props);
        this.state = {
            checkBoxColor:Theme.Colors.minorColor
        }
    }

    _onPress = ()=>{
        this.chk&&this.chk.onClick();
    };

    _onSelected = (isChecked)=>{
        const {onPress} = this.props;
        this.setState({
            checkBoxColor:isChecked ? Theme.Colors.themeColor : Theme.Colors.minorColor
        });

        onPress && onPress(isChecked);
    };

    render() {
        const {frameStyle,textStyle,text1,text2} = this.props;
        const {checkBoxColor} = this.state;

        return (
            <TouchableOpacity style={[styles.typeFrame_1_2,frameStyle]}
                              onPress={this._onPress}>
                <View style={[styles.typeFrame_1_2_1,styles.typeFrame_1_2_2_child]}>
                    {
                        text1 != undefined ?
                            <Text style={[styles.itemRowText,textStyle]}>
                                {text1}
                            </Text> :
                            <CheckBox checkBoxColor={checkBoxColor}
                                      ref={(com)=>this.chk = com}
                                      disabled={true}
                                      onClick={this._onSelected}
                                      style={styles.typeChk}/>
                    }
                </View>

                <View style={[styles.typeFrame_1_2_2,styles.typeFrame_1_2_2_child]}>
                    <Text style={[styles.itemRowText,textStyle]}>
                        {text2}
                    </Text>
                </View>
            </TouchableOpacity>

        );
    }
}

const styles = StyleSheetAdapt.create({
    itemRowText:{
        color:Theme.Colors.minorColor,
        fontSize:Theme.Font.fontSize_1,
        padding:10,
    },

    typeFrame_1_2: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'center',
        // marginLeft: 10,
    },
    typeFrame_1_2_1:{
        flex: 3,
        alignItems: 'center',
        justifyContent: 'center',
    },
    typeFrame_1_2_2:{
        flex: 7,
        alignItems: 'center',
        justifyContent: 'center',
    },
    typeFrame_1_2_2_child:{
        borderColor:Theme.Colors.minorColor,
        borderRightWidth:Theme.Border.borderWidth,
        borderBottomWidth:Theme.Border.borderWidth,
    },
    typeChk:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});