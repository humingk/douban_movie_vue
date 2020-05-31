<template>
	<div id="movie-celebrity-component" v-if="celebrityList.length!==0">
		<div class="celebrity-list-prev" slot="button-prev">
			<svg viewBox="0 0 27 44" xmlns="http://www.w3.org/2000/svg">
				<path d="M0 22L22 0l2.1 2.1L4.2 22l19.9 19.9L22 44 0 22z" fill="rgba(255, 255, 255, 0.5)"/>
			</svg>
		</div>
		<Swiper :options="swiperOption" class="swiper">
			<SwiperSlide :key="index" v-for="(item, index) in celebrityList">
				<a :href="item.urlCelebrityDouban" target="_blank">
					<div class="portrait">
						<img :src="item.urlPortrait" class="portrait-img" onerror="this.src='/image/celebrity/celebrity_1.png'"/>
					</div>
					<span class="name">{{item.nameZh}}</span>
				</a>
			</SwiperSlide>
		</swiper>
		<div class="celebrity-list-next" slot="button-next">
			<svg class="next" viewBox="0 0 27 44" xmlns="http://www.w3.org/2000/svg">
				<path d="M27 22L5 44l-2.1-2.1L22.8 22 2.9 2.1 5 0l22 22z" fill="rgba(255, 255, 255, 0.5)"/>
			</svg>
		</div>
	</div>
</template>
<script>
	import 'swiper/css/swiper.css';
	import {Swiper, SwiperSlide} from 'vue-awesome-swiper'

	export default {
		name: 'movieCelebrityComponent',
		components: {
			Swiper,
			SwiperSlide
		},
		data() {
			return {
				swiperOption: {
					// 起始图片
					initialSlide: -3,
					// 切换速度
					speed: 300,
					// 默认为true，Swiper会强制加载所有图片
					preloadImages: false,
					// 设置slider容器能够同时显示的slides数量
					slidesPerView: 8,
					// 在loop模式下使用slidesPerview:'auto'，还需使用该参数设置所要用到的loop个数(一般设置大于可视slide个数2个即可)
					loopedSlides: 10,
					// 在carousel mode下定义slides的数量多少为一组
					slidesPerGroup: 1,
					// 间距 /px
					spaceBetween: 10,
					// 鼠标样式
					grabCursor: true,
					// 自由滚动
					freeMode: true,
					// 滚动持续时间
					freeModeMomentumRatio: 1,
					// 滚动自动贴合边缘
					freeModeSticky: true,
					// 循环
					loop: true,
					// 自动切换
					autoplay: {
						delay: 5000,
						// 用户操作swiper之后，是否禁止autoplay。默认为true：停止
						disableOnInteraction: true
					},
					// 切换效果
					effects: {
						effect: 'slide'
					},
					// 前进后退按钮
					navigation: {
						nextEl: '.celebrity-list-next',
						prevEl: '.celebrity-list-prev'
					}
				}
			}
		},
		props: {
			celebrityList: Array
		},
		mounted() {
		},
		methods: {},
		computed: {},
		watch: {}
	}
</script>
<style>
	#movie-celebrity-component {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}

	/* celebrity 左右 */
	#movie-celebrity-component .celebrity-list-prev,
	.celebrity-list-next {
		flex: 0 0 27px;
		height: 44px;
		outline: none;
	}

	.celebrity-list-prev {
		margin-right: 10px;
	}

	.celebrity-list-next {
		margin-left: 10px;
	}

	#movie-celebrity-component .swiper {
		flex: 1;
		height: 130px;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		border-radius: 5% / 100%;
	}

	#movie-celebrity-component .swiper .portrait-img {
		/* 图片上下 居中 */
		margin-top: -20px;
	}

	/* slide */
	#movie-celebrity-component .swiper .swiper-slide {
		width: 100px;
		height: 130px;
		background-color: rgba(255, 255, 255, 0);
	}

	.swiper-slide a {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
	}

	.swiper-slide a:link {
		text-decoration: none;
	}

	/* slide 样式 */
	.swiper-slide a .portrait {
		flex: 0 0 100px;
		height: 100px;
		border-radius: 50%;
		overflow: hidden;
	}

	.swiper-slide a .name {
		flex: 1;
		font-size: 16px;
		font-weight: 500;
		color: #000;
	}

	/* portrait */
	.portrait img {
		width: 100%;
		object-fit: cover;
	}

	.summary-tips {
		background: rgba(255, 255, 255, 0.7) !important;
		font-size: 14px;
		font-weight: 500;
		max-width: 460px;
	}

	/*其他*/
</style>
