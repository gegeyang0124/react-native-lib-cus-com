/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow TextInput自动提示输入
 */

import React, {Component} from 'react';
import PropTypes  from 'prop-types';
import {
    Dimensions,
    DrawerLayoutAndroid,
    Platform,
    View,
    Text,
    Animated,
} from 'react-native';
import {
    StyleSheetAdapt,
    Theme
} from './../api/api';
import SideMenu from 'react-native-side-menu';
const screen = Dimensions.get('window');

/**
 * 策划菜单 控件
 * **/
export class SlideMenuDrawer extends Component {
    static propTypes = {
        menu:PropTypes.object,//菜单View
        isOpen:PropTypes.bool,//控制侧滑菜单打开（true）和关闭(false)
        drawerWidth:PropTypes.number,//侧滑菜单宽度
        isAndroid:PropTypes.bool,//是否使用android风格侧滑菜单，默认是true,对android有效，ios无效
    }

    /**
     * 设置默认属性
     * **/
    static defaultProps = {
        drawerWidth:screen.width * 0.6,
        isAndroid:Platform.OS == "android" ? true : false
    }

    constructor(props) {
        super(props);

        this.state = {
            isOpen:false
        };
    }

    componentWillReceiveProps()
    {
        // const {isAndroid} = this.props;
        // if(Platform.OS == "android")
        {
            // this.props.isOpen ? this.refs.drawer.openDrawer() : this.refs.drawer.closeDrawer();
            this.props.isOpen ? this.openDrawer() : this.closeDrawer();
        }
    }

    openDrawer(){
        const {isAndroid} = this.props;
        if(Platform.OS == "android"){
            if(isAndroid){
                this.drawer.openDrawer();
            }
            else {
                this.drawer.openDrawer();
            }

        }
        else {
            this.setState({
                isOpen:true
            });
        }

    }

    closeDrawer(){
        const {isAndroid} = this.props;
        if(Platform.OS == "android"){
            if(isAndroid){
                this.drawer.closeDrawer();
            }
            else {
                this.drawer.closeDrawer();
            }

        }
        else {
            this.setState({
                isOpen:false
            });
        }
    }

    render() {
        const {children,drawerWidth,menu,isOpen,isAndroid} = this.props;

        if(Platform.OS == "ios") {
            return(
                <SideMenu {...this.props}
                          isOpen={isOpen  == undefined ? this.state.isOpen : isOpen}>
                    {children}
                </SideMenu>
            );
        }
        else if(!isAndroid){
            return(
                <DrawerLayoutAndroid {...this.props}
                    // ref="drawer"
                                     ref={(drawer)=>{
                                         this.drawer = drawer;
                                     }}
                                     drawerWidth={drawerWidth}
                                     drawerPosition={DrawerLayoutAndroid.positions.Left}
                                     renderNavigationView={() =>menu}>
                    {children}
                </DrawerLayoutAndroid>
            );
        }
        else {
            return (
                <DrawerLayoutAndroid {...this.props}
                    // ref="drawer"
                                     ref={(drawer)=>{
                                         this.drawer = drawer;
                                     }}
                                     drawerWidth={drawerWidth}
                                     drawerPosition={DrawerLayoutAndroid.positions.Left}
                                     renderNavigationView={() =>menu}>
                    {children}
                </DrawerLayoutAndroid>
            );
        }
    }
}

const styles = StyleSheetAdapt.create({
    container: {
        flex: 1,
        backgroundColor: Theme.Colors.backgroundColor,
        height:'h',
        width:'w',
    },
});