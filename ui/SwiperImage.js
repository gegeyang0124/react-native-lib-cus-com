import React, {Component} from 'react';
import PropTypes  from 'prop-types';
import {
    View,
    Image,
    TouchableOpacity,
} from 'react-native';
import {
    StyleSheetAdapt,
} from "../api/api";
import {ButtonImage}from './ButtonImage';
import {ImageView} from "./ImageView";

import Swiper from 'react-native-swiper-zy';

/**
 * 图片轮播图
 * **/
export class SwiperImage extends Component{

    //属性注释及类型,所有的属性对象都是句柄模式（类型时number），类似C语言中的指针
    static propTypes = {
        frameStyle:PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.object,
            PropTypes.array,
            //React.PropTypes.instanceOf(Message)
        ]),//框样式
        imageStyle:PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.object,
            PropTypes.array,
            //React.PropTypes.instanceOf(Message)
        ]),//图片样式
        /**
         * 成员，item = {
           icon:'',//图片地址或require图片
           onpPress:func,//回调事件，有的话，属性onPressSwiper无效
         } 或 纯//图片地址或require图片
         * **/
        imageList:PropTypes.array,//图片数组
        onPressSwiper:PropTypes.func,//Swiper点击事件
        isCheckImage:PropTypes.bool,//是否查看image,默认是false
    }

    constructor(props) {
        super(props);
        this.imageList = [];
    }

    /**
     * 设置默认属性
     * **/
    static defaultProps = {
        imageList:[],
        isCheckImage:false,
    }

    _onPressItem = (item,index)=>{
        const {imageList,isCheckImage,onPressSwiper} = this.props;

        if(isCheckImage){
            let imgList = [];
            this.imageList.forEach((v,i,a)=>{
                imgList.push(v.icon);
            });

            ImageView.show(true,imgList,index);
        }
        else {
            if(item.onPress){
                item.onPress&&item.onPress(imageList,index);
            }
            else{
                onPressSwiper&&onPressSwiper(imageList,index);
            }

        }

    }

    renderView(item,index) {
        const {imageStyle} = this.props;
        return(
            <View style={styles.slide}
                  key={index}>
                <ButtonImage style={[styles.image,imageStyle]}
                             onPress={()=>this._onPressItem(item,index)}
                             iconStyle={[styles.image,imageStyle]}
                             icon={typeof(item.icon) == "string"
                                 ? {uri:item.icon}
                                 : item.icon} />
            </View>
        );
    }

    getImageList(){
        this.imageList = [];
        const {imageList} = this.props;

        imageList.forEach((v,i,a)=>{
            if(typeof(v) === 'string' || typeof(v) === 'number'){
                this.imageList.push({
                    icon:v
                });
            }
            else {
                this.imageList.push(v);
            }
        });
    }

    render () {
        const {frameStyle} = this.props;

        if(this.props.imageList.length > 0)
        {
            let dataList = [];
            this.getImageList();
            // console.info("this.imageList:",this.imageList)
            this.imageList.forEach((val,i,arr)=>{
                dataList.push(this.renderView(val,i));
            });

            return (
                <View style={[styles.container,frameStyle]}>
                    <ImageView/>
                    <Swiper style={styles.wrapper}
                            height={StyleSheetAdapt.getHeight(300)}
                            horizontal={true}
                            loop={true}
                            autoplayTimeout={2}
                            autoplay={ true }>

                        {
                            dataList.map(value=>value)
                        }

                    </Swiper>

                </View>
            );
        }
        else
        {
            return(null);
        }
    }
}

const styles = StyleSheetAdapt.create({
    container: {
        padding:10,
    },
    containerBtn:{
        padding:10,
    },
    wrapper: {
    },
    slide: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent'
    },
    image: {
        width:'w',
        height:300
    }
});