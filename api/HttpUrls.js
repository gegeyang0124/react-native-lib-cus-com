import { LocalStorage } from "./LocalStorage";

/**
 * 后台请求借口路径类
 * **/
export class HttpUrls{

    static isAutoLogin = true;//自动登录
    static isExecOnce = true;//执行一次
    static firstRequest = true;//第一次执行

    static urlSets = null;//接口地址集合
    static IPConfig = {
        namekey:"ipUrl",//存储服务器地址的key
        //IPTest:"http://yyt.lexin580.com:8081",//正式服务器
        //IP:"http://VoIP.lexinvip.com:8081",//测试服务器,
         IP:"http://yyt.lexin580.com:8081",//正式服务器
         IPTest:"http://VoIP.lexinvip.com:8081",//测试服务器,
        parameters:1,// 0、测试服务器；1、正式服务器
    };

    static getUrls(IP){
        var IP_Itunes = "https://itunes.apple.com/cn";//apple APP地址
        this.IPConfig.serviceType = this.IPConfig.IPTest == IP ? 0 : 1;

        var urlIP = IP + (!this.IPConfig.serviceType ? "/yyt2.0/api" : "/yyt2.0/api");
        var urlIP2 = IP + (!this.IPConfig.serviceType ? "/yyt2.0/mobile" : "/yyt2.0/mobile");

        var IPCenter = "http://dc-api.lexin580.com";
        var urlIPCenter = IPCenter;

        var IPCenterCRM = "http://dc-crm.lexin580.com";
        // var IPCenterCRM = "http://192.168.2.61:9053";
        this.urlIPHome = IP + (!this.IPConfig.serviceType ? "/yyt2.0" : "/yyt2.0")
        this.urlSets = {

            urlAppleAPPDownload:IP_Itunes + "/app",//apple的app下载地址
            urlAppleAPPInfo:IP_Itunes + "/lookup",//apple的app信息查询接口


            // urlConfig:"http://yyt.lexin580.com:8080/app_config/lx_yyt.json",//乐歆app录制视频配置时间长度，单位（ms）及版本配置文件
            urlConfig:this.IPConfig.IP + "/app_config/lx_yyt.json",//乐歆app录制视频配置时间长度，单位（ms）；及版本配置文件
            // urlConfig:"../../assets/lx_yyt.json",//乐歆app录制视频配置时间长度，单位（ms）配置文件

            urlImg:IP + '/lx_yyt',//图片前缀
            IP:IP,//ip地址
            urlIP:urlIP,//接口ip地址

            //登录
            urlLogin:urlIP + "/user/login",//登录接口 获取token
            // urlLogin:urlIP + "/product/user/login",//登录接口 已经通过
            urlLoginInfo:urlIP + "/user/info",//登录接口 用户信息

            urlWeather:urlIP2 + '/home/baseData',//天气接口

            //出库额和出库毛利额详情
            urlOutboundProfitMoneyDetail:urlIP + '/resultAnalysis/getStoreProfits',//出库额和出库毛利额接口 已经通过
            // urlOutboundProfitMoneyDetail:'http://192.168.2.93:8081/store-recharge-order/get-this-month-extract',

            //个人中心
            urlOutboundAndProfitMoneyTotal:urlIP + "/user/getProfitExAndAmountEx",//出库额和出库毛利额总数 接口 已经通过

            //信息台
            urlInfoProductNewList:urlIP + '/product/getProductNewList',//信息台接口，商品信息:新品推荐 已经通过
            urlInfoProductTypeList:urlIP + '/product/getProductTypeList',//信息台接口，商品信息:新品推荐 已经通过
            urlInfoProductNewDetail:urlIP + '/product/getInfo',//信息台接口，商品信息:新品推荐:新品推荐详情 新品推荐，爆款详情 接口
            urlInfoProductSaleDetail:urlIP + '/product/getAdBanners',//信息台接口，商品信息:新品推荐:新品推荐详情 新品推荐，爆款详情 接口
            urlInfoProductLastPromotionList:urlIP + '/product/getProductLastPromotionList',//信息台接口，商品信息:促销活动 已经通过
            urlInfoProductLastPromotionDetail:urlIP + '/product/getProductPromotionList',//信息台接口，商品信息:促销活动 已经通过
            urlInfoProductHotList:urlIP + '/product/getProductHotList',//信息台接口，商品信息:爆款推荐 已经通过
            urlInfoProductImportmentList:urlIP + '/product/getRecommendProducts',//信息台接口，商品信息:重点订单 已经通过
            urlInfoProductHistoryList:urlIP + '/order/getListData',//信息台接口，商品信息:历史订单
            // urlInfoKnowledgeList:urlIP + '/knowledge/listKnowledge',//信息台接口，运营信息:商品知识 已经通过
            urlInfoKnowledgeList:urlIP + '/knowledge/getListData',//信息台接口，运营信息:商品知识 已经通过
            urlInfoKnowledgeTypeList:urlIP + '/product/getProductTypeList',//信息台接口，运营信息:商品知识,品类列表集合 已经通过
            urlInfoKnowledgeAddRead:urlIP + '/knowledge/addReadKnowledge',//信息台接口，运营信息:商品知识,商品点击率 记录接口 已经通过
            urlInfoGetKnowledgeDetail:urlIP + '/knowledge/findknowledgeById',//信息台接口，运营信息:商品知识,运营重点 销售技巧 详情
            // urlInfoFeedBackList:urlIP + '/feedBack/getFeedBackList',//信息台接口，信息反馈:反馈 记录接口
            urlInfoFeedBackList:urlIP + '/info/getFeedBackList',//信息台接口，信息反馈:反馈 记录接口
            urlInfoFeedBackFatherQuesList:urlIP + '/info/getTopClass',//信息台接口，信息反馈:一级问题 接口
            urlInfoFeedBackChildQuesList:urlIP + '/info/getChildClass',//信息台接口，信息反馈:一级问题 接口
            urlInfoFeedBackProprietor:urlIP + "/record/getList",//客户档案 查询客户列表 接口 已经通过,
            urlInfoFeedBackAddFeedBack:urlIP + '/info/addFeedBack',//信息台接口，信息反馈 提交 接口
            urlInfoFeedBackDetail:urlIP + '/info/getFeedback',//信息台接口，信息反馈: 反馈详情 接口
            urlInfoComplainList:urlIP + '/info/getComplaintList',//信息台接口，信息反馈:投诉集合 记录接口
            urlInfoAddComplain:urlIP + '/info/addComplaint',//信息台接口，信息反馈:投诉 添加 记录接口
            urlInfoGetComplainPersonList:urlIP + '/user/getUserListByDepartmentIds',//信息台接口，信息反馈:被投诉人 接口
            urlInfoGetComplainDetail:urlIP + '/info/getComplaint',//信息台接口，信息反馈:投诉详情 接口
            // urlInfoSurveyQuestionnaireList:urlIP + "/questionNaire/listQuestionNaire",//信息台接口，调查问卷:市场调研
            urlInfoSurveyQuestionnaireList:urlIP + "/questionNaire/getListData",//信息台接口，调查问卷:市场调研
            urlInfoSurveyQuestionnaireDetail:urlIP + "/questionNaire/getQuestionNaireInfo",//信息台接口，调查问卷 ,详细数据,答题
            urlInfoSurveyQuestionnaireCommit:urlIP + "/questionNaire/doQuestionNaire",//信息台接口，调查问卷 ,提交
            urlInfoSurveyQuestionnaireView:urlIP + "/questionNaire/getDoQuestionNaireInfo",//信息台接口，调查问卷 ,详细数据,查看已答信息
            urlInfoAddOrder:urlIP + "/order/addOrder",//信息台接口，推荐订单 新增接口
            urlInfoAddOrderToCar:urlIP + "/order/addProductToOrderyShopCar",//信息台接口， 新增产品到购物车 新增接口
            urlInfoAddOrderToCar3:urlIP + "/order/copyOrdery",//信息台接口， 新增产品到购物车 新增接口
            urlInfoAddOrderToCar2:urlIP + "/order/updateShopCar",//信息台接口， 购物车完成 新增接口
            urlInfoCopyOrderToCar:urlIP + "/order/updateShopCar",//信息台接口， 复制订单 新增接口
            urlInfoGetOrderDetail:urlIP + "/order/findOrderBaseInfoById",//信息台接口，查看推荐订单基本信息,订单详情
            urlInfoGetOrderCarList:urlIP + "/order/findOrderyShopCarByUserId",//信息台接口，查看用户下的查看购物车 接口
            urlInfoDelOrderCar:urlIP + "/order/updateProductToOrderyShopCar",//信息台接口，删除购物车 接口
            urlInfoGet41ProjectList:urlIP + "/knowledge/get41ProjectList",//信息台，四个一工程 接口

            urlInfoSurveyQuestionnaireJoinList:urlIP + "/questionnaireStatus/getListData",//调查问卷 参与列表
            urlInfoSurveyQuestionnaireJoinDepList:urlIP + "/questionnaireStatus/getDeptOnQuestionnaireStatus",//调查问卷 获取参与调查的部门
            urlInfoSurveyQuestionnaireJoinAmount:urlIP + "/questionnaireStatus/getQuestionnaireStatistical",//调查问卷 获取参与调查的人数

            //巡店向导
            // urlFile:urlIP + "/fileUpload/upload",//文件上传接口，表单提交
            // urlFile:urlIP + "/common/appFileUpload",//文件上传接口 已经通过
            // urlFile:"http://192.168.2.15/eHR/Websites/www/index.php/YYTV1/Upload/file",//文件上传接口
            urlFile:"http://ehr.honey-lovely.cn/YYTV1/Upload/file",//文件上传接口
            urlFileToken:urlIP + "/token/get",//获取文件上传 token 接口
            // urlFile: "http://120.76.26.60:8188/xcb/api/personalInfo/personalInformationUpload",//文件上传接口
            urlSubmit:urlIP2 + "/task/taskEventSubmit",  //操作事件提交接口,巡店向导步骤提交接口 已经通过
            urlSubmit2:urlIP2 + "/task/signIn",  //操作事件提交接口,巡店向导步骤提交接口
            urlStep:urlIP2 + "/task/getTaskNextStep",  //获取下一步的步骤页面
            urlTaskLst:urlIP + "/task/getListData",//任务数据接口
            urlInsShopGuideLst:urlIP2 + "/task/getListData",//任务数据接口 已经通过
            urlTaskTypeLst:urlIP + "/taskTemplate/getListData",//各部门或类型接口，如：（含任务类型）; 已经通过
            // urlTaskTypeLstStoreDataSingle:urlIP + "/customer/getCustomer",运营通2.0不支持    //获取门店的位置信息（包含经纬度） 已经通过
            urlTaskTypeLstStoreDataLst:urlIP + "/customer/getCustomerList",//获取门店的位置信息集合（查看门店）; 已经通过
            urlTaskTypeLstCalendar:urlIP + "/task/getTimeSegmentTask",//获取所选月的数据信息，（所选择月有无任务）
            // urlMatch:urlIP + "/updateStatus",//评价接口
            urlTaskPatrol:urlIP2 + "/task/getTaskCurrentStep",//获取任务类型接口
            urlTaskEnd:urlIP2 + "/task/endTask",//未找到店，转入“满意度”页面
            urlFollowTask:urlIP2 + "/task/getTaskByAddTaskId",//查询任务跟进事项中创建的任务
            // urlFollowTask:urlIP2 + "mobile/task/getSingInStep",//
            urlQian:urlIP2 + "/task/signIn",//酒店签到
            // urlTaskInfoAdd:urlIP + "/task/createTask",// 任务信息添加接口
            urlTaskInfoAdd:urlIP + "/task/addTask",// 任务信息添加接口
            urlViewAdd:urlIP + "/feedBack/api/feedBack",//新增反馈
            urlViewSupplementAttachment:urlIP2 + "/task/taskEventSaveOrUpdate",//新增附件
            urlViewSupplementAttachment2:urlIP2 + "/task/taskEventSaveOrUpdate2Lexin",//修改附件 提交乐欣CRM
            urlgetTripTaskIdByRelationTaskId:urlIP + "/task/getTaskIdByRelation",//通过巡店任务id,获取出差任务id 入参:{"relationTaskId": "48309c91-ea22-4057-9615-3f9bb251eac1"}
            urlgetStoreIdByTaskId:urlIP + "/task/getStoreInfoByTaskId",//得到门店id和客户id,参数任务id
            urlReturnVisitByTaskId:urlIP2 + "/task/getAutoVisitTask",//获取回访任务的列表

            urlGuideTaskTypeCustome:urlIP + "/taskTemplate/getTaskTemplateStepList",//巡店任务申请 获取自定义类型
            urlGuideTaskAddCustome:urlIP + "/task/addCustomTask",//巡店任务申请 提交数据 新增任务
            urlGetRelationTask:urlIP + "/task/getRelationTask",//巡店任务 获取出差的关联任务
            urlDeleteTask:urlIP + "/task/deleteTaskBatch",//删除任务
            urlPutInVisitAndResolve:urlIP + "/taskVisitRecord/submitVisit2CRM",//店铺检查 回访 解决问题 提交

            // 工作台
            urlWorkbench:urlIP2 + "/task/deskTaskRemind",//工作台 待办事项 接口
            urlWorkbenchFlowTaskList:urlIP2 + "/task/getFlowTaskList",//工作台 运营向导 接口
            urlWorkbenchTaskFinish:urlIP2 + "/task/finishFlowTask",//工作台 运营向导 完成任务接口 接口
            urlWorkbenchTaskDetails:urlIP2 + "/task/getFlowTaskDetails",//工作台 运营向导 流程详情 接口

            //通知
            urlNotice:urlIP + "/notify/left",  //通知接口(LC)
            urlNoticeContent:urlIP + "/notify/getListData", // 通知列表(LC)
            urlNoticeRecord:urlIP + "/notify/batchUpdate", // 通知列表 单条任务记录 设置点击接口为已读(LC)

            //任务管理
            urlTaskUpdateStatus:urlIP + "/task/updateStatus",// 任务审核状态更新,//评价接口
            urlTaskDetail:urlIP2 + "/task/taskDetail",// 任务详情接口
            urlTaskDetail2:urlIP + "/task/taskDetails",// 任务详情接口
            urlTaskInfoSelLst:urlIP + "/task/onAddTask",// 任务信息选择列获取接口
            urlCustomerDetails:urlIP + "/customer/getCustomerDetails",//个人详情/客户回顾接口(未实现)
            urlNewTargetList:urlIP2 + "/product/getNewTargetList",//获取新品目标接口 已经通过
            urlHotTargetList:urlIP2 + "/product/getHotTargetList",//获取爆款目标接口 已经通过
            urlShopInfo:urlIP + "/store/getInfoByTaskId",//获取门店数据接口 已经通过
            urlShopInfoAdd:urlIP2 + "",//上传门店数据接口
            urlProductTypeGet:urlIP2 + "/product/getType",//店务检查品类数据接口 已经通过
            urlProductTypeGet2:urlIP + "/product/getProductTypeListByTwoLevel",//店务检查品类数据接口 只获取二级品类 已经通过
            urlProductBrandGet:urlIP2 + "/product/getBrand",//店务检查品牌数据接口 已经通过
            urlProductList:urlIP2 + "/product/getProductList",//店务检查 补货 产品信息数据接口 已经通过
            urlSearchCustomersList:urlIP + "/task/searchCustomers",//巡店申请搜索客户信息及客户列表数据接口 已经通过
            urlUpdateTaskTime:urlIP + "/task/updateJsonById",//巡店任务 修改计划开始结束时间 已经通过

            //添加任务
            urlClientList:urlIP + "/store/getStoreSelect",//查询客户列表 接口 已经通过
            urlDepartmentList:urlIP + "/department/getDepartmentList",//查询部门列表 接口 已经通过
            urlChargePersonList:urlIP + "/user/getUserListDepartmentId",//查询负责人列表 接口 已经通过
            urlGetTaskReson:urlIP2 + "/task/getTaskReson",//查询任务状态信息 （如通过和不通过原因，转派人，评价）

            //出差管理
            urlTrip:urlIP + "/task/getOutSideTaskList", // 出差管理(LC)
            urlOnload:urlIP + "/task/onAddTask",//新增出差-加载 获取任务编号
            urlTripType:urlIP + "/taskTemplate/getTemplateListByPass",//新增出差-类型
            urlTripMan:urlIP + "/user/getLeader",//新增出差-审核人 已经通过
            urlTripLine:urlIP + "/task/getLinkedTask",//新增出差-关联任务
            urlTripAdd:urlIP + "/task/addTask",//新增任务-巡店  提交
            urlGetDepartmentListByType:urlIP + "/department/getDepartmentListByType",//获取分公司集合 下拉框
            urlGetDepartmentListByType2:urlIP + "/department/getBranchOfficeListByUser",//获取分公司集合 下拉框 无入参
            urlGetDepartmentListByParentId:urlIP + "/department/getDepartmentListByParentId",//获取指定分公司的区域 通过父级部门获取子集部门 下拉框
            // urlCustomerBaseInfoList:urlIP + "/store/getCustomerBaseInfoList", 运营通2.0不支持   //商品档案查询 获取门店 下拉列表
            urlGetOutSideByTaskId:urlIP + "/task/getOutSideByTaskId",//出差任务详情
            urlAddReportImgPath:urlIP + "/taskProperties/addTaskProperties",//出差报告路径提交
            urlAddStatusExeCommit:urlIP + "/task/updateOutSide",//状态‘执行中’提交

            //商品管理
            urlGetCert:urlIP + "/product/getCert",//商品资质查询 条形码搜索
            urlGetStoreProduct:urlIP + "/product/getStoreProduct",//商品档案查询-----搜索条形码搜索

            //工作汇报
            urlWeekReport:urlIP + "/weekReport/getListData",//填写周报列表
            urlWeekReportMgr:urlIP + "/weekReport/weekReportMessage",//周报管理
            urlMonthReport:urlIP + "/monthReport/getListData",//填写月报列表
            urlMonthReportMgr:urlIP + "/monthReport/monthReportMessage",//月报管理
            urlWeekReportDetail:urlIP + "/weekReport/findWeekReportById",//周报详情 接口
            urlWeekReportAdd:urlIP+'/weekReport/addWeekReport',//提交周报
            urlWeekReportUpdate:urlIP + "/weekReport/updateWeekReport",//周报提交 接口
            urlWeekReportMgrAddCnt:urlIP + "/weekReport/addWeekReportManager",//周报提交 接口
            urlWorkReportMatch:urlIP + "/weekReport/evaluateWeekReport",//工作汇报 点评 接口
            urlMonthReportDetail:urlIP + "/monthReport/findMonthReportById",//月报详情 接口
            urlMonthReportUpdate:urlIP + "/monthReport/updateMonthReport",//月报提交 接口
            urlWeekAndMonthReportRemind:urlIP + "/notify/addWorkReportReminder",//周月报提醒 接口
            urlWeekReportPerformance:urlIP + "/weekReportAchievement/getWorkreportResult",//周报 业绩 接口

            //客户管理
            urlProvinceList:urlIP + "/record/getProvince",//获取省份列表 接口
            urlCityList:urlIP + "/record/getCity",//城市列表 接口
            urlBranchList:urlIP + "/record/getFiliale",//分公司列表 接口
            urlClientBaseInfoDetail:urlIP + "/record/getRecordDetailByType",//客户基本信息 接口
            urlClientMgrBaseInfo:urlIP + "/storeAnalysis/getInfo",//客户基本信息 接口
            urlClientMgrSaleRate:urlIP + "/storeAnalysis/getSaleRate",//销售金额占比分析 接口
            urlClientMgrTypeRate:urlIP + "/storeAnalysis/getProductTypeRate",//商品类别占比分析 接口
            urlClientMgrVisitDetail:urlIP + "/taskVisitRecord/onAddJson",//回访详情 接口
            urlClientMgrVisitDetailAdd:urlIP + "/taskVisitRecord/save",//回访详情 添加 接口
            urlClientMgrVisitDetailRecord:urlIP + "/taskVisitRecord/getTaskVisitRecord",//回访详情 查看 接口
            urlClientVisitAddTask:urlIP + "/task/addVisitTask",//添加回访任务 接口
            urlClientVisitRecordList:urlIP + "/taskVisitRecord/getVisitList",//回访记录列表 接口
            urlClientUpdateRecordMaterial:urlIP + "/record/updateRecordConsignee",//修改客户资料接口

            //业绩分析
            urlResultAnalysisInfo:urlIP + "/resultAnalysis/getInfo",//业绩分析 业绩管理 业绩信息 接口
            urlResultAnalysis:urlIP + "/resultAnalysis/getAnalysis",//业绩分析 业绩管理 业绩分析 饼图 接口
            urlResultAnalysisTypeRate:urlIP + "/storeAnalysis/getProductTypeRate",//业绩分析 业绩管理 商品类别占比分析 接口
            urlResultAnalysisProductTop10:urlIP + "/resultAnalysis/getProductTop10",//业绩分析 业绩管理 商品top10信息 接口
            urlResultAnalysisRechargeList:urlIP + "/resultAnalysis/getRechargeList",//业绩分析 业绩管理 本月充值单信息 接口
            urlResultAnalysisDeptTaskStatistics:urlIP + "/taskStatistics/deptTaskCount",//业绩分析 任务统计 部门统计 接口
            urlResultAnalysisTypeTaskStatistics:urlIP + "/taskStatistics/taskTypeCount",//业绩分析 任务统计 任务类型统计 接口
            urlResultAnalysisPushTaskStatistics:urlIP + "/taskStatistics/pushTaskCount",//业绩分析 任务统计 推送任务统计 接口

            //应用 学习中心
            urlSchoolGetStudyTask:urlIPCenter + "/school/school/getTask",//商学院 我的课程列表 接口
            urlSchoolGetStudyRecommend:urlIPCenter + "/school/school/getRecommend",//商学院 课程推荐列表 接口
            urlSchoolGetStudyIntegral:urlIPCenter + "/school/school/getIntegral",//商学院 用户积分查询 接口
            urlSchoolGetStudyAverage:urlIPCenter + "/school/getAverage",//商学院 用户考试平均分 接口
            urlSchoolGetStudyTaskDetail:urlIPCenter + "/school/school/getTaskInfo",//商学院 学习任务列表 学习任务详情 接口
            urlSchoolGetStudyRecommendDetail:urlIPCenter + "/school/school/getCourse",//商学院 课程推荐列表 课程推荐详情 接口
            urlSchoolGetCourseUrl:urlIPCenter + "/school/getURL",//商学院 获取课程的地址
            urlSchoolStudyProgress:urlIPCenter + "/study/getSchedule",//学习中心学习进度
            urlSchoolStudyCourseDetail:urlIPCenter + "/school/study/getCoursesDetail",//学习中心 课程详情
            urlSchoolStudyCourseExamGet:urlIPCenter + "/study/getExam",//学习中心 应知应会 考试题获取接口
            urlSchoolStudyCourseExamPut:urlIPCenter + "/study/putExam",//学习中心 应知应会 考试提交接口

            //诊断报告
            urlReportGetRerformancePre:urlIP + "/indexType/getReportByUserId",//诊断报告 根据用户获取上个月业务诊断 接口
            urlReportHistoryScoreLastestMon6:urlIP + "/indexType/getChartDataOfHalfAYear",//诊断报告 历史得分(最近六个月) 接口
            urlReportGetIndexTableAndAdvice:urlIP + "/indexType/getReportTableAndAadvice",//诊断报告 获取报告表格和建议 接口

            //争锋计划
            urlFightPlan:urlIP + "/knowledge/getZFProjectList",//争锋计划 文件数据接口 接口

            //业务进度
            urlProgressResultEstimateSet:urlIP + "/achievementTarget/saveAchievementPrediction",//业务进度 - 业绩预估 设置
            urlProgressResultEstimateGet:urlIP + "/achievementTarget/getAchievementPrediction",//业务进度 - 业绩预估 获取
            urlResultProgressCenter:urlIP + "/achievementTarget/getMonthTarget",//业务进度 运营中心
            urlResultProgressProgress:urlIP + "/achievementTarget/getAchievementList",//业务进度 进度表
            urlResultProgressRank:urlIPCenter + "/order/store-recharge-order/ranking",//业务进度 排名

            //主页
            urlHomeNoticesGet:urlIP + "/notify/bannerNotices",//主页 公告通知 获取
            urlHomeVisitNum:urlIP + "/task/storeVisitNum",//主页 客户数量 获取

            //重点专案
            urlImportmentCaseAddTask:urlIP2 + "/task/addPointTask",//重点专案 添加任务
            urlImportmentCaseDetail:urlIP2 + "/task/getDynamicPinTraceDetails",//重点专案 详情
            urlImportmentCaseActivityDetail:urlIP2 + "/task/getActivityTraceDetails",//重点专案 活动模版详情


            //客户 (单勇 start)
            //通知
            urlInform:urlIP+"/notify/left",//获取通知一级页面总览
            urlInTaskform:urlIP+"/notify/getListData",//获取任务通知列表

            //客户
            urlCustomerGet:urlIPCenter + "/store/sales-organization/get-list-by-user",//城市列表
            urlCustomerListGet:urlIPCenter + "/dw/store/list",//客户列表
            urlCustomerDetailBase:urlIPCenter + "/store/store-info/get-store-details",//客户详情
            urlCustomerDetailSum:urlIPCenter + "/store/store-info/get-store-data-info",//客户详情-金额
            //客户详情
            urlCustomerDetail:IPCenterCRM + "/record/find",//CRM档案信息-基本资料
            urlCustomerCompact:IPCenterCRM + "/record/getContractBasicInfo",//CRM档案信息-合同信息
            urlCustomerTaskPicture:urlIPCenter + "/yyt-api/task/get-all-task-picture",//客户档案
            urlCustomerPhoneNote:IPCenterCRM + "/record/send/",//微信获取客户数据
            urlCustomerTheme:IPCenterCRM + "/reply/category",//回访主题

            //分配客户
            urlCustomerAllocation:urlIPCenter + "/ehr/employee/province_manager_list",
            //urlCustomerRegionList:"http://192.168.2.70:8085" + "/framework/region_list_yyt",//查询大区总监信息
            //分配客户修改对应的客户经理
            urlCustomerAllocationAdd:IPCenterCRM + "/record/shift",//提交到CRM
            urlCustomerReturn:IPCenterCRM+"/reply/after/home",//回访明细
            urlCustomerReturnDetail:IPCenterCRM+"/yyt/reply/detail",//回访详情
            urlCustomerReturnAdd:IPCenterCRM+"/reply/addAfterReply",//添加售后回访

            //客户退盟、维权添加
            urlCustomerApprovalList:IPCenterCRM + "/auditing",//审核列表
            urlCustomerApprovalDetail:IPCenterCRM+"/auditing/",//审核详情
            urlCustomerApprovalOpinion:IPCenterCRM+"/auditing/reply/",//审核意见
            urlCustomersGet:urlIPCenter+"/store/store-info/find-stores-userid",//获取可选客户列表
            urlUploadFile:IPCenterCRM + "/file/upload",//上传文件
            urlCustomerApprovalDataSave:IPCenterCRM + "/auditing/reply/",//添加审核意见
            urlCustomerApprovalDataUpdate:IPCenterCRM + "/auditing/status/",//添加审核意见
            urlCustomerDataSave:IPCenterCRM + "/auditing/type/",//添加申请
            // 客户 (单勇 end)


            //店址审核
            urlTaskShopAdressAudit:urlIP + "/taskSelectAddress/getListData",//店址审核列表
            urlTaskShopAdressAuditDetail:urlIPCenter + "/yyt-api/task/get-task-select-address-details",//审核详情
            urlTaskShopAdressAuditUpdateData:urlIP + "/taskSelectAddress/updateData",//更新审核反馈信息
            urlTaskShopAdressAuditTaskAudit:urlIP + "/taskSelectAddress/audit",//店址审核是否通过

            //四个1工程操作模块
            urlProj1111TaskList:urlIP + "/customer1111/getListData",//四个1工程任务列表
            urlProj1111TaskDetail:urlIPCenter + "/yyt-api/customer1111/get-customer1111-detail",//四个1工程任务 详情
            urlProj1111TaskUpdateTarget:urlIP + "/customer1111/updateJson",//四个1 目标提交
            urlProj1111TaskModeDetail:urlIP + "/customer1111/getCustomer1111AllStep",//四个1 模版详情
            urlProj1111TaskModeFileAdd:urlIP + "/customer1111/submitFiles",//四个1 文件路径提交

            //个人中心
            urlPersonRanking:urlIPCenter + "/order/store-recharge-order/person-ranking",//个人中心 排名（个人/部门）
            urlGetIntegralInfo:urlIP + "/log/getIntegralInfo",//个人中心 获取积分
            urlUpdatePassword:urlIP + "/user/updatePsw",//个人中心 修改密码
            urlMyCourse:urlIPCenter + "/school/course/me",//个人中心 我的课程
            urlWeekReportDetail2:urlIPCenter + "/store/store-info/get-store-order-achievement",//个人中心 周报详情 业绩
            urlCutRole:urlIPCenter + "/yyt-api/switched/get-user-token",//个人中心 切换角色获取token


            urlIntegral:urlIP+"/log/getIntegral",//个人积分
            urlGetProvince:urlIPCenter+"/store/sales-organization/get-provincial-list-by-user",//获取省份
            urlCustomerIndex:urlIP+'/store/getCustomerManagement',//客户首页
            urlTaskIndex:urlIP2+"/task/getTaskManagement",//任务首页
            // http://VoIP.lexinvip.com:8081
            urlGuideAnalyzeArea:urlIP+"/task/checkStoreAnalysisCompany",
            urlGetPicture:urlIP+"/knowledge/getListData",
            urlGuideAnalyzeBusinessCheck:urlIP+"/task/checkStoreAnalysisRegion",
            urlPictureDetail:urlIP+"/knowledge/findknowledgeById",

            urlSign:urlIP+'/signin/getTodaySigninInfo',
            urlAddSign:urlIP+'/signin/addJson',
            urlGuideAnalyzeRechargeDetail:urlIPCenter + "/order/store-recharge-order/money_detail",//门店充值明细


        };
    }

    static getIP(){
        //this.getUrls(this.IPConfig.IPTest);

        if(this.urlSets == null)
        {
            return LocalStorage.get(this.IPConfig.namekey).then((reponseJson) => {
                reponseJson = reponseJson == null || reponseJson == undefined ? this.IPConfig.IP : reponseJson;
                this.getUrls(reponseJson);
                return reponseJson;
            });
        }

    }

}

HttpUrls.getIP();
