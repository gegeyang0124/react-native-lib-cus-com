import React, {
    Component,
} from 'react'
import PropTypes from 'prop-types';
import {
    View,
    Modal,
    WebView,
} from 'react-native'

import {
    StyleSheetAdapt,
}from './../api/api';
import {ViewTitle} from "./ViewTitle";

/**
 * 浏览器（可设置成弹框出现，也可与页面合并兼容）的组件 ui控件（WebView） 支持html和uri（网页地址），并自动适配页面大小
 * **/
export class WebViewCus extends Component{

    static base;
    webView;//
    //属性注释及类型,所有的属性对象都是句柄模式（类型时number），类似C语言中的指针
    static propTypes = {
        isModal:PropTypes.bool,//是否使用弹出框，true: 是，false:否；// 默认是：true；
    };

    /**
     * 设置默认属性
     * **/
    static defaultProps = {
        isModal:true,
    }

    // 构造
    constructor(props) {
        super(props);

        WebViewCus.base = this;
        // 初始状态
        this.state = {
            visible: false,//'https://www.baidu.com/'
            urlHtml:null,//网页地址或html代码
            title:'',//网页title
            webHeight:0,// 内部网页高
        };
    }

    /**
     * 显示WebView
     * @param bool boolean;//是否显示WebView；显示：true,隐藏：false;默认false
     * @param urlHtml string;//网页地址或html代码
     * **/
    static show(bool?:boolean,urlHtml){
        bool == undefined ? false : true;
        if(urlHtml == undefined || urlHtml == ''){
            WebViewCus.base.setState({
                visible: bool,//是否显示
            });
        }
        else
        {
            if(urlHtml.indexOf("http") == 0)
            {
                WebViewCus.base.setState({
                    visible: bool,//是否显示
                    urlHtml:{
                        uri:urlHtml,
                        baseUrl:''
                    }
                });
            }
            else
            {
                WebViewCus.base.setState({
                    visible: bool,//是否显示
                    urlHtml:{
                        html:urlHtml,
                        baseUrl:''
                    }
                });
            }

        }

    }

    /**
     * 获取完整的html代码
     * @param html string;//html body中的代码
     * **/
    static getHtml(html){

        html = html == undefined ? '' : html;

        let HTML = `<!DOCTYPE html>
<html class="um landscape min-width-240px min-width-320px min-width-480px min-width-768px min-width-1024px">
<head>
	<title></title>
	<meta charset="utf-8">
	<meta name="viewport" content="target-densitydpi=device-dpi, width=device-width, initial-scale=1, user-scalable=yes, minimum-scale=1, maximum-scale=1">
	<style type="text/css">
		img{
			width: 100%;
			height:auto;
		}
	</style>
	<script type="text/javascript">
        window.onload=function(){
            window.location.hash = 1;
            document.title = document.body.clientHeight;
        }
	</script>
</head>
<body>
$replace
</body>
</html>`;

        HTML = HTML.replace('$replace', html);

        // console.info('Html',HTML);

        return HTML;
    }

    onShouldStartLoadWithRequest = (event) => {
        // Implement any custom loading logic here, don't forget to return!
        return true;
    };

    onNavigationStateChange = (navState) => {
        // alert(JSON.stringify(navState));
        if(this.props.isModal)
        {
            this.setState({
                // backButtonEnabled: navState.canGoBack,
                // forwardButtonEnabled: navState.canGoForward,
                // url: navState.url,
                title: navState.title,
                // loading: navState.loading,
                // scalesPageToFit: true
            });
        }
        else {
            // console.info('webHeight',navState);
            // alert(JSON.stringify(navState));

            let webHeight = navState.title == ''
                ? 0
                : parseInt(navState.title) > 0
                    ? (parseInt(navState.title) + StyleSheetAdapt.getHeight(50))
                    : 0;
            this.setState({
                // backButtonEnabled: navState.canGoBack,
                // forwardButtonEnabled: navState.canGoForward,
                // url: navState.url,
                webHeight:webHeight,
                // loading: navState.loading,
                // scalesPageToFit: true
            });
        }
    };

    onRequestClose(){

    }

    render() {

        if(this.props.isModal) {
            return (
                <Modal animationType={"slide"}
                       transparent = {true}
                       visible={this.state.visible == undefined
                           ? false
                           : this.state.visible}
                       onRequestClose={()=> this.onRequestClose()}>
                    <ViewTitle isDefaultOnPressLeft={false}
                               isNavigator={true}
                               isScroll={false}
                               text={this.state.title}
                               style={{flex: 1}}
                               onPressLeft={()=>{
                                   ///alert("sadf");

                                   this.setState({
                                       visible: false,
                                   });
                               }}>
                        {
                            this.state.visible
                                ? <View style={{flex: 1}}>
                                <WebView {...this.props}
                                         ref={ component => {

                                             this.webView = component;
                                             // this.barCode.startScan();

                                             return component;
                                         } }
                                         source={this.state.urlHtml == null
                                             ? {uri:'https://www.baidu.com/'}
                                             : this.state.urlHtml}
                                         scalesPageToFit={true}
                                         automaticallyAdjustContentInsets={true}
                                         javaScriptEnabled={true}
                                         domStorageEnabled={true}
                                         decelerationRate="normal"
                                         onNavigationStateChange={this.onNavigationStateChange}
                                         onShouldStartLoadWithRequest={this.onShouldStartLoadWithRequest}
                                         startInLoadingState={true}
                                         scrollEnabled={true}/>
                            </View>
                                : null
                        }

                    </ViewTitle>
                </Modal>
            );
        }
        else {
            return (
                <View style={{flex: 1}}>
                    <WebView {...this.props}
                             style={{
                                 height: this.state.webHeight,
                             }}
                             scalesPageToFit={true}
                             automaticallyAdjustContentInsets={true}
                             javaScriptEnabled={true}
                             domStorageEnabled={true}
                             decelerationRate="normal"
                             onNavigationStateChange={this.onNavigationStateChange}
                             onShouldStartLoadWithRequest={this.onShouldStartLoadWithRequest}
                             // startInLoadingState={true}
                             scrollEnabled={false}
                    />
                </View>
            );
        }

    }

}

const styles = StyleSheetAdapt.create({
    a: {
        fontWeight: '300',
        color: '#FF3366', // make links coloured pink
    },
});