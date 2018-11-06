/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow TextInput自动提示输入
 */

import React, {Component} from 'react';
import PropTypes  from 'prop-types';
const RN = require("react-native");

export class Image extends Component {

    //属性注释及类型,所有的属性对象都是句柄模式（类型时number），类似C语言中的指针
    static propTypes = {
        refImage:PropTypes.func,//获取ImageBackground的ID
    }

    _refImage = (ref)=>{
        const {refImage} = this.props;
        if(ref != null){
            refImage&&refImage(ref._viewRef);
        }

    }

    render() {
        /*let resizeMode = Tools.getStyle(this.props.style).resizeMode;
        resizeMode = resizeMode == undefined ? 'contain' : resizeMode;*/
        let style = this.props.style ? this.props.style : {}

        return (

            <RN.ImageBackground {...this.props}
                                ref={this._refImage}
                                style={style}
                                imageStyle={[
                                    {resizeMode:'contain'},
                                    this.props.imageStyle
                                ]}/>
        );
    }
}
