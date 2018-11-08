import * as TD from "react-native-talkingdata";

export default class StackPages {
    /**
     * 页面数据列
     * 成员
     * {'屏幕名':实例}
     * **/
    static stackPages = {};

    /**
     * 页面详细结构
     * **/
    static stackPagesStruct = null;

    static stackPagesHistory = [];

    static curPageState = {
        routeName:null,
        params:null,
        action:null,
        isExe:true,//是否页面可以执行
    }

    static componentWillExit(){
        if(StackPages.stackPagesHistory.length > 0){
            let page = StackPages.stackPagesHistory[StackPages.stackPagesHistory.length - 1];

            TD.trackPageEnd(page.routeName);

            let clsPre = StackPages.stackPages[page.routeName].screen.prototype;;
            if(clsPre.context){
                // clsPre.context.componentWillExit&&clsPre.context.componentWillExit.bind(clsPre.context);
                clsPre.context.componentWillExit&&clsPre.context.componentWillExit(
                    page.params,
                    page.action,
                    page.routeName);
            }
        }
    }

    static componentWillEnter(routeName,params){
        let cls = StackPages.stackPages[routeName].screen.prototype;

        if(cls.context){
            StackPages.curPageState = params ? params : {};
            StackPages.curPageState.routeName = routeName;
            TD.trackPageBegin(routeName);

            // cls.context.componentWillEnter&&cls.context.componentWillEnter.bind(cls.context);
            //第二个参数是否返回，true进入，false： 返回
            cls.context.componentWillEnter&&cls.context.componentWillEnter(
                StackPages.curPageState.params,
                StackPages.curPageState.action,
                StackPages.curPageState.routeName);

            StackPages.stackPagesHistory.push(StackPages.curPageState);
            // StackPages.curPageState.isExe = true;
        }

        // console.info("this.navState:", this.navState);
        // console.info("StackPages.curPageState:", StackPages.curPageState);
    }

}