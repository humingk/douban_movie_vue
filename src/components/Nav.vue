<template>
	<div id="nav-component">
		<div class="left"/>
		<div class="bar animate__animated animate__flipInX">
			<a :class="'logo '+logoOverStyle" @mouseenter="logoOver" href="/">
				<img src="/image/logo.png"/>
			</a>
			<div class="bar-center">
				<el-autocomplete
					:debounce="300"
					:fetch-suggestions="searchTipsAsync"
					@select="handSelect"
					class="search"
					id="search-auto"
					placeholder="            电影   丨   影人  丨   场景   丨   资源   丨   取景   丨   配乐   丨   歌单   丨   原声            "
					trigger-on-focus
					v-model="keyword">
					<el-select class="search-select"
										 placeholder="电影"
										 slot="prepend"
										 v-model="searchSelect">
						<el-option label="电影" value="movie"></el-option>
						<el-option label="影人" value="celebrity"></el-option>
						<el-option label="场景" value="scene"></el-option>
						<el-option label="资源" value="resource"></el-option>
						<el-option label="地点" value="place"></el-option>
						<el-option label="配乐" value="song"></el-option>
						<el-option label="歌单" value="playlist"></el-option>
						<el-option label="原声" value="album"></el-option>
					</el-select>
					<el-button @click="searchPage" icon="el-icon-search" slot="append"></el-button>
					<template slot-scope="{ item }" style="">
						<div class="search-tips" v-if="searchSelect==='movie' && item.base">
							<el-image :src="item.base.urlPoster" class="poster" fit="fill" lazy>
								<div class="image-slot" slot="error">
									<i class="el-icon-picture-outline"></i>
								</div>
							</el-image>
							<div class="content">
								<div class="title">
                  <span class="name-zh">
                    <span>{{ item.base.nameZh }}</span>
                    {{item.base.startYear?" ("+item.base.startYear+")":"" }}
                  </span>
									<span class="rate" v-if="item.rate">
                    {{ Number.isInteger(item.rate.score)?item.rate.score+".0":item.rate.score }}
                    <el-image class="rate-from" fit="cover" src="/image/douban.ico"/>
                  </span>
								</div>
								<div class="description">
									<span>{{ item.base.nameOrigin }}</span>
									<span :key="i" class="alias" v-for="(alias, i) in item.aliasList">{{" / "+alias}}</span>
									<span v-show="item.base.summary">{{"=> "+item.base.summary}}</span>
								</div>
							</div>
						</div>
						<div class="search-tips" v-if="searchSelect==='celebrity' && item.base">
							<el-image :src="item.base.urlPortrait" class="poster" fit="fill" lazy>
								<div class="image-slot" slot="error">
									<i class="el-icon-picture-outline"></i>
								</div>
							</el-image>
							<div class="content">
								<div class="title">
                  <span class="name-zh">
                    <span>{{ item.base.nameZh }}</span>
                    {{ item.base.birthDate?" ("+/\d{4}/.exec(item.base.birthDate)+")":"" }}
                  </span>
									<span class="rate">
                    <el-image class="rate-from" fit="cover" src="/image/douban.ico"/>
                  </span>
								</div>
								<div class="description">
									<span>{{ item.base.nameOrigin }}</span>
									<span
										:key="i"
										class="alias"
										v-for="(alias, i) in item.aliasList"
									>{{" / "+alias.isNikename===1?alias.nameAlias+'(昵称)':alias.nameAlias}}</span>
									<span v-if="item.aliasList.length===0">{{item.base.summary}}</span>
								</div>
							</div>
						</div>
						<div class="search-tips" v-if="searchSelect==='scene' && item.length!==0">
							<el-image :src="item.urlMap" class="poster" fit="fill" lazy>
								<div class="image-slot" slot="error">
									<i class="el-icon-picture-outline"></i>
								</div>
							</el-image>
							<div class="content">
								<div class="title">
                  <span class="name-zh">
                    <span>{{ item.nameZh }}</span>
                    {{item.startYear?" ("+item.startYear+")":""}}
                  </span>
									<span class="rate">
                    <el-image class="rate-from" fit="cover" src="/image/mocation.ico"/>
                  </span>
								</div>
								<div class="description">
									<span>{{ item.nameEn }}</span>
									<span>{{item.description?"=> "+item.description:""}}</span>
								</div>
							</div>
						</div>
						<div class="search-tips" v-if="searchSelect==='resource' && item.length!==0">
							<div class="content">
								<div class="title">
							                  <span class="name-zh">
							                    <span>{{ item.nameZh }}</span>
							                    {{item.createYear && item.createYear!=0?" ("+item.createYear+")":""}}
							                  </span>
									<span :style="'background-color: rgba('+item.websiteColor+',0.7)'" class="rate resource">
										{{item.typeResource}}
							                  </span>
								</div>
								<div class="description">
									<el-link :href="item.urlResource" target="_blank">{{ item.nameOrigin }}</el-link>
								</div>
							</div>
						</div>
						<div class="search-tips" v-if="searchSelect==='place' && item.length!==0">
							<el-image :src="item.urlPoster" class="poster" fit="fill" lazy>
								<div class="image-slot" slot="error">
									<i class="el-icon-picture-outline"></i>
								</div>
							</el-image>
							<div class="content">
								<div class="title">
                  <span class="name-zh">
                    <span>{{ item.nameZh }}</span>
                    {{item.areaZh===""?"":" ("+item.areaZh+")"}}
                  </span>
									<span class="rate">
                    <el-image class="rate-from" fit="cover" src="/image/mocation.ico"/>
                  </span>
								</div>
								<div class="description">
									<span>{{item.addressZh}}</span>
									<span v-if="item.description!==''">{{ "=> "+item.description }}</span>
								</div>
							</div>
						</div>
						<div class="search-tips" v-if="searchSelect==='song' && item.length!==0">
							<el-image
								:src="item.artists[0].img1v1Url+'?param=60y80'"
								class="poster"
								fit="fill"
								lazy
								v-if="item.artists && item.artists.length!==0"
							>
								<div class="image-slot" slot="error">
									<i class="el-icon-picture-outline"></i>
								</div>
							</el-image>
							<div class="content">
								<div class="title">
                  <span class="name-zh">
                    <span>{{item.name }}</span>
                    {{ item.album?" ["+item.album.name+"]":"" }}
                  </span>
									<span class="rate">
                    <el-image class="rate-from" fit="cover" src="/image/netease/netease.ico"/>
                    <el-image
											class="rate-from"
											fit="cover"
											src="/image/netease/netease_mv.ico"
											v-if="item.mvid!==0"
										/>
                  </span>
								</div>
								<div class="description">
									<span :key="i+'11'" class="alias" v-for="(a, i) in item.alias">{{" / "+a}}</span>
									<span
										:key="i+'22'"
										class="alias"
										v-for="(alias, i) in item.artists"
									>{{" / "+alias.name}}</span>
									<span v-if="item.album && item.album.artist">{{" / "+item.album.artist.name}}</span>
								</div>
							</div>
						</div>
						<div class="search-tips" v-if="searchSelect==='playlist' && item.length!==0">
							<el-image :src="item.coverImgUrl+'?param=60y80'" class="poster" fit="fill" lazy>
								<div class="image-slot" slot="error">
									<i class="el-icon-picture-outline"></i>
								</div>
							</el-image>
							<div class="content">
								<div class="title">
                  <span class="name-zh">
                    <span>{{item.name }}</span>
                  </span>
									<span class="rate" v-if="item.playCount">
                    {{item.playCount&lt;1000?item.playCount:parseInt(item.playCount/1000)+'k'}}
                    <el-image class="rate-from" fit="cover" src="/image/netease/netease.ico"/>
                  </span>
								</div>
								<div class="description">
									<span v-if="!item.description && item.track">{{item.track.name}}</span>
									<span>{{item.description?"=> "+item.description:""}}</span>
								</div>
							</div>
						</div>
						<div class="search-tips" v-if="searchSelect==='album' && item.length!==0">
							<el-image :src="item.picUrl+'?param=60y80'" class="poster" fit="fill" lazy>
								<div class="image-slot" slot="error">
									<i class="el-icon-picture-outline"></i>
								</div>
							</el-image>
							<div class="content">
								<div class="title">
                  <span class="name-zh">
                    <span>{{item.name }}</span>
                    {{item.artist?" ("+item.artist.name+")":""}}
                  </span>
									<span class="rate">
                    <el-image class="rate-from" fit="cover" src="/image/netease/netease.ico"/>
                  </span>
								</div>
								<div class="description">
									<span>{{item.type}}</span>
									<span
										:key="indexKey+'key1'"
										v-for="(i, indexKey) in item.artists"
									>{{" / "+i.name}}</span>
									<span>{{item.description?"=> "+item.description:""}}</span>
								</div>
							</div>
						</div>
					</template>
				</el-autocomplete>
				<div class="router">
					<el-link
						:href="item.url"
						:key="index"
						:underline="false"
						class="nav-items"
						type="primary"
						v-for="(item, index) in navItems"
					>{{item.name}}
					</el-link>
					<el-link
						:href="'/people/'+personalCenter"
						:underline="false"
						class="nav-items"
						type="primary"
						v-if="this.userInfo"
					>个人中心
					</el-link>
					<el-link
						:underline="false"
						@click="login"
						class="nav-items"
						type="primary"
						v-if="!this.userInfo"
					>登录/注册
					</el-link>
					<el-link
						:underline="false"
						class="nav-items"
						href="/message"
						type="primary"
					>留言板
					</el-link>
				</div>
			</div>
		</div>
		<div class="right animate__animated animate__bounceInDown">
			<a
				:href="githubPlus"
				aria-label="View source on GitHub"
				class="github-corner"
				target="_blank"
			>
				<svg
					:class="'github-svg '+githubOverClass"
					@mouseenter="githubOver"
					aria-hidden="true"
					height="120"
					viewBox="0 0 250 250"
					width="128"
				>
					<path d="M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z"/>
					<path
						class="octo-arm"
						d="M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2"
						fill="currentColor"
						style="transform-origin: 130px 106px;"
					/>
					<path
						class="octo-body"
						d="M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z"
						fill="currentColor"
					/>
				</svg>
			</a>
		</div>
	</div>
</template>
<script>
	import {mapActions, mapState} from 'vuex'
	import domain from '../request/domain'

	export default {
		name: 'nav-component',
		data() {
			return {
				githubPlus: domain.github + '/humingk/douban_movie_plus',
				offset: 0,
				limit: 15,
				logoOverStyle: '',
				isLogoOver: false,
				githubOverClass: '',
				isGithubOver: false,
				// 返回值
				res: null,
				oldKeyword: '',
				oldSearchSelect: 'movie',
				// 导航栏
				navItems: [
					{
						name: '首页',
						url: '/'
					},
					{
						name: 'xx',
						url: '/tag'
					},
					{
						name: 'xx',
						url: '/mocation'
					},
					{
						name: 'xx',
						url: '/music'
					},
				]
			}
		},
		computed: {
			// 个人中心
			personalCenter() {
				if (this.userInfo) {
					return this.userInfo.userId
				} else {
					return '登录/注册'
				}
			},
			// 双向绑定 v-model
			searchSelect: {
				get() {
					return this.$store.state.searchSelect
				},
				set(newValue) {
					this.update({key: 'searchSelect', value: newValue})
				}
			},
			// 双向绑定 v-model
			keyword: {
				get() {
					return this.$store.state.keyword
				},
				set(newValue) {
					this.update({key: 'keyword', value: newValue})
				}
			},
			...mapState({
				userInfo: 'userInfo'
			})
		},
		methods: {
			// 搜索提示
			searchTipsAsync(keyword, callback) {
				keyword = keyword || ''
				// 空字符串 or 重复上一次查询
				if (keyword.trim() === '' || (keyword === this.oldKeyword && this.searchSelect === this.oldSearchSelect)) {
					callback((this.res && this.res.length !== 0) ? this.res : [])
				} else {
					const params = {
						keyword: keyword,
						offset: this.offset,
						limit: this.limit
					}
					switch (this.searchSelect) {
						case 'movie':
							this.$api.search.movieDoubanTips(params).then(res => {
								this.updateOld()
								this.res = res
								callback(this.res)
							})
							break
						case 'celebrity':
							this.$api.search.celebrityDoubanTips(params).then(res => {
								this.updateOld()
								this.res = res
								callback(this.res)
							})
							break
						case 'scene':
							this.$api.search.movieSceneTips(params).then(res => {
								this.updateOld()
								this.res = res
								callback(this.res)
							})
							break
						case 'resource':
							this.$api.search.resourceDetails(params).then(res => {
								this.updateOld()
								this.res = res
								callback(this.res)
							})
							break
						case 'place':
							this.$api.search.placeSceneTips(params).then(res => {
								this.updateOld()
								this.res = res
								callback(this.res)
							})
							break
						case 'song':
							params['keywords'] = keyword
							params['type'] = 1
							this.$api.music.neteaseMusicTips(params).then(res => {
								this.updateOld()
								this.res = res.result.songCount !== 0 ? res.result.songs : []
								callback(this.res)
							})
							break
						case 'playlist':
							params['keywords'] = keyword
							params['type'] = 1000
							this.$api.music.neteaseMusicTips(params).then(res => {
								this.updateOld()
								this.res = res.result.playlistCount !== 0 ? res.result.playlists : []
								callback(this.res)
							})
							break
						case 'album':
							params['keywords'] = keyword
							params['type'] = 10
							this.$api.music.neteaseMusicTips(params).then(res => {
								this.updateOld()
								this.res = res.result.albumCount !== 0 ? res.result.albums : []
								callback(this.res)
							})
							break
						default:
							break
					}
				}
			},
			// 更新old
			updateOld() {
				this.oldKeyword = this.keyword
				this.oldSearchSelect = this.searchSelect
			},
			// 跳转到搜索页面
			searchPage() {
				if (this.keyword !== '') {
					window.open('/search?type=' + this.searchSelect + '&keyword=' + this.keyword)
				}
			},
			// 跳转到选定条目
			handSelect(item) {
				switch (this.searchSelect) {
					case 'movie':
						window.open('/subject/' + item.base.id)
						break
					case 'celebrity':
						window.open('/celebrity/' + item.base.id)
						break
					case 'scene':
						window.open('/scene/' + item.id)
						break
					case 'resource':
						window.open(item.urlResource)
						break
					case 'place':
						window.open('/place/' + item.id)
						break
					case 'song':
						window.open(domain.neteaseMusic + '/#/song?id=' + item.id)
						break
					case 'playlist':
						window.open(domain.neteaseMusic + '/#/playlist?id=' + item.id)
						break
					case 'album':
						window.open(domain.neteaseMusic + '/#/album?id=' + item.id)
						break
					default:
						break
				}
			},
			// 登录
			login() {
				this.updatePopups({key: 'isLogining', value: true})
			},
			logoOver() {
				if (!this.isLogoOver) {
					this.isLogoOver = true
					this.logoOverStyle = 'animate__animated animate__tada'
					setTimeout(() => {
						this.logoOverStyle = ''
						this.isLogoOver = false
					}, 1500)
				}
			},
			githubOver() {
				if (!this.isGithubOver) {
					this.isGithubOver = true
					this.githubOverClass = 'animate__animated animate__heartBeat'
					setTimeout(() => {
						this.githubOverClass = ''
						this.isGithubOver = false
					}, 800)
				}
			},
			...mapActions(['update', 'updatePopups'])
		}
	}
</script>
<style>
	/* 布局 --------------------------------------- */
	#nav-component {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: row;
	}

	/* nav-component */
	#nav-component .left {
		flex: 0 0 128px;
	}

	.bar {
		flex: 1 0 auto;
		flex-direction: row;
		display: flex;
		margin-top: 20px;
		margin-bottom: 10px;
		background-color: rgba(255, 255, 255, 0);
	}

	#nav-component .right {
		flex: 0 0 128px;
	}

	/* bar */
	.bar .logo {
		flex: 0 0 250px;
	}

	.bar .bar-center {
		flex: 1 0 auto;
		display: flex;
		flex-direction: column;
		margin-left: 10px;
		margin-right: 10px;
	}

	/* log */
	.bar .logo img {
		width: 250px;
		height: 80px;
	}

	/* bar-center */
	.search {
		flex: 0 0 40px;
		margin-top: 8px;
	}

	.router {
		flex: 0 0 24px;
		margin-top: 8px;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: center;
	}

	/* search  */
	.search-select {
		flex: auto;
		width: 75px;
		color: #409eff;
		font-weight: bold;
	}

	.search-tips {
		display: flex;
		flex-direction: row;
		flex: 1;
		height: 80px;
		width: 100%;
		line-height: 25px;
		white-space: pre-wrap;
	}

	.el-autocomplete-suggestion__wrap ul li {
		padding: 5px;
		border-bottom: 1px solid snow;
	}

	/* router row排列 */
	.nav-items {
		flex: auto;
		font-size: 16px;
		font-weight: bold;
	}

	/* search tips 左 右 */
	.search-tips .poster {
		width: 60px;
		height: 80px;
	}

	.search-tips .content {
		flex: 1;
		display: flex;
		flex-direction: column;
		width: 0;
		margin-left: 5px;
		margin-right: 5px;
	}

	/* poster */
	.search-tips .poster .el-icon-picture-outline {
		width: 60px;
		height: 80px;
	}

	/* content 上 下*/
	.search-tips .title {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		flex-flow: nowrap;
	}

	.search-tips .description {
		display: flex;
		flex-direction: row;
		flex-flow: wrap;
		overflow: hidden;
		margin-bottom: 2px;
	}

	/* title 左 右 */
	.search-tips .title .name-zh {
		font-size: 16px;
	}

	.search-tips .title .name-zh span {
		color: #000;
		font-size: 18px;
		font-weight: 600;
	}

	.search-tips .title .rate {
		font-size: 20px;
		color: #f31919;
	}

	.search-tips .title .rate.resource {
		border-radius: 5px;
		font-size: 20px;
		color: #000;
	}

	.search-tips .title .rate .rate-from {
		width: 18px;
		height: 18px;
	}

	/* des */
	.search-tips .description span {
		font-size: 15px;
	}

	/* 其他样式 --------------------------------------- */
	.el-select-dropdown__wrap {
		max-height: 290px;
	}

	.el-link.el-link--primary {
		color: #054ebd;
	}

	.el-link.el-link--primary:hover {
		color: #f31919;
	}

	/* github */
	.github-corner:hover .octo-arm {
		animation: octocat-wave 560ms ease-in-out;
	}

	@keyframes octocat-wave {
		0%,
		100% {
			transform: rotate(0);
		}
		20%,
		60% {
			transform: rotate(-25deg);
		}
		40%,
		80% {
			transform: rotate(10deg);
		}
	}

	@media (max-width: 500px) {
		.github-corner:hover .octo-arm {
			animation: none;
		}

		.github-corner .octo-arm {
			animation: octocat-wave 560ms ease-in-out;
		}
	}

	.github-svg {
		fill: rgba(64, 158, 255, 0);
		color: #054ebd;
		position: fixed;
	}

	.el-input-group__prepend {
		border-radius: 30px 0 0 30px;
	}

	.el-input-group__prepend div.el-select .el-input__inner,
	.el-input-group__prepend div.el-select:hover .el-input__inner {
		font-weight: bold;
		color: #054ebd;
	}

	.el-input-group__append,
	.el-input-group__prepend {
		background-color: rgba(255, 255, 255, 0.7);
	}

	.el-select-dropdown__item.hover,
	.el-select-dropdown__item:hover {
		background-color: rgba(255, 255, 255, 0.95);
	}

	.el-select-dropdown__item.selected {
		font-weight: bold;
		color: #054ebd;
	}

	.el-select .el-input .el-select__caret {
		color: #054ebd;
		font-size: 14px;
		font-weight: bold;
	}

	.el-select-dropdown__item {
		font-weight: bold;
	}

	.el-input-group__append {
		border-radius: 0 30px 30px 0;
	}

	.el-autocomplete-suggestion {
		background-color: rgba(255, 255, 255, 0.7);
	}

	/* ul 下拉框 */
	.el-autocomplete-suggestion__wrap.el-scrollbar__wrap {
		max-height: 480px;
	}

	.el-select-dropdown {
		background-color: rgba(255, 255, 255, 0.8);

	}

	/* li 选项 */
	.el-scrollbar__view.el-autocomplete-suggestion__list li + li {
		padding: 5px;
		color: #0b0c0c;
		border-bottom: 1px solid snow;
	}

	.el-autocomplete-suggestion li.highlighted,
	.el-autocomplete-suggestion li:hover {
		background-color: rgba(255, 255, 255, 0.9);
	}

	.el-autocomplete-suggestion li {
		padding: 0;
	}

	/* padding: 0 20px; */
	/* input color */
	.el-input__inner {
		color: #000;
		font-weight: bold;
		/* border: 1px solid #dcdfe6; */
		border: 1px solid rgba(255, 255, 255, 0.8);
		background-color: rgba(255, 255, 255, 0.5);
	}

	/* input placeHolder */
	.el-input__inner::placeholder {
		color: #606266;
		font-weight: bold;
	}

	.el-input__inner::-webkit-input-placeholder {
		/* WebKit browsers 适配谷歌 */
		color: #606266;
		font-weight: bold;
	}

	.el-input__inner::-moz-placeholder {
		/* Mozilla Firefox 4 to 18 适配火狐 */
		color: #606266;
		font-weight: bold;
	}

	.el-input__inner::-ms-input-placeholder {
		/* Internet Explorer 10+  适配ie*/
		color: #606266;
		font-weight: bold;
	}

	.el-scrollbar__wrap {
		overflow: hidden;
	}
</style>
