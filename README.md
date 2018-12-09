# react-native-lib-cus-com
react-native 自定义辅助组件库，完美适配各种机型和屏幕大小；
完美的网路请求，带加载条，可上传、下载文件,支持视频播放，二维码条形码扫描，
图片选择、剪辑、查看大图，本地存储，数据库操作，页面导航，截屏和截UI图，
水印图片，打开office类文件;等等多种ui,可自定义删除;可节省应用级软件的开发时间

###  安装组件：
npm i --save react-native-lib-cus-com

###  注意：
1.所有源码中的方法有注释，可自行查看；<BR/>
2.各组件的详细调用方法，可进入相应的组件文件查看，里面所有的方法/函数都有注释；<BR/>
3.以下“使用”的说明只有简单的说明(且都不写参数，直接复制使用，可能会报错)，具体说明，请参照“注意”第2点

### 安装依赖,选择安装（别忘了根据相应库进行react-native link ...）
[npm i --save react-native-view-shot 截屏和截UI图](https://github.com/gre/react-native-view-shot)<BR/>
[npm i --save react-native-sqlite-storage 数据库操作](https://github.com/andpor/react-native-sqlite-storage)<BR/>
[npm i --save react-native-fs 文件操作](https://github.com/itinance/react-native-fs)<BR/>
[npm i --save react-native-device-info 设备信息获取](https://github.com/rebeccahughes/react-native-device-info)<BR/>
[npm i --save react-native-doc-viewer 打开文件](https://github.com/philipphecht/react-native-doc-viewer)<BR/><BR/>
<b>[npm i --save jpush-react-native 极光推送](https://github.com/jpush/jpush-react-native)<BR/></b>
<b>[npm i --save react-native-update-js 热更新,自定义服务器](https://github.com/gegeyang0124/react-native-update-js)<BR/></b>
<b>
\* react-native-update 发布热更新报错 将node_modules\react-native-update\local-cli\lib\bundle.js <BR/>
\* 的439行种的metro-bundler改成metro可成功运行！ <BR/>
\* 报错版本0.52+(0.52以上版本报错) <BR/>
  <BR/>
[npm i --save react-native-update 热更新](https://github.com/reactnativecn/react-native-pushy)</b> <BR/>
[npm i --save react-native-image-marker 水印](https://github.com/JimmyDaddy/react-native-image-marker)<BR/>
[npm i --save react-native-image-crop-picker 图片操作](https://github.com/ivpusic/react-native-image-crop-picker)<BR/>
[npm i --save react-native-image-picker 视频操作](https://github.com/marcshilling/react-native-image-picker)<BR/>
[npm i --save react-native-picker 选择框组件](https://github.com/beefe/react-native-picker)<BR/>
[npm i --save react-native-spinkit 加载图](https://github.com/maxs15/react-native-spinkit)<BR/>
[npm i --save react-native-talkingdata talkingdata统计组件](https://github.com/reactnativecn/react-native-talkingdata)<BR/>
<b>
 本库自带react-navigation(1.5.11)，若想使用最新版则按“选择安装依赖的初始化”初始化<BR/>
[npm i --save react-navigation 页面导航](https://github.com/react-navigation/react-navigation)</b> <BR/>
[npm i --save react-native-orientation 屏幕方向操作](https://github.com/yamill/react-native-orientation)<BR/><BR/>
<b>
    * react-native-smart-barcode 二维码库中将react的PropTypes换成<BR/>
    * import PropTypes  from 'prop-types';<BR/>
    * PropTypes已经从react中单独提取出来 <BR/>
    * android 需要修改 RCTCapturePackage中的List的继承去掉 <BR/>
[npm i --save react-native-smart-barcode 二维码扫描](https://github.com/react-native-component/react-native-smart-barcode)</b> <BR/>
[npm i --save react-native-linear-gradient 渐变](https://github.com/brentvatne/react-native-linear-gradient) <BR/>
[npm i --save react-native-svg svg画图工具](https://github.com/magicismight/react-native-svg) <BR/>
[npm i --save victory-native victory图表](https://github.com/FormidableLabs/victory-native) <BR/>
[npm i --save react-native-zip-archive 解压缩组件](https://github.com/plrthink/react-native-zip-archive)<BR/>
 <BR/>


### “可选依赖”的初始化 (看下列例子)
```javascript
import {ComponentConstructor} from "react-native-lib-cus-com";

ComponentConstructor({
react_native_root_toast:require("react-native-root-toast"),
react_native_fs:require("react-native-fs")
});

//就是将组件名中的"-"换成"_",传入ComponentConstructor（组件构造器）即可。
```

### 使用api (方法参数，进入源文件查看，里面详细注解)：
##### StyleSheetAdapt 样式表创建，适配各种机型、各种屏幕 与StyleSheet用法一致
```javascript
StyleSheetAdapt.create();//创建样式表单
StyleSheetAdapt.getStyle();//得到样式属性的json对象
StyleSheetAdapt.designSize = null;// 设置页面设计大小 可不设置 默认设计大小12寸平板电脑（{width:768,height:1024}）

//数字后面可加以下字符 若加字符，加数字后面
//'s':随屏幕调整布局 取屏幕高或宽(主要适用于横竖屏切换)
//'dw' 获取相对当前屏幕的设计宽比的宽
//'w' 获取相对当前屏幕宽的宽
//'n' 不进行屏幕比缩放
//'dh' 获取相对当前屏幕的设计高比的宽
//'h' 获取相对当前屏幕高比的宽
//以上字符后面加's'后会随屏幕调整布局
//如：
const styles = StyleSheetAdapt.create({
    testStyle2:{
        width:'0.1w',//屏幕宽的10分之1
        height:'0.1h',//屏幕高的10分之1
    },
    testStyle3:{
            width:'100dws',//按设计大小宽比适配 会随屏幕调整布局
            height:'100dw',//按设计大小宽比适配
        },
    testStyle:{
        transform:[
            {rotateX:'180deg'}
        ],
    },
});//创建样式表单
```

```javascript
import {StyleSheetAdapt} from "react-native-lib-cus-com";
import React, {Component} from 'react';
import {View} from 'react-native';

StyleSheetAdapt.designSize = {width:768,height:1024};//页面设计大小
const styles = StyleSheetAdapt.create({

    testStyle2:{
        width:100,
        height:200,
    },
    testStyle:{
        transform:[
            {rotateX:'180deg'}
        ],
    },
});//创建样式表单
//StyleSheetAdapt.styleJsonAdaptConvert();//样式属性json中的值适配


export default class Test extends BaseComponent<Props> {

    constructor(props) {
        super(props);

    }

    alert(){
        //与react-native 中的Alert用法一致
        Alert.alert();
    }

    componentWillMount(){

    }

    componentDidMount() {
    }




    render() {

        const {resultEstimateData,noticesData,resultFinishProgress,
            tripListData,customerObj,isNews,pictures,path,dataSize,picture} = this.state;

        return (
             <ViewTitle>
                            <View style={styles.testStyle}></View>
                            <View style={StyleSheetAdapt.testStyle2}></View>
                            <View style={StyleSheetAdapt.styleJsonAdaptConvert({
                                width:100,
                                height:200,
                            })}></View>
                        </ViewTitle>
        );
    }
}
```

##### Http 网路请求
```javascript
import {Http} from "react-native-lib-cus-com";
Http.post();//基于 fetch 封装的 POST请求
Http.get();//基于 fetch 封装的 Get请求
Http.requestAjax();//基于 ajax 封装的 网络请求
Http.urlFile = "";//上传文件 接口
Http.fileField = "";//文件上传包含文件的字段，可不传
Http.upLoadFileToService();//上传文件 react-native-fs
Http.downloadFile();//下载文件 react-native-fs
```

##### Tools 工具类，提供各种功能
```javascript
import {Tools} from "react-native-lib-cus-com";
Tools.getStyle();//得到样式属性的json对象
Tools.replaceStr();//替换指定位置的字符串 字符串替换处理操作
Tools.getLocation();//获取地理位置
Tools.toast();//toast消息提示
Tools.openDoc();//打开文档(文件)
Tools.pickMonth();//选择年月（弹出年月ui选择框）
Tools.timeFormatConvert();//时间格式转化
Tools.isNumber();//判断是否是数字
Tools.getTimeByRank();//获取本周周一和周日的时间戳 对象；获取本月的月初的时间戳和月底的时间戳 对象
Tools.getDistanceByGps();//计算两点经纬度的距离
Tools.captureViewScreen();//截屏 截取UI的图片
Tools.toSpecifiedPageInPush = (result)=>{};//打开推送回调函数（如：跳转入指定页面）;直接赋值方法
```

##### Alert对话框
```javascript
import {Alert} from "react-native-lib-cus-com";
Alert.alert();//显示对话框
Alert.hide();//关闭对话框
```

##### CaptureImage 截屏或截UI图 基于react-native-view-shot
```javascript
import {CaptureImage} from "react-native-lib-cus-com";
CaptureImage.captureViewScreen();//截屏 截取UI的图片
```

##### DbMgr 数据库操作 基于react-native-sqlite-storage
```javascript
import {DbMgr} from "react-native-lib-cus-com";
DbMgr.DB_TABLE_LIST = [];//创建表列表 此必须先调用
DbMgr.executeSql();//执行sql
还有很多方法，请查看文件里的注释
```

##### HotUpdateCus 热更新，提供热更新各种方法,自己配置服务器 基于react-native-update-js
```javascript

/**
 * HotUpdateCus 热更新，提供热更新各种方法
 * metaInfo(元信息)：{
updateList:[],//更新appID集合（appID集合）//不传字段，则所有app将收到更新信息，传了空数组则所有app不会收到更新信息
updateNoList:[],//不更新appID集合（appID集合）//updateNoList中含的appID的app将不会收到更新信息;不传或传空数组则所有app更新
code:777,//777、立刻更新；888、立刻强制更新；999、立刻静默更新
reboot:555,//666、强制使用更新；555、用户决定是否使用更新;333、下次启用更新 默认是555
finishInfo:'',//更新完成时的提示信息reboot=333时有效
}
 如：{"updateList":[]}
 * **/

import {HotUpdateCus} from "react-native-lib-cus-com";
HotUpdateCus.host = null;//热更新配置文件地址或接口，//get请求
HotUpdateCus.tag = null;//热更新的标志 与后台配置一致
HotUpdateCus.appID = null;//给每个app的唯一标识,可以是任何数据，必须传入，用于判断是否需要更新，与updateList、updateNoList配套使用
HotUpdateCus.updateFirst = true;//app第一次启动是否强制更新，默认true更新

HotUpdateCus.update.execute = true;//是否启动检查更新
HotUpdateCus.checkUpdate();//检查是否有更新（检查一次）
HotUpdateCus.checkUpdateLoop();//持续检查是否有更新

后台json配置：
{
            "ios-lx_yyt-2.0.7":{//这key是这样设置,ios："ios-" + HotUpdate.tag + "-" + packageVersion = "lx_yyt-2.0.7";android："android-" + HotUpdate.tag + "-" + packageVersion = "lx_yyt-2.0.7";
                "tag":"lx_yyt",//app设置的标识 ，HotUpdate.tag="lx_yyt"设置的一致
                "packageVersion":"2.0.7",//app的静态版本(硬版本)号，即编译时设置的版本号，此发生变化就会去下载新的静态版本(硬版本)
                "downloadUrl":"https://itunes.apple.com/cn/app/id1438062830?l=en&mt=8",//静态版本(硬版本)下载地址
                "description":"yyy",//静态版本(硬版本)描述
                "metaInfoPkg":{//元信息可在里面自定义一些数据,app的静态版本(硬版本)，更新时回传
                    "rnUpdate":true//此字段是我测试项目自定义的，是否开启react-native-update热更新，默认false关闭，使用自定义热更新；true开启，使用react-native-update热更新，只能选择一种
                },
                "publishJS":[//发布的js所有版本,默认第一个是最新发布的的js版本,可任选一个更新
                    {
                        "description": "asdfsa",//js描述
                        "version": "2.0.140",//js的版本号，只能增大
                        "metaInfo":{//元信息可在里面自定义一些数据，js的版本，更新时回传
                        },
                        "updateUrl": "http://yyt.yyy.com:8081/app_config/lx_yyt_app.zip" //js包
                    }
                ]

        }
}
```

##### HotUpdate 热更新，提供热更新各种方法 基于react-native-update
```javascript
安装、配置好react-native-update后

/**
 发布热更新报错 将node_modules\react-native-update\local-cli\lib\bundle.js
 的439行种的metro-bundler改成metro可成功运行！
 报错版本0.52+(0.52以上版本报错)
 **/


/**
 * HotUpdate 热更新，提供热更新各种方法
 * metaInfo(元信息)：{
updateList:[],//更新appID集合（appID集合）//不传字段，则所有app将收到更新信息，传了空数组则所有app不会收到更新信息
updateNoList:[],//不更新appID集合（appID集合）//updateNoList中含的appID的app将不会收到更新信息;不传或传空数组则所有app更新
code:777,//777、立刻更新；888、立刻强制更新；999、立刻静默更新
reboot:555,//666、强制使用更新；555、用户决定是否使用更新;333、下次启用更新 默认是555
finishInfo:'',//更新完成时的提示信息reboot=333时有效
}
 发布时，因react-native-update只接受字符串，所以元信息应是json的字符串，
 如：{"updateList":[]}
 * **/
import {HotUpdate} from "react-native-lib-cus-com";

/**
appkey 可采用以下方式获取：
import _updateConfig from '项目名/update';
const {appKey} = _updateConfig[Platform.OS];
**/
HotUpdate.appKey = null;//react-native-update的key
HotUpdate.appID = null;//给每个app的唯一标识,可以是任何数据，必须传入，用于判断是否需要更新，与updateList、updateNoList配套使用
HotUpdate.updateFirst = true;//app第一次启动是否强制更新，默认true更新

HotUpdate.update.execute = true;//是否启动检查更新
HotUpdate.checkUpdate();//检查是否有更新 （检查一次）
HotUpdate.checkUpdateLoop();//持续检查是否有更新

这些设置完后即可，提示会根据元信息的情况提示
```

### FileDirMgr 可复制文件目录到指定目录，读取文件目下所有文件及文件目录，可删除文件和文件目录
```javascript
import {FileDirMgr} from "react-native-lib-cus-com";
FileDirMgr.copyDir();//复制目录到指定目录
FileDirMgr.readDir();//读取目录下的所有文件
FileDirMgr.deleteDirOrFile();//删除目录或文件
```

##### IamgeWaterMark 设置图片水印 基于react-native-image-marker
```javascript
import {IamgeWaterMark} from "react-native-lib-cus-com";
IamgeWaterMark.markText();//设置水印文本
```

##### JPush 极光推送类，提供极光推送的各种方法 可看JPush文件源码注释
```javascript
本库未直接导出，若想使用，使用自行导出；
需要安装:
npm i --save jcore-react-native
npm i --save jpush-react-native
```

##### LocalStorage 持久化本地存储 基于react-native-storage
```javascript
import {LocalStorage} from "react-native-lib-cus-com";
LocalStorage.save();//使用key来保存单个数据（key-only）。这些数据一般是全局独有的，需要谨慎单独处理的数据
LocalStorage.get();//读取单个数据
LocalStorage.saves();//使用key来保存批量数据（key-only）。这些数据一般是全局独有的，需要谨慎单独处理的数据
LocalStorage.gets();//读取批量数据
```

##### Media 媒体类，处理摄像头使用和相册的使用 相册文件操作 基于react-native-image-crop-picker和react-native-image-picker
```javascript
import {Media} from "react-native-lib-cus-com";
Media.pickImage();//选择图片 react-native-image-crop-picker
Media.takeImage();//拍照 react-native-image-crop-picker
Media.pickVideo();//选择视频 react-native-image-crop-picker
Media.takeVideo();//拍摄视频 react-native-image-picker
```

##### MenuBottomApi 底部弹出菜单API
```javascript
import {MenuBottomApi} from "react-native-lib-cus-com";
MenuBottomApi.show();//显示底部菜单
MenuBottomApi.hide();//隐藏底部菜单
```

##### PickerCustome 自定义滑动选择   基于react-native-picker
```javascript
import {PickerCustome} from "react-native-lib-cus-com";
PickerCustome.pick();//选择框 底部
PickerCustome.pickMonth();//选择年月
```

##### ProgressApi 加载指示器（加载条）  基于react-native-spinkit
```javascript
import {ProgressApi} from "react-native-lib-cus-com";
ProgressApi.show();//显示加载指示器
ProgressApi.hide();//隐藏菊花加载指示器
```

##### ProgressPerApi 显示进度的进度条
```javascript
import {ProgressPerApi} from "react-native-lib-cus-com";
ProgressPerApi.show();//显示进度条
ProgressPerApi.hide();//隐藏进度条
```

##### TalkingData 使用talkingdata app统计分析 可看TalkingData源文件注释
```javascript
本库未直接导出，若想使用，使用自行导出；
需要安装:
npm i --save react-native-talkingdata
```

##### Theme 主题集合 颜色、宽度，及一些默认配置
```javascript
import {Theme} from "react-native-lib-cus-com";
主题配色，宽高，弧度，在这个库中的一些ui使用到这里的默认配置，特别是样式
```

### 使用UI (ui属性，可调用方法参数，进入源文件自行查看，里面详细注解)：
##### BaseComponent(来自react-native-navigation-cus) 用于继承导航属性;这个组件中的方法都是"静态和动态"两种调用方式
```javascript
this.goPage();//跳转页面
BaseComponent.goPage();//跳转页面
this.goBack();//返回已进入的页面
BaseComponent.goBack();//返回已进入的页面
this.setParams();//设置参数改变导航栏
BaseComponent.setParams();//设置参数改变导航栏
this.getPageParams();//获取页面跳转传递的参数
BaseComponent.getPageParams();//获取页面跳转传递的参数

 /**
     * 导航栏按钮设置
     * headerLeft：//导航栏左边按钮可传 bool（false:隐藏左边默认UI;true:显示左边默认UI）、图片(url)、UI
     * headerRight：//导航栏右边按钮可传 bool（false:隐藏左边默认UI;true:显示左边默认UI）、图片(url)、UI
     * headerLeftHandle://函数方法 可在左边按钮点击返回之前执行
     * headerRightHandle://函数方法 右边按钮点击执行
     * **/ 
 //还有很多react-navigation支持的参数都可通过此方法传递
this.setParams({
  headerLeft:function() {},//导航栏左边按钮可传 bool（false:隐藏左边默认UI;true:显示左边默认UI）、图片(url)、UI
  headerRight:function (){},//导航栏右边按钮可传 bool（false:隐藏左边默认UI;true:显示左边默认UI）、图片(url)、UI
  headerLeftHandle:function(){},//函数方法 可在左边按钮点击返回之前执行
  headerRightHandle:function() {}//函数方法 右边按钮点击执行
});//设置参数改变导航栏

//继承BaseComponent,将有两个生命周期回调方法
/**
* 进入页面时回调此方法
* @param params json,//第一个参数，页面传递参数
* @param action object,第二个参数，页面传递动作
* @param routeName string,第三个参数，页面名
* **/
componentWillEnter(params,action,routeName);//进入页面时回调此方法
componentWillExit();//退出页面时回调此方法

```
```javascript
import React, {Component} from 'react';
import {
   Text,
} from 'react-native'
import {
    StyleSheetAdapt,
    ViewTitle,
    BaseComponent,
    BarcodeView,
    Tools,
} from "react-native-lib-cus-com";
export default class Test extends BaseComponent<Props> {

    constructor(props) {
        super(props);
          let param = Tools.userConfig.userCutAccount && Tools.userConfig.userCutAccount.length > 0
            ? {
                headerLeft:<ImageChange icon={require("images/role.png")}
                                        onPressIn={()=>PageSearchRole.show(this)}
                                        style={styles.hLeft}/>
            }
            : {
                headerLeft:false
            };

        this.setParams(param);
    }
    
    /**
        * 进入页面时回调此方法
        * @param params json,//第一个参数，页面传递参数
        * @param action object,第二个参数，页面传递动作
        * @param routeName string,第三个参数，页面名
        * **/
        componentWillEnter(params,action,routeName){
            
        }//进入页面时回调此方法
        componentWillExit(){
            
        }//退出页面时回调此方法
    
    render() {
        return (
            <ViewTitle>
                <BarcodeView ref={c=>this.barcodeView}
                    style={styles.testStyle}/>
                <Text onPress={()=>this.barcodeView.startScan()}>
                    开始扫码
                </Text>
            </ViewTitle>
        );
    }
}
const styles = StyleSheetAdapt.create({

    testStyle2:{
        width:100,
        height:200,
    },
    testStyle:{
        transform:[
            {rotateX:'180deg'}
        ],
    },
});

BaseComponent.setScreenOrientations();//设置屏幕 静态
this.setScreenOrientations();//设置屏幕 动态
BaseComponent.getOrientation();//获取屏幕方向 静态
this.getOrientation();//获取屏幕方向 动态
BaseComponent.addOrientationListener();//监听屏幕方向变化
this.goPage();//跳转页面
this.goBack();//返回已进入的页面
this.setParams();//设置参数改变导航栏
this.getPageParams();//获取页面跳转传递的参数
```

##### ViewTitle 视频播放组件 ui控件  导航框控件 头部有导航栏（可设置有无） 左边带返回按钮（可设置有无） 中间有title文本（可设置有无） 右边带菜单按钮（可设置有无） 底部带按钮（可设置有无） 可设置是否可滚动 一般用于作为页面的基础框View
```javascript
import {ViewTitle} from "react-native-lib-cus-com";
```

##### VideoView 视频播放组件 ui控件
```javascript
import {VideoView} from "react-native-lib-cus-com";
```

##### VideoList 视频播放组控件，支持水平或竖直方向排布 ui控件
```javascript
import {VideoList} from "react-native-lib-cus-com";
```

##### WebViewCus 浏览器（可设置成弹框出现，也可与页面合并兼容）的组件 ui控件（WebView） 支持html和uri（网页地址），并自动适配页面大小
```javascript
import {WebViewCus} from "react-native-lib-cus-com";
```

##### DatePicker 日期选择组件
```javascript
import {DatePicker} from "react-native-lib-cus-com";
```

##### ViewCtrl View的升级版 增加左右滑动事件
```javascript
import {ViewCtrl} from "react-native-lib-cus-com";
```

##### DropdownBox 下拉框 支持单选和多选 基础组件
```javascript
import {DropdownBox} from "react-native-lib-cus-com";
```

##### PickDropdown 下拉框 有下拉图表等，更加符合应用场景（基于DropdownBox）
```javascript
import {PickDropdown} from "react-native-lib-cus-com";
```

##### PickDropdownMonth 月份下拉框 （基于PickDropdown）
```javascript
import {PickDropdownMonth} from "react-native-lib-cus-com";
```

##### Progress 进度加载条
```javascript
import {Progress} from "react-native-lib-cus-com";
```

##### ProgressPer  进度条 显示进度
```javascript
import {ProgressPer} from "react-native-lib-cus-com";
```

##### Question  答题ui，支持单选、多选、问答；主要应用场景是调查问卷累等等
```javascript
import {Question} from "react-native-lib-cus-com";
```

##### QuestionList  答题集合（列表）ui （基于Question）
```javascript
import {QuestionList} from "react-native-lib-cus-com";
```

##### FlatListView 列表加载，可上下拉、分页、懒加载UI,有加载提示动画和提示信息 （加载更多）
```javascript
import {FlatListView} from "react-native-lib-cus-com";
```

##### ImageBg 背景图组件
```javascript
import {ImageBg} from "react-native-lib-cus-com";
```

##### ButtonChange 点击按钮
```javascript
import {ButtonChange} from "react-native-lib-cus-com";
```

##### ButtonTime 时间选择按钮控件 可选择时间显示 并回传时间
```javascript
import {ButtonTime} from "react-native-lib-cus-com";
```

##### ImageView 查看大图
```javascript
import {ImageView} from "react-native-lib-cus-com";
```

##### ImageList 可以查看图片，成行排列，每张图片下部可以有提示文字，可水平滚动，可垂直滚动，可自动换行（rowCount），默认水平滚动（基于ImageView）
```javascript
import {ImageList} from "react-native-lib-cus-com";
```

##### BarcodeView 二维码及条形码扫描组件
```javascript
import React, {Component} from 'react';
import {
   Text,
} from 'react-native'
import {
    StyleSheetAdapt,
    ViewTitle,
    BaseComponent,
    BarcodeView,
} from "react-native-lib-cus-com";

type Props = {};
export default class Test extends BaseComponent<Props> {

    constructor(props) {
        super(props);

    }
    render() {
        return (
            <ViewTitle>
                <BarcodeView ref={c=>this.barcodeView}
                    style={styles.testStyle}/>
                <Text onPress={()=>this.barcodeView.startScan()}>
                    开始扫码
                </Text>
            </ViewTitle>
        );
    }
}
const styles = StyleSheetAdapt.create({

    testStyle2:{
        width:100,
        height:200,
    },
    testStyle:{
        transform:[
            {rotateX:'180deg'}
        ],
    },
});
```

##### MenuBottom 底部菜单ui
```javascript
import {MenuBottom} from "react-native-lib-cus-com";
<MenuBottom ref={c=>this.menuBottom=c}
btnList={["btn1","btn2"]}
onPress={item=>{}}
/>
this.menuBottom.show(true);
```

##### SlideMenuDrawer   侧滑菜单 控件
```javascript
import {SlideMenuDrawer} from "react-native-lib-cus-com";
```

##### SwiperImage 图片轮播图
```javascript
import {SwiperImage} from "react-native-lib-cus-com";
```

##### SwiperNotice 公告轮播 图片和一些文本信息
```javascript
import {SwiperNotice} from "react-native-lib-cus-com";
```

##### TextChange 按钮 可使用API改变文本
```javascript
import {TextChange} from "react-native-lib-cus-com";
```

##### TextDoubleIcon 双文本并且右边有个图标 控件
```javascript
import {TextDoubleIcon} from "react-native-lib-cus-com";
```

##### TextInputIcon 左边带图标的输入框 控件
```javascript
import {TextInputIcon} from "react-native-lib-cus-com";
```

##### TextInputLabel 带文字label 的输入框的输入框 控件
```javascript
import {TextInputLabel} from "react-native-lib-cus-com";
```

##### TextIcon 左边带图标的文本 控件
```javascript
import {TextIcon} from "react-native-lib-cus-com";
```

##### TextIconBg 圆进程可以放底图 中间可放进度百分比 控件
```javascript
import {TextIconBg} from "react-native-lib-cus-com";
```

##### TitleRow 左边具有按钮logo的UI 右边具有按钮 中间具有按钮UI控件
```javascript
import {TitleRow} from "react-native-lib-cus-com";
```

##### TitleBlock 左边具有竖杠 中间上部具有大文本紧挨着右边具有较小本 大文本下边有小文本
```javascript
import {TitleBlock} from "react-native-lib-cus-com";
```

##### TitleBlockList TitleBlock的列表
```javascript
import {TitleBlockList} from "react-native-lib-cus-com";
```

##### ModalTextInput  弹出输入内容框，如反馈评价等；（有一个评分输入，和一个评语输入）
```javascript
import {ModalTextInput} from "react-native-lib-cus-com";
```

##### ModalTextInputS  弹出输入内容框，如反馈评价等；（一个评语输入）
```javascript
import {ModalTextInputS} from "react-native-lib-cus-com";
```

##### ModalTextInputS 行选择，默认垂直(或水平)显示选项选择,(单选或多选)
```javascript
import {ModalTextInputS} from "react-native-lib-cus-com";
```

##### ScrollSelectOptions  左边具有标题的提示的UI 右边具有标识或UI的 UI控件
```javascript
import {ScrollSelectOptions} from "react-native-lib-cus-com";
```

##### ScrollViewRowList  分组的带图片的ui 上部有title的文本，下边是主体有图片，图片下边有文本 支持一行多个或竖直多个
```javascript
import {ScrollViewRowList} from "react-native-lib-cus-com";
```

##### ItemRowSwitch 具有ItemRowTitle提示的下拉展示控件框 直接封装有打开文件
```javascript
import {ItemRowSwitch} from "react-native-lib-cus-com";
```

##### ItemRowTableSwitch 具有ItemRowTitle提示的下拉展示控件框
```javascript
import {ItemRowTableSwitch} from "react-native-lib-cus-com";
```

##### ImageBrower 图片浏览UI，可以多个图片 缩略图和大图皆支持
```javascript
import {ImageBrower} from "react-native-lib-cus-com";
```

##### CheckBox 选择框 此库里只有本人写的源码，还未测试导出，有意者可自行修改导出
```javascript
```

##### Charts 图表
```javascript
import {Charts} from "react-native-lib-cus-com";
<Charts.BarHorizontal /> //水平渐变柱状图 双层颜色变化
<Charts.BarHorizontal2 /> //水平渐变柱状图2 左右有文字提示 中间相对比变化的进度对比条
<Charts.BarHorizontal3 /> //水平渐变柱状图3 可有多条BarHorizontal2
<Charts.BarCircleGradient /> //圆形渐变图
<Charts.BarCircleChart /> //圆形加载图 4圆 中间有显示文本（Native实现）
<Charts.Chart /> //echarts图表 图形类型：柱状图，饼图，饼图
<Charts.BarCharts /> //柱状图（Native实现）
```

##### ImageViewWatermark  固定图片水印模版UI 水印在左下角
```javascript
import {ImageViewWatermark} from "react-native-lib-cus-com";
ImageViewWatermark.show();//显示图片，有参数
或
<ImageViewWatermark ref={c=>this.waterMark=c} />
this.waterMark.show();//显示图片，有参数
```

##### GuideImageHint 任务头部水平提示导航栏
```javascript
import {GuideImageHint} from "react-native-lib-cus-com";
```

##### ItemRowBuyCar 购物车行元素UI,右，有勾选框、图片、文本、数量输入UI；
```javascript
import {ItemRowBuyCar} from "react-native-lib-cus-com";
```

##### ItemRowGoods 商品行组件 水平行，从左到右内容分别是，左边一张图片，中间有可支持5行竖直的文本行，其次是商品价格 最右边一个按钮（如加入购物车）
```javascript
import {ItemRowGoods} from "react-native-lib-cus-com";
```

##### ItemRowGoods 商品行组件 水平行，从左到右内容分别是，左边一张图片，中间有可支持5行竖直的文本行，其次是商品价格 最右边一个按钮（如加入购物车）
```javascript
import {ItemRowGoods} from "react-native-lib-cus-com";
```

##### ItemRowGoodsPromotion 促销活动Item；一张图片，图片左下角和右下角分别有一个按钮
```javascript
import {ItemRowGoodsPromotion} from "react-native-lib-cus-com";
```

##### ItemRowGuideApplyType 行选择组件，分成两部分，左边支持文本和选择框，右边是文本
```javascript
import {ItemRowGuideApplyType} from "react-native-lib-cus-com";
```

##### ItemRowTripApply 出差样式UI，左边文本提示文字，右边可以是：下拉框，输入框，文本
```javascript
import {ItemRowTripApply} from "react-native-lib-cus-com";
```

##### ItemRowGuideTripApply 行单元格，一行内可支持1到7个单元格，可组合成表格。
```javascript
import {ItemRowGuideTripApply} from "react-native-lib-cus-com";
```

##### ItemRowTripTask 行组件，上部是左边是title，右边是状态；像QQ一样单行可以侧滑，侧滑显示按钮
```javascript
import {ItemRowTripTask} from "react-native-lib-cus-com";
```

##### ItemRowReciew 多个ui平分一行 水平
```javascript
import {ItemRowReciew} from "react-native-lib-cus-com";
```

##### BarHorizontalTitleSection 条形进度块，上部有对比条提示，左边有对比的title，主体是对比条若干
```javascript
import {BarHorizontalTitleSection} from "react-native-lib-cus-com";
```

##### ChartCircleProgress 4圆进度显示Chart 中间提示进度数据 最外层时间进度，跨度1月最小单位；天 (主页业绩进度例子，左边圆圈进度)
```javascript
import {ChartCircleProgress} from "react-native-lib-cus-com";
```

##### ChartCircleProgressList  是ChartCircleProgress列表 有title （基于 ChartCircleProgress）
```javascript
import {ChartCircleProgressList} from "react-native-lib-cus-com";
```

##### ResultProgressBlock  业务进度块 类似于进度对比表，有显示的基本内容，还有条状的对比图
```javascript
import {ResultProgressBlock} from "react-native-lib-cus-com";
```

##### SearchDDDIpt  搜索组件 四个下拉框 一个输入框 一个搜索按钮
```javascript
import {SearchDDDIpt} from "react-native-lib-cus-com";
```

##### SearchDropIpt  搜索组件 四个下拉框 一个输入框 一个搜索按钮
```javascript
import {SearchDropIpt} from "react-native-lib-cus-com";
```

##### SearchIpt  具有 输入框(或下拉框)--按钮 的搜索条件的UI
```javascript
import {SearchIpt} from "react-native-lib-cus-com";
```

##### TitleBlockTarget 目标幕模块 上部有header文本 中间有TitleBlockList 下边有TitleBlock文本提示(下左)和BarHorizontalTitleSection（对比进程 下右）
```javascript
import {TitleBlockTarget} from "react-native-lib-cus-com";
```

##### TitleBlockTargetArea 区域模块 上部有header文本 中间有ResultProgressBlock（业绩进度模块） 下边有TitleBlock文本提示(下左)和BarHorizontalTitleSection（对比进程 下右）
```javascript
import {TitleBlockTargetArea} from "react-native-lib-cus-com";
```

### 欢迎交流
欢迎提问交流；若有bug，请添加bug截图或代码片段，以便更快更好的解决问题。<br>
欢迎大家一起交流

### [我的博客](http://blog.sina.com.cn/s/articlelist_6078695441_0_1.html)