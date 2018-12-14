/**
 * Created by Administrator on 2018/5/3.
 */
import PropTypes  from 'prop-types';
import React, {Component} from 'react';
import {
    View,
    Text,
    TextInput,
} from 'react-native';

import {
    StyleSheetAdapt,
    Theme,
    Tools,
} from "./../api/api";
import {PickDropdown} from './PickDropdown';
import {ButtonImage} from './ButtonImage';
import Search from './../res/search.png';

/**
 * 具有 下拉框--输入框(或下拉框)--按钮 的类似搜索条件的UI
 * **/
export class SearchDropIpt extends Component {

    //属性注释及类型,所有的属性对象都是句柄模式（类型时number），类似C语言中的指针
    static propTypes = {
        frameStyle:PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.object,
            PropTypes.array
            //React.PropTypes.instanceOf(Message)
        ]),//外部框样式
        text1:PropTypes.string,//从左至右第一个显示文本
        text2:PropTypes.string,//从左至右第二个显示文本
        onPressSearch:PropTypes.func,//搜索按钮点击事件
        textChange:PropTypes.func,//输入文本变化事件
        placeholder:PropTypes.string,//输入框提示文本
        //所有属性附加到PickDropdown
        options:PropTypes.array,//第一个下拉框数据
        defaultIndex:PropTypes.number,//第一个下拉框属性 默认显示数据地址
        defaultValue:PropTypes.string,//第一个下拉框属性 默认显示数据
        onSelect:PropTypes.func,//下拉框选中事件 回传三个参数（i，item,type）,前两个继承以前的参数，第三个第几个下拉框的，0开始

        pickDropdownProps1:PropTypes.object,//第一个下拉框属性
        pickDropdownProps2:PropTypes.object,//第2个下拉框属性
    }

    /**
     * 设置默认属性
     * **/
    static defaultProps = {
        options:[],
        options2:[]
    }

    getPickDropdownProps(pickDropdownProps,type){
        pickDropdownProps = pickDropdownProps?pickDropdownProps:{};
        pickDropdownProps.onSelect= pickDropdownProps.onSelect
            ? pickDropdownProps.onSelect
            : (i,val)=>this.props.onSelect&&this.props.onSelect(i,val,type);

        if(type==0){

            pickDropdownProps.defaultIndex= pickDropdownProps.defaultIndex
                ? pickDropdownProps.defaultIndex
                : this.props.defaultIndex;

            pickDropdownProps.defaultValue= pickDropdownProps.defaultValue
                ? pickDropdownProps.defaultValue
                : this.props.defaultValue;

            pickDropdownProps.options= pickDropdownProps.options
                ? pickDropdownProps.options
                : this.props.options;
        }

        return pickDropdownProps;

    }

    render() {
        let {pickDropdownProps1,pickDropdownProps2} = this.props;

        pickDropdownProps1 = this.getPickDropdownProps(pickDropdownProps1,0);
        pickDropdownProps2 = this.getPickDropdownProps(pickDropdownProps2,1);

        return (
            <View style={[styles.searchFrame,this.props.frameStyle]}>
                <Text style={styles.searchText}>
                    {
                        this.props.text1 == undefined
                            ? '状态:'
                            : this.props.text1
                    }
                </Text>

                <PickDropdown {...pickDropdownProps1}
                              frameStyle={styles.searchFrameDropdown}/>

                <Text style={styles.searchText}>
                    {
                        this.props.text2 == undefined
                            ? '客户姓名:'
                            : this.props.text2
                    }
                </Text>

                {
                    pickDropdownProps2.options
                        ? <PickDropdown {...pickDropdownProps2}
                                        frameStyle={styles.searchFrameDropdown}/>
                        :   <TextInput style={styles.searchInput}
                                       placeholder={this.props.placeholder == undefined
                                           ? "请输入客户姓名"
                                           : this.props.placeholder}
                                       onChangeText={text => this.props.textChange == undefined
                                           ? null
                                           : this.props.textChange(text)}/>
                }

                <ButtonImage icon={Search}
                             style={styles.searchBtn}
                             iconStyle={styles.searchIcon}
                             onPress={()=>this.props.onPressSearch()}/>
            </View>
        );
    }
}

const styles = StyleSheetAdapt.create({
    searchFrame:{
        flexDirection:'row',
        padding:10,
        justifyContent:'center',
        alignItems:'center',
    },
    searchFrameDropdown:{
        marginRight:40,
        height:31.5,
    },
    searchText:{
        fontSize:Theme.Font.fontSize,
        padding:1,
        // marginLeft:20,
        // backgroundColor:'red',
        marginRight:10,
        alignSelf:'center',
    },
    searchInput:Tools.platformType
        ? {
            width:150,
            height:31.5,
            borderColor:Theme.Colors.borderColor,
            borderWidth:0.5,
            fontSize:Theme.Font.fontSize,
            color:"#000000",
        }
        :{
            width:150,
            // height:31.5,
            borderColor:Theme.Colors.borderColor,
            // borderWidth:0.5,
            fontSize:Theme.Font.fontSize,
            color:"#000000",

            padding:0,
            paddingBottom:5,
            paddingLeft:10,
        },
    searchBtn:{
        width:100,
        height:31.5,
        marginLeft:40,
        backgroundColor:Theme.Colors.backgroundColorBtn,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:8,
    },
    searchIcon:{
        width:28,
        height:28,
        tintColor:Theme.Colors.themeColor,
    },
});