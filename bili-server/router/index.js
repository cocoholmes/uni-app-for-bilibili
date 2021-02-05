//加载 依赖包 引入路由器
const KoaRouter = require('koa-router')

// 引入fly 发送请求用
const Fly = require("flyio/src/node")
const fly = new Fly;
// 导入jwt 加密token
const jwt = require('jsonwebtoken');


// 2 生成 路由器对象
	const router = new KoaRouter()
	// 注册路由  express 这里的参数 request response next koa:ctx(request,response),next
	// router.get('/test',(ctx)=>{
	// 	// 1 获取请求参数
		
	// 	// 2 处理请求参数
		
	// 	// 3 返回响应数据
	// 	ctx.body= '返回测试数据'
	// })
	
	// 注册  popular主页的数据 热门页数据
	const popularData = require('../datas/popular.json')
	// console.log(indexData,typeof indexData);
	router.get('/getPopularData',(ctx)=>{
		ctx.body = popularData
	})
	
	// 注册 番剧页面 cartoon 数据
	const cartoonData = require('../datas/cartoon.json')
	router.get('/getCartoonData',(ctx)=>{
		ctx.body = cartoonData
	})
	
	// 获取用户唯一标识 openId
	router.get('/getOpenId',async(ctx)=>{
			 // 1 接收请求参数
			 let code = ctx.query.code
			 console.log(code);
			 // 2 整合数据 对接微信服务器
			 let appId = "wxe744e29ef72cc306"
			 let appSecret = "bee60847d8fa99349314e7e9b28e1ff1" 
			 // 3 接收到微信服务器返回的数据 对当前用户数据进行自定义绑定,加密
			 // 这个接口 是 微信服务器定义的 官方文档:服务端--登录--code2Session 有这个请求地址
			 let url = `https://api.weixin.qq.com/sns/jscode2session?appid=${appId}&secret=${appSecret}&js_code=${code}&grant_type=authorization_code`;
			 // 发请求 我们之前用的 是 axios(封装的原生xhr,需要window对象) 小程序里面不支持 所以使用fly.js 
			 let result = await fly.get(url)
			let openId = JSON.parse(result.data).openid;
			// console.log('openId: ', openId);
			 
			 // 4 返回给浏览器端 当前用户加密后的标识
			 let userInfo ={
				 openId,
				 username:'wjk',
			 }
					//4.1 对用户数据加密生成token  使用jsonWebToken插件
					 let token = jwt.sign(userInfo,'wjkkk')
					// 4.2 反编译token字段
					// result = jwt.verify(token) // secret or public key must be provided
					// result = jwt.verify(token, 'xxx') // invalid signature
					result = jwt.verify(token, 'wjkkk') // invalid signature
					// console.log(result)
			// 5 返回 加密后的 数据 给浏览器
			ctx.body = token
	})
	 
	  
	// 向外暴露路由器   comment.js语法
	
	module.exports = router