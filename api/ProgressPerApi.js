/**
 * Created by ken on 2016/11/13.
 */

import React,{Component} from 'react';
import PropTypes  from 'prop-types';
import {
    View,
    TouchableOpacity,
    Platform,
} from 'react-native';
import RootSiblings from 'react-native-root-siblings';
import * as Progress from 'react-native-progress';

import {StyleSheetAdapt} from "./StyleSheetAdapt";
let showingDialog = null;

/**
 * 显示进度的进度条
 * **/
export class ProgressPerApi extends Component{

    /**
     * 显示进度条
     * @param progress number；//进度条进度值
     * @returns {SiblingsManager}
     */
    static show(progress = 0){
        if(showingDialog == null){
            showingDialog = new RootSiblings(<ProgressPer progress={progress}/>);
        }
        else
        {
            showingDialog.update(<ProgressPer progress={progress}/>);
        }

        return showingDialog;
    }

    /**
     * 隐藏进度条
     */
    static hide(){
        if (showingDialog != null && showingDialog instanceof RootSiblings) {
            showingDialog.destroy();
            showingDialog = null;
        }
    }

}

class ProgressPer extends Component {

    //属性注释及类型,所有的属性对象都是句柄模式（类型时number），类似C语言中的指针
    static propTypes = {
        visible:PropTypes.bool, //进度条是否显示，默认是：true
        size:PropTypes.number, //加载条大小
        progress:PropTypes.number,//进度条进度0～1之间
    }

    static defaultProps={
        visible:true,
        size:Platform.OS == "ios"
            ? StyleSheetAdapt.getWidth(100)
            : StyleSheetAdapt.getWidth(120),
        progress:0,

    }


    // 构造
    constructor(props) {
        super(props);
    }

    formatText = ()=>{
        const {progress} = this.props;
        let per = parseInt(progress * 1000) / 10;
        // console.info("progress",parseInt(this.state.progress * 1000) / 10);
        return per + "%";
    }

    render() {

        const {size,progress} = this.props;

        return(
            <View style={styles.frame}>

                <TouchableOpacity activeOpacity={1}
                                  delayPressIn={0}
                                  style={styles.container}>

                    {
                        Platform.OS == "ios"
                            ? <Progress.Circle size={size} // 圆的直径
                                                       progress={progress}
                                                       unfilledColor="rgba(255,255,255,0.5)" // 剩余进度的颜色
                                                       color={"#d35400"} // 颜色
                                                       thickness={StyleSheetAdapt.getWidth(6)} // 内圆厚度
                                                       showsText={true}//显示进度比文字
                                //indeterminate={true}
                                                       textStyle={{fontSize:StyleSheetAdapt.getWidth(30),color:'#d35400'}}
                                                       formatText={this.formatText}/>
                            :  <View style={styles.containerInner}>
                                <Progress.CircleSnail size={size} // 圆的直径
                                                      color={"#d35400"} // 颜色
                                                      thickness={StyleSheetAdapt.getWidth(6)} // 厚度
                                                      animating={true}/>
                                <Text style={styles.textStyle}>上传中</Text>
                            </View>
                    }

                </TouchableOpacity>

            </View>

        );

    }

}


const styles = StyleSheetAdapt.create({
    frame:{
        backgroundColor:'rgba(0,0,0,0.8)',//黑色
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
        // backgroundColor: 'rgba(00, 00, 00, 0.8)',//黑色
        // opacity:0.5,
    },
    containerInner: {

        justifyContent: 'center',
        alignItems: 'center',
    },
    textStyle: {
        position:'absolute',
        zIndex: 1111,
        color:"#d35400",
        fontSize:30,
    },
});
