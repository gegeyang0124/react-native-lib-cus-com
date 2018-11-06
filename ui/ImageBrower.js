import React, { Component } from 'react';
import PropTypes  from 'prop-types';
import {
    Modal,
} from 'react-native';


import PhotoBrowser from 'react-native-photo-browser';
import {
    Tools,
    DbMgr,
} from "../api/api";

/**
 * 图片浏览UI，可以多个图片
 * **/
export class ImageBrower extends Component {

    //imageView = null;
    static base;

    static propTypes = {
        /**
         *  thumb: '', // thumbnail version of the photo to be displayed in grid view. actual photo is used if thumb is not provided
         photo: '', // a remote photo or local media url
         caption: '', // photo caption to be displayed
         selected: true, // set the photo selected initially(default is false)
         * **/
        dataList:PropTypes.array,//图片路径数组
    }

    // 构造
    constructor(props) {
        super(props);
        ImageBrower.base = this;
        Tools.imageBrower = this;
        this.resolve = null;
        // 初始状态
        this.state = {
            visible:false,//是否显示
            dataList:[],//显示图片数组路径
        };

    }

    /**
     * 显示图片
     * @param bool bool,//是否显示，true:显示，false：隐藏，默认是true
     * @param imageUrls array,//图片数组
     * @param resolve resolve,//Promise的回调函数
     * **/
    static show(imageUrls,bool = true,resolve){
        if(resolve || !bool){
            if(imageUrls || !bool){
                ImageBrower.base.resolve = resolve;
                ImageBrower.base.setState({
                    visible: bool,//是否显示
                    dataList:!bool ? [] : imageUrls
                });
            }
            else {
                DbMgr.queryTableMedia()
                    .then((results)=>{
                        // Tools.toast(JSON.stringify(results));
                        if(results.length > 0){
                            // alert(JSON.stringify(results));
                            imageUrls = [];

                            results.forEach((val,i,arr)=>{
                                imageUrls.push({
                                    photo: val.path_local,
                                    address:val.address,
                                    author:val.author,
                                    lat:val.lat,
                                    lng:val.lng
                                });
                            });
                            ImageBrower.base.show(imageUrls,bool,resolve);
                        }
                        else {
                            Tools.toast("抱歉，你还没有拍过照");
                        }


                        /* ImageBrower.base.setState({
                             visible: bool,//是否显示
                             imageUrls:imageList,
                             imageIndex:index
                         });*/

                    });
            }
        }
        else {
            return new Promise(resolve => {
                this.show(imageUrls,bool,resolve);
            });
        }

    }

    /**
     * 显示图片
     * @param bool bool,//是否显示，true:显示，false：隐藏，默认是true
     * @param imageUrls array,//图片数组
     * @param resolve resolve,//Promise的回调函数
     * **/
    show(imageUrls,bool = true,resolve){


        if(resolve || !bool){
            if(imageUrls || !bool){
                this.resolve = resolve;
                this.setState({
                    visible: bool,//是否显示
                    dataList:!bool ? [] : imageUrls
                },()=>{

                });
            }
            else {
                DbMgr.queryTableMedia()
                    .then((results)=>{
                        // Tools.toast(JSON.stringify(results));
                        if(results.length > 0){
                            // alert(JSON.stringify(results));
                            imageUrls = [];

                            results.forEach((val,i,arr)=>{
                                imageUrls.push({
                                    photo: val.path_local,
                                    address:val.address,
                                    author:val.author,
                                    lat:val.lat,
                                    lng:val.lng
                                });
                            });
                            this.show(imageUrls,bool,resolve);
                        }
                        else {
                            Tools.toast("抱歉，你还没有拍过照");
                        }

                    });
            }
        }
        else {
            return new Promise(resolve2 => {
                this.show(imageUrls,bool,resolve2);
            });
        }



    }

    onRequestClose(){

    }

    onFinish = (media, index, isSelected)=>{
        // alert(JSON.stringify(media));
        if(isSelected){
            this.setState(preState=>{
                return {visible:!this.state.visible};
            },()=>{
                // console.info("media",media);
                this.resolve&&this.resolve(media);
            });
        }
    }

    _goBack = ()=>{
        this.setState(preState=>{
            return ({
                visible:false
            });
        });
    };

    render() {
        ImageBrower.base = this;
        Tools.imageBrower = this;
        const {dataList,visible} = this.state;

        return(

            <Modal {...this.props}
                   animationType={"slide"}
                   visible={visible}
                   onRequestClose={()=> this.onRequestClose()}>

                <PhotoBrowser mediaList={dataList}
                              onBack={this._goBack}
                              initialIndex={0}
                              displayNavArrows={true}
                              displaySelectionButtons={true}
                              useCircleProgress={false}
                              alwaysShowControls={true}
                              displayActionButton={true}
                              startOnGrid={true}
                              enableGrid={true}
                              onSelectionChanged={this.onFinish}
                              itemPerRow={4}
                              onActionButton={(media, index) => {}}
                              displayTopBar={true}
                              alwaysDisplayStatusBar={true}
                              customTitle={(index, rowCount) => `${index} sur ${rowCount}`}
                />
            </Modal>
        );

    }

}
