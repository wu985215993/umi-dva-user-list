import { message } from 'antd';
import { Effect, Subscription } from 'dva';
import { Reducer } from 'redux';
import { deleteRecored, editRecord, getRemoteList, addRecored } from './service';
import { SingleUserType } from './data';

//后端返回数据的接口类型
export interface UserState {
  data: SingleUserType[];
  meta: {
    total: number;
    per_page: number;
    page: number;
  };
}
//用户model的接口类型
interface UserModelType {
  namespace: 'users';
  state: UserState;
  reducers: { getList: Reducer<UserState> };
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
  state: {
    data: [],
    meta: {
      total: 0,
      per_page: 5,
      page: 1,
    },
  },
  reducers: {
    getList(state, { payload }) {
      return payload;
    },
  },
  effects: {
    *getRemote({ payload: { page, per_page } }, { put, call }) {
      const data = yield call(getRemoteList, { page, per_page });
      if (data) {
        yield put({
          type: 'getList',
          payload: data,
        });
      }
    },
    *edit({ payload: { id, values } }, { put, call, select }) {
      const data = yield call(editRecord, { id, values });
      if (data) {
        message.success('Edit success');
        const { page, per_page } = yield select(state => state.users.meta);
        yield put({
          type: 'getRemote',
          payload: {
            page,
            per_page,
          },
        });
      } else {
        message.error('Edit failed');
      }
    },
    *delete({ payload: { id } }, { put, call, select }) {
      const data = yield call(deleteRecored, { id });
      if (data) {
        message.success('Delete success');
        const { page, per_page } = yield select(state => state.users.meta);
        console.log(page, per_page);

        yield put({
          type: 'getRemote',
          payload: {
            page,
            per_page,
          },
        });
      } else {
        message.error('Delete failed');
      }
    },
    *add({ payload: { values } }, { put, call, select }) {
      const data = yield call(addRecored, { values });
      const { page, per_page } = yield select(state => state.users.meta);
      if (data) {
        message.success('Add success');
        yield put({
          type: 'getRemote',
          payload: {
            page,
            per_page,
          },
        });
      } else {
        message.error('Add failed');
      }
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathname === '/users') {
          /* dispatch({
            type: 'getRemote',
          }); */
        }
      });
    },
  },
};
export default UserModel;
