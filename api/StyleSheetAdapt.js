import {
    Dimensions,
    StyleSheet,
} from 'react-native';

const screenGet = Dimensions.get('window');

const screen = {
    width:screenGet.width > screenGet.height ? screenGet.height : screenGet.width,
    height:screenGet.width > screenGet.height ? screenGet.width : screenGet.height,
    fontScale:screenGet.fontScale,
    scale:screenGet.scale
};

//let {width,height,scale} = Dimensions.get('window');
const designSize = {width:768,height:1024};//页面设计大小

/**
 * 横向需要转化的样式属性数组
 * **/
const styleConvertArrWidth = [
    "width","borderRadius","borderTopLeftRadius", "borderBottomLeftRadius",
    "borderBottomRightRadius","borderTopRightRadius", "padding","paddingLeft",
    "paddingRight", "marginLeft","marginRight", "left","right","fontSize"
];
/**
 * 纵向需要转化的样式属性数组
 * **/
const styleConvertArrHeight = [
    "height","paddingTop","paddingBottom","margin","marginTop","marginBottom",
    "top","bottom","borderWidth","borderTopWidth","borderLeftWidth","borderRightWidth",
    "borderBottomWidth"
];

/**
 * 样式表创建，适配各种机型
 * **/
export class StyleSheetAdapt{

    /**
     * 返回 StyleSheet 对象
     * **/
    static styleSheet : StyleSheet;

    /**
     * 转化后的style json 对象
     * **/
    static stylesJson;

    /**屏幕长宽分辨率json
     * **/
    static screen = screen;

    /**屏幕与设计适配比率
     * widthScale 宽度比率
     * heightScale 高度比率
     * **/
    static scale = {
        widthScale: screen.width / designSize.width,
        heightScale: screen.height / designSize.height,
    };

    /**屏幕与设计适配比率 随屏幕变化
     * widthScale 宽度比率
     * heightScale 高度比率
     * **/
    static scaleS = {
        widthScale: screenGet.width / designSize.width,
        heightScale: screenGet.height / designSize.height,
    };

    /**获取横向的与屏幕的相对长度
     * @prama width ;//横向宽度值,特殊值是'w'取屏幕宽, 不传也取屏幕宽
     * **/
    static getWidth(width){
        if(width == undefined)
        {
            width = this.screen.width;
        }
        else if(width == 's'){
            width = screenGet.width;
        }
        else
        {
            if(typeof (width) == 'string')
            {
                //'s':随屏幕调整布局
                if(width.indexOf('s') > -1){
                    width = width.replace('s', '');
                    let p = /[a-zA-Z]/i;
                    let b = p.test(width);//true,说明有英文字母
                    if(b){
                        if(width.indexOf('dw') > -1)//获取相对当前屏幕的设计宽比的宽
                        {
                            width = width.replace('dw', '');
                            width = width == '' ? screenGet.width : width;
                            width = parseFloat(width);

                            width =  this.scaleS.widthScale * width;
                        }
                        else if(width.indexOf('w') > -1)//获取相对当前屏幕宽的宽
                        {
                            width = width.replace('w', '');
                            width = width == '' ? 1 : width;
                            width = parseFloat(width);
                            width = width * screenGet.width;
                        }
                        else if(width.indexOf('n') > -1)//不进行屏幕比缩放
                        {
                            width.replace('n', '');
                            width = parseFloat(width);
                        }
                        else  if(width.indexOf('dh') > -1)//获取相对当前屏幕的设计高比的宽
                        {
                            width = width.replace('dh', '');
                            width = width == '' ? screenGet.height : width;
                            width = parseFloat(width);

                            width =  this.scaleS.heightScale * width;
                        }
                        else  if(width.indexOf('h') > -1)//获取相对当前屏幕高比的宽
                        {
                            width = width.replace('h', '');
                            width = width == '' ? 1 : width;
                            width = parseFloat(width);
                            width = width * screenGet.height;
                        }
                    }
                    else {
                        width = parseFloat(width);
                        width =  this.scaleS.widthScale * width;
                    }
                }
                else {

                    if(width.indexOf('dw') > -1)//获取相对当前屏幕的设计宽比的宽
                    {
                        width = width.replace('dw', '');
                        width = width == '' ? screen.width : width;
                        width = parseFloat(width);

                        width =  this.scale.widthScale * width;
                    }
                    else if(width.indexOf('w') > -1)//获取相对当前屏幕宽的宽
                    {
                        width = width.replace('w', '');
                        width = width == '' ? 1 : width;
                        width = parseFloat(width);
                        width = width * screen.width;
                    }
                    else if(width.indexOf('n') > -1)//不进行屏幕比缩放
                    {
                        width.replace('n', '');
                        width = parseFloat(width);
                    }
                    else  if(width.indexOf('dh') > -1)//获取相对当前屏幕的设计高比的宽
                    {
                        width = width.replace('dh', '');
                        width = width == '' ? screen.height : width;
                        width = parseFloat(width);

                        width =  this.scale.heightScale * width;
                    }
                    else  if(width.indexOf('h') > -1)//获取相对当前屏幕高比的宽
                    {
                        width = width.replace('h', '');
                        width = width == '' ? 1 : width;
                        width = parseFloat(width);
                        width = width * screen.height;
                    }
                }

            }
            else//获取相对当前屏幕的设计宽比的宽
            {
                width =  this.scale.widthScale * width;
            }
        }


        return width;
    }

    /**获取纵向的与屏幕的相对高度
     * @prama height ;//纵向高度值, 特殊值是'h'取屏幕高；不传也取屏幕高
     * **/
    static getHeight(height){

        if(height == undefined)
        {
            height = this.screen.height;
        }
        else if(height == 's'){
            height = screenGet.height;
        }
        else
        {

            if(typeof (height) == 'string'){

                //'s':随屏幕调整布局
                if(height.indexOf('s') > -1){
                    height = height.replace('s', '');
                    let p = /[a-zA-Z]/i;
                    let b = p.test(height);//true,说明有英文字母
                    if(b){
                        if(height.indexOf('dh') > -1)//获取相对当前屏幕的设计高比的高
                        {
                            height = height.replace('dh', '');
                            height = height == '' ? screenGet.height : height;
                            height = parseFloat(height);

                            height =  this.scaleS.heightScale * height;
                        }
                        else if(height.indexOf('h') > -1)//获取相对当前屏幕高的高
                        {
                            height = height.replace('h', '');
                            height = height == '' ? 1 : height;
                            height = parseFloat(height);
                            height = height * screenGet.height;
                        }
                        else if(height.indexOf('n') > -1)//不进行屏幕比缩放
                        {
                            height.replace('n', '');
                            height = parseFloat(height);
                        }
                        else  if(height.indexOf('dw') > -1)//获取相对当前屏幕的设计宽比的高
                        {
                            height = height.replace('dw', '');
                            height = height == '' ? screenGet.width : height;
                            height = parseFloat(height);

                            height =  this.scaleS.widthScale * height;
                        }
                        else  if(height.indexOf('w') > -1)//获取相对当前屏幕宽比的高
                        {

                            height = height.replace('w', '');
                            height = height == '' ? 1 : height;
                            height = parseFloat(height);
                            height = height * screenGet.width;
                        }
                    }
                    else {
                        height = parseFloat(height);
                        height =  this.scaleS.heightScale * height;
                    }
                }
                else {
                    if(height.indexOf('dh') > -1)//获取相对当前屏幕的设计高比的高
                    {
                        height = height.replace('dh', '');
                        height = height == '' ? screen.height : height;
                        height = parseFloat(height);

                        height =  this.scale.heightScale * height;
                    }
                    else if(height.indexOf('h') > -1)//获取相对当前屏幕高的高
                    {
                        height = height.replace('h', '');
                        height = height == '' ? 1 : height;
                        height = parseFloat(height);
                        height = height * screen.height;
                    }
                    else if(height.indexOf('n') > -1)//不进行屏幕比缩放
                    {
                        height.replace('n', '');
                        height = parseFloat(height);
                    }
                    else  if(height.indexOf('dw') > -1)//获取相对当前屏幕的设计宽比的高
                    {
                        height = height.replace('dw', '');
                        height = height == '' ? screen.width : height;
                        height = parseFloat(height);

                        height =  this.scale.widthScale * height;
                    }
                    else  if(height.indexOf('w') > -1)//获取相对当前屏幕宽比的高
                    {
                        height = height.replace('w', '');
                        height = height == '' ? 1 : height;
                        height = parseFloat(height);
                        height = height * screen.width;
                    }
                }

            }
            else //获取相对当前屏幕的设计高比的高
            {
                height =  this.scale.heightScale * height;
            }
        }

        return height;
    }

    /**得到样式属性适配值
     * @prama key ;//样式属性名，也是json的key
     * @prama val ;//样式属性值，也是json的key的值
     * **/
    static getAdaptVal(key,val){

        let isConvertWidth = false;
        let isConvertHeight = false;

        styleConvertArrWidth.forEach(function (val,index,arr) {

            isConvertWidth = key == val ? true : isConvertWidth;

        });
        styleConvertArrHeight.forEach(function (val,index,arr) {

            isConvertHeight = key == val ? true : isConvertHeight;

        });

        if(isConvertWidth)
        {
            val = this.getWidth(val);
        }
        else if(isConvertHeight)
        {
            val = this.getHeight(val);
        }

        return val;

    }

    /**
     * 样式属性json中的值适配
     * @prama styleJson json ;//样式属性json
     * **/
    static styleJsonAdaptConvert(styleJson){

        for(let key in styleJson)
        {
            // console.info("key",key);
            // key.constructor == Object //对象
            if(key.constructor == Array) //数组
            {
                key.forEach((v,i,a)=>{
                    v = this.styleJsonAdaptConvert(v);
                });
            }
            else if(typeof(styleJson[key]) == 'object')//对象
            {
                styleJson[key] = this.styleJsonAdaptConvert(styleJson[key]);
            }
            else
            {
                /*if(key == "padding")
                 {
                 styleJson["paddingLeft"] = styleJson["paddingLeft"] == undefined ? styleJson[key] :
                 }
                 else if(key == "margin")
                 {

                 }*/

                styleJson[key] = this.getAdaptVal(key,styleJson[key]);
            }

        }

        return styleJson;
    }

    /**创建样式表单
     * @prama json ;//样式属性json
     * **/
    static create(styleJson) {
        this.stylesJson = this.styleJsonAdaptConvert(styleJson);
        return StyleSheet.create(this.stylesJson );
    }

}