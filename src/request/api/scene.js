/** 场景API模块 */
import myAxios from '../myAxios'
import domain from '../domain'

const scene = {
  /**
   * 基础场景相关
   *
   * @param {*} params id: 豆瓣电影ID
   * @returns
   */
  sceneBases(params) {
    return myAxios.get(domain.plus + '/scene/fotoplace/bases', {
      params: params
    })
  },
}

export default scene