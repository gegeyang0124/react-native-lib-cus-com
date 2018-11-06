# react-native-lib-cus-com
react-native 自定义辅助组件库，完美适配各种机型和屏幕大小；
完美的网路请求，带加载条，可上传、下载文件;
等等多种ui,可自定义删除;可节省应用级软件的开发时间

###  注意：
1.所有源码中的方法有注释，可自行查看；<BR/>
2.各组件的详细调用方法，可进入相应的组件文件查看，里面所有的方法/函数都有注释；<BR/>
3.以下“使用”的说明只有简单的说明(且都不写参数，直接复制使用，可能会报错)，具体说明，请参照“注意”第2点
<BR/>
### 安装依赖（别忘了根据相应库进行react-native link ...）:
npm i --save react-native-root-siblings <BR/>
npm i --save react-native-view-shot <BR/>
npm i --save react-native-sqlite-storage <BR/>
npm i --save react-native-fs <BR/>
npm i --save react-native-sqlite-storage <BR/>
npm i --save react-native-device-info <BR/>
/** react-native-update <BR/>
 发布热更新报错 将node_modules\react-native-update\local-cli\lib\bundle.js <BR/>
 的439行种的metro-bundler改成metro可成功运行！ <BR/>
 报错版本0.52+(0.52以上版本报错) <BR/>
 **/ <BR/>
npm i --save react-native-update <BR/>
npm i --save react-native-image-marker <BR/>
npm i --save react-native-storage <BR/>
npm i --save react-native-image-crop-picker <BR/>
npm i --save react-native-image-picker <BR/>
npm i --save react-native-picker <BR/>
npm i --save react-native-spinkit <BR/>

### 使用api：
##### Http 网路请求
```
import {Http} from "react-native-lib-cus-com";
Http.post();//基于 fetch 封装的 POST请求
Http.get();//基于 fetch 封装的 Get请求
Http.requestAjax();//基于 ajax 封装的 网络请求
Http.urlFile = "";//上传文件 接口
Http.upLoadFileToService();//上传文件 react-native-fs
Http.downloadFile();//下载文件 react-native-fs
```
##### Alert对话框
```
import {Alert} from "react-native-lib-cus-com";
Alert.alert();//显示对话框
Alert.hide();//关闭对话框
```
##### CaptureImage 截屏或截UI图 基于react-native-view-shot
```
import {CaptureImage} from "react-native-lib-cus-com";
CaptureImage.captureViewScreen();//截屏 截取UI的图片
```

##### DbMgr 数据库操作 基于react-native-sqlite-storage
```
import {DbMgr} from "react-native-lib-cus-com";
DbMgr.DB_TABLE_LIST = [];//创建表列表 此必须先调用
DbMgr.executeSql();//执行sql
还有很多方法，请查看文件里的注释
```

##### HotUpdate 热更新，提供热更新各种方法 基于react-native-update
```
安装、配置好react-native-update后

/**
 发布热更新报错 将node_modules\react-native-update\local-cli\lib\bundle.js
 的439行种的metro-bundler改成metro可成功运行！
 报错版本0.52+(0.52以上版本报错)
 **/


/**
 * HotUpdate 热更新，提供热更新各种方法
 * 元信息：{
updateList:[],//更新app id集合（app id集合）//不传更新全部
updateNoList:[],//不更新app id集合（app id集合）//传了的账户则不更新
code:777,//777、立刻更新；888、立刻强制更新；999、立刻静默更新
reboot:555,//666、强制使用更新；555、用户决定是否使用更新;333、下次启用更新 默认是555
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
HotUpdate.appID = null;//当前给app指定（分配）的id
HotUpdate.updateFirst = true;//app第一次启动是否强制更新，默认true更新

这些设置完后即可，提示会根据元信息的情况提示
```
##### IamgeWaterMark 设置图片水印 基于react-native-image-marker
```
import {IamgeWaterMark} from "react-native-lib-cus-com";
IamgeWaterMark.markText();//设置水印文本
```

##### JPush 极光推送类，提供极光推送的各种方法
```
本库未直接导出，若想使用，使用自行导出；
需要安装:
npm i --save jcore-react-native
npm i --save jpush-react-native
```

##### LocalStorage 持久化本地存储 基于react-native-storage
```
import {LocalStorage} from "react-native-lib-cus-com";
LocalStorage.save();//使用key来保存单个数据（key-only）。这些数据一般是全局独有的，需要谨慎单独处理的数据
LocalStorage.get();//读取单个数据
LocalStorage.saves();//使用key来保存批量数据（key-only）。这些数据一般是全局独有的，需要谨慎单独处理的数据
LocalStorage.gets();//读取批量数据
```

##### Media 媒体类，处理摄像头使用和相册的使用 相册文件操作 基于react-native-image-crop-picker和react-native-image-picker
```
import {Media} from "react-native-lib-cus-com";
Media.pickImage();//选择图片 react-native-image-crop-picker
Media.takeImage();//拍照 react-native-image-crop-picker
Media.pickVideo();//选择视频 react-native-image-crop-picker
Media.takeVideo();//拍摄视频 react-native-image-picker
```

##### MenuBottomApi 底部弹出菜单API
```
import {MenuBottomApi} from "react-native-lib-cus-com";
MenuBottomApi.show();//显示底部菜单
MenuBottomApi.hide();//隐藏底部菜单
```
##### PickerCustome 自定义滑动选择   基于react-native-picker
```
import {PickerCustome} from "react-native-lib-cus-com";
PickerCustome.pick();//选择框 底部
PickerCustome.pickMonth();//选择年月
```
##### ProgressApi 加载指示器（加载条）  基于react-native-spinkit
```
import {PickerCustome} from "react-native-lib-cus-com";
PickerCustome.pick();//选择框 底部
PickerCustome.pickMonth();//选择年月
```