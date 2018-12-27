import React, {Component, PureComponent} from "react";

import {StyleSheetAdapt} from "./../api/StyleSheetAdapt";
import {Tools} from "./../api/Tools";

/**
 * 修改react-navigation@1.5.11底层
 * 在 this.props.navigation 中添加setEvt方法
 * **/
import RN_Navigation from 'react-native-navigation-cus';
import {Components} from "./../StackComponent";
const Orientation = Components.react_native_orientation;


/**
 * 用于继承导航属性
 * **/
export default class BaseComponent extends RN_Navigation.BaseComponent {

    /*static navOptConfigs = {
     headerTitle:'首页',
     //headerLeft:null,
     // 配置页面导航选项
     headerLeft:<Image source={require('./../../res/images/leftWhite.png')}/>,
     };
     // 配置页面导航选项
     static navigationOptions = ({navigation}) => (BaseComponent.navOptConfigs);*/
    static screen;
    static navigationer;

    static isLockScreen = false;//是否锁定屏幕 默认false 未锁定

    /// 页面组件初始化时获取当前页面的实例
    constructor(props) {
        super(props);
        // console.info("this ",this)
        BaseComponent.screen = this;
        Tools.baseComponent = this;
        BaseComponent.navigationer = this.props.navigation;
    }

    static verfyComponent(){
        let b = true;
        if(!Orientation.lockToPortrait){
            console.info("请安装监听屏幕方向变化及屏幕方向设置组件","react-native-orientation");
            Tools.toast("请安装组件 react-native-orientation");
            b = false;
        }

        return b;
    }

    /**
     * 设置屏幕
     * @param action int,//0、屏幕随着系统切换；1、竖屏锁定；2、横屏锁定；3、左边横屏锁定；4、右边横屏锁定
     * **/
    setScreenOrientations(action){
        if(BaseComponent.verfyComponent()){
            action&&(BaseComponent.isLockScreen = true);
            // Tools.toast("" + BaseComponent.isLockScreen);
            switch (action){
                case 0:{
                    BaseComponent.isLockScreen&&Orientation.unlockAllOrientations();
                    BaseComponent.isLockScreen = false;
                    break;
                }
                case 1:{

                    // 只允许竖屏
                    Orientation.lockToPortrait();
                    break;
                }
                case 2:{
                    //只允许横屏
                    Orientation.lockToLandscape();
                    break;
                }
                case 3:{

                    Orientation.lockToLandscapeLeft();
                    break;
                }
                case 4:{
                    Orientation.lockToLandscapeRight();
                    break;
                }
            }
        }
    }
    static setScreenOrientations(action){
        if(this.verfyComponent()){
            action&&(BaseComponent.isLockScreen = true);
            // Tools.toast("action: " + action + BaseComponent.isLockScreen);
            switch (action){
                case 0:{

                    BaseComponent.isLockScreen&&Orientation.unlockAllOrientations();
                    BaseComponent.isLockScreen = false;
                    break;
                }
                case 1:{

                    // 只允许竖屏
                    Orientation.lockToPortrait();
                    break;
                }
                case 2:{
                    //只允许横屏
                    Orientation.lockToLandscape();
                    break;
                }
                case 3:{

                    Orientation.lockToLandscapeLeft();
                    break;
                }
                case 4:{
                    Orientation.lockToLandscapeRight();
                    break;
                }
            }
        }
    }

    /**
     * 获取屏幕方向
     * return 0/1 ;//int 0、竖屏,1、横屏
     * **/
    getOrientation(){
        if(BaseComponent.verfyComponent()){
            var initial = Orientation.getInitialOrientation();
            if (initial === 'PORTRAIT') {
                //do stuff
                return 0;
            } else {
                //do other stuff
                return 1;
            }

            /**
             * Orientation.getOrientation((err, orientation) => {
      console.log(`Current Device Orientation: ${orientation}`);
    });
             Orientation.removeOrientationListener(this._orientationDidChange);
             Orientation.addOrientationListener(this._orientationDidChange);
             * **/
        }
    }
    static getOrientation(){
        if(this.verfyComponent()){
            var initial = Orientation.getInitialOrientation();
            if (initial === 'PORTRAIT') {
                //do stuff
                return 0;
            } else {
                //do other stuff
                return 1;
            }

            /**
             * Orientation.getOrientation((err, orientation) => {
      console.log(`Current Device Orientation: ${orientation}`);
    });
             Orientation.removeOrientationListener(this._orientationDidChange);
             Orientation.addOrientationListener(this._orientationDidChange);
             * **/
        }
    }

    /**
     * 添加屏幕方向监听
     * @param cd func;//回调函数
     * **/
    static addOrientationListener(cd){
        Orientation.addOrientationListener((orientation)=>{
            cd&&cd(orientation);
            if (orientation === 'LANDSCAPE') {
                // do something with landscape layout
            } else {
                // do something with portrait layout 'PORTRAIT'
            }
        });
    }
    addOrientationListener(cd){
        BaseComponent.addOrientationListener(cd);
    }

}

const styles = StyleSheetAdapt.create({
    iconTab:{
        width:40,
        height:40,
        resizeMode:"contain",
    },
    iconLeft:{
        width:50,
        height:50,
        marginLeft:10,
    },
    iconRight:{
        width:40,
        height:40,
        marginRight:20,
    },
    headerTitleStyle:{
        flex: 1,
        textAlign: 'center',
        fontSize:25,
        left:-45,
    },
    iconStyle:{
        // tintColor:"#FFFFFF",
    },
});