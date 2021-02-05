module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:3006',
        ws: true,
        changeOrigin: true,
				pathRewrite: { // 路径重写
					'^/api': ''
				}
      }
    }
  }
}

