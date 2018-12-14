import React, { Component,PureComponent } from 'react';
import PropTypes  from 'prop-types';
import {
    View,
    Modal,
    Image,
    TouchableOpacity,
    Slider,
} from 'react-native';

import Video from 'react-native-video';

import {
    StyleSheetAdapt,
    Tools,
} from "../api/api";

import imagePlay from './../res/play.png';
import imageScreenFull from './../res/screenFull.png';

export class VideoView extends PureComponent {

    //imageView = null;

    firstExe = true;
    video:Video;//video，实例
    slider:Slider;//video，实例


    /**设置默认属性
     * **/
    static defaultProps = {
        style:{
            width:StyleSheetAdapt.getWidth(200),
            height:StyleSheetAdapt.getHeight(200),
        },
    }

    // 构造
    constructor(props) {
        super(props);
        //ImageView.base = this;
        // 初始状态
        this.state = {
            play:false,//是否播放;true:是，false：否
            duration:0,//视频长度
            process:0,//视频进度
            fullScreen:false,//android是否全屏
            /*imageUrls:[],//显示图片数组路径
             imageIndex:0,//图片数据地址，第几张*/

        };

    }


    onRequestClose(){

    }

    render() {
        //alert(Tools.getStyle(this.props.style).width - StyleSheetAdapt.getWidth(65));
        return(

            <View >

                <View style={styles.container}>

                    <TouchableOpacity activeOpacity={1}
                                      style={styles.container}
                                      onPress={() =>{
                                          this.setState({
                                              play:!this.state.play
                                          });


                                      }}>
                        {
                            !this.state.play ? <Image source={imagePlay}
                                                      style={styles.iconPlay} /> :null
                        }

                        <Video {...this.props}
                               ref={(ref: Video) => {
                                   this.video = ref
                               }}
                            /* For ExoPlayer */
                            /* source={{ uri: 'http://www.youtube.com/api/manifest/dash/id/bf5bb2419360daf1/source/youtube?as=fmp4_audio_clear,fmp4_sd_hd_clear&sparams=ip,ipbits,expire,source,id,as&ip=0.0.0.0&ipbits=0&expire=19000000000&signature=51AF5F39AB0CEC3E5497CD9C900EBFEAECCCB5C7.8506521BFC350652163895D4C26DEE124209AA9E&key=ik0', type: 'mpd' }} */
                            // source={{ uri: "http://yyt.lexin580.com:8080/lx_yyt/upload/video/152333847013885374202_src.mp4"}}
                            //source={require('./video/bb.mp4')}
                               style={!Tools.platformType
                                   ? this.state.fullScreen
                                       ? styles.fullScreen
                                       : this.props.style
                                   : this.props.style}
                               rate={1}// 控制暂停/播放，0 代表暂停paused, 1代表播放normal.
                               paused={!this.state.play}
                               volume={1}                   // 声音的放大倍数，0 代表没有声音，就是静音muted, 1 代表正常音量 normal，更大的数字表示放大的倍数
                               muted={false}                  // true代表静音，默认为false.
                            // resizeMode='cover'       // 视频的自适应伸缩铺放行为，
                            //resizeMode='contain'       // 视频的自适应窗口大小，
                               resizeMode='stretch'       // 拉伸图片且不维持宽高比，直到宽高都刚好填满容器。，
                               onLoad={(data) => {
                                   //alert(JSON.stringify(data))

                                   if(!Tools.platformType)
                                   {
                                       this.setState({
                                           play:!this.state.play,
                                           duration: data.duration
                                       });
                                   }
                                   else
                                   {
                                       this.setState({
                                           duration: data.duration
                                       });
                                   }
                                   // setTimeout(()=>{
                                   //     this.setState({ duration: data.duration });
                                   // },0);
                               }}                       // 当视频加载完毕时的回调函数
                            //onLoadStart={this.loadStart}            // 当视频开始加载时的回调函数
                               onProgress={(data) =>{
                                   if(!Tools.platformType)
                                   {
                                       if(this.firstExe){
                                           this.firstExe = false;
                                           this.setState({
                                               play:!this.state.play,
                                           });
                                       }
                                       else if(data.currentTime > (this.state.duration - 0.25))
                                       {

                                           //Tools.toast("cur:" + data.currentTime + "   d:" + this.state.duration);
                                           this.setState({
                                               play:!this.state.play,
                                               process:0,
                                           });
                                           this.video.seek(0);

                                       }
                                       else
                                       {
                                           this.setState({
                                               process: data.currentTime
                                           });
                                       }
                                   }
                                   else
                                   {
                                       this.setState({
                                           process: data.currentTime
                                       });
                                   }

                               }}   //  进度控制，每250ms调用一次，以获取视频播放的进度
                               onEnd={()=>{
                                   if(Tools.platformType)
                                   {
                                       this.setState({
                                           play:!this.state.play,
                                           process:0,
                                       });
                                   }
                               }}             // 当视频播放完毕后的回调函数
                            //onError={this.videoError}    // 当视频不能加载，或出错后的回调函数
                               playInBackground={true}     // 当app转到后台运行的时候，播放是否暂停
                               playWhenInactive={false}     // [iOS] Video continues to play when control or notification center are shown. 仅适用于IOS
                               onAudioBecomingNoisy={this.onAudioBecomingNoisy}
                               onAudioFocusChanged={this.onAudioFocusChanged}
                               repeat={this.state.play}                            // 是否重复播放
                        />

                    </TouchableOpacity>
                </View>

                {
                    this.state.play ? <View style={styles.processView}>
                        <Slider
                            ref={(ref: Slider) => {
                                this.slider = ref
                            }}
                            style={[
                                {width:Tools.getStyle(this.props.style).width - StyleSheetAdapt.getWidth(20)},
                                styles.process]}
                            value={this.state.process}
                            maximumValue={this.state.duration}
                            step={1}
                            minimumTrackTintColor='#FF6B01'
                            onValueChange={(value) => {
                                /*this.setState({
                                 currentTime:value
                                 })*/
                                //Tools.toast(value)
                            }
                            }
                            onSlidingComplete={(value) => {
                                this.video.seek(value)
                                // Tools.toast("value:" + value)
                            }}
                        />
                        <TouchableOpacity activeOpacity={0}
                                          style={styles.iconFullScreenFrame}
                                          onPress={() =>{
                                              if(Tools.platformType)
                                              {
                                                  this.video.presentFullscreenPlayer();
                                              }
                                              else
                                              {
                                                  this.setState({
                                                      fullScreen:!this.state.fullScreen,
                                                  });
                                              }
                                          }}>
                            <Image source={imageScreenFull}
                                   style={styles.iconFullScreen}/>
                        </TouchableOpacity>

                    </View> : null
                }
            </View>
        );

    }

}


const styles = StyleSheetAdapt.create({
    container: {
        //flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        //backgroundColor: '#d35400',
    },
    spinner: {
        marginBottom: 50
    },
    iconPlay:{
        position: "absolute",
        zIndex: 10, //z轴方向的层级，越大越在顶部
    },
    fullScreen: {
        // width:200,
        // height:200,
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
    processView:{
        // justifyContent: 'center',
        alignItems: 'center',
        flexDirection:'row',
        zIndex: 10, //z轴方向的层级，越大越在顶部
        bottom:30,
        // left:15,
        // backgroundColor:'red',

    },
    process:{
        // position: "relative",
        // zIndex: 999, //z轴方向的层级，越大越在顶部
        // bottom: 10,
        // marginRight:10,
    },

    iconFullScreenFrame:{
        position: "absolute",
        // zIndex: 999, //z轴方向的层级，越大越在顶部
        //bottom: 0,
        width:30,
        height:30,
        right:15,
        //bottom:15,
    },
    iconFullScreen:{
        width:30,
        height:30,
        resizeMode:Image.resizeMode.contain,
    },
});