import React, { Component } from 'react';
import PropTypes  from 'prop-types';
import {
    View,
    Modal,
    Text,
    TouchableOpacity,
} from 'react-native';

import DeviceInfo from 'react-native-device-info';

import {
    StyleSheetAdapt,
    Tools,
    Theme,
    DbMgr,
    Media,
    IamgeWaterMark,
} from "../api/api";
import {Image} from "./Image";
import {ButtonChange} from "./ButtonChange";

/**
 *  固定图片水印模版UI
 * **/
export class ImageViewWatermark extends Component {

    static base;

    static propTypes = {
        imageUrl:PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.string
        ]),//图片路径数组
    }

    // 构造
    constructor(props) {
        super(props);
        ImageViewWatermark.base = this;
        Tools.imageViewWatermark = this;
        this.resolve = null;

        // 初始状态
        this.state = {
            visible:false,//是否显示
            imageUrl:null,//显示图片
            locationJson:{
                address:null,//地址
                coords:null,
                timestamp:null,
                userName:null,
                taskName:null,
                device:null,
                lat:null,
                lng: null,
                time:null,
            },
            locationInfo:{},
        };

    }

    /**
     * 显示图片
     * @param bool bool,//是否显示，true:显示，false：隐藏，可不传：显示状态时关闭，反之打开
     * @param imageUrl string/numbber,//图片
     * @param location json,//位置数据
     * @param resolve resolve,//Promise的回调函数
     * **/
    static show(imageUrl,bool,location,resolve){
        bool = bool == undefined ? !this.state.visible : bool;//是否显示
        if(resolve){
            ImageViewWatermark.base.resolve = resolve;
            let obj = {
                visible: bool,//是否显示
                imageUrl: typeof imageUrl == 'string' ? {uri: imageUrl} : imageUrl
            }
            if(location !== null){
                obj = {
                    visible: bool == undefined ? !this.state.visible : bool,//是否显示
                    imageUrl:typeof imageUrl == 'string' ? {uri:imageUrl} :imageUrl,
                    locationInfo:location,
                    locationJson:{
                        address: location.address == null
                            ? location.address
                            : "地址：" + location.address,
                        time: location.timestamp == null
                            ? location.timestamp
                            : "创建时间：" + Tools.timeFormatConvert(
                            location.timestamp,
                            "YYYY-MM-DD HH:mm:ss"),
                        timestamp:location.timestamp,
                        coords:"坐标：" + location.lat + "," + location.lng,
                        lat:location.lat,
                        lng: location.lng,
                        userName:"创建人：" + Tools.userConfig.userInfo.full_name,
                        // taskName:location.taskName == null
                        //     ? location.taskName
                        //     : "任务：" + location.taskName,
                        taskName:null,
                        device:"设备：" + DeviceInfo.getDeviceId() + "(" + DeviceInfo.getUniqueID() + ")"
                    }
                }
            }
            ImageViewWatermark
                .base
                .setState(obj);
        }
        else {
            return new Promise(resolve=>{
                this.show(imageUrl,bool,location,resolve);
            });
        }


    }
    show = (imageUrl,bool,location,resolve)=>{
        bool = bool == undefined ? !this.state.visible : bool;//是否显示
        if(resolve){
            this.resolve = resolve;
            let obj = {
                visible: bool,
                imageUrl: typeof imageUrl == 'string' ? {uri: imageUrl} : imageUrl
            }

            if(location != null){
                obj = {
                    visible: bool == undefined ? !this.state.visible : bool,//是否显示
                    imageUrl:typeof imageUrl == 'string' ? {uri:imageUrl} :imageUrl,
                    locationInfo:location,
                    locationJson:{
                        address: location.address == null
                            ? location.address
                            : "地址：" + location.address,
                        time: location.timestamp == null
                            ? location.timestamp
                            : "创建时间：" + Tools.timeFormatConvert(
                            location.timestamp,
                            "YYYY-MM-DD HH:mm:ss"),
                        timestamp:location.timestamp,
                        coords:"坐标：" + location.lat + "," + location.lng,
                        lat:location.lat,
                        lng: location.lng,
                        userName:"创建人：" + Tools.userConfig.userInfo.full_name,
                        // taskName:location.taskName == null
                        //     ? location.taskName
                        //     : "任务：" + location.taskName,
                        taskName:null,
                        device:"设备：" + DeviceInfo.getDeviceId() + "(" + DeviceInfo.getUniqueID() + ")"
                    }
                }
            }

            this.setState(obj);
        }
        else
        {
            return new Promise(resolve=>{
                this.show(imageUrl,bool,location,resolve);
            });
        }

    }

    onRequestClose(){

    }

    onCallback(path){
        Media.clean();
        this.setState({visible:false},
            ()=>{
                let obj = this.state.locationInfo;
                IamgeWaterMark.markText(path,obj.taskName)
                    .then(path2=>{
                        obj.path = path2;
                        // setTimeout(()=>{Tools.toast(path2+"")},5000);
                        // console.info("IamgeWaterMark",result);
                        this.resolve&&this.resolve(obj);
                    });
               /* setTimeout(()=>{
                    alert(path)
                },0);*/
            });
    }

    finish = ()=>{
        Tools.captureViewScreen(this.refBg,undefined,undefined,false,true)
            .then((path)=>{
                // console.info("path","dsada")
                const {locationInfo} = this.state;
                DbMgr.insertTableMedia([
                    path,
                    locationInfo.lat,
                    locationInfo.lng,
                    locationInfo.timestamp,
                    locationInfo.address,
                    Tools.userConfig.userInfo.full_name,
                    1,
                    null,
                    null
                ])
                    .then(()=>{
                        this.onCallback(path);
                    })
                    .catch(()=>{
                        this.onCallback(path);
                    });

            }).catch(()=>{
        },0);
    }

    render() {
        ImageViewWatermark.base = this;
        Tools.imageViewWatermark = this;

        const {visible,imageUrl,locationJson} = this.state;

        return(
            visible ?
                <Modal {...this.props}
                       animationType={"slide"}
                       visible={visible}
                       onRequestClose={()=> this.onRequestClose()}>

                    <Image source={imageUrl}
                           refImage={c=>this.refBg=c}
                           style={styles.imageFrame}>

                        <View style={styles.infoFrame}>
                            <Text style={[styles.text,styles.textAdress]}>
                                {locationJson.taskName}
                            </Text>
                            <Text style={[styles.text,styles.textAdress]}>
                                {locationJson.userName}
                            </Text>
                            <Text style={[styles.text,styles.textAdress]}>
                                {locationJson.device}
                            </Text>
                            <Text style={[styles.text,styles.textAdress]}>
                                {locationJson.time}
                            </Text>
                            <Text style={[styles.text,styles.textAdress]}>
                                {locationJson.coords}
                            </Text>
                            <Text style={[styles.text,styles.textAdress]}>
                                {locationJson.address}
                            </Text>
                        </View>

                    </Image>

                    <ButtonChange text={"完成"}
                                  frameStyle={[styles.btn]}
                                  style={styles.btnF}
                                  textStyle={styles.textBtn}
                                  onPress={this.finish}/>

                </Modal>
                : null
        );

    }

}

const styles = StyleSheetAdapt.create({
    textAdress:{
        marginBottom: 20,
        marginLeft: 20,
    },
    infoFrame:{
        position: "absolute",
        bottom: 0,
    },
    textTask:{
        marginTop: 20,
        marginLeft: 20,
    },
    text:{
        fontSize:Theme.Font.fontSize_2,
        color:Theme.Colors.appRedColor,
    },
    textBtn:{
        color: Theme.Colors.backgroundColor3,
    },
    btnF:{
        backgroundColor:Theme.Colors.transparent,
    },
    btn:{
        position: "absolute",
        zIndex: 10, //z轴方向的层级，越大越在顶部
        right:20,
        bottom:20,
        borderWidth:Theme.Border.borderWidth,
        borderColor:Theme.Colors.backgroundColor3,
        borderRadius:Theme.Border.borderRadius1,
    },
    imageFrame:{
        width:'w',
        height:'h',
    },
});