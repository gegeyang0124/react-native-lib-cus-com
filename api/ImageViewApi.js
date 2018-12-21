import React, { Component } from 'react';
import PropTypes  from 'prop-types';
import {
    View,
    Image,
    TouchableOpacity,
    ActivityIndicator,
} from 'react-native';

import RootSiblings from 'react-native-root-siblings';
import ImageViewer from 'react-native-image-zoom-viewer';
import {StyleSheetAdapt} from "./StyleSheetAdapt";

import img from './../res/error.png';
import imageLeft from './../res/leftWhite.png';
import {Theme} from "./Theme";
let showingDialog = null;

/**
 * 大图片展示Api
 * **/
export class ImageViewApi extends Component{
    /**
     * 显示图片
     * @param imageUrls array,//图片数组
     * @param index int,//地址，初始显示第几张图片
     * @param iconLeft int,//返回按钮图标
     * **/
    static show(imageUrls=[],index=0,iconLeft){
        let view = <ImageView imageUrls={imageUrls}
                              iconLeft={iconLeft}
                              imageIndex={index}/>;

        if(showingDialog == null){
            showingDialog = new RootSiblings(view);
        }
        else
        {
            showingDialog.update(view)
        }
    }

    /**
     * 隐藏图片
     */
    static hide(){
        if (showingDialog != null && showingDialog instanceof RootSiblings) {
            showingDialog.destroy();
            showingDialog = null;
        }
    }
}

class ImageView extends Component {

    static propTypes = {
        imageUrls:PropTypes.array,//图片路径数组
        iconLeft:PropTypes.number,//返回按钮图标
        imageIndex:PropTypes.number //显示图片下标
    }

    /**
     * 设置默认属性
     * **/
    static defaultProps = {
        imageIndex:0,
        iconLeft:imageLeft,
        imageUrls:[]
    }

    // 构造
    constructor(props) {
        super(props);

        this.imageList = [];
        this.state = {
            indicator:true,
            imageIndex:this.props.imageIndex
        };
    }


    _getImageUrls(){
        const {imageUrls,imageIndex} = this.props;

        if(this.imageList.length == 0){
            let imageList = [];
            imageUrls.forEach((val,i,arr)=>{
                imageList.push({
                    url: val,
                    // Pass props to <Image />.
                    isLoad:imageIndex == i ? false : true,//是否加载 true:未加载；false：未加载
                    props: {
                        // headers: ...
                        // source: img,
                        onLoadStart:()=>{
                            // console.info("onLoadStart","onLoadStart")
                            // this.setState({indicator:true});
                        },
                        onLoadEnd:()=>{
                            // console.info("onLoadEnd","onLoadEnd")
                            this.setState({indicator:false});
                        }
                    }
                    ,
                    freeHeight: true
                });
            });

            this.imageList = imageList;
        }

        return this.imageList;
    }

    render(){

        const {iconLeft} = this.props;
        const {indicator,imageIndex} = this.state;

        const renderHeader = <TouchableOpacity style={styles.iconLeft}
                                               delayPressIn={0}
                                               delayPressOut={0}
                                               onPressIn={() =>{
                                                   ImageViewApi.hide();
                                               }}>
            <Image source={iconLeft}
                   style={{resizeMode:"contain"}}/>
        </TouchableOpacity>;

        return(
            <View style={styles.container}>

                <ImageViewer imageUrls={this._getImageUrls()} // 照片路径
                             enableImageZoom={true} // 是否开启手势缩放
                             index={imageIndex} // 初始显示第几张
                             failImageSource={img} // 加载失败图片
                             onChange={(index) => {
                                if( this.imageList[index].isLoad){
                                    this.imageList[index].isLoad = false;
                                    this.setState({
                                        indicator:true,
                                        imageIndex:index
                                    });
                                }
                             }} // 图片切换时触发
                             renderHeader={() =>renderHeader}
                             style={StyleSheetAdapt.styleJsonAdaptConvert({
                                 position: "absolute",
                                 width:'w',
                                 height:'h',
                             })}

                             onClick={() => { // 图片单击事件,我在这里设置退出
                             }}

                />

                {
                    indicator
                    &&<ActivityIndicator size="large"
                                         color={Theme.Colors.themeColor}/>
                }


            </View>
        );

    }

}

const styles = StyleSheetAdapt.create({
    indicator:{
        marginTop:'0.5h',
    },

    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
        position: "absolute",
        width:'w',
        height:'h',
    },
    spinner: {
        marginBottom: 50
    },
    iconLeft:{
        left:20,
        top:40,
        //backgroundColor: '#d35400',
        position: "absolute",
        zIndex: 9999 //z轴方向的层级，越大越在顶部
    }
});