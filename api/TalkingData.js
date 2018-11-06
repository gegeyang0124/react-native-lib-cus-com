import * as TD from 'react-native-talkingdata';
// import {HttpUrls} from "./HttpUrls";
import {Tools} from "./Tools";

/**
 * talkingdata app统计分析
 * **/
export class TalkingData{

    /**
     * 事件类别
     * **/
    static EventTabel = {
        http:"http",// 网络请求事件
        func:'func',//功能事件
        userEvent:'userEvent',//用户事件
    }

    /**
     * 追踪页面开始 与trackPageEnd成对使用
     * @param page_name string,//页面名
     * **/
    static trackPageBegin(page_name){
        TD.trackPageBegin(page_name);
    }

    /**
     * 追踪页面结束 与trackPageEnd成对使用
     * @param page_name string,//页面名
     * **/
    static trackPageEnd(page_name){
        TD.trackPageEnd(page_name);
    }

    /**
     * 追踪事件
     * @param event_name string,//事件名
     * @param event_label string,//事件类别
     * @param parameters string,//事件参数
     * **/
    static trackEvent(event_name, event_label, parameters){
        TD.trackEvent(event_name, event_label, parameters);
    }

    /**
     *  获取URL的key
     *  @param url string,//接口地址
     * **/
    static getUrlKey(url){
        return "";
        let key = null;

        Object.keys(HttpUrls.urlSets)
            .forEach(k => {
                if(HttpUrls.urlSets[k] == url){
                    key = k;
                }
            });

        return key;
    }

    /**
     * 追踪事件 http
     * @param event_name string,//事件名
     * @param url string,//接口地址
     * @param type string,//请求类型
     * @param params string,//事件参数
     * **/
    static trackEventHttp(event_name, url,type,params={}){
        params.userId = Tools.userConfig.userInfo == null
            ? ''
            : Tools.userConfig.userInfo.id;
        params.user_id = params.userId;
        params.phone = Tools.userConfig.userInfo == null
            ? ''
            : Tools.userConfig.userInfo.phone;
        TD.trackEvent(event_name + "_" + HttpUrls.IPConfig.serviceType + "_" + type + "_" + this.getUrlKey(url),
            this.EventTabel.http,
            params);
    }

    /**
     * 设置设备位置
     * **/
    static setLocation(){

        navigator.geolocation.getCurrentPosition(
            (location) => {
                /*var result = "速度 ：" + location.coords.speed +
                 "\n经度：" + location.coords.longitude +
                 "\n纬度：" + location.coords.latitude +
                 "\n准确度：" + location.coords.accuracy +
                 "\n行进方向：" + location.coords.heading +
                 "\n海拔：" + location.coords.altitude +
                 "\n海拔准确度：" + location.coords.altitudeAccuracy +
                 "\n时间戳：" + location.timestamp;*/
                TD.setLocation(location.coords.latitude, location.coords.longitude);

            },
            (error) => {
                //alert(JSON.stringify(error))

                this.trackEvent("定位失败",this.EventTabel.func,error);
            },
            {enableHighAccuracy: false, timeout: 20000, maximumAge: 1000}
        );

    }

    /**
     * 获取设备ID
     * **/
    static getDeviceID(){
        return TD.getDeviceID();
    }
}
