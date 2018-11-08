/**
 * Created by Administrator on 2018/5/6.
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
import Search from 'lib-images-zy/search.png';

/**
 * 搜索组件 四个下拉框 一个输入框 一个搜索按钮
 * **/
export class SearchDDDIpt extends Component {

    //属性注释及类型,所有的属性对象都是句柄模式（类型时number），类似C语言中的指针
    static propTypes = {
        frameStyle:PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.object,
            PropTypes.array
            //React.PropTypes.instanceOf(Message)
        ]),//外部框样式
        /**
         * defaultValue={this.dropList.keyList[0]}
         options={this.dropList.keyList}
         onSelect={(i,val)=>this.onSelectDrop(i,val)}
         * **/
        options1:PropTypes.object,//第1个下拉框属性
        options2:PropTypes.object,//第2个下拉框属性
        options3:PropTypes.object,//第3个下拉框属性
        options4:PropTypes.object,//第4个下拉框属性-

        isPickDropdown1:PropTypes.bool,//是否显示第1个下拉框，默认显示true
        isPickDropdown2:PropTypes.bool,//是否显示第2个下拉框，默认显示true
        isPickDropdown3:PropTypes.bool,//是否显示第3个下拉框，默认显示true
        isPickDropdown4:PropTypes.bool,//是否显示第4个下拉框，默认不显示false-
        isTextInput:PropTypes.bool,//是否显示输入框，默认显示true
        isSearch:PropTypes.bool,//是否显示搜索按钮，默认显示true
        onPressSearch:PropTypes.func,//搜索按钮点击事件
        textChange:PropTypes.func,//输入文本变化事件
        placeholder:PropTypes.string,//输入框提示文本
        value:PropTypes.string,//输入框固定值

        inputStyle:PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.object,
            PropTypes.array
            //React.PropTypes.instanceOf(Message)
        ]),//输入框框样式

        btnStyle:PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.object,
            PropTypes.array
            //React.PropTypes.instanceOf(Message)
        ]),//按钮样式
        //所有属性附加到PickDropdown
    }

    /**
     * 设置默认属性
     * **/
    static defaultProps = {
        isPickDropdown1:true,
        isPickDropdown2:true,
        isPickDropdown3:true,
        isPickDropdown4:false,
        isTextInput:true,
        isSearch:true
    }

    pdID = {
        p1:null,
        p2:null,
        p3:null,
        p4:null
    }

    render() {

        const {isPickDropdown1,isPickDropdown2,isPickDropdown3,isPickDropdown4,options1,options2,
            options3,options4,placeholder, textChange,onPressSearch,frameStyle,btnStyle,
            isTextInput,isSearch,inputStyle} = this.props;

        return (
            <View style={[styles.searchFrame,frameStyle]}>

                {
                    isPickDropdown1 ?
                        <PickDropdown {...options1}
                                      refId={ (component) => {
                                          this.pdID.p1 = component;
                                          return component;
                                      } }
                                      defaultIndex={0}
                                      frameStyle={[styles.searchFrameDropdown,options1&&options1.frameStyle]}
                                      style={[styles.searchDropdown,options1&&options1.style]}/> :
                        null
                }

                {
                    isPickDropdown2 ?
                        <PickDropdown {...options2}
                                      refId={ (component)=> {
                                          this.pdID.p2 = component;
                                          return component;
                                      } }
                                      defaultIndex={0}
                                      frameStyle={[styles.searchFrameDropdown,options2&&options2.frameStyle]}
                                      style={[styles.searchDropdown,options2&&options2.style]}/> :
                        null
                }

                {
                    isPickDropdown3 ?
                        <PickDropdown {...options3}
                                      refId={ (component) => {
                                          this.pdID.p3 = component;
                                          return component;
                                      } }
                                      defaultIndex={0}
                                      frameStyle={[styles.searchFrameDropdown,options3&&options3.frameStyle]}
                                      style={[styles.searchDropdown,options3&&options3.style]}/> :
                        null
                }

                {
                    isPickDropdown4 ?
                        <PickDropdown {...options4}
                                      refId={ (component) => {
                                          this.pdID.p4 = component;
                                          return component;
                                      } }
                                      defaultIndex={0}
                                      frameStyle={[
                                          styles.searchFrameDropdown,
                                          options4&&options4.frameStyle
                                      ]}
                                      style={[
                                          styles.searchDropdown,
                                          options4&&options4.style
                                      ]}/>
                        :
                        null
                }


                {
                    isTextInput
                        ? <TextInput style={[styles.searchInput,inputStyle]}
                                     placeholder={placeholder}
                                     onChangeText={text => textChange == undefined
                                         ? null
                                         : textChange(text)}/>
                        : null
                }


                {
                    isSearch
                        ?  <ButtonImage icon={Search}
                                        style={[styles.searchBtn,btnStyle]}
                                        iconStyle={styles.searchIcon}
                                        onPress={onPressSearch}/>
                        : null
                }

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
        marginRight:10,
        height:Theme.Height.height2,
    },
    searchDropdown:{
        width:100,

        // flex:1,
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
            height:Theme.Height.height2,
            borderColor:Theme.Colors.borderColor,
            borderWidth:0.5,
            fontSize:Theme.Font.fontSize,
            color:"#000000",

            // flex:1,
        }
        :{
            width:150,
            // height:Theme.Height.height2,
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
        height:Theme.Height.height2,
        marginLeft:40,
        backgroundColor:Theme.Colors.themeColor,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:8,
    },
    searchIcon:{
        width:28,
        height:28,
        tintColor:Theme.Colors.foregroundColor,
    },
});