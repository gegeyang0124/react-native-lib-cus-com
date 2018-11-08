import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    View,
    Modal,
    TextInput,
    TouchableOpacity,
    Text,
    Image,
} from 'react-native';

import {
    StyleSheetAdapt,
    Tools,
} from "../api/api";
import {ButtonChange} from "./ButtonChange";
import {Theme} from "../api/Theme";
import {TextInputLabel} from "./TextInputLabel";
import {FlatListView} from "./FlatListView";

/**
 *
 * **/
export class ModalSearch extends Component {

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
            PropTypes.string,
            PropTypes.number,
        ]),//提示文本 顶部
        title2:PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number,
        ]),//提示文本 底部
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

    static self;

    // 构造
    constructor(props) {
        super(props);

        ModalSearch.self = this;

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
        ModalSearch.self.show(bool)
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

    renderText = (text)=>{
        return(
            <Text style={styles.itemRowText}>
                GGG
            </Text>
        );
    }

    renderItem = (item,index)=>{
        return(
            <View style={styles.itemRow}>
                {
                    this.renderText()
                }
                <Text style={[styles.itemRowText,styles.itemRowText2]}>
                    GGG
                </Text>
                <ButtonChange text={"切换角色"}
                              frameStyle={styles.itemRowBtn}/>
            </View>
        );
    }

    render() {
        ModalSearch.self = this;

        const {visible,text,text1} = this.state;
        const {btnTextRight,btnTextLeft,title,simpleMode,title1,title2,
            dataList} = this.props;

        return(
            <Modal animationType={"slide"}
                   transparent = {true}
                   visible={visible}
                   onRequestClose={()=> this.onRequestClose()}>

                <TouchableOpacity style={styles.cont0}
                                  onPress={()=>this.show()}/>

                <View style={styles.modal}>
                    <View style={styles.cnt2}>
                        <View style={styles.cnt2_1}>
                            <View style={styles.cnt2_2}>
                                <TextInput style={styles.tput}
                                           placeholder={"请输入角色"}/>
                                <Image source={require("images/search2.png")}
                                       style={styles.img1}/>
                            </View>
                        </View>

                        <View>
                            {
                                title1&&<Text style={[styles.itemRowTitle]}>
                                    {title1}
                                </Text>
                            }

                            <FlatListView  data={[1,1,1,1,1,1]}
                                           keyExtractor = {(item, index) => ("key" + index)}
                                           renderItem={({item,index}) => this.renderItem(item,index)}/>
                        </View>

                        <TouchableOpacity style={styles.cnt3}>
                            <Image source={require("images/trash.png")}
                                   style={styles.img1}/>
                            <Text style={styles.txt}>
                                {
                                    title2
                                }
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity style={styles.cont1}
                                      onPress={()=>this.show()}/>
                </View>

            </Modal>
        );

    }

}


const styles = StyleSheetAdapt.create({
    txt:{
        marginLeft:10,
        color:Theme.Colors.themeColor,
        fontSize:Theme.Font.fontSize,
    },
    cnt3:{
        alignItems:"center",
        justifyContent:"center",
        backgroundColor:Theme.Colors.themeColorLight1,
        height:50,
        flexDirection:"row",
    },

    itemRowTitle:{
        marginLeft:20,
        marginTop:20,
        fontSize:Theme.Font.fontSize,
    },
    itemRowBtn:{
        right:30,
        position:'absolute',
    },
    itemRowText2:{
        marginLeft:50,
    },
    itemRowText:{
        fontSize:Theme.Font.fontSize,
        color:Theme.Colors.minorColor,
    },
    itemRow:{
        flexDirection:"row",
        padding:20,
        alignItems:"center",
    },

    tput:{
        width:335,
        height:40,
        // backgroundColor:"red",
        marginLeft:20,
        fontSize:Theme.Font.fontSize_2,
        textAlign:"center",
    },
    cnt2_2:{
        height:50,
        backgroundColor:Theme.Colors.foregroundColor,
        width:400,
        // justifyContent:"center",
        alignItems:"center",
        flexDirection:"row",
        borderRadius:25,
        borderWidth:Theme.Border.borderWidth,
        borderColor:Theme.Colors.themeColor,
    },
    img1:{
        resizeMode:"contain",
        width:30,
        height:"30w",
        marginLeft:5,
    },
    cnt2_1:{
        height:100,
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:Theme.Colors.themeColorLight1,

        borderTopWidth:Theme.Border.borderWidth,
        borderBottomWidth:Theme.Border.borderWidth,
        borderTopColor:Theme.Colors.themeColor,
        borderBottomColor:Theme.Colors.themeColor,
    },
    cnt2:{
        backgroundColor:Theme.Colors.foregroundColor,
    },
    cont1:{
        flex:1,
        // backgroundColor:"red",
    },
    cont0:{
        height:90,
    },
    modal:{
        // backgroundColor:Theme.Colors.backgroundColor1,
        flex:1,
        // marginTop:90,
    },
});