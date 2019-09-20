// import Layout from '@/views/Layout';
// import Login from '@/views/Login';
// // Home
// import Index from '@/views/home/indexLayout';
// import Home from '@/views/home/home';
// import AssetHome from '@/views/home/asset-home';
// import PublicHome from '@/views/home/public-home';
// import NormalHome from '@/views/home/normal-home';
// import StateHome from '@/views/home/state-home';
// import ApartmentHome from '@/views/home/apartment-home';
// import ShopHome from '@/views/home/shop-home';
// import OfficeHome from '@/views/home/office-home';
// import AuthorityHome from '@/views/home/authority-home';
// import PersonInfo from '@/views/home/person'; // 个人中心
// import ConfigurationCenter from '@/views/home/configuration-center/configurationCenter'; //配置中心

// import accountConfigDetail from '@/views/home/configuration-center/accountConfigDetail'; //财务配置
// import assetBase from '@/views/home/configuration-center/assetBase'; //资产基础
// import policyRelief from '@/views/home/configuration-center/policyRelief'; //政策性减免
// import staging from '@/views/home/configuration-center/staging'; //分期配置
// import contractTemplate from '@/views/home/configuration-center/contractTemplate/contractTemplateList'; //合同模板
// import contractTemplateAdd from '@/views/home/configuration-center/contractTemplate/contractTemplateAdd'; //合同模板
// import contractTemplateEdit from '@/views/home/configuration-center/contractTemplate/contractTemplateEdit'

// import propertyManagement from '@/views/home/configuration-center/propertyManagement'; //物业管理
// import rentalProperty from "@/views/home/configuration-center/rentalProperty";

// // House
// // import HouseList from '@/views/house/list';
// import DistributedHouseList from '@/views/house/distributed/list'; // 分散式房态图
// import CentralHouseList from '@/views/house/central/list'; // 集中式房态图
// import QuicklyAddRoom from "@/views/house/quicklyAddRoom/index";//快速添加房间
// import EditSingleRoomListings from '@/views/house/editHouseInfo/editSingleRoomListings'; // 编辑单间
// import DisperseSingleRoom from '@/views/house/editHouseInfo/disperseSingleRoom'; // 编辑合租单间
// import EditRoommatesEntire from '@/views/house/editHouseInfo/editRoommatesEntire'; // 编辑合租整套
// import EditDisperseEntire from '@/views/house/editHouseInfo/editDisperseEntire'; // 编辑整租房源
// import MultiRoomManagement from '@/views/house/multiRoomManagement'; //管理房间
// import HouseProperty from '@/views/house/property/list'; // 产权信息
// import CreateOwnerProperty from '@/views/house/property/create'; //新增业主合同
// import CreateFreeProperty from '@/views/house/property/create-free'; //自由产权录入
// import ViewPropertyInfo from '@/views/house/property/view'; //产权信息查看页面
// import CreateDistributedHouseList from '@/views/house/distributed/create'; //添加分散房源
// import CreateCentralHouseList from '@/views/house/central/create'; //添加集中房源
// import BookingList from '@/views/contract/booking/list'; //预约单列表
// import LeaseList from '@/views/contract/lease/list'; //预约单列表
// import BillingData from '@/views/contract/detail/billing'; //账单明细
// import TenantRegister from '@/views/contract/lease/register_add'; // 租客登记
// import TenantRegisterEdit from '@/views/contract/lease/register_edit'; // 租约编辑
// import TenantRegisterRelet from '@/views/contract/lease/register_relet'; // 续租

// import TenantList from '@/views/contract/tenantList/list'; //入住人列表
// import RenewalApplication from '@/views/contract/renewalApplication/list'; //续约申请列表
// import WithdrawalApplication from '@/views/contract/withdrawalApplication/list'; //续约申请列表
// import ChangeRoom from '@/views/contract/change-room/index'; //换房
// import AccountList from '@/views/accounting/account/list'; //账单列表
// import AccountNotes from '@/views/accounting/notes/list'; //记账本
// import Transaction from '@/views/accounting/transaction/list'; //交易流水
// import PrePayment from '@/views/accounting/prePayment/list'; //预付费
// import PrepaymentAdd from '@/views/accounting/prePayment/add'; //新增
// import PrepaymentDetail from '@/views/accounting/prePayment/view'; //详情
// import DetailData from '@/views/contract/detail/index'; // 详情页面
// import CheckOut from '@/views/contract/detail/check-out'; // 退房结算页面
// import BasicInformation from '@/views/asset/information/information'; // 资产基础信息
// import AssetManagement from '@/views/asset/management/management'; // 资产管理
// import AssetReport from '@/views/asset/report/report'; // 资产报表
// import OperationReport from '@/views/asset/report/operation-report'; // 运营情况报表
// import AssetBuilding from '@/views/asset/building/building'; // 资产-楼栋
// import AssetBuildingInfo from '@/views/asset/building/building-info'; // 资产-楼栋信息
// import AssetVerification from '@/views/asset/verification/verification'; // 资产-核销
// import AssetInvestor from '@/views/asset/investor/investor'; // 权属-出资人
// import AssetProject from '@/views/asset/project/project'; // 基础-项目列表
// import AddNewAsset from '@/views/asset/management/addNewAsset'; // 新增本层分户
// import RoomManagement from '@/views/asset/management/room'; // 分户管理
// import WholeAsset from '@/views/asset/management/wholeAsset'; // 添加整栋资产
// import OthAsset from '@/views/asset/management/othAsset'; // 添加分散资产
// import AssetProperty from '@/views/asset/management/property'; // 添加产证信息
// // import RegionArea from '@/views/asset/region/area'; // 区域管理
// import RegionCommunity from '@/views/asset/region/community'; // 小区管理
// import Investor from '@/views/asset/information/investor'; // 出资人管理
// import HouseStyle from '@/views/asset/information/house-style'; // 房型管理
// import GetMethod from '@/views/asset/information/method'; // 取得方式管理
// import HouseConstruction from '@/views/asset/information/construction'; // 房屋结构管理
// import Classification from '@/views/asset/information/classification'; // 资产用途及分类
// // Permission 权限
// // 分店设置
// import BranchList from '@/views/permission/branchSetting/list'; //分店列表
// import EditBranch from '@/views/permission/branchSetting/editBranch'; //编辑门店
// import AddBranch from '@/views/permission/branchSetting/addBranch'; //新增分店
// import BranchAccount from '@/views/permission/branchSetting/account'; //开设账户
// import ShowAccount from '@/views/permission/branchSetting/showAccount'; //查看账户
// import ShowSign from '@/views/permission/branchSetting/showSign'; //查看电子签
// import AddSign from '@/views/permission/branchSetting/addSign'; //新增电子签
// import Charge from '@/views/permission/branchSetting/charge'; //管理三方收费户
// import OrgFlatsList from '@/views/permission/orgFlatsList/list'; //房源分配
// import StaffManage from '@/views/permission/staffManage/list'; //员工管理
// import StaffManageAll from '@/views/permission/staffManage/allStaff'; //所有员工
// import StaffManageCreate from '@/views/permission/staffManage/create'; //新增员工
// import StaffManageEdit from '@/views/permission/staffManage/create'; //编辑员工
// import RolesList from '@/views/permission/roles/list'; //职位列表
// /** 公租房 */
// /** 公租房----房源 */
// import PublicHousingCentralHouseList from '@/views/public-housing/house/central/list'; // 集中式房态图
// import PublicHousingDistributedHouseList from '@/views/public-housing/house/distributed/list'; // 分散式房态图
// import PublicHousingCreateCentralHouseList from '@/views/public-housing/house/central/create'; //添加集中房源
// import PublicHousingMultiRoomManagement from '@/views/public-housing/house/multiRoomManagement'; //管理房间
// import PublicHousingCreateDistributedHouseList from '@/views/public-housing/house/distributed/create'; //添加分散房源

// import PublicHousingEditSingleRoomListings from '@/views/public-housing/house/editHouseInfo/editSingleRoomListings'; // 编辑单间
// import PublicHousingDisperseSingleRoom from '@/views/public-housing/house/editHouseInfo/disperseSingleRoom'; // 编辑合租单间
// import PublicHousingEditRoommatesEntire from '@/views/public-housing/house/editHouseInfo/editRoommatesEntire'; // 编辑合租整套
// import PublicHousingEditDisperseEntire from '@/views/public-housing/house/editHouseInfo/editDisperseEntire'; // 编辑整租房源
// /** 公租房----租约 */
// // 配租单
// import PublicHousingBillingList from '@/views/public-housing/lease/billingList/list'; //列表
// import PublicHousingBillingShow from '@/views/public-housing/lease/billingList/show'; //查看
// import PublicHousingBillingRegistration from '@/views/public-housing/lease/billingList/registration'; //登记
// // 租约列表
// import PubliceHousingLeaseList from '@/views/public-housing/lease/lease/list'; //预约单列表
// import PubliceHousingTenantRegister from '@/views/public-housing/lease/lease/register_add'; // 租客登记（新增，房态图新增）
// import PubliceHousingTenantRegisterEdit from '@/views/public-housing/lease/lease/register_edit'; // 租客登记编辑（纸质，电子）
// import PubliceHousingTenantRegisterRelet from '@/views/public-housing/lease/lease/register_relet'; // 租客续租（纸质，电子）


// import PubliceHousingDetailData from '@/views/public-housing/lease/detail/index'; // 详情页面
// import PubliceHousingCheckOut from '@/views/public-housing/lease/detail/check-out'; // 退房结算页面
// import PublicHousingBillingData from '@/views/public-housing/lease/detail/billing'; //账单明细
// // 租客列表
// import PubliceHousingTenantList from '@/views/public-housing/lease/tenantList/list'; //入住人列表
// /** 公租房----财务 */
// // 记账本
// import PublicHousingAccountNotes from '@/views/public-housing/accounting/notes/list'; //记账本
// // 账单列表
// import PublicHousingAccountList from '@/views/public-housing/accounting/account/list'; //账单列表
// // 流水清单
// import PublicHousingTransaction from '@/views/public-housing/accounting/transaction/list'; //交易流水
// // 政策性减免
// import PublicHousingRegularityReductionList from '@/views/public-housing/accounting/regularityReduction/list'; //列表
// import PublicHousingRegularityReductionShow from '@/views/public-housing/accounting/regularityReduction/show'; //查看
// // 预付款
// import PublicHousingPrePayment from '@/views/public-housing/accounting/prePayment/list'; //列表
// import PublicHousingPrepaymentAdd from '@/views/public-housing/accounting/prePayment/add'; //新增
// import PublicHousingPrepaymentDetail from '@/views/public-housing/accounting/prePayment/view'; //详情

// import CheckoutList from '@/views/accounting/checkout/checkout-list'; // 退租单列表
// import RepairList from '@/views/service/repair-list'; // 报修列表
// import RepairDetail from '@/views/service/repair-detail'; // 报修信息

// export default {
//   '0005-01': {
//     'path': {
//       path: '/basic',
//       name: 'basic',
//       meta: {
//         title: '基础',
//         abbr: '基础',
//         icon: 'md-albums',
//       },
//       component: Layout,
//     },
//     '3001': {
//       path: 'project-management',
//       name: 'basic/project-management',
//       meta: {
//         title: '项目管理',
//         icon: 'ios-list-box',
//       },
//       component: AssetProject,
//     },
//     '3004': {
//       path: 'community-management',
//       name: 'basic/community-management',
//       meta: {
//         title: '小区/公寓管理',
//         icon: 'ios-list-box',
//       },
//       component: RegionCommunity,
//     },
//   },
// }

// export default {
//   'ownership': {
//     path: '/ownership',
//     name: 'ownership',
//     meta: {
//       title: '权属',
//       abbr: '权属',
//       icon: 'md-bookmarks',
//     },
//     component: Layout,
//   },
//   '3008': {
//     path: 'investor',
//     name: 'ownership/investor',
//     meta: {
//       title: '出资人',
//       icon: 'ios-list-box',
//     },
//     component: AssetInvestor,
//   },
//   'assets': {
//     path: '/assets',
//     name: 'assets',
//     meta: {
//       title: '资产',
//       abbr: '资产',
//       icon: 'ios-cube',
//     },
//     component: Layout,
//   },
//   '3011': {
//     path: 'building',
//     name: 'assets/building',
//     meta: {
//       title: '楼栋',
//       icon: 'ios-list-box',
//     },
//     component: AssetBuilding,
//   },
//   '3025|3028': {
//     path: 'verification',
//     name: 'assets/verification',
//     meta: {
//       title: '核销审批',
//       icon: 'ios-list-box',
//     },
//     component: AssetVerification,
//   },
//   'statistics': {
//     path: '/statistics',
//     name: 'statistics',
//     meta: {
//       title: '统计分析',
//       abbr: '统计分析',
//       icon: 'ios-podium',
//     },
//     component: Layout,
//   },
//   'assetInfo': {
//     path: 'asset-info',
//     name: 'statistics/asset-info',
//     meta: {
//       title: '资产信息',
//       icon: 'ios-list-box',
//     },
//     component: AssetReport,
//   },
//   'operation': {
//     path: 'operation',
//     name: 'statistics/operation',
//     meta: {
//       title: '运营情况',
//       icon: 'ios-list-box',
//     },
//     component: OperationReport,
//   },
//   'costInfo': {
//     path: 'cost',
//     name: 'statistics/cost',
//     meta: {
//       title: '费用情况',
//       icon: 'ios-list-box',
//     },
//     // component: AssetInvestor,
//   },
//   'publicHouse': {
//     path: '/housing',
//     name: 'housing',
//     meta: {
//       title: '房源',
//       abbr: '房源',
//       icon: 'ios-home',
//     },
//     component: Layout,
//   },
//   '4001': {
//     path: 'public-housing-central-house-status-diagram',
//     name: 'public-housing/housing/central-house-status-diagram',
//     meta: {
//       title: '集中式房态图',
//       icon: 'ios-list-box',
//     },
//     component: PublicHousingCentralHouseList,
//   },
//   '4021': {
//     path: 'public-housing-distributed-house-status-diagram',
//     name: 'public-housing/housing/distributed-house-status-diagram',
//     meta: {
//       title: '分散式房态图',
//       icon: 'ios-list-box',
//     },
//     component: PublicHousingDistributedHouseList,
//   },
//   'publicLease': {
//     path: '/lease',
//     name: 'lease',
//     meta: {
//       title: '租约',
//       abbr: '租约',
//       icon: 'ios-paper',
//     },
//     component: Layout,
//   },
//   '4025': {
//     path: 'publicHousing/billingList',
//     name: 'publicHousing/billingList',
//     meta: {
//       title: '配租单列表',
//       icon: 'ios-list-box'
//     },
//     component: PublicHousingBillingList,
//   },
//   '4005': {
//     path: 'public-housing-lease-list',
//     name: 'public-housing/lease/lease-list',
//     meta: {
//       title: '租约列表',
//       icon: 'ios-list-box',
//     },
//     component: PubliceHousingLeaseList,
//   },
//   '4003': {
//     path: 'public-housing-tenant-list',
//     name: 'public-housing/lease/tenant-list',
//     meta: {
//       title: '租客列表',
//       icon: 'ios-list-box',
//     },
//     component: PubliceHousingTenantList,
//   },
//   'publicFinance': {
//     path: '/finance',
//     name: 'finance',
//     meta: {
//       title: '账务',
//       abbr: '账务',
//       icon: 'ios-cash',
//     },
//     component: Layout,
//   },
//   '4037': {
//     path: 'public-housing-notes',
//     name: 'public-housing/finance/notes',
//     meta: {
//       title: '记账本',
//       icon: 'ios-list-box',
//     },
//     component: PublicHousingAccountNotes,
//   },
//   '4042|4046': {
//     path: 'public-housing-acount-list',
//     name: 'public-housing/finance/account-list',
//     meta: {
//       title: '账单列表',
//       icon: 'ios-list-box',
//     },
//     component: PublicHousingAccountList,
//   },
//   '4051': {
//     path: 'publicHousing/RegularityReduction',
//     name: 'publicHousing/RegularityReduction',
//     meta: {
//       title: '政策性减免',
//       icon: 'ios-list-box',
//     },
//     component: PublicHousingRegularityReductionList,
//   },
//   '4055': {
//     path: 'public-housing-tradding',
//     name: 'public-housing/finance/tradding',
//     meta: {
//       title: '流水清单',
//       icon: 'ios-list-box',
//     },
//     component: PublicHousingTransaction,
//   },
//   '4066': {
//     path: 'public-prepayment',
//     name: 'public/prePayment',
//     meta: {
//       title: '预付费',
//       icon: 'ios-list-box',
//     },
//     component: PublicHousingPrePayment,
//   },
//   '4063': {
//     path: 'checkout-list',
//     name: 'public-housing/checkout-list',
//     meta: {
//       title: '退租单列表',
//       icon: 'ios-list-box',
//     },
//     component: CheckoutList,
//   },
// }
