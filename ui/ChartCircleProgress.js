/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow TextInput自动提示输入
 */

import React, {Component} from 'react';
import PropTypes  from 'prop-types';
import {
    View,
    Text,
} from 'react-native';
import {
    StyleSheetAdapt,
    Theme,
    Tools,
} from "./../api/api";
import {BarCircleChart} from './Charts';
import {TitleBlockList} from './TitleBlockList';


/**
 * 4圆进度显示Chart 中间提示进度数据 最外层时间进度，跨度1月最小单位；天 (主页业绩进度例子，左边圆圈进度)
 * **/
export class ChartCircleProgress extends Component {

    //属性注释及类型,所有的属性对象都是句柄模式（类型时number），类似C语言中的指针
    static propTypes = {
        frameStyle:PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.object,
            PropTypes.array
        ]),//框样式

        titleCenter:PropTypes.string,//图表中心圆提示
        title1:PropTypes.string,//头部提示1
        title1ProgressColor:PropTypes.string,//提示1进度颜色
        title1Progress:PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number
        ]),//圆形图表进度
        title2Progress:PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number
        ]),//时间进度
        title2:PropTypes.string,//头部提示2
        title2ProgressColor:PropTypes.string,//提示2进度颜色

        /**
         成员：{
          textTop:PropTypes.string,//按钮文字 上边
          textDown:PropTypes.string,//按钮文字 下边
          textCenter:PropTypes.string,//按钮文字 中间
          textRight:PropTypes.string,//按钮文字 右边
          color:PropTypes.string,//textCenter的文本颜色，竖杠颜色
          }
         * **/
        titleBlockList:PropTypes.array,
    }

    /**
     * 设置默认属性
     * **/
    static defaultProps = {
        title1ProgressColor:Theme.Colors.themeColor,
        title2ProgressColor:Theme.Colors.barGreen,
        titleBlockList:undefined,
    }

    constructor(props) {
        super(props);

        this.state = {
            timeout:true,
            isExe:true,
            width:StyleSheetAdapt.getWidth((Tools.platformType
                ? 240
                : 400)),
            height:StyleSheetAdapt.getHeight((Tools.platformType
                ? 120
                : 180)),
        }

    }

    measure(){

        if(this.state.isExe){
            this.state.isExe = false;
            if(this.chartFrame){
                this.chartFrame.measure((fx, fy, width, height, px, py) => {
                    /**
                     * console.log("width:" + width); //控件宽
                     console.log("height:" + height);//控件高
                     console.log("fx:" + fx); //距离父控件左端 x的偏移量
                     console.log("fy:" + fy); //距离父控件上端 y的偏移量
                     console.log("px:" + px); //距离屏幕左端 x的偏移量
                     console.log("py:" + py); //距离屏幕上端 y的偏移量
                     * **/
                    let m = {fx:fx,fy:fy,px: px, py: py, w: width, h: height};
                    // alert(JSON.stringify(m))
                    // callback && callback();

                    this.setState({
                        width:width,
                        height:height - 20
                    });

                    // resolve(m);
                });
            }
            else {
                // reject({status:null});
            }
        }
        else
        {
            if(this.state.timeout){
                this.state.timeout = false;
                setTimeout(()=>{
                    this.state.isExe = true;
                    this.state.timeout = true;
                },1000);
            }

            // reject({status:null});
        }
    }

    render() {

        const {frameStyle,title1Progress,title2Progress,titleCenter,title1,title2,
            title1ProgressColor,title2ProgressColor,titleBlockList} = this.props;

        const {height,width} = this.state;

        // this.measure();
        // alert(JSON.stringify(this.state))

        return(
            <View style={[styles.titlesInfoFrame1_2_2_1,frameStyle]}>
                <View style={styles.titlesInfoFrame1_2_2_1_0}>
                    <View style={styles.titlesInfoFrame1_2_2_1_1}>
                        <View style={styles.titlesInfoFrame1_2_2_1_1}>
                            <View style={[
                                styles.titlesInfoFrame1_2_2_1_1_1_1,
                                {backgroundColor:title1ProgressColor}
                            ]}></View>
                            <Text style={styles.titlesInfoFrame1_2_2_1_1_1_text}>
                                {title1}
                            </Text>
                        </View>

                        <View style={styles.titlesInfoFrame1_2_2_1_1}>
                            <View style={[
                                styles.titlesInfoFrame1_2_2_1_1_1_2,
                                {backgroundColor:title2ProgressColor}
                            ]}></View>
                            <Text style={styles.titlesInfoFrame1_2_2_1_1_1_text}>
                                {title2}
                            </Text>
                        </View>
                    </View>

                    <View style={styles.titlesInfoFrame1_2_2_1_2}
                          ref={(com=>this.chartFrame=com)}>
                        <BarCircleChart height={height}
                                        width={width}
                                        option={{
                                            data1:title1Progress,
                                            data2:title2Progress,
                                            title:titleCenter,
                                            progress1Color:title1ProgressColor,
                                            progress2Color:title2ProgressColor
                                        }}/>
                    </View>
                </View>

                {
                    titleBlockList&&<View>
                        <TitleBlockList dataList={titleBlockList}
                                        itemRowFrame={styles.itemRowFrame}
                                        frameStyle={styles.titleBlockFrame}
                                        textCenterStyle={styles.textCenterStyle}
                                        textStyle={styles.textStyle}/>


                    </View>
                }

            </View>
        );


    }
}

const styles = StyleSheetAdapt.create({
    titlesInfoFrame1_2_2_1_0:{
        flex:1,
        marginTop:5,
    },

    itemRowFrame:{
        backgroundColor:Theme.Colors.transparent,
    },
    titleBlockFrame:{
        flexDirection:'column',
        paddingTop:15,
        paddingBottom:15,
        alignItems:'flex-start',
    },

    textCenterStyle:{
        fontSize:Theme.Font.fontSize1,
    },
    textStyle:{
        fontSize:Theme.Font.fontSize_2
    },
    titlesInfoFrame1_2_2:{
        flexDirection:'row',
        height:140,
    },
    titlesInfoFrame1_2_2_1:{
        flex:1,
        borderRightWidth:1,
        borderRightColor:Theme.Colors.themeColor,
        flexDirection:'row',
    },
    titlesInfoFrame1_2_2_1_1:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        flex:1,
        height:Theme.Font.fontSize_1_1,
    },
    titlesInfoFrame1_2_2_1_2:{
        marginTop:5,
        paddingTop:10,
        paddingBottom:10,
        alignItems:'center',
        justifyContent:'center',
    },
    titlesInfoFrame1_2_2_1_1_1:{

    },
    titlesInfoFrame1_2_2_1_1_1_1:{
        backgroundColor:Theme.Colors.themeColor,
        width:Theme.Font.fontSize_2,
        height:Theme.Font.fontSize_2 + "dw",
        marginLeft:10,
    },
    titlesInfoFrame1_2_2_1_1_1_2:{
        backgroundColor:Theme.Colors.barGreen,
        width:Theme.Font.fontSize_2,
        height:Theme.Font.fontSize_2 + "dw",
        marginLeft:10,
    },
    titlesInfoFrame1_2_2_1_1_1_text:{
        fontSize:Theme.Font.fontSize_2,
        marginLeft:2,
        flexDirection:'column'
    },
});