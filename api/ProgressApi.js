/**
 * Created by ken on 2016/11/13.
 */

import React,{Component} from 'react';
import PropTypes  from 'prop-types';
import {
    View,
    TouchableOpacity,
} from 'react-native';
import RootSiblings from 'react-native-root-siblings';
import Spinner from "react-native-spinkit";

import {StyleSheetAdapt} from "./StyleSheetAdapt";
let showingDialog = null;

/**
 * 加载指示器（加载条）
 * **/
export class ProgressApi extends Component{
    static loadding = false;
    static countShow = 0;
    static countHide = 0;

    /**
     * 显示加载指示器
     * @returns {SiblingsManager}
     */
    static show(){
        this.countShow++;
        if(this.loadding && showingDialog != null){
            return showingDialog;
        }

        this.loadding = true;

        showingDialog = new RootSiblings(<Progress/>)

        /*showingDialog = new RootSiblings(<ActivityIndicatorContent
            animated={KActivityIndicator.animated}
            message={KActivityIndicator.message}
        />)*/


        return showingDialog;
    }

    /**
     * 隐藏菊花加载指示器
     */
    static hide(){
        if(++this.countHide == this.countShow){
            if (showingDialog != null && showingDialog instanceof RootSiblings) {
                this.loadding = false;
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
    }

    /**
     * 更新菊花文字
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

class Progress extends Component {

    //属性注释及类型,所有的属性对象都是句柄模式（类型时number），类似C语言中的指针
    static propTypes = {
        type:PropTypes.bool, //进度条类型，true:'Wave',false:WanderingCubes,默认是：true
        visible:PropTypes.bool, //进度条是否显示，默认是：true
        size:PropTypes.number, //加载条大小
    }

    static defaultProps={
        type:true,
        visible:true,
        size:StyleSheetAdapt.getWidth(100),

    }

    // 构造
    constructor(props) {
        super(props)
    }

    render() {
        const {type,visible,size} = this.props;

        if(type)
        {
            return(
                <View style={styles.frame}>
                    <TouchableOpacity activeOpacity={0}
                                      delayPressIn={0}
                                      style={styles.container}>
                        <View style={styles.container}>
                            <Spinner style={styles.spinner}
                                     isVisible={visible}
                                     size={size}
                                     type={"Wave"}
                                     color={"#d35400"}/>
                        </View>

                    </TouchableOpacity>
                </View>
            );
        }
        else
        {
            let cont = this.state.visible
                ? <View style={styles.containerIndicator}>
                    <Spinner style={styles.spinner}
                             isVisible={visible}
                             size={size}
                             type={"WanderingCubes"}
                             color={"#d35400"}/>
                </View>
                : null;
            return(
                cont
            );
        }


    }

}


const styles = StyleSheetAdapt.create({
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
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        //backgroundColor: '#d35400',
    },
    spinner: {
        marginBottom: 50,
    },
    indicator:{
        width:200,
        height:200,

    },
    containerIndicator:{
        position:'absolute',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width:'w',
        height:'h',
        backgroundColor: 'rgba(00, 00, 00, 0.8)',
        zIndex:111,
    }
});

