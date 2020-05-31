/** 电影API模块 */
import myAxios from '../myAxios'
import myJsonp from '../myJsonp'
import domain from '../domain'
import apikey from '../apikey'

const movie = {
  /**
   * 电影详情
   *
   * @param {*} params id: 豆瓣电影ID
   * @returns
   */
  movieDetails(params) {
    return myAxios.get(domain.plus + '/movie/details', {
      params: params
    })
  },
  /**
   * 知乎相关
   *
   * @param {*} params id: 豆瓣电影ID
   * @returns
   */
  zhihuBases(params) {
    return myAxios.get(domain.plus + '/movie/zhihu/bases', {
      params: params
    })
  },
  /**
   * 资源相关
   *
   * @param {*} params id: 豆瓣电影ID
   * @returns
   */
  resourceBases(params) {
    return myAxios.get(domain.plus + '/movie/resource/bases', {
      params: params
    })
  },
  /**
   *  豆瓣电影API v2
   *
   * @param {*} id: 豆瓣电影ID
   * @returns
   */
  doubanApiDetails(id) {
    return myJsonp(domain.doubanV2 + '/movie/subject/' + id + apikey.doubanV2)
  }
}

export default movie