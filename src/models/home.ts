import HomeServices from '@/services/home';

const { queryFoodList, queryTruckList } = HomeServices.HomeController;

export default {
  namespace: 'home', //不写的话，默认是文件名
  state: {
    foods: [],
    trucks: [],
  },

  effects: {
    *queryFoodList({ }, { call, put }) {
      const res = yield call(queryFoodList);
      yield put({ type: 'queryFoodSuccess', payload: res });
    },
    *queryTruckList({ payload }, { call, put }) {
      const res = yield call(queryTruckList, payload);
      yield put({ type: 'queryTruckSuccess', payload: res });
    },
  },

  reducers: {
    queryFoodSuccess(state, { payload }) {
      return {
        ...state,
        foods: payload,
      };
    },
    queryTruckSuccess(state, { payload }) {
      return {
        ...state,
        trucks: payload,
      };
    },
  },
};
