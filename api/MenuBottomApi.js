import React,{Component} from 'react';
import PropTypes  from 'prop-types';
import {
    View,
    TouchableOpacity,
} from 'react-native';
import RootSiblings from 'react-native-root-siblings';
/**
 * 需要修改底层
 * 将react的PropTypes换成
 * import PropTypes  from 'prop-types';
 * **/
import CustomActionSheet from 'react-native-menu-action-cus';
import {Tools} from "./Tools";
import {StyleSheetAdapt} from "./StyleSheetAdapt";
import {Theme} from "./Theme";
import {ButtonChange} from "./../ui/ButtonChange";
let showingDialog = null;

/**
 * 底部弹出菜单API
 * **/
export class MenuBottomApi extends Component{

    /**
     * 显示底部菜单
     * @param btnList array;//按钮
     * @returns Promise
     * 回传数据resolve={
      index:'',菜单下标
      .....
     }
     */
    static show(btnList=[]){
        return new Promise(resolve => {
            if(showingDialog != null){
                this.update(btnList,resolve);
            }
            else
            {
                showingDialog = new RootSiblings(<MenuBottom btnList={btnList}
                                                             onPress={(item)=>{
                                                                 resolve(item);
                                                             }}/>);
            }
            
        });


        return showingDialog;
    }

    /**
     * 隐藏底部菜单
     */
    static hide(){
        if (showingDialog != null && showingDialog instanceof RootSiblings) {
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

    /**
     * 显示底部菜单
     * @param btnList array;//按钮
     * @param resolve func;//回调函数
     * 回传数据resolve={
      index:'',菜单下标
      .....
     }
     */
    static  update(btnList=[],resolve){
        showingDialog&&showingDialog.update(<MenuBottom btnList={btnList}
                                         onPress={(item)=>{
                                             resolve&&resolve(item);
                                         }}/>);
    }

};

class MenuBottom extends Component {

    //属性注释及类型,所有的属性对象都是句柄模式（类型时number），类似C语言中的指针
    static propTypes = {
        frameStyle:PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.object,
            PropTypes.array
        ]),//按钮框样式
        textStyle:PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.object,
            PropTypes.array
        ]),//文本样式
        /**
         * 数组成员：
         {
         text:'',文本按钮
         onPress:func,点击事件，回传数组成员 若onPress属性存在此事件不执行
         }
         或是单成员字符串："文本按钮" string
         * **/
        btnList:PropTypes.array,//按钮数组
        onPress:PropTypes.func,//点击事件 回传（item,i）;item=>数据成员，i=》数组下标
    }

    static self;

    constructor(props) {
        super(props);

        this.btnList = [];//按钮列

    }

    /**
     * 设置默认属性
     * **/
    static defaultProps = {
        btnList:[],
    }

    _onPress = (item,i)=>{
        const {onPress} = this.props;
        // console.info("item",item);
        item.index = i;

        if(item.onPress){
            item.onPress(item,i);
        }
        else
        {
            MenuBottomApi.hide();
            onPress(item);

        }
    }

    renderItem = (item,i)=>{
        // textStyle={i == (this.btnList.length - 1) ? styles.btnTextStyle2 : styles.btnTextStyle}
        // frameStyle={i == (this.btnList.length - 1) ? {} : styles.btnFrame}
        return(
            <ButtonChange key={i}
                          text={item.text}
                          type={"light"}
                          style={[styles.btn,i == 0 ? styles.btnTop : {}]}
                          onPress={()=>this._onPress(item,i)}
                          textStyle={styles.btnTextStyle}
                          frameStyle={styles.btnFrame}/>
        );
    };

    getFrameStyle(){
        const {btnList} = this.props;
        const style = Tools.getStyle(styles.btn);
        const style2 = Tools.getStyle(styles.frameStyle);

        // console.info("btnList",btnList);
        return {
            height:style.height * (btnList ? btnList.length : 0) + style2.paddingBottom * 2
        };
    }

    getBtnList(){
        const {btnList} = this.props;
        let btnL = [];
        btnList.forEach((v,i,a)=>{
            if(typeof v == 'string'){
                btnL.push({
                    text:v
                });
            }
            else
            {
                btnL.push(v);
            }
        });

        // console.info("btnList",btnList);

      /*  btnL.push({
            text:"取消"
        });*/

        return btnL;
    }

    render() {
        // MenuBottom.self = this;
        //const {isVisible} = this.state;

        this.btnList = this.getBtnList();
        const frameStyleHeight = this.getFrameStyle();
        /* onCancel 点击取消按钮 触发事件*/
        return(
            <CustomActionSheet backgroundColor={Theme.Colors.transparent}
                               frameStyle={[styles.frameStyle,frameStyleHeight]}
                               buttonText={"取消"}
                               modalVisible={true}
                               onCancel={()=>MenuBottomApi.hide()}>
                {
                    this.btnList.map(this.renderItem)
                }
            </CustomActionSheet>
        );
    }
}

const styles = StyleSheetAdapt.create({
    frameStyle:{
        backgroundColor:Theme.Colors.foregroundColor,
        borderRadius: 5,
        // paddingBottom:40,
        paddingBottom:30,
        paddingTop:30,
    },

    btnFrame:{
        // marginTop:10,
        // borderTopWidth:Theme.Border.borderWidth,
        borderBottomWidth:Theme.Border.borderWidth,
        borderColor:Theme.Colors.themeColor,
    },
    btn:{
        borderRadius: 0,
        height:50,
        // flex:1,
        // flexDirection:"row",
        // width:StyleSheetAdapt.getWidth() - StyleSheetAdapt.getWidth(10)
        backgroundColor:Theme.Colors.foregroundColor,
    },
    btnTop:{
        borderTopWidth:Theme.Border.borderWidth,
        borderColor:Theme.Colors.themeColor,
    },
    btnTextStyle:{
        color:Theme.Colors.themeColor,
    },
    btnTextStyle2:{
        color:Theme.Colors.backgroundColor3,
    }
});