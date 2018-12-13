/**
 * Created by Administrator on 2018/5/1.
 */

import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
    Text,
    View,
    ART,
} from 'react-native';
import {
    StyleSheetAdapt,
    Tools,
    Theme,
} from "./../api/api";

// import LinearGradient from 'react-native-linear-gradient';
/**
 * 修改底层
 * android 在滚动，需要设置scalesPageToFit={true}
 * echarts的底层的要换成echarts内库要换成echarts 4.x ；或更高版本
 * **/
// import Echarts from 'native-echarts';

/*import Svg,{
    Circle,
    Ellipse,
    G,
    RadialGradient,
    Line,
    Path,
    Polygon,
    Polyline,
    Rect,
    Symbol,
    Use,
    Defs,
    Stop,
    TSpan,
} from 'react-native-svg';//cx、cy和r道具定义了最外层的圆，fx和fy定义了最里面的圆。
/!**
 * <Path>的d
 属性内定义了一系列的路径坐标以及绘制规则命令，上面的所有图形都可以通过Path绘制而成
 M = 把绘制点移动到某个位置
 L = 从当前绘制点画一条直线到某个坐标
 H = 从当前绘制点沿着x轴水平画线
 V = 从当前绘制点沿着y轴垂直画线
 C = 从当前绘制点画一条曲线到某个坐标
 S = 从当前绘制点画一条平滑的曲线到某个坐标
 Q = 从当前绘制点画一条贝赛尔曲线到某个坐标
 T = 从当前绘制点画一条平滑的贝赛尔曲线到某个坐标
 A = 从当前绘制点画一条椭圆曲线到某个点
 Z = 闭合当前路径
 **!/
const SvgArt = require('react-native-svg');
const LinearGradientSvg = SvgArt.LinearGradient;
const TextSvg = SvgArt.Text;*/

/*import {
    VictoryGroup,
    VictoryBar,
    VictoryChart,
    VictoryTheme,
    VictoryPie,
} from "victory-native";*/

import Echarts from 'react-native-echarts-cus';
import {Components} from "./../StackComponent";
const LinearGradient = Components.react_native_linear_gradient;
const {
    Svg,
    Circle,
    Ellipse,
    G,
    RadialGradient,
    Line,
    Path,
    Polygon,
    Polyline,
    Rect,
    Symbol,
    Use,
    Defs,
    Stop,
    TSpan,
}  = Components.react_native_svg;
const LinearGradientSvg = Components.react_native_svg.LinearGradient;
const TextSvg =  Components.react_native_svg.Text;
const {
    VictoryGroup,
    VictoryBar,
    VictoryChart,
    VictoryTheme,
    VictoryPie,
} =  Components.victory_native;

/**
 * 水平渐变柱状图 双层颜色变化
 * **/
class BarHorizontal extends Component{

    colors = ['#E4E4E4','#E4E4E4'];
    forecolors = ['rgba(244, 206, 46, 1)', 'rgba(255, 107, 0, 1)'];

    //属性注释及类型,所有的属性对象都是句柄模式（类型时number），类似C语言中的指针
    static propTypes = {
        /**
         * 'up':文字在上部,
         * 'inner'：文字在内部,默认是inner
         * 'down'：文字在下部
         * **/
        textPosion:PropTypes.string,

        forecolors:PropTypes.oneOfType([
            PropTypes.array,
            PropTypes.string
        ]),//前景色渐变数组
        forecolorWidth:PropTypes.number,//前景色宽度与总宽度的比
        forecolorStyle:PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.object,
            PropTypes.array
        ]),//前景色样式
        textStart:PropTypes.string,//开始文字
        textStartStyle:PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.object,
            PropTypes.array
        ]),//开始文字样式
        textEnd:PropTypes.string,//结尾文字
        textEndStyle:PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.object,
            PropTypes.array
        ]),//结尾文字样式
        colors:PropTypes.oneOfType([
            PropTypes.array,
            PropTypes.string
        ]),//结尾文字
    }

    /**
     * 设置默认属性
     * **/
    static defaultProps = {
        textPosion:'inner'
        // forecolors:['rgba(244, 206, 46, 1)', 'rgba(255, 107, 0, 1)'],
        // colors:this.colorsDefault,
    }

    constructor(props) {
        super(props);

        if(!LinearGradient){
            console.info("请安装流线型颜色渐变组件","react-native-linear-gradient");
            Tools.toast("请安装组件 react-native-linear-gradient");
        }
    }

    getColors(colors) {

        if(colors == undefined){
            colors = this.colors;
        }
        else if(typeof (colors) == 'string')
        {
            colors = [colors,colors];
        }
        else if(colors.constructor == Array)
        {
            if(colors.length == 1){
                colors = [colors[0],colors[0]];
            }
            else if(colors.length == 0)
            {
                colors = this.colors;
            }
        }

        return colors;
    }

    getForecolors(colors) {

        if(colors == undefined){
            colors = this.forecolors;
        }
        else if(typeof (colors) == 'string')
        {
            colors = [colors,colors];
        }
        else if(colors.constructor == Array)
        {
            if(colors.length == 1){
                colors = [colors[0],colors[0]];
            }
            else if(colors.length == 0)
            {
                colors = this.forecolors;
            }
        }

        return colors;
    }

    /* start: { x: 0.3, y: 0.4 } 渐变是从 左侧30%， 上部 40% 开始
     end: { x: 0.7, y: 0.8 } 渐变是从 左侧70%， 上部 80% 结束*/

    render() {

        if(!LinearGradient){
            return (null);
        }

        let {colors,style,forecolors,forecolorWidth, textStart,textPosion,
            textEnd,forecolorStyle,textStartStyle,textEndStyle} = this.props;
        forecolorWidth = forecolorWidth > 1 ? 1 :forecolorWidth;
        colors = this.getColors(colors);
        forecolors = this.getForecolors(forecolors);
        // alert(textStart)

        return(
            <View>
                {
                    textPosion == 'up'
                        ?
                        <View style={styles.frame1}>
                            <Text style={[styles.buttonText1,textStartStyle]}>
                                {textStart}
                            </Text>
                            <Text style={[styles.buttonText1,styles.buttonText2,textEndStyle]}>
                                {textEnd}
                            </Text>
                        </View>
                        : null
                }

                <View>

                    <LinearGradient {...this.props}
                                    colors={colors}
                                    start={{x: 0, y: 0}}
                                    end={{x: 1, y: 0}}
                                    style={[styles.linearGradient1,style]}>
                        {
                            textPosion == 'inner'
                                ?
                                <Text style={[styles.buttonText1,textStartStyle]}>
                                    {textStart}
                                </Text>
                                :null
                        }

                        <LinearGradient colors={forecolors}
                                        start={{x: 0, y: 0}}
                                        end={{x: 1, y: 0}}
                                        style={[
                                            styles.linearGradient2,
                                            style,
                                            forecolorStyle,
                                            {width:Tools.getStyle(style).width * forecolorWidth}
                                        ]}>
                        </LinearGradient>

                        {
                            textPosion == 'inner'
                                ?
                                <Text style={[styles.buttonText1,styles.buttonText2,textEndStyle]}>
                                    {textEnd}
                                </Text>
                                :null
                        }

                    </LinearGradient>

                </View>
            </View>
        );

    }

}
const styles = StyleSheetAdapt.create({

    frame1:{
        justifyContent:'space-between',
        flexDirection:'row',
    },
    linearGradient1: {
        // marginLeft:50,
        flexDirection:'row',
        width:100,
        height:50,
        /*alignContent: 'center',
         justifyContent: 'center',*/
    },
    linearGradient2: {
        // flex: 1,
        // paddingLeft: 10,
        // left:0,
        // paddingRight: 15,
        // borderRadius: 5
    },
    buttonText1: {
        fontSize: 18,
        fontFamily: 'Gill Sans',
        // textAlign: 'center',
        marginTop: 10,
        marginBottom: 10,
        color: '#000000',
        backgroundColor: 'transparent',
        zIndex:999,
        position:'absolute',
    },
    buttonText2: {
        position:'absolute',
        right:10,
    },
});

/**
 * 水平渐变柱状图2 左右有文字提示 中间相对比变化的进度对比条
 * **/
class BarHorizontal2 extends Component{

    //属性注释及类型,所有的属性对象都是句柄模式（类型时number），类似C语言中的指针
    static propTypes = {
        frameStyle:PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.object,
            PropTypes.array
        ]),//框样式

        colors1:PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.array
        ]),//左边进度颜色渐变 //默认单灰色
        colors2:PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.array
        ]),//右边进度颜色渐变 //默认单五色
        isShowTextLeft:PropTypes.bool,//是否显示左边文本 默认true 显示
        textLeft:PropTypes.oneOfType([
            PropTypes.string,//文本
            PropTypes.object,//ui
        ]),//左边文本
        textLeftStyle:PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.object,
            PropTypes.array
        ]),//左边文本样式
        textRight:PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.object,
            PropTypes.array
        ]),//右边文本
        isShowTextRight:PropTypes.bool,//是否显示右边文本 默认true 显示
        textRightStyle:PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.object,
            PropTypes.array
        ]),//右边文本样式

        progress:PropTypes.number,//所占比值0～1 默认是1
    }

    /**
     * 设置默认属性
     * **/
    static defaultProps = {
        colors1:Theme.Colors.minorColor,
        colors2:Theme.Colors.transparent,
        progress:1,
        isShowTextLeft:true,
        isShowTextRight:true,
    }

    constructor(props) {
        super(props);

        if(!LinearGradient){
            console.info("请安装流线型颜色渐变组件","react-native-linear-gradient");
            Tools.toast("请安装组件 react-native-linear-gradient");
        }
    }

    getColors(colors) {
        // console.info("colors:",colors);
        if(typeof (colors) == 'string')
        {
            colors = [colors,colors];
        }
        else if(colors.constructor == Array)
        {
            if(colors.length == 1){
                colors = [colors[0],colors[0]];
            }
        }

        return colors;
    }

    getPercentWidth(type){
        let {progress} = this.props;
        progress = progress > 1 ? 1 : progress;
        let flex = 7;
        switch (type)
        {
            case 0 :{
                flex = flex * progress;
                break;
            }
            case 1 :{
                flex = flex * (1 - progress);
                break;
            }
        }

        return {
            flex:flex
        }
    }

    getProgress(){
        let {progress} = this.props;

        progress = progress&&progress;

        if(typeof (progress) == 'number'){
            progress = [{progress:progress}];
        }
        else if(progress.constructor != Array)
        {
            progress = [progress];
        }

        return progress;
    }

    renderItem = (item,i)=>{

        const {colors1,colors2} = this.props;
        return(
            <View key={i}
                  style={stylesBH2.frameStyle_2_1}>
                <LinearGradient colors={this.getColors(item.colors1 ? item.colors1 : colors1)}
                                start={{x: 0, y: 0}}
                                end={{x: 1, y: 1}}
                                style={[stylesBH2.linearH,this.getPercentWidth(0,item.progress)]}></LinearGradient>

                <LinearGradient colors={this.getColors(item.colors2 ? item.colors2 : colors2)}
                                start={{x: 0, y: 0}}
                                end={{x: 1, y: 1}}
                                style={[stylesBH2.linearH,this.getPercentWidth(1,item.progress)]}></LinearGradient>
            </View>
        );
    }

    /*start: { x: 0.3, y: 0.4 } 渐变是从 左侧30%， 上部 40% 开始
    end: { x: 0.7, y: 0.8 } 渐变是从 左侧70%， 上部 80% 结束*/
    render() {

        if(!LinearGradient){
            return (null);
        }

        const {frameStyle,textLeftStyle,textRightStyle,textLeft,textRight,
            colors1,colors2,isShowTextRight,isShowTextLeft,progress} = this.props;


        return(

            <View style={[stylesBH2.frameStyle,frameStyle]}>
                {
                    isShowTextLeft&&<View style={stylesBH2.frameStyle_1}>
                        <Text style={[stylesBH2.text,textLeftStyle]}>
                            {textLeft}
                        </Text>
                    </View>
                }

                <View style={stylesBH2.frameStyle_2}>
                    <View style={stylesBH2.frameStyle_2_1}>
                        <LinearGradient colors={this.getColors(colors1)}
                                        start={{x: 0, y: 0}}
                                        end={{x: 1, y: 1}}
                                        style={[stylesBH2.linearH,this.getPercentWidth(0)
                                            ,progress ? {} : stylesBH2.progress0]}></LinearGradient>

                        <LinearGradient colors={this.getColors(colors2)}
                                        start={{x: 0, y: 0}}
                                        end={{x: 1, y: 1}}
                                        style={[stylesBH2.linearH,this.getPercentWidth(1)]}></LinearGradient>
                    </View>
                </View>

                {
                    isShowTextRight&& <View style={stylesBH2.frameStyle_3}>
                        <Text style={[stylesBH2.text,textRightStyle]}>
                            {textRight}
                        </Text>
                    </View>
                }

            </View>

        );

    }

}
const stylesBH2 = StyleSheetAdapt.create({
    progress0:{
        width:Theme.Font.fontSize_3,
        height:Theme.Font.fontSize_3
    },
    linearH:{
        // backgroundColor:'blue',
        borderRadius:Theme.Font.fontSize_3,
        flex:1,
        height:Theme.Font.fontSize_3,
        marginTop:2,
    },
    text:{
        fontSize:Theme.Font.fontSize_2,
    },
    frameStyle_1:{
        // backgroundColor:'yellow',
        // flex:1.5,
        alignItems:'center',
        justifyContent:'center',
        paddingRight:10,
        paddingLeft:10,
    },
    frameStyle_3:{
        // flex:1.5,
        paddingRight:10,
        paddingLeft:10,
        // backgroundColor:'yellow',
        alignItems:'center',
        justifyContent:'center',
    },
    frameStyle_3_textFrame:{
        flex:1,

    },
    frameStyle_2:{
        flex:1,
        // backgroundColor:'red',
        // flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
    },
    frameStyle_2_1:{
        flex:1,
        // backgroundColor:'red',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',

    },
    frameStyle:{
        flex:1,
        flexDirection:'row',
        // height:Theme.Font.fontSize_1_1,
        // height:40,
        alignItems:'center',
        justifyContent:'center',
        // backgroundColor:'yellow'
    },
});

/**
 * 水平渐变柱状图3 可有多条BarHorizontal2
 * **/
class BarHorizontal3 extends Component{

    //属性注释及类型,所有的属性对象都是句柄模式（类型时number），类似C语言中的指针
    static propTypes = {
        frameStyle:PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.object,
            PropTypes.array
        ]),//框样式
        frameBarStyle:PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.object,
            PropTypes.array
        ]),//条形进度框样式

        isShowTextLeft:PropTypes.bool,//是否显示左边文本 默认true 显示
        textLeft:PropTypes.oneOfType([
            PropTypes.string,//文本
            PropTypes.object,//ui
        ]),//左边文本
        textLeftStyle:PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.object,
            PropTypes.array
        ]),//左边文本样式

        textLeftProgressStyle:PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.object,
            PropTypes.array
        ]),//进程左边文本样式
        textRightProgressStyle:PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.object,
            PropTypes.array
        ]),//进程左边文本样式


        dataList:PropTypes.oneOfType([
            PropTypes.number,//所占比值0～1 默认是1
            /**
             * 成员：{
                 textRight:'',//进度对比条左边文本 null不显示
                 textLeft:'',//进度对比条右边边文本 null不显示
                progress:0,//所占比值0～1 默认是1
                colors1://,进度对比条colors1左边进度渐变色 可不传
                colors2://,进度对比条colors2右边进度渐变色 可不传
               }
             * **/
            PropTypes.object,
            PropTypes.array
        ])
    }

    /**
     * 设置默认属性
     * **/
    static defaultProps = {
        dataList:[],
        isShowTextLeft:true,
    }

    getColors(colors) {
        // console.info("colors:",colors);
        if(typeof (colors) == 'string')
        {
            colors = [colors,colors];
        }
        else if(colors.constructor == Array)
        {
            if(colors.length == 1){
                colors = [colors[0],colors[0]];
            }
        }

        return colors;
    }

    getPercentWidth(type){
        let {progress} = this.props;
        progress = progress > 1 ? 1 : progress;
        let flex = 7;
        switch (type)
        {
            case 0 :{
                flex = flex * progress;
                break;
            }
            case 1 :{
                flex = flex * (1 - progress);
                break;
            }
        }

        return {
            flex:flex
        }
    }

    getDataList(){
        let {dataList} = this.props;

        dataList = dataList?dataList:1;

        if(typeof (dataList) == 'number'){
            dataList = [{progress:dataList}];
        }
        else if(dataList.constructor != Array)
        {
            dataList = [dataList];
        }

        dataList.forEach((v,i,a)=>{
            if(v.colors1&&v.colors1.constructor !== Array) {
                v.colors1 = [v.colors1];
            }

            if(v.colors2&&v.colors2.constructor !== Array) {
                v.colors2 = [v.colors2];
            }
        });

        return dataList;
    }

    renderItem = (item,i)=>{
        const {textRightProgressStyle,textLeftProgressStyle} = this.props;

        return(
            <BarHorizontal2 key={i}
                            isShowTextLeft={item.textLeft&&true||false}
                            isShowTextRight={item.textRight&&true||false}
                            progress={item.progress}
                            textLeft={item.textLeft}
                            textRight={item.textRight}
                            textRightStyle={[stylesBH3.textRight,textRightProgressStyle,item.colors1?{color:item.colors1[0]}:{}]}
                            textLeftStyle={[stylesBH3.textLeft,textLeftProgressStyle]}
                            colors1={item.colors1}
                            colors2={item.colors2}/>
        );
    }

    /*start: { x: 0.3, y: 0.4 } 渐变是从 左侧30%， 上部 40% 开始
    end: { x: 0.7, y: 0.8 } 渐变是从 左侧70%， 上部 80% 结束*/
    render() {

        const {frameStyle,textLeftStyle,textLeft,isShowTextLeft,frameBarStyle} = this.props;

        const dataList = this.getDataList();

        return(

            <View style={[stylesBH3.frameStyle,frameStyle]}>
                {
                    isShowTextLeft&&<View style={stylesBH3.frameStyle_1}>
                        <Text style={[stylesBH3.text,textLeftStyle]}>
                            {textLeft}
                        </Text>
                    </View>
                }

                <View style={[stylesBH3.frameStyle_2,frameBarStyle]}>
                    {
                        dataList.map(this.renderItem)
                    }
                </View>

            </View>

        );

    }

}
const stylesBH3 = StyleSheetAdapt.create({
    linearH:{
        // backgroundColor:'blue',
        borderRadius:Theme.Font.fontSize_3,
        flex:1,
        height:Theme.Font.fontSize_3,
        marginTop:2,
    },
    text:{
        fontSize:Theme.Font.fontSize_1,
    },
    textLeft:{
        width:80,
        // backgroundColor:'red',
        textAlign:'center',
    },
    textRight:{
        width:80,
        // backgroundColor:'red',
    },
    frameStyle_1:{
        // backgroundColor:'yellow',
        // flex:1.5,
        alignItems:'center',
        justifyContent:'center',
        paddingRight:10,
        paddingLeft:10,
    },

    frameStyle_2:{
        flex:1,
        // backgroundColor:'red',
        // flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
    },
    frameStyle:{
        flex:1,
        flexDirection:'row',
        // height:Theme.Font.fontSize_1_1,
        // height:40,
        alignItems:'center',
        justifyContent:'center',
        // backgroundColor:'yellow'
    },
});

/**
 * 圆形渐变图
 * **/
class BarCircleGradient extends Component{

    forecolors = ['rgba(244, 206, 46, 1)', 'rgba(255, 107, 0, 1)'];

    //属性注释及类型,所有的属性对象都是句柄模式（类型时number），类似C语言中的指针
    static propTypes = {
        width:PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number
        ]),//宽度
        height:PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number
        ]),//高度

        /**
         * 'up':文字在上部,
         * 'inner'：文字在内部,默认是inner
         * 'down'：文字在下部
         * **/
        textPosion:PropTypes.string,

        colors:PropTypes.oneOfType([
            PropTypes.array,
            PropTypes.string
        ]),//结尾文字
    }

    /**
     * 设置默认属性
     * **/
    static defaultProps = {
        textPosion:'inner',
        // forecolors:['rgba(244, 206, 46, 1)', 'rgba(255, 107, 0, 1)'],
        colors:[Theme.Colors.backgroundColorBtn,Theme.Colors.themeColor],
        width:100,
        height:100,
    }

    constructor(props) {
        super(props);

        if(!Svg){
            console.info("请安装Svg画图组件","react-native-svg");
            Tools.toast("请安装组件 react-native-svg");
        }
    }

    getColors(colors) {

        if(colors == undefined){
            colors = this.colors;
        }
        else if(typeof (colors) == 'string')
        {
            colors = [colors,colors];
        }
        else if(colors.constructor == Array)
        {
            if(colors.length == 1){
                colors = [colors[0],colors[0]];
            }
            else if(colors.length == 0)
            {
                colors = this.colors;
            }
        }

        return colors;
    }

    getForecolors(colors) {

        if(colors == undefined){
            colors = this.forecolors;
        }
        else if(typeof (colors) == 'string')
        {
            colors = [colors,colors];
        }
        else if(colors.constructor == Array)
        {
            if(colors.length == 1){
                colors = [colors[0],colors[0]];
            }
            else if(colors.length == 0)
            {
                colors = this.forecolors;
            }
        }

        return colors;
    }

    render() {

        if(!Svg){
            return null;
        }

        let {colors,width,height} = this.props;

        colors = this.getColors(colors);
        // forecolors = this.getForecolors(forecolors);

        const ARTPath = new ART.Path()
            .moveTo(50,10)
            .arc(0,85,25)
        // .arc(0,-80,25)
        // .close();

        return(

            <Svg
                height={height}
                width={width}
            >
                <Defs>

                    <Defs>
                        <LinearGradientSvg id="color"
                                           x1="0"
                                           y1="0"
                                           x2="0"
                                           y2="100">
                            <Stop offset="0"
                                  stopColor={colors[0]}
                                  stopOpacity="1" />
                            <Stop offset="1"
                                  stopColor={colors[1]}
                                  stopOpacity="1" />
                        </LinearGradientSvg>
                    </Defs>
                </Defs>
                {<Circle cx={width/2}
                         cy={height/2}
                         r={width/2-10}
                         strokeWidth={10}
                         fill="none"
                         stroke="url(#color)" />
                    /*   <Circle cx={width/2}
                             cy={height/2}
                             r={width/2-10}
                             strokeWidth={10}
                             fill="none"
                             stroke="url(#color)" />*/}
                <ART.Surface width={100} height={100}>
                    <ART.Shape d={ARTPath}
                               stroke="#000000"
                        // fill="none"
                               strokeWidth={1} />
                </ART.Surface>

                {/*<Rect x="0" y="0" width="100" height="100" fill="black" />*/}
                {/*<Circle cx="50" cy="50" r="30" fill="yellow" />
                <Circle cx="40" cy="40" r="4" fill="black" />
                <Circle cx="60" cy="40" r="4" fill="black" />*/}
                {
                    /**
                     * <Path>的d
                     属性内定义了一系列的路径坐标以及绘制规则命令，上面的所有图形都可以通过Path绘制而成
                     M = 把绘制点移动到某个位置
                     L = 从当前绘制点画一条直线到某个坐标
                     H = 从当前绘制点沿着x轴水平画线
                     V = 从当前绘制点沿着y轴垂直画线
                     C = 从当前绘制点画一条曲线到某个坐标
                     S = 从当前绘制点画一条平滑的曲线到某个坐标
                     Q = 从当前绘制点画一条贝赛尔曲线到某个坐标
                     T = 从当前绘制点画一条平滑的贝赛尔曲线到某个坐标
                     A = 从当前绘制点画一条椭圆曲线到某个点
                     Z = 闭合当前路径
                     **/
                }
                {/* <Path d="M 50 50 A 10 10 0 0 0 60 60 "
                      strokeWidth={10}
                      fill="none"
                      stroke="url(#color)" />*/}

            </Svg>
        );

    }

}

/**
 * 圆形加载图 4圆 中间有显示文本（Native实现）
 * **/
class BarCircleChart extends Component{


    //属性注释及类型,所有的属性对象都是句柄模式（类型时number），类似C语言中的指针
    static propTypes = {
        /*
       //4圆进度显示Chart 中间提示进度数据 最外层时间进度，跨度1月最小单位；天
       option:{
                 title:PropTypes.string,//图表标题 中心
                 data1://进度1进度 小数
                 data2://进度2进度 小数
                 progress1Color://进度1颜色 默认主题色
                 progress2Color://进度2颜色 默认绿色
        };
        **/
        option:PropTypes.object,//图表配置数据
        width:PropTypes.number,//内容宽度
        height:PropTypes.number,//内容高度
    }

    /**
     * 设置默认属性
     * **/
    static defaultProps = {
        height:300,
        width:Tools.screen.width,
    }

    constructor(props) {
        super(props);

        if(!Svg){
            console.info("请安装Svg画图组件","react-native-svg");
            Tools.toast("请安装组件 react-native-svg");
        }

        if(!VictoryPie){
            console.info("请安装victory图表组件","victory-native");
            Tools.toast("请安装组件 victory-native");
        }
    }

    /**
     * 获取图表配置项
     * **/
    getOptions(){
        let {option} = this.props;

        const {data1, data2,title,progress1Color,progress2Color} = option;
        option.progress1Color = !progress1Color&&Theme.Colors.themeColor||progress1Color;
        option.progress2Color = !progress2Color&&Theme.Colors.barGreen||progress2Color;
        option.data1 = 1000 * data1;
        option.data1_1 = 1000 - option.data1;


        /**
         * data1完成进度比是小数
         * data2完成进度比是小数
         * **/
        option.per = parseInt(data1 * 1000) / 10 + '%';

        /**
         * data2完成进度比是小数
         * **/
        if(data2 == undefined)
        {
            let timeObj = Tools.getTimeByRank((new Date()).getTime(),1);
            let dN = (new Date(timeObj.time2)).getDate();
            let d1 = (new Date()).getDate();
            option.data2 = d1;
            option.data2_1 = dN - d1;
        }
        else
        {
            option.data2 = 1000 * data2;
            option.data2_1 = 1000 - option.data2;
        }

        return option;
    }

    render() {

        if(!Svg || !VictoryPie){
            return null;
        }

        this.getOptions();

        const {colors,width,height,option} = this.props;

        const center = {
            x:width / 2,
            y:height / 2,
            r:(width > height ? height : width) / 2,
            fontSize:Theme.Font.fontSize_2
        };

        // alert(JSON.stringify(center));

        return(

            <Svg width={width}
                 height={height}>
                <Circle cx={center.x}
                        cy={center.y}
                        r={center.r}
                        fill={Theme.Colors.barGray1}/>
                <VictoryPie origin={{x:center.x,y:center.y}}
                            colorScale={[
                                option.progress2Color,
                                Theme.Colors.foregroundColor]}
                            standalone={false}
                            width={width}
                            height={height}
                            radius={center.r - 5}
                            data={[
                                {
                                    y:option.data2,
                                    x:null
                                },
                                {
                                    y:option.data2_1,
                                    x:null
                                }
                            ]}
                />
                <VictoryPie origin={{x:center.x,y:center.y}}
                            colorScale={[
                                option.progress1Color,
                                Theme.Colors.barGray1
                            ]}
                            standalone={false}
                            width={width}
                            height={height}
                            radius={center.r - 10}
                            data={[
                                {
                                    y:option.data1,
                                    x:null
                                },
                                {
                                    y:option.data1_1,
                                    x:null
                                }
                            ]}
                />

                <Circle cx={center.x}
                        cy={center.y}
                        r={center.r - 25}
                        fill={Theme.Colors.foregroundColor}/>

                <SvgArt.Text x={
                    center.x
                    - (center.r - 25)
                    + center.fontSize / 2
                    + 2
                }
                             y={center.y}
                             dx={"0 -5"}
                             dy={-center.fontSize / 2}
                             fill={Theme.Colors.themeColor}
                             fontSize={center.fontSize}
                             fontWeight={"bold"}>
                    <TSpan>
                        {
                            option.title
                        }
                    </TSpan>

                    <TSpan dy={center.fontSize + 5}
                           dx={
                               "-" + (center.fontSize
                                   + (
                                       option.per.length > 4
                                           ? 10
                                           : 0
                                   )
                               )
                           }>
                        {
                            option.per
                        }
                    </TSpan>

                </SvgArt.Text>

            </Svg>


        );

    }
}
const stylesChart = StyleSheetAdapt.create({
    textFrame:{
        marginTop:100,
        marginLeft:100,
    },
});

/**
 * echarts图表 图形类型：柱状图，饼图，饼图
 **/
class Chart extends Component{

    /**
     * 图形类型
     * **/
    static type = {
        pie:'pie',//饼图
        pieHome:'pieHome',//饼图
        barHome:'barHome',//柱状图
    };

    //属性注释及类型,所有的属性对象都是句柄模式（类型时number），类似C语言中的指针
    static propTypes = {
        type:PropTypes.string,//图表类型
        option:PropTypes.object,//图表配置数据
        /*
        //4圆进度显示Chart 中间提示进度数据 最外层时间进度，跨度1月最小单位；天
        pieHome=> option:{
         title:PropTypes.string,//图表标题 中心
         data1://进度1进度
         data2://进度2进度
         progress1Color://进度1颜色 默认主题色
         progress2Color://进度2颜色 默认绿色
         };

        "pie/barHome"=>option:{
         title:PropTypes.string,//图表标题 中心
         seriesData:[
         {
         name:PropTypes.string,//名字
         value:PropTypes.string,//值
         }
         ],//数组
         isDoubleCircle:PropTypes.bool,//是否双圆，默认是单圆，没有内圆
         name:PropTypes.string,// 列的key名，默认是item
         },//图表对象参数*/
    }

    /**
     * 设置默认属性
     * **/
    static defaultProps = {
        height:300,
        width:Tools.screen.width,
        type:'pie',
    }

    /**
     * 获取图表配置项
     * @param type sting,//图形类型
     * **/
    getOptions(type){
        let option;
        switch (type)
        {
            case Chart.type.pie : {
                option = {
                    title : {
                        text: this.props.option.title,
                        subtext: '',
                        x:'center',
                        textStyle:{
                            fontSize:StyleSheetAdapt.getWidth(28)
                        }
                    },
                    tooltip : {
                        trigger: 'item',
                        formatter: "{a}  {b} : {c} ({d}%)"
                    },
                    legend: {
                        type: 'scroll',
                        orient: 'vertical',
                        // right: 10,
                        left:StyleSheetAdapt.getWidth(10),
                        top: StyleSheetAdapt.getHeight(20),
                        bottom: StyleSheetAdapt.getHeight(20),
                        data: this.props.option.seriesData,//显示计算项目

                        // selected: this.data.selected//是否选中 {name:true/false},seriesData数组子元素的name
                    },
                    series : [
                        {
                            name:'',
                            type:'pie',
                            legendHoverLink: false,
                            hoverAnimation: false,
                            clickable : true,
                            // calculable : true,
                            radius: ['0', '0'],
                            label: {
                                normal: {
                                    position: 'center',
                                    fontSize:StyleSheetAdapt.getWidth(28)//28
                                }
                            },
                            data:this.props.option.isDoubleCircle == null
                            || !this.props.option.isDoubleCircle
                                ? null
                                : [{value:0,name:this.props.option.title}]
                        },
                        {
                            name: this.props.option.name == null
                                ? 'item'
                                : this.props.option.name,
                            type: 'pie',
                            radius : this.props.option.isDoubleCircle == null
                            || !this.props.option.isDoubleCircle
                                ? '75%' : ['36%','75%'],//半径，可以是数组【'36%'，'75%'】内外圆
                            center: ['50%', '50%'],//中心坐标
                            data: this.props.option.seriesData,
                            itemStyle: {
                                emphasis: {
                                    shadowBlur: StyleSheetAdapt.getWidth(10),
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            },

                        }
                    ]
                };
                break;
            }

            case Chart.type.barHome : {
                let {data, colors, titlesX, unit} = this.props.option;

                titlesX = titlesX == undefined ? ['15号','20号','25号'] : titlesX;
                colors = colors == undefined ? [Theme.Colors.themeColor] : colors;

                if(Tools.platformType)
                {
                    var seriesData = {
                        zlevel:999,
                        type:'bar',
                        data:[],
                        barWidth:StyleSheetAdapt.getWidth(15),
                        markPoint : {
                            data : [],
                            label: {
                                fontSize:StyleSheetAdapt.getWidth(10),
                                // position:'inside',
                                // shadowOffsetX:50,
                                // shadowOffsetY:50
                            },
                            // symbolSize:[250,60],
                            symbolSize:[0,StyleSheetAdapt.getWidth(20)],
                            symbolKeepAspect:true,
                        },
                    };

                    seriesData.data = data;
                    seriesData.itemStyle = {
                        barBorderRadius:[
                            StyleSheetAdapt.getWidth(20),
                            StyleSheetAdapt.getWidth(20), 0, 0],
                    };

                    data.forEach(function (v,i,a) {
                        seriesData.markPoint.data.push(
                            {name : titlesX[i], value : v + unit, xAxis: titlesX[i], yAxis: v}
                        );
                    });
                    option = {
                        color: colors,
                        title : {
                            text: '',
                            subtext: '',
                            //x:'center'
                        },
                        tooltip : {
                            trigger: 'axis'
                        },
                        legend: {
                            //data:['蒸发量','降水量','值']
                        },
                        toolbox: {
                            show : true,
                            /* feature : {
                             dataView : {show: true, readOnly: false},
                             magicType : {show: true, type: ['line', 'bar']},
                             restore : {show: true},
                             saveAsImage : {show: true}
                             }*/
                        },
                        calculable : true,
                        xAxis : [
                            {
                                type : 'category',
                                data : titlesX,
                                axisLine:{
                                    lineStyle:{
                                        color:Theme.Colors.themeColor,
                                    },
                                },
                                axisTick:{
                                    show:false,
                                },
                                axisLabel: {
                                    fontSize: StyleSheetAdapt.getWidth(10),
                                    color:Theme.Colors.themeColor,
                                    margin:StyleSheetAdapt.getHeight(5),
                                    // fontFamily:'Microsoft YaHei',
                                    fontWeight:'bold',
                                }
                            }
                        ],
                        yAxis : [
                            {
                                show:false,
                                type : 'value',
                            }
                        ],
                        series : [
                            seriesData
                            /*  {
                             name:'运营目标',
                             type:'bar',
                             data:[2.6],
                             itemStyle:{
                             color:colors[1]
                             },
                             markPoint : {
                             data : [
                             {name : 'show', value : '75%', xAxis: '', yAxis: 2.6},
                             ]
                             },
                             // barGap:'0%',
                             },
                             {
                             name:'实际完成',
                             type:'bar',
                             data:[1.8],
                             itemStyle:{
                             color:colors[2]
                             },
                             markPoint : {
                             data : [
                             {name : 'show', value : '75%', xAxis: '', yAxis: 1.8},
                             ]
                             },
                             // barGap:'0%',
                             }*/
                        ]
                    };
                }
                else
                {
                    var seriesData = {
                        zlevel:999,
                        type:'bar',
                        data:[],
                        barWidth:StyleSheetAdapt.getWidth(15),
                        markPoint : {
                            data : [],
                            label: {
                                fontSize:StyleSheetAdapt.getWidth(2),
                                // position:'inside',
                                // shadowOffsetX:50,
                                // shadowOffsetY:50
                            },
                            // symbolSize:[250,60],
                            symbolSize:[0,StyleSheetAdapt.getWidth(20)],
                            symbolKeepAspect:true,
                        },
                    };

                    seriesData.data = data;
                    seriesData.itemStyle = {
                        barBorderRadius:[StyleSheetAdapt.getWidth(20),
                            StyleSheetAdapt.getWidth(20), 0, 0],
                    };

                    data.forEach(function (v,i,a) {
                        seriesData.markPoint.data.push(
                            {name : titlesX[i], value : v + unit, xAxis: titlesX[i], yAxis: v}
                        );
                    });
                    option = {
                        color: colors,
                        title : {
                            text: '',
                            subtext: '',
                            //x:'center'
                        },
                        tooltip : {
                            trigger: 'axis'
                        },
                        legend: {
                            //data:['蒸发量','降水量','值']
                        },
                        toolbox: {
                            show : true,
                            /* feature : {
                             dataView : {show: true, readOnly: false},
                             magicType : {show: true, type: ['line', 'bar']},
                             restore : {show: true},
                             saveAsImage : {show: true}
                             }*/
                        },
                        calculable : true,
                        xAxis : [
                            {
                                type : 'category',
                                data : titlesX,
                                axisLine:{
                                    lineStyle:{
                                        color:Theme.Colors.themeColor,
                                    },
                                },
                                axisTick:{
                                    show:false,
                                },
                                axisLabel: {
                                    fontSize: StyleSheetAdapt.getWidth(5),
                                    color:Theme.Colors.themeColor,
                                    margin:StyleSheetAdapt.getHeight(5),
                                    // fontFamily:'Microsoft YaHei',
                                    fontWeight:'bold',
                                }
                            }
                        ],
                        yAxis : [
                            {
                                show:false,
                                type : 'value',
                            }
                        ],
                        series : [
                            seriesData
                            /*  {
                             name:'运营目标',
                             type:'bar',
                             data:[2.6],
                             itemStyle:{
                             color:colors[1]
                             },
                             markPoint : {
                             data : [
                             {name : 'show', value : '75%', xAxis: '', yAxis: 2.6},
                             ]
                             },
                             // barGap:'0%',
                             },
                             {
                             name:'实际完成',
                             type:'bar',
                             data:[1.8],
                             itemStyle:{
                             color:colors[2]
                             },
                             markPoint : {
                             data : [
                             {name : 'show', value : '75%', xAxis: '', yAxis: 1.8},
                             ]
                             },
                             // barGap:'0%',
                             }*/
                        ]
                    };
                }


                break;
            }

            case Chart.type.pieHome : {
                let {data1, data2,title,progress1Color,progress2Color} = this.props.option;
                progress1Color = !progress1Color&&Theme.Colors.themeColor||progress1Color;
                progress2Color = !progress2Color&&Theme.Colors.barGreen||progress2Color;

                /**
                 * data1完成进度比是小数
                 * data2完成进度比是小数
                 * **/
                let per = parseInt(data1 * 1000) / 10 + '%';
                data1 = [
                    {value:1000 * data1, name:'完成进度',itemStyle:{
                            color:progress1Color
                        }},
                    {value:1000 - 1000 * data1, name:'目标进度',itemStyle:{
                            color:Theme.Colors.barGray1
                        }}
                ];

                /**
                 * data2完成进度比是小数
                 * **/
                if(data2 == undefined)
                {
                    let timeObj = Tools.getTimeByRank((new Date()).getTime(),1);
                    let dN = (new Date(timeObj.time2)).getDate();
                    let d1 = (new Date()).getDate();
                    // alert("N:"+ dN + "   1:" + d1)
                    data2 = [
                        {value:d1, name:'完成进度',itemStyle:{
                                color:progress2Color
                            }},
                        {value:dN - d1, name:'目标进度',itemStyle:{
                                color:Theme.Colors.foregroundColor
                            }}
                    ];
                }
                else
                {
                    data2 = [
                        {value:1000 * data2, name:'完成进度',itemStyle:{
                                color:progress2Color
                            }},
                        {value:1000 - 1000 * data2, name:'目标进度',itemStyle:{
                                color:Theme.Colors.foregroundColor
                            }}
                    ];
                }

                option = {
                    title: {
                        text:per,
                        left:'center',
                        top:'50%',
                        // padding:[0,0,0,10],
                        align:'center',
                        textStyle:{
                            color: progress1Color,
                            fontSize:StyleSheetAdapt.getWidth(15),
                            // align:'center',
                            fontWeight:'bold',
                        }
                    },
                    legend: {
                        selectedMode:true,
                        formatter:title,
                        /*formatter: function(name) {
                            return '业绩';
                        },*/
                        data: [data1[0].name],
                        // data: ['高等教育学'],
                        // itemGap: 50,
                        left: 'center',
                        // top: 'center',
                        top: '30%',
                        icon: 'none',
                        align:'center',
                        textStyle: {
                            color: progress1Color,
                            fontSize: StyleSheetAdapt.getWidth(20) + '',
                            fontWeight:'bold',
                            // rich: rich
                        },
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{b}: {c} ({d}%)"
                    },
                    /*legend: {
                     orient: 'vertical',
                     x: 'left',
                     data:['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
                     },*/
                    series: [
                        /* {
                         name:'访问来源',
                         type:'pie',
                         radius: ['0%', '0%'],
                         avoidLabelOverlap: false,
                         label: {
                         normal: {
                         show: true,
                         position: 'center'
                         },
                         emphasis: {
                         show: false,
                         textStyle: {
                         fontSize: '30',
                         fontWeight: 'bold'
                         }
                         }
                         },
                         labelLine: {
                         normal: {
                         show: false
                         }
                         },
                         data:[
                         {value:335, name:'直接\n访问'},
                         // {value:335, name:'访问'}
                         ]
                         },*/
                        {
                            name:data1[0].name,
                            type:'pie',
                            radius: ['50%', '70%'],
                            avoidLabelOverlap: false,
                            label: {
                                normal: {
                                    show: false,
                                    position: 'center'
                                },
                                emphasis: {
                                    show: false,
                                    textStyle: {
                                        fontSize: StyleSheetAdapt.getWidth(30) + '',
                                        fontWeight: 'bold'
                                    }
                                }
                            },
                            labelLine: {
                                normal: {
                                    show: false
                                }
                            },
                            data:data1
                        },
                        {
                            name:data2[0].name,
                            type:'pie',
                            radius: ['70%', '80%'],
                            avoidLabelOverlap: false,
                            label: {
                                normal: {
                                    show: false,
                                    position: 'center'
                                },
                                emphasis: {
                                    show: false,
                                    textStyle: {
                                        fontSize: StyleSheetAdapt.getWidth(30) + '',
                                        fontWeight: 'bold'
                                    }
                                }
                            },
                            labelLine: {
                                normal: {
                                    show: false
                                }
                            },
                            data:data2
                        },
                        {
                            name:data2[0].name,
                            type:'pie',
                            radius: ['80%', '90%'],
                            avoidLabelOverlap: false,
                            label: {
                                normal: {
                                    show: false,
                                    position: 'center'
                                },
                                emphasis: {
                                    show: false,
                                    textStyle: {
                                        fontSize: StyleSheetAdapt.getWidth(30) + '',
                                        fontWeight: 'bold'
                                    }
                                }
                            },
                            labelLine: {
                                normal: {
                                    show: false
                                }
                            },
                            data:[
                                {value:335, name:'完成进度',itemStyle:{
                                        color:Theme.Colors.barGray2
                                    }}
                            ]
                        }
                    ]
                };

            }
        }

        return option;
    }

    render() {

        return(

            <Echarts {...this.props}
                     option={this.getOptions(this.props.type)}
                     height={StyleSheetAdapt.getHeight(this.props.height)}
                     width={this.props.width == Tools.screen.width
                         ? Tools.screen.width
                         : StyleSheetAdapt.getWidth(this.props.width)}/>

        );

    }
}

/**
 * 柱状图（Native实现）
 * ***/
class BarCharts extends Component{

    //属性注释及类型,所有的属性对象都是句柄模式（类型时number），类似C语言中的指针
    static propTypes = {
        frameStyle:PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.object,
            PropTypes.array
        ]),//框样式
        xAxis:PropTypes.array,//x轴显示标签
        yAxis:PropTypes.array,//y轴显示标签
        yLabel:PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.string
        ]),//y轴标签文本
        barLegend:PropTypes.array,//柱状图列
        isShowBarLegend:PropTypes.bool,//是否显示柱状图列 默认true 显示
        /**
         * 成员：[
         {
              x:int,//x轴值  可不传自动计算
              y:int,//y轴值 必传
         },
         ....
         ]
         * **/
        dataList:PropTypes.array,//柱条数组
        colorList:PropTypes.array,//颜色数组
    }

    /**
     * 设置默认属性
     * **/
    static defaultProps = {
        yLabel:null,
        isShowBarLegend:true,
        barLegend:[],
        dataList:[],
        colorList:[],
        xAxis:[],
    }

    constructor(props) {
        super(props);

        if(!VictoryChart){
            console.info("请安装victory图表组件","victory-native");
            Tools.toast("请安装组件 victory-native");
        }
    }

    getRandomColor(){
        return "#" + ( "00000"
            + ( (Math.random() * 16777215 + 0.5 ) >> 0)
                .toString(16)).slice(-6);
    }

    renderLegend = (item,i)=>{
        const {colorList} = this.props;
        let color;
        if(i >= colorList.length){
            color = colorList[(i % colorList.length)];
        }
        else {
            color = colorList[i];
        }
        return(
            <View key={i}
                  style={stylesBarCharts.labelXFrame_1}>
                <View style={[stylesBarCharts.labelXFrame_1_1,{backgroundColor:color}]}>

                </View>
                <View>
                    <Text style={stylesBarCharts.label}>
                        {item}
                    </Text>
                </View>
            </View>
        );
    }

    renderBarItem = (item,i)=>{
        return(
            <VictoryBar key={i}
                        data={item}
                // width={60}
                // style={{
                //     data: {
                //         width:StyleSheetAdapt.getWidth(20),
                //     }
                // }}
            />
        );
    }

    getColorList(){
        let {colorList,dataList} = this.props;
        let len = 0;

        dataList.forEach((v,i,a)=>{
            if(v.length > len){
                len = v.length;
            }

            v.forEach((v1,i1,a1)=>{
                if(!v1.x){
                    v1.x = i1 + 1;
                }
            });

        });

        if(colorList.length == 0){

            for(let i = 0; i < len; i++){
                colorList.push(this.getRandomColor());
            }

        }
    }

    render() {
        if(!VictoryChart){
            return null;
        }

        this.getColorList();

        const {frameStyle,yLabel,isShowBarLegend,barLegend,dataList,
            xAxis,colorList} = this.props;

        // console.info();
        //  console.info("dataList:",dataList);

        return(

            <View style={[stylesBarCharts.titleFrame1,frameStyle]}>
                <View style={stylesBarCharts.labelYFrame}>
                    <Text style={stylesBarCharts.label}>
                        {yLabel}
                    </Text>
                </View>

                {
                    isShowBarLegend
                    && <View style={stylesBarCharts.labelXFrame}>

                        {
                            barLegend.map(this.renderLegend)
                        }

                    </View>
                }

                <VictoryChart theme={VictoryTheme.material}>
                    <VictoryGroup offset={StyleSheetAdapt.getWidth(25)}
                                  categories={{x:xAxis}}
                                  colorScale={colorList}>

                        {
                            dataList.map(this.renderBarItem)
                        }

                    </VictoryGroup>
                </VictoryChart>

            </View>
        );

    }
}
const stylesBarCharts = StyleSheetAdapt.create({
    labelXFrame_1_1:{
        width:30,
        height:Theme.Font.fontSize_2,
        backgroundColor:"red",
        justifyContent:'center',
        alignItems:'center',
        marginRight:2,
        marginLeft:10
    },
    labelXFrame_1:{
        flexDirection:'row',

    },
    labelXFrame:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        // width:500,
        // backgroundColor:'blue',
    },
    labelYFrame:{
        position:'absolute',
        marginTop:35,
        marginLeft:5,
    },
    label:{
        fontSize:Theme.Font.fontSize_2,
    },

    titleFrame1:{
        flex:1,
        marginTop:10,
        backgroundColor:Theme.Colors.themeColor1,
        paddingTop:10,
        paddingBottom:10,
    },
});

/**
 * Charts 图表集合
 **/
const Charts = {
    get BarHorizontal() {
        return BarHorizontal;
    },
    get BarHorizontal2() {
        return BarHorizontal2;
    },
    get BarHorizontal3() {
        return BarHorizontal3;
    },
    get Chart() {
        return Chart;
    },
    get BarCircleGradient() {
        return BarCircleGradient;
    },
    get BarCharts() {
        return BarCharts;
    },
    get BarCircleChart() {
        return BarCircleChart;
    },
};

module.exports = Charts;