import {
    DeviceEventEmitter,
    NativeModules,
} from 'react-native';
import JPushModule from 'jpush-react-native';
import {Tools} from "./Tools";
import {HotUpdate} from "./HotUpdate";

const listeners = {};
const receiveCustomMsgEvent = 'receivePushMsg'
const receiveNotificationEvent = 'receiveNotification'
const openNotificationEvent = 'openNotification'
const connectionChangeEvent = 'connectionChange'

const getRegistrationIdEvent = 'getRegistrationId' // Android Only
const openNotificationLaunchAppEvent = 'openNotificationLaunchApp' // iOS Only
const networkDidLogin = 'networkDidLogin' // iOS Only
const receiveExtrasEvent = 'receiveExtras' // Android Only

/**
 *  极光推送类，提供极光推送的各种方法
 * **/
export class JPush {
    static isFirst = true;

    /**
     * 启动极光推送
     * @param alias	string,	//string 设置的别名
     * @param tags	Set<String> ,	//Set<String>设置的标签
     * alias和tags同时成功回调then，否则回调catch；都回传数据obj  = {
                alias:null,
                tags:null
            }；
     * **/
    static startJPush(alias,tags){
        JPushModule.initPush();
        // console.info("tags",tags)
        return new Promise((resolve, reject) => {
            this.addConnectionChangeListener()
                .then(()=>{
                    this.setAliasAndTags(alias,tags)
                        .then((retJson)=>{
                            resolve(retJson);
                        }).catch(retJson=>{
                        reject(retJson);
                    });
                });
        });
    }

    /**
     * 停止推送，调用该方法后将不再受到推送
     */
    static stopJPush(){
        JPushModule.stopPush();
    }

    /**同时设置别名与标签, 执行完成后回调callbackFunction
     * @param alias	string,	//string 设置的别名
     * @param tags	Set<String> ,	//Set<String>设置的标签
     * alias和tags同时成功回调then，否则回调catch；都回传数据obj  = {
                alias:null,
                tags:null
            }；
     alias/tags成功则回传设置的alias/tags，否则为null
     * **/
    static setAliasAndTags(alias,tags) {
        return new Promise((resolve, reject) => {
            let obj  = {
                alias:null,
                tags:null
            };
            let isAlias = false;
            let isTags = false;
            JPushModule.setAlias(alias, result => {
                isAlias = true;
                if(result.errorCode == 0){
                    obj.alias = result.alias;

                    if(isTags){
                        if(obj.tags){
                            resolve(obj);
                        }
                        else {
                            reject(obj);
                        }
                    }
                }
                else {
                    if(isTags){
                        reject(obj);
                    }
                }
            });

            JPushModule.setTags(tags, result => {
                isTags = true;
                if(result.errorCode === 0){
                    obj.tags = result.tags;

                    if(isAlias){
                        if(obj.alias){
                            resolve(obj);
                        }
                        else {
                            reject(obj);
                        }
                    }
                }
                else {
                    if(isAlias){
                        reject(obj);
                    }
                }
            });
        });
    }

    /**
     * 监听：接收通知 推送事件
     */
    static addReceiveNotificationListener () {
        return new Promise(resolve => {
            JPushModule.addReceiveNotificationListener(map=>{
                resolve(map);
                // Tools.toast("addReceiveNotificationListener");
            });
        });
    }

    /**
     * 监听： 接收自定义消息后事件
     */
    static addReceiveCustomMsgListener (cb) {
        return new Promise(resolve => {
            JPushModule.addReceiveCustomMsgListener(map=>{
                resolve(map);
            });
        });
    }

    /**
     * iOS Only
     * 点击推送启动应用的时候原生会将该 notification 缓存起来，该方法用于获取缓存 notification
     * 注意：notification 可能是 remoteNotification 和 localNotification，两种推送字段不一样。
     * 如果不是通过点击推送启动应用，比如点击应用 icon 直接启动应用，notification 会返回 undefine。
     * @param {Function} cb = (notification) => {}
     */
    static getLaunchAppNotification () {
        return new Promise((resolve,reject) => {
            JPushModule.getLaunchAppNotification((result)=>{

                this.isFirst&&JPushModule.addReceiveOpenNotificationListener(result=>{
                    // this.openAppCheck(cd,false);
                    if(!this.isFirst){
                        Tools.toSpecifiedPageInPush(result.extras);
                    }

                });


                if(this.isFirst){
                    this.isFirst = false;
                    if(result){
                        resolve(result);
                    }
                    else {
                        reject(null);
                    }
                }
                else
                {
                    reject(null);
                }



            });
        });
    }

    /**
     * 监听：连接状态变更
     * 如果连接状态变更为已连接返回 true
     * 如果连接状态变更为断开连接连接返回 false
     */
    static addConnectionChangeListener () {
        return new Promise((resolve, reject) => {
            JPushModule.addConnectionChangeListener(state=>{
                if(state){
                    resolve(state);
                }
                else
                {
                    reject(state);
                }
            })
        });
    }

    /**
     * 清除通知栏的所有通知
     */
    static clearAllNotifications () {
        JPushModule.clearAllNotifications();
    }

    /**
     *  打开app 初始化 并处理相关推送事件
     * **/
    static openAppCheck(){
        this.clearAllNotifications();

        return new Promise((resolve, reject) => {

            this.getLaunchAppNotification()
                .then(result=>{
                    /* setTimeout(()=>{
                         alert("result  " +  JSON.stringify(result));
                     },0);*/
                    Tools.toSpecifiedPageInPush(result.extras);

                    resolve(result);
                })
                .catch((status)=>{
                    /*setTimeout(()=>{
                        alert("cat," +  status ? JSON.stringify(status) : status);
                    },0);*/
                    reject(status);
                });
        });

    }









    /**
     * 初始化JPush 必须先初始化才能执行其他操作
     */
    static initJPush () {
        JPushModule.initPush();
    }
    /**
     * 恢复推送功能，停止推送后，可调用该方法重新获得推送能力
     */
    static resumePush () {
        if (Tools.platformType) {
            JPushModule.setupPush();
        }
        else {
            JPushModule.resumePush();
        }
    }

    /**
     * 获取当前连接状态
     * //@param {Fucntion} cb = (Boolean) => {}
     * 如果连接状态变更为已连接返回 true
     * 如果连接状态变更为断开连接连接返回 false
     */
    static getConnectionState () {
        return new Promise((resolve, reject) => {
            JPushModule.getConnectionState(state => {
                if(state){
                    resolve(state);
                }
                else {
                    reject(state);
                }
            });
        });

    }

    /**
     * 重新设置 Tag
     * @param {Array} tags = [String]
     * @param {Function} cb = (result) => {  }
     * 如果成功 result = {tags: [String]}
     * 如果失败 result = {errorCode: Int}
     */
    static setTags (tags) {

        return new Promise((resolve, reject) => {
            JPushModule.setTags(tags, result => {
                if(result.tags){
                    resolve(result);
                }
                else {
                    reject(result);
                }
            });
        });
    }

    /**
     * 重置 alias
     * @param {String} alias
     * @param {Function} cb = (result) => { }
     * 如果成功 result = {alias: String}
     * 如果失败 result = {errorCode: Int}
     *
     */
    static setAlias (alias) {
        return new Promise((resolve, reject) => {
            JPushModule.setAlias(alias, result => {
                if(result.alias){
                    resolve(result);
                }
                else {
                    reject(result);
                }

            });
        });
    }

    /**
     * @deprecated Since version 2.2.0, will deleted in 3.0.0.
     * iOS Only
     * 监听：应用没有启动的状态点击推送打开应用
     * 注意：2.2.0 版本开始，提供了 getLaunchAppNotification
     *
     * @param {Function} cb = (notification) => {}
     */
    static addOpenNotificationLaunchAppListener (cb) {
        listeners[cb] = DeviceEventEmitter.addListener(
            openNotificationLaunchAppEvent,
            registrationId => {
                cb(registrationId)
            }
        )
    }

    /**
     * @deprecated Since version 2.2.0, will deleted in 3.0.0.
     * iOS Only
     * 取消监听：应用没有启动的状态点击推送打开应用
     * @param {Function} cb = () => {}
     */
    static removeOpenNotificationLaunchAppEventListener (cb) {
        if (!listeners[cb]) {
            return
        }
        listeners[cb].remove()
        listeners[cb] = null
    }


    /**
     * 取消监听：点击推送事件
     * @param {Function} cb  = (Object）=> {}
     */
    static removeReceiveOpenNotificationListener (cb) {
        if (!listeners[cb]) {
            return
        }
        listeners[cb].remove()
        listeners[cb] = null
    }

}


/*JPush.addReceiveNotificationListener()
    .then(result=>{
        result = result.extras;
        // Tools.toast(JSON.stringify(result))
        if(result.code === HotUpdate.update.code1
            || result.code === HotUpdate.update.code2
            || result.code === HotUpdate.update.code3){

            HotUpdate.checkUpdate(null,result.code,result.reboot);
        }
    });*/
