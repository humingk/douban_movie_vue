/** 影人API模块 */
import myAxios from '../myAxios'
import myJsonp from '../myJsonp'
import domain from '../domain'
import apikey from '../apikey'

const celebrity = {
  /**
   * 影人详情
   *
   * @param {*} params id: 豆瓣影人ID
   * @returns
   */
  celebrityDetails (params) {
    return myAxios.get(domain.plus + '/celebrity/details', { params: params })
  },
  /**
   *  豆瓣电影API v2
   *
   * @param {*} id: 豆瓣影人ID
   * @returns
   */
  doubanApiDetails (id) {
    return myJsonp(domain.doubanV2 + '/movie/celebrity/' + id + apikey.douban)
  }
}

export default celebrity
