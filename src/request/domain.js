/** 域名统一管理 */
const domain = {
	// plus后端网关
	plus: process.env.VUE_APP_API,
// 	plus: 'http://localhost:9527/v2',
	// neteaseMusicApi
	// neteaseMusicApi: 'http://localhost:10102',
	// neteaseMusicApi: 'https://movie.doubans.com/neteaseThirdApi',
	// 豆瓣电影v2
	doubanV2: 'https://api.douban.com/v2',
	// 豆瓣官网
	douban: 'https://www.douban.com',
	// 豆瓣电影官网
	doubanMovie: 'https://movie.douban.com',
	// 网易云音乐官网
	neteaseMusic: 'https://music.163.com',
	// IMDB官网
	imdb: 'https://www.imdb.com',
	// 烂番茄官网
	tomato: 'https://www.rottentomatoes.com',
	// mtc官网
	mtc: 'https://www.metacritic.com',
	// 知乎官网
	zhihu: 'https://www.zhihu.com',
	// 猫眼官网
	maoyan: 'https://maoyan.com',
	// google
	google: 'https://www.google.com',
	// github
	github: 'https://github.com'
}

export default domain