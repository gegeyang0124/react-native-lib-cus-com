import React, {Component} from 'react';
import PropTypes  from 'prop-types';
import {
    View,
    Text,
    TextInput,
} from 'react-native';
import {
    StyleSheetAdapt,
    Theme,
} from "../api/api";
import {ImageBg} from "./ImageBg";

import CheckBox from 'react-native-check-box';

import ImageIconQuesNum from 'images/iconQuesNum.png';

export class Question extends Component {

    //属性注释及类型,所有的属性对象都是句柄模式（类型时number），类似C语言中的指针
    static propTypes = {
        frameStyle:PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.object,
            PropTypes.array,
            //React.PropTypes.instanceOf(Message)
        ]),//框样式
        title:PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.object,
            //React.PropTypes.instanceOf(Message)
        ]),//标题文本
        titleNum:PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.object,
            PropTypes.number
            //React.PropTypes.instanceOf(Message)
        ]),//标题号
        mode:PropTypes.string,//'answer':答题模式；'check':查看模式 默认是answer
        /**
         * 成员:{
            text:'',文本
            isChecked:false/true,//是否选中，可不传，默认不选中false
            //可多传字段，成员电话回传
           }
         * **/
        answerList:PropTypes.array,//答案数组，选择题时有效
        textAnswer:PropTypes.string,//文本答案
        type:PropTypes.string,//题型，单选：'select'；多选：selectMul;问答:'answer';默认是单选
        /**
         * 单选：回传(isChecked,item,i,type,answerList) isChecked:是否选中，item：选中成员，
           type:问题类型;i：选中下标;answerList答案列表
         * 多选：回传(answerList,type) answerList成员中增加字段isChecked:是否选中; type:问题类型;
         * 问答：回传(text,type) text：答案文本; type:问题类型;
         */
        onChange:PropTypes.func,//选中或答题变化回调

    }

    constructor(props) {
        super(props);
        this.state = {
            answerList:[],//答案列表
        };
    }

    /**
     * 设置默认属性
     * **/
    static defaultProps = {
        type:'select',
        answerList:[],
        mode:'answer'
    }

    _onChecked = (isChecked,item,i)=>{
        // console.info("_onChecked",isChecked);
        const {type,onChange} = this.props;
        let {answerList} = this.state;
        if(type == 'select'){

            answerList.forEach((v,i,a)=>{
                if(item.indexParent == i){
                    v.isChecked = isChecked;
                }
                else {
                    v.isChecked = false;
                }

            });

            // answerList[item.indexParent].isChecked = isChecked;
            /*console.info("answerList " + isChecked + " item.indexParent: "
                + item.indexParent,answerList);*/
            // alert(JSON.stringify(answerList));

            this.setState({
                answerList:answerList
            });

            // alert(JSON.stringify(answerList));

           onChange&&onChange(isChecked, answerList[item.indexParent]
                ,item.indexParent,type,answerList);

        }
        else if(type == 'selectMul'){
            answerList[item.indexParent].isChecked = isChecked;
            this.setState({
                answerList:answerList
            });
            onChange&&onChange(answerList,type);
        }
        else {
            onChange&&onChange(isChecked,type);
        }
    }

    renderItem = (item,i)=>{
        const {type,mode} = this.props;

        // console.info("renderItem mode",mode);

        if(type !== 'answer'){
            if(item !== null){
                return(
                    <CheckBox key={i}
                              disabled={mode == 'answer' ? false : true}
                              rightText={item.text}
                              style={styles.bodyFrame3_chk}
                              rightTextStyle={styles.chkText}
                              isChecked={item.isChecked||false}
                              onClick={(isChecked)=>{this._onChecked(isChecked,item,i)}}
                              imageStyle={styles.chkImage}
                              checkBoxColor={Theme.Colors.themeColor}/>
                );
            }
            else {
                // console.info("item:",item);
                return(
                    <View key={i}
                          style={styles.bodyFrame3_chk}>

                    </View>
                );

            }

        }
        else {
            return(<TextInput />);
        }

    };

    renderAnsewer = (item,i) =>{
        return(
            <View key={"p" + i}
                  style={styles.anserFrame_1}>
                {
                    item.map(this.renderItem)
                }
            </View>
        )
    }


    getAnswerList(){
        let {answerList,mode} = this.props;
        // console.info("answerList s",answerList);
        this.state.answerList = this.state.answerList.length > 0
            ? this.state.answerList
            : answerList;

        answerList = this.state.answerList;


        // console.info("this.state",this.state);

        let lst = [];
        let len = 4;
        let quo = answerList.length / len;
        for(let i = 0; i < quo; i++){
            lst.push([]);
        }

        /*let rem = answerList.length % len;
        if(rem > 0){
            lst.push([]);
        }*/

        let index = -1;
        answerList.forEach((v,i,a)=>{
            // v.isChecked = mode == 'answer' ? false : v.isChecked;
            v.indexParent = i;
            (i % len) == 0 ? ++index : null;
            lst[index].push(v);
        });

        if(lst[index].length < 4){
            let l = len - (lst[index].length % len);
            for (let i = 0; i < l; i++){
                lst[index].push(null);
            }
        }

        // console.info("lst:",lst);
        // console.info("quo:",quo);
        // console.info("answerList e",lst);
        return lst;
    }

    renderContent = ()=>{
        const {type,mode,textAnswer} = this.props;
        // console.info("type",type)
        const answerList = type !== "answer" ? this.getAnswerList() : null;
        return(
            <View style={styles.anserFrame}>
                {
                    answerList !== null
                        ? answerList.map(this.renderAnsewer)
                        : mode == 'answer'
                        ? <TextInput onChangeText={this._onChecked}
                                     multiline={true}
                                     placeholder={"请输入答案"}
                                     style={[styles.anserFrame_1,styles.textStyle]}/>
                        : <Text style={[styles.anserFrame_1,styles.textStyle]}>
                            {textAnswer}
                        </Text>
                }
            </View>
        );
    }

    render() {

        const {frameStyle,title,titleNum} = this.props;

        return (
            <View style={[styles.frameStyle,frameStyle]}>
                <View style={styles.frameStyle_1}>
                    <ImageBg source={ImageIconQuesNum}
                           style={styles.imageStyle}>
                        <Text style={[styles.text,styles.textColorWhite]}>
                            {titleNum}
                        </Text>
                    </ImageBg>
                    <Text style={[styles.text,styles.textColorTheme]}>
                        {title}
                    </Text>
                </View>

                {
                    this.renderContent()
                }
            </View>
        );
    }
}

const styles = StyleSheetAdapt.create({
    frameStyle:{

    },
    frameStyle_1:{
        flexDirection:'row',
        alignItems:'center',
        // justifyContent:'center',
    },
    imageStyle:{
        width:Theme.Font.fontSize2,
        height:Theme.Font.fontSize2 + 'dw',
        alignItems:'center',
        justifyContent:'center',
    },
    text:{
        fontSize:Theme.Font.fontSize_1_1,
    },
    textColorTheme:{
        color:Theme.Colors.themeColor,
        marginLeft:5,
    },
    textColorWhite:{
        color:Theme.Colors.colorFontBtn,
    },

    anserFrame:{
        // marginTop:5,
    },
    anserFrame_1:{
        flex:1,
        marginLeft:Theme.Font.fontSize1 + 3,
        marginTop:5,
        flexDirection:'row',
        // justifyContent:'flex-start',
    },
    bodyFrame3_chk:{
        flex:1,
        // alignItems:'center',
        justifyContent:'center',
    },
    chkText:{
        fontSize:Theme.Font.fontSize_2,
        color:Theme.Colors.minorColor,
        marginLeft:3,
    },
    chkImage:{
        width:Theme.Font.fontSize_1,
        height:Theme.Font.fontSize_1 + "dw",
    },

    textStyle:{
        backgroundColor:Theme.Colors.foregroundColor,
        height:100,
        marginRight:30,
        borderRadius:Theme.Border.borderRadius,
        padding:5,
    }
});