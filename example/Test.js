import React, {Component} from 'react';
import {
    StyleSheetAdapt,
    ViewTitle,
    BaseComponent,
    ViewCtrl,
    Alert
} from "react-native-lib-cus-com";

type Props = {};
export default class Test extends BaseComponent<Props> {

    constructor(props) {
        super(props);

    }

    alert(){
        //与react-native 中的Alert用法一致
        Alert.alert();
    }

    componentWillMount(){

    }

    componentDidMount() {
    }




    render() {

        const {resultEstimateData,noticesData,resultFinishProgress,
            tripListData,customerObj,isNews,pictures,path,dataSize,picture} = this.state;

        return (
            <ViewTitle>
                <View style={styles.testStyle}></View>
                <View style={StyleSheetAdapt.testStyle2}></View>
                <View style={StyleSheetAdapt.styleJsonAdaptConvert({
                    width:100,
                    height:200,
                })}></View>
            </ViewTitle>
        );
    }
}
const styles = StyleSheetAdapt.create({

    testStyle2:{
        width:100,
        height:200,
    },
    testStyle:{
        transform:[
            {rotateX:'180deg'}
        ],
    },
});