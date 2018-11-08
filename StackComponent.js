export let Components = {
    /**
     * api
     * **/
    react_native_view_shot:{},//截屏或截UI图组件 react-native-view-shot
    react_native_fs:{},//文件操作组件 react-native-fs
    // react_native_root_toast:{},//toast提示 react-native-root-toast
    react_native_doc_viewer:{},//解析office类文件组件 react-native-doc-viewer
    react_native_sqlite_storage:{},//数据库操作组件 react-native-sqlite-storage
    react_native_device_info:{},//设备信息获取组件 react-native-device-info
    react_native_update:{},//热更新组件 react-native-update
    react_native_image_marker:{},//设置水印API组件 react-native-image-marker
    jpush_react_native:{},//极光推送组件 jpush-react-native
    react_native_storage:{isNull:true},//持久化本地存储组件 react-native-storage
    react_native_image_crop_picker:{},//图片剪辑及拍摄选择等操作组件 react-native-image-crop-picker
    react_native_image_picker:{},//图片视频剪辑及拍摄选择等操作组件 react-native-image-picker
    react_native_picker:{},//自定义滑动选择组件 react-native-picker
    react_native_spinkit:{isNull:true},//加载指示器（加载条）组件 react-native-spinkit
    react_native_talkingdata:{},//talkingdata app统计分析组件 react-native-talkingdata
    react_navigation:require('react-navigation-zy'),//页面导航组件 react-navigation
    react_native_orientation:{},//监听屏幕方向变化及屏幕方向设置组件 react-native-orientation

    /**
     * ui
     * **/
    react_native_smart_barcode:null,//二维码及条形码扫描组件 react-native-smart-barcode
    react_native_linear_gradient:null,//流线型颜色渐变组件 react-native-linear-gradient
    // native_echarts:null,//百度echarts组件 native-echarts
    react_native_svg:{},//Svg画图组件 react-native-svg
    victory_native:{},//victory图表组件 victory-native
    react_native_video:null,//视频播放组件 react-native-video
};
/**
 * 组件构造方法，构造所需的组件
 * @param comJson Json;//是组件的json对象
 * **/
export async function ComponentConstructor(comJson={}) {
    Components = Object.assign(Components,comJson);
    return await Components;
}