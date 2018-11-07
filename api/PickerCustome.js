// import Picker from 'react-native-picker';
import {Tools} from "./Tools";
import {Components} from "./../StackComponent";
const Picker = Components.react_native_picker;

/**
 * 自定义滑动选择
 * **/
export class PickerCustome{

    static selectedValue = null;
    /**
     * 选择框 底部
     * @param dataJson objec;//参数
     * @param callback function;//回调函数
     * dataJson = {
     * pickerData:array，//需要选择的数组，可是多维数组
     * selectedValue：array，//默认选中的数组 一纬数组
     * pickerConfirmBtnText：string,//确定按钮显示文字，默认为：'确定'
     * pickerCancelBtnText:string,//取消按钮显示文字，默认为：'取消'
     * pickerTitleText:string,//中间title显示文字，默认为：'选择'
     * }
     * **/
    static pick(dataJson,callback){
        if(Picker.init){
            Picker.init({
                pickerConfirmBtnText:dataJson.pickerConfirmBtnText == undefined
                    ? '确认'
                    : dataJson.pickerConfirmBtnText,
                pickerCancelBtnText:dataJson.pickerCancelBtnText == undefined
                    ? '取消'
                    : dataJson.pickerCancelBtnText,
                pickerTitleText: dataJson.pickerTitleText == undefined
                    ? '选择'
                    : dataJson.pickerTitleText,
                pickerData: dataJson.pickerData,
                selectedValue: this.selectedValue == null ?
                    dataJson.selectedValue == undefined ?
                        [] :
                        dataJson.selectedValue :
                    this.selectedValue,//默认选中的值
                onPickerConfirm: data => {
                    // console.log(data);//确定
                    // Tools.toast("resolve: " + JSON.stringify(data));
                    // alert(JSON.stringify(data))
                    this.selectedValue = data;
                    callback({
                        type:2,
                        data:data
                    });
                },
                onPickerCancel: data => {
                    // console.log(data); //取消
                    // Tools.toast("onPickerCancel: " + JSON.stringify(data));
                    callback({
                        type:0,
                        data:data
                    });
                },
                onPickerSelect: data => {
                    // console.log(data); //选择变化
                    // Tools.toast("onPickerSelect: " + JSON.stringify(data));
                    this.selectedValue = data;
                    callback({
                        type:1,
                        data:data
                    })
                },
            });
            Picker.show();
        }
        else
        {
            console.info("请安装自定义滑动选择组件","react-native-picker");
            Tools.toast("请安装组件 react-native-picker");
        }

    }

    /**
     * 选择年月
     * @param callback function;//回调函数
     * **/
    static pickMonth(callback){

        let date = new Date();
        let data = [
            [],
            [1,2,3,4,5,6,7,8,9,10,11,12]
        ];
        let dateJson = {
            year:date.getFullYear(),
            month:date.getMonth() + 1,
            day:date.getDate(),
        }

        let year = 2008;
        while (dateJson.year > year)
        {
            data[0].push(year++);
        }

        for(let i = 0; i < 21; i++)
        {
            data[0].push(year++);
        }

        return this.pick({
            pickerData: data,
            pickerTitleText: '选择年/月',
            selectedValue: [dateJson.year,dateJson.month],//默认选中的值
        },callback);


    }

}
