/**
 * Created by ken on 2016/11/13.
 */

import React,{Component} from 'react';
import PropTypes  from 'prop-types';
import {
    View,
    ActivityIndicator,
    StyleSheet,
    Modal,
    Dimensions,
    Animated,
    Easing,
    Text
} from 'react-native';
import RootSiblings from 'react-native-root-siblings'
var {width, height} = Dimensions.get('window');

const  ANIMATED_DURATION = 250;
let showingDialog = null;

export default class KActivityIndicator extends Component{
    static animated = true
    static message = '数据加载中 ..';
    static loadding = false;
    static countShow = 0;
    static countHide = 0;

    /**
     * 显示菊花
     * @param animated 是否显示出现和消失动画
     * @param message 菊花底部文字
     * @returns {SiblingsManager}
     */
    static show(animated=true, message){
        this.countShow++;
        if(this.loadding && showingDialog != null){
            return showingDialog;
        }

        this.loadding = true;
        KActivityIndicator.animated = animated;
        KActivityIndicator.message = message !=null? message: KActivityIndicator.message;

        showingDialog = new RootSiblings(<ActivityIndicatorContent
            animated={KActivityIndicator.animated}
            message={KActivityIndicator.message}
        />)


        return showingDialog;
    }

    /**
     * 隐藏菊花
     * @param AIV 需要隐藏的菊花
     */
    static hide(AIV){

        if (showingDialog != null && showingDialog instanceof RootSiblings) {

            // console.info("this.countHide=" + this.countHide + ",this.countShow=",this.countShow);

            if(++this.countHide == this.countShow){
                this.loadding = false;
                // showingDialog.update(<ActivityIndicatorContent
                //     animated={KActivityIndicator.animated}
                //     message={KActivityIndicator.message}
                //     isHide={true}
                //
                // />)
                //
                // showingDialog = null;
                showingDialog.destroy();
                showingDialog = null;
            }

            // if (AIV instanceof RootSiblings) {
            //
            //     AIV.update(<ActivityIndicatorContent
            //         animated={KActivityIndicator.animated}
            //         message={KActivityIndicator.message}
            //         isHide={true}
            //     />)
            // }
        }
    }

    /**
     * 更新菊花文字
     * @param AIV 需要更新文字的菊花
     * @param message 文字内容
     */
    static  updateMessage(AIV,message){
        AIV.update(<ActivityIndicatorContent
            animated={KActivityIndicator.animated}
            message={message}
        />)
    }

};

/**
 * 菊花内部模块
 */
class ActivityIndicatorContent extends Component{

    constructor(props) {
        super(props);
        this.state = {
            opacity:new Animated.Value(0)
        };
    }

    static defaultProps={
        animated:true,
        isHide:false

    }
    static propTypes={
        animated:PropTypes.bool,
        message:PropTypes.string,
        updateMessage:PropTypes.func,
        isHide:PropTypes.bool
    }
    render(){
        return(
            <View style={[styles.background,this.props.styles]}>
                <Animated.View style={[styles.activeBg,{opacity:this.state.opacity}]}>
                    {
                        this.props.animated&&<ActivityIndicator
                            animating={this.props.animated}
                            size="large"
                        />
                    }
                    {this._messageView()}
                </Animated.View>
            </View>
        )

    }
    _messageView(){
        if (this.props.message){
            return(
                <Text style={styles.message}>
                    {this.props.message}
                </Text>
            )
        }
    }
    componentDidMount() {
        this._show();

    }

    componentDidUpdate() {
        if (this.props.isHide) {
            this._hide()
        }
    }
    componentWillUnmount(){
        this._hide();
    };
    _show(){
        Animated.timing(this.state.opacity,{
            toValue: 1,
            duration: this.props.animated ? ANIMATED_DURATION : 0,
            easing: Easing.out(Easing.ease)
        }).start()

    }
    _hide(){
        Animated.timing(this.state.opacity, {
            toValue: 0,
            duration: this.props.animated ? ANIMATED_DURATION : 0,
            easing: Easing.in(Easing.ease)
        }).start(({finished})=>{
            if(finished){
                this.props.siblingManager.destroy()
            }
        });
    };
}




const styles = StyleSheet.create({
    background:{
        backgroundColor:'rgba(0,0,0,0.05)',
        justifyContent:'center',
        alignItems:'center',
        position:'absolute',
        width:width,
        height:height,
        left:0,
        top:0
    },
    activeBg:{
        padding:15,
        backgroundColor:'black',
        borderRadius:7,
        justifyContent:'center',
        alignItems:'center'
    },
    message:{
        color:'white',
        fontSize:15,
        marginTop:5,
        opacity:0.8
    }


});
