import types from './mutation-types';

export default {
    [types.SET_MENU](state, data) {
        state.menuRouter = data;
    },
    [types.SET_LOADING](state, status) {
        state.showLoading = status;
    },
    [types.SET_HOUSE_LIST](state, data) {
        state.houseList = [];
        if (data.length > 0) {
            state.houseList = data;
        }
    },
    [types.SET_LEASE_DETAIL](state, data) {
        state.leaseDetail = data;
    },
    [types.SET_BUILDING_INFO](state, data) {
        state.buildingInfo = data;
    },
    [types.SET_USER_INFO](state, data) {
        state.userInfo = data;
    },
    [types.SET_SEARCH_PARAMS](state, data) {
        state.searchParams = data;
    },
    [types.SET_FIRST_LOAD](state, data) {
        state.firstOnload = data;
    }
};