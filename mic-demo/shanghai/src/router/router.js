import Layout from '@/views/Layout';
import Login from '@/views/Login';
// Home
import Index from '@/views/home/indexLayout';
import Home from '@/views/home/home';
import AssetHome from '@/views/home/asset-home';
import PublicHome from '@/views/home/public-home';
import NormalHome from '@/views/home/normal-home';
import StateHome from '@/views/home/state-home';
import ApartmentHome from '@/views/home/apartment-home';
import ShopHome from '@/views/home/shop-home';
import OfficeHome from '@/views/home/office-home';
import AuthorityHome from '@/views/home/authority-home';
import PersonInfo from '@/views/home/person'; // 个人中心
import ConfigurationCenter from '@/views/home/configuration-center/configurationCenter'; //配置中心

import accountConfigDetail from '@/views/home/configuration-center/accountConfigDetail'; //财务配置
import assetConfig from '@/views/home/configuration-center/assetConfig'; //资产基础配置
import policyRelief from '@/views/home/configuration-center/policyRelief'; //政策性减免
import staging from '@/views/home/configuration-center/staging'; //分期配置
import contractTemplate from '@/views/home/configuration-center/contractTemplate/contractTemplateList'; //合同模板
import contractTemplateAdd from '@/views/home/configuration-center/contractTemplate/contractTemplateAdd'; //合同模板
import contractTemplateEdit from '@/views/home/configuration-center/contractTemplate/contractTemplateEdit'

import propertyManagement from '@/views/home/configuration-center/propertyManagement'; //物业管理
import rentalProperty from "@/views/home/configuration-center/rentalProperty";

// House
// import HouseList from '@/views/house/list';
import DistributedHouseList from '@/views/house/distributed/list'; // 分散式房态图
import CentralHouseList from '@/views/house/central/list'; // 集中式房态图
import QuicklyAddRoom from "@/views/house/quicklyAddRoom/index"; //快速添加房间
import EditSingleRoomListings from '@/views/house/editHouseInfo/editSingleRoomListings'; // 编辑单间
import DisperseSingleRoom from '@/views/house/editHouseInfo/disperseSingleRoom'; // 编辑合租单间
import EditRoommatesEntire from '@/views/house/editHouseInfo/editRoommatesEntire'; // 编辑合租整套
import EditDisperseEntire from '@/views/house/editHouseInfo/editDisperseEntire'; // 编辑整租房源
import MultiRoomManagement from '@/views/house/multiRoomManagement'; //管理房间
import HouseProperty from '@/views/house/property/list'; // 产权信息
import CreateOwnerProperty from '@/views/house/property/create'; //新增业主合同
import CreateFreeProperty from '@/views/house/property/create-free'; //自由产权录入
import ViewPropertyInfo from '@/views/house/property/view'; //产权信息查看页面
import CreateDistributedHouseList from '@/views/house/distributed/create'; //添加分散房源
import CreateCentralHouseList from '@/views/house/central/create'; //添加集中房源
import BookingList from '@/views/contract/booking/list'; //预约单列表
import BookingCustomerList from '@/views/contract/bookingCustomer/list'; //预约意向客户列表
import BookingCustomerDetail from '@/views/contract/bookingCustomer/detail'; //预约意向客户详情
import LeaseList from '@/views/contract/lease/list'; //预约单列表
import BillingData from '@/views/contract/detail/billing'; //账单明细


import TenantList from '@/views/contract/tenantList/list'; //入住人列表
import RenewalApplication from '@/views/contract/renewalApplication/list'; //续约申请列表
import WithdrawalApplication from '@/views/contract/withdrawalApplication/list'; //续约申请列表
import Refund from '@/views/contract/refund/list'; //信用退款申请列表
import ChangeRoom from '@/views/contract/change-room/index'; //换房
import AccountList from '@/views/accounting/account/list'; //账单列表
import AccountNotes from '@/views/accounting/notes/list'; //记账本
import Transaction from '@/views/accounting/transaction/list'; //交易流水
import PrePayment from '@/views/accounting/prePayment/list'; //预付费
import PrepaymentAdd from '@/views/accounting/prePayment/add'; //新增
import PrepaymentDetail from '@/views/accounting/prePayment/view'; //详情
import DetailData from '@/views/contract/detail/index'; // 详情页面
import CheckOut from '@/views/contract/detail/check-out'; // 退房结算页面
import BasicInformation from '@/views/asset/information/information'; // 资产基础信息
import AssetManagement from '@/views/asset/management/management'; // 资产管理
import AssetReport from '@/views/asset/report/report'; // 资产报表
import OperationReport from '@/views/asset/report/operation-report'; // 运营情况报表
import AssetBuilding from '@/views/asset/building/building'; // 资产-楼栋
import AssetBuildingInfo from '@/views/asset/building/building-info'; // 资产-楼栋信息
import AssetVerification from '@/views/asset/verification/verification'; // 资产-核销
import AssetInvestor from '@/views/asset/investor/investor'; // 权属-出资人
import AssetProject from '@/views/asset/project/project'; // 基础-项目列表
import AddNewAsset from '@/views/asset/management/addNewAsset'; // 新增本层分户
import RoomManagement from '@/views/asset/management/room'; // 分户管理
import AssetRoom from '@/views/asset/rooms/room-manage'; // 资产管理-分户管理
import AddSingleRoom from '@/views/asset/rooms/add-single-room'; // 资产管理-单间新增分户
import RoomDetail from '@/views/asset/rooms/room-detail'; // 查看资产分户详情
import BuildingDetail from '@/views/asset/building/building-detail'; // 查看资产楼栋详情
import AddBatchRoom from '@/views/asset/rooms/add-batch-room'; // 资产管理-批量新增分户
import WholeAsset from '@/views/asset/management/wholeAsset'; // 添加整栋资产
import OthAsset from '@/views/asset/management/othAsset'; // 添加分散资产
import AssetProperty from '@/views/asset/management/property'; // 添加产证信息
// import RegionArea from '@/views/asset/region/area'; // 区域管理
import RegionCommunity from '@/views/asset/region/community'; // 小区管理
import Investor from '@/views/asset/information/investor'; // 出资人管理
import HouseStyle from '@/views/asset/information/house-style'; // 房型管理
import GetMethod from '@/views/asset/information/method'; // 取得方式管理
import HouseConstruction from '@/views/asset/information/construction'; // 房屋结构管理
import Classification from '@/views/asset/information/classification'; // 资产用途及分类
import advertisingManagement from '@/views/asset/advertisingManagement/list'; //广告位管理
import advertisingAdd from '@/views/asset/advertisingManagement/massAdd'; //广告位管理新增
import advertisingAddSingle from '@/views/asset/advertisingManagement/singleAdd'; //广告位管理新增单条
import advertisingShow from '@/views/asset/advertisingManagement/show'; //广告位查看
import parkingManagement from '@/views/asset/parkingManagement/list'; //停车位列表
import parkingAdd from '@/views/asset/parkingManagement/add'; //停车位新增（单条）
import parkingEdit from '@/views/asset/parkingManagement/edit'; //停车位修改
import parkingShow from '@/views/asset/parkingManagement/show'; //停车查看
import parkingAdds from '@/views/asset/parkingManagement/adds'; //停车位新增（批量）
import AssetAudit from '@/views/asset/audit/index'; //资产审批首页
import AuditParkingDetail from '@/views/asset/audit/parkingDetail'; //资产审批停车位查看
import AdvertisingDetail from '@/views/asset/audit/advertisingDetail'; //资产审批停车位查看
// Permission 权限
// 分店设置
import BranchList from '@/views/permission/branchSetting/list'; //分店列表
import EditBranch from '@/views/permission/branchSetting/editBranch'; //编辑门店
import AddBranch from '@/views/permission/branchSetting/addBranch'; //新增分店
import BranchAccount from '@/views/permission/branchSetting/account'; //开设账户
import ShowAccount from '@/views/permission/branchSetting/showAccount'; //查看账户
import ShowSign from '@/views/permission/branchSetting/showSign'; //查看电子签
import AddSign from '@/views/permission/branchSetting/addSign'; //新增电子签
import Charge from '@/views/permission/branchSetting/charge'; //管理三方收费户
import OrgFlatsList from '@/views/permission/orgFlatsList/list'; //房源分配
import StaffManage from '@/views/permission/staffManage/list'; //员工管理
import StaffManageAll from '@/views/permission/staffManage/allStaff'; //所有员工
import StaffManageCreate from '@/views/permission/staffManage/create'; //新增员工
import StaffManageEdit from '@/views/permission/staffManage/create'; //编辑员工
import RolesList from '@/views/permission/roles/list'; //职位列表
//物业巡检
import PropertyInspection from '@/views/service/inspection/list'; //巡检列表
import PropertyThemeOpeation from '@/views/service/inspection/opeationTheme'; //巡检主题操作
import PropertyThemeShow from '@/views/service/inspection/themeDetail'; //巡检主题详情
/** 公租房 */
/** 公租房----房源 */
import PublicHousingCentralHouseList from '@/views/public-housing/house/central/list'; // 集中式房态图
import PublicHousingDistributedHouseList from '@/views/public-housing/house/distributed/list'; // 分散式房态图
import PublicHousingCreateCentralHouseList from '@/views/public-housing/house/central/create'; //添加集中房源
import PublicHousingMultiRoomManagement from '@/views/public-housing/house/multiRoomManagement'; //管理房间
import PublicHousingCreateDistributedHouseList from '@/views/public-housing/house/distributed/create'; //添加分散房源

import PublicHousingEditSingleRoomListings from '@/views/public-housing/house/editHouseInfo/editSingleRoomListings'; // 编辑单间
import PublicHousingDisperseSingleRoom from '@/views/public-housing/house/editHouseInfo/disperseSingleRoom'; // 编辑合租单间
import PublicHousingEditRoommatesEntire from '@/views/public-housing/house/editHouseInfo/editRoommatesEntire'; // 编辑合租整套
import PublicHousingEditDisperseEntire from '@/views/public-housing/house/editHouseInfo/editDisperseEntire'; // 编辑整租房源
/** 公租房----租约 */
// 配租单
import PublicHousingBillingList from '@/views/public-housing/lease/billingList/list'; //列表
import PublicHousingBillingShow from '@/views/public-housing/lease/billingList/show'; //查看
import PublicHousingBillingRegistration from '@/views/public-housing/lease/billingList/registration'; //登记
// 租约列表
import PubliceHousingLeaseList from '@/views/public-housing/lease/lease/list'; //预约单列表
//公租房
import PubliceHousingTenantRegister from '@/views/public-housing/lease/lease/register_add'; // 租客登记（新增，房态图新增）
import PubliceHousingTenantRegisterEdit from '@/views/public-housing/lease/lease/register_edit'; // 租客登记编辑
import PubliceHousingTenantRegisterRelet from '@/views/public-housing/lease/lease/register_relet'; // 租客续租
//普通住房
import TenantRegister from '@/views/contract/lease/register_add'; // 租客登记
import MoreTenantRegister from '@/views/contract/lease/register_add_more'; // 租客登记
import TenantRegisterEdit from '@/views/contract/lease/register_edit'; // 租约编辑
import TenantRegisterRelet from '@/views/contract/lease/register_relet'; // 续租

import PubliceHousingDetailData from '@/views/public-housing/lease/detail/index'; // 详情页面
import PubliceHousingCheckOut from '@/views/public-housing/lease/detail/check-out'; // 退房结算页面
import PublicHousingBillingData from '@/views/public-housing/lease/detail/billing'; //账单明细
// 租客列表
import PubliceHousingTenantList from '@/views/public-housing/lease/tenantList/list'; //入住人列表
/** 公租房----财务 */
// 记账本
import PublicHousingAccountNotes from '@/views/public-housing/accounting/notes/list'; //记账本
// 账单列表
import PublicHousingAccountList from '@/views/public-housing/accounting/account/list'; //账单列表
// 流水清单
import PublicHousingTransaction from '@/views/public-housing/accounting/transaction/list'; //交易流水
// 政策性减免
import PublicHousingRegularityReductionList from '@/views/public-housing/accounting/regularityReduction/list'; //列表
import PublicHousingRegularityReductionShow from '@/views/public-housing/accounting/regularityReduction/show'; //查看
// 预付款
import PublicHousingPrePayment from '@/views/public-housing/accounting/prePayment/list'; //列表
import PublicHousingPrepaymentAdd from '@/views/public-housing/accounting/prePayment/add'; //新增
import PublicHousingPrepaymentDetail from '@/views/public-housing/accounting/prePayment/view'; //详情

import CheckoutList from '@/views/accounting/checkout/checkout-list'; // 退租单列表
import RepairList from '@/views/service/repair-list'; // 报修列表
import RepairDetail from '@/views/service/repair-detail'; // 报修信息
import CompanyMange from '@/views/tab-pages/company-manage'; // 企业管理
import AssetInventory from '@/views/tab-pages/asset-inventory'; // 资产盘点
import AssetBin from '@/views/tab-pages/asset-bin'; // 资产回收站
import ThirdService from '@/views/tab-pages/third-service'; // 资产三方服务
import AssetStatistics from '@/views/tab-pages/asset-statistics'; // 资产统计分析
import AssetDoc from '@/views/tab-pages/asset-doc'; // 实物档案
import CustomerDoc from '@/views/tab-pages/customer-doc'; // 客户档案
import PropertyDoc from '@/views/tab-pages/property-doc'; // 物业档案
import LeaseStatistics from '@/views/tab-pages/lease-statistics'; // 租赁资产-统计分析
import AccountStatistics from '@/views/tab-pages/account-statistics'; // 账务管理-统计分析

export const appRouter = [{ path: '/index', name: 'index', component: Index },
    {
        path: '/',
        name: 'Portal',
        redirect: '/asset-home',
        component: Layout,
        children: [
            { path: 'home', name: 'home', icon: 'ios-home', component: Home },
            { path: '/asset-home', name: 'asset-home', component: AssetHome },
            { path: '/public-home', name: 'public-home', component: PublicHome },
            { path: '/normal-home', name: 'normal-home', component: NormalHome },
            { path: '/apartment-home', name: 'apartment-home', component: ApartmentHome },
            { path: '/state-home', name: 'state-home', component: StateHome },
            { path: '/shop-home', name: 'shop-home', component: ShopHome },
            { path: '/office-home', name: 'office-home', component: OfficeHome },
            { path: '/authority-home', name: 'authority-home', component: AuthorityHome },
            { path: 'person', name: 'person', meta: { title: '个人中心' }, component: PersonInfo },
            { path: 'contract/detail', name: 'contract-detail', meta: { title: '详情' }, component: DetailData },
            {
                path: 'billing/detail',
                name: 'billing-detail',
                meta: { title: '账单明细' },
                component: BillingData
            },
            { path: 'contract/check-out', name: 'check-out', meta: { title: '退房结算' }, component: CheckOut },
            { path: 'contract/ChangeRoom', name: 'change-room', meta: { title: '换房' }, component: ChangeRoom },
            { path: 'house/create-owner', name: 'create-owner', meta: { title: '新增业主合同' }, component: CreateOwnerProperty },
            { path: 'house/create-free', name: 'create-free', meta: { title: '产权信息' }, component: CreateFreeProperty },
            { path: 'house/property-info', name: 'property-info', meta: { title: '查看产权信息' }, component: ViewPropertyInfo },
            { path: 'asset/new-asset', name: 'addNewAsset', meta: { title: '本层分户' }, component: AddNewAsset },
            // { path: 'asset/area-management', name: 'area-management', meta: { title: '区域管理' }, component: RegionArea },
            { path: 'asset/community-management', name: 'community-management', meta: { title: '小区管理' }, component: RegionCommunity },
            { path: 'asset/investor-management', name: 'investor-management', meta: { title: '投资人管理' }, component: Investor },
            { path: 'asset/house-style', name: 'house-style', meta: { title: '房型管理' }, component: HouseStyle },
            { path: 'asset/method-management', name: 'method-management', meta: { title: '取得方式管理' }, component: GetMethod },
            { path: 'asset/construction-management', name: 'construction-management', meta: { title: '房屋结构管理' }, component: HouseConstruction },
            { path: 'asset/class-management', name: 'class-management', meta: { title: '资产用途及分类' }, component: Classification },
            { path: 'asset/add-single-room', name: 'add-single-room', meta: { title: '单间分户' }, component: AddSingleRoom },
            { path: 'asset/room-detail', name: 'room-detail', meta: { title: '分户信息' }, component: RoomDetail },
            { path: 'asset/building-detail', name: 'building-detail', meta: { title: '楼栋信息' }, component: BuildingDetail },
            { path: 'asset/add-batch-room', name: 'add-batch-room', meta: { title: '批量新增分户' }, component: AddBatchRoom },
            { path: 'asset/room-management', name: 'room-management', meta: { title: '分户管理' }, component: RoomManagement },
            { path: 'asset/add-whole-asset', name: 'add-whole-asset', meta: { title: '整栋资产' }, component: WholeAsset },
            { path: 'asset/add-asset', name: 'add-asset', meta: { title: '分散资产' }, component: OthAsset },
            { path: 'asset/add-property', name: 'add-property', meta: { title: '产证录入' }, component: AssetProperty },
            { path: 'repair-detail', name: 'repair-detail', meta: { title: '报修信息' }, component: RepairDetail },
            { path: 'asset/building-info', name: 'building-info', meta: { title: '楼栋信息' }, component: AssetBuildingInfo },
            { path: 'house/editSingleRoomListings/:id', name: 'editSingleRoomListings', meta: { title: '编辑单间房源' }, component: EditSingleRoomListings },
            { path: 'house/disperseSingleRoom/:id', name: 'disperseSingleRoom', meta: { title: '编辑合租单间房源' }, component: DisperseSingleRoom },
            { path: 'house/editRoommatesEntire/flatsId/:houseId/:id', name: 'editRoommatesEntire', meta: { title: '编辑合租整套房源' }, component: EditRoommatesEntire },
            { path: 'house/editDisperseEntire/:id', name: 'editDisperseEntire', meta: { title: '编辑整租房源' }, component: EditDisperseEntire },
            {
                path: 'branchSetting/add',
                name: 'AddBranch',
                meta: { title: '新增分店' },
                component: AddBranch
            },
            {
                path: 'branchSetting/list',
                name: 'BranchList',
                meta: { title: '分店列表' },
                component: BranchList
            },
            {
                path: 'branchSetting/editBranch',
                name: 'EditBranch',
                meta: { title: '编辑分店' },
                component: EditBranch
            },
            // BranchAccount
            {
                path: 'branchSetting/account',
                name: 'BranchAccount',
                meta: { title: '开设账户' },
                component: BranchAccount
            },
            // ShowAccount
            {
                path: 'branchSetting/showAccount',
                name: 'ShowAccount',
                meta: { title: '查看账户' },
                component: ShowAccount
            },
            // ShowSign
            {
                path: 'branchSetting/showSign',
                name: 'ShowSign',
                meta: { title: '查看电子签' },
                component: ShowSign
            },
            {
                path: 'branchSetting/addSign',
                name: 'AddSign',
                meta: { title: '开设电子签' },
                component: AddSign
            },
            {
                path: 'branchSetting/charge',
                name: 'Charge',
                meta: { title: '管理三方收费户' },
                component: Charge
            },
            {
                path: 'orgFlatsList/list',
                name: 'OrgFlatsList',
                meta: { title: '房源分配' },
                component: OrgFlatsList
            }, {
                path: 'staffManage/list',
                name: 'StaffManage',
                meta: { title: '员工管理' },
                component: StaffManage
            }, {
                path: 'staffManage/allStaff',
                name: 'StaffManageAll',
                meta: { title: '员工管理' },
                component: StaffManageAll
            }, {
                path: 'staffManage/create/:id',
                name: 'StaffManageCreate',
                meta: { title: '员工新增' },
                component: StaffManageCreate
            }, {
                path: 'staffManage/edit/:id/:data',
                name: 'StaffManageEdit',
                meta: { title: '员工编辑' },
                component: StaffManageEdit
            },
            {
                path: 'house/central-house-create',
                name: 'house/central-house-create',
                meta: {
                    title: '添加集中式房源'
                },
                component: CreateCentralHouseList,
            },
            {
                path: 'house/quicklyAddRoom',
                name: 'house/quicklyAddRoom',
                meta: {
                    title: '快速添加房源'
                },
                component: QuicklyAddRoom,
            },
            {
                path: 'house/distributed-house-create',
                name: 'house/distributed-house-create',
                meta: {
                    title: '添加分散式房源'
                },
                component: CreateDistributedHouseList,
            },
            {
                path: 'house/multiRoomManagement/:id',
                name: 'house/multiRoomManagement',
                meta: {
                    title: '管理房间'
                },
                component: MultiRoomManagement,
            },
            /** 公租房 */
            /** 房源 */
            {
                path: 'public-housing/house/central-house-create/:id/:name/:floorCount/:elevator/:communityId',
                name: 'public-housing/house/central-house-create',
                meta: {
                    title: '添加集中式房源'
                },
                component: PublicHousingCreateCentralHouseList,
            },
            {
                path: 'public-housing/house/multiRoomManagement/:id',
                name: 'public-housing/house/multiRoomManagement',
                meta: {
                    title: '管理房间'
                },
                component: PublicHousingMultiRoomManagement,
            },
            {
                path: 'public-housing/house/distributed-house-create/:id',
                name: 'public-housing/house/distributed-house-create',
                meta: {
                    title: '添加分散式房源'
                },
                component: PublicHousingCreateDistributedHouseList,
            },
            {
                path: 'public-housing/house/editSingleRoomListings/:id',
                name: 'PublicHousingeditSingleRoomListings',
                meta: { title: '编辑单间房源' },
                component: PublicHousingEditSingleRoomListings
            },
            { path: 'public-housing/house/disperseSingleRoom/:id', name: 'PublicHousingdisperseSingleRoom', meta: { title: '编辑合租单间房源' }, component: PublicHousingDisperseSingleRoom },
            { path: 'public-housing/house/editRoommatesEntire/flatsId/:houseId/:id', name: 'PublicHousingeditRoommatesEntire', meta: { title: '编辑合租整套房源' }, component: PublicHousingEditRoommatesEntire },
            { path: 'public-housing/house/editDisperseEntire/:id', name: 'PublicHousingeditDisperseEntire', meta: { title: '编辑整租房源' }, component: PublicHousingEditDisperseEntire },
            /** 租约 */
            // 租约列表
            //公租房新增
            {
                path: 'public-housing-tenant-register',
                name: 'public-housing/contract/tenant-register',
                meta: {
                    title: '租客登记',
                    icon: 'ios-create',
                },
                component: PubliceHousingTenantRegister,
            },
            //普通住房新增
            {
                path: 'tenant-register',
                name: 'contract/tenant-register',
                meta: {
                    title: '租客登记',
                    icon: 'ios-create',
                },
                component: TenantRegister,
            },
            // 多房源新增
            {
                path: 'tenant-register-more',
                name: 'contract/tenant-register-more',
                meta: {
                    title: '多房源租客登记',
                    icon: 'ios-create',
                },
                component: MoreTenantRegister,
            },
            //公租房编辑
            {
                path: 'public-housing-tenant-register-edit',
                name: 'public-housing/contract/tenant-register-edit',
                meta: {
                    title: '租约编辑',
                    icon: 'ios-create',
                },
                component: PubliceHousingTenantRegisterEdit,
            },
            //普通住房编辑
            {
                path: 'tenant-register-edit',
                name: 'contract/tenant-register-edit',
                meta: {
                    title: '租约编辑',
                    icon: 'ios-create',
                },
                component: TenantRegisterEdit,
            },
            //公租房续租
            {
                path: 'public-housing-tenant-register-relet',
                name: 'public-housing/contract/tenant-register-relet',
                meta: {
                    title: '租客续租',
                    icon: 'ios-create',
                },
                component: PubliceHousingTenantRegisterRelet,
            },
            {
                path: 'public-housing/contract/detail',
                name: 'public-housing-contract-detail',
                meta: { title: '详情' },
                component: PubliceHousingDetailData
            },
            //普通住房需续租
            {
                path: 'tenant-register-relet',
                name: 'contract/tenant-register-relet',
                meta: {
                    title: '租客续租',
                    icon: 'ios-create',
                },
                component: TenantRegisterRelet,
            },
            {
                path: 'public-housing/billing/detail',
                name: 'public-housing-billing-detail',
                meta: { title: '账单明细' },
                component: PublicHousingBillingData
            },
            {
                path: 'public-housing/contract/check-out',
                name: 'public-housing-check-out',
                meta: { title: '退房结算' },
                component: PubliceHousingCheckOut
            },
            // 配租单
            {
                path: 'publicHousing/lease/billingShow',
                name: 'publicHousing/lease/billingShow',
                meta: {
                    title: '配租单查看',

                },
                component: PublicHousingBillingShow,
            },
            {
                path: 'publicHousing/lease/billingRegistration',
                name: 'publicHousing/lease/billingRegistration',
                meta: {
                    title: '配租单登记'
                },
                component: PublicHousingBillingRegistration,
            },
            /** 财务----- */
            // 政策性减免
            {
                path: 'publicHousing/accounting/regularityReductionShow',
                name: 'publicHousing/accounting/regularityReductionShow',
                meta: {
                    title: '政策性减免查看'
                },
                component: PublicHousingRegularityReductionShow,
            },
            //公租房
            {
                path: 'publicHousing/accounting/prePaymentAdd',
                name: 'publicHousing/accounting/prePaymentAdd',
                meta: {
                    title: '预付费登记'
                },
                component: PublicHousingPrepaymentAdd,
            },
            {
                path: 'publicHousing/accounting/prePaymentDetail',
                name: 'publicHousing/accounting/prePaymentDetail',
                meta: {
                    title: '预付费查看'
                },
                component: PublicHousingPrepaymentDetail,
            },
            //普通住房
            {
                path: 'accounting/prePaymentAdd',
                name: 'normal-finance/prePayment/prePaymentAdd',
                meta: {
                    title: '预付费登记'
                },
                component: PrepaymentAdd,
            },
            {
                path: 'accounting/prePaymentDetail',
                name: 'normal-finance/prePayment/prePaymentDetail',
                meta: {
                    title: '预付费查看'
                },
                component: PrepaymentDetail,
            },
            //新增合同模板
            {
                path: 'contractTemplate/add',
                name: 'contractTemplate/add',
                meta: {
                    title: '新增合同模板'
                },
                component: contractTemplateAdd
            },
            //编辑合同模板
            {
                path: 'contractTemplate/edit',
                name: 'contractTemplate/edit',
                meta: {
                    title: '编辑合同模板'
                },
                component: contractTemplateEdit
            },
            // 新增广告位
            {
                path: 'advertising/add',
                name: 'advertising/add',
                meta: {
                    title: '新增广告位'
                },
                component: advertisingAdd
            },
            // 新增广告位
            {
                path: 'advertising/addSingle',
                name: 'advertising/addSingle',
                meta: {
                    title: '新增广告位'
                },
                component: advertisingAddSingle
            },
            // 编辑广告位
            {
                path: 'advertising/editSingle',
                name: 'advertising/editSingle',
                meta: {
                    title: '编辑广告位'
                },
                component: advertisingAddSingle
            },
            // 查看广告位
            {
                path: 'advertising/show',
                name: 'advertising/show',
                meta: {
                    title: '查看广告位'
                },
                component: advertisingShow
            },
            // 新增停车位
            {
                path: 'parking/add',
                name: 'parking/add',
                meta: {
                    title: '新增停车位'
                },
                component: parkingAdd
            },
            {
                path: 'parking/adds',
                name: 'parking/adds',
                meta: {
                    title: '新增停车位'
                },
                component: parkingAdds
            },
            // 修改停车位信息parkingEdit
            {
                path: 'parking/edit',
                name: 'parking/edit',
                meta: {
                    title: '修改停车位'
                },
                component: parkingEdit
            },
            // parkingShow
            {
                path: 'parking/show',
                name: 'parking/show',
                meta: {
                    title: '查看停车位'
                },
                component: parkingShow
            },
            {
                path: 'bookingCustomer/detail',
                name: 'bookingCustomer/detail',
                meta: {
                    title: '意向客户详情'
                },
                component: BookingCustomerDetail
            },
            // AuditParkingDetail
            {
                path: 'audit/parkingDetail',
                name: 'audit/parkingDetail',
                meta: {
                    title: '停车位查看'
                },
                component: AuditParkingDetail
            },
            //advertisingDetail
            {
                path: 'audit/advertisingDetail',
                name: 'audit/advertisingDetail',
                meta: {
                    title: '广告位查看'
                },
                component: AdvertisingDetail
            },
            //新增主题
            {
                path: 'patrol/addTheme',
                name: 'patrol/addTheme',
                meta: {
                    title: '新增检查主题'
                },
                component: PropertyThemeOpeation
            },
            //修改主题
            {
                path: 'patrol/editTheme',
                name: 'patrol/editTheme',
                meta: {
                    title: '修改检查主题'
                },
                component: PropertyThemeOpeation
            },
            //查看主题
            {
                path: 'patrol/showTheme',
                name: 'patrol/showTheme',
                meta: {
                    title: '查看主题'
                },
                component: PropertyThemeShow
            },
        ],
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
    }

];

export const menuRouter = [{
        path: '/sys',
        name: 'sys',
        meta: {
            title: '系统管理',
            abbr: '系统管理',
            icon: 'md-desktop',
        },
        component: Layout,
        children: [{
                path: 'configuration',
                name: 'sys/configuration',
                meta: { title: '配置管理', icon: 'ios-list-box' },
                component: ConfigurationCenter,
            },
            {
                path: 'company',
                name: 'sys/company',
                meta: { title: '企业管理', icon: 'ios-list-box' },
                component: CompanyMange,
            },
        ],
    },
    // {
    //     path: '/asset',
    //     name: 'asset',
    //     meta: {
    //         title: '资产管理',
    //         abbr: '资产管理',
    //         icon: 'md-home',
    //     },
    //     component: Layout,
    //     children: [{
    //             path: 'setting',
    //             name: 'asset/setting',
    //             meta: { title: '资产基础配置', icon: 'ios-list-box', type: 'asset' },
    //             component: ConfigurationCenter,
    //         },
    //         // {
    //         //   path: 'community-management',
    //         //   name: 'asset/community-management',
    //         //   meta: {
    //         //     title: '小区管理',
    //         //     icon: 'ios-list-box',
    //         //   },
    //         //   component: RegionCommunity,
    //         // },
    //         {
    //             path: 'building',
    //             name: 'asset/building',
    //             meta: {
    //                 title: '楼栋管理',
    //                 icon: 'ios-list-box',
    //             },
    //             component: AssetBuilding,
    //         },
    //         {
    //             path: 'room',
    //             name: 'asset/room',
    //             meta: {
    //                 title: '分户管理',
    //                 icon: 'ios-list-box',
    //             },
    //             component: AssetRoom,
    //         },
    //         {
    //             path: 'advertising',
    //             name: 'asset/advertising',
    //             meta: {
    //                 title: '广告位管理',
    //                 icon: 'ios-list-box',
    //             },
    //             component: advertisingManagement,
    //         },
    //         {
    //             path: 'parking',
    //             name: 'asset/parking',
    //             meta: {
    //                 title: '停车位管理',
    //                 icon: 'ios-list-box',
    //             },
    //             component: parkingManagement,
    //         },
    //         {
    //             path: 'inventory',
    //             name: 'asset/inventory',
    //             meta: {
    //                 title: '资产盘点',
    //                 icon: 'ios-list-box',
    //             },
    //             component: AssetInventory,
    //         },
    //         {
    //             path: 'audit',
    //             name: 'asset/audit',
    //             meta: {
    //                 title: '资产审批',
    //                 icon: 'ios-list-box',
    //             },
    //             component: AssetAudit,
    //         },
    //         {
    //             path: 'bin',
    //             name: 'asset/bin',
    //             meta: {
    //                 title: '回收站',
    //                 icon: 'ios-list-box',
    //             },
    //             component: AssetBin,
    //         },
    //         {
    //             path: 'third',
    //             name: 'asset/third',
    //             meta: {
    //                 title: '三方服务',
    //                 icon: 'ios-list-box',
    //             },
    //             component: ThirdService,
    //         },
    //         {
    //             path: 'statistics',
    //             name: 'asset/statistics',
    //             meta: {
    //                 title: '统计分析',
    //                 abbr: '统计分析',
    //                 icon: 'ios-list-box',
    //             },
    //             component: AssetStatistics,
    //         },
    //     ],
    // },
    // {
    //     path: '/record',
    //     name: 'record',
    //     meta: {
    //         title: '档案管理',
    //         abbr: '档案管理',
    //         icon: 'md-clipboard',
    //     },
    //     component: Layout,
    //     children: [{
    //             path: 'tangible-assets',
    //             name: 'record/tangible-assets',
    //             meta: { title: '实物资产', icon: 'ios-list-box' },
    //             component: AssetDoc,
    //         },
    //         {
    //             path: 'customer',
    //             name: 'record/customer',
    //             meta: { title: '客户档案', icon: 'ios-list-box' },
    //             component: CustomerDoc,
    //         },
    //         {
    //             path: 'property',
    //             name: 'record/property',
    //             meta: { title: '物业档案', icon: 'ios-list-box' },
    //             component: PropertyDoc,
    //         },
    //     ],
    // },
    {
        path: '/lease',
        name: 'lease',
        meta: {
            title: '租赁资产',
            abbr: '租赁资产',
            icon: 'md-albums',
        },
        component: Layout,
        children: [
            // houseKind: 0-公租，1-国有公房 2-人才公寓 3-普通住房 4-商铺 5-商务办公
            {
                path: 'setting',
                name: 'lease/setting',
                meta: { title: '租赁房源配置', icon: 'ios-list-box', type: 'house' },
                component: ConfigurationCenter,
            },
            // {
            //     path: 'public-housing-central',
            //     name: 'lease/public-housing-central',
            //     meta: { title: '公租房', icon: 'ios-list-box', houseKind: '0' },
            //     component: PublicHousingCentralHouseList,
            // },
            // {
            //     path: 'state-housing-central',
            //     name: 'lease/state-housing-central',
            //     meta: { title: '国有公房', icon: 'ios-list-box', houseKind: '1' },
            //     component: PublicHousingCentralHouseList,
            // },
            {
                path: 'normal-housing-central',
                name: 'lease/normal-housing-central',
                meta: { title: '集中式普通住房', icon: 'ios-list-box', houseKind: '3' },
                component: CentralHouseList,
            },
            {
                path: 'normal-housing-distributed',
                name: 'lease/normal-housing-distributed',
                meta: { title: '分散式普通住房', icon: 'ios-list-box', houseKind: '3' },
                component: DistributedHouseList,
            },
            {
                path: 'apartment',
                name: 'lease/apartment',
                meta: { title: '人才公寓', icon: 'ios-list-box', houseKind: '2' },
                component: CentralHouseList,
            },
            // {
            //     path: 'advertising',
            //     name: 'lease/advertising',
            //     meta: { title: '广告位', icon: 'ios-list-box' },
            //     // component: ,
            // },
            // {
            //     path: 'parking',
            //     name: 'lease/parking',
            //     meta: { title: '停车位', icon: 'ios-list-box' },
            //     // component: ,
            // },
            // {
            //     path: 'statistics',
            //     name: 'lease/statistics',
            //     meta: { title: '统计分析', icon: 'ios-list-box' },
            //     component: LeaseStatistics,
            // },
        ],
    },
    {
        path: '/contract',
        name: 'contract',
        meta: {
            title: '合约管理',
            abbr: '合约管理',
            icon: 'md-document',
        },
        component: Layout,
        children: [{
                path: 'model',
                name: 'contract/model',
                meta: { title: '租约模板配置', icon: 'ios-list-box', type: 'contract' },
                component: ConfigurationCenter,
            },
            {
                path: 'booking',
                name: 'contract/booking',
                meta: { title: '预约看房', icon: 'ios-list-box' },
                component: BookingList,
            },
            {
                path: 'billing',
                name: 'contract/billingList',
                meta: {
                    title: '配租单',
                    icon: 'ios-list-box'
                },
                component: PublicHousingBillingList,
            },
            {
                path: 'lease',
                name: 'contract/lease',
                meta: { title: '租赁合约', icon: 'ios-list-box' },
                component: PubliceHousingLeaseList,
            },
            {
                path: 'renewal',
                name: 'contract/renewal',
                meta: { title: '续约申请', icon: 'ios-list-box' },
                component: RenewalApplication,
            },
            {
                path: 'withdrawal',
                name: 'contract/withdrawal',
                meta: { title: '退租申请', icon: 'ios-list-box' },
                component: WithdrawalApplication,
            },
            // {
            //     path: 'refund',
            //     name: 'contract/refund',
            //     meta: { title: '信用退款申请', icon: 'ios-list-box' },
            //     component: Refund,
            // },
        ],
    },
    {
        path: '/customer',
        name: 'customer',
        meta: {
            title: '客户管理',
            abbr: '客户管理',
            icon: 'md-contacts',
        },
        component: Layout,
        children: [{
                path: 'tenant-list',
                name: 'customer/tenant-list',
                meta: { title: '租客管理', icon: 'ios-list-box' },
                component: TenantList,
            },
            // {
            //     path: 'owner-list',
            //     name: 'customer/owner-list',
            //     meta: { title: '业主管理', icon: 'ios-list-box' },
            //     // component: ,
            // },
            {
                path: 'interested',
                name: 'customer/interested',
                meta: { title: '意向客户管理', icon: 'ios-list-box' },
                component: BookingCustomerList,
            },
        ],
    },
    {
        path: '/accounting',
        name: 'accounting',
        meta: {
            title: '账务管理',
            abbr: '账务管理',
            icon: 'logo-usd',
        },
        component: Layout,
        children: [{
                path: 'setting',
                name: 'accounting/setting',
                meta: { title: '账务配置', icon: 'ios-list-box' },
                component: ConfigurationCenter,
            },
            {
                path: 'notes',
                name: 'accounting/notes',
                meta: { title: '记账本', icon: 'ios-list-box' },
                component: AccountNotes,
            },
            {
                path: 'account-list',
                name: 'accounting/account-list',
                meta: { title: '合约账单', icon: 'ios-list-box' },
                component: AccountList,
            },
            {
                path: 'transaction',
                name: 'accounting/transaction',
                meta: { title: '交易流水', icon: 'ios-list-box' },
                component: Transaction,
            },
            {
                path: 'prePayment',
                name: 'accounting/prePayment',
                meta: { title: '预付清单', icon: 'ios-list-box' },
                component: PrePayment,
            },
            // {
            //     path: 'RegularityReduction',
            //     name: 'accounting/RegularityReduction',
            //     meta: { title: '政策补贴', icon: 'ios-list-box' },
            //     component: PublicHousingRegularityReductionList,
            // },
            {
                path: 'checkout-list',
                name: 'accounting/checkout-list',
                meta: {
                    title: '退租结算',
                    icon: 'ios-list-box',
                },
                component: CheckoutList,
            },
            // {
            //     path: 'statistics',
            //     name: 'accounting/statistics',
            //     meta: { title: '统计分析', icon: 'ios-list-box' },
            //     component: AccountStatistics,
            // },
        ],
    },
    {
        path: '/service',
        name: 'service',
        meta: {
            title: '物业管理',
            abbr: '物业管理',
            icon: 'md-build',
        },
        component: Layout,
        children: [{
                path: 'repair-list',
                name: 'service/repair-list',
                meta: { title: '报修管理', icon: 'ios-list-box' },
                component: RepairList,
            },
            // {
            //     path: 'patrol',
            //     name: 'service/patrol',
            //     meta: { title: '物业巡查', icon: 'ios-list-box' },
            //     component: PropertyInspection,
            // },
            // {
            //     path: 'complaint',
            //     name: 'service/complaint',
            //     meta: { title: '投诉建议', icon: 'ios-list-box' },
            //     // component: ,
            // },
        ],
    },
];


export const routers = [
    ...appRouter,
    ...menuRouter,
];

export const allRouters = {
    appRouter,
    menuRouter,
};
