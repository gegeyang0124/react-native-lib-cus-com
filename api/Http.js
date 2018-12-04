/**
 * 基于 fetch 封装的 GET请求
 * @param url
 * @param params {}
 * @param headers
 * @returns {Promise}
 */
import {
    NetInfo,
    Platform,
} from 'react-native';
import {Tools} from "./Tools";
// import {TalkingData} from "./TalkingData";
// import {Alert} from "./Alert";

// import RNFS from 'react-native-fs';
import {Components} from "./../StackComponent";
const RNFS = Components.react_native_fs;

/*import FileTransfer from '@remobile/react-native-file-transfer';
 // var FileTransfer = require('@remobile/react-native-file-transfer');
 var RNUploader = NativeModules.RNUploader;*/

import KActivityIndicator from 'react-native-toast-loadding';
import {ProgressPerApi} from "./ProgressPerApi";

/**
 * 网路请求
 * **/
export class Http {

    static urlFile = null;//文件上传接口
    static fileField = null;//文件上传包含文件的字段，可不传

    // static destDownload = `${RNFS.DocumentDirectoryPath}/`;//下载目录 此目录会在app升级后被覆盖
    static destDownload = RNFS.DocumentDirectoryPath
        ? Platform.OS == "ios"
            ? `${RNFS.DocumentDirectoryPath}/download`
            : `${RNFS.ExternalStorageDirectoryPath}/download`
        : null ;//下载目录
    // static isIndicate = true;

    static verfyComponent(type = 1){
        let b = true;
        switch (type){
            case 1:{
                if(!RNFS.DocumentDirectoryPath){
                    console.info("请安装文件操作组件","react-native-fs");
                    Tools.toast("请安装组件 react-native-fs");
                    b = false;
                }

                break;
            }
        }

        return b;
    }

    static getConnectionInfo(){
        return new Promise((resolve,reject) => {
            NetInfo.getConnectionInfo()
                .then((connectionInfo) => {
                    if((connectionInfo.type != "none" && Tools.platformType)
                        || (!Tools.platformType && connectionInfo.type != "NONE")
                        || (__DEV__ && connectionInfo.type != "none"
                            && connectionInfo.type != "NONE"))
                    {
                        resolve(connectionInfo);
                    }
                    else
                    {
                        // TalkingData.trackEvent("网络未链接",TalkingData.EventTabel.userEvent,connectionInfo);
                        Tools.toast("未连接网络");
                        reject({status:"未连接网络"});
                    }
                });
        });
    }

    /**
     * 基于 ajax 封装的 网络请求
     * @param type strng; //请求类型GET或POST
     * @param url string; //请求地址
     */
    static requestAjax(type,url){
        let timeout = true;

        //Tools.toast(isProgress ? "T" : "F")
        let fetchTimeout = new Promise((resolve,reject)=>{
            setTimeout(()=>{
                    if(timeout){
                        console.log("-----------------------------------------httpAjax " + url + " Timeout start-------------------------------------");
                        console.log("-----------------------------------------httpAjax " + url + " Timeout end-------------------------------------");

                        // TalkingData.trackEventHttp("Timeout",url,type);
                        this.putErrInfo("Timeout",url,type,{
                            statusCode:-1,
                        },{});

                        reject({status:"Timeout"});
                    }
                },
                15000);
        });

        // alert(JSON.stringify(fetchOptions))
        let fetchPromise =  new Promise((resolve, reject)=>{

            this.getConnectionInfo()
                .then((connectionInfo) => {
                    var request = new XMLHttpRequest();

                    request.onreadystatechange = (e) => {
                        if (request.readyState !== 4) {
                            return;
                        }
                        timeout = false;
                        if (request.status === 200) {
                            console.log("-----------------------------------------httpAjax " + url + " success start-------------------------------------");
                            console.info('success', request.responseText);
                            console.log("-----------------------------------------httpAjax " + url + " success end-------------------------------------");
                            resolve(request.responseText);
                            //alert(request.responseText)
                        } else {
                            console.log("-----------------------------------------httpAjax " + url + " err start-------------------------------------");
                            console.log('err');
                            console.log("-----------------------------------------httpAjax " + url + " err end-------------------------------------");

                            // TalkingData.trackEventHttp("exception",url,type,url);
                            this.putErrInfo("exception",url,type,{
                                statusCode:request.status,
                            },{});
                            reject({status:-1});

                        }
                    };

                    request.open(type, url);
                    request.send();

                    // alert(JSON.stringify(connectionInfo));
                    // console.log('Initial, type: ' + connectionInfo.type + ', effectiveType: ' + connectionInfo.effectiveType);
                })
                .catch(retJson=>{
                    reject(retJson);
                });

        });

        /**
         * 其中一个谁先执行，其他的会被舍弃
         * **/
        return Promise.race([fetchPromise,fetchTimeout]);
    }

    /**
     * 基于 ajax 封装的 网络请求
     * @param url string; //请求地址
     */
    static getAjax(url){
        return this.requestAjax("GET",url);
    }

    /**
     * 基于 ajax 封装的 网络请求
     * @param url string; //请求地址
     */
    static postAjax(url){
        return this.requestAjax("POST",url);
    }

    /**
     * 通过经纬度获取详细地址（百度接口）
     * @param lat int,//纬度
     * @param lng int,//经度
     * **/
    static getAddress(lat,lng){
        let locationJson = {
            city:null,//城市名
            cityCode:null,//城市代码
            address:null,//地址
            lat:lat,//维度
            lng:lng,//经度
            timestamp:new Date().getTime(),
        };
        return new Promise(resolve => {
            this.getConnectionInfo()
                .then((connectionInfo) => {
                    // location: {log:113.264531,lat:23.157003},
                    /*let url = "http://api.map.baidu.com/geocoder/v2/?" +
                        "ak=C93b5178d7a8ebdb830b9b557abce78b&callback=renderReverse&location="
                        + lat + "," + lng +"&pois=0";*/

                    /* let url = "https://restapi.amap.com/v3/assistant/coordinate/convert?" +
                         "locations=113.32007372983196,23.120272663850958&coordsys=gps" +
                         "&output=json&key=9f6788450fe0354d26fdb9a46ffd728b";*/
                    let url = "https://restapi.amap.com/v3/assistant/coordinate/convert?" +
                        "locations=" + lng + "," + lat + "&coordsys=gps" +
                        "&output=json&key=9f6788450fe0354d26fdb9a46ffd728b";



                    this.getAjax(url).then(retJson2=>{

                        retJson2 = JSON.parse(retJson2);
                        // retJson2.locations = "113.31420850684037,23.09863836095986";

                        url = "https://restapi.amap.com/v3/geocode/regeo?output=json&" +
                            "location=" + retJson2.locations + "&key=9f6788450fe0354d26fdb9a46ffd728b" +
                            "&radius=100&extensions=all";

                        let locations = retJson2.locations.split(",");


                        this.getAjax(url)
                            .then(retJson=>{
                                let response = JSON.parse(retJson);

                                /*let response = JSON.parse(retJson.substring(retJson.indexOf('{'), (retJson.lastIndexOf("}") + 1)));
                                let locationJson = {
                                    city:response.result.addressComponent.city,//城市名
                                    cityCode:response.result.addressComponent.adcode,//城市代码
                                    address:response.result.formatted_address,//地址
                                    lat:response.result.location.lat,//维度
                                    lng:response.result.location.lng,//经度
                                    timestamp:new Date().getTime(),
                                };*/

                                /*let locationJson = {
                                    city:response.regeocode.addressComponent.city,//城市名
                                    cityCode:response.regeocode.addressComponent.adcode,//城市代码
                                    address:response.regeocode.formatted_address,//地址
                                    lat:locations[1],//维度
                                    lng:locations[0],//经度
                                    timestamp:new Date().getTime(),
                                };*/
                                locationJson.city = response.regeocode.addressComponent.city;//城市名
                                locationJson.cityCode = response.regeocode.addressComponent.adcode;//城市代码
                                locationJson.address = response.regeocode.formatted_address;//地址
                                locationJson.lat = locations[1];//维度
                                locationJson.lng = locations[0];//经度
                                locationJson.timestamp = new Date().getTime();

                                console.info("locationJson",locationJson);

                                resolve(locationJson);
                            })
                            .catch(()=>{
                                resolve(locationJson);
                            });



                    });
                })
                .catch(()=>{
                    resolve(locationJson);
                });
        });
    }

    /**
     * TalkingData 统计平台统计
     * **/
    static putErrInfo(name,urlV,type,response={},params = {}){
        return;
        let infoObj = {};
        if(response){

            if(typeof response == "object"){
                infoObj = Object.assign(params, response);
            }
            else
            {
                params.errInfo = response;
                infoObj = params;
            }
        }

        infoObj.time = Tools.timeFormatConvert((new Date()).getTime(),"YYYY-MM-DD HH:mm:ss");


        TalkingData.trackEventHttp(name,urlV,type,infoObj);
    }

    /**
     * 基于 fetch 封装的 网络请求
     * @param type strng; //请求类型GET或POST
     * @param url string; //请求地址
     * @param params json; //地址请求参数 json params中可以用isNotUser来控制是否附加用户ID isNotUser:true =》不附加用户ID，默认附加用户id
     * @param headers json; //地址请求头 json
     * @param isDefaultHeaders bool; //是否使用默认请求头，false：不使用，true：使用，不传默认使用
     * @param isProgress bool; //是否使用加载条，false：不使用，true：使用，不传默认使用
     * @returns {Promise}
     */
    static request(type,url, params = {},isProgress, headers,isDefaultHeaders){

        params = JSON.parse(JSON.stringify(params));

        if(isProgress == undefined)
        {
            isProgress = true;
        }

        isProgress = isProgress == undefined ? true : isProgress;

        isDefaultHeaders = isDefaultHeaders == undefined ? true : isDefaultHeaders;
        headers = isDefaultHeaders && headers == undefined ? {} : headers;
        if(isDefaultHeaders)
        {
            headers["Content-Type"] = "application/json";
            headers["Accept"] = "application/json";
            // headers["deviceType"] = "2";
            // if(Tools.userConfig.token != null)
            // {
            //     headers["token"] = Tools.userConfig.token;
            //     headers["Authorization"] = Tools.userConfig.token;
            //     // headers["token"] = "b78a8d0ec04d38c8d06ad3d0dda05788";
            // }
        }

        let fetchOptions =  headers == undefined ?
            {method: type,}
            :{
                method: type,
                headers: headers,
            };

        params = params == undefined ? {} : params;
        /* if(!params.isNotUser)
         {
             params.userId = Tools.userConfig.userInfo == null
                 ? ''
                 : Tools.userConfig.userInfo.id;
             params.user_id = params.userId;
             params.phone = Tools.userConfig.userInfo == null
                 ? ''
                 : Tools.userConfig.userInfo.phone;

         }*/

        //删除params数据中的isNotUser属性
        // delete params["isNotUser"];


        let timer = null;
        let timeout = true;
        let fetchTimeout = new Promise((resolve,reject)=>{
            timer = setTimeout(()=>{
                if(timeout){
                    isProgress ? KActivityIndicator.hide() : null;
                    // isProgress ? Tools.progress.show(false) : null;
                    // Tools.progress.show(false)
                    console.log("-----------------------------------------httpRequest " + url + " Timeout start-------------------------------------");
                    console.info("requestData:",params);
                    // TalkingData.trackEventHttp("Timeout",url,type,params);
                    this.putErrInfo("Timeout",urlV,type,{
                        statusCode:-1,
                    },params);
                    reject({status:"Timeout"});
                    console.log("-----------------------------------------httpRequest " + url + " Timeout end-------------------------------------");
                }

            },30000);
        });

        let urlV = url;

        if (type.toUpperCase() == "GET" && params != null && params != undefined) {
            let paramsArray = [];
            //encodeURIComponent
            Object.keys(params).forEach(key => paramsArray.push(key + '=' + params[key]));

            if (url.search(/\?/) === -1)
            {
                url += '?' + paramsArray.join('&');
            }
            else
            {
                url += '&' + paramsArray.join('&');
            }
        }
        else if(type.toUpperCase() == "POST" )
        {
            fetchOptions["body"] = JSON.stringify(params);
        }

        // alert(JSON.stringify(fetchOptions))
        let fetchPromise =  new Promise((resolve, reject)=>{

            if(false){

            }
            else {
                this.getConnectionInfo()
                    .then((connectionInfo) => {

                        // isProgress ? Tools.progress.show() : null;
                        isProgress ? KActivityIndicator.show(true, "加载中...") : null;

                        //alert(JSON.stringify(fetchOptions))
                        fetch(url, fetchOptions)
                            .then((response) => {

                                clearTimeout(timer);
                                timeout = false;

                                // isProgress ? Tools.progress.show(false) : null;
                                isProgress ? KActivityIndicator.hide() : null;
                                if (response.ok) {

                                    return response.json();

                                }
                                else {
                                    console.log("-----------------------------------------httpRequest " + url + " error-------------------------------------");
                                    console.info("requestData:",params);
                                    console.info("errInfo:",response);
                                    console.log("-----------------------------------------httpRequest " + url + " error end-------------------------------------");

                                    this.putErrInfo("excep-service",urlV,type,{
                                        statusCode:response.status,
                                    },params);
                                    Tools.toast("后台报错,请联系管理员");
                                    return {retCode:-40440};
                                }
                            })
                            .then((response) => {
                                if(response.retCode == -40440){
                                    reject({status: -1});

                                    return response;
                                }

                                console.log("-----------------------------------------httpRequest " + url + " success start-------------------------------------");
                                console.info("requestData:",params);
                                console.info("response:",response);
                                console.log("-----------------------------------------httpRequest " + url + " success end-------------------------------------");

                                try {
                                    resolve(response);
                                }
                                catch (e){

                                    this.putErrInfo("excep-Filed",urlV,type,response,params);

                                    console.log("-----------------------------------------httpRequest " + url + " error-------------------------------------");
                                    console.info("requestData:",params);
                                    console.info("exception:",e);
                                    console.log("-----------------------------------------httpRequest " + url + " error end-------------------------------------");
                                    Tools.toast("后台报错，返回为空(undefined)");
                                    reject({
                                        status:-1,
                                        info:'response为undefined',
                                    });
                                }



                            })
                            .catch(err => {

                                clearTimeout(timer);

                                this.putErrInfo("exception",urlV,type,err,params);

                                // isProgress ? Tools.progress.show(false) : null;
                                isProgress ? KActivityIndicator.hide() : null;

                                // TalkingData.trackEventHttp("exception",urlV,type,params);

                                console.log("-----------------------------------------httpRequest " + url + " error-------------------------------------");
                                console.info("requestData:",params);
                                console.info("err:",err);
                                console.log("-----------------------------------------httpRequest " + url + " error end-------------------------------------");
                                Tools.toast("请求失败，找不到服务器，请联系管理员");
                                reject({status: -1});
                            });

                        // alert(JSON.stringify(connectionInfo));
                        // console.log('Initial, type: ' + connectionInfo.type + ', effectiveType: ' + connectionInfo.effectiveType);
                    })
                    .catch(retJson=>{

                        clearTimeout(timer);

                        // isProgress ? Tools.progress.show(false) : null;
                        isProgress ? KActivityIndicator.hide() : null;
                        reject(retJson);
                    });
            }

        });

        /**
         * 其中一个谁先执行，其他的会被舍弃
         * **/
        return Promise.race([fetchPromise,fetchTimeout]);

    }

    /**
     * 基于 fetch 封装的 Get请求  FormData 表单数据
     * @param url string; //请求地址
     * @param params json; //地址请求参数 json
     * @param headers json; //地址请求头 json
     * @param isDefaultHeaders bool; //是否使用默认请求头，false：不使用，true：使用，不传默认使用
     * @returns {Promise}
     */
    static get(url, params, isProgress, headers,isDefaultHeaders) {

        return this.request("GET",url, params, isProgress, headers,isDefaultHeaders);
    }

    /**
     * 基于 fetch 封装的 POST请求  FormData 表单数据
     * @param url string; //请求地址
     * @param params json; //地址请求参数 json
     * @param headers json; //地址请求头 json
     * @param isDefaultHeaders bool; //是否使用默认请求头，false：不使用，true：使用，不传默认使用
     * @returns {Promise}
     */
    static post(url, params,isProgress, headers,isDefaultHeaders) {

        return this.request("POST",url, params, isProgress, headers,isDefaultHeaders);
    }

    /**
     * 上传文件
     * @param filePath string,//文件路径
     * @param mimeType string,//文件类型
     * **/
    static upLoadFile(filePath,mimeType){

        if(filePath == undefined)
        {
            return;
        }

        return new Promise((resolve, reject)=>{
            /*reject = reslv;
             resolve = rej;*/
            this.getConnectionInfo()
                .then((connectionInfo) => {
                    // Tools.progressPer.show();
                    // ProgressPerApi.show(0);
                    if(this.verfyComponent(1)){
                        if(Tools.platformType)
                        {
                            // create an array of objects of the files you want to upload
                            var fileObj = {
                                // name: 'Filedata',
                                filename: filePath.substring(filePath.lastIndexOf("/") + 1),
                                filepath: filePath,
                                // filetype: 'multipart/form-data'
                            };
                            if(Http.fileField){
                                fileObj.name = Http.fileField;
                            }

                            var files = [
                                fileObj
                            ];

                            // upload files
                            RNFS.uploadFiles({
                                toUrl: Http.urlFile,
                                files: files,
                                method: 'POST',
                                headers: {
                                    // 'ContentType':'multipart/form-data',
                                    // Accept: 'application/json',
                                    // token:retJson.retData.token,
                                    // token:"cec2567515c751f96118833e4d050709",
                                },
                                fields: {
                                    // token:retJson.retData.token,
                                    // token:"cec2567515c751f96118833e4d050709",
                                },
                                begin: (response) => {
                                    // var jobId = response.jobId;
                                    // console.log('UPLOAD HAS BEGUN! JobId: ' + jobId);
                                    // Tools.toast(jobId);
                                },
                                progress: (response) => {
                                    var percentage = Math.floor(
                                        (response.totalBytesSent/response.totalBytesExpectedToSend)
                                    );
                                    // Tools.toast(percentage);
                                    // console.log('UPLOAD IS ' + percentage + '% DONE!');
                                    // Tools.progressPer.setPogress(percentage);
                                    ProgressPerApi.show(percentage);
                                }
                            })
                                .promise.then((response) => {

                                // Tools.progressPer.show(false);
                                // Tools.progressPer.hide();
                                ProgressPerApi.hide();

                                console.log("-----------------------------------------httpRequest " + Http.urlFile + " success start-------------------------------------");
                                console.info("requestData:",files);
                                console.info("response:",response);
                                console.log("-----------------------------------------httpRequest " + Http.urlFile + " success end-------------------------------------");

                                if (response.statusCode == 200)
                                {
                                    response = JSON.parse(response.body);

                                    resolve(response);

                                    /*   if(response.errcode == 0){
                                           // if(true){

                                           resolve(response.data);
                                           // Tools.toast('FILES UPLOADED!');
                                           // console.log('FILES UPLOADED!'); // response.statusCode, response.headers, response.body
                                       }
                                       else
                                       {
                                           /!* TalkingData.trackEventHttp("exce-Filed",
                                                Http.urlFile,
                                                "POST",
                                                {
                                                    errName:"fileErr",
                                                    errcode:response ? response.errcode + "" : "null"
                                                });
                                            Tools.toast("上传失败，请联系管理员");*!/


                                           let obj = typeof response == "object" ? response : {
                                               errName:"fileErr_Filed",
                                               errcode:response + ""
                                           };

                                           this.putErrInfo("excep-Filed",Http.urlFile
                                               ,"POST",obj,files);
                                           /!*TalkingData.trackEventHttp("excep-Filed",
                                               Http.urlFile,
                                               "POST",
                                               obj);*!/

                                           reject({status:-1});
                                       }*/

                                }
                                else {
                                    Tools.toast("上传失败，请重试....");

                                    /* TalkingData.trackEventHttp("exception",
                                         Http.urlFile,
                                         "POST",
                                         {
                                             errName:"fileErr",
                                             statusCode:response.statusCode
                                         });*/

                                    this.putErrInfo("exception",Http.urlFile
                                        ,"POST", {
                                            errName:"fileErr",
                                            statusCode:response.statusCode
                                        },files);
                                    reject({status:-1});
                                    // Tools.toast('SERVER ERROR');
                                    // alert("err: " + JSON.stringify(response))
                                }
                            })
                                .catch((err) => {
                                    // Tools.progressPer.show(false);
                                    Tools.toast("请检查网络....");
                                    ProgressPerApi.hide();

                                    // TalkingData.trackEventHttp("exception",HtHttp.urlFile,null,"文本失败");

                                    if(err.description === "cancelled") {
                                        // cancelled by user
                                    }
                                    // console.log(err);
                                    // alert("err: " + JSON.stringify(err));

                                    reject({status:-1});
                                });
                        }
                        else
                        {

                            let formData = new FormData();//如果需要上传多张图片,需要遍历数组,把图片的路径数组放入formData中
                            let file = {uri: filePath, type: 'multipart/form-data', name: filePath.substring(filePath.lastIndexOf("/") + 1)};   //这里的key(uri和type和name)不能改变,
                            formData.append("Filedata",file);   //这里的files就是后台需要的key


                            /*let formData = new FormData();
                             for(var i = 0;i<imgAry.length;i++){
                             let file = {uri: imgAry[i], type: 'multipart/form-data', name: 'image.png'};
                             formData.append("files",file);
                             }*/

                            fetch(Http.urlFile,{
                                method:'POST',
                                headers:{
                                    'ContentType':'multipart/form-data',
                                    // 'token':retJson.retData.token,
                                },
                                body:formData,
                            })
                                .then((response) => {
                                    // Tools.progressPer.show(false);
                                    ProgressPerApi.hide();
                                    if (response.ok) {

                                        return response.json();

                                    }
                                    else {
                                        //alert("ddll :" + JSON.stringify({status: response.status}))
                                        //reject({status: response.status});
                                        this.putErrInfo("excep-service",
                                            Http.urlFile,
                                            "POST",{
                                                statusCode:response.status,
                                            },file);
                                        Tools.toast("后台报错,请联系管理员");
                                        return {retCode:-40440};
                                    }
                                    // return response.json();
                                } )
                                .then((responseData)=>{

                                    if(response.retCode == -40440){
                                        reject({status: -1});
                                    }

                                    console.log("-----------------------------------------httpRequest " + Http.urlFile + " success start-------------------------------------");
                                    console.info("requestData:",files);
                                    console.info("response:",responseData);
                                    console.log("-----------------------------------------httpRequest " + Http.urlFile + " success end-------------------------------------");

                                    resolve(responseData);
                                    /* if(responseData.errcode == 0){

                                         // alert("responseData:  " + JSON.stringify(responseData.data));
                                         resolve(responseData.data);
                                     }
                                     else
                                     {
                                         Tools.toast("上传失败，请联系管理员");
                                         /!* TalkingData.trackEventHttp("exce-Filed",
                                             Http.urlFile,
                                              "POST",
                                              {
                                                  errName:"fileErr",
                                                  statusCode:responseData ? responseData.errcode + "" : "null"
                                              });*!/

                                         let obj = typeof responseData == "object" ? responseData : {
                                             errName:"fileErr_Filed",
                                             errcode:responseData + ""
                                         };
                                         /!* TalkingData.trackEventHttp("exce-Filed",
                                              Http.urlFile,
                                              "POST",
                                              obj);*!/
                                         this.putErrInfo("excep-Filed",Http.urlFile
                                             ,"POST", obj,file);
                                         reject({status:-1});
                                     }*/

                                    // console.log('responseData',responseData);
                                })
                                .catch((error)=>{
                                    // Tools.progressPer.show(false);
                                    ProgressPerApi.hide();
                                    // console.error('error',error)
                                    Tools.toast("上传失败，请重试....");
                                    /*TalkingData.trackEventHttp("exception",
                                        Http.urlFile,
                                        "POST",
                                        {
                                            errName:"fileErr",
                                            statusCode:error
                                        });*/
                                    this.putErrInfo("exception",Http.urlFile
                                        ,"POST", error,file);
                                    reject({status:-1});
                                    // alert("error: " + JSON.stringify(error));
                                });
                        }
                    }

                })
                .catch(retJson=>{
                    reject(retJson);
                });


        });

    }

    /**
     * 上传文件
     * @param filePathList array,//文件路径,成员是数据
     filePathList成员：{
        localPath: "文件路径",
     } 或 只有"文件路径"的一纬数组
     注：  可以含有任何字段并且一起返回，但不可将在字段放入返回成员的localPath和servicePath两个字段，
     否则servicePath会被替换，localPath放入本地路径则上传文件，若是网路路径，则跳过上传，路径存入
     servicePath字段
     * @param index int，//上传数组路径地址
     * @param count int，//上传数量
     *
     * return array;//成员含：{  localPath:'本地文件路径',
                        servicePath:'服务器回传路径',}
     * **/
    static upLoadFileToService(filePathList = [],index = 0,count = 1){

        return new Promise((resolve, reject) => {

            filePathList = filePathList == undefined ? [] :filePathList;
            count = count == undefined ? 1 :count;
            if(index == 0){
                let fileList = [];

                filePathList.forEach((v,i,a)=>{
                    if(typeof(v) == 'string'){
                        fileList.push({
                            localPath:v
                        });
                    }
                    else {
                        fileList.push(v);
                    }
                });

                filePathList = fileList;
            }

            if(filePathList.length > 0){

                index = index == undefined ? 0 : index;

                // console.info("filePathList",filePathList)

                this.upLoadFileToServicePutIn(filePathList,index,count,resolve);

                /*if(filePathList[index].localPath.indexOf("http") == 0){
                    filePathList[index].servicePath = filePathList[index].localPath;
                    if(filePathList.length == (index + 1)){
                        Tools.toast("上传完成");
                        // console.log(filePathList)
                        resolve(filePathList);
                    }
                    else
                    {
                        this.upLoadFileToService(filePathList,++index,count);
                    }
                }
                else {
                    // console.log(filePathList)
                    Tools.toast("第" + count + "张正在上传 ");

                    this.upLoadFile(filePathList[index].localPath)
                        .then(retJson=>{
                            // alert(JSON.stringify(retJson))
                            filePathList[index].servicePath = retJson.url;

                            if(filePathList.length == (index + 1)){
                                Tools.toast("上传完成");
                                resolve(filePathList);
                            }
                            else
                            {
                                this.upLoadFileToService(filePathList,++index,++count);
                            }
                        });
                }*/

            }
            else
            {
                // Tools.toast("没有上传文件路径");
                // reject({status:-1});
                resolve(filePathList);
            }


        });
    }

    static upLoadFileToServicePutIn(filePathList = [],index = 0,count = 1,resolve){
        if(filePathList[index].localPath.indexOf("http") == 0){
            filePathList[index].servicePath = filePathList[index].localPath;
            if(filePathList.length == (index + 1)){
                Tools.toast("上传完成");
                // console.log(filePathList)
                resolve(filePathList);
            }
            else
            {
                this.upLoadFileToServicePutIn(filePathList,++index,count,resolve);
            }
        }
        else {
            Tools.toast("第" + count + "张正在上传 ");

            this.upLoadFile(filePathList[index].localPath)
                .then(retJson=>{
                    // alert(JSON.stringify(retJson))
                    // filePathList[index].servicePath = retJson.url;
                    filePathList[index].servicePath = retJson;

                    if(filePathList.length == (index + 1)){
                        Tools.toast("上传完成");
                        resolve(filePathList);
                    }
                    else
                    {
                        this.upLoadFileToServicePutIn(filePathList,++index,++count,resolve);
                    }
                });
        }
    }

    /**
     * 下载文件
     * @param fileAddress string,//文件地址
     * @param downloadPath string,//下载存放文件目录路径 默认null,使用默认下载目录
     * @param isReDownload bool,//是否重新下载，默认false，false:若存在则不再下载，反之下载
     * **/
    static downloadFile(fileAddress,downloadPath=null,isReDownload=false) {

        return  new Promise((resolve,reject)=>{

            if(fileAddress.indexOf("http") == 0){
                downloadPath = downloadPath ? downloadPath : this.destDownload;
                let downloadDest = downloadPath + `/${fileAddress.substring(fileAddress.lastIndexOf('/') + 1)}`;

                RNFS.mkdir&&RNFS.mkdir(downloadPath)
                    .then(()=>{
                        RNFS.exists(downloadDest)
                            .then((exist) =>{
                                if(!exist || isReDownload){
                                    this.getConnectionInfo()
                                        .then((connectionInfo) => {

                                            if(fileAddress == undefined)
                                            {
                                                Tools.toast("请传入文件地址")
                                                reject({status:-1});
                                            }
                                            /*else if(Tools.progressPer == null)
                                            {
                                                Tools.toast(`请在页面放入进程条\<ProgressPer \/ \>`);
                                                return;
                                            }*/

                                            // 音频
                                            //const downloadDest = `${RNFS.MainBundlePath}/${((Math.random() * 1000) | 0)}.mp3`;
                                            // let downloadDest = `${RNFS.MainBundlePath}/${fileAddress.substring(fileAddress.lastIndexOf('/') + 1)}`;
                                            // let downloadDest = `${RNFS.DocumentDirectoryPath}/${fileAddress.substring(fileAddress.lastIndexOf('/') + 1)}`;
                                            // http://wvoice.spriteapp.cn/voice/2015/0902/55e6fc6e4f7b9.mp3
                                            //const formUrl = 'http://wvoice.spriteapp.cn/voice/2015/0818/55d2248309b09.mp3';VideoView_android.js

                                            /*alert(JSON.stringify(downloadDest));
                                             return;*/

                                            let options = {
                                                fromUrl: fileAddress,
                                                toFile: downloadDest,
                                                background: true,
                                                headers: {
                                                    // 'Cookie': cookie //需要添加验证到接口要设置cookie
                                                },
                                                begin: (res) => {
                                                    /*console.log('begin', res);
                                                     console.log('contentLength:', res.contentLength / 1024 / 1024, 'M');*/
                                                    // alert(JSON.stringify(res));
                                                },
                                                progress: (res) => {

                                                    //let per = (res.bytesWritten / res.contentLength).toFixed(3);
                                                    let per = (res.bytesWritten / res.contentLength);
                                                    // per = per * 1000;
                                                    // per = parseInt(per);
                                                    // per = per / 1000;

                                                    // Tools.progressPer.setPogress(per);
                                                    ProgressPerApi.show(per);
                                                }
                                            };

                                            try {
                                                let ret = RNFS.downloadFile(options);
                                                ret.promise.then(retJson => {
                                                    console.log("-----------------------------------------downloadFile " + fileAddress + " success start-------------------------------------");
                                                    console.info("response:",retJson);
                                                    console.log("-----------------------------------------downloadFile " + fileAddress + " success end-------------------------------------");

                                                    /* console.log('file://' + downloadDest)*/

                                                    retJson["filePath"] = downloadDest;
                                                    // Tools.progressPer.show(false);
                                                    ProgressPerApi.hide();
                                                    resolve(retJson);

                                                }).catch(err => {
                                                    //console.log('err', err);
                                                    // Tools.progressPer.show(false);
                                                    ProgressPerApi.hide();
                                                    reject(err);
                                                });
                                            }
                                            catch (e) {
                                                //console.log(error);
                                                // Tools.progressPer.show(false);
                                                ProgressPerApi.hide()
                                                reject(e);
                                            }

                                        })
                                        .catch(retJson=>{
                                            reject(retJson);
                                        });
                                }
                                else
                                {
                                    // Tools.toast("文件已存在");
                                    resolve({
                                        filePath:downloadDest
                                    });
                                }
                            });
                    });

            }
            else
            {
                resolve({
                    filePath:fileAddress
                });
            }


            /* // On Android, use "RNFS.DocumentDirectoryPath" (MainBundlePath is not defined)

         // 图片
         // const downloadDest = `${RNFS.MainBundlePath}/${((Math.random() * 1000) | 0)}.jpg`;
         // const formUrl = 'http://img.kaiyanapp.com/c7b46c492261a7c19fa880802afe93b3.png?imageMogr2/quality/60/format/jpg';

         // 文件
         // const downloadDest = `${RNFS.MainBundlePath}/${((Math.random() * 1000) | 0)}.zip`;
         // const formUrl = 'http://files.cnblogs.com/zhuqil/UIWebViewDemo.zip';

         // 视频
         // const downloadDest = `${RNFS.MainBundlePath}/${((Math.random() * 1000) | 0)}.mp4`;
         // http://gslb.miaopai.com/stream/SnY~bbkqbi2uLEBMXHxGqnNKqyiG9ub8.mp4?vend=miaopai&
         // https://gslb.miaopai.com/stream/BNaEYOL-tEwSrAiYBnPDR03dDlFavoWD.mp4?vend=miaopai&
         // const formUrl = 'https://gslb.miaopai.com/stream/9Q5ADAp2v5NHtQIeQT7t461VkNPxvC2T.mp4?vend=miaopai&';*/

            /* // On Android, use "RNFS.DocumentDirectoryPath" (MainBundlePath is not defined)

             // 图片
             // const downloadDest = `${RNFS.MainBundlePath}/${((Math.random() * 1000) | 0)}.jpg`;
             // const formUrl = 'http://img.kaiyanapp.com/c7b46c492261a7c19fa880802afe93b3.png?imageMogr2/quality/60/format/jpg';

             // 文件
             // const downloadDest = `${RNFS.MainBundlePath}/${((Math.random() * 1000) | 0)}.zip`;
             // const formUrl = 'http://files.cnblogs.com/zhuqil/UIWebViewDemo.zip';

             // 视频
             // const downloadDest = `${RNFS.MainBundlePath}/${((Math.random() * 1000) | 0)}.mp4`;
             // http://gslb.miaopai.com/stream/SnY~bbkqbi2uLEBMXHxGqnNKqyiG9ub8.mp4?vend=miaopai&
             // https://gslb.miaopai.com/stream/BNaEYOL-tEwSrAiYBnPDR03dDlFavoWD.mp4?vend=miaopai&
             // const formUrl = 'https://gslb.miaopai.com/stream/9Q5ADAp2v5NHtQIeQT7t461VkNPxvC2T.mp4?vend=miaopai&';*/

        });

    }

}