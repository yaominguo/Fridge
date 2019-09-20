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
import assetBase from '@/views/home/configuration-center/assetBase'; //资产基础
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
import QuicklyAddRoom from "@/views/house/quicklyAddRoom/index";//快速添加房间
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
import LeaseList from '@/views/contract/lease/list'; //预约单列表
import BillingData from '@/views/contract/detail/billing'; //账单明细
import TenantRegister from '@/views/contract/lease/register_add'; // 租客登记
import TenantRegisterEdit from '@/views/contract/lease/register_edit'; // 租约编辑
import TenantRegisterRelet from '@/views/contract/lease/register_relet'; // 续租

import TenantList from '@/views/contract/tenantList/list'; //入住人列表
import RenewalApplication from '@/views/contract/renewalApplication/list'; //续约申请列表
import WithdrawalApplication from '@/views/contract/withdrawalApplication/list'; //续约申请列表
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
import PubliceHousingTenantRegister from '@/views/public-housing/lease/lease/register_add'; // 租客登记（新增，房态图新增）
import PubliceHousingTenantRegisterEdit from '@/views/public-housing/lease/lease/register_edit'; // 租客登记编辑（纸质，电子）
import PubliceHousingTenantRegisterRelet from '@/views/public-housing/lease/lease/register_relet'; // 租客续租（纸质，电子）


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

export const appRouter = [{ path: '/index', name: 'index', component: Index },
    {
        path: '/',
        name: 'Portal',
        redirect: '/home',
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
            {
                path: 'configuration-center',
                //name: 'ConfigurationCenter',
                meta: { title: '配置中心' },
                component: ConfigurationCenter,
                children: [
                    { path: '/', name: 'config-detail', meta: { title: '配置中心' }, component: accountConfigDetail },
                    { path: 'asset/base', name: 'asset-base', component: assetBase },
                    { path: 'policy/relief', name: 'policy-relief', component: policyRelief },
                    { path: 'property/management', name: 'property-management', component: propertyManagement },
                    { path: 'rental/property', name: 'rental-property', component: rentalProperty },
                    { path: 'staging', name: 'staging', component: staging }, //分期配置
                    { path: 'contract/template', name: 'contract-template', component: contractTemplate }, //合同模板
                ]
            },
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
                path: 'house/distributed-house-create/:id',
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
            //新增
            {
                path: 'public-housing-tenant-register',
                name: 'public-housing/contract/tenant-register',
                meta: {
                    title: '租客登记',
                    icon: 'ios-create',
                },
                component: PubliceHousingTenantRegister,
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
        ],
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
    }

];

export const menuRouter = [{
        path: '/asset',
        name: 'asset',
        meta: {
            title: '资产管理',
            abbr: '资产',
            icon: 'ios-cube',
        },
        component: Layout,
        children: [{
                path: 'basic-information',
                name: 'asset/basic-information',
                meta: {
                    title: '基础信息',
                    icon: 'ios-list-box',
                },
                component: BasicInformation,
            },
            {
                path: 'asset-management',
                name: 'asset/asset-management',
                meta: {
                    title: '资产管理',
                    icon: 'ios-list-box',
                },
                component: AssetManagement,
            },
            {
                path: 'asset-report',
                name: 'asset/asset-report',
                meta: {
                    title: '资产报表',
                    icon: 'ios-list-box',
                },
                component: AssetReport,
            },
            {
                path: 'asset-building',
                name: 'asset/asset-building',
                meta: {
                    title: '楼栋',
                    icon: 'ios-list-box',
                },
                component: AssetBuilding,
            },
            {
                path: 'asset-verification',
                name: 'asset/asset-verification',
                meta: {
                    title: '核销审批',
                    icon: 'ios-list-box',
                },
                component: AssetVerification,
            },
            {
                path: 'asset-investor',
                name: 'asset/asset-investor',
                meta: {
                    title: '出资人',
                    icon: 'ios-list-box',
                },
                component: AssetInvestor,
            },
        ],
    },
    {
        path: '/house',
        name: 'house',
        meta: {
            title: '房源管理',
            abbr: '房源',
            icon: 'ios-home',
        },
        component: Layout,
        children: [{
                path: 'central-house-status-diagram',
                name: 'house/central-house-status-diagram',
                meta: {
                    title: '集中式房态图',
                    icon: 'ios-list-box',
                },
                component: CentralHouseList,
            },
            {
                path: 'distributed-house-status-diagram',
                name: 'house/distributed-house-status-diagram',
                meta: {
                    title: '分散式房态图',
                    icon: 'ios-list-box',
                },
                component: DistributedHouseList,
            },
            {
                path: 'property',
                name: 'house/property',
                meta: {
                    title: '产权列表',
                    icon: 'ios-bookmarks',
                },
                component: HouseProperty,
            },
        ],
    },
    {
        path: '/contract',
        name: 'contract',
        meta: {
            title: '合同管理',
            abbr: '合同',
            icon: 'ios-paper',
        },
        component: Layout,
        children: [
            // {
            //     path: 'list',
            //     name: 'contract/list',
            //     meta: {
            //         title: '合同列表',
            //         icon: 'ios-list-box',
            //     },
            //     component: HouseList,
            // },
            {
                path: 'booking-list',
                name: 'contract/booking-list',
                meta: {
                    title: '预约单',
                    icon: 'ios-list-box',
                },
                component: BookingList,
            },
            {
                path: 'lease-list',
                name: 'contract/lease-list',
                meta: {
                    title: '租约列表',
                    icon: 'ios-list-box',
                },
                component: LeaseList,
            },
            {
                path: 'tenant-register',
                name: 'contract/tenant-register',
                meta: {
                    title: '租客登记',
                    icon: 'ios-create',
                },
                component: TenantRegister,
            },
            {
                path: 'tenant-list',
                name: 'contract/tenant-list',
                meta: {
                    title: '租客列表',
                    icon: 'ios-create',
                },
                component: TenantList,
            },
            {
                path: 'withdrawalApplication-list',
                name: 'contract/withdrawalApplication-list',
                meta: {
                    title: '退租申请',
                    icon: 'ios-create',
                },
                component: WithdrawalApplication,
            },
            {
                path: 'renewalApplication-list',
                name: 'contract/renewalApplication-list',
                meta: {
                    title: '续约申请',
                    icon: 'ios-create',
                },
                component: RenewalApplication,
            }

        ],
    },
    {
        path: '/account',
        name: 'account',
        meta: {
            title: '账务管理',
            abbr: '账务',
            icon: 'ios-cash',
        },
        component: Layout,
        children: [{
                path: 'account-list',
                name: 'account/list',
                meta: {
                    title: '账单列表',
                    icon: 'ios-list-box',
                },
                component: AccountList,
            },
            {
                path: 'account-notes',
                name: 'account/notes',
                meta: {
                    title: '记账本',
                    icon: 'ios-book',
                },
                component: AccountNotes,
            },
            {
                path: 'account-transaction',
                name: 'account/transaction',
                meta: {
                    title: '交易流水',
                    icon: 'ios-water',
                },
                component: Transaction,
            },
            {
                path: 'checkout-list',
                name: 'account-housing/checkout-list',
                meta: {
                    title: '退租单列表',
                    icon: 'ios-list-box',
                },
                component: CheckoutList,
            },
        ],
    },
];


export const assetRouter = [{
        path: '/basic',
        name: 'basic',

        meta: {
            title: '基础',
            abbr: '基础',
            icon: 'md-albums',
        },
        component: Layout,
        children: [{
                path: 'project-management',
                name: 'basic/project-management',
                meta: {
                    title: '项目管理',
                    icon: 'ios-list-box',
                },
                component: AssetProject,
            },
            {
                path: 'community-management',
                name: 'basic/community-management',
                meta: {
                    title: '小区/公寓管理',
                    icon: 'ios-list-box',
                },
                component: RegionCommunity,
            },
            // {
            //     path: 'region-management',
            //     name: 'basic/region-management',
            //     meta: {
            //         title: '区域路段管理',
            //         icon: 'ios-list-box',
            //     },
            //     component: RegionArea,
            // },
        ],
    },
    {
        path: '/ownership',
        name: 'ownership',
        meta: {
            title: '权属',
            abbr: '权属',
            icon: 'md-bookmarks',
        },
        component: Layout,
        children: [{
                path: 'investor',
                name: 'ownership/investor',
                meta: {
                    title: '出资人',
                    icon: 'ios-list-box',
                },
                component: AssetInvestor,
            },
            {
                path: 'contract',
                name: 'ownership/contract',
                meta: {
                    title: '权属合同',
                    icon: 'ios-list-box',
                },
                // component: AssetVerification,
            },
        ],
    },
    {
        path: '/assets',
        name: 'assets',
        meta: {
            title: '资产',
            abbr: '资产',
            icon: 'ios-cube',
        },
        component: Layout,
        children: [{
                path: 'building',
                name: 'assets/building',
                meta: {
                    title: '楼栋',
                    icon: 'ios-list-box',
                },
                component: AssetBuilding,
            },
            {
                path: 'verification',
                name: 'assets/verification',
                meta: {
                    title: '核销审批',
                    icon: 'ios-list-box',
                },
                component: AssetVerification,
            },
        ],
    },

    // {
    //     path: '/third',
    //     name: 'third',
    //     meta: {
    //         title: '第三方',
    //         abbr: '第三方',
    //         icon: 'ios-people',
    //         // icon: 'md-contacts',
    //     },
    //     component: Layout,
    //     children: [{
    //             path: 'service',
    //             name: 'third/service',
    //             meta: {
    //                 title: '第三方服务公司',
    //                 icon: 'ios-list-box',
    //             },
    //             // component: AssetInvestor,
    //         },
    //         {
    //             path: 'security',
    //             name: 'third/security',
    //             meta: {
    //                 title: '物业合同',
    //                 icon: 'ios-list-box',
    //             },
    //             // component: AssetVerification,
    //         },
    //         {
    //             path: 'price',
    //             name: 'third/price',
    //             meta: {
    //                 title: '定价合同',
    //                 icon: 'ios-list-box',
    //             },
    //             // component: AssetVerification,
    //         },
    //         {
    //             path: 'sold',
    //             name: 'third/sold',
    //             meta: {
    //                 title: '代售合同',
    //                 icon: 'ios-list-box',
    //             },
    //             // component: AssetVerification,
    //         },
    //         {
    //             path: 'auction',
    //             name: 'third/auction',
    //             meta: {
    //                 title: '代拍合同',
    //                 icon: 'ios-list-box',
    //             },
    //             // component: AssetVerification,
    //         },
    //     ],
    // },
    {
        path: '/statistics',
        name: 'statistics',
        meta: {
            title: '统计分析',
            abbr: '统计分析',
            icon: 'ios-podium',
        },
        component: Layout,
        children: [{
                path: 'asset-info',
                name: 'statistics/asset-info',
                meta: {
                    title: '资产信息',
                    icon: 'ios-list-box',
                },
                component: AssetReport,
            },
            {
                path: 'operation',
                name: 'statistics/operation',
                meta: {
                    title: '运营情况',
                    icon: 'ios-list-box',
                },
                component: OperationReport,
            },
            {
                path: 'cost',
                name: 'statistics/cost',
                meta: {
                    title: '费用情况',
                    icon: 'ios-list-box',
                },
                // component: AssetInvestor,
            },
        ],
    },
];
export const authorityRouter = [{
        path: '/staff',
        name: 'staff',
        meta: {
            title: '员工',
            abbr: '员工',
            icon: 'ios-people',
        },
        component: Layout,
        children: [{
                path: 'staff/job-management',
                name: 'job-management',
                meta: { title: '职位管理', icon: 'ios-list-box', },
                component: RolesList
            },
            {
                path: 'staff/staff-management',
                name: 'staff-management',
                meta: { title: '员工管理', icon: 'ios-list-box', },
                component: StaffManage
            },
        ],
    },
    {
        path: '/branch',
        name: 'branch',
        meta: {
            title: '分店',
            abbr: '分店',
            icon: 'md-share',
        },
        component: Layout,
        children: [{
            path: 'branch/branch-management',
            name: 'branch-management',
            meta: { title: '分店管理', icon: 'ios-list-box', },
            component: BranchList
        }, ],
    },
    {
        path: '/allocate',
        name: 'allocate',
        meta: {
            title: '房源分配',
            abbr: '房源分配',
            icon: 'md-pricetag',
        },
        component: Layout,
        children: [{
            path: 'allocate/allocate-house',
            name: 'allocate-house',
            meta: { title: '房源分配', icon: 'ios-list-box', },
            component: OrgFlatsList
        }],
    },
];

export const publicRouter = [{
        path: '/housing',
        name: 'housing',
        meta: {
            title: '房源',
            abbr: '房源',
            icon: 'ios-home',
        },
        component: Layout,
        children: [{
                path: 'public-housing-central-house-status-diagram',
                name: 'public-housing/housing/central-house-status-diagram',
                meta: {
                    title: '集中式房态图',
                    icon: 'ios-list-box',
                },
                component: PublicHousingCentralHouseList,
            },
            {
                path: 'public-housing-distributed-house-status-diagram',
                name: 'public-housing/housing/distributed-house-status-diagram',
                meta: {
                    title: '分散式房态图',
                    icon: 'ios-list-box',
                },
                component: PublicHousingDistributedHouseList,
            },
        ],
    },
    {
        path: '/lease',
        name: 'lease',
        meta: {
            title: '租约',
            abbr: '租约',
            icon: 'ios-paper',
        },
        component: Layout,
        children: [{
                path: 'publicHousing/billingList',
                name: 'publicHousing/billingList',
                meta: {
                    title: '配租单列表',
                    icon: 'ios-list-box'
                },
                component: PublicHousingBillingList,
            },
            {
                path: 'public-housing-lease-list',
                name: 'public-housing/lease/lease-list',
                meta: {
                    title: '租约列表',
                    icon: 'ios-list-box',
                },
                component: PubliceHousingLeaseList,
            },
            {
                path: 'public-housing-tenant-list',
                name: 'public-housing/lease/tenant-list',
                meta: {
                    title: '租客列表',
                    icon: 'ios-list-box',
                },
                component: PubliceHousingTenantList,
            }
        ],
    },
    {
        path: '/finance',
        name: 'finance',
        meta: {
            title: '账务',
            abbr: '账务',
            icon: 'ios-cash',
        },
        component: Layout,
        children: [{
                path: 'public-housing-notes',
                name: 'public-housing/finance/notes',
                meta: {
                    title: '记账本',
                    icon: 'ios-list-box',
                },
                component: PublicHousingAccountNotes,
            },
            {
                path: 'public-housing-acount-list',
                name: 'public-housing/finance/account-list',
                meta: {
                    title: '账单列表',
                    icon: 'ios-list-box',
                },
                component: PublicHousingAccountList,
            },
            {
                path: 'publicHousing/RegularityReduction',
                name: 'publicHousing/RegularityReduction',
                meta: {
                    title: '政策性减免',
                    icon: 'ios-list-box',
                },
                component: PublicHousingRegularityReductionList,
            },
            {
                path: 'public-housing-tradding',
                name: 'public-housing/finance/tradding',
                meta: {
                    title: '流水清单',
                    icon: 'ios-list-box',
                },
                component: PublicHousingTransaction,
            },
            {
                path: 'public-prepayment',
                name: 'public/prePayment',
                meta: {
                    title: '预付费',
                    icon: 'ios-list-box',
                },
                component: PublicHousingPrePayment,
            },
            {
                path: 'checkout-list',
                name: 'public-housing/checkout-list',
                meta: {
                    title: '退租单列表',
                    icon: 'ios-list-box',
                },
                component: CheckoutList,
            },
        ],
    },
    // {
    //     path: '/apartment-service',
    //     name: 'apartment-service',
    //     meta: {
    //         title: '物业服务',
    //         abbr: '物业服务',
    //         icon: 'ios-construct',
    //     },
    //     component: Layout,
    //     children: [{
    //         path: 'repair',
    //         name: 'apartment-service/repair',
    //         meta: {
    //             title: '报修单',
    //             icon: 'ios-list-box',
    //         },
    //         // component: AccountNotes,
    //     }, ],
    // },
];

export const normalHouseRouter = [{
        path: '/normal-housing',
        name: 'normal-housing',
        meta: {
            title: '房源',
            abbr: '房源',
            icon: 'ios-home',
        },
        component: Layout,
        children: [{
                path: 'normal-housing-central-house-status-diagram',
                name: 'normal-housing/housing/central-house-status-diagram',
                meta: {
                    title: '集中式房态图',
                    icon: 'ios-list-box',
                },
                component: CentralHouseList,
            },
            {
                path: 'normal-housing-distributed-house-status-diagram',
                name: 'normal-housing/housing/distributed-house-status-diagram',
                meta: {
                    title: '分散式房态图',
                    icon: 'ios-list-box',
                },
                component: DistributedHouseList,
            },
        ],
    },
    {
        path: '/normal-lease',
        name: 'normal-lease',
        meta: {
            title: '租约',
            abbr: '租约',
            icon: 'ios-paper',
        },
        component: Layout,
        children: [{
                path: 'normal-housing/bookingList',
                name: 'normal-housing/bookingList',
                meta: {
                    title: '预约单列表',
                    icon: 'ios-list-box'
                },
                component: BookingList,
            },
            {
                path: 'normal-housing-lease-list',
                name: 'normal-housing/lease/lease-list',
                meta: {
                    title: '租约列表',
                    icon: 'ios-list-box',
                },
                component: LeaseList,
            },
            {
                path: 'normal-housing-tenant-list',
                name: 'normal-housing/lease/tenant-list',
                meta: {
                    title: '租客列表',
                    icon: 'ios-list-box',
                },
                component: TenantList,
            },
            {
                path: 'normal-withdrawalApplication-list',
                name: 'normal-housing/lease/withdrawalApplication-list',
                meta: {
                    title: '退租申请',
                    icon: 'ios-list-box',
                },
                component: WithdrawalApplication,
            },
            {
                path: 'normal-renewalApplication-list',
                name: 'normal-housing/renewalApplication-list',
                meta: {
                    title: '续约申请',
                    icon: 'ios-create',
                },
                component: RenewalApplication,
            }
        ],
    },
    {
        path: '/normal-finance',
        name: 'normal-finance',
        meta: {
            title: '账务',
            abbr: '账务',
            icon: 'ios-cash',
        },
        component: Layout,
        children: [{
                path: 'normal-housing-notes',
                name: 'normal-housing/finance/notes',
                meta: {
                    title: '记账本',
                    icon: 'ios-list-box',
                },
                component: AccountNotes,
            },
            {
                path: 'normal-housing-acount-list',
                name: 'normal-housing/finance/account-list',
                meta: {
                    title: '账单列表',
                    icon: 'ios-list-box',
                },
                component: AccountList,
            },
            {
                path: 'normal-housing-tradding',
                name: 'normal-housing/finance/tradding',
                meta: {
                    title: '流水清单',
                    icon: 'ios-list-box',
                },
                component: Transaction,
            },
            {
                path: 'prePayment',
                name: 'normal-finance/prePayment',
                meta: {
                    title: '预付费',
                    icon: 'ios-list-box',
                },
                component: PrePayment,
            },
            {
                path: 'checkout-list',
                name: 'normal-housing/checkout-list',
                meta: {
                    title: '退租单列表',
                    icon: 'ios-list-box',
                },
                component: CheckoutList,
            },
        ],
    },
    // {
    //     path: '/normal-service',
    //     name: 'normal-service',
    //     meta: {
    //         title: '物业服务',
    //         abbr: '物业服务',
    //         icon: 'ios-construct',
    //     },
    //     component: Layout,
    //     children: [{
    //         path: 'repair',
    //         name: 'normal-service/repair-list',
    //         meta: {
    //             title: '报修列表',
    //             icon: 'ios-list-box',
    //         },
    //         component: RepairList,
    //     }, ],
    // },
];

export const shopRouter = [{
        path: '/shop-housing',
        name: 'shop-housing',
        meta: {
            title: '房源',
            abbr: '房源',
            icon: 'ios-home',
        },
        component: Layout,
        children: [{
                path: 'shop-housing-central-house-status-diagram',
                name: 'shop-housing/housing/central-house-status-diagram',
                meta: {
                    title: '集中式房态图',
                    icon: 'ios-list-box',
                },
                component: CentralHouseList,
            },
            {
                path: 'shop-housing-distributed-house-status-diagram',
                name: 'shop-housing/housing/distributed-house-status-diagram',
                meta: {
                    title: '分散式房态图',
                    icon: 'ios-list-box',
                },
                component: DistributedHouseList,
            },
            {
                path: 'shop-split',
                name: '/shop-split',
                meta: {
                    title: '拆分商铺',
                    icon: 'ios-list-box',
                },
                // component: PublicHousingDistributedHouseList,
            },
            {
                path: 'shop-merge',
                name: '/shop-merge',
                meta: {
                    title: '合并商铺',
                    icon: 'ios-list-box',
                },
                // component: PublicHousingDistributedHouseList,
            },
        ],
    },
    {
        path: '/shop-lease',
        name: 'shop-lease',
        meta: {
            title: '租约',
            abbr: '租约',
            icon: 'ios-paper',
        },
        component: Layout,
        children: [{
                path: 'shop-housing/bookingList',
                name: 'shop-housing/bookingList',
                meta: {
                    title: '预约单列表',
                    icon: 'ios-list-box'
                },
                component: BookingList,
            },
            {
                path: 'shop-housing-lease-list',
                name: 'shop-housing/lease/lease-list',
                meta: {
                    title: '租约列表',
                    icon: 'ios-list-box',
                },
                component: LeaseList,
            },
            {
                path: 'shop-housing-tenant-list',
                name: 'shop-housing/lease/tenant-list',
                meta: {
                    title: '租客列表',
                    icon: 'ios-list-box',
                },
                component: TenantList,
            },
            {
                path: 'shop-housing-withdrawalApplication-list',
                name: 'shop-housing/lease/withdrawalApplication-list',
                meta: {
                    title: '退租申请',
                    icon: 'ios-list-box',
                },
                component: WithdrawalApplication,
            },
            {
                path: 'shop-housing-renewalApplication-list',
                name: 'shop-housing/lease/renewalApplication-list',
                meta: {
                    title: '续约申请',
                    icon: 'ios-list-box',
                },
                component: RenewalApplication,
            },
            {
                path: 'shop-setup-project',
                name: '/shop-setup-project',
                meta: {
                    title: '立项审核',
                    icon: 'ios-list-box',
                },
                // component:,
            }
        ],
    },
    {
        path: '/shop-finance',
        name: 'shop-finance',
        meta: {
            title: '账务',
            abbr: '账务',
            icon: 'ios-cash',
        },
        component: Layout,
        children: [{
                path: 'shop-housing-notes',
                name: 'shop-housing/finance/notes',
                meta: {
                    title: '记账本',
                    icon: 'ios-list-box',
                },
                component: AccountNotes,
            },
            {
                path: 'shop-housing-acount-list',
                name: 'shop-housing/finance/account-list',
                meta: {
                    title: '账单列表',
                    icon: 'ios-list-box',
                },
                component: AccountList,
            },
            {
                path: 'shop-housing-tradding',
                name: 'shop-housing/finance/tradding',
                meta: {
                    title: '流水清单',
                    icon: 'ios-list-box',
                },
                component: Transaction,
            },
            {
                path: 'shop-operate-summary',
                name: '/shop-operate-summary',
                meta: {
                    title: '运营汇总',
                    icon: 'ios-list-box',
                },
                // component: Transaction,
            },
            {
                path: 'shop-service-charge',
                name: '/shop-service-charge',
                meta: {
                    title: '第三方服务费',
                    icon: 'ios-list-box',
                },
                // component: Transaction,
            },
            {
                path: 'checkout-list',
                name: 'shop-housing/checkout-list',
                meta: {
                    title: '退租单列表',
                    icon: 'ios-list-box',
                },
                component: CheckoutList,
            },
        ],
    },
    {
        path: '/shop-service',
        name: 'shop-service',
        meta: {
            title: '租后服务',
            abbr: '租后服务',
            icon: 'ios-construct',
        },
        component: Layout,
        children: [{
            path: 'repair',
            name: 'shop-service/repair',
            meta: {
                title: '报修单',
                icon: 'ios-list-box',
            },
            // component: AccountNotes,
        }, ],
    },
    {
        path: '/shop-business',
        name: 'shop-business',
        meta: {
            title: '商务运营',
            abbr: '商务运营',
            icon: 'md-briefcase',
        },
        component: Layout,
        children: [{
            path: 'business-summary',
            name: '/business-summary',
            meta: {
                title: '运营汇总',
                icon: 'ios-list-box',
            },
            // component: AccountNotes,
        }, {
            path: 'sale-service',
            name: '/sale-service',
            meta: {
                title: '代拍服务',
                icon: 'ios-list-box',
            },
            // component: AccountNotes,
        }, ],
    },
];

export const serviceRouter = [{
    path: '/service',
    name: 'service',
    meta: {
        title: '物业服务',
        abbr: '物业服务',
        icon: 'ios-construct',
    },
    component: Layout,
    children: [{
        path: 'repair-list',
        name: 'service/repair-list',
        meta: {
            title: '报修列表',
            icon: 'ios-list-box',
        },
        component: RepairList,
    }, ],
}];

export const financeRouter = [{
    path: '/financial',
    name: 'financial',
    meta: {
        title: '财务',
        abbr: '财务',
        icon: 'ios-home',
    },
    // component: Layout,
}];

export const routers = [
    ...appRouter,
    ...menuRouter,
    ...assetRouter, // 资产路由
    ...publicRouter, // 公租房路由
    ...authorityRouter, //权限中心路由
    ...normalHouseRouter, // 普通住房路由
    ...shopRouter, // 商铺路由
    ...serviceRouter, // 物业服务
    ...financeRouter, // 财务
];

export const allRouters = {
    appRouter,
    menuRouter,
    assetRouter,
    publicRouter,
    authorityRouter,
    normalHouseRouter,
    stateHouseRouter: publicRouter,
    apartmentRouter: normalHouseRouter,
    shopRouter,
    officeRouter: shopRouter,
    serviceRouter,
    financeRouter,
};
