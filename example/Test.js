import React, {Component} from 'react';
import {
   Text,
} from 'react-native'
import {
    StyleSheetAdapt,
    ViewTitle,
    BaseComponent,
    ViewCtrl,
    Alert,
    BarcodeView,
} from "react-native-lib-cus-com";

type Props = {};
export default class Test extends BaseComponent<Props> {

    constructor(props) {
        super(props);

    }
    render() {

        return (
            <ViewTitle>
                <BarcodeView ref={c=>this.barcodeView}
                    style={styles.testStyle}/>
                <Text onPress={()=>this.barcodeView.startScan()}>
                    开始扫码
                </Text>
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