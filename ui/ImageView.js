import React, { Component } from 'react';
import PropTypes  from 'prop-types';
import {
    View,
    Modal,
    Image,
    TouchableOpacity,
} from 'react-native';

import ImageViewer from 'react-native-image-zoom-viewer';
import {StyleSheetAdapt} from "../api/api";

import img from './../../res/images/logo.png';
import imageLeft from './../../res/images/leftWhite.png';

export class ImageView extends Component {

    //imageView = null;
    static base;

    static propTypes = {
        imageUrls:PropTypes.array,//图片路径数组
        iconLeft:PropTypes.number
    }

    // 构造
    constructor(props) {
        super(props);
        ImageView.base = this;
        // 初始状态
        this.state = {
            visible:false,//是否显示
            imageUrls:[],//显示图片数组路径
            imageIndex:0,//图片数据地址，第几张

        };

    }

    /**
     * 显示图片
     * @param bool bool,//是否显示，true:显示，false：隐藏，默认是true
     * @param imageUrls array,//图片数组
     * @param index int,//地址，初始显示第几张图片
     * **/
    static show(bool,imageUrls,index){
        // console.log('ccc')
        bool = bool == undefined ? false : bool;
        imageUrls = imageUrls == undefined ? [] : imageUrls;
        index = index == undefined ? 0 : index;
       /* [{
            url: 'https://avatars2.githubusercontent.com/u/7970947?v=3&s=460',
            // Pass props to <Image />.
            props: {
                // headers: ...
            }
        }]*/
       let imageList = [];
       imageUrls.forEach((val,i,arr)=>{
          imageList.push({
              url: val,
              // Pass props to <Image />.
              props: {
                  // headers: ...
              }
          });
       });
        ImageView.base.setState({
            visible: bool,//是否显示
            imageUrls:imageList,
            imageIndex:index
        });

    }

    /**
     * 显示图片
     * @param bool bool,//是否显示，true:显示，false：隐藏，默认是true
     * @param imageUrls array,//图片数组
     * @param index int,//地址，初始显示第几张图片
     * **/
    show(bool,imageUrls,index){
        // console.log('ccc')
        // console.info("imageUrls index="+index,imageUrls);
        bool = bool == undefined ? false : bool;
        imageUrls = imageUrls == undefined ? [] : imageUrls;
        index = index == undefined ? 0 : index;
        /* [{
             url: 'https://avatars2.githubusercontent.com/u/7970947?v=3&s=460',
             // Pass props to <Image />.
             props: {
                 // headers: ...
             }
         }]*/
        let imageList = [];
        imageUrls.forEach((val,i,arr)=>{
            imageList.push({
                url: val,
                // Pass props to <Image />.
                props: {
                    // headers: ...
                }
            });
        });
        this.setState({
            visible: bool,//是否显示
            imageUrls:imageList,
            imageIndex:index
        });

    }

    onRequestClose(){

    }

    render(){
        ImageView.base = this;
        const renderHeader = <TouchableOpacity style={styles.iconLeft}
                                               delayPressIn={0}
                                               delayPressOut={0}
                                               onPressIn={() =>{

                                                   this.setState({visible:false});
                                               }}>
            <Image source={imageLeft}
                   style={{resizeMode:"contain"}}/>
        </TouchableOpacity>;

        return(

            <Modal {...this.props}
                   animationType={"none"}
                //ref={(component) => this.imageView = component}
                   ref="imageView"
                   visible={this.state.visible}
                   onRequestClose={()=> this.onRequestClose()}>
                <ImageViewer imageUrls={this.state.imageUrls} // 照片路径
                             enableImageZoom={true} // 是否开启手势缩放
                             index={this.state.imageIndex} // 初始显示第几张
                             failImageSource={img} // 加载失败图片
                             onChange={(index) => {}} // 图片切换时触发
                             renderHeader={() =>renderHeader}
                             /*footerContainerStyle={
                                 {
                                     bottom: 200, //position: "absolute", zIndex: 9999
                                 }
                             }*/
                             onClick={() => { // 图片单击事件,我在这里设置退出
                                 /*this.setNativeProps({
                                     visible:false
                                 });*/
                                 /*this.imageView.setNativeProps({
                                     visible:false
                                 });*/
                                 //this.imageView.visible = false;
                                 /* ImageView.base.refs.imageView.setNativeProps({
                                      visible:false
                                  });*/
                                 //this.setState({visible:false});

                             }}

                />
            </Modal>
        );

    }

}

const styles = StyleSheetAdapt.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        //backgroundColor: '#d35400',
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