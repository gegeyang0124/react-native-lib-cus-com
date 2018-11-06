import {
    CameraRoll,
    Platform,
} from 'react-native';

import ImagePicker from 'react-native-image-crop-picker';
import  VideoMgr from 'react-native-image-picker';
import {Tools} from "./Tools";
import RNFS from "react-native-fs";
import {IamgeWaterMark} from "./IamgeWaterMark";

//第三方相机和录像

/**
 *  媒体类，处理摄像头使用和相册的使用 相册文件操作
 * export default class Tools //在外部引用时不需要大括号括起来，如：import Tools from 路径
 * export  class Tools //import {Tools} from 路径
 * **/
export class Media {

    static destVideos = Platform.OS == "ios"
        ? `${RNFS.DocumentDirectoryPath}/video`
        : `${RNFS.ExternalStorageDirectoryPath}/video`;//下载目录

    /**
     * 选择图片
     * @param multiple bool,//true:多选，false:单选，默认是false
     * @param taskName string,//任务更名
     * @param isWater bool,//是否打水印 默认true打水印
     * @param cd func,//拍照完成回调函数 打水印有效
     * **/
    static pickImage= (multiple,taskName,isWater=true,cd) => {
        if(!isWater){
            multiple = multiple == undefined ? false :multiple;
            return ImagePicker.openPicker({
                // writeTempFile:false,
                compressImageMaxHeight:2000,
                compressImageMaxWidth:2000,
                multiple: multiple,
                mediaType: "photo",
            }).then(images => {
                console.info("images",images);
                return images;
            });

            return new Promise(function (resolve, reject){
                VideoMgr.launchImageLibrary({
                    mediaType:'photo',
                    noData:true,
                }, (response)  => {
                    response.path = response.uri;
                    response.mine = 'images/jpeg';
                    console.info("response",response);
                    resolve([response]);
                });


            });
        }
        else {
            return new Promise(resolve => {
                Tools.imageBrower
                    .show(undefined,true)
                    .then((result)=>{
                        cd&&cd(result);
                        // result.path = result.photo;
                        IamgeWaterMark.markText(result.photo,taskName)
                            .then(path=>{
                                result.path = path;
                                console.info("result",result);
                                resolve(result);
                            });
                    });
            });
        }

        /*//图片选择器参数设置
        var options = {
            title: '请选择图片来源',
            cancelButtonTitle:'取消',
            takePhotoButtonTitle:'拍照',
            chooseFromLibraryButtonTitle:'相册图片',
            customButtons: [
                {name: 'hangge', title: 'hangge.com图片'},
            ],
            storageOptions: {
                skipBackup: true,
                path: 'images'
            }
        };

        return new Promise(function (resolve, reject) {
            VideoMgr.showImagePicker(options, (response) => {
                resolve(response);
            });
        });*/
    }

    /**
     * 拍照
     * @param taskName string,//任务名
     * @param isWater bool,//是否打水印 默认true打水印
     * @param cd func,//拍照完成回调函数 打水印有效
     * **/
    static takeImage = (taskName,isWater=true,cd) => {

        let opts = {
            // width: 300,
            // height: 400,
            compressImageMaxHeight:2000,
            compressImageMaxWidth:2000,
            cropping: false,
            cropperCancelText:'取消',
            cropperChooseText:'使用'
        };

        if(!isWater){
            return  ImagePicker.openCamera(opts)
                .then(image => {
                    // CameraRoll.saveImageWithTag(image.path);
                    CameraRoll.saveToCameraRoll(image.path,'photo');
                    return image;
                })
                .catch((s)=>{
                    // Tools.toast("s   " + s&&JSON.stringify(s));
                });
        }

        return new Promise((resolve, reject) => {
            if(Tools.userConfig.userInfo != '') {

                ImagePicker.openCamera(opts)
                    .then(image => {
                        cd&&cd(image);
                        Tools.getLocation()
                            .then((location)=>{
                                location.taskName = taskName;

                                Tools.imageViewWatermark
                                    .show(image.path,true,location)
                                    .then(results=>{
                                        CameraRoll.saveToCameraRoll(results.path,'photo')
                                            .then((res)=>{
                                                resolve(results);
                                            });
                                    });
                            });

                        //CameraRoll.saveImageWithTag(image.path);
                        // CameraRoll.saveToCameraRoll(image.path,'photo');
                        // return image;
                    })
                    .catch((s)=>{
                        //Tools.toast("s   " + s&&JSON.stringify(s));
                    });

            }
            else
            {
                Tools.toast("请先登陆");
            }

        });
    }

    /**
     * 清除拍摄图片的临时文件
     * @param path string,//路径path不为null时清除path的文件，否则清除所有
     * **/
    static clean = (path)=>{
        //console.log('removed all tmp images from tmp directory');
        if(path == undefined)
        {
            return ImagePicker.clean().then().catch(e => e);
        }
        else
        {
            return ImagePicker.cleanSingle(path).then().catch(e => e);
        }
    }

    /**
     * 选择视频
     * **/
    static pickVideo = () => {
        return ImagePicker.openPicker({
            compressImageMaxHeight:640,
            compressImageMaxWidth:640,
            mediaType: "video",
        }).then((video) => {
            console.log(video)
            video.path = video.path.substring(7);
            return video;
        });
    }

    /**
     * 拍摄视频
     * **/
    static takeVideo = () =>{

        return new Promise(function (resolve, reject){
            VideoMgr.launchCamera({
                mediaType:'video',
                videoQuality:'high',
                durationLimit:30,
                compressImageMaxHeight:640,
                compressImageMaxWidth:640,
            }, (response)  => {
                // Same code as in above section!
                // alert(JSON.stringify(response));
                //return response;
                if(response.uri == undefined)
                {
                    reject(response);
                }
                else
                {
                    response.uri = response.uri.substring(7);
                    CameraRoll.saveToCameraRoll(response.uri,'video');
                    response.path = response.uri;
                    resolve(response);
                }
            });
        });

        /*return Record.startRecord(path + 'sound.mp4', (err) => {
            //console.log(err)
        });*/
    }

}

RNFS.mkdir(Media.destVideos);
