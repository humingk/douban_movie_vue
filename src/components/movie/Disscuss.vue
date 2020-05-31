<template>
	<div id="movie-disscuss-component">
		<div @click="nextReviewSwiper()"
				 @mouseenter="stopReviewSwiper()"
				 @mouseleave="startReviewSwiper()"
				 class="review-list"
				 v-if="reviewList.length!==0">
			<swiper
				:options="reviewSwiperOption"
				class="swiper"
				ref="reviewSwiper"
				v-if="reviewList.length!==0">
				<swiper-slide :key="index"
											v-for="(item, index) in reviewList">
					<el-link :href="item.urlReview" target="_blank">
						<span class="title">{{item.title}}</span>
					</el-link>
					<span class="content">{{item.content}}</span>
					<span class="disscuss-footer">
						<span class="like">
						<span class="vote">
							<span class="symbol">👍</span>
							{{item.agreeVote}}
						</span>
						<span class="vote">
							<span class="symbol">🖓</span>
							{{item.againstVote}}
						</span>
						</span>
						<span class="user">
							<span class="name">
								<span class="symbol">
									———
								</span>
								<span>
								<el-link :href="item.urlUserDouban" target="_blank">
									{{item.nameUserDouban}}
								</el-link>
									</span>
							</span>
						</span>
					</span>
				</swiper-slide>
			</swiper>
		</div>
		<div class="border" v-if="reviewList.length!==0 && commentList.length!==0"/>
		<div @click="nextCommentSwiper()"
				 @mouseenter="stopCommentSwiper()"
				 @mouseleave="startCommentSwiper()"
				 class="comment-list"
				 v-if="commentList.length!==0">
			<Swiper
				:options="commentSwiperOption"
				class="swiper"
				ref="commentSwiper">
				<SwiperSlide :key="index" v-for="(item, index) in commentList">
					<span class="content">{{item.content}}</span>
					<span class="disscuss-footer">
						<span class="like">
						<span class="vote">
							<span class="symbol">👍</span>
							{{item.agreeVote}}
						</span>
						</span>
						<span class="user">
							<span class="name">
								<span class="symbol">
									———
								</span>
								<span>
								<el-link :href="item.urlUserDouban" target="_blank">
									{{item.nameUserDouban}}
								</el-link>
									</span>
							</span>
						</span>
					</span>
				</SwiperSlide>
			</Swiper>
		</div>
	</div>
</template>
<script>
	import 'swiper/css/swiper.css'
	import {Swiper, SwiperSlide} from 'vue-awesome-swiper'

	export default {
		name: 'movieDisscussComponent',
		components: {
			Swiper,
			SwiperSlide
		},
		props: {
			commentList: Array,
			reviewList: Array
		},
		data() {
			return {
				// 影评swiper
				reviewSwiperOption: {
					direction: 'vertical',
					speed: 500,
					freeModeSticky: true,
					// 在loop模式下使用slidesPerview:'auto'，还需使用该参数设置所要用到的loop个数(一般设置大于可视slide个数2个即可)
					loopedSlides: 2,
					// loop模式下会在slides前后复制若干个slide,，前后复制的个数不会大于原总个数
					loopAdditionalSlides: 1,
					// 鼠标样式
					grabCursor: true,
					// 滚动持续时间
					freeModeMomentumRatio: 1,
					// 循环
					loop: true,
					// 自动切换
					autoplay: {
						delay: 8000,
						// 用户操作swiper之后，是否禁止autoplay。默认为true：停止
						disableOnInteraction: true
					},
					// 切换效果
					effect: 'flip',
					// 动态检查,自动更新
					observer: true,
				},
				// 评论swiper
				commentSwiperOption: {
					speed: 500,
					freeModeSticky: true,
					loopedSlides: 2,
					loopAdditionalSlides: 1,
					grabCursor: true,
					freeModeMomentumRatio: 1,
					loop: true,
					autoplay: {
						delay: 6000,
						disableOnInteraction: true
					},
					effect: 'cube',
					observer: true,
				},
			}
		},
		computed: {},
		watch: {},
		mounted() {
		},
		methods: {
			nextReviewSwiper() {
				if (this.$refs.reviewSwiper.$swiper) {
					this.$refs.reviewSwiper.$swiper.slideNext()
				}
			},
			startReviewSwiper() {
				if (this.$refs.reviewSwiper.$swiper) {
					this.$refs.reviewSwiper.$swiper.autoplay.start()
				}
			},
			stopReviewSwiper() {
				if (this.$refs.reviewSwiper.$swiper) {
					this.$refs.reviewSwiper.$swiper.autoplay.stop()
				}
			},
			nextCommentSwiper() {
				if (this.$refs.commentSwiper.$swiper) {
					this.$refs.commentSwiper.$swiper.slideNext()
				}
			},
			startCommentSwiper() {
				if (this.$refs.commentSwiper.$swiper) {
					this.$refs.commentSwiper.$swiper.autoplay.start()
				}
			},
			stopCommentSwiper() {
				if (this.$refs.commentSwiper.$swiper) {
					this.$refs.commentSwiper.$swiper.autoplay.stop()
				}
			},
		},
	}
</script>
<style>
	#movie-disscuss-component {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}

	#movie-disscuss-component .review-list {
		flex: 1;
		min-height: 240px;
		padding-right: 10px;
		display: flex;
	}

	#movie-disscuss-component .border {
		flex: 0 0 0;
		height: 100%;
		padding-right: 10px;
		border-left: 2px solid rgba(255, 255, 255, 0.2);
	}

	#movie-disscuss-component .comment-list {
		flex: 0 0 290px;
		width: 290px;
		height: 240px;
		display: flex;
	}

	.review-list .swiper {
		flex: 0 0 710px;
		height: 240px;
		background-color: rgba(255, 255, 255, 0);
	}

	.review-list .swiper .swiper-slide {
		width: 710px;
		height: 240px;
		overflow: auto;
		background-color: rgba(255, 255, 255, 0.4);
		border-radius: 10px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		overflow: -moz-scrollbars-none;
		-ms-overflow-style: none;
	}

	.review-list .swiper .swiper-slide .title {
		flex: 0 0 30px;
		font-size: 20px;
		font-weight: 600;
	}

	#movie-disscuss-component .swiper .swiper-slide .el-link.el-link--default {
		color: #000;
	}

	#movie-disscuss-component .swiper .swiper-slide .el-link.el-link--default:hover {
		color: #f31919;
	}

	.review-list .swiper .swiper-slide .content {
		font-size: 16px;
		font-weight: 500;
		padding: 10px 20px 20px 20px;
	}

	.disscuss-footer {
		flex: 0 0 20px;
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}

	.disscuss-footer .like {
		padding-left: 20px;
	}

	.disscuss-footer .like .vote {
		padding-right: 20px;
		align-self: flex-start;
		font-size: 14px;
		font-weight: 500;
	}

	.disscuss-footer .like .symbol {
		font-size: 24px;
		font-weight: 500;
	}


	.disscuss-footer .user {
		padding-right: 25px;
		font-size: 15px;
		font-weight: 500;
		align-self: flex-end;
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		padding-bottom: 3px;
	}

	.disscuss-footer .user .name {
		flex: 0 0 auto;
		padding-right: 5px;
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
	}

	.disscuss-footer .user .name .symbol {
		padding-right: 5px;
	}

	.swiper .swiper-slide::-webkit-scrollbar {
		display: none;
	}

	.comment-list .swiper {
		flex: 0 0 290px;
		height: 240px;
		max-width: 290px;
		background-color: rgba(255, 255, 255, 0);
	}


	.comment-list .swiper .swiper-slide {
		width: 240px;
		height: 240px;
		overflow: auto;
		background-color: rgba(255, 255, 255, 0.4);
		border-radius: 10px;
		display: flex;
		flex-direction: column;
		/*justify-content: center;*/
		align-items: center;
		overflow: -moz-scrollbars-none;
		-ms-overflow-style: none;
	}

	.comment-list .swiper .swiper-slide::-webkit-scrollbar {
		display: none;
	}

	.comment-list .swiper .swiper-slide .content {
		margin-top: auto;
		padding: 10px 15px 15px 15px;
		max-width: 275px;
		font-size: 16px;
		font-weight: 500;
		line-height: 1.46;
	}

	.comment-list .swiper .swiper-slide .disscuss-footer {
		margin-bottom: auto;
	}
</style>
