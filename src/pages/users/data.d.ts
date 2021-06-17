//每条用户数据的接口类型
export interface SingleUserType {
  id: number;
  name: string;
  email: string;
  create_time: string;
  update_time: string;
  status: number;
}
export interface FormValues {
  [name: string]: any;
}
