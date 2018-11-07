import React, {
    Component,
} from 'react'
import {
    View,
    Modal,
} from 'react-native'

/**
 * 二维码库中将react的PropTypes换成
 * import PropTypes  from 'prop-types';
 * PropTypes已经从react中单独提取出来
 * android 需要修改 RCTCapturePackage中的List的继承去掉
 * **/
// import Barcode from 'react-native-smart-barcode'
import {Components} from "./../StackComponent";
const Barcode = Components.react_native_smart_barcode;
import TimerEnhance from 'react-native-smart-timer-enhance-zy'

import {ViewTitle} from "./ViewTitle";
import {Tools} from "../api/Tools";

/**
 * 二维码及条形码扫描组件
 * **/
class BarcodeView extends Component{

    static base:BarcodeView;
    resolvePromise;//Promise成功回调
    barCode:Barcode;//

    // 构造
    constructor(props) {
        super(props);

        if(!Barcode){
            console.info("请安装二维码及条形码扫描组件","react-native-smart-barcode");
            Tools.toast("请安装组件 react-native-smart-barcode");
        }

        BarcodeView.base = this;
        // 初始状态
        this.state = {
            visible: false,
        };
    }

    componentDidMount() {
        /*let viewAppearCallBack = (event) => {
         this.setTimeout( () => {
         this.setState({
         viewAppear: true,
         })
         }, 255)

         }
         this._listeners = [
         this.props.navigator.navigationContext.addListener('didfocus', viewAppearCallBack)
         ]*/
    }

    componentWillUnmount () {
        // this._listeners && this._listeners.forEach(listener => listener.remove());
    }

    onBarCodeRead = (e) => {
        /*console.log(`e.nativeEvent.data.type = ${e.nativeEvent.data.type}, e.nativeEvent.data.code = ${e.nativeEvent.data.code}`)
         this.barCode.stopScan();
         Alert.alert(e.nativeEvent.data.type, e.nativeEvent.data.code, [
         {text: 'OK', onPress: () => this.startScan()},
         ])*/

        this.barCode.stopScan();
        this.setState({
            visible: false,
        });
        this.resolvePromise(e.nativeEvent.data.code);
    }

    /**
     * 开始扫描1D/2D码
     * **/
    static startScan(){
        // BarcodeView.base.barCode.startScan();
        return new Promise(function (resolve,reject) {
            setTimeout(()=>{

                BarcodeView.base.barCode.startScan();
                // BarcodeView.base.forceUpdate();

            },500);

            BarcodeView.base.resolvePromise = resolve;
            BarcodeView.base.setState({
                visible: true,
            });



        });
    }

    /**
     * 开始扫描1D/2D码
     * **/
    startScan(){
        // BarcodeView.base.barCode.startScan();
        return new Promise(function (resolve,reject) {
            setTimeout(()=>{

               this.barCode.startScan();
                // BarcodeView.base.forceUpdate();

            },500);

            this.resolvePromise = resolve;
            this.setState({
                visible: true,
            });



        });
    }

    /*stopScan = (e) => {
     this.barCode.stopScan();
     }*/

    onRequestClose(){

    }

    render() {
        BarcodeView.base = this;
        if(Barcode){
            return (
                <Modal animationType={"slide"}
                       transparent = {true}
                       visible={this.state.visible}
                       onRequestClose={()=> this.onRequestClose()}>
                    <ViewTitle isDefaultOnPressLeft={false}
                               isNavigator={true}
                               isScroll={false}
                               text={"扫描二维码/条形码"}
                               style={{flex: 1, backgroundColor: '#000000',}}
                               onPressLeft={()=>{
                                   ///alert("sadf");
                                   this.barCode.stopScan();

                                   this.setState({
                                       visible: false,
                                   });
                               }}>
                        {
                            this.state.visible
                                ? <View style={{flex: 1, backgroundColor: 'black',}}>
                                    <Barcode {...this.props}
                                             style={{flex: 1, }}
                                             ref={ component => {

                                                 this.barCode = component;
                                                 // this.barCode.startScan();

                                                 return component;
                                             } }
                                             onBarCodeRead={this.onBarCodeRead}/>

                                </View>
                                : null
                        }

                    </ViewTitle>
                </Modal>
            );
        }
        return (null);


    }



}

export default TimerEnhance(BarcodeView)