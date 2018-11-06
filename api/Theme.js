/**
 * Created by Administrator on 2018/5/1.
 */

import {StyleSheetAdapt} from "./StyleSheetAdapt";
import {
    StackNavigator,
    DrawerNavigator,
    TabNavigator,
    TabBarBottom,
    TabBarTop,
    DrawerItems,
} from 'react-navigation';

/**
 * 颜色集合
 * **/
export class Theme{

    static Colors = {
        borderColor:'#5b5b5b',//边框色
        backgroundColor:'#f8f1f3',//背景色
        backgroundColor1:'rgba(00, 00, 00, 0.5)',//背景色2,黑色半透明
        backgroundColor2:'rgba(235, 179, 00, 0.4)',//背景色2,浅黄色
        backgroundColor3:'#00b7ee',//背景色3,淡蓝色
        backgroundColorBtn:'#FABE00',//背景色 按钮
        backgroundColorYellow1:'rgba(250, 190, 00, 0.2)',//背景色 浅黄色1
        backgroundColorYellow2:'rgba(250, 190, 00, 0.4)',//背景色 浅黄色1
        backgroundColorYellow3:'rgba(250, 190, 00, 0.6)',//背景色 浅黄色1
        backgroundColorYellow4:'rgba(250, 190, 00, 0.8)',//背景色 浅黄色1
        backgroundColorBtn1:'red',//背景色1 按钮
        backgroundColorPrompt:'#d4cdcf',//背景色 按钮
        themeColor:"#FF6B01",//主题色
        themeColor1:'rgba(255, 107, 01, 0.2)',//主题色 浅色1
        themeColor2:'rgba(255, 107, 01, 0.4)',//主题色 浅色1
        themeColor3:'rgba(255, 107, 01, 0.6)',//主题色 浅色1
        themeColorLight:"rgba(255, 107, 1, 0.3)",//主题色 淡色 一般
        themeColorLight0:"rgba(255, 107, 1, 0.1)",//主题色 淡色 1级
        themeColorLight1:"rgba(255, 107, 1, 0.2)",//主题色 淡色 2级
        themeColorLight2:"rgba(255, 107, 1, 0.4)",//主题色 淡色 2级
        // appRedColor:'red',//app应用红色
        appRedColor:'#FF0000',//app应用红色
        colorFontBtn:'#FFFFFF',//按钮文字主题色
        foregroundColor:'#FFFFFF',// 前景色
        minorColor:'gray',//次要文字颜色，灰色
        barGreen:'#1aff84',//柱状色绿色
        barGray1:'#eae0dc',//灰偏红色
        barGray2:'#ffede3',//灰偏红色
        fontcolor:"#000000",//一般字体色，黑色
        fontcolor_1:"rgba(0, 0, 0, 0.8)",//-1级字体色，黑色
        fontcolor_2:"rgba(0, 0, 0, 0.6)",//-2级字体色，黑色
        transparent:"transparent",//透明色
        activeBtnColor:'#FABE00',//按钮激活色
        progressColor:"#d35400",//进度颜色
    };

    static Font = {
        fontFamily:null,//字体，采用默认
        fontSize5:45,//五级标题字号
        fontSize4:40,//四级标题字号
        fontSize3:35,//三级标题字号
        fontSize2:30,//二级标题字号
        fontSize1:25,//一级标题字号
        fontSize:23,//普通字号
        fontSize_1:20,
        fontSize_1_1:18,
        fontSize_2:15,
        fontSize_3:10,
    };

    static Border = {
        borderWidth:0.5,//边框线宽
        borderWidth1:1.0,//边框线宽
        borderWidth2:2.0,//边框线宽
        borderRadius:4,//边框线角弧度
        borderRadius1:8,//边框线角弧度
    };

    static Width = {
        width1:150,
        marginWidth:10,
    };

    static Height = {
        height1:30.5,
        height2:31.5,
        heightGuideTop:92,//顶部导航栏高度
    };

    static Status = {
        executing:'executing',
    };

    static TaskTypes = {
        oldShopTypes:[
            {text:"签到",status:-1},
            {text:"客户\n回顾",status:-1},
            {text:"店铺\n检查",status:1},
            {text:"事项\n跟进",status:0},
            {text:"资料\n签收",status:0},
            {text:"签退",status:1}
            ]
    };


    static TabNavigatorConfigs = {
        // initialRouteName: 'PageTaskDrawer',
        tabBarComponent: TabBarBottom,
        tabBarPosition: 'top',
        lazy: true,
        swipeEnabled:false,
        animationEnabled:true,
        tabBarOptions:{
            activeTintColor:"#FF6B01",
            style:{
                height:0,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor:"#f8f1f3",
                /* borderBottomWidth:StyleSheetAdapt.getHeight(1),
                 borderBottomColor:'rgba(00, 00, 00, 0.8)',*/
            },
            labelStyle:{
                flex:1,
                fontSize:StyleSheetAdapt.getWidth(22),
                //backgroundColor:"red",
                marginLeft:0,

            },
            /* tabStyle:{
                 flexDirection: 'column',
                 // backgroundColor:"yellow",
                 // display:'none',
                 alignItems: "center",
                 justifyContent: "center",
                 // height:0,
             },
             indicatorStyle:{
                 // height:StyleSheetAdapt.getHeight(1)
             },*/
        }
    };

    static TabNavigatorConfigsTop = {
        // initialRouteName: 'PageShouldKnowRecommendCourse',
        // tabBarComponent: TabBarBottom,
        tabBarComponent: TabBarTop,
        tabBarPosition: 'top',
        lazy: true,
        swipeEnabled:true,
        animationEnabled:true,
        tabBarOptions:{
            activeTintColor:Theme.Colors.themeColor,
            inactiveTintColor:Theme.Colors.fontcolor,
            style:{
                // height:200,
                // alignItems: "center",
                // justifyContent: "center",
                backgroundColor:Theme.Colors.foregroundColor,
                // borderBottomWidth:StyleSheetAdapt.getHeight(1),
                // borderBottomColor:'rgba(00, 00, 00, 0.8)',
            },
            labelStyle:{
                // flex:1,
                fontSize:StyleSheetAdapt.getWidth(22),
                //backgroundColor:"red",
                // marginLeft:0,

            },
            tabStyle:{

                // flexDirection: 'column',
                // backgroundColor:"yellow",
                // display:'none',
                /*alignItems: "center",
                justifyContent: "center",*/
                // height:0,
            },
            indicatorStyle:{
                height:StyleSheetAdapt.getHeight(1),
                backgroundColor:Theme.Colors.themeColor,
            },
        }
    };

}


