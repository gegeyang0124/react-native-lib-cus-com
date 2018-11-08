import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';

// import ModalDropdown from 'react-native-modal-dropdown';
import {DropdownBox} from './DropdownBox';
import {
    StyleSheetAdapt,
    Theme,
    Tools,
} from "./../api/api";
import {ButtonImage} from "./ButtonImage";
import TriangleDown from 'lib-images-zy/triangleDown.png';

/**
 * 下拉框 有下拉图表等，更加符合应用场景（基于DropdownBox）
 * **/
export class PickDropdown extends Component {

    static num = 0;

    //属性注释及类型,所有的属性对象都是句柄模式（类型时number），类似C语言中的指针
    static propTypes = {
        frameStyle:PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.object,
            PropTypes.array
            //React.PropTypes.instanceOf(Message)
        ]),//外部框样式
        clearDrop:PropTypes.bool,//重置下拉框 true:重置，false，不重置，默认false
        refId:PropTypes.func,//获取组件句柄的函数
        disabled:PropTypes.bool,//是否点击无效//默认可以false
        imgDirection:PropTypes.string,//三角形方向 right:向右，down:向下
        onDropdownWillShow: PropTypes.func,//下拉框展示前执行
    }

    /**
     * 设置默认属性
     * **/
    static defaultProps = {
        clearDrop:false,//重置下拉框 true:重置，false，不重置，默认false
        disabled:false,
        options:[],
    }

    constructor(props) {
        super(props);

        this.framePosition = null;

        this.state = {
            iconRotate:styles.iconRotate
        };

    }

    styles = {};
    getStyle(style)
    {
        this.styles = Tools.getStyle(style == undefined ? this.props.style : style);
        // Tools.toast("s: " + JSON.stringify(this.props.iconStyle))
        return this.styles;
    }

    onDropdownDidShow = ()=>{
        this.setState({
            iconRotate:{}
        });
    }

    onDropdownDidHide = ()=>{
        this.setState({
            iconRotate:styles.iconRotate
        });
    }

    getIconStyle()
    {
        const {imgDirection} = this.props;
        let {iconRotate} = this.state;
        switch (imgDirection)
        {
            case "right":{
                iconRotate = styles.iconRotate;
                break;
            }
            case "down" :{
                iconRotate = {};
                break;
            }
        }

        return iconRotate;
    }

    updatePosition(callback) {
        if (this.pd && this.pd.measure) {
            this.pd.measure((fx, fy, width, height, px, py) => {

                this.framePosition = {fx:fx,fy:fy,px: px, py: py, w: width, h: height};
                callback && callback();
            });
        }
    }

    _onBtnImgPress = () => {
        const {onDropdownWillShow} = this.props;
        if (!onDropdownWillShow ||
            onDropdownWillShow() !== false) {
            this.modalDropdown.show();
        }
    };

    render() {
        if(this.props.clearDrop)
        {
            /*let interal = setInterval(() =>{
             this.modalDropdown.select(-1);
             clearInterval(interal);
             },50);

             if(this.modalDropdown != undefined){
             clearInterval(interal);
             }*/

            setTimeout(() =>{
                this.modalDropdown.select(-1);
            },0);

        }

        const {disabled,textStyle} = this.props;

        let dropdownHeight = this.props.options.length > 1
            ? StyleSheetAdapt.getHeight(((Theme.Font.fontSize + 34) * this.props.options.length))
            : 200;
        let dh = StyleSheetAdapt.getHeight() * 0.8;
        return (
            <View ref={(com)=> this.pd = com} style={[styles.searchFrame,this.props.frameStyle]}>
                <DropdownBox {...this.props}
                             ref={ component => {
                                 this.modalDropdown = component;
                                 this.props.refId != undefined ? this.props.refId(component) : null;
                                 return component;
                             } }
                             style={[styles.searchFrameDropdown,this.props.style]}
                             onDropdownDidShow={this.onDropdownDidShow}
                             onDropdownDidHide={this.onDropdownDidHide}
                             textStyle={[styles.searchText,textStyle]}
                             scrollEnabled={true}
                             dropdownStyle={[
                                 {
                                     height:dropdownHeight > dh
                                         ? dh
                                         : dropdownHeight
                                 },
                                 this.props.dropdownStyle
                             ]}
                             dropdownTextStyle={styles.searchText}/>
                <ButtonImage icon={TriangleDown}
                             disabled={disabled}
                             style={[styles.searchIcon,{
                                 width:this.getStyle().height == undefined
                                     ? this.getStyle(styles.searchIcon).height
                                     : this.styles.height,
                                 height:this.styles.height,
                             }]}
                             iconStyle={[

                                 {
                                     // tintColor:Theme.Colors.themeColor,
                                     width:this.styles.height,
                                     height:this.styles.height,
                                 },
                                 styles.icon,
                                 this.getIconStyle()
                             ]}
                             onPress={this._onBtnImgPress}/>
            </View>
        );
    }
}


const styles = StyleSheetAdapt.create({
    searchFrame:{
        flexDirection:'row',
        /*justifyContent:'center',
         alignItems:'center',*/
    },
    searchFrameDropdown:{
        width:Theme.Width.width1,
        borderColor:Theme.Colors.minorColor,
        borderWidth:Theme.Border.borderWidth,
        borderRightWidth:0,
        height:Theme.Height.height1,
        borderBottomLeftRadius:Theme.Border.borderRadius,
        borderTopLeftRadius:Theme.Border.borderRadius,

    },
    searchText:{
        fontSize:Theme.Font.fontSize,
        padding:2,
        // alignSelf:'center',
    },
    searchIcon:{
        /*  width:Theme.Height.height1 + Theme.Border.borderWidth * 2,
          height:Theme.Height.height1 + Theme.Border.borderWidth * 2,
          marginLeft:-Theme.Border.borderWidth * 4,
          marginTop:-Theme.Border.borderWidth,*/

        width:Theme.Height.height1,
        height:Theme.Height.height1,
        borderColor:Theme.Colors.borderColor,
        borderRightWidth:Theme.Border.borderWidth,
        borderTopWidth:Theme.Border.borderWidth,
        borderBottomWidth:Theme.Border.borderWidth,
        borderLeftWidth:0,

        borderTopRightRadius:Theme.Border.borderRadius,
        borderBottomRightRadius:Theme.Border.borderRadius,
        backgroundColor:Theme.Colors.themeColor,
        justifyContent:'center',
        alignItems:'center',
    },
    icon:{
        width:Theme.Height.height1 * 0.7,
        height:Theme.Height.height1 * 0.7,


    },
    iconRotate:{
        transform:[
            {rotate:'270deg'}
        ],
    },
});