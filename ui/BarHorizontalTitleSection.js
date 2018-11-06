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
import {BarHorizontal3} from './Charts';


/**
 * 条形进度块，上部有对比条提示，左边有对比的title，主体是对比条若干
 * **/
export class BarHorizontalTitleSection extends Component {

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

        /**
         * {
             titleList:[{
                title:''，//提示文本
                color://,进度对比条color颜色 默认灰色

             }]//上部提示列

             sectionList:[//分块对比进度进度列
               {
                 title:'',//左边提示文本 无不显示
                 progressList:[//对比进度列
                 {
                    textRight:'',//进度对比条左边文本 null不显示
                    textLeft:'',//进度对比条右边边文本 null不显示
                    progress:0,//所占比值0～1 默认是1
                 }
                 ]
               }]

            }
         * **/
        options:PropTypes.object,
        textLeftProgressStyle:PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.object,
            PropTypes.array
        ]),//进程左边文本样式
        textRightProgressStyle:PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.object,
            PropTypes.array
        ]),//进程右边文本样式

    }

    /**
     * 设置默认属性
     * **/
    static defaultProps = {
        options:{
            titleList:[],
            sectionList:[]
        },
    }

    getOptios(){
        let {options} = this.props;
        if(!options.sectionList){
            options.sectionList = [];
        }
        options.sectionList
            .forEach((v1,i1,a1)=>{
                if(!v1.progressList){
                    v1.progressList = [];
                }

                options.titleList
                    ? v1.progressList.forEach((v2,i2,a2)=>{
                        v2.colors1 = options.titleList[i2].color
                            ? [options.titleList[i2].color]
                            : options.titleList[i2].color;
                    })
                    : null;
            });

        return options;
    }

    renderHeader = (item,i)=>{
        return(
            <View key={i}
                  style={styles.titlesInfoFrame1_2_2_2_1_2_1}>
                <Text style={styles.titlesInfoFrame1_2_2_1_1_1_text}>
                    {item.title}
                </Text>
                <View style={[
                    styles.titlesInfoFrame1_2_2_1_1_1_1,
                    {backgroundColor:item.color||Theme.Colors.minorColor}
                ]}></View>

            </View>
        );
    }

    renderItem = (item,i)=>{
        const {textRightProgressStyle,textLeftProgressStyle,frameBarStyle} = this.props;

        return(
            <BarHorizontal3 key={i}
                            frameStyle={[styles.frameStyleH,!i?{}:styles.frameStyleHBorder]}
                            frameBarStyle={frameBarStyle}
                            isShowTextLeft={item.title&&true||false}
                            textLeft={item.title}
                            textLeftProgressStyle={textLeftProgressStyle}
                            textRightProgressStyle={textRightProgressStyle}
                            dataList={item.progressList}/>
        );
    }

    render() {

        const {frameStyle} = this.props;

        const options = this.getOptios();

        return(
            <View style={[styles.titlesInfoFrame1_2_2_2,frameStyle]}>

                {
                    options.titleList&&<View style={styles.titlesInfoFrame1_2_2_2_1}>
                        <View style={styles.titlesInfoFrame1_2_2_2_1_1}>

                        </View>

                        <View style={styles.titlesInfoFrame1_2_2_2_1_2}>
                            {
                                options.titleList.map(this.renderHeader)
                            }
                        </View>
                    </View>
                }

                {
                    options.sectionList.map(this.renderItem)
                }


            </View>
        );


    }
}

const styles = StyleSheetAdapt.create({
    frameStyleHBorder:{
        borderTopWidth:Theme.Border.borderWidth,
        borderTopColor:Theme.Colors.themeColor,
    },
    frameStyleH:{
        paddingTop:5,
        paddingBottom:5,
    },
    titlesInfoFrame1_2_2_2:{
        flex:2,
    },
    titlesInfoFrame1_2_2_2_1:{
        // flex:1,
        flexDirection:'row',
    },
    titlesInfoFrame1_2_2_2_2:{
        flex:1,
        flexDirection:'row',
        // alignItems:'center',
        // justifyContent:'center',
    },
    titlesInfoFrame1_2_2_2_3:{
        flex:1,
        flexDirection:'row',
    },
    titlesInfoFrame1_2_2_2_1_1:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
    },
    titlesInfoFrame1_2_2_2_1_1_1:{
        marginTop:30,
    },
    titlesInfoFrame1_2_2_2_1_1_text:{
        fontSize:Theme.Font.fontSize_1,
    },
    titlesInfoFrame1_2_2_2_1_2:{
        // backgroundColor:'yellow',
        alignItems:'center',
        // justifyContent:'center',
        flexDirection:'row',
        flex:3,
    },
    titlesInfoFrame1_2_2_2_1_3:{
        // marginTop:-20,
    },
    titlesInfoFrame1_2_2_2_1_2_1:{
        flex:1,
        alignItems:'center',
        flexDirection:'row',
        // justifyContent:'center',
    },

    titlesInfoFrame1_2_2_1_1_1_text:{
        fontSize:Theme.Font.fontSize_2,
        marginLeft:2,
        flexDirection:'column'
    },
    titlesInfoFrame1_2_2_1_1_1_1:{
        backgroundColor:Theme.Colors.themeColor,
        width:Theme.Font.fontSize_2,
        height:Theme.Font.fontSize_2 + "dw",
        marginLeft:3,
    },
    titlesInfoFrame1_2_2_1_1_1_2:{
        backgroundColor:Theme.Colors.barGreen,
        width:Theme.Font.fontSize_2,
        height:Theme.Font.fontSize_2 + "dw",
        marginLeft:10,
    },
});