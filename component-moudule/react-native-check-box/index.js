/**
 * Created by Administrator on 2018/6/25.
 */
/**
 * react-native-check-box
 * Checkbox component for react native, it works on iOS and Android
 * https://github.com/crazycodeboy/react-native-check-box
 * Email:crazycodeboy@gmail.com
 * Blog:http://www.devio.org
 * @flow
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    ViewPropTypes,
    Image,
    Text,
    TouchableHighlight
} from 'react-native';
import PropTypes from 'prop-types';


export default class CheckBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isChecked: false,
        }
    }
    static propTypes = {
        ...(ViewPropTypes || View.PropTypes),
        leftText: PropTypes.string,
        leftTextView: PropTypes.element,
        rightText: PropTypes.string,
        leftTextStyle: PropTypes.oneOfType([
            PropTypes.array,
            PropTypes.object,
            PropTypes.number
        ]),
        rightTextView: PropTypes.element,
        rightTextStyle: PropTypes.oneOfType([
            PropTypes.array,
            PropTypes.object,
            PropTypes.number
        ]),
        checkedImage: PropTypes.element,
        unCheckedImage: PropTypes.element,
        // onClick: PropTypes.func.isRequired,
        onClick: PropTypes.func,
        isChecked: PropTypes.bool.isRequired,
        isIndeterminate: PropTypes.bool.isRequired,
        checkBoxColor: PropTypes.string,
        disabled: PropTypes.bool,
        imageStyle: PropTypes.oneOfType([
            PropTypes.array,
            PropTypes.object,
            PropTypes.number
        ])//勾选框样式
    }
    static defaultProps = {
        // isChecked: false,
        isIndeterminate: false,
        leftTextStyle: {},
        rightTextStyle: {}
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (prevState.isChecked !== nextProps.isChecked) {
            return {
                isChecked: nextProps.isChecked
            };
        }
        return null;
    }
    onClick() {
        let isChecked = !this.state.isChecked;
        this.setState({
            isChecked: isChecked
        })
        this.props.onClick&&this.props.onClick(isChecked);
    }
    _renderLeft() {
        if (this.props.leftTextView)return this.props.leftTextView;
        if (!this.props.leftText)return null;
        return (
            <Text style={[styles.leftText, this.props.leftTextStyle]}>{this.props.leftText}</Text>
        );
    }
    _renderRight() {
        if (this.props.rightTextView)return this.props.rightTextView;
        if (!this.props.rightText)return null;
        return (
            <Text style={[styles.rightText, this.props.rightTextStyle]}>{this.props.rightText}</Text>
        );
    }

    _renderImage() {
        if (this.props.isIndeterminate){
            return this.props.indeterminateImage ? this.props.indeterminateImage : this.genCheckedImage();
        }
        if (this.state.isChecked) {
            return this.props.checkedImage ? this.props.checkedImage : this.genCheckedImage();
        } else {
            return this.props.unCheckedImage ? this.props.unCheckedImage : this.genCheckedImage();
        }
    }

    genCheckedImage() {
        var source;

        if(this.props.isChecked != null){
            this.state.isChecked = this.props.isChecked;
        }

        if (this.props.isIndeterminate) {
            source = require('./img/ic_indeterminate_check_box.png');
        }
        else {
            source = this.state.isChecked ? require('./img/ic_check_box.png') : require('./img/ic_check_box_outline_blank.png');
        }

        return (
            <Image source={source} style={[
                {tintColor: this.props.checkBoxColor},
                this.props.imageStyle
            ]} />
        );
    }

    render() {
        return (
            <TouchableHighlight
                style={this.props.style}
                onPress={()=>this.onClick()}
                underlayColor='transparent'
                disabled={this.props.disabled}
            >
                <View style={styles.container}>
                    {this._renderLeft()}
                    {this._renderImage()}
                    {this._renderRight()}
                </View>
            </TouchableHighlight>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    leftText: {
        // flex: 1,
    },
    rightText: {
        // flex: 1,
        // marginLeft: 10
    }
});
