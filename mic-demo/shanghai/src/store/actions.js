import types from './mutation-types';
import { allRouters } from '@/router/router';

export default {
    setMenu({ commit }, data) { // 根据顶部菜单改变侧边菜单列表
      let menu;
      // if (data && allRouters[data]) {
      //   menu = JSON.parse(JSON.stringify(allRouters[data]));
      // } else {
      //   menu = JSON.parse(JSON.stringify(allRouters.menuRouter));
      // }
      menu = JSON.parse(JSON.stringify(allRouters.menuRouter));
      commit(types.SET_MENU, menu);
    },
    setLoading({ commit }, data) {
        commit(types.SET_LOADING, data);
    },
    setHouseList({ commit }, data) {
        commit(types.SET_HOUSE_LIST, data);
    },
    setLeaseDetailInfo({ commit }, data) {
        commit(types.SET_LEASE_DETAIL, data);
    },
    setBuildingInfo({ commit }, data) {
        commit(types.SET_BUILDING_INFO, data);
    },
    setUserInfo({ commit }, data) {
        commit(types.SET_USER_INFO, data);
    },
    setHouseListParams({ commit }, data) {
        commit(types.SET_SEARCH_PARAMS, data);
    },
    setFirstLoad({ commit }, val) {
      commit(types.SET_FIRST_LOAD, val);
    }
};
