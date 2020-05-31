/** vue cli3.x 配置文件 */

// gzip
const CompressionPlugin = require('compression-webpack-plugin')
// Webpack包文件分析器
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
// 代码压缩
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

// 本地环境是否需要使用cdn
const devNeedCdn = false

// cdn链接
const cdn = {
	// cdn：模块名称和模块作用域命名
	// 不打包
	externals: {
		vue: 'Vue',
		vuex: 'Vuex',
		'vue-router': 'VueRouter',
		'element-ui': 'ELEMENT',
		'echarts': 'ECharts',
		'animate': 'animate'
	},
	// cdn的css链接
	css: [
		'https://unpkg.com/element-ui@2.13.1/lib/theme-chalk/index.css',
		'https://unpkg.com/animate.css@4.0.0/animate.min.css',
	],
	// cdn的js链接
	js: [
		// vue first
		'https://unpkg.com/vue@2.6.1/dist/vue.min.js',
		'https://unpkg.com/vuex@3.1.3/dist/vuex.min.js',
		'https://unpkg.com/vue-router@3.1.6/dist/vue-router.min.js',
		'https://unpkg.com/element-ui@2.13.0/lib/index.js',
		'https://cdn.bootcss.com/echarts/4.7.0/echarts.min.js',
	]
}

module.exports = {
	//  项目路径
	publicPath: process.env.NODE_ENV === 'pro' ? '' : '',
	// 输出文件目录
	outputDir: 'dist',
	// 放置生成的静态资源目录,相对于outputDir
	assetsDir: 'assets',
	// 是否在构建生产包时生成 sourceMap 文件
	productionSourceMap: false,
	// 文件名哈希
	filenameHashing: false,
	// 代码保存时进行eslint检测
	lintOnSave: true,
	// 开发环境配置
	devServer: {
		host: 'localhost',
		port: 8080,
		https: false,
		// 自动启动浏览器
		open: true,
		// 热更新
		hotOnly: true
	},
	chainWebpack: config => {
		// 修复HMR
		config.resolve.symlinks(true)
		// 图片压缩
		if (process.env.NODE_ENV === 'pro') {
			config.module
				.rule('images')
				.use('image-webpack-loader')
				.loader('image-webpack-loader')
				.options({bypassOnDebug: true})
				.end()
		}
		// cdn
		config.plugin('html').tap(args => {
			if (process.env.NODE_ENV === 'pro') {
				args[0].cdn = cdn
			}
			return args
		})
	},
	// 调整 webpack 配置
	configureWebpack: config => {
		// cdn
		if (process.env.NODE_ENV === 'pro') {
			config.externals = cdn.externals
		}
		// 生产环境
		const pluginsPro = [
			// 文件开启Gzip
			new CompressionPlugin({
				filename: '[path].gz[query]',
				algorithm: 'gzip',
				test: new RegExp('\\.(' + ['js', 'css'].join('|') + ')$'),
				threshold: 8192,
				minRatio: 0.8
			}),
			// Webpack包文件分析器
			new BundleAnalyzerPlugin({
				// 不启动展示打包报告的http服务器
				analyzerMode: 'disabled',
			}),
			// 代码压缩
			new UglifyJsPlugin({
				uglifyOptions: {
					warnings: false,
					// 生产环境自动删除console
					compress: {
						drop_debugger: true,
						drop_console: true,
						pure_funcs: ['console.log']
					}
				},
				sourceMap: false,
				parallel: true
			})
		]
		// 开发环境
		const pluginsDev = []
		// 根据当前环境选择配置
		if (process.env.NODE_ENV === 'pro') {
			config.plugins = [...config.plugins, ...pluginsPro]
		} else {
			config.plugins = [...config.plugins, ...pluginsDev]
		}
	}
}