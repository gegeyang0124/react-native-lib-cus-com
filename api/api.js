import {Tools} from "./Tools";
import {StyleSheetAdapt} from "./StyleSheetAdapt";
import {Http} from "./Http";
import {LocalStorage} from "./LocalStorage";
import {Media} from "./Media";
import {Theme} from "./Theme";
import {PickerCustome} from "./PickerCustome";
import {HotUpdate} from "./HotUpdate";
import {DbMgr} from "./DbMgr";
import {CaptureImage} from "./CaptureImage";
import {IamgeWaterMark} from "./IamgeWaterMark";
import {ProgressPerApi} from "./ProgressPerApi";
import {ProgressApi} from "./ProgressApi";
import {MenuBottomApi} from "./MenuBottomApi";
import {Alert} from "./Alert";

/**
 *工具类API引入集合
 **/
const api = {

    get Alert() {
        return Alert;
    },
    get MenuBottomApi() {
        return MenuBottomApi;
    },
    get ProgressApi() {
        return ProgressApi;
    },
    get ProgressPerApi() {
        return ProgressPerApi;
    },
    get IamgeWaterMark() {
        return IamgeWaterMark;
    },
    get CaptureImage() {
        return CaptureImage;
    },
    get DbMgr() {
        return DbMgr;
    },
    get Tools() {
        return Tools;
    },
    get StyleSheetAdapt() {
        return StyleSheetAdapt;
    },
    get Http() {
        return Http;
    },
    get LocalStorage() {
        return LocalStorage;
    },
    get Media() {
        return Media;
    },
    get Theme() {
        return Theme;
    },
    get PickerCustome() {
        return PickerCustome;
    },
    get HotUpdate() {
        return HotUpdate;
    },

};

module.exports = api;