<template>
	<div
		@click="changeBaseView"
		@mouseenter="isChangeBaseView=true"
		@mouseleave="isChangeBaseView=false"
		id="movie-base-component"
		v-if="movieBases"
	>
		<div :class="doubanClass" id="douban" v-show="isDoubanView">
			<div class="title">
				<span
					class="name-zh">{{movieBases.douban.base.nameZh.slice(0,12)}}{{(movieBases.douban.base.nameZh.length>15)?"...":""}}</span>
				<span
					class="name-origin"
					v-show="movieBases.douban.base.nameOrigin && (movieBases.douban.base.nameZh.length+movieBases.douban.base.nameOrigin.length<=10)"
				>{{movieBases.douban.base.nameOrigin}}</span>
				<span
					class="year"
					v-show="movieBases.douban.base.startYear!==0"
				>{{"("+movieBases.douban.base.startYear+")"}}</span>
				<el-button
					@click="changeBaseView"
					class="change-base"
					type="text"
					v-show="isChangeBaseView"
				>点击切换
				</el-button>
			</div>
			<div class="base">
				<img :src="movieBases.douban.base.urlPoster" fit="cover"
						 v-show="movieBases.douban.base.urlPoster && movieBases.douban.base.urlPoster!=''"/>
				<div class="base-msgbox">
					<div v-show="doubanCelebrityList.director.length!==0">
						<span class="head">导演</span>
						<span class="msg">
              <span :key="index" v-for="(item, index) in doubanCelebrityList.director">
                <el-link :href="item.urlCelebrityDouban" target="_black">{{item.nameZh}}</el-link>
                {{index+1===doubanCelebrityList.director.length?'':'/'}}
              </span>
            </span>
					</div>
					<div v-show="doubanCelebrityList.writer.length!==0">
						<span class="head">编剧</span>
						<span class="msg">
              <span :key="index" v-for="(item, index) in doubanCelebrityList.writer">
                <el-link :href="item.urlCelebrityDouban" target="_black">{{item.nameZh}}</el-link>
                {{index+1===doubanCelebrityList.writer.length?'':'/'}}
              </span>
            </span>
					</div>
					<div v-show="doubanCelebrityList.actor.length!==0">
						<span class="head">演员</span>
						<span class="msg">
              <span :key="index" v-for="(item, index) in doubanCelebrityList.actor.slice(0,8)">
                <el-link :href="item.urlCelebrityDouban" target="_black">{{item.nameZh}}</el-link>
                {{index===9?'/......':index===doubanCelebrityList.actor.length?'':'/'}}
              </span>
            </span>
					</div>
					<div v-show="movieBases.douban.typeList.length!==0">
						<span class="head">类型</span>
						<span class="msg">
              <span :key="index" v-for="(item, index) in movieBases.douban.typeList">
                <el-link :href="'/tag/#/?tags='+item" target="_black">{{item}}</el-link>
                {{index+1===movieBases.douban.typeList.length?'':'/'}}
              </span>
            </span>
					</div>
					<div v-show="movieBases.douban.tagList.length!==0">
						<span class="head">标签</span>
						<span class="msg">
              <span :key="index" v-for="(item, index) in movieBases.douban.tagList">
                <el-link :href="'/tag/#/?tags='+item" target="_black">{{item}}</el-link>
                {{index+1===movieBases.douban.tagList.length?'':'/'}}
              </span>
            </span>
					</div>
					<div v-show="movieBases.douban.aliasList.length!==0">
						<span class="head">别名</span>
						<span class="msg">
              <span :key="index" v-for="(item, index) in movieBases.douban.aliasList.slice(0,5)">
                {{item}}
                {{index+1===movieBases.douban.aliasList.length?'':'/'}}
              </span>
            </span>
					</div>
					<div v-show="movieBases.douban.base.summary!==''">
						<span class="head">简介</span>
						<span class="msg">
              <span>
                {{movieBases.douban.base.summary.substr(0,47)}}
                <el-tooltip
									:content="movieBases.douban.base.summary"
									class="item"
									effect="light"
									placement="top"
									popper-class="summary-tips"
									v-if="movieBases.douban.base.summary.length>=47"
								>
                  <span>{{'......(more)'}}</span>
                </el-tooltip>
              </span>
            </span>
					</div>
				</div>
			</div>
		</div>
		<div :class="imdbClass" id="imdb" v-show="!isDoubanView">
			<div class="title">
				<span
					class="name-zh">{{movieBases.imdb.base.nameEn.slice(0,25)}}{{(movieBases.imdb.base.nameEn.length>15)?"...":""}}</span>
				<span
					class="year"
					v-show="movieBases.imdb.base.startYear!==0"
				>{{"("+movieBases.imdb.base.startYear+")"}}</span>
				<el-button
					@click="changeBaseView"
					class="change-base"
					type="text"
					v-show="isChangeBaseView"
				>点击切换
				</el-button>
			</div>
			<div class="base">
				<!--			暂时 删除jpg	-->
				<img :src="movieBases.imdb.base.urlPoster+'.jpg'" fit="cover"
						 v-show="movieBases.imdb.base.urlPoster && movieBases.imdb.base.urlPoster!=''"/>
				<div class="base-msgbox">
					<div v-show="imdbCelebrityList.director.length!==0">
						<span class="head imdb-header">Directors</span>
						<span class="msg imdb-msg">
              <span :key="index" v-for="(item, index) in imdbCelebrityList.director">
                <el-link :href="item.urlCelebrityImdb" target="_black">{{item.nameEn}}</el-link>
                {{index+1===imdbCelebrityList.director.length?'':'/'}}
              </span>
            </span>
					</div>
					<div v-show="imdbCelebrityList.actor.length!==0">
						<span class="head imdb-header">Stardom</span>
						<span class="msg imdb-msg">
              <span :key="index" v-for="(item, index) in imdbCelebrityList.actor.slice(0,6)">
                <el-link :href="item.urlCelebrityImdb" target="_black">{{item.nameEn}}</el-link>
                {{index===9?'/......':index===imdbCelebrityList.actor.length?'':'/'}}
              </span>
            </span>
					</div>
					<div v-show="imdbCelebrityList.other.length!==0">
						<span class="head imdb-header">Others</span>
						<span class="msg imdb-msg">
              <span :key="index" v-for="(item, index) in imdbCelebrityList.other.slice(0,6)">
                <el-link :href="item.urlCelebrityImdb" target="_black">{{item.nameEn}}</el-link>
                {{index===9?'/......':index===imdbCelebrityList.other.length?'':'/'}}
              </span>
            </span>
					</div>
					<div v-show="movieBases.imdb.base.summary!==''">
						<span class="head imdb-header">summary</span>
						<span class="msg imdb-msg">
					              <span>
					                {{movieBases.imdb.base.summary.substr(0,200)}}
					                <el-tooltip
														:content="movieBases.imdb.base.summary"
														class="item"
														effect="light"
														placement="top"
														popper-class="summary-tips"
														v-if="movieBases.imdb.base.summary.length>=48"
													>
					                  <span>{{'......(more)'}}</span>
					                </el-tooltip>
					              </span>
					            </span>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>

	import 'animate.css'

	export default {
		name: 'movieBaseComponent',
		props: ['movieBases'],
		data() {
			return {
				// 默认显示豆瓣板块
				isDoubanView: true,
				// 豆瓣影人分类列表
				doubanCelebrityList: {
					director: [],
					writer: [],
					actor: []
				},
				// 豆瓣影人分类列表
				imdbCelebrityList: {
					director: [],
					actor: [],
					other: []
				},
				isChangeBaseView: false,
				doubanClass: '',
				imdbClass: ''
			}
		},
		mounted() {
			if (this.movieBases) {
				this.parseDoubanCelebrityList(this.movieBases.douban.celebrityList)
				this.parseImdbCelebrityList(this.movieBases.imdb.celebrityList)
			}
		},
		watch: {
			movieBases() {
				if (this.movieBases) {
					this.parseDoubanCelebrityList(this.movieBases.douban.celebrityList)
					this.parseImdbCelebrityList(this.movieBases.imdb.celebrityList)
				}
			}
		},
		methods: {
			// 解析豆瓣电影影人列表
			parseDoubanCelebrityList(celebrityList) {
				if (this.movieBases.douban.base.startYear === 0
					&& this.movieBases.douban.base.summary === ''
					&& this.movieBases.douban.base.urlPoster === '') {
					this.isDoubanView = false
				}
				if (celebrityList.length !== 0) {
					celebrityList.forEach(celebrity => {
						celebrity.relationList.forEach(relation => {
							switch (relation.idProfession) {
								case 4:
									this.doubanCelebrityList.actor.push(celebrity)
									break
								case 3:
									this.doubanCelebrityList.writer.push(celebrity)
									break
								case 2:
									this.doubanCelebrityList.director.push(celebrity)
									break
								default:
									break
							}
						})
					})
				}
			},
			// 解析IMDB影人列表
			parseImdbCelebrityList(celebrityList) {
				if (celebrityList.length !== 0) {
					celebrityList.forEach(celebrity => {
						celebrity.relationList.forEach(relation => {
							switch (relation.idProfession) {
								case 2:
									this.imdbCelebrityList.director.push(celebrity)
									break
								case 6:
								case 5:
									this.imdbCelebrityList.actor.push(celebrity)
									break
								default:
									this.imdbCelebrityList.other.push(celebrity)
									break
							}
						})
					})
				}
			},
			// 更换base
			changeBaseView() {
				if (this.isDoubanView) {
					this.doubanClass = 'animate__animated animate__zoomOut'
					setTimeout(() => {
						this.doubanClass = ''
						this.isDoubanView = false
						this.imdbClass = 'animate__animated animate__zoomIn'
						setTimeout(() => {
							this.imdbClass = ''
						}, 1000)
					}, 450)
				} else {
					this.imdbClass = 'animate__animated animate__zoomOut'
					setTimeout(() => {
						this.imdbClass = ''
						this.isDoubanView = true
						this.doubanClass = 'animate__animated animate__zoomIn'
						setTimeout(() => {
							this.doubanClass = ''
						}, 1000)
					}, 450)
				}
			}
		},
	}
</script>
<style>
	#movie-base-component {
		width: 100%;
		height: 300px;
	}


	/* movie-base-component切换 */
	#movie-base-component #douban,
	#imdb {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
	}

	/* movie-base-component*/
	.title {
		flex: 0 0 50px;
		display: flex;
		flex-direction: row;
		align-items: flex-end;
		flex-wrap: wrap;
		padding-bottom: 6.67px;
	}

	.base {
		flex: 0 0 240px;
		display: flex;
		flex-direction: row;
		max-width: 700px;
	}

	/* title */
	.title .name-zh {
		font-size: 36px;
		font-weight: 600;
		padding-right: 10px;
	}

	.title .name-origin {
		font-size: 36px;
		font-weight: 500;
		color: #2b2727;
		padding-right: 10px;
	}

	.title .year {
		font-size: 32px;
		font-weight: 500;
		color: #2b2727;
		align-self: center;
	}

	/* base 左 右 */
	.base img {
		height: 240px;
		flex: 0 0 165px;
		border-radius: 10px;
		max-width: 170px;
	}

	.base-msgbox {
		flex: 0 0 auto;
		display: flex;
		flex-direction: column;
		padding-left: 10px;
		max-width: 500px;
	}

	/* msgbox 上下 */
	.base-msgbox div {
		flex: 0 0 auto;
		display: flex;
		flex-direction: row;
	}

	/* msgbox-div 左右 */
	.base-msgbox div .head {
		flex: 0 0 auto;
		padding-right: 5px;
		align-items: flex-end;
		font-size: 18px;
		font-weight: 700;
		color: #000;
	}

	.base-msgbox div .head.imdb-header {
		width: 90px;
	}

	.base-msgbox div .msg {
		flex: 0 0 auto;
		display: flex;
		max-width: 480px;
		flex-direction: row;
		flex-wrap: wrap;
		align-items: flex-end;
		color: #2b2727;
	}

	.base-msgbox div .msg.imdb-msg {
		max-width: 440px;
	}

	/* msg 左右可换行 */
	.base-msgbox div .msg span,
	el-tooltip {
		font-size: 14px;
		font-weight: 600;
	}

	/* 其他样式----------- */
	.summary-tips {
		background: rgba(255, 255, 255, 0.7) !important;
		font-size: 14px;
		font-weight: 500;
		max-width: 460px;
	}

	.title .change-base {
		font-weight: bold;
		font-size: 16px;
		color: #fff;
		align-self: flex-start;
		margin-left: auto;
	}

	.base-msgbox .el-link {
		color: #2b2727;
	}

	.el-link.is-underline:hover:after {
		border-bottom: 0 solid #409EFF;
	}

	.el-link.el-link--default:hover {
		color: #f31919;
	}

</style>
