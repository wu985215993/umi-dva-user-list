import { Effect, Subscription } from 'dva';
import { Reducer } from 'redux';
import { deleteRecored, editRecord, getRemoteList, addRecored } from '../service';
interface UserModelType {
  namespace: 'users';
  state: [];
  reducers: { getList: Reducer };
  effects: {
    getRemote: Effect;
    edit: Effect;
    delete: Effect;
    add: Effect;
  };
  subscriptions: {
    setup: Subscription;
  };
}
const UserModel: UserModelType = {
  namespace: 'users',
  state: [],
  reducers: {
    getList(state, { payload }) {
      return payload;
    },
  },
  effects: {
    *getRemote(action, { put, call }) {
      const data = yield call(getRemoteList);
      yield put({
        type: 'getList',
        payload: data,
      });
    },
    *edit({ payload: { id, values } }, { put, call }) {
      const data = yield call(editRecord, { id, values });
      yield put({
        type: 'getRemote',
      });
    },
    *delete({ payload: { id } }, { put, call }) {
      const data = yield call(deleteRecored, { id });
      yield put({
        type: 'getRemote',
      });
    },
    *add({ payload: { values } }, { put, call }) {
      const data = yield call(addRecored, { values });
      yield put({
        type: 'getRemote',
      });
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathname === '/users') {
          dispatch({
            type: 'getRemote',
          });
        }
      });
    },
  },
};
export default UserModel;
