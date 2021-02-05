import config from './config.js'
// 封装发请求的方法
export default (url,data={},method='GET')=>{
  return new Promise((resolve,reject)=>{
    // 执行异步任务
    uni.request({
      url:config.host + url, //用于小程序
      // url, //H5就这样写够了
      data,
      method,
      success:(res)=>{
        resolve(res.data)
      },
      fail:(err)=>{
        reject(err)
      }
    })
  })
}