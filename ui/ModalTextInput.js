import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    View,
    Modal,
    TextInput,
    TouchableOpacity,
    Text,
} from 'react-native';

import {
    StyleSheetAdapt,
    Tools,
} from "../api/api";
import {ButtonChange} from "./ButtonChange";
import {Theme} from "../api/Theme";
import {TextInputLabel} from "./TextInputLabel";

export class ModalTextInput extends Component {

    //属性注释及类型,所有的属性对象都是句柄模式（类型时number），类似C语言中的指针
    static propTypes = {
        textInputProps:PropTypes.object,//输入框属性对象
        onPressLeft:PropTypes.func,//左边按钮事件
        btnTextLeft:PropTypes.string,//左边按钮文本
        onPressRight:PropTypes.func,//右边按钮事件
        btnTextRight:PropTypes.string,//右边按钮文本
        title:PropTypes.oneOfType([
            PropTypes.string,//提示文本
            PropTypes.number,
        ]),
        onChangeText:PropTypes.func,//输入文本变化回传事件按钮事件，回传输入文本 双行模式下第二个输入框事件 单行模式下输入框事件
        onChangeText1:PropTypes.func,//输入文本变化回传事件按钮事件，回传输入文本 双行模式下第一个输入框事件

        simpleMode:PropTypes.bool,//是否是单行模式 默认true 是
        title1:PropTypes.oneOfType([
            PropTypes.string,//提示文本
            PropTypes.number,
        ]),//双行模式下传入，单行模式不传
        title2:PropTypes.oneOfType([
            PropTypes.string,//提示文本
            PropTypes.number,
        ]),//双行模式下传入，单行模式不传
    };

    /**
     * 设置默认属性
     * **/
    static defaultProps = {
        title:"原因",
        btnTextLeft:'返回',
        btnTextRight:'确定',
        simpleMode:true,
        title1:'评分',
        title2:'评语',
    }

    static self:ModalTextInput;

    // 构造
    constructor(props) {
        super(props);

        ModalTextInput.self = this;
        // Tools.progress = this;

        // 初始状态
        this.state = {
            text1:null,
            text:null,
            visible: false,
            type:true, //进度条类型，true:'Wave',false:WanderingCubes,默认是：true
        };
    }

    /**
     * 显示加载进程条，
     * @param bool boolean,//true：显示，false，隐藏，默认为true
     * @param type boolean,//进度条类型，true:'Wave',false:WanderingCubes,默认是：true
     * **/
    show = (bool)=>{
        bool = bool == undefined ? !this.state.visible :bool;

        this.setState({
            visible:bool
        });
        /* setTimeout(()=>{
             alert(JSON.stringify(bool))
         },1000);*/
    }
    static show(bool){
        ModalTextInput.self.show(bool)
    }


    onRequestClose(){
        // this.show(false);
    }

    _onPressLeft = ()=>{
        const {onPressLeft} = this.props;
        this.show(false);
        onPressLeft&&onPressLeft();
    }

    _onPressRight = ()=>{
        const {onPressRight} = this.props;
        this.show(false);
        onPressRight&&onPressRight();
    }

    _onChangeText = (text,type)=>{
        // console.log(text)
        const {onChangeText,onChangeText1} = this.props;

        if(type == 0){
            this.setState(()=>({text1:text}),()=>{
                onChangeText1&&onChangeText1(text);
            });
        }
        else {
            this.setState(()=>({text:text}),()=>{
                onChangeText&&onChangeText(text);
            });
        }
    }

    render() {

        const {visible,text,text1} = this.state;
        const {btnTextRight,btnTextLeft,title,simpleMode,title1,title2} = this.props;

        return(
            <Modal animationType={"slide"}
                // ref="progress"
                   transparent = {true}
                   visible={visible}
                   onRequestClose={()=> this.onRequestClose()}>

                <TouchableOpacity style={styles.frameModal}
                                  onPress={()=>this.show()}>

                    <TouchableOpacity  style={styles.container}
                                       activeOpacity={1}>
                        <View style={styles.frameStyle_0}>
                            <Text style={styles.text}>
                                {title}
                            </Text>
                        </View>

                        {
                            !simpleMode
                            && <View style={styles.matchScoreFrame}>
                                <TextInputLabel textLabel={title1}
                                                frameStyle={styles.tIFrame}
                                                textLabelFrameStyle={styles.tLFrame}
                                                textInputProps={{
                                                    style:styles.textInput,
                                                    value:text1,
                                                    multiline:false,
                                                    placeholder:"请输入" + title1,
                                                    onChangeText:(text)=>this._onChangeText(text,0)
                                                }}
                                />
                            </View>
                        }

                        {
                            !simpleMode
                            && <TextInputLabel textLabel={title2}
                                               textInputProps={{
                                                   style:styles.textInput2,
                                                   value:text,
                                                   placeholder:"请输入" + title2,
                                                   onChangeText:(text)=>this._onChangeText(text,1)
                                               }}/>
                        }

                        {
                            simpleMode
                            && <View style={styles.frameStyle_1}>
                                <TextInput placeholder={"请输入" + title}
                                           value={text}
                                           style={[styles.text,styles.frameStyle_1_text]}
                                           onChangeText={(text)=>this._onChangeText(text,1)}
                                           multiline={true}
                                           autoFocus={true} />
                            </View>
                        }


                        <View style={styles.frameStyle_2}>
                            <ButtonChange text={btnTextLeft}
                                          frameStyle={styles.frameStyle_2_btn}
                                          textStyle={styles.frameStyle_2_btnLeftText}
                                          style={styles.frameStyle_2_btnLeft}
                                          onPress={this._onPressLeft}/>
                            <ButtonChange text={btnTextRight}
                                          frameStyle={styles.frameStyle_2_btn}
                                          onPress={this._onPressRight}/>
                        </View>
                    </TouchableOpacity>
                </TouchableOpacity>


            </Modal>
        );

    }

}


const styles = StyleSheetAdapt.create({
    textInput2:{
        height:70,
    },

    tLFrame:{
        marginLeft:0,
    },
    matchScoreFrame:{
        width:'0.9w',
        justifyContent: 'center',
        alignItems: 'flex-start',
        // backgroundColor:'red'
    },
    tIFrame:{
        flexDirection:'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    textInput:{
        width:150,
        height:30,
    },

    frameModal:{
        justifyContent: 'center',
        alignItems: 'center',
        flex:1,
        backgroundColor:Theme.Colors.backgroundColor1,
    },
    text:{
        fontSize:Theme.Font.fontSize,
    },
    container: {
        // flex: 1,
        height:300,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Theme.Colors.foregroundColor,
        borderRadius:Theme.Border.borderRadius1,
    },
    frameStyle_0:{
        // flex:1,
        margin:10,
    },
    frameStyle_1:{
        flex:1,
        width:'0.9w',
        justifyContent: 'center',
        alignItems: 'center',
    },
    frameStyle_1_text:{
        borderWidth:Theme.Border.borderWidth,
        borderColor:Theme.Colors.themeColor,
        width:'0.8w',
        flex:1,
        padding:5,
    },
    frameStyle_2:{
        flexDirection:'row',
    },
    frameStyle_2_btn:{
        margin:20,
        marginLeft:40,
        marginRight:40,
        width:150,
    },
    frameStyle_2_btnLeft:{
        borderWidth:Theme.Border.borderWidth,
        borderColor:Theme.Colors.themeColor,
        backgroundColor:Theme.Colors.transparent,
    },
    frameStyle_2_btnLeftText:{
        color:Theme.Colors.backgroundColor1,
    },
});