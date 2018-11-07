import {
    Platform,
} from 'react-native';

// import ImageMarker from "react-native-image-marker";
import {Components} from "./../StackComponent";
const ImageMarker = Components.react_native_image_marker;
import {StyleSheetAdapt} from "./StyleSheetAdapt";
import {Theme} from "./Theme";
import {Tools} from "./Tools";

/**
 * 设置图片水印
 * **/
export class IamgeWaterMark{

    /**
     * 设置水印文本
     * @param path string，//图片地址
     * @param text string，//水印文本
     * **/
    static markText(path,text,x = 40,y){
        if(!IamgeWaterMark.markText){
            return new Promise(resolve => {
                console.info("请安装设置水印API组件","react-native-image-marker");
                Tools.toast("请安装组件 react-native-image-marker");
            });
        }

        y = (StyleSheetAdapt.getHeight() - (20 + Theme.Font.fontSize) * 5) * 2
            - (20 + Theme.Font.fontSize) * 3;

        return ImageMarker.markText({
            src: Platform.OS == 'android'
                ? path.replace('file://', '')
                : path,
            // position: 'topLeft',
            // text: text,
            text: text,
            X: x,
            Y: y,
            color: Theme.Colors.appRedColor,
            // fontName: 'Arial-BoldItalicMT',
            fontSize: Theme.Font.fontSize * 2,
            scale: 1,
            quality: 100
        });
    }

}
