import {
    captureRef,
    releaseCapture,
} from "react-native-view-shot";
import {Tools} from './Tools';
import {StyleSheetAdapt} from './StyleSheetAdapt';
import RNFS from "react-native-fs";
import {Platform} from "react-native";

/**
 * 截屏或截UI图
 * **/
export class CaptureImage {

    static destPhotos = Platform.OS == "ios"
        ? `${RNFS.DocumentDirectoryPath}/photo/`
        : `${RNFS.ExternalStorageDirectoryPath}/photo/`;//下载目录

    /**
     * 截屏 截取UI的图片
     * @param ref object,//ui的ref
     * @param w int,//生成图片的宽
     * @param h int,//生成图片的高
     * @param isOpenImg bool,//是否打开图片
     * @param isSave bool,//是否保存图片
     * **/
    static captureViewScreen(ref,w,h,isOpenImg = true,isSave = false){


        return new Promise((resolve, reject) => {
            // console.info("YYY", "RRR");
            let options = {
                format: "jpg",
                quality: 0.8,
                result: "tmpfile",
                snapshotContentContainer: true
            };
            if(ref.measure && w == undefined){
                ref.measure((fx, fy, width, height, px, py)=>{
                    // Tools.toast(width + "  " + height);
                    options.width = width;
                    options.height = h ? h : height;
                    options.snapshotContentContainer = h ? true : false;

                    captureRef(ref, options)
                        .then(
                            uri => {
                               if(isSave){
                                   let filePath = this.destPhotos
                                       + `${uri.substring(uri.lastIndexOf('/') + 1)}`;

                                 /*  setTimeout(()=>{
                                       Tools.toast("Y1 " + isSave + "  " + filePath);
                                   },3000);*/
                                   // console.info("filePath",filePath)
                                   RNFS.copyFile(uri,filePath)
                                       .then(()=>{
                                           if(isOpenImg)
                                           {
                                               resolve(filePath);
                                               Tools.openDoc(filePath);
                                           }
                                           else {
                                               // console.info("uri",uri)
                                               resolve(filePath);
                                           }
                                       })
                                       .catch((err)=>{
                                           Tools.toast("文件保存失败");
                                       });
                               }
                               else
                               {
                                   if(isOpenImg)
                                   {
                                       resolve(uri);
                                       Tools.openDoc(uri);
                                   }
                                   else {
                                       // console.info("uri",uri)
                                       resolve(uri);
                                   }
                               }

                            },
                            error => {
                                reject(error);
                                // console.error("Oops, snapshot failed", error);
                            }
                        );
                });
            }
            else {
                if(w){
                    options.width = w;
                }
                else {
                    options.width = StyleSheetAdapt.getWidth();
                }

                if(h){
                    options.height = h;
                    options.snapshotContentContainer = false;
                }

                // console.info("options",options);
                captureRef(ref, options)
                    .then(
                        uri => {
                            if(isSave){
                                let filePath = this.destPhotos
                                    + `${uri.substring(uri.lastIndexOf('/') + 1)}`;
                               /* setTimeout(()=>{
                                    alert("Y2 " + isSave + "  " + filePath)
                                },0);*/
                                RNFS.copyFile(uri,filePath)
                                    .then(()=>{
                                        if(isOpenImg)
                                        {
                                            resolve(filePath);
                                            Tools.openDoc(filePath);
                                        }
                                        else {
                                            // console.info("uri",uri)
                                            resolve(filePath);
                                        }
                                    })
                                    .catch((err)=>{
                                        Tools.toast("文件保存失败");
                                    });
                            }
                            else
                            {
                                if(isOpenImg)
                                {
                                    resolve(uri);
                                    Tools.openDoc(uri);
                                }
                                else {
                                    resolve(uri);
                                }
                            }

                        },
                        error => {
                            reject(error);
                            // console.error("Oops, snapshot failed", error);
                        }
                    );
            }

        });


    }

    static clean(uri){
        if(uri == null){

        }
        else
        {
            releaseCapture(uri);
        }

    }
}

RNFS.mkdir(CaptureImage.destPhotos);