/**
 * Created by Administrator on 2018/4/30.
 */
import PropTypes  from 'prop-types';
import React, {Component} from 'react';
import {
    View,
    Text,
    ScrollView,
    TextInput,
} from 'react-native';
import {
    StyleSheetAdapt,
    Tools,
    Theme,
} from "../api/api";

/**
 * 需要修改js封装层 leftText rightText 样式中flex去掉 ，
 * onClick事件传出是否选中，true或false ,改PropTypes.func.isRequired为非必须传入 PropTypes.func
 * leftText和rightText样式删掉
 * rightTextStyle和leftTextStyle样式改成PropTypes.oneOfType([
 PropTypes.array,
 PropTypes.object,
 PropTypes.number
 ])
 * **/
import CheckBox from 'react-native-check-box-zy';

/**
 * 行选择，默认垂直(或水平)显示选项选择,(单选或多选)
 * **/
export class ScrollSelectOptions extends Component{

    //属性注释及类型,所有的属性对象都是句柄模式（类型时number），类似C语言中的指针
    static propTypes = {
        frameStyle:PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.object,
            PropTypes.array
        ]),//按钮框样式
        chkFrame:PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.object,
            PropTypes.array
        ]),//选择框样式
        chkTextStyle:PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.object,
            PropTypes.array
        ]),//选择框 文本样式
        textStyle:PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.object,
            PropTypes.array
        ]),//文本样式
        type:PropTypes.string,//题型，单选：'select'；多选：selectMul;问答:'answer';默认是单选
        /**
         * 成员：{
            text：''//显示文本
            isChecked:false,//是否选中，默认不选中
            可以传更多字段，会回传回去
           }
         * **/
        dataList:PropTypes.array,//数组列
        /**
         * 单选：回传(isChecked,type,item,i,answerList) isChecked:是否选中，item：选中成员，
         type:问题类型;i：选中下标;answerList答案列表
         * 多选：回传(answerList,type,item,i) answerList成员中增加字段isChecked:是否选中; type:问题类型;
         * 问答：回传(text,type,item,i,this.props.dataList) text：答案文本; type:问题类型;
         */
        onChange:PropTypes.func,//选中或答题变化回调
        text:PropTypes.oneOfType([
            PropTypes.string,//显示文本
            PropTypes.object//显示UI
        ]),

        mode:PropTypes.string,//'answer':答题模式；'check':查看模式 默认是answer
        isScroll:PropTypes.bool,//是否滚动 默认true 滚动
        isReset:PropTypes.oneOfType([
            PropTypes.bool,//是否重置，如果没有选中的情况下是否重置，默认false 不重置，//只对单选/多选有效
            PropTypes.number // 是否重置 0==false; 1==true 2=='全局重置' //只对单选/多选有效
        ]),

        isHorizontal:PropTypes.bool,//是否水平排布，默认true竖直 暂时未实现

    };

    constructor(props) {
        super(props);
        this.state = {
            dataList:[],//答案列表
        };
    }

    /**
     * 设置默认属性
     * **/
    static defaultProps = {
        isScroll:true,
        isHorizontal:true,
        isProgress:true,
        dataList:[],
        type:'select',
        mode:'answer',
        isReset:false,
    }

    _onChecked = (isChecked,item,i)=>{
        const {type,onChange} = this.props;
        let {dataList} = this.state;
        if(type == 'select'){
            dataList.forEach((v,i,a)=>{
                v.isChecked = false;
            });
            dataList[i].isChecked = isChecked;
             /*console.info("dataList " + isChecked + " i: "
                 + i,dataList);*/
            // alert(JSON.stringify(dataList));

            // Tools.toast(JSON.stringify(dataList[i]))

            this.setState({
                dataList:dataList
            });

            onChange&&onChange(isChecked, type,dataList[i]
                ,i,dataList);

        }
        else if(type == 'selectMul'){
            dataList[i].isChecked = isChecked;
            onChange&&onChange(dataList,type,item,i);
        }
        else {
            onChange&&onChange(isChecked,type,this.props.dataList&&this.props.dataList[0],0,this.props.dataList);
        }
    }

    renderItem = (item, index) => {
        const {mode,chkFrame,isScroll,chkTextStyle} = this.props;
        // console.info("isChecked " + index + ":  ",item.isChecked||false);
        return (
            <CheckBox key={index}
                      disabled={mode == 'answer' ? false : true}
                      rightText={item.text}
                      style={[styles.chkFrame,isScroll && {} || styles.chkFrame1,chkFrame]}
                      isChecked={item.isChecked||false}
                      imageStyle={styles.chkImage}
                      onClick={(isChecked)=>{this._onChecked(isChecked,item,index)}}
                      rightTextStyle={[styles.rightTextStyle,isScroll&&{}||styles.rightTextStyle1,chkTextStyle]}/>
        )

    }

    getDataList(){
        const {dataList,mode} = this.props;

        let isReset = this.props.isReset;
       if(typeof isReset == 'boolean'){
           isReset = isReset ? 1 : 0;
       }

        let dL = [];
        dataList.forEach((v,i,a)=>{
            if(typeof v == 'string'){
                // dataList[i] = {text:v};
                v = {text:v};
            }

            dL.push(JSON.parse(JSON.stringify(v)));
        });

        let isChecked = false;
        this.state.dataList.forEach((v,i,a)=>{
            if(v.isChecked){
                isChecked = v.isChecked;
            }
        });

        if((isReset == 1) && !isChecked || isReset == 2){
            this.state.dataList = dL;
        }
        else {
            this.state.dataList = this.state.dataList.length > 0
                ? this.state.dataList
                : dL != null
                    ? dL
                    : [];
        }


        dL = this.state.dataList;

        // Tools.toast(JSON.stringify(dL));


        /*dataList.forEach((v,i,a)=>{
            // v.isChecked = mode == 'answer' ? false : v.isChecked;
        });*/


        // console.info("dL:",dL);
        // console.info("dataList:",dataList);

        return dL;
    }

    render() {

        const {isScroll,frameStyle,type,mode,text,textStyle} = this.props;

        const dataList = type !== "answer" ? this.getDataList() : null;
        // alert(JSON.stringify(dataList))

        return (
            isScroll &&
            <ScrollView style={frameStyle}>
                {

                    dataList !== null
                        ? dataList.map(this.renderItem)
                        : mode == 'answer'
                        ? <TextInput onChangeText={this._onChecked}
                                     multiline={true}
                                     placeholder={"请输入答案"}
                                     style={[styles.anserFrame_1,textStyle]}/>
                        : <Text style={[styles.anserFrame_1,textStyle]}>
                            {text}
                        </Text>
                }
            </ScrollView>
            ||
            <View style={[styles.frameStyle,frameStyle]}>
                {

                    dataList !== null
                        ? dataList.map(this.renderItem)
                        : mode == 'answer'
                        ? <TextInput onChangeText={this._onChecked}
                                     multiline={true}
                                     placeholder={"请输入答案"}
                                     style={[styles.anserFrame_1,textStyle]}/>
                        : <Text style={[styles.anserFrame_1,textStyle]}>
                            {text}
                        </Text>
                }
            </View>

        );
    }
}

const styles = StyleSheetAdapt.create({
    frameStyle:{
        flexDirection:'row',
        // backgroundColor:'yellow'
    },
    chkFrame:{
        margin:5,
    },
    chkFrame1:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
    },
    rightTextStyle:{
        fontSize:Theme.Font.fontSize_1,
        marginLeft:10,
    },
    rightTextStyle1:{
        marginLeft:0,
    },
    chkImage:{
        width:30,
        height:30,
        tintColor:Theme.Colors.themeColor,
    },

    anserFrame_1:{
        // backgroundColor:'red',
        width:'0.6w',
        height:300,
        alignItems:'center',
        justifyContent:'center',
        // justifyContent:'flex-start',
        backgroundColor:Theme.Colors.foregroundColor,
        borderRadius:Theme.Border.borderRadius,
        padding:5,
    },
});
