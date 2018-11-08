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
    TouchableOpacity,
} from 'react-native';
import {
    StyleSheetAdapt,
    Theme,
} from "./../api/api";
import {ItemRowTitle} from "./ItemRowTitle";
import {ButtonImage} from "./ButtonImage";
import {ItemRowBuyCar} from "./ItemRowBuyCar";
import {Tools} from "../api/Tools";
import {WebViewCus} from "./WebViewCus";
import {TextDoubleIcon} from "./TextDoubleIcon";

import IamgeBelowIcon from 'lib-images-zy/belowIcon.png';

/**
 * 具有ItemRowTitle提示的下拉展示控件框 直接封装有打开文件
 * **/
export class ItemRowSwitch extends Component {

    //属性注释及类型,所有的属性对象都是句柄模式（类型时number），类似C语言中的指针
    static propTypes = {
        frameStyle:PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.object,
            PropTypes.array
        ]),//框样式
        titleFrameStyle:PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.object,
            PropTypes.array
        ]),//提示框样式
        isShowHeader:PropTypes.bool,//是否显示 头部title 默认显示true
        textHeaderLeft:PropTypes.string,//头部title 左边文本
        isOpenFile:PropTypes.bool,// 是否启用打开文件功能, 默认false 关闭
        isShowChildrenDefault:PropTypes.bool,// 是否显示, 子元素UI 默认false 不显示
        onPressHeader:PropTypes.func,// 头部title行点击事件
        onPress:PropTypes.func,// 子元素行点击事件 //回传(item,i)，item：数组元素，i：下标
        title:PropTypes.string,//头部显示文本 isShowHeader为false 此属性无效
        isHorizontalPillar:PropTypes.bool,//是否显示横杠，//默认true 显示

        isShowIconRight:PropTypes.bool,//是否显示右边右箭头图标，默认false 不显示

        isShowPillar:PropTypes.bool,//是否显示title竖杠,默认false 不显示

        /**
         成员：{
            isOpenFile：false// 是否启用打开文件功能,优先级大于属性isOpenFile
            isShowIconRight：false//是否显示右边右箭头图标,优先级大于属性isShowIconRight
            uri:'',//打开文件的地址 isOpenFile为true时调用
            icon:'',//显示图片
            title:'',//子元元素显示文本
            text:'',//第二行小字显示文本
            textRight:'',//第二行显示文本 右边
            onPress:'',//回调函数，具有优先执行权，有此回调函数，属性onPress将无效
                       //回传(item,i)，item：数组元素，i：下标
            extraList:[],//额外数据列 可以不传 ==》成员：{textLeft'',textRight:''}
          }
         * **/
        dataList:PropTypes.array,//元素
    }

    constructor(props) {
        super(props);

        this.state = {
            isOperate:false,//是否点击过ItemRowTitle，点击过 isShowChildrenDefault失效
            visible:false,//是否显示子元素

        }
    }


    /**
     * 设置默认属性
     * **/
    static defaultProps = {
        isShowPillar:false,
        dataList:[],
        isOpenFile:false,
        isHorizontalPillar:true,
        isShowChildrenDefault:false,
        isShowHeader:true,
        isShowIconRight:false,
    }

    _onPressRow = (item,i)=>{
        const {onPress,isOpenFile} = this.props;

        const isExe = (item.uri && item.uri!='') && (item.isOpenFile != null && (item.isOpenFile == true) || isOpenFile);
console.info("item.uri",item.uri);
        isExe&&Tools.openDoc(item.uri);

        // console.info("isExe:",isExe)
       /* const isExe = (item.isOpenFile!=null&&(item.isOpenFile==true)&&(item.uri&&item.uri!='')&&Tools.openDoc(item.uri)
            ||isOpenFile&&(item.uri&&item.uri!='')&&Tools.openDoc(item.uri));*/

        // item.isOpenFile&&(item.isOpenFile==true)&&WebViewCus.show(true,item.uri)||isOpenFile&&WebViewCus.show(true,item.uri);
        !isExe&&(item.onPress&&item.onPress(item,i)||onPress&&onPress(item,i));

    }

    getIsShowIconRight(item){
        const {isShowIconRight} = this.props;
        let isShowRightIcon = false;
        if(item.isShowIconRight !=null){
            isShowRightIcon = item.isShowIconRight;
        }
        else if(!item.uri){
            isShowRightIcon = true;
        }
        else {
            isShowRightIcon = isShowIconRight;
        }

        return isShowRightIcon;
    }

    renderItemDown = (item,i)=>{
        return(
            <TextDoubleIcon key={"d" + i}
                            textLeft={item.textLeft}
                            textRight={item.textRight}
                            frameStyle={styles.titleTextDownRow}
                            textStyleLeft={[styles.titleTextDown,styles.titleTextDownLeft]}
                            textStyleRight={[styles.titleTextDown,styles.titleTextDownRight]}
                            disabled={true}/>
        )
    }

    _renderItem = (item,i)=>{

        const {isHorizontalPillar} = this.props;

        const isShowRightIcon = this.getIsShowIconRight(item);
        // console.info("item:",item);
        return(
            <TouchableOpacity key={i}
                              style={styles.frameStyle_1}
                              onPress={()=>this._onPressRow(item,i)}>
                <ItemRowBuyCar frameStyle={styles.frameRowStyle}
                               icon={item.icon}
                               isShowCheckBox={false}
                               text2_1={item.title}
                               text3_2={item.textRight}
                               text3_2Style={[styles.titleTextRight,isShowRightIcon ? {} : styles.titleTextRight2]}
                               disabledPress={true}
                               text3_1={
                                   <View style={styles.dateFrame}>
                                       {
                                           isHorizontalPillar&&<View style={styles.horizontalPillar}>

                                           </View>
                                       }

                                       <Text style={styles.dateText}>
                                           {item.text}
                                       </Text>
                                   </View>
                               }
                               isShowRight={false}
                               isShowLeft={false}
                               isShowIconRight={isShowRightIcon}
                               text4_1={''}/>

                {
                    item.extraList&&<View style={styles.frameRowStyle2}>
                        {
                            item.extraList.map(this.renderItemDown)
                        }
                    </View>
                }


            </TouchableOpacity>

        );
    }

    _onPressTitle = () =>{
        const {isShowChildrenDefault} = this.props;
        const {visible,isOperate} = this.state;
        const isVisble = (visible||(!isOperate&&isShowChildrenDefault));
        this.setState({
            visible:!isVisble,
            isOperate:true
        });
    }

    getChildren(isVisble){
        const {children} = this.props;
        return(
            isVisble&&children||null
        );
    }

    render() {

        const {frameStyle,textHeaderLeft,dataList,isShowChildrenDefault,
            isShowHeader,isShowPillar,titleFrameStyle,children} = this.props;
        const {visible,isOperate} = this.state;
        const isVisble = (visible||(!isOperate&&isShowChildrenDefault));

        // console.info("isVisble",isVisble)

        return(
            <View style={[styles.frameStyle,frameStyle]}>
                {
                    isShowHeader&&<TouchableOpacity onPress={this._onPressTitle}>
                        <ItemRowTitle text1={textHeaderLeft}
                                      isShowPillar={isShowPillar}
                                      frameStyle={[styles.titleTextFrame,titleFrameStyle]}
                                      viewRight={
                                          <ButtonImage icon={IamgeBelowIcon}
                                                       disabled={true}
                                                       style={styles.imageFrame}
                                                       iconStyle={isVisble?{}:styles.iconStyle}/>
                                      }/>
                    </TouchableOpacity>
                }

                {
                    children&&this.getChildren(isVisble)|| <View>
                        <View style={styles.contentFrame}>
                            {
                                isVisble&&dataList.map(this._renderItem)
                            }
                        </View>

                        <WebViewCus/>
                    </View>
                }

            </View>
        );


    }
}

const styles = StyleSheetAdapt.create({
    frameStyle:{
        // flexDirection:'row',

    },
    frameStyle_1:{
        borderColor:Theme.Colors.borderColor,
        borderBottomWidth:Theme.Border.borderWidth,
    },
    frameRowStyle:{
      borderBottomWidth:0,
    },
    frameRowStyle2:{
        borderColor:Theme.Colors.borderColor,
        borderTopWidth:Theme.Border.borderWidth,
        marginLeft:20,
        marginRight:20,
    },

    titleTextFrame:{
        backgroundColor:Theme.Colors.themeColorLight1,
    },
    titleTextRight:{
        color:Theme.Colors.themeColor,
        marginTop:-10,
    },
    titleTextRight2:{
      marginRight:50,
    },

    contentFrame:{
        backgroundColor:Theme.Colors.foregroundColor,
    },

    dateFrame:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        paddingTop:5,
    },
    horizontalPillar:{
        width:30,
        height:5,
        backgroundColor:Theme.Colors.themeColor,
        marginRight:15,
    },
    dateText:{
        fontSize:Theme.Font.fontSize_2,
        color:Theme.Colors.minorColor,
    },

    imageFrame:{
        width:25,
        height:25,
        marginRight:10,
    },
    iconStyle:{
        transform:[{ rotateZ: '-90deg' }],
        // tintColor:Theme.Colors.themeColor,
    },

    titleTextDownRow:{
        borderBottomWidth:0,
    },
    titleTextDown:{
        color:Theme.Colors.minorColor,
    },
    titleTextDownLeft:{
        marginLeft:-10,
    },
    titleTextDownRight:{
        marginRight:-35,
    },
});