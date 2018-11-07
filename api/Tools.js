import {
    StyleSheet,
    Platform,
    Dimensions,
    CameraRoll,
} from 'react-native';

/*import DeviceInfo from "react-native-device-info";
import Toast from 'react-native-root-toast';*/
/**
 * react-native-doc-viewer
 * 可以在手机上直接打开文档，支持远程和本地文档。
 * 支持的文档格式：xls,ppt,doc,xlsx,pptx,docx,png,jpg,pdf,mp4。
 * 支持iOS和Android。
 * **/
// import OpenFile from "react-native-doc-viewer";

import moment from 'moment-zy';
import Geolocation from 'Geolocation';

import {Http} from "./Http";
import {HttpUrls} from "./HttpUrls";
import {LocalStorage} from "./LocalStorage";

import {PickerCustome} from "./PickerCustome";
import {Theme} from "./Theme";
import {CaptureImage} from "./CaptureImage";

import {Components} from "./../StackComponent";
const Toast = Components.react_native_root_toast;
const OpenFile = Components.react_native_doc_viewer;

//import Record from 'react-native-record-sound';

const screen = Dimensions.get('window');

/**
 * 工具类，提供各种功能
 * export default class Tools //在外部引用时不需要大括号括起来，如：import Tools from 路径
 * export  class Tools //import {Tools} from 路径
 * **/
export class Tools {

    static progress = null;//等待指示器
    static progressPer = null;//进度条 下载上传
    static imageBrower = null;//图片浏览
    static imageViewWatermark = null;//图片展示-水印
    static flatListView = null;//滑动加载列表
    static baseComponent = null;//导航组件对象
    static page = null;//传入的页面
    static isIndicate = true;//请求指示是否显示
    static cutLogin = true;//切换账户


    /**
     * 屏幕长宽分辨率json
     * **/
    static screen = screen;
    static platformType = Platform.OS == "ios" ? true : false;//true:ios,false:android
    static ONE_DAY_TIME = 86400000;//一天的时间，单位毫秒
    static videoRecordTimeConfig = undefined;//乐歆app录制视频配置时间长
    static isCurStruct = false; //是否是最新版
    static userConfig = {
        position:{
            lat:23.157003,
            lng:113.264531
        },//用户当前位置信息 字段查看定位封装
        namekey: 'userInfo',//用户信息存储键名 key
        token: null,//登陆后的token，检验登陆是否有效
        Authorization:null,//新token
        submitOnce: true,//提交一次，防止多次提交
        isPush: true,//是否启动推送; true启动，false不启动
        userInfo: null,//用户信息;null:正在提取数据，''：提取数据库为空
        userCutAccount: null,//切换账户用户信息
        taskIdOpen: "09034035-431c-471f-9a98-d27093f58561",//特殊任务类型，新店开业
        taskTypeIdGuideCustome: "10045059-2090-4960-bd4b-05552c8e86ed",//特殊任务类型，巡店任务自定义类型
        imgportmentCaseActivityFollowId: "5188387d-c657-488c-9454-cbb42bb029d4",//重点专案，添加任务 类型->活动跟踪id
    };

    /**
     * app 配置数据信息
     * **/
    static app_config = {
        app_id: 1438062830,//appid苹果官网appid
        version: null,//当前版本号；后台配置文件是最新的app版本 VERSION = 1.1
        app_url: null,//app下载地址，后台下载地址APP_URL 以后台为准；
        versionTxt: null,//当前显示版本号,
        serviceConfig:{},//后台配置数据
        versionkey:"version",//版本key
    };//app配置信息

    /**
     * 初始化
     * **/
    static init() {
      /*  LocalStorage.get(DeviceInfo.getVersion())
            .then((reponseJson) => {

                if(reponseJson !== undefined && reponseJson !== null){
                    Tools.isCurStruct = true;
                }

                if (this.app_config.version == null) {
                    LocalStorage.get(this.app_config.versionkey).then((reponseJson) => {
                        if(reponseJson == null || !Tools.isCurStruct){
                            this.app_config.version = "2.0.4";
                        }
                        else
                        {
                            this.app_config.version = reponseJson;
                        }
                    });
                }

                // console.info("reponseJson:"+Tools.isCurStruct,reponseJson);
            });




        let interval = setInterval(() => {
            if (this.app_config.versionTxt == null
                && HttpUrls.urlSets != null
                && this.app_config.version != null) {
                clearInterval(interval);

                this.app_config.app_url = HttpUrls.urlSets.urlAppleAPPDownload + "/id" + this.app_config.app_id + "?l=en&mt=8";
                this.app_config.versionTxt = HttpUrls.IPConfig.IP == HttpUrls.urlSets.IP
                    ? "v" + this.app_config.version + " 运营版"
                    : HttpUrls.IPConfig.IPTest == HttpUrls.urlSets.IP
                        ? "v" + this.app_config.version + " 门投版"
                        : "v" + this.app_config.version + " 其他版";

                Http.getAjax(HttpUrls.urlSets.urlConfig)
                    .then(results=>{
                        let result = JSON.parse(results);
                        this.app_config.serviceConfig = result?result:{};
                    });
            }

        }, 50);

        if (this.userConfig.userInfo == null) {
            LocalStorage.get(this.userConfig.namekey)
                .then((reponseJson) => {

                    this.userConfig.userInfo = reponseJson == null
                    || reponseJson == undefined
                        ? ''
                        : reponseJson;

                });
        }*/
    }


    /**
     * 得到样式属性的json对象
     * @param styleID；//style样式表的句柄（ID）
     * **/
    static getStyle(styleID) {

        var style = {};
        if(typeof(styleID) == 'object')
        {
            style = styleID;
        }
        else
        {
            var s = JSON.stringify(styleID) + '';

            if (s != 'undefined') {
                style = StyleSheet.flatten(styleID);
            }

            style = JSON.parse(JSON.stringify(style));
        }

        return style;

    }

    /**
     * 是否是门投资中心
     * @param departmentId int,//部门id
     return,//若是门投的返回true,反之返回false
     * **/
    static isDoorInvest(departmentId) {
        var bool = false;
        var deptList = [4, 12, 15, 16, 7, 13, 115];
        deptList.forEach(function (value, index, arr) {
            if (value == departmentId) {
                bool = true;
            }
        });

        return bool;
    }

    /**
     * 替换指定位置的字符串 字符串替换处理操作
     * @param str string,//需要处理的字符串
     * @param begin number;//替换字符的起始位置,不传就是字符串的第一个字符起
     * @param end number;//替换字符的结束位置,不传就是字符串的长度
     * @param char string;//替换字符
     * **/
    static replaceStr = (str, begin, end, char) => {
        str += "";
        begin = begin == undefined || begin == null ? 0 : begin;
        end = end == undefined || end == null ? str.length : end;
        char = char == undefined || char == null ? '*' : char + "";
        var fstStr = str.substring(0, begin);
        var scdStr = str.substring(begin, end);
        var lstStr = str.substring(end, str.length);
        // var matchExp = /\w/g;//'/g'表示全局；本正则字符串是把全局中的'w'替换掉
        var matchExp = /[\s\S]/g;//'/g'表示全局；本正则字符串是把全局中的'w'替换掉
        /* 最开始以为.可以匹配任意字符，后来发现有问题，匹配不了换行符\n
         查了下资料，用[\s\S]匹配可以
         解释：\s空白符，\S非空白符，所以[\s\S]是任意字符*/
        scdStr = scdStr.replace(matchExp, char);

        /*str="5=a,6=b,7=c";
         str=str.replace(/(\d+)=(\w)/g,"$2=$1");
         alert(str);//"a=5,b=6,c=7"*/

        return fstStr + scdStr + lstStr;
    }

    /**
     * 获取地理位置
     * **/
    static getLocation() {

        //var url = "http://api.map.baidu.com/geocoder/v2/?ak=C93b5178d7a8ebdb830b9b557abce78b&callback=renderReverse&location=39.992706,116.396574&output=json&pois=0";
        return new Promise(function (resolve, reject) {
            /**
             * •timeout：指定获取地理位置的超时时间，默认不限时。单位为毫秒。
             •maximumAge：最长有效期，在重复获取地理位置时，此参数指定多久再次获取位置。默认为 0，表示浏览器需要立刻重新计算位置。
             •enableHighAccuracy：指示浏览器获取高精度的位置，默认为 false。当开启后，可能没有任何影响，也可能使浏览器花费更长的时间获取更精确的位置数据。

             * **/
            if(!__DEV__){
                Geolocation.getCurrentPosition(
                    // navigator.geolocation.getCurrentPosition(
                    (location) => {

                        /*var result = "速度 ：" + location.coords.speed +
                         "\n经度：" + location.coords.longitude +
                         "\n纬度：" + location.coords.latitude +
                         "\n准确度：" + location.coords.accuracy +
                         "\n行进方向：" + location.coords.heading +
                         "\n海拔：" + location.coords.altitude +
                         "\n海拔准确度：" + location.coords.altitudeAccuracy +
                         "\n时间戳：" + location.timestamp;*/

                        // alert(JSON.stringify(location));

                        // location.coords["timestamp"] = location.timestamp;

                        /* let latlon = location.coords.latitude
                             + ","+ location.coords.longitude;
                         let url = "http://api.map.baidu.com/geocoder/v2/?" +
                             "ak=C93b5178d7a8ebdb830b9b557abce78b&callback=renderReverse&location="
                             + latlon +"&output=json&pois=0";*/

                        Http.getAddress(location.coords.latitude,location.coords.longitude)
                            .then((response) =>{
                                // let response = JSON.parse(retJson.substring(retJson.indexOf('{'), (retJson.lastIndexOf("}") + 1)));

                                /**
                                 * 返回百度位置信息
                                 * **/
                                /* let locationJson = {
                                     city:response.result.addressComponent.city,//城市名
                                     cityCode:response.result.addressComponent.adcode,//城市代码
                                     address:response.result.formatted_address,//地址
                                     lat:response.result.location.lat,//维度
                                     lng:response.result.location.lng,//经度
                                     timestamp:location.timestamp,
                                 };*/

                                response.timestamp = location.timestamp;

                                resolve(response);
                            });

                        //var initialPosition = JSON.stringify(location);
                        // alert(initialPosition)
                    },
                    (error) => {
                        // Tools.toast("")
                        switch (error.code){
                            case 1:{
                                Tools.toast("请授予定位权限");
                                break;
                            }
                            case 2:{
                                Tools.toast("请打开位置服务")
                                break;
                            }
                            case 3:{
                                Tools.toast("信号不好,请重试");
                                break;
                            }
                            default:{
                                Tools.toast("未知错误！");
                            }
                        }
                        // error.code == 2 ? Tools.toast("请打开位置服务")
                        //     : Tools.toast(error.message);

                        reject(error);
                    },
                    {enableHighAccuracy: false, timeout: 10000, maximumAge: 1000}
                );
            }
            else {
                Http.getAddress(Tools.userConfig.position.lat,Tools.userConfig.position.lng)
                    .then((response) =>{
                        response.timestamp = new Date().getTime();

                        resolve(response);
                    });
            }
        });

    }

    /**
     * 消息提示
     * @param msg string,//显示消息
     * **/
    static toast(msg) {
        if(Toast.show){
            Toast.show(msg, {
                duration: Toast.durations.SHORT,
                // duration: Toast.durations.LONG,
                position: Toast.positions.CENTER,
                shadow: true,
                animation: true,
                hideOnPress: true,
                delay: 0,
                /*onShow: () => {
                 // calls on toast\`s appear animation start
                 },
                 onShown: () => {
                 // calls on toast\`s appear animation end.
                 },
                 onHide: () => {
                 // calls on toast\`s hide animation start.
                 },
                 onHidden: () => {
                 // calls on toast\`s hide animation end.
                 }*/
            });
        }
        else
        {
            console.info("请安装toast提示组件","react-native-root-toast");
        }

        //Toast.showShortCenter.bind(null, msg);
    }

    /**
     * 打开文档
     * @prama url string,//本地路径或远程地址
     * 支持的文档格式：xls,ppt,doc,xlsx,pptx,docx,png,jpg,pdf,mp4。
     * **/
    static openDoc(url){

        if(!OpenFile.openDoc){
            console.info("请安装解析office类文件组件","eact-native-doc-viewer");
            Tools.toast("请安装组件 eact-native-doc-viewer");
            return;
        }

        if(url == undefined)
        {
            return;
        }

        Http.downloadFile(url)
            .then(results=>{

                url = results.filePath;
                console.log('aaa')
                // this.progress.show(true,false);
                let opj = {
                    url:url
                };

                if(this.platformType)
                {
                    opj["fileNameOptional"] = url.substring(url.lastIndexOf("/") + 1);

                    OpenFile.openDoc([opj], (error, url) => {

                        // Tools.progress.show(false);
                        if (error)
                        {
                            Tools.toast("文件错误，无法打开");
                        }
                    });
                }
                else
                {
                    //Android
                    opj.fileName = url.substring(url.lastIndexOf("/") + 1);
                    opj.cache = false;
                    opj.fileType = url.substring(url.lastIndexOf(".") + 1);

                    // this.toast("android正在开发支持中，请耐心等待....");
                    OpenFile.openDoc([opj], (error, url) => {

                        // Tools.progress.show(false);
                        if (error)
                        {
                            Tools.toast("文件错误，无法打开");
                        }
                    });
                }
            });

    }

    /**
     * 选择年月
     * @param callback function;//回调函数
     * **/
    static pickMonth(callback){
        return PickerCustome.pickMonth((retJson) =>{
            // this.toast(JSON.stringify(retJson));
            if(retJson.type == 2)
            {
                callback(retJson.data);
            }
        });
    }

    /**
     * 时间格式转化
     * @param time ,需要转化的时间，format不传：time为undefined返回当天0点时间戳，time为null返回当时的时间戳
     * @param format string ,需要转化成的时间格式，若为null或undefined,返回时间戳
     * @param isZero bool;//是否是返回0点0分0秒时间戳，非undefined:是，反之否
     * return ，返回format格式的时间
     * **/
    static timeFormatConvert(time,format,isZero) {

        if(time == undefined  && format == undefined && isZero != undefined)
        {
            var date = new Date();
            return date.getTime();
        }
        else if(time == undefined  && format == undefined)
        {
            var date = new Date();
            return (new Date(date.getFullYear(),date.getMonth(), date.getDate(),0,0,0)).getTime();
        }
        else if(time == undefined  && format != undefined)
        {
            time = new Date().getTime();
            return moment(time).format(format);
        }
        else if(time != undefined && time != null && format == undefined && isZero == undefined)
        {
            // return (new Date(time)).getTime();
            // return moment(time).format();
            return moment(time).toDate().getTime();
        }
        else if(time != null && time != '' && time != undefined && format != undefined && format != ''  && format != null)
        {
            // alert(time + "    " + format);
            return moment(time).format(format);
        }
        else if(isZero != undefined)
        {
            var date = new Date(time);
            return (new Date(date.getFullYear(),date.getMonth(), date.getDate(),0,0,0)).getTime();
        }
        else
        {
            return time == null || time == undefined ? '' : time;
        }
        /*alert("YYYY-MM-DD HH:mm:ss");
         alert(moment("2017-07-21 14:25:30", "YYYY-MM-DD HH:mm:ss").format("YYYY-MM-DD HH:mm:ss"));
         alert(moment("2017-07-21 14:25:30").format("YYYY-MM-DD HH:mm:ss"));
         alert((new Date("2017-07-21 14:25:30")).getTime());
         alert(moment((new Date("2017-07-21 14:25:30")).getTime()).format("YYYY-MM-DD HH:mm:ss"))
         */
    }

    /**
     * 判断是否是数字
     * @apram data,//需要校验的数据
     * return ；//返回true是数字，否则不是
     * **/
    static isNumber(data) {
        // var reg = new RegExp("^\\d+$");
        var reg = new RegExp("^\\d+(\\.\\d+)?$");
        if(reg.test(data))
        {
            // 返回true是数字，否则不是
            return true;
        }
        else
        {
            //不是数字
            return false;
        }
    }

    /**
     * 4个1工程状态转化 数字=》中文
     * @param val string,//状态码
     * @param execId string,//执行人id
     * return retJson = {
            text:'',//中文状态名
            icon:'',//对应的状态logo
            color:'',//状态色
        };
     * **/
    static statusConvertProj1111(val,execId){
        if(val == undefined && execId == undefined)
        {
            let statusList = [1,2,3];

            statusList.forEach((v,i,a)=>{
                statusList[i] = this.statusConvertProj1111(v);
            });

            return statusList;
        }
        else {

            execId = execId ? execId : this.userConfig.userInfo.id;

            let retJson = {
                id:val,
                status:val,
                text:'',
                icon:'',
                color:'',
                isProTask:true,//是否是个人任务，是：true,否：false
                /**
                 * btnList成员
                 * {
                    text:"进入巡店",//按钮文本
                    isTrip:false,//是否是出差功能,进入巡店页还是出差页；true:出差,false:巡店
                    code:1,//0、进入巡店，1、编辑，2、审核，3、检查
                }
                 * **/
                btnList:[],//按钮数组
            };
            let isProTask = this.userConfig.userInfo.id == execId ? true : false;
            retJson.isProTask = isProTask;

            switch (val){
                //待审核
                case 1 : {
                    retJson.btnList = isProTask
                        ? []
                        : [];
                    retJson.text = isProTask ? "未开始" : "未开始";
                    retJson.color = Theme.Colors.appRedColor;
                    retJson.icon = require('./../../res/images/status1.png');
                    return retJson;
                }
                //通过
                case 2 : {
                    retJson.btnList = isProTask
                        ? []
                        : [];
                    retJson.text = isProTask ? "进行中" : "进行中";
                    retJson.color = Theme.Colors.themeColor;
                    retJson.icon = require('./../../res/images/status4.png');
                    return retJson;
                }
                //不通过
                case 3 : {
                    retJson.btnList = isProTask
                        ? []
                        : [];
                    retJson.text = isProTask ? "已完成" : "已完成";
                    retJson.color = Theme.Colors.barGreen;

                    // retJson.icon = require('./../../res/images/status0.png');
                    retJson.icon = require('./../../res/images/status+5.png')
                    return retJson;
                }
            }
        }

    }

    /**
     * 店铺审核状态转化 数字=》中文
     * @param val string,//状态码
     * @param execId string,//执行人id
     * return retJson = {
            text:'',//中文状态名
            icon:'',//对应的状态logo
            color:'',//状态色
        };
     * **/
    static statusConvertAddressAudit(val,execId){

        if(val == undefined && execId == undefined)
        {
            let statusList = ["1","2","3"];

            statusList.forEach((v,i,a)=>{
                statusList[i] = this.statusConvertAddressAudit(v);
            });

            return statusList;
        }
        else {

            execId = execId ? execId : this.userConfig.userInfo.id;

            let retJson = {
                id:val,
                status:val,
                text:'',
                icon:'',
                color:'',
                isProTask:true,//是否是个人任务，是：true,否：false
                /**
                 * btnList成员
                 * {
                    text:"进入巡店",//按钮文本
                    isTrip:false,//是否是出差功能,进入巡店页还是出差页；true:出差,false:巡店
                    code:1,//0、进入巡店，1、编辑，2、审核，3、检查
                }
                 * **/
                btnList:[],//按钮数组
            };
            let isProTask = this.userConfig.userInfo.id == execId ? true : false;
            retJson.isProTask = isProTask;

            switch (val){
                //待审核
                case '1' : {
                    retJson.btnList = isProTask
                        ? []
                        : [];
                    retJson.text = isProTask ? "待审核" : "待审核";
                    retJson.color = Theme.Colors.appRedColor;
                    retJson.icon = require('./../../res/images/status1.png');
                    return retJson;
                }
                //通过
                case '2' : {
                    retJson.btnList = isProTask
                        ? []
                        : [];
                    retJson.text = isProTask ? "通过" : "通过";
                    retJson.color = Theme.Colors.barGreen;
                    retJson.icon = require('./../../res/images/status0.png');
                    return retJson;
                }
                //不通过
                case '3' : {
                    retJson.btnList = isProTask
                        ? []
                        : [];
                    retJson.text = isProTask ? "不通过" : "不通过";
                    retJson.color = Theme.Colors.appRedColor;
                    retJson.icon = require('./../../res/images/status9.png');
                    return retJson;
                }
            }
        }


    }

    /**
     * 出差/巡店状态转化 数字 ==》 中文
     * @param val string,//状态码
     * @param execId string,//执行人id
     * return retJson = {
            text:'',//中文状态名
            icon:'',//对应的状态logo
            color:'',//状态色
        };
     * **/
    static statusConvert(val,execId) {

        if(val == undefined && execId == undefined)
        {
            let statusList = ["0","1","2","4","6","11","12"];

            statusList.forEach((v,i,a)=>{
                statusList[i] = this.statusConvert(v);
            });

            return statusList;
        }
        else
        {
            /**
             * 个人
             1、状态审核中：出差申请发起后
             按钮：编辑（处于审核中的出差申请，可对内容进行编辑）
             2、状态审核退回：上级审核不通过
             按钮：编辑（对审核退回的出差申请进行编辑，二次提交）
             3、状态待执行：取消该状态，审核通过后自动进入执行中
             4、状态执行中：审核通过后
             按钮：进入巡店（进入巡店列表）
             编辑（对出差申请的内容进行编辑或完成出差）
             5、状态未完成：取消该状态
             6、状态检查中：出差申请点击完成后
             按钮：进入巡店（进入巡店列表）
             编辑（对出差申请的内容进行编辑或完成出差）
             7、状态检查退回：上级检查不通过
             按钮：进入巡店（进入巡店列表）
             编辑（对检查退回的出差申请进行编辑，二次提交）
             8、状态转派中：取消该状态
             9、状态取消中：取消该状态
             10、状态待评价：取消该状态
             11、状态已关闭：改为“已完成”，上级检查通过后
             按钮：进入巡店（进入巡店列表）
             编辑（对出差申请的内容进行编辑或完成出差）
             12、状态已报销：CRM回传
             按钮：进入巡店（进入巡店列表）

             上级
             1、状态待审核：接收下级的出差申请，需要当前用户去审核的
             按钮：审核
             2、状态待检查：接收下级已完成的出差申请，需要当前用户去检查的
             按钮：检查
             ---李广成
             * **/

            execId = execId ? execId : this.userConfig.userInfo.id;

            let retJson = {
                id:val,
                status:val,
                text:'',
                icon:'',
                color:'',
                isProTask:true,//是否是个人任务，是：true,否：false
                /**
                 * btnList成员
                 * {
                    text:"进入巡店",//按钮文本
                    isTrip:false,//是否是出差功能,进入巡店页还是出差页；true:出差,false:巡店
                    code:1,//0、进入巡店，1、编辑，2、审核，3、检查
                }
                 * **/
                btnList:[],//按钮数组
            };
            let isProTask = this.userConfig.userInfo.id == execId ? true : false;
            retJson.isProTask = isProTask;

            switch (val)
            {
                case '0' : {
                    retJson.btnList = isProTask
                        ? [
                            {
                                text:"查看详情",
                                isTrip:true,
                                code:1,
                                backgroundColor:Theme.Colors.backgroundColorBtn1,
                            }
                        ]
                        : [];
                    retJson.text = "已完成";
                    retJson.color = Theme.Colors.barGreen;
                    retJson.icon = require('./../../res/images/status+5.png');
                    return retJson;//taskCheck 查看是否可以点评，缺是否点评数据  未点评显示
                }
                case '1' : {
                    retJson.btnList = isProTask
                        ? [
                            {
                                text:"编辑",
                                isTrip:true,
                                code:1,
                                backgroundColor:Theme.Colors.backgroundColorBtn1,

                            }
                        ]
                        : [
                            {
                                text:"审核",
                                isTrip:true,
                                code:2,
                                backgroundColor:Theme.Colors.backgroundColorBtn1,
                            }
                        ];
                    retJson.text = isProTask ? '审核中' : "待审核";
                    retJson.color = Theme.Colors.appRedColor;
                    retJson.icon = require('./../../res/images/status1.png');
                    return retJson;//taskCheck 查看是否可以点评，查看 通过、不通过
                }
                case '2' : {
                    retJson.btnList = isProTask
                        ? [
                            {
                                text:"编辑",
                                isTrip:true,
                                code:1,
                                backgroundColor:Theme.Colors.backgroundColorBtn1,
                            }
                        ]
                        : [];
                    retJson.text = "审核退回";
                    retJson.color = Theme.Colors.appRedColor;
                    retJson.icon = require('./../../res/images/status2.png');
                    return retJson;//taskCheck 查看是否可以点评，下标选项卡消失
                }
                //状态已废弃 巡店任务保留 初查任务废弃
                case '3' : {
                    //状态已废弃
                    retJson.text = isProTask ? "待执行" : "待执行";
                    retJson.color = Theme.Colors.appRedColor;
                    retJson.icon = require('./../../res/images/status3.png');
                    return retJson;//改：taskCheck 不可以点评，标选项卡显示：取消和转派  （没有原形型）
                }
                case '4' : {
                    retJson.btnList = isProTask
                        ? [
                            {
                                text:"进入巡店" ,
                                isTrip:false,
                                code:0,
                                backgroundColor:Theme.Colors.themeColor,
                            },
                            {
                                text:"编辑" ,
                                isTrip:true,
                                code:1,
                                backgroundColor:Theme.Colors.backgroundColorBtn1,
                            }
                        ]
                        : [];
                    retJson.text = "执行中";
                    retJson.color = Theme.Colors.themeColor;
                    retJson.icon = require('./../../res/images/status4.png');
                    return retJson;//改：taskCheck 不可以点评，下标选项卡显示：取消和转派 （没有原形型）
                }
                //状态已废弃
                case '5' : {
                    //状态已废弃
                    retJson.text = "未完成";
                    retJson.color = Theme.Colors.themeColor;
                    retJson.icon = require('./../../res/images/status5.png');
                    return retJson;//taskCheck 不可以点评，下标选项卡消失
                }
                case '6' : {
                    retJson.btnList = isProTask
                        ? [
                            {
                                text:"进入巡店" ,
                                isTrip:false,
                                code:0,
                                backgroundColor:Theme.Colors.themeColor,
                            },
                            {
                                text:"编辑" ,
                                isTrip:true,
                                code:1,
                                backgroundColor:Theme.Colors.backgroundColorBtn1,
                            }
                        ]
                        : [
                            {
                                text:"检查" ,
                                isTrip:true,
                                code:3,
                                backgroundColor:Theme.Colors.backgroundColorBtn1,
                            }
                        ];
                    retJson.text = isProTask ? '检查中' : "待检查";
                    retJson.color = Theme.Colors.appRedColor;
                    retJson.icon = require('./../../res/images/status6.png');
                    return retJson;//改：taskCheck 点击不通过显示点评框，没有评分；点击通过显示点评框，显示输入评分
                }
                //状态已废弃
                case '7' : {
                    //状态已废弃
                    retJson.text = "转派中";
                    retJson.color = Theme.Colors.barGreen;
                    retJson.icon = require('./../../res/images/status7.png');
                    return retJson;//不可以点评，和待审核一样,多了转派人和转派原因 （缺原型）
                }
                //状态已废弃
                case '8' : {
                    //状态已废弃
                    retJson.text = "取消中";
                    retJson.color = Theme.Colors.appRedColor;
                    retJson.icon = require('./../../res/images/status8.png');
                    return retJson;//不可以点评，和待审核一样，多了取消原因（缺原型）
                }
                //状态已废弃
                case '9' : {
                    //状态已废弃
                    retJson.text = "已取消";
                    retJson.color = Theme.Colors.appRedColor;
                    retJson.icon = require('./../../res/images/status9.png');
                    return retJson;//不可以点评，taskCheck 下标选项卡消失
                }
                //状态已废弃
                case '10' : {
                    //状态已废弃
                    retJson.text = "待评价";
                    retJson.color = Theme.Colors.barGreen;
                    retJson.icon = require('./../../res/images/status10.png');
                    return retJson;
                }
                case '11' : {
                    retJson.btnList = isProTask
                        ? [
                            {
                                text:"进入巡店",
                                isTrip:false,
                                code:0,
                                backgroundColor:Theme.Colors.themeColor,
                            },
                            {
                                text:"编辑" +
                                "3",
                                isTrip:true,
                                code:1,
                                backgroundColor:Theme.Colors.backgroundColorBtn1,
                            }
                        ]
                        : [];
                    retJson.text = isProTask ? "检查退回" : null;
                    retJson.color = Theme.Colors.appRedColor;
                    retJson.icon = require('./../../res/images/status2.png');
                    return retJson;
                }
                case '12' : {
                    retJson.btnList = isProTask
                        ? [
                            {
                                text:"进入巡店",
                                isTrip:false,
                                code:0,
                                backgroundColor:Theme.Colors.themeColor,
                            }
                        ]
                        : [];
                    retJson.text = isProTask ? "已报销" : null;
                    retJson.color = Theme.Colors.minorColor;
                    retJson.icon = require('./../../res/images/status11.png');
                    return retJson;
                }
                //客户相关审核
                case '21' : {
                    retJson.btnList = [
                        {
                            text:"查看详情",
                            isTrip:true,
                            code:1,
                            backgroundColor:Theme.Colors.backgroundColorBtn1,
                        }
                    ];
                    retJson.text = "待审批";
                    retJson.color = Theme.Colors.themeColor;
                    retJson.icon = require('./../../res/images/status1.png');
                    return retJson;
                }
                case '22' : {
                    retJson.btnList = [
                        {
                            text:"查看详情",
                            isTrip:true,
                            code:1,
                            backgroundColor:Theme.Colors.backgroundColorBtn1,
                        }
                    ];
                    retJson.text = "审批通过";
                    retJson.color = Theme.Colors.barGreen;
                    retJson.icon = require('./../../res/images/status0.png');
                    return retJson;
                }
                case '23' : {
                    retJson.btnList = [
                        {
                            text:"查看详情",
                            isTrip:true,
                            code:1,
                            backgroundColor:Theme.Colors.backgroundColorBtn1,
                        }
                    ];
                    retJson.text = "审批退回";
                    retJson.color = Theme.Colors.appRedColor;
                    retJson.icon = require('./../../res/images/status3.png');
                    return retJson;
                }
                case '24' : {
                    retJson.btnList = [
                        {
                            text:"审核",
                            isTrip:false,
                            code:0,
                            backgroundColor:Theme.Colors.themeColor,
                        },
                        {
                            text:"查看详情",
                            isTrip:true,
                            code:1,
                            backgroundColor:Theme.Colors.backgroundColorBtn1,
                        }
                    ];
                    retJson.text = "重新申请";
                    retJson.color = Theme.Colors.backgroundColor3;
                    retJson.icon = require('./../../res/images/status4.png');
                    return retJson;
                }
                case '25' : {
                    retJson.btnList = [
                        {
                            text:"查看详情",
                            isTrip:true,
                            code:1,
                            backgroundColor:Theme.Colors.backgroundColorBtn1,
                        }
                    ];
                    retJson.text = "异常";
                    retJson.color = Theme.Colors.appRedColor;
                    retJson.icon = require('./../../res/images/status3.png');
                    return retJson;
                }

                default : {
                    retJson.btnList = isProTask
                        ? [
                            {
                                text:"进入巡店",
                                isTrip:false,
                                code:0,
                                backgroundColor:Theme.Colors.themeColor,
                            }
                        ]
                        : [];
                    retJson.text = isProTask ? "已报销" : null;
                    retJson.color = Theme.Colors.minorColor;
                    retJson.icon = require('./../../res/images/status11.png');
                    return retJson;
                }
            }

        }

    }

    /**
     * 工作汇报状态转化 数字=》中文
     * @param status number;//状态值
     * @param execId string,//执行人id
     * **/
    static statusConvertWorkReport(status,execId){
        if(status == undefined)
        {
            let statusList = [0,1,2,3];

            statusList.forEach((v,i,a)=>{
                statusList[i] = this.statusConvertWorkReport(v);
            });

            return statusList;
        }

        execId = execId ? execId : this.userConfig.userInfo.id;

        let retJson = {
            id:status,
            status:status,
            text:'',
            name:'',
            icon:'',
            color:'',
            isProTask:true,//是否是个人任务，是：true,否：false
            /**
             * btnList成员
             * {
                    text:"进入巡店",//按钮文本
                    isTrip:false,//是否是出差功能,进入巡店页还是出差页；true:出差,false:巡店
                    code:1,//0、提醒，1、点评，2、查看
                }
             * **/
            btnList:[],//按钮数组
        };

        let isProTask = this.userConfig.userInfo.id == execId ? true : false;
        retJson.isProTask = isProTask;

        switch (status)
        {
            case 0:
            {
                retJson.text = '未填写';
                retJson.name = '未填写';
                retJson.btnList = [
                    {
                        text:isProTask ? "填写" : "提醒",
                        backgroundColor:Theme.Colors.appRedColor,
                        code:0,
                    }
                ];
                break;
            }
            case 1:
            {
                retJson.text = '待提交';
                retJson.name = '待提交';
                retJson.btnList = [
                    {
                        text:"查看" ,
                        backgroundColor:Theme.Colors.appRedColor,
                        code:0,
                    }
                ];
                break;
            }
            case 2:
            {
                retJson.text = '待点评';
                retJson.name = '待点评';
                retJson.btnList = [
                    {
                        text: "待点评",
                        backgroundColor:Theme.Colors.themeColor,
                        code:1,
                    }
                ];
                break;
            }
            case 3:
            {
                retJson.text = '已点评';
                retJson.name = '已点评';
                retJson.btnList = [
                    {
                        text: "已点评" ,
                        backgroundColor:Theme.Colors.barGreen,
                        code:2,
                    }
                ];
                break;
            }
        }


        return retJson;

    }

    /**
     * 获取本周周一和周日的时间戳 对象；获取本月的月初的时间戳和月底的时间戳 对象
     * @param time number,//时间戳
     * @param tag number,//0 获取本周周一和周日的时间戳 对象；1 是获取本月的
     * @param type bool,//是否 月初(周一)的时间戳和月底(周日)的时间戳 值为00：00：00和23：59：59 默认true 是
     1 获取本月的月初的时间戳和月底的时间戳 对象
     *
     * return {
       time1:'',//本周一的时间戳或本月初
       time2:'',//本周日的时间戳或本月底
       }
     * **/
    static getTimeByRank(time,tag = 1,type = true) {

        type = type == undefined ? true : type;

        tag = tag == undefined ? 1 : tag;
        if(time == undefined)
        {
            let d = new Date();
            time = (new Date(d.getFullYear(),d.getMonth(),d.getDate(),0,0,0)).getTime();
        }

        var timeObj = {
            time1:null,//本周一的时间戳或本月初
            time2:null,//本周日的时间戳或本月底
        };
        var oneDayTime = this.ONE_DAY_TIME;//一天的时间，单位毫秒
        var date = new Date(time);

        switch (tag)
        {
            //获取一周的时间戳
            case 0 :{

                if(date.getDay() != 0)
                {
                    timeObj.time1 = time - oneDayTime * (date.getDay() - 1);
                }
                else
                {
                    timeObj.time1 = time - oneDayTime * 6;
                }
                date = new Date(timeObj.time1);
                if(type){
                    timeObj.time1 = (new Date(date.getFullYear()
                        , date.getMonth()
                        ,date.getDate()
                        ,0,0,0)).getTime();
                    timeObj.time2 = timeObj.time1 + oneDayTime * 7 - 1000;
                }
                else {
                    timeObj.time1 = (new Date(date.getFullYear()
                        , date.getMonth()
                        ,date.getDate()
                        ,date.getHours()
                        ,date.getMinutes()
                        ,date.getSeconds())).getTime();
                    timeObj.time2 = timeObj.time1 + oneDayTime * 6;
                }
                break;
            }
            case 1:
            {
                var year = date.getFullYear();
                var month = date.getMonth();
                if(type){
                    timeObj.time1 = (new Date(year, month,1,0,0,0)).getTime();
                }
                else {
                    timeObj.time1 = (new Date(year, month,1
                        ,date.getHours()
                        ,date.getMinutes()
                        ,date.getSeconds())).getTime();
                }

                if(month == 11)
                {
                    year += 1;
                    month = 0;
                }
                else
                {
                    month += 1;
                }

                if(type){
                    timeObj.time2 = (new Date(year, month,1,23,59,59))
                        .getTime() - oneDayTime;
                }
                else {
                    timeObj.time2 = (new Date(year, month,1
                        ,date.getHours()
                        ,date.getMinutes()
                        ,date.getSeconds())).getTime() - oneDayTime;
                }

                break;
            }
        }

        return timeObj;

    }

    /**
     * 步骤跳转
     * @param pageCode string,//跳转的步骤值,页面编码
     * @param dataJson json，//跳转时传递的数据，可为空或不传
     * @param isStack  bool，//是否压入堆栈 默认 不压入
     * **/
    static stepInPage(pageCode,dataJson,isStack = false) {

        /*map.put("App测试巡店-新店下店-门店签到", "101");
         map.put("App测试巡店-新店下店-找店", "102");
         map.put("App测试巡店-新店下店-市调", "103");
         map.put("App测试巡店-新店下店-讲解", "104");
         map.put("App测试巡店-新店下店-规划", "105");
         map.put("App测试巡店-新店下店-图纸", "106");
         map.put("App测试巡店-新店下店-跟进事项", "107");
         map.put("App测试巡店-新店下店-签退", "108");
         map.put("App测试巡店-新店下店-酒店签到", "109"); // 预留

         map.put("App测试巡店-新店开业-门店签到", "201");
         map.put("App测试巡店-新店开业-沟通确认", "202");
         map.put("App测试巡店-新店开业-培训", "203");
         map.put("App测试巡店-新店开业-开业", "204");
         map.put("App测试巡店-新店开业-回顾", "205");
         map.put("App测试巡店-新店开业-跟进事项", "206");
         map.put("App测试巡店-新店开业-门店签退", "207");
         map.put("App测试巡店-新店开业-酒店签到", "208");

         map.put("App测试巡店-老店巡店-门店签到", "301");
         map.put("App测试巡店-老店巡店-客户回顾", "302");
         map.put("App测试巡店-老店巡店-店务检查", "303");
         map.put("App测试巡店-老店巡店-客情维护", "304");
         map.put("App测试巡店-老店巡店-跟进事项", "305");
         map.put("App测试巡店-老店巡店-门店签退", "306");
         map.put("App测试巡店-老店巡店-酒店签到", "307");
         */

        /**
         map.put("新店选址-签到", "501");
         map.put("新店选址-找店", "502");
         map.put("新店选址-市调", "503");
         map.put("新店选址-店面规划", "504");
         map.put("新店选址-图纸设计", "505");
         map.put("新店选址-资料签收", "506");
         map.put("新店选址-签退", "507");

         map.put("新店开业-签到", "601");
         map.put("新店开业-开业准备", "602");
         map.put("新店开业-人员培训", "603");
         map.put("新店开业-开业情况", "604");
         map.put("新店开业-资料签收", "605");
         map.put("新店开业-签退", "606");

         map.put("老店下店-签到", "701");
         map.put("老店下店-客户回顾", "702");
         map.put("老店下店-店铺检查", "703");
         map.put("老店下店-事项跟进", "704");
         map.put("老店下店-资料签收", "705");
         map.put("老店下店-签退", "706");

         map.put("自定义巡店-签到", "601");
         map.put("自定义巡店-店铺检查", "602");
         map.put("自定义巡店-市调", "603");
         map.put("自定义巡店-签退", "604");

         * **/

        if(dataJson == null)
        {
            dataJson = {};
        }

        switch (pageCode)
        {
            // 新店选址
            case "501": // 酒店签到拍照
            {
                Tools.baseComponent.goPage("PageNewShopAddressSign",dataJson,isStack);
                break;
            }
            case "502":
            {
                Tools.baseComponent.goPage("PageNewShopAddressFind",dataJson,isStack);
                break;
            }
            case "503":
            {
                Tools.baseComponent.goPage("PageNewShopAddressAjust",dataJson,isStack);
                break;
            }
            case "504":
            {
                Tools.baseComponent.goPage("PageNewShopAddressPlan",dataJson,isStack);
                break;
            }
            case "505":
            {
                Tools.baseComponent.goPage("PageNewShopAddressDesign",dataJson,isStack);
                break;
            }
            case "506":
            {
                Tools.baseComponent.goPage("PageNewShopOpenMaterial",dataJson,isStack);
                break;
            }
            case "507": // 定位签退
            {
                Tools.baseComponent.goPage("PageNewShopAddressExit",dataJson,isStack);
                break;
            }

            // 新店开业
            case "601": // 酒店签到拍照
            {
                // this.toast(JSON.stringify(dataJson))
                Tools.baseComponent.goPage("PageNewShopOpenSign",dataJson,isStack);
                break;
            }
            case "602":
            {
                Tools.baseComponent.goPage("PageNewShopOpenReady",dataJson,isStack);
                break;
            }
            case "603":
            {
                Tools.baseComponent.goPage("PageNewShopOpenTrain",dataJson,isStack);
                break;
            }
            case "604":
            {
                Tools.baseComponent.goPage("PageNewShopOpenOn",dataJson,isStack);
                break;
            }
            case "605":
            {
                Tools.baseComponent.goPage("PageNewShopOpenMaterial",dataJson,isStack);
                break;
            }
            case "606":
            {
                Tools.baseComponent.goPage("PageNewShopOpenExit",dataJson,isStack);
                break;
            }

            // 老店下店
            case "701": // 酒店签到拍照
            {
                Tools.baseComponent.goPage("PageOldShopGuideSign",dataJson,isStack);
                break;
            }
            case "702":
            {
                Tools.baseComponent.goPage("PageOldShopGuideReview",dataJson,isStack);
                break;
            }
            case "703":
            {
                Tools.baseComponent.goPage("PageOldShopGuideCheck",dataJson,isStack);
                break;
            }
            case "704":
            {
                Tools.baseComponent.goPage("PageOldShopGuideFollow",dataJson,isStack);
                break;
            }
            case "705":
            {
                Tools.baseComponent.goPage("PageOldShopGuideMaterial",dataJson,isStack);
                break;
            }
            case "706": // 定位签退
            {
                Tools.baseComponent.goPage("PageOldShopGuideExit",dataJson,isStack);
                break;
            }

            default:
            {
                // this.toast("抱歉！超过了小弟智商范围，无法处理！");
                // this.goPage("PageGuideList")
                break;
            }
        }
    }

// 任务类型 大类
    static taskStatusConvert(status) {
        switch (status)
        {
            // 1.巡店任务 2.出差任务 3.流程任务 4.回访任务 5.工作汇报 6.临时任务
            case '1':
            {
                return '巡店任务';
            }
            case '2':
            {
                return '出差任务';
            }
            case '3':
            {
                return '流程任务';
            }
            case '4':
            {
                return '回访任务';
            }
            case '5':
            {
                return '工作汇报';
            }
            case '6':
            {
                return '临时任务';
            }
        }
    }

    /**
     * 计算两点经纬度的距离
     *   //计算距离，参数分别为第一点的纬度，经度；第二点的纬度，经度
     * @param pos1 json,第一个坐标{lat:纬度，lng:经度}
     * @param pos2 json,第2个坐标
     * **/
    static getDistanceByGps(pos1,pos2){
        let lat1 = pos1.lat;
        let lng1 = pos1.lng;
        let lat2 = pos2.lat;
        let lng2 = pos2.lng;

        //进行经纬度转换为距离的计算
        function rad(d){
            return d * Math.PI / 180.0;//经纬度转换成三角函数中度分表形式。
        }
        var radLat1 = rad(lat1);
        var radLat2 = rad(lat2);
        var a = radLat1 - radLat2;
        var b = rad(lng1) - rad(lng2);

        var s = 2 * Math.asin(
            Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1)
                * Math.cos(radLat2)
                * Math.pow(Math.sin(b / 2), 2))
        );

        s = s * 6378.137;
        // EARTH_RADIUS;
        s = Math.round(s * 10000) / 10000;//输出为公里

        return s
    }

    /**
     * 截屏 截取UI的图片
     * @param ref object,//ui的ref
     * @param w int,//生成图片的宽
     * @param h int,//生成图片的高
     * @param isOpenImg bool,//是否打开图片
     * @param isSave bool,//是否保存图片
     * **/
    static captureViewScreen(ref,w,h,isOpenImg = true,isSave = false){
        // console.info("captureViewScreen ","onPressHeaderRight");
        return CaptureImage.captureViewScreen(ref,w,h,isOpenImg,isSave);
    }

    /**
     * 提成计算
     * **/
    static earningCalculateClass(){
        let objResult = {
            resultObj:{
                TAB:0,//0出库额，1出库毛利
                // resultRechargeCurMon:jsonOperate.getJsonData("resultOutboundCurMon"),//本月出库订单
                resultRechargeCurMon:null,//本月出库订单
                isSave:false,//是否执行获取缓存
                resultTime:Tools.timeFormatConvert(null,null,true),//当天0点0分0秒
                month:Tools.timeFormatConvert(
                    Tools.getTimeByRank(new Date().getTime()).time1,
                    "YYYY-MM"
                ),//获取本月的月份"YYYY-MM"
                outboundAmountObj:{
                    retListData2:[],    //返回数据集

                    requestData:{
                        user_id:Tools.userConfig.userInfo.id,
                        // user_id:'320',
                        profitpageindex: 1,
                        outwarehouseindex: 1,
                        pageSize: 10000,
                        date:null//日期"YYYY-MM"
                    },//请求参数对象

                    monthCount:null,//本月订单数量
                    totalMoney:null,//总金额
                    containerMoney:null,//货柜金额
                    instrumentMoney:null,//仪器金额
                    goodsFirstMoney:null,//普通商品-首批金额
                    goodsSupplementMoney:null,// 普通商品-补货金额
                    formula:'现金出库金额=出库总额-调换货',
                    isToPosition:true,
                },
                outboundProfitObj:{
                    retListData2:[],    //返回数据集

                    requestData:{
                        user_id:Tools.userConfig.userInfo.id,
                        // user_id:'320',
                        profitpageindex: 1,
                        outwarehouseindex: 1,
                        pageSize: 10000,
                        date:null//日期"YYYY-MM"
                    },//请求参数对象

                    monthCount:null,//本月订单数量
                    totalMoney:null,//总金额
                    containerMoney:null,//货柜金额
                    instrumentMoney:null,//仪器金额
                    goodsFirstMoney:null,//普通商品-首批金额
                    goodsSupplementMoney:null,// 普通商品-补货金额
                    formula:'出库毛利额=现金出库总额-成本',
                    isToPosition:true,
                }
            },//业绩管理对象
            /**
             * 出库额和毛利计算
             * @param data json,// 计算数据源
             * @param tab int,//切换标签
             * **/
            get:function (data,tab) {
                var resultObj = objResult.resultObj;

                resultObj.TAB = tab == undefined ? 0 : tab;

                //现金出库额
                resultObj.outboundAmountObj.monthCount = data.retData.Summary[0]
                    .orderCount == undefined
                    ? null
                    : data.retData.Summary[0].orderCount;
                resultObj.outboundAmountObj.totalMoney = data.retData.Summary[0]
                    .outWarehouseTotalAmount == undefined
                    ? null
                    : data.retData.Summary[0].outWarehouseTotalAmount;

                resultObj.outboundAmountObj.containerMoney = 0;
                resultObj.outboundAmountObj.instrumentMoney = 0;
                resultObj.outboundAmountObj.goodsFirstMoney = 0;
                resultObj.outboundAmountObj.goodsSupplementMoney = 0;
                resultObj.outboundAmountObj.retListData2 = data.retData.OutWareHouseAmount;
                resultObj.outboundAmountObj.retListData2.forEach(function (val,idx,arr) {
                    val["recharge_date"] = resultObj.month;
                    val["name"] = val.StoreName;
                    val["containerMoney"] = ((val.hgoldClientamount * 100) + (val.hgnewClientamount * 100)) / 100;
                    val["instrumentMoney"] = ((val.yqoldClientamount * 100) + (val.yqnewClientamount * 100)) / 100;
                    arr[idx] = val;
                    resultObj.outboundAmountObj.containerMoney
                        += (val.containerMoney * 100);
                    resultObj.outboundAmountObj.instrumentMoney
                        += (val.instrumentMoney * 100);
                    resultObj.outboundAmountObj.goodsFirstMoney
                        += ((val.ptnewClientamount * 100));
                    resultObj.outboundAmountObj.goodsSupplementMoney
                        += ((val.ptoldClientamount * 100));
                });
                resultObj.outboundAmountObj.containerMoney = resultObj.outboundAmountObj
                    .containerMoney / 100 + '';
                resultObj.outboundAmountObj.instrumentMoney = resultObj.outboundAmountObj
                    .instrumentMoney / 100 + '';
                resultObj.outboundAmountObj.goodsFirstMoney /= 100;
                resultObj.outboundAmountObj.goodsSupplementMoney /= 100;

                //出库毛利额
                resultObj.outboundProfitObj.monthCount = data.retData.Summary[0].orderCount == undefined
                    ? null
                    : data.retData.Summary[0].orderCount;
                resultObj.outboundProfitObj.totalMoney = data.retData.Summary[0].profitTotalAmount == undefined
                    ? null
                    : data.retData.Summary[0].profitTotalAmount;

                resultObj.outboundProfitObj.containerMoney = '';
                resultObj.outboundProfitObj.instrumentMoney = '';
                resultObj.outboundProfitObj.goodsFirstMoney = 0;
                resultObj.outboundProfitObj.goodsSupplementMoney = 0;
                // resultObj.outboundProfitObj.retListData2 = data.retData.ProfitAmount;
                data.retData.ProfitAmount.forEach(function (val,idx,arr) {
                    val["recharge_date"] = resultObj.month;
                    val["name"] = val.storeName;
                    val["ptnewClientamount"] = val.newClientamount;
                    val["ptoldClientamount"] = val.oldClientamount;
                    arr[idx] = val;
                    resultObj.outboundProfitObj.goodsFirstMoney += ((val.newClientamount * 100));
                    resultObj.outboundProfitObj.goodsSupplementMoney += ((val.oldClientamount * 100));
                });

                resultObj.outboundProfitObj.goodsFirstMoney = parseInt(resultObj.outboundProfitObj.goodsFirstMoney);
                resultObj.outboundProfitObj.goodsSupplementMoney = parseInt(resultObj.outboundProfitObj.goodsSupplementMoney);
                resultObj.outboundProfitObj.goodsFirstMoney /= 100;
                resultObj.outboundProfitObj.goodsSupplementMoney /= 100;

                objResult.resultObj = resultObj;

                return objResult.resultObj;
            },
        };
        return objResult;
    }

    /**
     * 打开推送回调函数（如：跳转入指定页面）
     * @param result object,//推送数据
     * result = {

            。。。。。
        }
     * **/
    static toSpecifiedPageInPush(result){

        switch (result.code){

            default:{
                Tools.baseComponent.goPage("PageHome");
                break;
            }

        }
    }

}

// Tools.init();