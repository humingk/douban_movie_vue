<template>
	<div :element-loading-background="loadingBg"
			 :element-loading-text="randomMovieLineLong"
			 id="subject-view"
			 v-loading.fullscreen.lock="isLoading">
		<div style="min-height: 500px" v-if="isLoading"/>
		<div v-if="isMovieNone">
			<movie-none-component/>
		</div>
		<div class="detail" v-if="isMovieGot">
			<div class="left" v-if="movieBases">
				<movie-base-component :movieBases="movieBases"/>
			</div>
			<div class="right" v-if="rateList.length!==0">
				<movie-rate-component
					:award-list="awardList"
					:rate-list="rateList"/>
			</div>
		</div>
		<div class="celebrity-list"
				 v-if="celebrityList.length!==0">
			<movie-celebrity-component
				:celebrity-list="celebrityList"/>
		</div>
		<div class="douban-disscuss"
				 v-if="commentList.length!==0 || reviewList.length!==0">
			<movie-disscuss-component
				:comment-list="commentList"
				:review-list="reviewList"/>
		</div>
		<div
			class="zhihu-base"
			v-if="zhihuBases && zhihuBases.questionList && zhihuBases.questionList.length!==0">
			<movie-zhihu-component :zhihu-bases="zhihuBases"
														 class="animated zoomIn"
			/>
		</div>
    <vue-lazy-component>
      <div :element-loading-background="loadingBg"
           :element-loading-text="randomMovieLineShort()"
           :style="isBorder(subjectState.isResourceGot)+minHeightOfResource"
           class="resource-list"
           v-loading="!subjectState.isResourceDone">
        <movie-resource-component :movie-id="parseInt(movieId)"
                                  :name-zh="nameZh"
                                  class="animated zoomIn"/>
      </div>
    </vue-lazy-component>
		<vue-lazy-component>
			<div :element-loading-background="loadingBg"
					 :element-loading-text="randomMovieLineShort()"
					 :style="isBorder(subjectState.isSceneGot)+minHeightOfScene"
					 class="scene-base"
					 v-loading="!subjectState.isSceneDone">
				<movie-scene-component :movie-id="parseInt(movieId)"
															 class="animated zoomIn"/>
			</div>
		</vue-lazy-component>
		<vue-lazy-component>
			<div :style="isBorder(subjectState.isNmGot)"
					 class="netease-music">
				<movie-music-component :keyword="nameZh"
															 class="animated zoomIn"/>
			</div>
		</vue-lazy-component>
	</div>
</template>
<script>
	import movieBaseComponent from '../components/movie/Base'
	import movieRateComponent from '../components/movie/Rate'
	import movieCelebrityComponent from '../components/movie/Celebrity'
	import movieMusicComponent from '../components/movie/Music'
	import movieResourceComponent from '../components/movie/Resource'
	import movieZhihuComponent from '../components/movie/Zhihu'
	import movieDisscussComponent from '../components/movie/Disscuss'
	import movieSceneComponent from '../components/movie/Scene'
	import movieNoneComponent from '../components/movie/None'
	import domain from '../request/domain'
	import {mapActions, mapState} from 'vuex'
	import {component as vueLazyComponent} from '@xunlei/vue-lazy-component'

	export default {
		name: 'subject-view',
		components: {
			movieBaseComponent,
			movieRateComponent,
			movieCelebrityComponent,
			movieResourceComponent,
			movieMusicComponent,
			movieZhihuComponent,
			vueLazyComponent,
			movieDisscussComponent,
			movieSceneComponent,
			movieNoneComponent
		},
		data() {
			return {
				// 电影ID
				movieId: null,
				// 电影详情
				movieDetails: null,
				// 知乎基础信息
				zhihuBases: null,
				// 已加载评分列表
				rateListNow: [],
				// 加载动画背景
				loadingBg: "rgba(0, 0, 0, 0)",
			}
		},
		created() {
		},
		mounted() {
			this.init()
		},
		computed: {
			// 主页面加载动画是否加载
			isLoading() {
				if (this.subjectState.isDetailsDone && this.subjectState.isZhihuDone) {
					// 模糊背景
					this.update({key: 'isBgClear', value: false})
					return false
				}
				return true
			},
			// true->获取电影为空
			isMovieNone() {
				return (this.subjectState.isDetailsDone && this.subjectState.isZhihuDone && this.movieDetails === null)
			},
			// true->成功获取电影
			isMovieGot() {
				return (this.subjectState.isDetailsDone && this.subjectState.isZhihuDone && this.movieDetails !== null)
			},
			// 资源组件最小高度
			minHeightOfResource() {
				return (this.subjectState.isResourceDone) ? "" : "min-height:300px"
			},
			// 场景组件最小高度
			minHeightOfScene() {
				return (this.subjectState.isSceneDone) ? "" : "min-height:300px"
			},
			// 电影基础信息
			movieBases: function () {
				if (this.movieDetails) {
					return {
						douban: {
							base: this.movieDetails.douban.base,
							aliasList: this.movieDetails.douban.aliasList,
							typeList: this.movieDetails.douban.typeList,
							tagList: this.movieDetails.douban.tagList,
							celebrityList: this.movieDetails.douban.celebrityList
						},
						imdb: this.movieDetails.imdb
					}
				}
				return null
			},
			// 评论列表
			commentList: function () {
				return (this.movieDetails && this.movieDetails.douban && this.movieDetails.douban.commentList.length !== 0) ? this.movieDetails.douban.commentList : []
			},
			// 评论列表
			reviewList: function () {
				return (this.movieDetails && this.movieDetails.douban && this.movieDetails.douban.reviewList.length !== 0) ? this.movieDetails.douban.reviewList : []
			},
			// 电影获奖列表
			awardList: function () {
				return (this.movieDetails && this.movieDetails.douban && this.movieDetails.douban.awardList.length !== 0) ? this.movieDetails.douban.awardList : []
			},
			// 豆瓣影人列表
			celebrityList: function () {
				return (this.movieDetails && this.movieDetails.douban && this.movieDetails.douban.celebrityList.length !== 0) ? this.movieDetails.douban.celebrityList : []
			},
			// 评分列表
			rateList: function () {
				// 豆瓣+IMDB+知乎渲染就绪
				if (this.isMovieGot) {
					this.rateListNow = []
					if (this.zhihuBases && this.zhihuBases.topic) {
						this.parseRate(this.zhihuBases.topic, 'zhihus')
					}
					if (this.movieDetails.douban && this.movieDetails.douban.rate) {
						this.parseRate(this.movieDetails.douban.rate, 'douban')
					}
					if (this.movieDetails.imdb && this.movieDetails.imdb.rate) {
						this.parseRate(this.movieDetails.imdb.rate, 'imdbs')
					}
					return this.rateListNow
				}
				return []
			},
			...mapState({
					movieLinesShort: 'movieLinesShort',
					nameZh: 'nameZh',
					subjectState: 'subject',
					randomMovieLineLong: state => {
						return state.movieLinesLong[Math.floor(Math.random() * state.movieLinesLong.length)]
					}
				}
			)
		},
		methods: {
			// 数据初始化
			init() {
				this.movieId = this.$route.params.movieId
				if (this.movieId) {
					// 获取电影详细数据
					this.$api.movie.movieDetails({id: this.movieId}).then(res => {
						this.movieDetails = res
						// 标签页名
						if (this.movieDetails.douban.base) {
							let nameZh = this.movieDetails.douban.base.nameZh
							this.update({key: 'nameZh', value: nameZh})
							document.title = nameZh + ' (plus)'
						}
						// 背景图片
						if (this.movieDetails.douban.imageList.length !== 0) {
							let specialBgList = []
							this.movieDetails.douban.imageList.forEach(image => {
								specialBgList.push(image.urlImageL)
							})
							this.update({key: 'specialBgList', value: specialBgList})
						}
						this.updateSubject({key: 'isDetailsDone', value: true})
					}).catch(error => {
						this.updateSubject({key: 'isDetailsDone', value: true})
					})
					// 获取知乎详细数据
					this.$api.movie.zhihuBases({id: this.movieId}).then(res => {
						this.zhihuBases = res
						this.updateSubject({key: 'isZhihuDone', value: true})
					}).catch(error => {
						this.updateSubject({key: 'isZhihuDone', value: true})
					})
				}
			},
			// 解析评分
			parseRate(rate, type) {
				if (rate) {
					switch (type) {
						case 'douban':
							if (rate.score !== 0) {
								this.rateListNow.push({
									type: '豆瓣',
									score: rate.score,
									vote: rate.vote,
									color: 'rgb(' + rate.rateColor + ')',
									url:
										domain.doubanMovie +
										'/subject/' +
										this.movieId +
										'/collections',
									des: `国内目前最大的影迷聚集地`
								})
							}
							break
						case 'imdbs':
							if (rate.imdbScore !== 0) {
								this.rateListNow.push({
									type: 'IMDB',
									score: rate.imdbScore,
									vote: rate.imdbVote,
									color: 'rgb(' + rate.imdbColor + ')',
									url: domain.imdb + '/title/' + this.movieDetails.imdb.base.id + '/',
									des: `更全面的互联网电影数据库`
								})
							}
							if (rate.tomatoScore !== 0) {
								this.rateListNow.push({
									type: '烂番茄',
									score: rate.tomatoScore,
									vote: 0,
									color: 'rgb(' + rate.tomatoColor + ')',
									url:
										domain.tomato +
										'/m/' +
										this.movieDetails.imdb.base.nameEn.replace(/\s/, '_'),
									des: `新鲜度来自认证影评人评价`
								})
							}
							if (rate.mtcScore !== 0) {
								this.rateListNow.push({
									type: 'MTC',
									score: rate.mtcScore,
									vote: 0,
									color: 'rgb(' + rate.mtcColor + ')',
									url:
										domain.tomato +
										'/movie/' +
										this.movieDetails.imdb.base.nameEn.replace(/\s/, '-'),
									des: `主要收集专业影评人的评价`
								})
							}
							break
						case 'zhihus':
							// 解析评分
							if (rate.zhihuScore !== 0) {
								this.rateListNow.push({
									type: '知乎',
									score: rate.zhihuScore,
									vote: rate.zhihuVote,
									color: 'rgb(' + rate.zhihuColor + ')',
									url: domain.zhihu + '/topic/' + rate.id,
									des: `知乎电影话题的知友推荐度`
								})
							}
							if (rate.maoyanScore !== 0) {
								this.rateListNow.push({
									type: '猫眼',
									score: rate.maoyanScore,
									vote: 0,
									color: 'rgb(' + rate.maoyanColor + ')',
									url: domain.maoyan + '/query?kw=' + rate.nameZh,
									des: `普通观众买票观影后的评价`
								})
							}
							break
						default:
							break
					}
				}
			},
			// 下边界线style
			isBorder(isOk) {
				return isOk ? 'border-bottom: 2px solid rgba(255, 255, 255, 0.2);' : ''
			},
			// 随机电影台词
			randomMovieLineShort() {
				return this.movieLinesShort[Math.floor(Math.random() * this.movieLinesShort.length)]
			},
			...mapActions(['update', 'updateSubject'])
		},
		filters: {}
	}
</script>
<style>
	#subject-view {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		min-height: 500px;
	}

	/* subject */
	#subject-view .detail {
		flex: 0 0 300px;
		display: flex;
		flex-direction: row;
		padding-bottom: 10px;
		min-height: 300px;
		border-bottom: 2px solid rgba(255, 255, 255, 0.2);
	}

	#subject-view .celebrity-list {
		flex: 0 0 150px;
		min-height: 150px;
		display: flex;
		flex-direction: row;
		padding-top: 10px;
		padding-bottom: 12px;
		border-bottom: 2px solid rgba(255, 255, 255, 0.2);
	}

	#subject-view .douban-disscuss {
		flex: 0 0 auto;
		display: flex;
		flex-direction: row;
		padding-top: 10px;
		padding-bottom: 10px;
		border-bottom: 2px solid rgba(255, 255, 255, 0.2);
	}

	#subject-view .zhihu-base {
		flex: 0 0 auto;
		display: flex;
		flex-direction: row;
		padding-top: 10px;
		padding-bottom: 10px;
		border-bottom: 2px solid rgba(255, 255, 255, 0.2);
	}

	#subject-view .resource-list {
		flex: 0 0 auto;
		display: flex;
		flex-direction: column;
		padding-top: 10px;
		padding-bottom: 5px;
		border-bottom: 2px solid rgba(255, 255, 255, 0.2);
	}

	#subject-view .scene-base {
		flex: 0 0 auto;
		display: flex;
		flex-direction: row;
		padding-top: 10px;
		padding-bottom: 10px;
	}

	#subject-view .netease-music {
		flex: 0 0 auto;
		display: flex;
		flex-direction: row;
	}

	/* detail */
	#subject-view .detail .left {
		flex: 1 0 712px;
		padding-right: 10px;
	}

	#subject-view .detail .right {
		flex: 0 0 300px;
		padding-left: 10px;
		border-left: 2px solid rgba(255, 255, 255, 0.2);
	}

	/*其他*/
	.el-loading-mask.is-fullscreen .el-loading-spinner .circular {
		height: 100px;
		width: 100px;
	}

	.el-loading-spinner .path {
		stroke-width: 3;
		stroke: #054ebd;
	}

	.is-fullscreen .el-loading-spinner .el-loading-text {
		color: #054ebd;
		margin: 10px auto;
		font-size: 18px;
		font-weight: 500;
		width: max-content;
		background-color: rgba(255, 255, 255, 0.6);
		border-radius: 8px;
		padding: 5px 10px;
	}
</style>
