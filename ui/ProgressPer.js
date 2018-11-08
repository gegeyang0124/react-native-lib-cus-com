import React, { Component } from 'react';
import {
    View,
    Modal,
    TouchableOpacity,
    Text,
} from 'react-native';

import {
    StyleSheetAdapt,
    Tools,
} from "../api/api";

import * as Progress from 'react-native-progress';

/**
 * 进度条 显示进度
 * **/
export class ProgressPer extends Component {

    static base : ProgressPer;
    pv = false;//true：显示上传指示，false，隐藏，false

    // 构造
    constructor(props) {
        super(props);
        Tools.progressPer = this;
        ProgressPer.base = this;
        // 初始状态
        this.state = {
            visible: false,
            progress:0,//进度条进度0～1之间
            // pv:true,//true：显示进度，false，隐藏，默认为true

        };
    }
    /**
     * 显示加载进程条，
     * @param bool boolean,//true：显示，false，隐藏，默认为true
     * @param pv boolean,//true：显示进度，false，隐藏，默认为true
     * **/
    show(bool,pv){
        bool = bool == undefined ? true :bool;

        /* if(this.state.visible == bool){
             console.info("GG","GG")
             return;
         }*/

        this.pv = pv == undefined ? false :pv;

        this.setState({
            visible:bool,
        });
    }

    /**
     * 设置进度
     * @param progress int,//进度条进度0～1之间,默认为0
     * **/
    setPogress = (progress) =>{
        progress = progress == undefined ? 0 :progress;
        this.pv = true;
        let json = {
            progress:progress
        }
        !this.state.visible ? json["visible"] = true : null;

        // ProgressPer.visible = true;

        this.setState(json);
    }

    onRequestClose(){
        /*this.setState({
            visible:bool
        });*/
    }

    formatText = ()=>{
        let per = parseInt(this.state.progress * 1000) / 10;
        // console.info("progress",parseInt(this.state.progress * 1000) / 10);
        return per + "%";
    }

    render() {
        Tools.progressPer = this;
        return(

            <Modal {...this.props}
                   animationType={"none"}
                   ref="progress"
                   transparent = {true}
                   visible={this.state.visible}
                // style={{flex: 1, backgroundColor: '#000000',}}
                   onRequestClose={()=> this.onRequestClose()}>

                <TouchableOpacity activeOpacity={1}
                                  delayPressIn={0}
                                  style={styles.container}
                                  onPressIn={()=>{
                                      // Tools.toast("ds");
                                      // this.show(false);
                                  }}>


                    {
                        Tools.platformType || this.pv
                            ? <Progress.Circle size={StyleSheetAdapt.getWidth(110)} // 圆的直径
                                               progress={this.state.progress}
                                               unfilledColor="rgba(255,255,255,0.5)" // 剩余进度的颜色
                                               color={"#d35400"} // 颜色
                                               thickness={StyleSheetAdapt.getWidth(6)} // 内圆厚度
                                               showsText={true}//显示进度比文字
                                //indeterminate={true}
                                               textStyle={{fontSize:StyleSheetAdapt.getWidth(30),color:'#d35400'}}
                                               formatText={this.formatText}/>
                            :  <View style={styles.containerInner}>
                                <Progress.CircleSnail size={StyleSheetAdapt.getWidth(120)} // 圆的直径
                                                      color={"#d35400"} // 颜色
                                                      thickness={StyleSheetAdapt.getWidth(6)} // 厚度
                                                      animating={true}/>
                                <Text style={styles.textStyle}>上传中</Text>
                            </View>
                    }

                </TouchableOpacity>

            </Modal>

        );

    }

}


const styles = StyleSheetAdapt.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(00, 00, 00, 0.8)',
        // opacity:0.5,
    },
    containerInner: {

        justifyContent: 'center',
        alignItems: 'center',
    },
    textStyle: {
        position:'absolute',
        zIndex: 1111,
        color:"#d35400",
        fontSize:30,
    },
});