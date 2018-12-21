/**
 * Created by ken on 2016/11/13.
 */

import React,{Component} from 'react';
import PropTypes  from 'prop-types';
import {
    View,
    TouchableOpacity,
    Text,
    Image,
    ActivityIndicator,
} from 'react-native';
import RootSiblings from 'react-native-root-siblings';

import {StyleSheetAdapt} from "./StyleSheetAdapt";
import {Theme} from "./Theme";
import {TextChange} from "../ui/TextChange";
import {ImageViewApi} from "./ImageViewApi";
import {VideoView} from "../ui/VideoView";
let showingDialog = null;

export class Alert extends Component{


    /**
     * 显示对话框
     * @param title string,//提示
     * @param msg msg,//信息
     * @param btns array,//按钮，与框架Alert用法一致
     * @param opts object,//按钮配置，与框架Alert用法一致
     * @param imgUri number/string,//可以是静态图片资源，也可是网络图片资源
     * @param isImg bool,//是否是视频，默认true：图片;false：视频；
     * @returns {SiblingsManager}
     */
    static alert(title,msg,btns,opts={},imgUri,isImg=true){
        opts = opts == undefined ? {} : opts;
        btns = btns == null ? undefined : btns;

        let alr = <AlertUI title={title}
                           msg={msg}
                           imgUri={imgUri}
                           btnList={btns}
                           isImg={isImg}
                           onDismiss={opts.onDismiss}
                           cancelable={opts.cancelable}/>;

        if(showingDialog == null){
            showingDialog = new RootSiblings(alr);
        }
        else
        {
            showingDialog.update(alr);
        }


        return showingDialog;
    }

    /**
     * 隐藏对话框
     */
    static hide(){
        if (showingDialog != null && showingDialog instanceof RootSiblings) {
            showingDialog.destroy();
            showingDialog = null;
        }

    }

};

class AlertUI extends Component {

    //属性注释及类型,所有的属性对象都是句柄模式（类型时number），类似C语言中的指针
    static propTypes = {
        title:PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number,
        ]),//提示头
        msg:PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number,
        ]),//提示信息
        imgUri:PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number,
        ]),//图片
        btnList:PropTypes.array,
        cancelable:PropTypes.bool,
        onDismiss:PropTypes.func,

        isImg:PropTypes.bool,//是否是视频，默认true：图片;false：视频；
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
        isImg:false,
    }

    // 构造
    constructor(props) {
        super(props);

        this.state = {
            imgUri:null,
            imgW:300,
            imgH:0,
            indicator:true,
        };
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

    _getIsImage(){

        const {imgUri,isImg} = this.props;

        let img = true;

        if(imgUri)
        {
            if(imgUri.constructor == String)
            {
                if(imgUri.toLowerCase().lastIndexOf(".mp4") > -1)
                {
                    img = false;
                }
            }
            else
            {
                img = isImg;
            }
        }

        if(img){
            const {imgW} = this.state;

            if(imgUri && !this.state.imgUri)
            {
                if(imgUri.constructor == String)
                {
                    Image.getSize(imgUri, (w,h)=>{
                        // console.info("h",h)
                        this.setState({
                            imgUri:{uri:imgUri},
                            imgH:h / w * imgW
                        });
                    });

                }
                else
                {
                    const img = Image.resolveAssetSource(imgUri);

                    this.setState({
                        imgUri:imgUri,
                        imgH:img.height / img.width * imgW
                    });

                }
            }
        }

        return img;
    }



    render() {
        const {btnList,cancelable,msg,title,imgUri} = this.props;
        const {indicator,imgW,imgH} = this.state;

        let isImg = this._getIsImage();

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

                    {
                        !isImg&&<VideoView source={typeof imgUri == 'string'
                            ? {uri:imgUri}
                            : imgUri}
                                           style={styles.video}
                                           autoPlay={true}/>
                    }


                    {
                        isImg&&imgUri&&indicator
                        &&<ActivityIndicator size="large"
                                             color="#0000ff"
                                             style={styles.img}/>
                    }

                    {
                        isImg&&imgUri
                            ? <TouchableOpacity onPress={()=>{
                                typeof imgUri == 'string'
                                    ? ImageViewApi.show([imgUri])
                                    : null;
                            }}>
                                <Image source={
                                    typeof imgUri == 'string'
                                        ? {uri:imgUri}
                                        : imgUri}
                                       onLoadEnd={()=>{
                                           // console.info("dd","vv");
                                           this.setState({indicator:false})
                                       }}
                                       style={[
                                           styles.img,
                                           StyleSheetAdapt.styleJsonAdaptConvert({
                                               width:imgW,
                                               // height:200,
                                               height:indicator ? 1 : imgH,
                                               resizeMode:"contain",
                                           })
                                       ]}/>
                            </TouchableOpacity>
                            : null
                    }

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
    video:{
        width:300,
        height:300 * 0.75,
    },

    img:{
        marginTop:20,
        // height:400,
        // backgroundColor:"red",
    },

    btn2:{
        // marginTop:20,
        width:230,
        // width:180,
        height:40,
        // backgroundColor:Theme.Colors.backgroundColor1,
    },
    btn:{
        // flex:1,
        width:150,
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
        // width:230,
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



