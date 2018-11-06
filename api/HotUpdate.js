import {
    Platform,
    Linking,
} from 'react-native';
import {
    isFirstTime,
    isRolledBack,
    packageVersion,
    currentVersion,
    checkUpdate,
    downloadUpdate,
    switchVersion,
    switchVersionLater,
    markSuccess,
} from 'react-native-update';

import KActivityIndicator from 'react-native-kactivityindicator';

/**
 发布热更新报错 将node_modules\react-native-update\local-cli\lib\bundle.js
 的439行种的metro-bundler改成metro可成功运行！
 报错版本0.52+
 **/
import _updateConfig from 'lx_yyt/update';
import {Tools} from "./Tools";
import {LocalStorage} from "./LocalStorage";
const {appKey} = _updateConfig[Platform.OS];
import DeviceInfo from "react-native-device-info";
import {Alert} from "./Alert";

/**
 * 热更新，提供热更新各种方法
 * **/
export class HotUpdate{

    static update = {
        code1:777,//777、立刻更新；888、立刻强制更新；999、立刻静默更新
        code2:888,//777、立刻更新；888、立刻强制更新；999、立刻静默更新
        code3:999,//777、立刻更新；888、立刻强制更新；999、立刻静默更新
        reboot1:555,//666、强制使用更新；555、用户决定是否使用更新;333、下次启用更新 默认是555
        reboot2:666,//666、强制使用更新；555、用户决定是否使用更新;333、下次启用更新 默认是555
        reboot3:333,//666、强制使用更新；555、用户决定是否使用更新;333、下次启用更新 默认是555
        execute:false,//是否监听更新
        versionHash:null,//版本key
    }
    static timer = null;

    static updateDelay(toast=true){
        if(!HotUpdate.timer){
            toast?Tools.toast("更新询问延迟1分钟！"):null;
            HotUpdate.timer = setTimeout(()=>{
                HotUpdate.update.execute = true;
                HotUpdate.update.versionHash = null;
                HotUpdate.timer = null;
            },60000);
        }
    }

    /**
     * 回滚
     * **/
    static RolledBack(){
        if (isFirstTime) {
            Alert.alert('提示', '这是当前版本第一次启动,是否要模拟启动失败?失败将回滚到上一版本', [
                {text: '是', onPress: ()=>{throw new Error('模拟启动失败,请重启应用')}},
                {text: '否', onPress: ()=>{markSuccess()}},
            ]);
        } else if (isRolledBack) {
            Alert.alert('提示', '刚刚更新失败了,版本被回滚.');
        }
    }

    /**
     * 更新应用
     * @Param cd func,//回调函数
     * **/
    static doUpdate = (info,cd,reboot) =>{

        downloadUpdate(info).then(hash => {
            KActivityIndicator.hide();
            // alert("hash:" + JSON.stringify(hash) + "\ncurrentVersion:" + JSON.stringify(currentVersion) );

            LocalStorage.save(Tools.app_config.versionkey,
                info.name).then((dataSave)=>{

                switch (reboot)
                {
                    case HotUpdate.update.reboot1:{
                        Alert.alert('提示', '下载完毕,是否重启应用?', [
                            {text: '是', onPress: ()=>{
                                    Tools.cutLogin = true;
                                    if(!Tools.isCurStruct){
                                        LocalStorage.save(DeviceInfo.getVersion(),
                                            DeviceInfo.getVersion())
                                            .then((dataSave)=>{
                                                switchVersion(hash);
                                            });
                                    }
                                    else
                                    {
                                        switchVersion(hash);
                                    }
                                }},
                            {text: '否', onPress:()=>{
                                    HotUpdate.update.versionHash = info.hash;
                                    // HotUpdate.update.execute = true;
                                    LocalStorage.save(Tools.app_config.versionkey,
                                        Tools.app_config.version);
                                    HotUpdate.updateDelay();
                                    cd&&cd();

                                }
                            },
                            {text: '下次启动时更新', onPress: ()=>{

                                    HotUpdate.update.versionHash = info.hash;
                                    HotUpdate.update.execute = true;
                                    if(!Tools.isCurStruct){
                                        LocalStorage.save(DeviceInfo.getVersion(),
                                            DeviceInfo.getVersion())
                                            .then((dataSave)=>{
                                                switchVersionLater(hash);
                                                cd&&cd();
                                            });
                                    }
                                    else
                                    {
                                        switchVersionLater(hash);
                                        cd&&cd();
                                    }
                                }
                            },
                        ]);
                        break;
                    }
                    case HotUpdate.update.reboot2:{
                        Tools.cutLogin = true;
                        if(!Tools.isCurStruct){
                            LocalStorage.save(DeviceInfo.getVersion(),
                                DeviceInfo.getVersion())
                                .then((dataSave)=>{
                                    switchVersion(hash);
                                });
                        }
                        else
                        {
                            switchVersion(hash);
                        }

                        break;
                    }
                    case HotUpdate.update.reboot3:{
                        if(info.metaInfo.finishInfo){
                            Alert.alert("更新完成",info.metaInfo.finishInfo+"");
                        }
                        HotUpdate.update.versionHash = info.hash;
                        HotUpdate.update.execute = true;
                        if(!Tools.isCurStruct){
                            LocalStorage.save(DeviceInfo.getVersion(),
                                DeviceInfo.getVersion())
                                .then((dataSave)=>{
                                    cd&&cd();
                                    switchVersionLater(hash);
                                });
                        }
                        else
                        {
                            cd&&cd();
                            switchVersionLater(hash);
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
     * 检查更新
     * @Param cd func,//回调函数
     * @Param cdUpdate func,//更新回调函数
     * **/
    static checkUpdate = (cd,cdUpdate) => {

        /**
         * 返回的info有三种情况：

         {expired: true}：该应用包(原生部分)已过期，需要前往应用市场下载新的版本。

         {upToDate: true}：当前已经更新到最新，无需进行更新。

         {update: true}：当前有新版本可以更新。info的name、description字段可 以用于提示用户，
         而metaInfo字段则可以根据你的需求自定义其它属性(如是否静默更新、 是否强制更新等等)。
         另外还有几个字段，包含了完整更新包或补丁包的下载地址，
         react-native-update会首先尝试耗费流量更少的更新方式。
         将info对象传递给downloadUpdate作为参数即可。
         * **/
        checkUpdate(appKey)
            .then(info => {
                // console.info("checkUpdate",info);

                // if(true){
                if(!__DEV__){

                    let userInfo = null;
                    let init = false;
                    if(Tools.userConfig.userInfo == ''
                        || Tools.userConfig.userInfo == null){
                        userInfo = {};
                        init = true;
                    }
                    else{
                        userInfo = Tools.userConfig.userInfo;
                    }

                    info.metaInfo = info.metaInfo ? JSON.parse(info.metaInfo) : {};
                    info.metaInfo.code = typeof info.metaInfo.code == 'number'
                        ? info.metaInfo.code
                        : HotUpdate.update.code1;
                    info.metaInfo.reboot = typeof info.metaInfo.reboot == 'number'
                        ? info.metaInfo.reboot
                        : HotUpdate.update.reboot1;

                    // Tools.toast("init:" + init + "     " + Tools.isCurStruct);

                    if(init || !Tools.isCurStruct){
                        info.metaInfo.code = 888;
                        info.metaInfo.reboot = 666;

                        /*info.metaInfo = {
                            code:888,
                            reboot:666
                        };*/
                    }

                    if (info.expired) {
                        cdUpdate&&cdUpdate();
                        HotUpdate.update.execute = false;
                        switch (info.metaInfo.code)
                        {
                            case HotUpdate.update.code1:{
                                Alert.alert('提示', '应用版本已更新,请前往应用商店下载新的版本', [
                                    {text: '确定', onPress: ()=>{
                                            HotUpdate.update.versionHash = info.hash;
                                            // HotUpdate.update.execute = true;
                                            HotUpdate.updateDelay(false);
                                            info.downloadUrl && Linking.openURL(info.downloadUrl);
                                        }
                                    },
                                    {text: '取消', onPress: ()=>{
                                            HotUpdate.update.versionHash = info.hash;
                                            // HotUpdate.update.execute = true;
                                            cd&&cd();
                                            HotUpdate.updateDelay();
                                        }
                                    },
                                ]);

                                break;
                            }
                            /*case HotUpdate.update.code2:{
                                HotUpdate.update.versionHash = info.hash;
                                // HotUpdate.update.execute = true
                                HotUpdate.updateDelay(false);
                                info.downloadUrl && Linking.openURL(info.downloadUrl);
                                break;
                            }
                            case HotUpdate.update.code3:{
                                HotUpdate.update.versionHash = info.hash;
                                // HotUpdate.update.execute = true;
                                HotUpdate.updateDelay(false);
                                info.downloadUrl && Linking.openURL(info.downloadUrl);
                                break;
                            }*/
                        }

                    }
                    else if (info.upToDate) {
                        // Alert.alert('提示', '应用版本已是最新.');
                        // HotUpdate.RolledBack();
                        markSuccess();
                        cd&&cd();
                    }
                    else if(info.update){

                        let update = false;
                        if(info.metaInfo.updateList){
                            info.metaInfo.updateList.forEach((v)=>{
                                if((userInfo.userid + '') == (v + '')){
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
                                if((userInfo.userid + '') == (v + '')){
                                    update = false;
                                }
                            });
                        }

                        if(update){

                            // Tools.isIndicate = false;
                            HotUpdate.update.execute = false;


                            switch (info.metaInfo.code)
                            {

                                case HotUpdate.update.code1:{
                                    cdUpdate&&cdUpdate();
                                    if(HotUpdate.update.versionHash !== info.hash){
                                        // Tools.toast("是否下载")
                                        Alert.alert('检查到新的版本'+info.name+'\n是否下载?',
                                            info.description, [
                                                {text: '是', onPress: ()=>{
                                                        KActivityIndicator.show(true,"更新中...");
                                                        HotUpdate.doUpdate(info,cd,info.metaInfo.reboot);
                                                    }},
                                                {text: '否', onPress:()=>{
                                                        HotUpdate.update.versionHash = info.hash;
                                                        HotUpdate.updateDelay();
                                                        cd&&cd();
                                                    }
                                                },
                                            ]);
                                    }

                                    break;
                                }
                                case HotUpdate.update.code2:{
                                    cdUpdate&&cdUpdate();
                                    KActivityIndicator.show(true,"更新中...");
                                    HotUpdate.doUpdate(info,cd,info.metaInfo.reboot);
                                    break;
                                }
                                case HotUpdate.update.code3:{
                                    if(info.metaInfo.reboot !== HotUpdate.update.reboot3){
                                        cdUpdate&&cdUpdate();
                                    }
                                    HotUpdate.doUpdate(info,cd,info.metaInfo.reboot);
                                    break;
                                }
                            }
                        }
                        else {
                            cd&&cd();
                        }
                    }
                }
                else {
                    cd&&cd();
                }


            })
            .catch(err => {
                // Alert.alert('提示', '更新失败.');
                cd&&cd();
            });
    };

}

const updateLoop = setInterval(()=>{
    if(HotUpdate.update.execute){
        // console.info("HotUpdate","HotUpdate");
        HotUpdate.checkUpdate();
    }
},10000);