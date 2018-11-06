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
    Theme,
    MenuBottomApi,
} from "./../api/api";
import {ButtonChange} from "./ButtonChange";
import {
    StackPages,
} from 'react-navigation';

/**
 * 需要修改底层
 * **/
import CustomActionSheet from 'react-native-custom-action-sheet';
import {Tools} from "../api/Tools";

export class MenuBottom extends Component {

    //属性注释及类型,所有的属性对象都是句柄模式（类型时number），类似C语言中的指针
    static propTypes = {
        frameStyle:PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.object,
            PropTypes.array
        ]),//按钮框样式
        textStyle:PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.object,
            PropTypes.array
        ]),//文本样式
        isTimeout:PropTypes.bool,//是否延迟
        isVisibleClose:PropTypes.bool,//是否显示自动关闭 默认true
        /**
         * 数组成员：
         {
         text:'',文本按钮
         onPress:func,点击事件，回传数组成员 若onPress属性存在此事件不执行
         }
         或是单成员字符串："文本按钮" string
         * **/
        btnList:PropTypes.array,//按钮数组
        onPress:PropTypes.func,//点击事件 回传（item,i）;item=>数据成员，i=》数组下标
    }

    static self;
    static visible = false;

    constructor(props) {
        super(props);

        MenuBottom.self = this;
        this.state={
            isVisible: false,  //选择器显隐标记
        }

    }

    /**
     * 设置默认属性
     * **/
    static defaultProps = {
        isTimeout:false,
        isVisibleClose:true,
        btnList:[],
    }

   /* static show(btnList=["拍摄","选择"]){
        if(btnList==true||btnList==false){
            btnList=["拍摄","选择"];
        }
        return MenuBottomApi.show(btnList);

        // MenuBottom.self.show(b);
    }*/
    static show(b){
        if(b == undefined)
        {
            b = !this.visible;
            this.visible = b;
        }
        else {
            this.visible = b;
        }

        if(b){
            // console.info("StackPages.curPageState",StackPages.curPageState);
            // console.info("StackPages.stackPages",StackPages.stackPages);
            // console.info("StackPages.stackPagesHistory",StackPages.stackPagesHistory);
            // for()
            let context = StackPages.stackPages[StackPages.curPageState.routeName].screen.prototype.context;
            // MenuBottom.self.show(b);
            MenuBottomApi.show(context.btnList);
        }
        else {
            MenuBottomApi.hide();
        }

    }
    show(b){
        b = b == undefined ? !this.state.isVisible : b;
        this.setState({
            isVisible:b
        });
    }

    renderItem = (item,i)=>{
        const {isTimeout,isVisibleClose,onPress} = this.props;
        return(
            <ButtonChange key={i}
                          text={item.text}
                          type={"light"}
                          style={[styles.btn,i == 0 ? styles.btnTop : {}]}
                          onPress={()=>{

                              // console.info("item YYY",item);

                             /* isTimeout ?
                                  setTimeout(()=>{
                                      this.show(false);
                                  },2000) :
                                  null;

                              item.onPress&&item.onPress(item,i);*/

                              isVisibleClose ? this.show(false) : null;
                              isTimeout ?
                                  setTimeout(()=>{
                                      onPress&&onPress(item,i)||item.onPress&&item.onPress(item,i);
                                  },500) :
                                  onPress&&onPress(item,i)||item.onPress&&item.onPress(item,i);
                          }}
                          textStyle={styles.btnTextStyle}
                          frameStyle={styles.btnFrame}/>
        );
    };

    getFrameStyle(){
        const {btnList} = this.props;
        const style = Tools.getStyle(styles.btn);
        const style2 = Tools.getStyle(styles.frameStyle);

        // console.info("btnList",btnList);
        return {
            height:style.height * (btnList ? btnList.length : 0) + style2.paddingBottom * 2
        };
    }

    getBtnList(){
        const {btnList} = this.props;
        let btnL = [];
        btnList.forEach((v,i,a)=>{
            if(typeof v == 'string'){
                btnL.push({
                    text:v
                });
            }
            else
            {
                btnL.push(v);
            }
        });

        // console.info("btnList",btnList);

        return btnL;
    }

    render() {
        MenuBottom.self = this;
        const {isVisible} = this.state;
        const btnList = this.getBtnList();
        const frameStyleHeight = this.getFrameStyle();
        /* onCancel 点击取消按钮 触发事件*/
        return(
            isVisible ?
                <CustomActionSheet
                    frameStyle={[styles.frameStyle,frameStyleHeight]}
                    buttonText={"取消"}
                    modalVisible={isVisible}
                    onCancel={()=>this.show()}>
                    {
                        btnList.map(this.renderItem)
                    }
                </CustomActionSheet>
                : null
        );
    }
}

const styles = StyleSheetAdapt.create({
    frameStyle:{
        // height:200,
        backgroundColor:Theme.Colors.foregroundColor,
        // flex: 1,
        borderRadius: 5,
        /*justifyContent: 'center',
        alignItems: 'center',*/
        paddingBottom:30,
        paddingTop:30,
        // marginBottom: 0,
    },

    btnFrame:{
        // marginTop:10,
        // borderTopWidth:Theme.Border.borderWidth,
        borderBottomWidth:Theme.Border.borderWidth,
        borderColor:Theme.Colors.themeColor,
    },
    btn:{
        borderRadius: 0,
        height:50,
        // flex:1,
        // flexDirection:"row",
        // width:StyleSheetAdapt.getWidth() - StyleSheetAdapt.getWidth(10)
        backgroundColor:Theme.Colors.foregroundColor,
    },
    btnTop:{
        borderTopWidth:Theme.Border.borderWidth,
        borderColor:Theme.Colors.themeColor,
    },
    btnTextStyle:{
        color:Theme.Colors.themeColor,
    }
});