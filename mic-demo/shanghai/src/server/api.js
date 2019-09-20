/**
 * API接口定义
 */
let baseURL = '';
let IMGURL = '';
let _ENV = process.env.NODE_ENV;
switch (_ENV) {
    case 'development':
        // baseURL = 'https://haoguanjia.omniview.pro/api';
        //IMGURL = 'https://haoguanjia.omniview.pro/file';
        baseURL = 'https://haoguanjia-test.omniview.pro/api';
        IMGURL = 'https://haoguanjia-test.omniview.pro/file';
        // baseURL = 'http://88.88.88.186:8765';
        // baseURL = 'https://haoguanjia-test.omniview.pro/bff/api';
        break;
    case 'pre-production':
        baseURL = 'http://88.88.88.90:8765';
        break;
    case 'production':
        // baseURL = 'http://119.28.135.68';
        //通过nginx转发不需要配置完整路径
        baseURL = 'https://haoguanjia-test.omniview.pro/api';
        IMGURL = 'https://haoguanjia-test.omniview.pro/file'
        break;
};

const asset = baseURL + '/service-house-manager';


export default {
    IMGURL: IMGURL,
    BASEURL: baseURL,
    GET_TOKEN: baseURL + '/uaa/oauth/token', // 获取token
    SIGN_IN: baseURL + '/uaa/public/register', // 注册
    GET_USER_INFO: baseURL + '/service-user/loginUserInfo', // 获取登录人信息
    GET_MENU_TREE: baseURL + '/service-permission/menu/tree', //获取权限树
    PUT_USER_INFO: baseURL + '/service-user/user/info', // 修改个人信息
    GET_PHONE_CODE: baseURL + '/uaa/public/send/{type}/{phone}', // 获取验证码
    POST_FORGET_PWD: baseURL + '/uaa/public/forget/pwd', // 忘记密码
    PUT_PWD: baseURL + '/service-user/user/password', // 修改密码
    PUT_AVATAR: baseURL + '/service-user/user/proPic/', // 上传头像
    GET_TODO_LIST: baseURL + '/service-record/todo/item', // 获取待办事项
    GET_TODO_COUNT: baseURL + '/service-accounting/todo/count', // 待办统计
    GET_LEASE_RATE: baseURL + '/service-house/leaseRate', // 获取空置率
    GET_INCOME: baseURL + '/service-accounting/account/lease/income', // 获取本月收入情况
    GET_NET_INCOME: baseURL + '/service-accounting/account/lease/balance', // 获取本月结余
    GET_HOUSE_LIST_CENTRAL: baseURL + '/service-house/house/jz', // 获取房态列表
    GET_HOUSE_LIST_DISTRIBUTED: baseURL + '/service-house/house/fs', // 获取房态列表
    GET_LEASE_INFO: baseURL + '/service-accounting/account/lease/room/', // 根据房屋id获取租约
    GET_LEASE_ACCOUNT: baseURL + '/service-accounting/account/lease/leasedetails/', // 根据租约详情id获取租约账单
    GET_LEASE_PDF: baseURL + '/service-pay/signature/download', //电子合同查看合同pdf查看
    GET_LEASE: baseURL + '/service-accounting/account/lease/lease/', // 根据租约id获取租约账单
    GET_COMMUNITY_LIST: baseURL + '/service-house/community', //小区列表
    GET_COMMUNITY_LIST_SEARCH: baseURL + '/service-house/community?name_l={name}', //小区列表
    POST_COMMUNITY_LIST: baseURL + '/service-house/community', // 新增小区
    GET_PROVINCE_LIST: baseURL + '/service-house/public/areas/province', // 获取省份
    GET_CITY_LIST: baseURL + '/service-house/public/areas/province/', // 根据省份id获取市
    GET_COUNTY_LIST: baseURL + '/service-house/public/areas/province/city/', // 根据市id获取区县
    GET_CITY_DETAIL: baseURL + '/service-house/public/areas/city', // 市详情
    GET_LEASE_LIST: baseURL + '/service-accounting/account/lease/page/select', // 获取租约列表
    CHECK_BILLING_STATUS: baseURL + '/service-accounting/billing/{leaseId}', //判断是否可以作废
    PUT_CHECKOUT: baseURL + '/service-accounting/account/lease/rent/reback/', // 根据租约id退房
    PUT_CHECKOUT_CLEAR: baseURL + '/service-accounting/account/lease/rent/refund/reback/', // 根据租约id退款退房
    PUT_CHANGE_STATUS: baseURL + '/service-accounting/account/lease/lease/', // 根据租约id修改租约状态
    /** 预约 */
    GET_BOOKING_LIST: baseURL + '/service-house/checkHouse', // 获取预约单列表
    DELETE_BOOKING_ITEM: baseURL + '/service-house/checkHouse/{id}', // 根据id删除预约单
    POST_BOOKING_ITEM: baseURL + '/service-house/checkHouse', // 新增预约单
    PUT_BOOKING_ADD_RESULT: baseURL + '/service-house/checkHouse/result/{id}', // 预约登记结果
    GET_INTENTION_CUSTOMERS: baseURL + '/service-accounting/tenant/tenant/intentional/customer', //意向客户列表
    GET_INTENTION_CUSTOMERS_LIST: baseURL + '/service-accounting/tenant/customer', //意向列表
    POST_REGISTRATION_FOLLOW_UP: baseURL + '/service-house/checkHouse/event', //登记跟进
    POST_ADD_INTENTION_CUSTOMER: baseURL + '/service-accounting/tenant/customer/save', //新增意向客户
    GET_INTENTION_DETAIL: baseURL + '/service-accounting/tenant/customer/{id}', //意向客户详情
    GET_BOOKING_CUSTOMER_LIST: baseURL + '/service-accounting/customer', //意向客户列表
    POST_BOOKING_CUSTOMER_REGISTRATION: baseURL + '/service-house/checkHouse/event', //登记更进
    GET_HOUSE_ADDRESS_LIKE: baseURL + '/service-house/houses/user', //房源地址模糊搜索
    GET_HOUSE_ADDRESS_LIKE_SEEHOUSE: baseURL + '/service-house/house/room', //房源地址模糊搜索
    GET_ACCOUNT_LIST: baseURL + '/service-accounting/account/lease/account', // 获取账单列表
    GET_ACCOUNT_TYPE: baseURL + '/service-accounting/acctType/type', // 获取 账务-账单项目
    POST_OWNER_PROPERTY: baseURL + '/service-accounting/account/lease/owner', //添加业主信息及产权信息
    POST_FREE_PROPERTY: baseURL + '/service-accounting/property/add', //自有产权录入
    POST_PROPERTY_LIST: baseURL + '/service-accounting/property/page', // 获取产权信息列表
    GET_PROPERTY_DETAIL: baseURL + '/service-accounting/property/', // 根据id查看产权信息
    PUT_PROPERTY_DETAIL: baseURL + '/service-accounting/property/', // 根据id修改产权信息
    DELETE_PROPERTY_DETAIL: baseURL + '/service-accounting/property/', // 根据id删除产权信息
    GET_PROPERTY_HOUSE: baseURL + '/service-house/house/name/cq', // 产权录入页面获取根据名字模糊搜索house
    PUT_RECEIVE_MONEY: baseURL + '/service-accounting/leaseAccountingDetail/receive', //账务账单列表-收付款操作
    PUT_RECEIVE_BATCH: baseURL + '/service-accounting/leaseAccountingDetail/batch/receive', //账务账单列表-批量收付款操作
    ACCOUNT_BILLING_DETAIL: baseURL + '/service-accounting/leaseAccountingDetail/{id}', //账单明细
    RECHARGE_USING: baseURL + '/service-user/recharge/using', //新增收款
    RENT_RELIEF_RECORD: asset + '/rentRelief/record', //新增抵扣
    GET_CHECHOUT_RECORD: baseURL + '/service-accounting/account/lease/reback/recard', //退房获取账务列表
    PUT_CHECHOUT_RECORD: baseURL + '/service-accounting/account/lease/rent/refund/reback/', //根据租约id提交退房
    //房源
    POST_ADD_HOUSE: baseURL + '/service-house/house/fs', //房源新增分散
    POST_ADD_HOUSE_CENTRAL: baseURL + '/service-house/house/jz', //房源新增集中
    PUT_EDIT_DISPERSESINGLE_ROOM: baseURL + '/service-house/house/room/fs/{id}', //房屋信息编辑(分散式合租房间)
    PUT_EDIT_ROOMMATESENTIRE: baseURL + '/service-house/house/house/fs/{id}', //房屋信息编辑(分散式合租整套)
    PUT_EDIT_DISPERSEENTIRE: baseURL + '/service-house/house/HouseRoom/fs/{id}', //房屋信息编辑(分散式整租)
    PUT_EDIT_SINGLEROOM_LIST: baseURL + '/service-house/house/houseRoom/jz/{id}', //房屋信息编辑(集中式)
    GET_FEE_LISTS: baseURL + '/service-accounting/acctType/parent/{ids}', //费用一级
    GET_CITYCODE: baseURL + '/service-house/public/areas/city', //根据市区得到市区code
    GET_FEE_OF_WATERELE: baseURL + '/service-house/public/busi/code/{city}/{type}', //便民缴费
    ADD_TEMPLATE_POST: baseURL + '/service-house/template', //新增模板
    ADD_TEMPLATE_GET: baseURL + '/service-house/template', //模板列表
    ADD_TEMPLATE_DELETE: baseURL + '/service-house/template/{id}', //删除模板
    USE_TEMPLATE_TO_HOME_POST: baseURL + '/service-house/template/use', //应用模板
    //新增租约
    GET_FEE_ALL: baseURL + '/service-accounting/acctType/', //所有费用类型 平级
    GET_HOUSE_ADDRESS: baseURL + '/service-house/house/name', //名称模糊搜索
    POST_NEW_LEASE: baseURL + '/service-accounting/account/lease/', // 添加租客登记（新租约）
    PUT_RELET_LEASE: baseURL + '/service-accounting/account/lease/renew', //续租
    GET_LEASE_DETAIL: baseURL + '/service-accounting/account/lease/lease/details', //根据房屋id查租约详情
    GET_ROOM_DETAIL: baseURL + '/service-house/house/id', //根据房屋id查房屋详情
    GET_CONTRACTMODEL_LISE: baseURL + '/service-accounting/account/lease/template/index', //合同模板列表
    GET_BLAMER: baseURL + '/service-user/corporation/users', // 获取负责人列表
    GET_STAGE_LISE: baseURL + '/service-accounting/stages/index/combination',
    //文件上传
    FILE_UPLOAD_POST: baseURL + '/service-file/upload/1/temp', //文件上传
    GET_FILE_UPLOAD_CODE_GET: baseURL + '/service-file/QCode/code', //获取上传文件code
    GET_FILE_UPLOAD_POST: baseURL + '/service-file/QCode/{code}', //获取上传的图片
    DELETE_FILE_UPLOAD_BY_CODE: baseURL + '/service-file/QCode/code', //删除code下面的图片
    DELETE_FILE_UPLOAD_POST: baseURL + '/service-file/QCode/{code}/{id}', //删除上传的图片
    //img上传
    IMG_UPLOAD_URL: baseURL + "/service-file/upload/1/temp",
    /** ------ 资产管理 ------ **/
    ASSET_ZONE: asset + '/zone/', // 获取区域
    SEARCH_ZONE: asset + '/zone/page', // 查询区域
    ASSET_COMMUNITY: asset + '/community/', // 资产-小区
    SEARCH_COMMUNITY: asset + '/community/page', // 查询小区
    ASSET_CLASS: asset + '/house/use/', // 资产用途及分类
    SEARCH_CLASS: asset + '/house/use/page', // 搜索资产用途及分类
    ASSET_INVESTOR: asset + '/spnonsor/', // 出资人
    SEARCH_INVESTOR: asset + '/spnonsor/page', // 搜索出资人
    ASSET_METHOD: asset + '/acquisitionMethod/', // 资产获取方式
    SEARCH_METHOD: asset + '/acquisitionMethod/page', // 搜索资产获取方式
    ASSET_STRUCTION: asset + '/housestructure/', // 房屋结构
    SEARCH_STRUCTION: asset + '/housestructure/page', // 搜索房屋结构
    ASSET_STYLE: asset + '/housetype/', // 房型
    SEARCH_STYLE: asset + '/housetype/page', // 搜索房型
    ASSET_FLOOR: asset + '/floor/', // 楼栋
    EDIT_ASSET_FLOOR: asset + '/floor/index', //楼栋新增、编辑
    SEARCH_FLOOR: asset + '/floor/page', // 搜索楼栋
    ASSET_HOUSE: asset + '/house/', // 楼栋分户
    ADD_ASSET_HOUSE: asset + '/house/add', // 楼栋分户
    VIEW_SUMMARY: asset + '/house/assets/summary', // 资产汇总表
    VIEW_DETAILS: asset + '/house/assets/details', // 资产明细表
    OPERATION_SUMMARY: asset + '/export/operation/situation', // 运营情况汇总
    OPERATION_DETAILS: asset + '/export/operation/situation/zone', // 运营情况明细
    GET_MANAGER: asset + '/project/user', // 获取管理人员
    ASSET_PROJECT: asset + '/project/', // 获取项目
    SEARCH_PROJECT: asset + '/project/page', // 搜索项目
    GET_ASSETUSE: asset + '/assetuse/', // 获取资产用途
    ASSET_HOUSE_LIST: asset + '/house/page', // 获取分户
    ASSET_UPLOAD: asset + '/import/upload', // 获取分户
    ASSET_TYPES: asset + '/house/use/all', // 获取资产分类二级列表
    GET_COMMUNITY_BY_PROJECT: asset + '/community/project/', //根据项目获取对应小区
    PUT_RENT: asset + '/floor/usage/', // 将楼栋推送为出租/出售  出租：0  出售：1
    PUT_USE_BACK: asset + '/floor/use/{id}/back', // 撤回出租/出售
    PUT_BLAMER: asset + '/floor/blamer/{blamerId}/floor/{floorId}', // 改变楼栋负责人
    DELETE_ROOM: asset + '/house/abandon/{id}/status/{status}', // 作废分户

    POST_ASSET_ROOM: asset + '/house/add', // 资产管理-分户管理-添加分户
    POST_ADD_VERIFY: asset + '/house/verify/add/{id}', // 提交分户新增审核
    POST_BUILDING_ADD_VERIFY: asset + '/floor/verify/add/{id}', // 提交楼栋新增审核
    POST_BACK_VERIFY: asset + '/assets/audit/{id}/3', // 修改资产分户的审批状态
    POST_BUILDING_BACK_VERIFY: asset + '/assets/audit/{id}/5', // 修改资产楼栋的审批状态
    PUT_EDIT_ROOM: asset + '/house/index/house/{id}/status/{status}', // 修改分户
    PUT_EDIT_BUILDING: asset + '/floor/index/house/{id}/status/{status}', // 修改分户
    POST_AUDIT_ROOM: asset + '/verfiyPage/page', // 获取分户审批列表
    POST_AUDIT_BUILDING: asset + '/floor/verfiyPage/page', // 获取楼栋审批列表
    GET_ROOM_INFO: asset + '/house/record/', // 审批列表中查看分户详情
    GET_BUILDING_INFO: asset + '/floor/record/', // 审批列表中查看楼栋详情


    /** Dashboard */
    GET_ASSET_INFO: baseURL + '/service-house/dashboard/assets', // 资产-资产
    GET_COUNT_TOTAL: baseURL + '/service-accounting/dashborad/countTotal', // 资产Dashbord--当月各类型房源收入统计
    GET_GROUP_BY_MONTH: baseURL + '/service-accounting/dashborad/groupByMonth', // 资产Dashbord--资产总收入统计 统计表进行查询
    GET_RENT: baseURL + '/service-accounting/dashborad/rent/', // 已租数量统计、已租面积统计
    GET_ASSET_TODO: baseURL + '/service-house-manager/dashboard/todo/item', // 资产--代办事项
    GET_EXPIRES: baseURL + '/service-accounting/dashboard/lease/expire', // 快到期合同
    GET_OVERDUE: baseURL + '/service-accounting/dashboard/overdue', //逾期
    GET_INCOME_INFO: baseURL + '/service-accounting/dashboard/income/count', // 收入情况

    // 租客管理
    GET_TEANANT_HOUSE_ADDRESS: baseURL + '/service-accounting/account/lease/name', //
    TEANANT_LIST_POST: baseURL + '/service-accounting/tenant/page', //租客列表
    TEANANT_LIST_ADD_POST: baseURL + '/service-accounting/tenant/', //新增租客列表
    TEANANT_LEASE_GET: baseURL + '/service-accounting/account/lease/tenantlease/{tenantId}', //租客列表查看租约
    // 配置中心
    POCKER_BOOK_LIST_GET: baseURL + '/service-accounting/customAcctType/', //记账本配置查询
    POCKER_BOOK_EDIT_POST: baseURL + '/service-accounting/customAcctType/result/', //记账本配置修改保存
    PAYMENT_LIST_GET: baseURL + '/service-accounting/paymethod/', //收款方式配置查询
    PAYMENT_ADD_POST: baseURL + '/service-accounting/paymethod/', //新增收款方式
    //合同模板
    GET_CONTRACT_TEMPLATE_LIST: baseURL + '/service-accounting/account/lease/template/index', //模板列表
    POST_CONTRACT_TEMPLATE: baseURL + '/service-accounting/account/lease/template/lease/template', //模板新增
    UPDATE_CONTRACT_TEMPLATE: baseURL + '/service-accounting/account/lease/template/update', //编辑模板
    GET_CONTRACH_TDETAIL: baseURL + '/service-accounting/account/lease/template/index/{id}', //模板详情
    DELETE_CONTRACT_TEMPLATE: baseURL + '/service-accounting/account/lease/template/lease/template/{id}', //删除模板
    START_CONTRACT_TEMPLATE: baseURL + '/service-accounting/account/lease/template/enable/{id}', //启用模板
    STOP_CONTRACT_TEMPLATE: baseURL + '/service-accounting/account/lease/template/discontinue/{id}', //停用模板
    DEFAULT_CONTRACT_TEMPLATE: baseURL + '/service-accounting/account/lease/template/default/contract/{id}', //设为默认合同
    //停用模板
    // 资产配置
    GET_WAY_SAVE: asset + '/acquisitionMethod/batch',
    GET_TYPE_BATCH: asset + '/house/use/batch',
    HOUSTE_STYLE_BATCH: asset + '/housetype/batch',
    ASSET_USE: asset + '/assetuse/',
    ASSET_USE_BATCH: asset + '/assetuse/batch',
    // 租赁房源配置
    RENT_RELATED: asset + '/rent/related/',
    // 'http://88.88.88.90:8765/service-house-manager1'
    RENT_RELATED: asset + '/rent/related/', //查询租金相关配置
    HOUSE_CONFIG: asset + '/houseConfigs', //查询房源配置
    HOUSE_CONFIG_POST: asset + '/houseConfig', //保存房源配置
    // 分期配置
    STAGING_DIC_GET: baseURL + '/service-accounting/stages/staging/dictionary', //查询分期字段表
    STAGING_INDEX_GET: baseURL + '/service-accounting/stages/index', //查询分期配置
    STAGIN_CREATE_POST: baseURL + '/service-accounting/stages/create', //新增修改分期
    STAGING_COMBINATION_GET: baseURL + '/service-accounting/stages/index/combination', //查询分期组合列表
    STAGING_COMBINATION_POST: baseURL + '/service-accounting/stages/combination', //新增分期组合
    STAGING_COMBINATION_DELETE: baseURL + '/service-accounting/stages/{id}', //删除分期组合
    STAGING_COMBINATION_UPDATE: baseURL + '/service-accounting/stages/update', //分组修改
    //记账本
    NOTE_COMMUNITY_LIST: baseURL + '/service-house/community/cashbook', //小区列表
    NOTE_HOUSE_LIST: baseURL + '/service-house/house/cashbook', //房屋列表
    NOTE_ROOM_LIST: baseURL + '/service-house/room/cashbook', //房间列表
    NOTE_GET_CUSTOMACCTYPE: baseURL + '/service-accounting/customAcctType/parent/{id}', //根据父类找子类，id为1查一级
    GET_PAY_METHODS: baseURL + '/service-accounting/paymethod/', //支付方式
    GET_PAY_METHODS_SAVE: baseURL + '/service-accounting/paymethod/batch', //支付方式保存
    GET_USER_STORE: baseURL + '/service-user/store/children', //门店列表
    POST_ADD_MANUAL: baseURL + '/service-accounting/manual/', //新增记账
    PUT_AFFIRM_NOTE: baseURL + '/service-accounting/manual/{id}', //确认收付款
    GET_NOTE_LIST: baseURL + '/service-accounting/manual/select/page', //获取列表
    //获取水电煤
    // 权限
    // 分店设置
    //
    GET_STORES_LIST: baseURL + '/service-user/storesInfo/count', //查询分店列表
    GET_STORE_DETAIL: baseURL + '/service-user/store/{id}/info', //门店详情
    ADDD_STORES: baseURL + '/service-user/store/manage', //新增分店
    RECEUVED_METHOD: baseURL + '/service-user/config/received/method', //支付进件(总店)
    NEW_RECEUVED_METHOD: baseURL + '/service-user/config/new/received/method', //支付进件(开设分店新账户)
    UPDATE_REPORT: baseURL + '/service-user/report/info/update', //重新进鉴
    REPORT_INFI: baseURL + '/service-user/report/{id}/info', //进件详情
    BANK_LIST: baseURL + '/service-user/public/union/bank/{name}', //查看支行列表
    ALL_CITY_LIST: baseURL + '/service-user/public/union/area/{id}', //查询地区
    ADD_RECORD: baseURL + '/service-user/record/store', //开通电子签
    OPEN_STORE: baseURL + "/service-user/open/store/{id}", //开启分店
    CLOSE_STORE: baseURL + "/service-user/close/store/{id}", //关闭分店
    MERCHANT: baseURL + '/service-user/merchant', //分店三方收费户
    BELONG_STAFF: baseURL + '/service-user/staff/belong', //查看员工属于哪些店铺
    CHOOSE_STORE: baseURL + '/service-user/choose/store/{id}', //切换分店

    //交易流水
    GET_TRANSACTION_LIST: baseURL + '/service-accounting/trade/flows', //交易流水列表
    GET_TRANSACTION_DETAIL: baseURL + '/service-accounting/trade/tradeFlowInfo/{id}', //流水详情
    PUT_CHECKD_BATCH: baseURL + '/service-accounting/trade/batch/check', //批量核销
    PUT_CHECKD_SINGLE: baseURL + '/service-accounting/trade/check', //单个核销
    //权限-房源分配
    // GET_CLERK_LISTS: "http://88.88.88.92:8102" + "/service-user3/store/{id}/users", //得到人员列表
    GET_CLERK_LISTS: baseURL + "/service-user/store/{id}/users", //得到人员列表
    GET_HOUST_LISTS_BY_STORE: baseURL + "/service-house/house/storeId", //根据门店得到房源列表
    PUT_HOUSE_DISTRIBUTION: baseURL + "/service-house/house/storeId", //分配房源所属门店
    PUT_CLERK_DISTRIBUTION: baseURL + "/service-user/config/staff/house", //配置员工管理的房源
    GET_USER_STORE_HAO: baseURL + '/service-user/store/children', //门店列表
    GET_ALL_ROLE: baseURL + "/service-permission/menu/tree", //获取权限
    PUT_COPY_STAFF_TO_STORE: baseURL + "/service-user/copy/staff/{staffIds}/store/{storeIds}/{isRemove}/{presentStore}", //复制员工到其他门店
    PUT_DELETE_STORE_PERSENT: baseURL + "/service-user/remove/staff/{staffIds}/store/{storeId}",
    GET_ALL_CHARACTER_LISTS: baseURL + "/service-permission/org/roles/{storeId}", //全量角色列表
    GET_ALL_STAFF_LISTS: baseURL + "/service-user/corporation/users", //查看集团所有员工
    PUT_CLOSE_STAFF: baseURL + '/service-user/disable/staff/{staffIds}', //员工禁用
    PUT_OPEN_STAFF: baseURL + '/service-user/enable/staff/{staffIds}', //员工启用
    PUT_DEL_STAFF: baseURL + '/service-user/logout/staff/{staffIds}', //员工注销
    GET_STAFF_ISEXIST: baseURL + "/service-user/check/phone", //校验手机号码是否存在
    PUT_RESET_STAFF_PASSWORD: baseURL + '/service-user/replace/pwd/{userId}', //重置员工密码
    POST_ADD_STAFF: baseURL + '/service-user/staff/manage', //新增员工
    POST_ADD_CHARACTER: baseURL + '/service-permission/role', //新增角色
    GET_CHARACTER_DETAIL: baseURL + '/service-permission/roles/{id}', //角色权限
    PUT_CHARACTER: baseURL + "/service-permission/role/{id}", //编辑角色
    PUT_MASS_CHARACTER: baseURL + "/service-permission/role/name/update", //批量编辑角色
    DELETE_CHARACTER: baseURL + "/service-permission/role/{id}", //删除角色
    PUT_CHARACTER_TO_STAFF: baseURL + "/service-user/staffs/{staffIds}/roles/{roleIds}", //给多名员工分配不同角色
    GET_LOGIN_HISTORY: baseURL + "/service-user/user/{id}/loginRecord", //登录日志
    GET_AREA_LIST: baseURL + '/service-house-manager/project/', //区域
    //账单列表 - 公共事业
    GET_PUBLIC_LIST: baseURL + "/service-accounting/convenientAccounting", //公告事业账单列表
    /** 公租房 */
    /** 财务---政策性减免 */
    // REGULARITY_REDUCTION_LIST: asset + '/rentRelief/page', //政策性减免列表
    REGULARITY_REDUCTION_LIST: asset + '/rentRelief/index', //政策性减免列表
    REGULARITY_REDUCTION_DETAIL: asset + '/rentRelief/{id}', //政策性减免详情
    REGULARITY_REDUCTION_IMPORT: asset + '/rentRelief/import', //政策性减免模板下载
    /** 财务---预付费*/
    PRE_PAYMENT_LIST: baseURL + '/service-accounting/tenant/recharge/users', //列表
    PRE_PAYMENT_ADD: baseURL + '/service-user/recharge/offline', //预付费登记
    PRE_PAYMENT_USERS: baseURL + '/service-accounting/tenant/tenants', //租户搜索
    PRE_PAYMENT_DETAIL: baseURL + '/service-user/recharge/{userId}', //预付费详情

    // 根据配租单查询承租人信息
    GET_TENANT_INFO: baseURL + '/service-house-manager/allocation/rent',
    /** 租约--配租单 */
    BILLING_LIST: asset + '/allocation/page', //配租单列表
    BILLING_DETAIL: asset + '/allocation/{id}', //配租单详情
    BILING_IMPORT: asset + '/allocation/import', //导入execl
    BILLING_SAVE: asset + '/tenant/add', //登记保存
    /** 租约 - 详情 - 账务信息*/
    HAND_ADD_BILL: baseURL + '/service-accounting/leaseAccountingDetail/', //手动添加账单
    JUDGE_STAGE_AND_ELEC: baseURL + '/service-accounting/stages/check/store/busi', //判断是否可用分期和电子签
    POST_CHECKOUT_LIST: baseURL + '/service-accounting/roomcost/page/select', // 获取退租单列表
    GET_REMAIN_COST: baseURL + '/service-accounting/roomCostRecord/', // 退租单列表根据id获取剩余金额
    POST_ROOM_COST: baseURL + '/service-accounting/roomCostRecord', // 退租单列表收支登记
    POST_COST_LIST: baseURL + '/service-accounting/roomCostRecord/page', // 退租单列表获取明细
    APPLYINFO_LIST: baseURL + '/service-accounting/lodger/applyInfo', //获取退租申请、续租申请列表
    /**  物业服务 ———— 报修 */
    GET_REPAIR_LIST: baseURL + '/service-accounting/repair/rent/page', // 报修列表
    GET_REPAIR_DETAIL: baseURL + '/service-accounting/repair/', // 根据报修id获取报修详情
    POST_REPAIR_RECORD: baseURL + '/service-accounting/repair/record', // 登记报修记录
    /**  快速添加 - 楼栋*/
    POST_ADD_BUILDING: asset + '/floor/index/add/syn', // 报修列表
    POST_QUICK_ADD_HOUSE_CENTRAL: baseURL + '/service-house/house/jz/fast', //房源新增集中
    /** 停车位 */
    PARK_TYPES_GET: asset + '/parkTypes', //停车位类型列表
    PARK_TYPES_Add_post: asset + '/batchAdd/parkType', //新增停车位类型
    PARKING_BATCH_POST: asset + '/park/batch', //新增停车位
    PARKING_BATCH_LIST: asset + '/parks', //查询
    PARKING_BY_ID: asset + '/park/{id}', //查询详情、修改、删除
    PARKING_CHECK_PUT: asset + '/park/check/{id}', //新增审批
    PARGING_WIDTHDRAW: asset + '/withdraw/{id}', //撤回审批
    PARGING_SUB_OPRAATE: asset + '/sub/operate/{id}', //提交运营
    PARGING_WITHDRAW_OPRAATE: asset + '/withdraw/operate/{id}', //撤回运营
    PARKING_CANCEL_PUT: asset + '/cancel/{id}', //作废
    AUDITS_PARK_LIST: asset + '/audit/parks', //停车位审批列表
    AUDITS_PARK_DETAIL: asset + '/audit/park/{id}', //停车位审批详情
    AUDITS_PARK_AUDIT: asset + '/assets/audit/{id}/{type}', //停车位审批
    PARK_REDUCITON: asset + '/reduction/park/{id}', //停车位还原
    TEANANT_MERGE: baseURL + '/service-accounting/tenant/message/merge', //租客合并
    CHECK_PARKNUM: asset + '/check/parkNum', //检验车位编号
    PROJECT_ALL_WITH_COMMUNITY: asset + '/project/all/withcommunity/', //查询项目及以下小区
    /** 广告牌 */
    POST_ADD_MASS_ADVERTISE: asset + '/advertising/batch', //批量新增广告牌信息
    GET_ADVERTISE_LIST: asset + '/advertisings', //广告位列表信息
    GET_ADVERTISE_DETAIL: asset + '/advertising/index/{id}', //广告位详情
    PUT_ADVERTISE_DETAIL: asset + '/advertising/update/{id}', //广告位修改
    DELETE_ADVERTISE: asset + '/advertising/{id}', //删除广告位信息
    PUT_SUBMIT_ADD_APPROVAL: asset + '/advertising/submit/{id}', //提交新增审批
    PUT_WITHDRAW_SUBMIT_ADD_APPROVAL: asset + '/advertising/withdraw/Approval/{id}', //撤回审核
    PUT_SUBMIT_OPEATION: asset + '/advertising/operate/{id}', //广告位批量运营/单条提交运营
    PUT_WITHDRAW_OPEATION: asset + '/advertising/withdraw/operate/{id}', //撤回运营
    GET_ADVERTISE_APPROVAL_LIST: asset + '/advertising/approvals', //广告位审批列表
    GET_ADVERTISE_APPROVAL_DETAIL: asset + '/advertising/approval/{id}', //广告位审批详情
    PUT_ADVERTISE_OBSOLETE_LIST: asset + '/advertising/cancel/{id}', //作废广告位
    PUT_REDUCTION_LIST: asset + '/advertising/reduction/{id}', //广告位数据还原
    PUT_CHECK_NUM: asset + '/check/advertisingNum', //广告位数据还原
    GET_ADVERTISE_TYPE: asset + '/billBoardTypes', //查询广告牌类型列表
    GET_ADVERTISE_FORM: asset + '/billBoardForms', //查询广告牌形式列表
    //巡检-主题
    GET_TOPIC_LISTS: baseURL + '/service-inspection/topics', //主题列表
    POST_ADD_TOPIC_LISTS: baseURL + '/service-inspection/topic', //主题列表
    GET_TOPIC_DETAIL: baseURL + '/service-inspection/topic/{id}', //主题详情查看
    PUT_TOPIC_DETAIL: baseURL + '/service-inspection/topic/{id}', //修改主题
    /** 信用退款申请 */
    REFUNDS_LIST_GET: baseURL + '/service-accounting/refunds', //退款申请列表
    REFUND_INITIATE_POST: baseURL + '/service-accounting/initiate/refund/{id}', //发起退款申请
}
