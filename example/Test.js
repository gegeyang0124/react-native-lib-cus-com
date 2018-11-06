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

            </ViewTitle>
        );
    }
}

const styles = StyleSheetAdapt.create({

    vBFrame2_IconRotate:{
        transform:[
            {rotateX:'180deg'}
        ],
    },
});