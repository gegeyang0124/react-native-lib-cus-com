/**
 * Created by ken on 2016/11/13.
 */

import React,{Component} from 'react';
import PropTypes  from 'prop-types';
import {
    View,
    TouchableOpacity,
    Text,
} from 'react-native';
import RootSiblings from 'react-native-root-siblings';

import {StyleSheetAdapt} from "./StyleSheetAdapt";
import {Theme} from "./Theme";
import {TextChange} from "../ui/TextChange";
let showingDialog = null;

export default class Alert extends Component{


    /**
     * 显示对话框
     * @param title string,//提示
     * @param msg msg,//信息
     * @param btns array,//按钮，与框架Alert用法一致
     * @param opts object,//按钮配置，与框架Alert用法一致
     * @returns {SiblingsManager}
     */
    static alert(title,msg,btns,opts={}){

        if(showingDialog != null){
            return showingDialog;
        }

        showingDialog = new RootSiblings(<AlertUI title={title}
                                                  msg={msg}
                                                  btnList={btns}
                                                  onDismiss={opts.onDismiss}
                                                  cancelable={opts.cancelable}/>);

        /*showingDialog = new RootSiblings(<ActivityIndicatorContent
            animated={KActivityIndicator.animated}
            message={KActivityIndicator.message}
        />)*/


        return showingDialog;
    }

    /**
     * 关闭对话框
     */
    static hide(){
        if (showingDialog != null && showingDialog instanceof RootSiblings) {
            // showingDialog.update(<ActivityIndicatorContent
            //     animated={KActivityIndicator.animated}
            //     message={KActivityIndicator.message}
            //     isHide={true}
            //
            // />)
            //
            // showingDialog = null;
            showingDialog.destroy();
            showingDialog = null;
        }

        // if (AIV instanceof RootSiblings) {
        //
        //     AIV.update(<ActivityIndicatorContent
        //         animated={KActivityIndicator.animated}
        //         message={KActivityIndicator.message}
        //         isHide={true}
        //     />)
        // }
    }

    /**
     * 更新对话框
     * @param AIV 需要更新文字的菊花
     * @param message 文字内容
     */
    static  updateMessage(AIV,message){
        /* AIV.update(<ActivityIndicatorContent
             animated={KActivityIndicator.animated}
             message={message}
         />)*/
    }

};

class AlertUI extends Component {

    //属性注释及类型,所有的属性对象都是句柄模式（类型时number），类似C语言中的指针
    static propTypes = {
        title:PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number,
        ]),
        msg:PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number,
        ]),
        btnList:PropTypes.array,
        cancelable:PropTypes.bool,
        onDismiss:PropTypes.func,
    }

    static defaultProps={
        btnList:[
            {
                text:"确定",
                onPress:()=>{}
            }
        ],
        cancelable:false,
        onDismiss:()=>{},
    }

    // 构造
    constructor(props) {
        super(props)
    }

    renderItem = (item,i)=>{

        return (
            <TextChange key={i}
                        style={this.props.btnList.length > 2
                            ? styles.btn2
                            : styles.btn}
                        text={item.text}
                        onPress={()=>{
                            item.onPress&&item.onPress();
                            Alert.hide();
                        }}
                        textStyle={styles.text3}/>
        );
    }

    close = ()=>{
        const {onDismiss} = this.props;
        Alert.hide();
        onDismiss&&onDismiss();
    }

    render() {
        const {btnList,cancelable,msg,title} = this.props;

        return(
            <TouchableOpacity activeOpacity={0}
                              delayPressIn={0}
                              disabled={!cancelable}
                              onPress={this.close}
                              style={styles.frame}>
                <TouchableOpacity style={styles.container}
                                  activeOpacity={1}>
                    <View style={styles.container_1}>
                        <Text style={styles.text1}>
                            {title}
                        </Text>
                    </View>

                    <View style={styles.container_2}>
                        <Text style={styles.text2}>
                            {msg}
                        </Text>
                    </View>

                    <View style={[styles.container_3,btnList.length < 3 && {flexDirection:"row"}]}>
                        {
                            btnList.map(this.renderItem)
                        }
                    </View>
                </TouchableOpacity>

            </TouchableOpacity>
        );


    }

}

const styles = StyleSheetAdapt.create({
    btn2:{
        // marginTop:20,
        width:230,
        height:40,
        // backgroundColor:Theme.Colors.backgroundColor1,
    },
    btn:{
        flex:1,
        height:50,
        // marginTop:20,
        // backgroundColor:Theme.Colors.backgroundColor1,
    },

    text3:{
        fontSize:Theme.Font.fontSize_1,
        color:Theme.Colors.progressColor,
    },
    container_3:{
        marginTop:10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container_2:{
        marginTop:20,
    },
    text2:{
        fontSize:Theme.Font.fontSize_2,
    },
    text1:{
        fontSize:Theme.Font.fontSize_1_1,
        fontWeight: 'bold',
        color:Theme.Colors.backgroundColor3,
        textAlign:"center",
    },
    container_1:{
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        // flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Theme.Colors.foregroundColor,
        padding:15,
        borderColor:Theme.Colors.appRedColor,
        borderWidth:Theme.Border.borderWidth,
        borderRadius:10,
        width:230,
    },

    frame:{
        backgroundColor:'rgba(0,0,0,0.05)',
        // backgroundColor:"red",
        justifyContent:'center',
        alignItems:'center',
        position:'absolute',
        width:'w',
        height:'h',
        left:0,
        top:0
    },
});

