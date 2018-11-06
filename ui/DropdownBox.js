/**
 * Created by sohobloo on 16/9/13.
 */


'use strict';

import React, {
    Component,
} from 'react';

import {
    StyleSheet,
    Dimensions,
    View,
    Text,
    ListView,
    TouchableWithoutFeedback,
    TouchableNativeFeedback,
    TouchableOpacity,
    TouchableHighlight,
    Modal,
    ActivityIndicator,
} from 'react-native';

import PropTypes from 'prop-types';
import {
    StyleSheetAdapt,
    Theme,
} from "../api/api";
import {TextChange} from "./TextChange";

/**
 * 将样式leftTextStyle增加数组样式
 * **/
import CheckBox from 'react-native-check-box';

const TOUCHABLE_ELEMENTS = [
    'TouchableHighlight',
    'TouchableOpacity',
    'TouchableWithoutFeedback',
    'TouchableNativeFeedback'
];

/**
 * 下拉框
 * **/
export class DropdownBox extends Component {
    static propTypes = {
        multiple:PropTypes.bool,//单选或多选，true：多选，false：单选；默认是false
        disabled: PropTypes.bool,
        scrollEnabled: PropTypes.bool,
        defaultIndex: PropTypes.number,
        defaultValue: PropTypes.string,
        /**
         * options数组成员是{
           isChecked:true/false,//可不传
           name:'',//显示数据value//存入数据 不需要
            }//回传数据
         ,或'XX'字符成员，回传'XX'

         onSelect回传 单选，选中元素；多选选中数据数组
         * **/
        options: PropTypes.array,

        accessible: PropTypes.bool,
        animated: PropTypes.bool,
        showsVerticalScrollIndicator: PropTypes.bool,
        keyboardShouldPersistTaps: PropTypes.string,

        style: PropTypes.oneOfType([PropTypes.number, PropTypes.object, PropTypes.array]),
        textStyle: PropTypes.oneOfType([PropTypes.number, PropTypes.object, PropTypes.array]),
        dropdownStyle: PropTypes.oneOfType([PropTypes.number, PropTypes.object, PropTypes.array]),
        dropdownTextStyle: PropTypes.oneOfType([PropTypes.number, PropTypes.object, PropTypes.array]),
        dropdownTextHighlightStyle: PropTypes.oneOfType([PropTypes.number, PropTypes.object, PropTypes.array]),

        adjustFrame: PropTypes.func,
        renderRow: PropTypes.func,
        renderSeparator: PropTypes.func,
        renderButtonText: PropTypes.func,

        onDropdownWillShow: PropTypes.func,//下拉框展示前执行
        onDropdownDidShow:PropTypes.func,//下拉框已经打开 执行
        onDropdownWillHide: PropTypes.func,//下拉框将要隐藏 执行
        onDropdownDidHide: PropTypes.func,//框已经隐藏 执行
        onSelect: PropTypes.func, //单选回传选中值，第一个参数，选中的数组地址；第二个参数数组中选中成员
        defaultSelectedIndex:PropTypes.number,//选中数据在数组的中的地址，不设置择无效
    };

    static defaultProps = {
        multiple:false,
        disabled: false,
        scrollEnabled: true,
        defaultIndex: -1,
        defaultValue: 'Please select...',
        // options: null,
        options: [],
        animated: true,
        showsVerticalScrollIndicator: true,
        keyboardShouldPersistTaps: 'never'
    };

    constructor(props) {
        super(props);

        this._button = null;
        this._buttonFrame = null;
        this._nextValue = null;
        this._nextIndex = null;
        this._selectData = [];//多选数据
        this._selectDataText = [];//多选数据显示文本
        this._dataSourceList = [];//数据源列表

        this.state = {
            accessible: !!props.accessible,
            loading: !props.options,
            showDropdown: false,
            buttonText: props.defaultValue,
            selectedIndex: props.defaultIndex
        };
    }

    componentWillReceiveProps(nextProps) {
        let {buttonText, selectedIndex} = this.state;
        const {defaultIndex, defaultValue, options} = nextProps;
        buttonText = this._nextValue == null ? buttonText : this._nextValue;
        selectedIndex = this._nextIndex == null ? selectedIndex : this._nextIndex;
        if (selectedIndex < 0) {
            selectedIndex = defaultIndex;
            if (selectedIndex < 0) {
                buttonText = defaultValue;
            }
        }
        this._nextValue = null;
        this._nextIndex = null;

        this.setState({
            loading: !options,
            buttonText,
            selectedIndex
        });
    }

    render() {
        return (
            <View {...this.props}>
                {this._renderButton()}
                {this._renderModal()}
            </View>
        );
    }

    _updatePosition(callback) {
        if (this._button && this._button.measure) {
            this._button.measure((fx, fy, width, height, px, py) => {
                this._buttonFrame = {x: px, y: py, w: width, h: height};
                callback && callback();
            });
        }
    }

    show() {
        this._updatePosition(() => {
            const {onDropdownDidShow} = this.props;
            this.setState({
                showDropdown: true
            });
            (!onDropdownDidShow || onDropdownDidShow(true))
        });
    }

    hide() {
        const {onDropdownDidHide} = this.props;
        this.setState({
            showDropdown: false
        });
        (!onDropdownDidHide || onDropdownDidHide(false))

    }

    select(idx) {
        const {defaultValue, options, defaultIndex, renderButtonText} = this.props;

        let value = defaultValue;
        if (idx == null || !options || idx >= options.length) {
            idx = defaultIndex;
        }

        if (idx >= 0) {
            value = renderButtonText ? renderButtonText(options[idx]) : options[idx].toString();
        }

        this._nextValue = value;
        this._nextIndex = idx;

        this.setState({
            buttonText: value,
            selectedIndex: idx
        });
    }

    _renderButton() {
        const {disabled, accessible, children, textStyle,options,defaultSelectedIndex} = this.props;
        const {buttonText} = this.state;

        return (
            <TouchableOpacity ref={button => this._button = button}
                              disabled={disabled}
                              accessible={accessible}
                              onPress={this._onButtonPress}
            >
                {
                    children ||
                    (
                        <View style={styles.button}>
                            <Text style={[styles.buttonText, textStyle]}
                                  numberOfLines={1}
                            >
                                {
                                    defaultSelectedIndex == undefined ?
                                        buttonText :
                                        options[defaultSelectedIndex].name == undefined ?
                                            options[defaultSelectedIndex] :
                                            options[defaultSelectedIndex].name
                                }
                            </Text>
                        </View>
                    )
                }
            </TouchableOpacity>
        );
    }

    _onButtonPress = () => {
        const {onDropdownWillShow} = this.props;
        if (!onDropdownWillShow ||
            onDropdownWillShow() !== false) {
            this.show();
        }
    };

    _renderModal() {
        const {animated, accessible, dropdownStyle,multiple} = this.props;
        const {showDropdown, loading} = this.state;
        if (showDropdown && this._buttonFrame) {
            const frameStyle = this._calcPosition();
            const animationType = animated ? 'fade' : 'none';//œalert(JSON.stringify(frameStyle))
            return (
                <Modal animationType={animationType}
                       visible={true}
                       transparent={true}
                       onRequestClose={this._onRequestClose}
                       supportedOrientations={['portrait', 'portrait-upside-down', 'landscape', 'landscape-left', 'landscape-right']}
                >

                    <TouchableWithoutFeedback accessible={accessible}
                                              disabled={!showDropdown}
                                              onPress={()=>{
                                                  multiple ? this._onMultiplePress() : this._onModalPress();
                                              }}>

                        <View style={styles.modal}>
                            <View style={[styles.dropdown, dropdownStyle, frameStyle]}>
                                {loading ? this._renderLoading() : this._renderDropdown()}
                            </View>

                            {
                                multiple
                                    ? <View style={[{backgroundColor:"white"}, dropdownStyle, frameStyle]}>
                                        <TextChange style={styles.multipleBtn}
                                                    textStyle={styles.multipleBtnText}
                                                    onPress={()=>this._onMultiplePress()}
                                                    text={"确定"}/>
                                    </View>
                                    : null
                            }

                        </View>

                    </TouchableWithoutFeedback>

                </Modal>
            );
        }
    }

    _calcPosition() {
        const {dropdownStyle, style, adjustFrame} = this.props;

        const dimensions = Dimensions.get('window');
        const windowWidth = dimensions.width;
        const windowHeight = dimensions.height;

        const dropdownHeight = (dropdownStyle && StyleSheet.flatten(dropdownStyle).height) ||
            StyleSheet.flatten(styles.dropdown).height;

        const bottomSpace = windowHeight - this._buttonFrame.y - this._buttonFrame.h;
        const rightSpace = windowWidth - this._buttonFrame.x;
        const showInBottom = bottomSpace >= dropdownHeight || bottomSpace >= this._buttonFrame.y;
        const showInLeft = rightSpace >= this._buttonFrame.x;
        const dpHeight = dropdownHeight >= bottomSpace ? bottomSpace * 0.9 : dropdownHeight;

        const positionStyle = {
            // height: dropdownHeight,
            height: dpHeight,
            top: showInBottom ? this._buttonFrame.y + this._buttonFrame.h : Math.max(0, this._buttonFrame.y - dropdownHeight),
        };

        const dropdownWidth = (dropdownStyle && StyleSheet.flatten(dropdownStyle).width) ||
            (style && StyleSheet.flatten(style).width) || -1;

        if (showInLeft) {
            positionStyle.left = this._buttonFrame.x;
        } else {

            if (dropdownWidth !== -1) {
                positionStyle.width = dropdownWidth;
            }
            positionStyle.right = rightSpace - this._buttonFrame.w;
        }

        const posiStyleObj = {
            positionStyle:positionStyle,
            multipleBtnStyle:JSON.parse(JSON.stringify(positionStyle))
        }

        posiStyleObj.multipleBtnStyle.left += (dropdownWidth + StyleSheetAdapt.getWidth(100));

        // return adjustFrame ? adjustFrame(positionStyle) : positionStyle;
        return adjustFrame ? adjustFrame(positionStyle) : positionStyle;
    }

    _onRequestClose = () => {
        const {onDropdownWillHide} = this.props;
        if (!onDropdownWillHide ||
            onDropdownWillHide() !== false) {
            this.hide();
        }
    };

    _onModalPress = () => {
        const {onDropdownWillHide} = this.props;
        if (!onDropdownWillHide ||
            onDropdownWillHide() !== false) {
            this.hide();
        }
    };

    _renderLoading() {
        return (
            <ActivityIndicator size='small'/>
        );
    }

    _renderDropdown() {
        const {scrollEnabled, renderSeparator, showsVerticalScrollIndicator, keyboardShouldPersistTaps} = this.props;
        return (
            <ListView scrollEnabled={scrollEnabled}
                      style={styles.list}
                      dataSource={this._dataSource}
                      renderRow={this._renderRow}
                      renderSeparator={renderSeparator || this._renderSeparator}
                      automaticallyAdjustContentInsets={false}
                      showsVerticalScrollIndicator={showsVerticalScrollIndicator}
                      keyboardShouldPersistTaps={keyboardShouldPersistTaps}
            />
        );
    }

    get _dataSource() {
        const {options} = this.props;
        let dataList = [];

        options.forEach((v,i,a)=>{
            if(typeof(v) == 'string')
            {
                dataList.push({
                    name:v,
                    value:v,
                    isChecked:false
                });
            }
            else if(typeof(v) == 'object')
            {
                v.isChecked = v.isChecked == undefined ? false : v.isChecked;
                dataList.push(v);
            }
        });

        if(this._dataSourceList.length == dataList.length)
        {
            for(var i = 0; i < dataList.length; i++)
            {
                if(dataList[i].name != this._dataSourceList[i].name)
                {
                    this._dataSourceList = dataList;
                    break;
                }
            }
        }
        else
        {
            this._dataSourceList = dataList;
        }

        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });
        return ds.cloneWithRows(this._dataSourceList);
    }

    _renderRow = (rowData, sectionID, rowID, highlightRow) => {
        const {renderRow, dropdownTextStyle, dropdownTextHighlightStyle, accessible, multiple} = this.props;
        const {selectedIndex} = this.state;
        const key = `row_${rowID}`;
        const highlighted = rowID == selectedIndex;

        const row = !renderRow ?
            (<Text style={[
                styles.rowText,
                dropdownTextStyle,
                highlighted && styles.highlightedRowText,
                highlighted && dropdownTextHighlightStyle
            ]}
            >
                {rowData.name}
            </Text>) :
            renderRow(rowData, rowID, highlighted);

        const preservedProps = {
            key,
            accessible
        };

        if(multiple)
        {
            preservedProps.onClick = (isChecked) => this._onRowPress(rowData, sectionID, rowID, highlightRow,isChecked);
            // preservedProps.onClick = () => {};
        }
        else
        {
            preservedProps.onPress = () => this._onRowPress(rowData, sectionID, rowID, highlightRow);
        }

        if (TOUCHABLE_ELEMENTS.find(name => name == row.type.displayName)) {
            const props = {...row.props};
            props.key = preservedProps.key;
            props.onPress = preservedProps.onPress;
            const {children} = row.props;
            switch (row.type.displayName) {
                case 'TouchableHighlight': {
                    return (
                        <TouchableHighlight {...props}>
                            {children}
                        </TouchableHighlight>
                    );
                }
                case 'TouchableOpacity': {
                    return (
                        <TouchableOpacity {...props}>
                            {children}
                        </TouchableOpacity>
                    );
                }
                case 'TouchableWithoutFeedback': {
                    return (
                        <TouchableWithoutFeedback {...props}>
                            {children}
                        </TouchableWithoutFeedback>
                    );
                }
                case 'TouchableNativeFeedback': {
                    return (
                        <TouchableNativeFeedback {...props}>
                            {children}
                        </TouchableNativeFeedback>
                    );
                }
                default:
                    break;
            }
        }

        if(multiple)
        {
            // alert(JSON.stringify(styles.highlightedRowText))
            return (
                <CheckBox {...preservedProps}
                          rightTextStyle={[
                              styles.rowText,
                              dropdownTextStyle,
                              // highlighted && styles.highlightedRowText,
                              // highlighted && dropdownTextHighlightStyle
                          ]}
                          isChecked={rowData.isChecked}
                          rightText={rowData.name}
                          checkBoxColor={Theme.Colors.themeColor}/>
            );
        }
        else
        {
            return (
                <TouchableHighlight {...preservedProps}>
                    {row}
                </TouchableHighlight>
            );
        }

    };

    _onMultiplePress(){
        const {onSelect, onDropdownWillHide} = this.props;//alert(JSON.stringify(this._selectData))

        if (!onDropdownWillHide || onDropdownWillHide() !== false) {
            this.setState({
                showDropdown: false
            });
        }

        if (onSelect != undefined) {
            let selList = [];
            // alert(JSON.stringify(this._selectData));
            this._selectData.forEach((v,i,a)=>{
                if(v.name == v.value)
                {
                    selList.push(v.value);
                }
                else
                {
                    selList.push(v);
                }
            });
            // alert(JSON.stringify(selList));
            onSelect(selList);
        }


    }

    _onRowPress(rowData, sectionID, rowID, highlightRow,isChecked) {
        const {onSelect, renderButtonText, onDropdownWillHide,multiple} = this.props;
        if(multiple)
        {
            Array.prototype.remove = function(val) {
                var index = this.indexOf(val);
                if (index > -1) {
                    this.splice(index, 1);
                }
            };
            // highlightRow(sectionID, rowID);
            if(isChecked)
            {
                this._selectDataText.push(rowData.name);
                this._selectData.push(rowData);
            }
            else
            {
                this._selectData.remove(rowData);
                this._selectDataText.remove(rowData.name);
            }

            this._dataSourceList[rowID].isChecked = isChecked;

            const value = renderButtonText && renderButtonText(this._selectData) || this._selectDataText.toString();
            this._nextValue = value;
            this._nextIndex = rowID;
            this.setState({
                buttonText: value,
                selectedIndex: rowID
            });

            // alert(JSON.stringify(this._selectData))
        }
        else
        {
            if (!onSelect || onSelect(rowID, rowData) !== false) {
                highlightRow(sectionID, rowID);
                const value = renderButtonText && renderButtonText(rowData) || rowData.name;
                this._nextValue = value;
                this._nextIndex = rowID;
                this.setState({
                    buttonText: value,
                    selectedIndex: rowID
                });
            }

            this.hide();

           /* if (!onDropdownWillHide || onDropdownWillHide() !== false) {
                this.setState({
                    showDropdown: false
                });
            }*/
        }

    }

    _renderSeparator = (sectionID, rowID, adjacentRowHighlighted) => {
        const key = `spr_${rowID}`;
        return (
            <View style={styles.separator}
                  key={key}
            />
        );
    };
}

const styles = StyleSheetAdapt.create({
    multipleBtn:{
        backgroundColor:Theme.Colors.backgroundColorBtn,
        margin:10,
        borderRadius:5,
        padding:5,
    },
    multipleBtnText:{
        color:'#FFFFFF',
    },
    button: {
        justifyContent: 'center'
    },
    buttonText: {
        fontSize: 12
    },
    modal: {
        flexGrow: 1,
        flexDirection:'row'
    },
    dropdown: {
        // position: 'absolute',
        height: (33 + StyleSheet.hairlineWidth) * 5,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: 'lightgray',
        borderRadius: 2,
        backgroundColor: 'white',
        justifyContent: 'center'
    },
    loading: {
        alignSelf: 'center'
    },
    list: {
        //flexGrow: 1,
    },
    rowText: {
        paddingHorizontal: 6,
        paddingVertical: 10,
        fontSize: 11,
        color: 'gray',
        backgroundColor: 'white',
        textAlignVertical: 'center'
    },
    highlightedRowText: {
        color: 'black'
    },
    separator: {
        height: StyleSheet.hairlineWidth,
        backgroundColor: 'lightgray'
    }
});
