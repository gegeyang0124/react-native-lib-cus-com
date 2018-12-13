import {
    Platform,
} from 'react-native';

import {Tools} from "./Tools";
import {Alert} from "./Alert";
import {LocalStorage} from "./LocalStorage";
import {ProgressPerApi} from "./ProgressPerApi";
const HUpdate = require("./HotUpdate").HotUpdate;

/*import {
    packageVersion,
    currentVersion,
    mainBundleFilePath,
    HotUpdate,
} from "react-native-update-js";
import DeviceInfo from "react-native-device-info";*/

import {Components} from "./../StackComponent";
const RNFS = Components.react_native_fs;
import {Components} from "./../StackComponent";
const {
    packageVersion,
    currentVersion,
    mainBundleFilePath,
    HotUpdate,
    build,
} = Components.react_native_update_js;
// const DeviceInfo = Components.react_native_device_info;

/**
 * 热更新，提供热更新各种方法,自己配置服务器
 * **/
export class HotUpdateCus{

    static appID = null;//当前给app指定（分配）的id,可以是任何数据，必须传入，用于判断是否需要更新
    static tag = "";//热更新的标志 与后台配置一致
    static host = null;//热更新配置文件地址或接口，//get请求
    static updateFirst = true;//app第一次启动是否强制更新，默认true更新

    static update = {
        code1:777,//777、立刻更新；888、立刻强制更新；999、立刻静默更新
        code2:888,//777、立刻更新；888、立刻强制更新；999、立刻静默更新
        code3:999,//777、立刻更新；888、立刻强制更新；999、立刻静默更新
        reboot1:555,//666、强制使用更新；555、用户决定是否使用更新;333、下次启用更新 默认是555
        reboot2:666,//666、强制使用更新；555、用户决定是否使用更新;333、下次启用更新 默认是555
        reboot3:333,//666、强制使用更新；555、用户决定是否使用更新;333、下次启用更新 默认是555
        execute:false,//是否监听更新
        version:currentVersion,//当前已更新的版本号

        hasVersion:null,//已经更新或拒绝的更新版本的
    }
    static timer = null;

    /**
     * 设置标识 热更新的标志 与后台配置一致
     * @param tag string,//标识
     * **/
    static setTag(tag:string){
        HotUpdate.tag = tag;//热更新的标志 与后台配置一致
    }

    /**
     * 持续检测是否有更新
     * **/
    static checkUpdateLoop(){
        setInterval(()=>{
            if(HotUpdateCus.update.execute){
                // console.info("HotUpdate","HotUpdate");
                HotUpdateCus.checkUpdate();
            }
        },20000);
    }

    /**
     * 检查更新
     * @Param cd func,//回调函数
     * @Param cdUpdate func,//更新回调函数
     * **/
    static checkUpdate = (cd,cdUpdate) => {
        HotUpdate.tag = HotUpdateCus.tag;
        HotUpdate.host = HotUpdateCus.host;
        HotUpdate.checkUpdate()
            .then(info=>{
                let rnUpdate = false;
                if(info.metaInfoPkg && info.metaInfoPkg.rnUpdate != undefined){
                    if(typeof info.metaInfoPkg.rnUpdate == "boolean" && info.metaInfoPkg.rnUpdate)
                    {
                        rnUpdate = true;
                    }
                }

                if(rnUpdate){
                    HUpdate.checkUpdate();
                }
                else
                {
                    info.metaInfo = info.metaInfo ? info.metaInfo : {};
                    info.metaInfo.code = typeof info.metaInfo.code == 'number'
                        ? info.metaInfo.code
                        : HotUpdateCus.update.code1;
                    info.metaInfo.reboot = typeof info.metaInfo.reboot == 'number'
                        ? info.metaInfo.reboot
                        : HotUpdateCus.update.reboot1;

                    if(HotUpdateCus.updateFirst && build == null){
                        info.metaInfo.code = 888;
                        info.metaInfo.reboot = 666;
                    }

                    if (info.expired) {
                        cdUpdate&&cdUpdate();
                        if(HotUpdateCus.isHasUpdate(info)){
                            HotUpdateCus.update.execute = false;

                            switch (info.metaInfo.code)
                            {
                                case HotUpdateCus.update.code1:{
                                    if(HotUpdateCus.update.hasVersion != info.packageVersion){
                                        Alert.alert('检查到新的静态版本'+info.packageVersion+'\n是否下载?',
                                            info.description, [
                                                {text: '确定', onPress: ()=>{
                                                        HotUpdateCus.updateDelay(false);
                                                        HotUpdate.downloadUpdate();
                                                    }
                                                },
                                                {text: '取消', onPress: ()=>{
                                                        HotUpdateCus.update.hasVersion = info.packageVersion;
                                                        HotUpdateCus.updateDelay();
                                                        cd&&cd();

                                                    }
                                                },
                                            ]);
                                    }

                                    break;
                                }
                                default:{
                                    HotUpdateCus.updateDelay(false);
                                    HotUpdate.downloadUpdate();
                                    break;
                                }
                            }

                        }

                    }
                    else if(info.update){
                        HotUpdateCus.checkHasUpate(info,(info)=>{
                            HotUpdateCus.update.execute = false;

                            info.metaInfo = info.metaInfo ? info.metaInfo : {};
                            info.metaInfo.code = typeof info.metaInfo.code == 'number'
                                ? info.metaInfo.code
                                : HotUpdateCus.update.code1;
                            info.metaInfo.reboot = typeof info.metaInfo.reboot == 'number'
                                ? info.metaInfo.reboot
                                : HotUpdateCus.update.reboot1;

                            if(HotUpdateCus.updateFirst && build == null){
                                info.metaInfo.code = 888;
                                info.metaInfo.reboot = 666;
                            }

                            switch (info.metaInfo.code)
                            {
                                case HotUpdateCus.update.code1: {
                                    cdUpdate&&cdUpdate();
                                    if(HotUpdateCus.update.hasVersion != info.build){
                                        // if(HotUpdateCus.update.version !== info.version){
                                        if(build == null || info.build > build){
                                            Alert.alert('检查到新的版本'+info.version+'\n是否下载?',
                                                info.description, [
                                                    {text: '是', onPress: ()=>{

                                                            HotUpdateCus.doUpdate(info,cd,info.metaInfo.reboot);
                                                        }},
                                                    {text: '否', onPress:()=>{
                                                            HotUpdateCus.updateDelay();
                                                            HotUpdateCus.update.hasVersion = info.build;
                                                            cd&&cd();
                                                        }
                                                    },
                                                ]);
                                        }
                                    }

                                    break;
                                }
                                case HotUpdateCus.update.code2:{
                                    cdUpdate&&cdUpdate();
                                    HotUpdateCus.doUpdate(info,cd,info.metaInfo.reboot);
                                    break;
                                }
                                case HotUpdateCus.update.code3:{
                                    if(info.metaInfo.reboot !== HotUpdateCus.update.reboot3){
                                        cdUpdate&&cdUpdate();
                                    }
                                    HotUpdateCus.doUpdate(info,cd,info.metaInfo.reboot);
                                    break;
                                }
                            }

                        },cd);
                    }
                }
            })
            .catch(()=>{});
    }

    /**
     * 是否有更新版本
     * @prama info json;//后台返回的数据
     * @prama resolve func;//有更新时的回调函数 回传与info一样的数据格式
     * @prama reject func;//没有更新时的回调函数 回传与info一样的数据格式
     * @prama index int;info.publishJS的下标 可不传
     * **/
    static checkHasUpate(info,resolve:Function,reject:Function,index=0){
        /*let curVer = HotUpdateCus.update.version;
        if(curVer){
            curVer = curVer.split(".").join("");
            curVer = parseInt(curVer);
        }
        let nxtVer = info.version;
        nxtVer = nxtVer.split(".").join("");
        nxtVer = parseInt(nxtVer);
        if(!HotUpdateCus.update.version || nxtVer > curVer){*/
        let curVer = build;
        let nxtVer = info.build;

        if(curVer == null || nxtVer > curVer){
            if(this.isHasUpdate(info)){
                resolve&&resolve(info);
            }
            else
            {
                if(++index < info.publishJS.length){
                    let updateInfo = Object.assign({},info,info.publishJS[index]);
                    this.checkHasUpate(updateInfo,resolve,reject,index);
                }
                else
                {
                    reject&&reject();
                }
            }

        }
        else
        {
            reject&&reject();
        }
    }

    /**
     * 是否有更新版本
     * @prama info json;//后台返回的数据
     * return boolean;//有:返回true,反之false
     * **/
    static isHasUpdate(info){
        let update = false;
        if(info.metaInfo.updateList){
            info.metaInfo.updateList.forEach((v)=>{
                if(this.appID == v){
                    update = true;
                }
            });
        }
        else {
            //更新全部
            update = true;
        }

        if(info.metaInfo.updateNoList){
            info.metaInfo.updateNoList.forEach((v)=>{
                if(this.appID == v){
                    update = false;
                }
            });
        }

        return update;
    }

    /**
     * 更新延迟
     * @parma toast bool,//是否提示信息
     * **/
    static updateDelay(toast=true){
        HotUpdateCus.update.execute = true;
        return;

        if(!HotUpdateCus.timer){
            toast?Tools.toast("更新询问延迟1分钟！"):null;
            HotUpdateCus.timer = setTimeout(()=>{
                HotUpdateCus.update.execute = true;
                HotUpdateCus.timer = null;
            },60000);
        }
    }

    /**
     * 更新应用
     * @Param cd func,//回调函数
     * **/
    static doUpdate = (info,cd,reboot) =>{

        HotUpdate.downloadUpdate(info,(per)=>{
            ProgressPerApi.show(per);
        })
            .then(info => {
                ProgressPerApi.hide();
                LocalStorage.save(Tools.app_config.versionkey,
                    {
                        version:info.version,
                        rnUpdate:false
                    })
                    .then((dataSave)=>{

                switch (reboot)
                {
                    case HotUpdateCus.update.reboot1:{
                        if(HotUpdateCus.update.hasVersion != info.build){
                            Alert.alert('提示', '下载完毕,是否重启应用?', [
                                {text: '是', onPress: ()=>{
                                        HotUpdate.setPreferData("rnUpdate","false");
                                        Tools.cutLogin = true;
                                        if(!Tools.isCurStruct){
                                            LocalStorage.save(packageVersion,
                                                packageVersion)
                                                .then((dataSave)=>{
                                                    HotUpdate.doUpdate(info);
                                                });
                                        }
                                        else
                                        {
                                            HotUpdate.doUpdate(info);
                                        }
                                    }},
                                {text: '否', onPress:()=>{
                                        LocalStorage.save(Tools.app_config.versionkey,
                                            {
                                                version:Tools.app_config.version,
                                                rnUpdate:false
                                            });
                                        HotUpdateCus.updateDelay();
                                        HotUpdateCus.update.hasVersion = info.build;
                                        cd&&cd();

                                    }
                                },
                                {text: '下次启动时更新', onPress: ()=>{
                                        HotUpdate.setPreferData("rnUpdate","false");
                                        HotUpdateCus.update.version = info.version;
                                        HotUpdateCus.update.hasVersion = info.build;
                                        HotUpdateCus.update.execute = true;
                                        if(!Tools.isCurStruct){
                                            LocalStorage.save(packageVersion,
                                                packageVersion)
                                                .then((dataSave)=>{
                                                    HotUpdate.doUpdate(info,false);
                                                    cd&&cd();
                                                });
                                        }
                                        else
                                        {
                                            HotUpdate.doUpdate(info,false);
                                            cd&&cd();
                                        }
                                    }
                                },
                            ]);
                        }

                        break;
                    }
                    case HotUpdateCus.update.reboot2:{
                        HotUpdate.setPreferData("rnUpdate","false");
                        Tools.cutLogin = true;
                        if(!Tools.isCurStruct){
                            LocalStorage.save(packageVersion,
                                packageVersion)
                                .then((dataSave)=>{
                                    HotUpdate.doUpdate(info);
                                });
                        }
                        else
                        {
                            HotUpdate.doUpdate(info);
                        }

                        break;
                    }
                    case HotUpdateCus.update.reboot3:{
                        HotUpdate.setPreferData("rnUpdate","false");
                        if(info.metaInfo.finishInfo){
                            Alert.alert("更新完成",info.metaInfo.finishInfo+"");
                        }
                        HotUpdateCus.update.version = info.version;
                        HotUpdateCus.update.hasVersion = info.build;
                        HotUpdateCus.update.execute = true;
                        if(!Tools.isCurStruct){
                            LocalStorage.save(packageVersion,
                                packageVersion)
                                .then((dataSave)=>{
                                    cd&&cd();
                                    HotUpdate.doUpdate(info,false);
                                });
                        }
                        else
                        {
                            cd&&cd();
                            HotUpdate.doUpdate(info,false);
                        }

                        break;
                    }
                }
            });



        }).catch(err => {
            // Tools.toast('更新失败!');
            cd&&cd();
        });
    }

    /**
     * 验证是否存在组件
     * **/
    static verfyComponent(type = 1){
        let b = true;
        switch (type){
            case 1:{
                if(!checkUpdate){
                    console.info("请安装热更新组件","react-native-update");
                    Tools.toast("请安装组件 react-native-update");
                    b = false;
                }

                break;
            }
           /* case 2:{
                if(!DeviceInfo.getVersion){
                    console.info("请安装设备信息获取组件","react-native-device-info");
                    Tools.toast("请安装组件 react-native-device-info");
                    b = false;
                }

                break;
            }*/
        }

        return b;
    }
}
