import React, {Component} from 'react';
import PropTypes  from 'prop-types';
import {
    Text,
    TouchableOpacity,
} from 'react-native';
import {StyleSheetAdapt} from "../api/StyleSheetAdapt";
import {Theme} from "../api/Theme";

export class TextChange extends Component {

    //属性注释及类型,所有的属性对象都是句柄模式（类型时number），类似C语言中的指针
    static propTypes = {
        text:PropTypes.string,//按枢文本
        textStyle:PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.object,
            PropTypes.array,
            //React.PropTypes.instanceOf(Message)
        ]),//文本 第2行第1个
        onExportThis:PropTypes.func,//导出this
    }

    constructor(props) {
        super(props);

        this.state = {
            text:null,//文本
        };

    }

    setText(text){
        this.setState({
            text:text,
        });
    }

    render() {

        this.props.onExportThis == undefined
            ? null
            : this.props.onExportThis(this);

        return (
            <TouchableOpacity {...this.props}
                              style={[styles.style,this.props.style]}>
                <Text style={[styles.textStyle,this.props.textStyle]}>
                    {
                        this.state.text == null
                            ? this.props.text
                            : this.state.text
                    }
                </Text>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheetAdapt.create({
    textStyle:{
        fontSize:Theme.Font.fontSize,
    },
    style:{
        alignItems:"center",
        justifyContent:'center',
    },
});