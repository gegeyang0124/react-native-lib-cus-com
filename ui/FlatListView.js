/**
 * Created by Administrator on 2018/5/4.
 */
import React, {Component} from 'react';
import {
    View,
    Text,
    FlatList,
    ActivityIndicator,
} from 'react-native';

import {
    StyleSheetAdapt,
    Theme,
    Tools,
} from "./../api/api";

/**
 * 可上下拉、分页、懒加载UI
 * **/
export class FlatListView extends Component {

    //属性注释及类型,所有的属性对象都是句柄模式（类型时number），类似C语言中的指针
    static propTypes = {
    }

    static showFootConfig = {
        error:0,
        loading:1,
        noData:2,
        success:3
    }

    constructor(props) {
        super(props);
        // Tools.flatListView = this;
        // Tools.toast("ds")
        this.state = {
            showFoot:3,//显示列表控件的底部UI，0：失败，1：正在加载，2：没有数据，3:什么也没有；默认为3
        }
    }

    /**
     * 显示列表控件的底部UI
     * @param showFoot int;//0：失败，1：正在加载，2：没有数据，3:什么也没有；默认为3
     * **/
    showFooter(showFoot){
        showFoot = showFoot == undefined ? FlatListView.showFootConfig.success : showFoot;
        this.setState({
            showFoot:showFoot
        });
    }

    renderFooter(){
        if(this.state.showFoot === 0)
        {
            return (
                <View style={styles.footer}>
                    <Text>失败</Text>
                </View>
            );
        }
        else if (this.state.showFoot === 1) {
            return (
                <View style={styles.footer}>
                    <ActivityIndicator color={Theme.Colors.themeColor} />
                    <Text>正在加载...</Text>
                </View>
            );

        }
        else if(this.state.showFoot === 2)
        {
            return (
                <View style={styles.footer1}>
                    <Text style={styles.footer1Text}>
                        没有更多数据了
                    </Text>
                </View>
            );
        }
        else if(this.state.showFoot === 3)
        {
            //完成
            return (
                null
            );
        }
    }

    render() {
        Tools.flatListView = this;
        return (
            <FlatList {...this.props}
                      ListFooterComponent={()=>this.renderFooter()}
                      onEndReachedThreshold={1}
                      onEndReached={()=>{
                          if(this.state.showFoot != 2)
                          {
                              this.props.onEndReached == undefined
                                  ? null
                                  : this.props.onEndReached();
                          }
                      }}/>
        );
    }
}
const styles = StyleSheetAdapt.create({
    footer:{
        flexDirection:'row',
        height:24,
        justifyContent:'center',
        alignItems:'center',
        marginTop:10,
        marginBottom:10,
    },
    footer1:{
        height:30,
        alignItems:'center',
        justifyContent:'flex-start',
    },
    footer1Text:{
        color:'#999999',
        fontSize:14,
        marginTop:5,
        marginBottom:5,
    },
});