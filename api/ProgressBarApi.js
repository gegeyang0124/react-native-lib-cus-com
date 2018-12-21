/**
 * Created by ken on 2016/11/13.
 */

import React,{Component} from 'react';
import PropTypes  from 'prop-types';
import {
    View,
    TouchableOpacity,
    Platform,
    Text,
    Image,
} from 'react-native';
import RootSiblings from 'react-native-root-siblings';
import * as Progress from 'react-native-progress-cus';

import {StyleSheetAdapt} from "./StyleSheetAdapt";
import {Theme} from "./Theme";
let showingDialog = null;

export class ProgressBarApi extends Component{

    /**
     * 进度条
     * @param progress number；//进度条进度值
     * @param title string；//提示文本
     * @param imgUri string/number；//圖片地址或require()
     * @returns {SiblingsManager}
     */
    static show(progress=0,title='',imgUri){
        if(showingDialog == null){
            showingDialog = new RootSiblings(<ProgressPer progress={progress}
                                                          imgUri={imgUri}
                                                          title={title}/>);
        }
        else
        {
            showingDialog.update(<ProgressPer progress={progress}
                                              title={title}/>);
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
        imgUri:PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.string
        ]),//圖片地址或require()
        title:PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.string
        ]),//提示文本
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

        const {size,progress,title,imgUri} = this.props;

        return(
            <View style={styles.frame}>

                <TouchableOpacity activeOpacity={1}
                                  delayPressIn={0}
                                  style={styles.container}>
                    {
                        imgUri
                        &&<Image source={typeof imgUri == 'string'
                            ? {uri:imgUri}
                            : imgUri}
                                 style={styles.logoImage}/>
                    }

                   <Text style={styles.backage}>
                       {title}
                       {this.formatText()}
                   </Text>

                    <Progress.Bar width={StyleSheetAdapt.getWidth('0.8w')}
                                  height={StyleSheetAdapt.getHeight(6)}
                                  useNativeDriver={true}
                                  progress={progress}
                                  // animationConfig={{ bounciness: 20 }}
                                  unfilledColor="rgba(255,255,255,0.5)" // 剩余进度的颜色
                                  color={"#d35400"} // 颜色
                                  thickness={StyleSheetAdapt.getWidth(6)} // 内圆厚度
                    />

                </TouchableOpacity>

            </View>

        );

    }

}

const styles = StyleSheetAdapt.create({
    logoImage:{
        width: 180,
        height: 180,
        marginBottom:10,
        resizeMode:Image.resizeMode.contain,
    },
    backage:{
        fontSize:Theme.Font.fontSize,
        marginBottom:5,
    },
    frame:{
        backgroundColor:"white",
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
