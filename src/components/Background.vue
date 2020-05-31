<template>
	<div id="background-component">
		<div class="pull animated bounceInDown">
			<img
				:class="pullStyle"
				:src="'/image/background/pull_'+pullOnOff+'.png'"
				@click="changeBg"
				@mouseenter="changeBg"
			/>
		</div>
		<div id="bg-color"/>
		<div :class="opacityColorBg" id="bg-img-color"/>
		<transition name="fade">
			<div id="bg" v-show="nowBgList.length!==0 && !isChangingBg">
				<img :class="BlurBg" :src="nowBgList[nowBgId]"/>
			</div>
		</transition>
	</div>
</template>
<script>
	import 'animate.css'
	import {mapActions, mapState} from 'vuex'

	export default {
		name: 'background-component',
		data() {
			return {
				// 当前背景图id
				nowBgId: 0,
				// 背景切换时间间隔 /s 第一次以后减去2s
				turnBgSecond: 20,
				// 是否正在切换背景
				isChangingBg: false,
				// 切换背景计时器
				turnBgTimer: null,
				// 切换毛样式
				pullStyle: 'pullOff',
				// 切换锚状态
				pullOnOff: 'off',
				// 毛玻璃样式
				BlurBg: 'blur',
				// 背景遮罩透明样式
				opacityColorBg: 'bg-img-color-opacity',
				// 是否正在滚动等待
				isScrolling: false,
			}
		},
		computed: {
			// 当前页面背景列表
			nowBgList() {
				// 优先采用特定页面背景列表
				if (this.specialBgList && this.specialBgList.length !== 0) {
					return this.specialBgList
				} else {
					return this.defaultBgList
				}
			},
			...mapState({
				// 背景图是否需要模糊
				isBgClear: 'isBgClear',
				specialBgList: 'specialBgList',
				defaultBgList: 'defaultBgList',
				// 是否正在底部
				isBottom: 'isBottom'
			})
		},
		watch: {
			'isBgClear': function () {
				// 需要临时变清晰
				if (this.isBgClear) {
					this.turnClear()
				}
				// 需要变模糊
				else {
					this.turnBlur()
				}
			}
		},
		mounted() {
			window.addEventListener('scroll', this.throttling(this.scroll, 300, 1000));
			this.turnBgTimer = setInterval(this.turnBg, 1000 * this.turnBgSecond)
			// 默认清晰,加载后需手动模糊
			this.turnClear()
		},
		methods: {
			// 轮流切换背景
			turnBg() {
				if (this.nowBgList.length !== 0 && this.nowBgList.length !== 1) {
					this.isChangingBg = true
					setTimeout(() => {
						// nowId++
						this.nowBgId + 1 >= this.nowBgList.length
							? (this.nowBgId = 0)
							: this.nowBgId++
						this.isChangingBg = false
						// 切换锚已打开
						if (this.pullOnOff === 'on') {
							// 切换锚归位
							this.pullStyle = 'pullOn'
						}
						this.update({key: 'currentMovieLinesLong', value: Math.round(Math.random() * 50)})
					}, 2000)
				}
			},
			// 手动切换背景
			changeBg() {
				if (!this.isChangingBg) {
					// 切换锚未打开
					if (this.pullOnOff === 'off') {
						// 取消自动轮换 (暂不取消)
						// clearInterval(this.turnBgTimer)
						// 切换锚下滑
						this.pullStyle = 'pullOff animate__animated animate__slideOutDown'
						// 下滑后切换打开
						setTimeout(() => {
							this.pullStyle = 'pullOn animate__animated animate__swing'
							this.pullOnOff = 'on'
						}, 350)
					} else {
						// 切换锚已打开
						this.pullStyle = 'pullOn animate__animated animate__swing'
					}
					this.turnBg()
				}
			},
			// 节流
			throttling(fn, wait, maxTimelong) {
				let timeout = null,
					startTime = Date.parse(new Date);
				return function () {
					if (timeout !== null) clearTimeout(timeout);
					let curTime = Date.parse(new Date);
					if (curTime - startTime >= maxTimelong) {
						fn();
						startTime = curTime;
					} else {
						timeout = setTimeout(fn, wait);
					}
				}
			},
			// 监听滚动
			scroll() {
				// 滚动条距离顶部的距离
				let scrollTop =
					document.documentElement.scrollTop || document.body.scrollTop
				// 可视区的高度
				let windowHeight =
					document.documentElement.clientHeight || document.body.clientHeight
				// 滚动条的总高度
				let scrollHeight =
					document.documentElement.scrollHeight || document.body.scrollHeight
				// 接近底部
				if (scrollTop + windowHeight > scrollHeight - 300) {
					// 之前不在底部
					if (!this.isBottom) {
						this.update({key: 'isBottom', value: true})
						this.turnClear()
					}
				} else {
					// 之前在底部
					if (this.isBottom) {
						this.update({key: 'isBottom', value: false})
						this.turnBlur()
					}
				}
			},
			// 背景清晰
			turnClear() {
				// 切换透明
				this.BlurBg = 'animated fadeOut'
				// 切换背景遮罩透明
				this.opacityColorBg =
					'bg-img-color-opacity-buttom animated fadeIn'
				setTimeout(() => {
					this.BlurBg = ''
				}, 100)
				setTimeout(() => {
					this.opacityColorBg = 'bg-img-color-opacity-buttom'
				}, 50)
			},
			// 背景模糊
			turnBlur() {
				// 切换毛玻璃
				this.BlurBg = 'blur animated fadeOut'
				// 切换背景遮罩不透明
				this.opacityColorBg = 'bg-img-color-opacity animated fadeIn'
				setTimeout(() => {
					this.BlurBg = 'blur'
				}, 200)
				setTimeout(() => {
					this.opacityColorBg = 'bg-img-color-opacity'
				}, 50)
			},
			...mapActions(['update'])
		},

	}
</script>
<style>
	/* 背景图 */
	#bg {
		position: absolute;
		z-index: -2;
	}

	#bg img {
		animation-duration: 3s;
		position: fixed;
		width: 100%;
		opacity: 1;
		object-fit: cover;
		height: -webkit-fill-available;
	}

	.blur {
		-moz-filter: blur(10px);
		-webkit-filter: blur(10px);
		-o-filter: blur(10px);
		-ms-filter: blur(10px);
		filter: blur(10px);
	}

	/* 淡入淡出 */

	.fade-enter,
	.fade-leave-to {
		opacity: 0;
	}

	.fade-enter-active,
	.fade-leave-active {
		transition: opacity 2.5s;
	}

	/* 最底层颜色 */
	#bg-color {
		position: fixed;
		width: 100%;
		height: 100%;
		opacity: 0.8;
		z-index: -3;
		object-fit: cover;
		background-color: black;
	}

	/* 图片上面的遮罩 */
	#bg-img-color {
		position: fixed;
		width: 100%;
		height: 100%;
		z-index: -1;
		object-fit: cover;
		background-color: white;
	}

	/* 遮罩不透明 */
	.bg-img-color-opacity {
		opacity: 0.3;
	}

	/* 遮罩透明 */
	.bg-img-color-opacity-buttom {
		opacity: 0;
	}

	.pull {
		position: fixed;
		z-index: 10;
	}

	/* 切换锚收起样式 */
	.pullOff {
		position: fixed;
		top: -185px;
		left: 28px;
		width: 60px;
		height: 300px;
	}

	/* 切换锚放下样式 */
	.pullOn {
		position: fixed;
		top: -40px;
		left: 30px;
		width: 60px;
		height: 300px;
	}
</style>
