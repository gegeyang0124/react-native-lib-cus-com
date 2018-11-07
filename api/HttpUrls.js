import { LocalStorage } from "./LocalStorage";

/**
 * 后台请求借口路径类
 * **/
export class HttpUrls{

    static isAutoLogin = true;//自动登录
    static isExecOnce = true;//执行一次
    static firstRequest = true;//第一次执行

    static urlSets = null;//接口地址集合
    static IPConfig = {
        namekey:"ipUrl",//存储服务器地址的key
         IP:"",//正式服务器
         IPTest:"",//测试服务器,
        parameters:1,// 0、测试服务器；1、正式服务器
    };

    static getUrls(IP){
        var IP_Itunes = "https://itunes.apple.com/cn";//apple APP地址
        this.IPConfig.serviceType = this.IPConfig.IPTest == IP ? 0 : 1;

        var urlIP = IP + (!this.IPConfig.serviceType ? "/yyt2.0/api" : "/yyt2.0/api");
        var urlIP2 = IP + (!this.IPConfig.serviceType ? "/yyt2.0/mobile" : "/yyt2.0/mobile");

        var IPCenter = "http://dc-api.lexin580.com";
        var urlIPCenter = IPCenter;

        var IPCenterCRM = "http://dc-crm.lexin580.com";
        // var IPCenterCRM = "http://192.168.2.61:9053";
        this.urlIPHome = IP + (!this.IPConfig.serviceType ? "/yyt2.0" : "/yyt2.0");
        this.urlSets ={};
    }

    static getIP(){
        //this.getUrls(this.IPConfig.IPTest);

        if(this.urlSets == null)
        {
            return LocalStorage.get(this.IPConfig.namekey).then((reponseJson) => {
                reponseJson = reponseJson == null || reponseJson == undefined ? this.IPConfig.IP : reponseJson;
                this.getUrls(reponseJson);
                return reponseJson;
            });
        }

    }

}

// HttpUrls.getIP();
