
import React, {Component} from 'react';
import PropTypes  from 'prop-types';
import {
    View,
} from 'react-native';

/**
 * View的升级版 增加左右滑动事件
 * **/
export class ViewCtrl extends Component {

    //属性注释及类型,所有的属性对象都是句柄模式（类型时number），类似C语言中的指针
    static propTypes = {
        onSwipeLeft:PropTypes.func,//左滑事件
        onSwipeRight:PropTypes.func,//右边滑事件
    }

    /**
     * 设置默认属性
     * **/
    static defaultProps = {
        isShowPillar:true,
        isShowIconLeft:true,
        isShowIconRight:true,
        isShowIconCenter:true,
        isDateUse:true,
        dateFormat:'YYYY年MM月',
        isDateToCur:true,
    }

    constructor(props) {
        super(props);
        this.viewLayoutStart = {};
    }

    _onResponderRelease = (e)=>{
        const {onSwipeLeft,onSwipeRight} = this.props;
        if((e.nativeEvent.pageX - this.viewLayoutStart.pageX) > 0){
            onSwipeRight&&onSwipeRight(e);
        }
        else if((e.nativeEvent.pageX - this.viewLayoutStart.pageX) < 0){
            onSwipeLeft&&onSwipeLeft(e);
        }
    }

    render() {


        return(
           <View {...this.props}
                 onMoveShouldSetResponder={(e)=>{
                     this.viewLayoutStart = e.nativeEvent;
                     return true;
                 }}
                 onResponderRelease={this._onResponderRelease}>
               {this.props.children}
           </View>
        );


    }
}
