import React, {Component} from 'react';
import PropTypes  from 'prop-types';
import {
    View,
    Text,
} from 'react-native';
import {
    Tools,
    StyleSheetAdapt,
    Theme,
} from "../api/api";

import {Question} from "./Question";

export class QuestionList extends Component {

    //属性注释及类型,所有的属性对象都是句柄模式（类型时number），类似C语言中的指针
    static propTypes = {
        frameStyle:PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.object,
            PropTypes.array,
            //React.PropTypes.instanceOf(Message)
        ]),//框样式
        isClear:PropTypes.bool,//是否刷新清除数据,默认false
        mode:PropTypes.string,//'answer':答题模式；'check':查看模式 默认是answer
        /**
         * 成员：{
            title:'',//标题
            type:'',//答题类型 单选：'select'；多选：selectMul;问答:'answer';默认是单选
            answerList 成员:{
            text:'',文本
            isChecked:false/true,//是否选中，可不传，默认不选中false
            //可多传字段，成员电话回传
           }
            answerList:[],//选择题供选答案，问答题可不传
           }
         * **/
        dataList:PropTypes.array,// 问题数组
        /**
         * //回传dataList 选择题answerList成员中含isChecked指示其是否选中
         * 问答题：dataList成员中增加answer字段存答案文本，未答无此字段
         * **/
        onChange:PropTypes.func,//答题变化回调,
    }

    constructor(props) {
        super(props);
        this.dataList = [];
    }

    /**
     * 设置默认属性
     * **/
    static defaultProps = {
        dataList:[],
        mode:'answer',
        isClear:false,
    }

    _onChange = (param1,param2,param3,param4,param5,item,i)=>{
        let {onChange,dataList} = this.props;
        if(param4){
            item.answerList = param5;
        }
        else if(param2 === "selectMul") {
            item.answerList = param1;
        }
        else {
            item.answer = param1;
        }

        dataList[i] = item;

        // console.info("this.dataList:",this.dataList)
        // this.dataList[i] = item;alert(JSON.stringify(this.dataList[i]))
        onChange&&onChange(dataList);
    }

    renderItem = (item,i)=>{
        const {mode} = this.props;
        return(
            <Question key={i}
                      frameStyle={styles.questionFrame}
                      type={item.type}
                      title={item.title}
                      mode={mode}
                      titleNum={++i}
                      textAnswer={item.answer}
                      onChange={(param1,param2,param3,param4,param5)=>{
                          this._onChange(param1,param2,param3,param4,param5,item,i);
                      }}
                      answerList={item.answerList}/>
        )
    }

    getDataList(){
        let {dataList,isClear} = this.props;
        dataList.forEach((v,i,a)=>{
            v.indexBase = i;
            // this.dataList.push(v);
        });

        return dataList;

        /*if(this.dataList.length == 0){
            dataList.forEach((v,i,a)=>{
                v.indexBase = i;
                this.dataList.push(v);
            });
        }
        else if(isClear) {
            this.dataList = [];
        }*/


    }

    render() {

        const {frameStyle} = this.props;
        const dataList = this.getDataList();
// console.info("mode",this.props.mode);
        return (
            <View style={[styles.questionFrame,frameStyle]}>
                {/*{this.dataList.map(this.renderItem)}*/}
                {dataList.map(this.renderItem)}
            </View>
        );
    }
}

const styles = StyleSheetAdapt.create({
    frameStyle:{},
    questionFrame:{
        marginTop:10,
    },
});