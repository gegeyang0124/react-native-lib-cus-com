import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
    View,
    Image,
    Text,
    TouchableOpacity,
    ScrollView,
} from 'react-native';

import {
    StyleSheetAdapt,
    Theme,
    Tools,
} from './../api/api';

import {ButtonImage} from "./ButtonImage";
import {ButtonChange} from "./ButtonChange";
import BaseComponent from "./BaseComponent";
import {Progress} from "./Progress";
import {ProgressPer} from "./ProgressPer";
import {SlideMenuDrawer} from "./SlideMenuDrawer";
import {ImageBrower} from "./ImageBrower";
import {ImageViewWatermark} from "./ImageViewWatermark";

import leftWhite from "lib-images-zy/leftWhite.png";

/**
 * 导航框控件 头部有导航栏（可设置有无） 左边带返回按钮（可设置有无） 中间有title文本（可设置有无） 右边带菜单按钮（可设置有无）
 * 底部带按钮（可设置有无） 可设置是否可滚动 一般用于作为页面的基础框View
 */
export class ViewTitle extends Component {


    //属性注释及类型,所有的属性对象都是句柄模式（类型时number），类似C语言中的指针
    static propTypes = {
        frameStyle:PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.array,
            PropTypes.object,
        ]),//框样式
        scrollFrameStyle:PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.array,
            PropTypes.object,
        ]),//滚动框样式
        viewBottomFrameStyle:PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.array,
            PropTypes.object,
        ]),//底部按钮框样式
        icon: PropTypes.number,//输入框图标,图片
        text: PropTypes.string,//标题文本
        viewRight: PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.string,
            PropTypes.object,
            //React.PropTypes.instanceOf(Message)
        ]),//右边的ui，可传入文本和ui，传入文本时使用默认按钮样式反之，显示自定义ui
        onPressLeft: PropTypes.func,//左边事件
        isDefaultOnPressLeft:PropTypes.bool,//左边事件，是否使用默认处理事件,默认为true（是），false（否）
        onPressCenter: PropTypes.func,//中间事件
        onPressRight: PropTypes.func,//右边事件
        viewBottom:PropTypes.oneOfType([
            PropTypes.string,//单个按钮 可传入一个字符串
            PropTypes.object, //可传入自定义UI
            PropTypes.array,//多个按钮传入数组 成员：按钮文本 //成员：按钮文本string
            //React.PropTypes.instanceOf(Message)
        ]),//底部ui,可传入文本和ui，传入文本时使用默认按钮样式，反之显示自定义ui
        onPressBottom: PropTypes.func,//底部点击事件 回传：（item,i）item:按钮文本，i：数组中的下标
        isNavigator:PropTypes.bool,//是否使用导航条，true:使用,false:不使用；默认为false；
        isScroll:PropTypes.bool,// 内容UI是否使用滚动，true：使用,false：不使用，默认为true
        scrollPropsObject:PropTypes.object,//滚动属性集合
        /**
         成员：{
          text:'',//菜单文本
          onPress:func,//点击事件
          backgroundColor:'',//背景色
          }
         * **/
        menuDrawerData:PropTypes.array,//侧滑菜单默认左侧
        // isMenuDrawerOpen:PropTypes.object,//侧滑菜单是否打开，true:打开，false:关闭
        isAndroid:PropTypes.bool,//是否使用android风格侧滑菜单，默认是true,对android有效，ios无效
    };

    /**
     * 设置默认属性
     * **/
    static defaultProps = {
        isDefaultOnPressLeft:true,
        isNavigator:false,
        isScroll:true
    }

    goBack() {

        if(this.props.isDefaultOnPressLeft)
        {
            // alert("gggg：" + this.props.isDefaultOnPressLeft);
            // this.props.navigation.goBack();
            BaseComponent.goBack();
            // BaseComponent.screen.nav().goBack();
        }
    }

    /**
     * 启用滚动时有效
     * 滚动到指定的x, y偏移处。第三个参数为是否启用平滑滚动动画。
     * @param x int;//x坐标
     * @param y int;//y坐标
     * @param animated bool;//是否启用动画，默认true，启用
     * **/
    scrollTo(x, y, animated){
        this._scrollView.scrollTo({
            x: x == undefined ? 0 : x,
            y: y == undefined ? 0 : y,
            animated: animated == undefined ? true :animated
        });
    }

    /**
     * 启用滚动时有效
     * @param animated bool;//是否启用动画，默认true，启用
     * **/
    scrollToEnd(animated){
        this._scrollView.scrollToEnd({
            animated: animated == undefined ? true :animated
        });
    }

    getViewBottom(){
        const {viewBottom} = this.props;

        let lst = viewBottom;

        if(viewBottom && viewBottom.constructor == String){
            lst = [viewBottom];
        }

        return lst;
    }

    renderBottomBtn = (item,i)=>{
        const {onPressBottom} = this.props;
        return(
            <ButtonChange key={"btn" + i}
                          style={styles.btnStyleBottom}
                          textStyle={styles.btnTextStyleBottom}
                          onPress={()=>onPressBottom&&onPressBottom(item,i)}
                          text={item}/>
        );
    }

    renderConntent(){
        const {isNavigator,onPressLeft,icon,text,viewRight,onPressRight,
            isScroll,scrollPropsObject,children,frameStyle,viewBottomFrameStyle,
            scrollFrameStyle} = this.props;

        const viewBottom = this.getViewBottom();

        return (
            <View style={[styles.container,frameStyle]}>
                {
                    isNavigator ?  <View style={styles.title}>
                        <View style={styles.titleLeft}>
                            <ButtonImage onPressIn={() =>this.goBack()}
                                         onPressOut={onPressLeft}
                                         icon={icon == undefined ? leftWhite : icon}
                                         style={styles.iconStyleLeft}/>

                        </View>
                        <View style={styles.titleCenter}>
                            <Text style={styles.textStyle}>
                                {text}
                            </Text>
                        </View>
                        <View style={styles.titleRight}>

                            {
                                typeof (viewRight) == "number"
                                    ? <ButtonImage onPress={onPressRight}
                                                   icon={viewRight}
                                                   style={styles.iconStyleRight}/>
                                    : typeof (viewRight) == "string"
                                    ? <ButtonChange onPress={this.props.onPressRight}
                                                    text={viewRight}
                                                    style={styles.btnStyle}
                                                    textStyle={styles.btnTextStyle}
                                    />
                                    : viewRight
                            }

                        </View>


                    </View> : null
                }

                <Progress ref={(com)=>Tools.progress = com}/>
                <ProgressPer />

                <ImageBrower/>
                <ImageViewWatermark/>

                {
                    isScroll
                        ? <ScrollView style={[{flex:1},this.props.style,
                            scrollFrameStyle,
                            scrollPropsObject&&scrollPropsObject.style]}
                                      {...scrollPropsObject}
                                      ref={(scrollView) => { this._scrollView = scrollView; }}>
                            {children}
                        </ScrollView>
                        : children
                }

                {
                    viewBottom&&(
                        viewBottom.constructor == Object
                            ? viewBottom
                            :  viewBottom.constructor == Array
                            ? <View style={[styles.btnFrameStyleBottom,viewBottomFrameStyle]}>
                                {
                                    viewBottom.map(this.renderBottomBtn)
                                }
                            </View>
                            : null
                    )

                }

            </View>
        );
    }

    renderMenuItem = (item,i)=>{
        return(
            <ButtonChange key={i}
                          text={item.text}
                          onPress={()=>item.onPress&&item.onPress(item)}/>
        );
    }

    renderMenuDrawer(){
        const {menuDrawerData} = this.props;
        return(
            <ScrollView>
                {
                    menuDrawerData.map(this.renderMenuItem)
                }
            </ScrollView>
        );
    }

    openDrawer(){
        this._slideMenuDrawer.openDrawer();
    }

    closeDrawer(){
        this._slideMenuDrawer.closeDrawer();
    }

    render() {
        /*onPressIn = {this.onPressIn}
         onPressOut={this.onPressOut}
         onLongPress={this.onLongPress}*/
        //alert(typeof (this.props.viewBottom) == "string")
        //alert(PropTypes.string)
        const {menuDrawerData,isMenuDrawerOpen} = this.props;
        return (
            menuDrawerData == undefined
                ? this.renderConntent()
                : <SlideMenuDrawer isOpen={isMenuDrawerOpen}
                                   isAndroid={false}
                                   ref={com=>this._slideMenuDrawer=com}
                                   menu={this.renderMenuDrawer()}>
                    {
                        this.renderConntent()
                    }
                </SlideMenuDrawer>
        );
    }
}

/*//添加属性确认
 ViewTitle.defaultProps = {
 isDefaultOnPressLeft: true,
 }*/

const styles = StyleSheetAdapt.create({
    container: {
        flex: 1,
        backgroundColor: Theme.Colors.backgroundColor,
    },
    title: {
        flexDirection: 'row',
        height: 70,
        backgroundColor: '#FF6B01',
        justifyContent: 'center',
        alignItems: 'center',

    },
    titleLeft: {
        flex: 1,
        flexDirection: "column",
        height: 70,
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    titleCenter: {
        flex: 1,
        flexDirection: "column",
        height: 70,
        justifyContent: 'center',
        alignItems: 'center',
    },
    titleRight: {
        flex: 1,
        flexDirection: "column",
        height: 70,
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    /**
     * 图标样式
     */
    iconStyleLeft: {
        height: 25,
        width: 25,
        left: 25,
        bottom: -8,
        //resizeMode: Image.resizeMode.contain,
        // resizeMode:"contain",
    },
    textStyle: {
        color: 'white',
        fontSize: 25,
        fontWeight: 'bold',
        bottom: -8,
    },
    iconStyleRight: {
        height: 32,
        width: 32,
        bottom: -8,
        right: 25,
    },
    btnStyle: {
        height: 32,
        //width:60,
        bottom: -8,
        right: 25,
        paddingLeft: 25,
        paddingRight: 25,
        backgroundColor: '#FABE00',
        borderRadius: 6,
    },
    btnTextStyle: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold'
    },
    btnFrameStyleBottom:{
        flexDirection:"row",
        justifyContent:'center',
        alignItems:'center',
    },
    btnStyleBottom:{
        height:45,
        width:150,
        marginBottom:20,
        marginLeft:5,
        marginRight:5,
        backgroundColor:'#FF6B01',
        justifyContent:'center',
        alignItems:'center',
        /*textAlign:"center",
         textAlignVertical:"center",*/
        borderRadius:10,
    },
    btnTextStyleBottom:{
        color:"#FFFFFF",
        fontSize:20,
        fontWeight:'bold'
    },


});
