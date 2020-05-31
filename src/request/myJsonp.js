/**  jsoup封装 */
import jsonp from 'jsonp'

/**
 *   jsoup请求
 *
 * @export
 * @param {*} url 请求链接
 * @params {*} params 请求参数
 * @returns
 */
export default function myJsonp (url, params) {
  var options = {
    parma: 'callback',
    timeout: 10000,
    prefix: '',
    name: 'callbackFun'
  }
  // 请求参数拼接
  if (params) {
    url += url.indexOf('?') < 0 ? '?' : '&'
    for (const key in params) {
      url += key + '=' + encodeURIComponent(params[key]) + '&'
    }
    url = url.substring(0, url.length - 1)
  }
  return new Promise((resolve, reject) => {
    jsonp(url, options, (error, res) => {
      // 请求失败
      if (error) {
        reject(error)
      } else {
        resolve(res)
      }
    })
  })
}
