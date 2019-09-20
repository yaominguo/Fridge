
/** 需在login中添加的获取权限路由菜单 */
// import auths from '@/views/test';
// import {all} from '@/router/allRouters';
// const obj = {};
// auths.forEach(item => {
//   obj[item.code] = [];
//   item.sideMenus.forEach(side => {
//     const parent = all[side.code];
//     if (side.subMenus && side.subMenus.length>0) {
//       parent.sideMenus = [];
//       side.subMenus.forEach(sub => {
//         const subMenu = all[sub.code];
//         if (sub.permissions && sub.permissions.length>0) {
//           subMenu.meta.permissions = sub.permissions;
//         }
//         parent.sideMenus.push(subMenu);
//       })
//     }
//     obj[item.code].push(parent);
//   })
// })
// localStorage.setItem('menuRouters', JSON.stringify(obj));
// const routeList = [];
// for(let key in obj) {
//   routeList.push(obj[key]);
// }
// this.$router.addRoutes(...routeList);
// // this.$router不是响应式的，所以手动将路由元注入路由对象
// this.$router.options.routes.push(...routeList);


export default [
  {
    code: '3', // 顶部菜单-资产
    permissions: ['0005-01', '3001', '2008', '3002', '3003'], // 权限编码
    // sideMenus: [ // 侧边菜单列表
    //   {
    //     code: 'basic',
    //     subMenus: [ // 子菜单列表
    //       {
    //         code:'project-management',
    //         permissions: ['view', 'edit', ],  // 页面按钮的权限控制
    //       },
    //       {
    //         code:'community-management',
    //         permissions: ['view', 'delete',],
    //       },
    //     ],
    //   },
    //   {
    //     code: 'assets',
    //     subMenus: [
    //       {
    //         code:'building',
    //         permissions: ['view',],
    //       },
    //       {
    //         code:'verification',
    //         permissions: ['view',],
    //       },
    //     ],
    //   },
    // ],
  },
  {
    code: 'publicRouter', // 顶部菜单-公租房
    sideMenus: [
    ],
  },
  {
    code: 'stateHouseRouter', // 顶部菜单-国有公房
    sideMenus: [
    ],
  },
  {
    code: 'apartmentRouter', // 顶部菜单-人才公寓
    sideMenus: [
    ],
  },
  {
    code: 'normalHouseRouter', // 顶部菜单-普通住房
    sideMenus: [
    ],
  },
  {
    code: 'shopRouter', // 顶部菜单-商铺
    sideMenus: [
    ],
  },
  {
    code: 'officeRouter', // 顶部菜单-商务办公
    sideMenus: [
    ],
  },
  {
    code: 'serviceRouter', // 顶部菜单-物业服务
    sideMenus: [
    ],
  },
  {
    code: 'financeRouter', // 顶部菜单-财务
    sideMenus: [
    ],
  },
]
