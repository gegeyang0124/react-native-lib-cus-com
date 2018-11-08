import {ButtonChange} from "./ButtonChange";
import {ModalTextInputS} from "./ModalTextInputS";
import {TextInputIcon} from "./TextInputIcon";
import {ViewTitle} from "./ViewTitle";
import {ButtonImage} from "./ButtonImage";
import {TextIcon} from "./TextIcon";
import {Progress} from "./Progress";
import BaseComponent from "./BaseComponent";
import {TextDoubleIcon} from "./TextDoubleIcon";
import {ImageBg} from "./ImageBg";
import {ImageView} from "./ImageView";
import {VideoView} from "./VideoView";
import BarcodeView from "./BarcodeView";
import {ProgressPer} from "./ProgressPer";
import {ScrollViewRowList} from "./ScrollViewRowList";
import Charts from "./Charts";
import {PickDropdown} from "./PickDropdown";
import {SearchDropIpt} from "./SearchDropIpt";
import {ItemRowFeedback} from "./ItemRowFeedback";
import {FlatListView} from "./FlatListView";
import {SearchDDDIpt} from "./SearchDDDIpt";
import {ItemRowGoods} from "./ItemRowGoods";
import {ItemRowGoodsPromotion} from "./ItemRowGoodsPromotion";
import {WebViewCus} from "./WebViewCus";
import {SwiperImage} from "./SwiperImage";
import {ItemRowBuyCar} from "./ItemRowBuyCar";
import {TextChange} from "./TextChange";
import {DropdownBox} from "./DropdownBox";
import {SwiperNotice} from "./SwiperNotice";
import {ItemRowTripTask} from "./ItemRowTripTask";
import {ItemRowTripApply} from "./ItemRowTripApply";
import {ItemRowGuideTripApply} from "./ItemRowGuideTripApply";
import {DatePicker} from "./DatePicker";
import {ItemRowGuideApplyType} from "./ItemRowGuideApplyType";
import {GuideImageHint} from "./GuideImageHint";
import {ItemRowTitle} from "./ItemRowTitle";
import {MenuBottom} from "./MenuBottom";
import {ModalTextInput} from "./ModalTextInput";
import {SlideMenuDrawer} from "./SlideMenuDrawer";
import {ImageList} from "./ImageList";
import {VideoList} from "./VideoList";
import {ItemRowReciew} from "./ItemRowReciew";
import {TextInputLabel} from "./TextInputLabel";
import {Question} from "./Question";
import {QuestionList} from "./QuestionList";
import {TextIconBg} from "./TextIconBg";
import {SearchIpt} from "./SearchIpt";
import {ItemRowSwitch} from "./ItemRowSwitch";
import {ScrollSelectOptions} from "./ScrollSelectOptions";
import {TitleRow} from "./TitleRow";
import {ChartCircleProgress} from "./ChartCircleProgress";
import {BarHorizontalTitleSection} from "./BarHorizontalTitleSection";
import {ResultProgressBlock} from "./ResultProgressBlock";
import {TitleBlock} from "./TitleBlock";
import {TitleBlockList} from "./TitleBlockList";
import {TitleBlockTarget} from "./TitleBlockTarget";
import {TitleBlockTargetArea} from "./TitleBlockTargetArea";
import {PickDropdownMonth} from "./PickDropdownMonth";
import {ChartCircleProgressList} from "./ChartCircleProgressList";
import {ItemRowTableSwitch} from "./ItemRowTableSwitch";
import {ButtonTime} from "./ButtonTime";
import {ViewCtrl} from "./ViewCtrl";
import {ImageBrower} from "./ImageBrower";
import {ImageViewWatermark} from "./ImageViewWatermark";

/**
 *UI 引入集合
 **/
const ui = {

    get ImageViewWatermark() {
        return ImageViewWatermark;
    },
    get ModalTextInputS() {
        return ModalTextInputS;
    },
    get ImageBrower() {
        return ImageBrower;
    },
    get ViewCtrl() {
        return ViewCtrl;
    },
    get TextInputIcon() {
        return TextInputIcon;
    },
    get ButtonChange() {
        return ButtonChange;
    },
    get ViewTitle() {
        return ViewTitle;
    },
    get ButtonImage() {
        return ButtonImage;
    },
    get TextIcon() {
        return TextIcon;
    },
    get BaseComponent() {
        return BaseComponent;
    },
    get Progress() {
        return Progress;
    },
    get TextDoubleIcon() {
        return TextDoubleIcon;
    },
    get ImageBg() {
        return ImageBg;
    },
    get ImageView() {
        return ImageView;
    },
    get VideoView() {
        return VideoView;
    },
    get BarcodeView() {
        return BarcodeView;
    },
    get ProgressPer() {
        return ProgressPer;
    },
    get ScrollViewRowList() {
        return ScrollViewRowList;
    },
    get Charts() {
        return Charts;
    },
    get PickDropdown() {
        return PickDropdown;
    },
    get SearchDropIpt() {
        return SearchDropIpt;
    },
    get ItemRowFeedback() {
        return ItemRowFeedback;
    },
    get FlatListView() {
        return FlatListView;
    },
    get SearchDDDIpt() {
        return SearchDDDIpt;
    },
    get ItemRowGoods() {
        return ItemRowGoods;
    },
    get ItemRowGoodsPromotion() {
        return ItemRowGoodsPromotion;
    },
    get WebViewCus() {
        return WebViewCus;
    },
    get SwiperImage() {
        return SwiperImage;
    },
    get ItemRowBuyCar() {
        return ItemRowBuyCar;
    },
    get TextChange() {
        return TextChange;
    },
    get DropdownBox() {
        return DropdownBox;
    },
    get SwiperNotice() {
        return SwiperNotice;
    },
    get ItemRowTripTask() {
        return ItemRowTripTask;
    },
    get ItemRowTripApply() {
        return ItemRowTripApply;
    },
    get ItemRowGuideTripApply() {
        return ItemRowGuideTripApply;
    },
    get DatePicker() {
        return DatePicker;
    },
    get ItemRowGuideApplyType() {
        return ItemRowGuideApplyType;
    },
    get GuideImageHint() {
        return GuideImageHint;
    },
    get ItemRowTitle() {
        return ItemRowTitle;
    },
    get MenuBottom() {
        return MenuBottom;
    },
    get ModalTextInput() {
        return ModalTextInput;
    },
    get SlideMenuDrawer() {
        return SlideMenuDrawer;
    },
    get ImageList() {
        return ImageList;
    },
    get VideoList() {
        return VideoList;
    },
    get ItemRowReciew() {
        return ItemRowReciew;
    },
    get TextInputLabel() {
        return TextInputLabel;
    },
    get Question() {
        return Question;
    },
    get QuestionList() {
        return QuestionList;
    },
    get TextIconBg() {
        return TextIconBg;
    },
    get SearchIpt() {
        return SearchIpt;
    },
    get ItemRowSwitch() {
        return ItemRowSwitch;
    },
    get ScrollSelectOptions() {
        return ScrollSelectOptions;
    },
    get TitleRow() {
        return TitleRow;
    },
    get ChartCircleProgress() {
        return ChartCircleProgress;
    },
    get BarHorizontalTitleSection() {
        return BarHorizontalTitleSection;
    },
    get ResultProgressBlock() {
        return ResultProgressBlock;
    },
    get TitleBlock() {
        return TitleBlock;
    },
    get TitleBlockList() {
        return TitleBlockList;
    },
    get TitleBlockTarget() {
        return TitleBlockTarget;
    },
    get TitleBlockTargetArea() {
        return TitleBlockTargetArea;
    },
    get PickDropdownMonth() {
        return PickDropdownMonth;
    },
    get ChartCircleProgressList() {
        return ChartCircleProgressList;
    },
    get ItemRowTableSwitch() {
        return ItemRowTableSwitch;
    },
    get ButtonTime() {
        return ButtonTime;
    },

};

module.exports = ui;