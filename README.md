# react-native-lib-cus-com
react-native 自定义辅助组件库，完美的网路请求，带加载条，可上传、下载文件，等等多种ui，可自定义删除;可节省应用级软件的开发时间

###  注意：
1.所有源码中的方法有注释，可自行查看；<BR/>
2.各组件的详细调用方法，可进入相应的组件文件查看，里面所有的方法/函数都有注释；<BR/>
3.以下“使用”的说明只有简单的说明(且都不写参数，直接复制使用，可能会报错)，具体说明，请参照“注意”第2点
<BR/>
### 安装依赖:
npm i --save react-native-root-siblings <BR/>
npm i --save react-native-view-shot <BR/>
npm i --save react-native-sqlite-storage <BR/>
npm i --save react-native-fs <BR/>
npm i --save react-native-sqlite-storage <BR/>
npm i --save react-native-update <BR/>

### 使用api：
##### Alert对话框
```
import {Alert} from "react-native-lib-cus-com";
Alert.alert();//显示对话框
Alert.hide();//关闭对话框
```
##### CaptureImage 截屏或截UI图
```
import {CaptureImage} from "react-native-lib-cus-com";
CaptureImage.captureViewScreen();//截屏 截取UI的图片
```

##### DbMgr 数据库操作
```
import {DbMgr} from "react-native-lib-cus-com";
DbMgr.DB_TABLE_LIST = [];//创建表列表 此必须先调用
DbMgr.executeSql();//执行sql
还有很多方法，请查看文件里的注释
```

##### HotUpdate 热更新，提供热更新各种方法
```
安装、配置好react-native-update后

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
HotUpdate.appID = null;//当前给app指定（分配）的id
HotUpdate.updateFirst = true;//app第一次启动是否强制更新，默认true更新

这些设置完后即可，提示会根据元信息的情况提示
```