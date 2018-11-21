import {
    Tools,
    StyleSheetAdapt,
    Http,
    LocalStorage,
    Media,
    Theme,
    PickerCustome,
    HotUpdate,
    DbMgr,
    CaptureImage,
    IamgeWaterMark,
    ProgressPerApi,
    ProgressApi,
    MenuBottomApi,
    Alert,
    JPush,
    TalkingData,
    FileDirMgr,
} from "com-api";
import {
    ButtonChange,
    TextInputIcon,
    ViewTitle,
    ButtonImage,
    TextIcon,
    BaseComponent,
    Progress,
    TextDoubleIcon,
    ImageBg,
    ImageView,
    VideoView,
    BarcodeView,
    ProgressPer,
    ScrollViewRowList,
    Charts,
    PickDropdown,
    SearchDropIpt,
    ItemRowFeedback,
    FlatListView,
    SearchDDDIpt,
    ItemRowGoods,
    ItemRowGoodsPromotion,
    WebViewCus,
    SwiperImage,
    ItemRowBuyCar,
    TextChange,
    DropdownBox,
    SwiperNotice,
    ItemRowTripTask,
    ItemRowTripApply,
    ItemRowGuideTripApply,
    DatePicker,
    ItemRowGuideApplyType,
    GuideImageHint,
    ItemRowTitle,
    MenuBottom,
    ModalTextInput,
    SlideMenuDrawer,
    ImageList,
    VideoList,
    ItemRowReciew,
    TextInputLabel,
    Question,
    QuestionList,
    TextIconBg,
    SearchIpt,
    ItemRowSwitch,
    ScrollSelectOptions,
    TitleRow,
    ChartCircleProgress,
    BarHorizontalTitleSection,
    ResultProgressBlock,
    TitleBlock,
    TitleBlockList,
    TitleBlockTarget,
    TitleBlockTargetArea,
    PickDropdownMonth,
    ChartCircleProgressList,
    ItemRowTableSwitch,
    ButtonTime,
    ViewCtrl,
    ImageBrower,
    ImageViewWatermark,
    ModalTextInputS,
} from "./ui/ui";
import {ComponentConstructor} from "./StackComponent";

/**
 *组件类 引入集合
 **/
const compoent = {

    get ComponentConstructor(){
        return ComponentConstructor;
    },

    /**
     * API
     * **/
    get FileDirMgr() {
        return FileDirMgr;
    },
    get Alert() {
        return Alert;
    },
    get MenuBottomApi() {
        return MenuBottomApi;
    },
    get ProgressApi() {
        return ProgressApi;
    },
    get ProgressPerApi() {
        return ProgressPerApi;
    },
    get IamgeWaterMark() {
        return IamgeWaterMark;
    },
    get CaptureImage() {
        return CaptureImage;
    },
    get DbMgr() {
        return DbMgr;
    },
    get Tools() {
        return Tools;
    },
    get StyleSheetAdapt() {
        return StyleSheetAdapt;
    },
    get Http() {
        return Http;
    },
    get LocalStorage() {
        return LocalStorage;
    },
    get Media() {
        return Media;
    },
    get Theme() {
        return Theme;
    },
    get PickerCustome() {
        return PickerCustome;
    },
    get HotUpdate() {
        return HotUpdate;
    },
    get JPush() {
        return JPush;
    },
    get TalkingData() {
        return TalkingData;
    },

    /**
     * UI
     * **/
    get ImageViewWatermark() {
        return ImageViewWatermark;
    },
    get ModalTextInputS(){
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

module.exports = compoent;