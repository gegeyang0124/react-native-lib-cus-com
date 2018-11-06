import React, { Component } from 'react';
import {
    View,
    Modal,
    TouchableOpacity,
} from 'react-native';

import {
    StyleSheetAdapt,
    Tools,
} from "../api/api";

import Spinner from "react-native-spinkit";


export class Progress extends Component {

    static base:Progress;
    static visible = false;

    // 构造
    constructor(props) {
        super(props);

        Progress.base = this;
        // Tools.progress = this;

        // 初始状态
        this.state = {
            /*index: 0,
            types: ['CircleFlip', 'Bounce', 'Wave', 'WanderingCubes', 'Pulse', 'ChasingDots',
                'ThreeBounce', 'Circle', '9CubeGrid', 'WordPress', 'FadingCircle',
                'FadingCircleAlt', 'Arc', 'ArcAlt'],
            size: 100,
            color: "#d35400",*/
            visible: false,
            type:true, //进度条类型，true:'Wave',false:WanderingCubes,默认是：true
            width:StyleSheetAdapt.getWidth(100),
        };
    }

    /**
     * 显示加载进程条，
     * @param bool boolean,//true：显示，false，隐藏，默认为true
     * @param type boolean,//进度条类型，true:'Wave',false:WanderingCubes,默认是：true
     * **/
    show(bool,type){

        bool = bool == undefined ? true :bool;

        if(Progress.visible == bool){
            return;
        }
        Progress.visible = bool;

        type = type == undefined ? true :type;

        if(bool != this.state.visible || type != this.state.type)
        {
            this.setState({
                visible:bool,
                type:type
            });
        }
    }

    next() {
        if (this.state.index++ >= this.state.types.length)
            this.setState({index: 0})
        else
            this.setState({index: this.state.index++})
    }

    increaseSize() {alert("dsds")
        this.setState({size: this.state.size + 10});
    }

    changeColor() {alert("sdf")
        this.setState({color: '#'+Math.floor(Math.random() * 16777215).toString(16)});
    }

    changeVisibility() {
        this.setState({isVisible: !this.state.isVisible});
    }

    onRequestClose(){

    }

    render() {
        Tools.progress = this;

        if(!this.state.visible){
            return null;
        }

        if(!Tools.isIndicate){
            return null;
        }

        if(this.state.type)
        {
            // Tools.toast("visible:" + this.state.visible);
            return(
                <Modal {...this.props}
                       animationType={"none"}
                       // ref="progress"
                       transparent = {true}
                       visible={this.state.visible}
                       onRequestClose={()=> this.onRequestClose()}>
                    <TouchableOpacity activeOpacity={0}
                                      delayPressIn={0}
                                      style={styles.container}
                                      onPressIn={()=>{
                                          //Tools.toast("ds");
                                          this.show(false);
                                      }}>
                        <View style={styles.container}>
                            <Spinner style={styles.spinner}
                                     isVisible={this.state.visible}
                                     size={this.state.width}
                                     type={"Wave"}
                                     color={"#d35400"}/>
                        </View>

                    </TouchableOpacity>

                </Modal>
            );
        }
        else
        {
            let cont = this.state.visible
                ? <View style={styles.containerIndicator}>
                    <Spinner style={styles.spinner}
                             isVisible={true}
                             size={this.state.width}
                             type={"WanderingCubes"}
                             color={"#d35400"}/>
                </View>
                : null;
            return(
                cont
            );
        }


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
    indicator:{
        width:200,
        height:200,

    },
    containerIndicator:{
        position:'absolute',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width:Tools.screen.width,
        height:Tools.screen.height,
        backgroundColor: 'rgba(00, 00, 00, 0.8)',
        zIndex:111,
    }
});