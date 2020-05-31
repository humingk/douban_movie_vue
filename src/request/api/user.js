/** 用户API模块 */
import myAxios from '../myAxios'
import domain from '../domain'
import qs from 'qs'

const user = {
  /**
   * 用户登录
   *
   * @param {*} params email password
   * @returns
   */
  login (params) {
    return myAxios.post(domain.plus + '/user/login', qs.stringify(params))
  },
  /**
   * 用户注册
   *
   * @param {*} params email password
   * @returns
   */
  register (params) {
    return myAxios.post(domain.plus + '/user/register', qs.stringify(params))
  },
  /**
   * 用户token续期
   *
   * @param {*} params refreshToken
   * @returns
   */
  renew (params) {
    return myAxios.post(domain.plus + '/user/renew', qs.stringify(params))
  }
}

export default user
