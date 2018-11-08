import React, {Component} from 'react';
import PropTypes  from 'prop-types';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    ART,
} from 'react-native';

import {
    StyleSheetAdapt,
    Theme,
} from "./../api/api";
import {ButtonImage} from './ButtonImage';

import {
    Circle,
} from 'react-native-progress';

import ImageRightBlack from 'lib-images-zy/rightBlack.png';
import ImageToSwipeRight from 'lib-images-zy/toSwipeRight.png';


/**
 * 侧滑组件
 * **/
import {SwipeListView, SwipeRow} from 'react-native-swipe-list-view-zy';

/**
 * 行组件，上部是左边是title，右边是状态；像QQ一样单行可以侧滑，侧滑显示按钮
 * **/
type Props = {};
export class ItemRowTripTask extends Component<Props> {

    static btnWidthHide = 100;
    btnViewWidth = 0;

    //属性注释及类型,所有的属性对象都是句柄模式（类型时number），类似C语言中的指针
    static propTypes = {
        text1_1:PropTypes.string,//文本 第1行第1个
        text1_2:PropTypes.oneOfType([
            PropTypes.object,
            PropTypes.array,
            PropTypes.string
        ]),//文本 第1行第2个
        text2_1:PropTypes.string,//文本 第2行第1个
        text2_2:PropTypes.string,//文本 第2行第2个
        text3_1:PropTypes.string,//文本 第3行第1个
        text3_2:PropTypes.string,//文本 第3行第2个
        text4_1:PropTypes.string,//文本 第4行第1个
        text5_1:PropTypes.string,//文本 第4行第1个
        text4_2:PropTypes.oneOfType([
            PropTypes.object,
            PropTypes.string
        ]),//文本 第4行第2个
        itemRowFrame:PropTypes.oneOfType([
            PropTypes.array,
            PropTypes.object,
            PropTypes.number
        ]),//主框样式
        titleFrameStyle:PropTypes.oneOfType([
            PropTypes.array,
            PropTypes.object,
            PropTypes.number
        ]),//标题框样式
        text1_1_Style:PropTypes.oneOfType([
            PropTypes.array,
            PropTypes.object,
            PropTypes.number
        ]),//文本样式 第1行第1个
        text1_2_Style:PropTypes.oneOfType([
            PropTypes.array,
            PropTypes.object,
            PropTypes.number
        ]),//文本样式 第1行第2个
        text4_1_Style:PropTypes.oneOfType([
            PropTypes.array,
            PropTypes.object,
            PropTypes.number
        ]),//文本样式 第1行第2个
        text5_1_Style:PropTypes.oneOfType([
            PropTypes.array,
            PropTypes.object,
            PropTypes.number
        ]),//文本样式 第1行第2个
        text2_1_Style:PropTypes.oneOfType([
            PropTypes.array,
            PropTypes.object,
            PropTypes.number
        ]),//文本样式 第2行第1个
        text1_2_Icon:PropTypes.number,//图标 第1行第2个
        itemRowIcon:PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.string,
            PropTypes.bool,
            PropTypes.object,
        ]),//行的logo
        isItemRowIconLeft:PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.string,
            PropTypes.bool,//是否显示，false：不显示；true：显示；默认false
            PropTypes.object,
        ]),//行的logo左边
        onPress:PropTypes.func,//行点击事件
        disableRightSwipe:PropTypes.bool,//是否禁止向右滑，true:禁止，false:不禁止； 默认是true 主行onPress有效
        // swipeWidth:PropTypes.number,//滑动的宽度，默认50%促发行宽
        /**
         * 成员：{
          text:'按钮文本'
          onPress:func,//回调事件
         }
         * **/
        btnList:PropTypes.array,//隐藏按钮数组

        progress:PropTypes.number,//圆形进度 0~1
    }

    /**
     * 设置默认属性
     * **/
    static defaultProps = {
        itemRowIcon:true,
        isItemRowIconLeft:false,
        disableRightSwipe:true,
        btnList:[],
        // swipeWidth:StyleSheetAdapt.getWidth('0.9w') * 0.5
    }

    constructor(props) {
        super(props);
        this.ui = null;//ui实例
        this.state = {
            isItemRowIconLeft: true,
        };
    }

    onOpenMenu(){
        this.rowCom.manuallySwipeRow(this.btnViewWidth);
        this.onHideIcon();
    }

    onCloseMenu(){
        this.rowCom.closeRow();
        this.onHideIcon();
    }

    onHideIcon(isItemRowIconLeft){

        if(this.props.btnList.length > 0)
        {
            if(isItemRowIconLeft == undefined)
            {
                this.setState({
                    isItemRowIconLeft:!this.state.isItemRowIconLeft
                });
            }
            else
            {
                this.setState({
                    isItemRowIconLeft:isItemRowIconLeft
                });
            }
        }

    };

    renderBtn = (item,index)=>{
        return(
            <TouchableOpacity style={[
                styles.itemRowBtnHide,
                {backgroundColor:item.backgroundColor}
            ]}
                              key={index}
                              onPress={()=>{
                                  this.onCloseMenu();
                                  item.onPress == undefined ? null : item.onPress();
                              }}>
                <Text style={styles.itemRowBtnTextHide}>
                    {item.text}
                </Text>
            </TouchableOpacity>
        );
    }

    sumBtnViewWidth(){
        this.btnViewWidth = 0;
        this.props.btnList.forEach((v,i,a)=>{
            this.btnViewWidth += StyleSheetAdapt.getWidth(ItemRowTripTask.btnWidthHide);
        });

        this.btnViewWidth += StyleSheetAdapt.getWidth(20);

        return this.btnViewWidth;
    }

    measure(){
        return new Promise((resolve,reject)=>{
            this.ui.measure((fx, fy, width, height, px, py) => {
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
                resolve(m);
            });
        });
    }

    render() {

        let {text1_1,text1_2,text2_1,text2_2, text3_1,text3_2,text4_1,text5_1,text4_2,
            text1_2_Style,text4_1_Style,text5_1_Style,text1_2_Icon,text1_1_Style, titleFrameStyle,itemRowFrame,
            text2_1_Style,itemRowIcon,isItemRowIconLeft,disableRightSwipe,onPress,
            btnList,progress} = this.props;

        return (
            <TouchableOpacity {...this.props}
                              ref={com => this.ui = com}
                              style={[styles.itemRowFrame,itemRowFrame]}>

                <View style={styles.itemRowFrame2}>
                    <View style={styles.itemRowFrame1_0}>
                        <View style={[styles.itemRowFrame2,styles.itemRowFrame1_1_1,titleFrameStyle]}>
                            <View style={styles.itemRowFrame2_1}>
                                <Text style={[styles.itemRowText,text1_1_Style]}>
                                    {
                                        text1_1
                                    }
                                </Text>
                            </View>

                            <View style={styles.itemRowFrame2_2}>
                                <Text style={[styles.itemRowText2,text1_2_Style]}>
                                    {
                                        text1_2
                                    }
                                </Text>

                                {
                                    text1_2_Icon == null
                                        ? null
                                        : <Image source={text1_2_Icon}
                                                 style={[styles.itemRowFrame1_1_1_2_Icon]}/>
                                }
                            </View>

                        </View>
                    </View>

                    <View style={styles.itemRowFrame1_0_0}>
                    </View>
                </View>

                <SwipeRow leftOpenValue={this.sumBtnViewWidth()}
                          ref={component=>this.rowCom = component}
                          disabledRowPerss={disableRightSwipe}
                          onRowPress={()=>{
                              if(onPress != undefined && disableRightSwipe)
                              {
                                  onPress();
                              }
                              else if(!disableRightSwipe)
                              {
                                  if(btnList.length > 0)
                                  {
                                      this.state.isItemRowIconLeft
                                          ? this.onOpenMenu()
                                          : this.onCloseMenu();
                                  }
                                  else
                                  {
                                      if(onPress != undefined)
                                      {
                                          onPress();
                                      }
                                  }
                              }
                          }}
                          onRowOpen={()=>this.onHideIcon(false)}
                          onRowClose={()=>this.onHideIcon(true)}
                          disableRightSwipe={
                              btnList.length > 0
                                  ? disableRightSwipe
                                  : true
                          }
                          disableLeftSwipe={true}>

                    <View style={[styles.itemRowFrame2,styles.itemRowHide]}>

                        {
                            disableRightSwipe
                                ? null
                                : btnList.map(this.renderBtn)
                        }

                        <TouchableOpacity style={styles.itemRowBtnImgHide}
                                          onPress={()=>this.onCloseMenu()}>
                            <Image source={ImageToSwipeRight}
                                   style={[styles.itemRowIconLeft,styles.itemRowIconRight]}/>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.itemRowFrame2}>

                        {
                            isItemRowIconLeft && this.state.isItemRowIconLeft
                                ? <View style={styles.itemRowIconLeftFreame}>
                                    <Image source={ImageToSwipeRight} style={styles.itemRowIconLeft}/>
                                </View>
                                : null
                        }




                        <View style={styles.itemRowFrame1_1}>


                            <View style={styles.itemRowFrame2}>
                                <View style={styles.itemRowFrame2_1}>
                                    <Text style={[styles.itemRowText1,text2_1_Style]}>
                                        {
                                            text2_1
                                        }
                                    </Text>
                                </View>

                                <View style={styles.itemRowFrame2_2}>
                                    <Text style={styles.itemRowText2}>
                                        {
                                            text2_2
                                        }
                                    </Text>
                                </View>

                            </View>

                            <View style={styles.itemRowFrame2}>
                                <View style={styles.itemRowFrame2_1}>
                                    <Text style={styles.itemRowText1}>
                                        {
                                            text3_1
                                        }
                                    </Text>
                                </View>
                                <View style={styles.itemRowFrame2_2}>
                                    <Text style={styles.itemRowText2}>
                                        {
                                            text3_2
                                        }
                                    </Text>
                                </View>

                            </View>

                            {
                                text4_1 != undefined
                                    ? <View style={styles.itemRowFrame2}>
                                        <View style={styles.itemRowFrame2_1}>
                                            <Text style={[styles.itemRowText1,text4_1_Style]}>
                                                {
                                                    text4_1
                                                }
                                            </Text>
                                        </View>
                                        <View style={styles.itemRowFrame2_2}>
                                            <Text style={styles.itemRowText2}>
                                                {
                                                    text4_2
                                                }
                                            </Text>
                                        </View>

                                    </View>
                                    : null
                            }

                            {
                                text5_1 != undefined
                                    ? <View style={styles.itemRowFrame2}>
                                        <View style={styles.itemRowFrame2_1}>
                                            <Text style={[styles.itemRowText1,text5_1_Style]}>
                                                {
                                                    text5_1
                                                }
                                            </Text>
                                        </View>


                                    </View>
                                    : null
                            }

                        </View>
                        {
                            // typeof(progress)=='number'
                            /^-?\d*\.\d+$/.test(progress)&& <View style={styles.itemRowFrame3_1}>
                                <Circle size={80} // 圆的直径
                                        style={styles.circleStyle}
                                        progress={progress}
                                        unfilledColor={Theme.Colors.foregroundColor} // 剩余进度的颜色
                                        color={Theme.Colors.themeColor}
                                        thickness={StyleSheetAdapt.getWidth(10)} // 内圆厚度
                                        showsText={true}//显示进度比文字
                                    //indeterminate={true}
                                        textStyle={styles.circleText}
                                        formatText={() =>{
                                            return "业绩\n" + progress * 100 + "%";
                                        }}/>
                            </View>
                        }

                        {
                            itemRowIcon == true
                                ? <View style={styles.itemRowFrame1_2}>
                                    <ButtonImage icon={ImageRightBlack}
                                                 style={styles.itemRowIcon}
                                                 iconStyle={{ tintColor:Theme.Colors.themeColor}}/>
                                </View>
                                : null
                        }


                    </View>

                </SwipeRow>

            </TouchableOpacity>
        );
    }
}

const styles = StyleSheetAdapt.create({
    itemRowFrame:{
        // flexDirection:'row',
        // alignItems:'center',
        // justifyContent:'center',
        flex:1,
        borderColor:Theme.Colors.themeColor,
        borderBottomWidth:Theme.Border.borderWidth,
        paddingBottom:10,
    },
    /*itemRowFrame2:{
        flexDirection:'row',
        // backgroundColor:"yellow",
    },*/
    itemRowFrame1_0:{
        flex:9.5,
        // backgroundColor:"yellow",

    },
    itemRowFrame1_1:{
        flex:9,
        backgroundColor:Theme.Colors.foregroundColor
        // alignItems:'center',
        // justifyContent:'center',
    },
    itemRowFrame1_1_1:{
        borderBottomWidth:Theme.Border.borderWidth,
        borderBottomColor:Theme.Colors.minorColor,
        paddingBottom:10,
    },
    itemRowFrame1_1_1_2:{
        // marginRight:StyleSheetAdapt.getWidth('0.05w') - StyleSheetAdapt.getWidth(20) + "n",
    },
    itemRowFrame1_1_1_2_Icon:{
        resizeMode:'contain',
        width:50,
        height:Theme.Font.fontSize_1,
        marginLeft:10,
    },
    itemRowFrame1_0_0:{
        flex:0.5,
        // alignItems:'center',
        // justifyContent:'center',
    },
    itemRowFrame1_2:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
    },
    itemRowFrame2_1:{
        // flex:1,
    },
    itemRowFrame2_2:{
        // flex:1,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
    },
    itemRowFrame2:{
        flex:1,
        flexDirection:'row',
        padding:10,
        paddingBottom:0,
        justifyContent:'space-between',
    },
    itemRowText:{
        fontSize:Theme.Font.fontSize,
    },
    itemRowText1:{

        fontSize:Theme.Font.fontSize_1,
        color:Theme.Colors.minorColor,
        // backgroundColor:'yellow',
        // alignSelf:"center",
        // flex:8,
    },
    itemRowText2:{
        fontSize:Theme.Font.fontSize_1,
        // backgroundColor:'blue',
        alignSelf:"center",
        color:Theme.Colors.minorColor,
    },
    itemRowIcon:{
        width:Theme.Font.fontSize_1,
        height:Theme.Font.fontSize_1,
    },

    itemRowFrame3_1:{
        paddingRight:100,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:Theme.Colors.foregroundColor,
    },

    itemRowIconLeftFreame:{
        backgroundColor:Theme.Colors.themeColor,
        alignItems:'center',
        justifyContent:'center',
        // marginTop:10,
        width:20,
    },
    itemRowIconLeft:{
        width:20,
        height:20,
        resizeMode:'contain',
    },

    itemRowHide:{
        // alignItems:'center',
        justifyContent:'flex-start',
    },
    itemRowBtnHide:{
        // flex:1,
        width:ItemRowTripTask.btnWidthHide,
        backgroundColor:Theme.Colors.backgroundColorBtn1,
        alignItems:'center',
        justifyContent:'center',
    },
    itemRowBtnTextHide:{
        fontSize:Theme.Font.fontSize,
        color:Theme.Colors.colorFontBtn,
    },
    itemRowIconRight:{
        transform:[
            {rotateY:'180deg'}
        ],
    },
    itemRowBtnImgHide:{
        backgroundColor:Theme.Colors.minorColor,
        alignItems:'center',
        justifyContent:'center',
        // marginTop:10,
        width:20,
    },

    circleText:{
        fontSize:Theme.Font.fontSize_1_1,
        color:Theme.Colors.appRedColor,
    }

});