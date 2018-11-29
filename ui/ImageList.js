import React, {Component} from 'react';
import PropTypes  from 'prop-types';
import {
    View,
    ScrollView,
} from 'react-native';
import {
    StyleSheetAdapt,
    Theme,
} from "./../api/api";
import {ImageChange} from "./ImageChange";
import {ImageView} from "./ImageView";
import {TextChange} from "./TextChange";

/**
 * 可以查看图片，成行排列，每张图片下部可以有提示文字，可水平滚动，可垂直滚动，可自动换行（rowCount），默认水平滚动
 * **/
export class ImageList extends Component {

//属性注释及类型,所有的属性对象都是句柄模式（类型时number），类似C语言中的指针
    static propTypes = {
        frameStyle:PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.object,
            PropTypes.array
        ]),//框样式
        frameRowStyle:PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.object,
            PropTypes.array
        ]),//行框样式
        imageFrameStyle:PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.object,
            PropTypes.array
        ]),// 图片框样式
        iconStyle:PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.object,
            PropTypes.array
        ]),//图片样式
        textStyle:PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.object,
            PropTypes.array
        ]),//文本样式
        isShowImage:PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.bool
        ]),//是否启用查看大图，默认启用true //fasle禁用大图，数字：1 长按查看大图
        text:PropTypes.string,//底部文本
        isShowText:PropTypes.bool,//底部文本 是否显示 默认true，显示,
        onPressText:PropTypes.func,//文本点击  回传（成员，index）
        onPress:PropTypes.func,//图片点击事件 回传（成员，index）
        onLongPress:PropTypes.func,//图片长按事件 回传（成员，index）
        isScroll:PropTypes.bool,//是否可以滚动 默认是true
        rowCount:PropTypes.number,//单行图片数量 需要自动换行必传 默认0，不换行
        /**
         成员：{
          text:'',文本，
          icon:'',图片,
          imageFrameStyle:,//行框样式
          }
         * **/
        dataList:PropTypes.array,//按钮数组
        renderImageBottom:PropTypes.func,//image底部显示UI回调函数，回传成员和数组地址
        onPressDel:PropTypes.func,//删除事件
    }

    /**
     * 设置默认属性
     * **/
    static defaultProps = {
        rowCount:0,
        dataList:[],
        isShowImage:true,
        isScroll:true,
        isShowText:true

    }

    constructor(props) {
        super(props);

        this.imageList = [];

    }

    renderImageBottom = (item,i)=>{

        const {textStyle,onPressText,text} = this.props;
        // "签到地址:广东省广州市珠江东路6号\n签到时间:2018-06-25 15:33:33"
        return(
            <View style={styles.iconFrame_1}>

                <TextChange text={text||item.text}
                            onPress={()=>onPressText&&onPressText(item,i)}
                            textStyle={[styles.textStyle,textStyle]}/>
            </View>
        );
    }

    renderItem = (item,i)=>{
        const {iconStyle,dataList,renderImageBottom,isShowImage
            ,onPress,onPressDel,isShowText,imageFrameStyle,onLongPress} = this.props;
        const icon = typeof(item.icon) == 'number' ? item.icon : {uri:item.icon};
        // alert(JSON.stringify(item));
        const isShowImageV = typeof(isShowImage) == 'number'
            ? isShowImage
            : isShowImage == true
                ? 2
                : 0//0：禁用大图，1：长按查看大图,2：点击查看大图
        return(
            <View key={i}
                  style={[styles.iconFrame,
                      i == (dataList.length - 1)
                          ? styles.iconFrameRight
                          : {},
                      imageFrameStyle,
                      item.imageFrameStyle]}>

                <ImageChange icon={icon}
                             isDel={onPressDel == null ? false : true}
                             onPressDel={()=>{
                                 onPressDel&&onPressDel(item,i);
                             }}
                             style={[styles.iconStyle,iconStyle]}
                             onPress={()=>{
                                 // console.info("isShowImageV",isShowImageV);
                                 (isShowImageV==2)&&this.imageView.show(true,this.imageList,item.indexParent);
                                 onPress&&onPress(item,item.indexParent);
                             }}
                             onLongPress={()=>{
                                 (isShowImageV==1)&&this.imageView.show(true,this.imageList,item.indexParent);
                                 onLongPress&&onLongPress(item,item.indexParent);
                             }}
                             iconStyle={[styles.iconStyle,iconStyle]}/>
                {
                    isShowText&&(renderImageBottom&&renderImageBottom(item,i)||this.renderImageBottom(item,i))
                }

            </View>
        );
    }

    getRenderImageList(imageList){
        const {rowCount} = this.props;

        let imageListRender = [];

        if(rowCount > 0){
            imageList.forEach((v,i,a)=>{
                v.indexParent = i;
                if(i % rowCount == 0){
                    imageListRender.push([v]);
                }
                else {
                    imageListRender[imageListRender.length - 1].push(v);
                }
            });
        }
        else {
            imageList.forEach((v,i,a)=>{
                v.indexParent = i;
            });
            imageListRender.push(imageList);
        }

        return imageListRender;
    }

    renderRowItem = (item,i)=>{
        const {frameRowStyle} = this.props;

        return(
            <View key={i}
                  style={[styles.frameStyle,frameRowStyle]}>
                {
                    item.map(this.renderItem)
                }
            </View>
        );
    }

    render() {
        const {frameStyle,dataList,isScroll,rowCount} = this.props;

        let imageList = [];
        let imageList2 = [];
        dataList.forEach((v,i,a)=>{
            if(typeof(v) == 'string' || typeof(v) == 'number'){
                imageList.push(v);
                imageList2.push({
                    icon:v
                });
            }
            else {
                imageList.push(v.icon);
                imageList2.push(v);
            }

        });
        this.imageList = imageList;

        const imageListRender = this.getRenderImageList(imageList2);

        return (
            isScroll
                ?  <ScrollView style={[styles.frameStyleScroll,frameStyle]}
                               horizontal={rowCount?false:true}
                               scrollEnabled={true}>

                    {
                        imageListRender.map(this.renderRowItem)
                    }
                    <ImageView ref={c=>this.imageView = c}/>
                </ScrollView>
                :
                <View style={frameStyle}>
                    {
                        imageListRender.map(this.renderRowItem)
                    }

                    <ImageView ref={c=>this.imageView = c}/>
                </View>
        );
    }
}

const styles = StyleSheetAdapt.create({
    frameStyleScroll:{
        width:'w',
    },
    frameStyle: {
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        flexDirection:'row',
        // backgroundColor:"yellow"
    },
    iconFrame:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        marginLeft:10,
        // backgroundColor:'yellow'
        width:250,
        height:'270dw',
        // zIndex:1,
        // backgroundColor:'blue',
    },
    iconFrameRight:{
        marginRight:10,
    },
    iconStyle:{
        width:250,
        height:'250dw',
        // zIndex:10,
    },
    iconFrame_1:{
        alignItems:'center',
        justifyContent:'flex-end',
        marginBottom:10,
        flexDirection:'column',
    },
    textStyle:{
        fontSize:Theme.Font.fontSize_2,
    },

});