<template>
	<div
		@mouseenter="isChangeRateView=true"
		@mouseleave="isChangeRateView=false"
		id="movie-rate-component"
		v-show="rateList.length!==0">
		<el-button
			@click="changeRateView"
			class="change-rate"
			type="text"
			v-show="isChangeRateView && isRadarNow"
		>点击切换
		</el-button>
		<div :class="rateRadarClass" @click="changeRateView" id="rate-radar" v-show="isRadarNow"></div>
		<div
			:class="'rate-list '+rateListClass"
			:style="awardList.length===0?'padding-top:45px;':''"
			@click="changeRateView"
			v-show="!isRadarNow">
			<div v-html="this.rateDetail()"/>
			<div class="award-list"
					 v-show="awardList.length!==0">
				<tr :key="index" v-for="(item,index) in awardList.slice(0,4)">
					<td class="th">{{item.awardTh}}</td>
					<td>{{item.nameZh}}</td>
					<td>{{item.typeAward.split(" ").length===2?item.typeAward.split(" ")[1]:item.typeAward}}</td>
					<td>{{item.typeAward.split(" ").length===2?item.typeAward.split(" ")[0]:""}}</td>
				</tr>
			</div>
		</div>
	</div>
</template>
<script>
	import 'animate.css'
	// ECharts
	import echarts from 'echarts/lib/echarts'
	// ECharts 雷达图
	require('echarts/lib/chart/radar')
	// ECharts 提示框
	require('echarts/lib/component/tooltip')
	// ECharts 工具盒
	require('echarts/lib/component/toolbox')
	export default {
		name: 'movieRateComponent',
		props: {
			rateList: Array,
			awardList: Array
		},
		data() {
			return {
				// 切换按钮是否可见
				isChangeRateView: false,
				// 当前是否为雷达图
				isRadarNow: true,
				rateRadarClass: '',
				rateListClass: ''
			}
		},
		mounted() {
			this.getRateRadar()
			this.isRadarNow = this.rateList.length > 2
		},
		computed: {
			// 雷达图的指示器，用来指定雷达图中的多个变量（维度）
			indicatorList() {
				let indicatorList = []
				this.rateList.forEach(rate => {
					indicatorList.push({
						name: rate.type + ' ' + rate.score,
						max: 10,
						min: 0,
						color: rate.color
					})
				})
				return indicatorList
			},
			// 雷达图的多维度数据
			dataList() {
				let dataList = []
				this.rateList.forEach(rate => {
					dataList.push(rate.score)
				})
				return dataList
			}
		},
		methods: {
			// 评分雷达
			getRateRadar() {
				// 初始化echarts实例
				let myChart = echarts.init(document.getElementById('rate-radar'))
				let that = this
				// echarts配置
				let option = {
					title: {},
					tooltip: {},
					radar: {
						// 雷达形状
						shape: 'polygon',
						// 半径
						radius: '45%',
						// 位置
						center: ['50%', '50%'],
						// 雷达图圈数设置
						splitNumber: 5,
						startAngle: 0,
						// 维度选择器
						name: {
							show: true,
							color: '#000',
							fontStyle: 'normal',
							fontWeight: 700,
							fontSize: 15
						},
						// 坐标轴的维度标签是否响应和触发鼠标事件
						triggerEvent: true,
						// 轴线
						axisLine: {
							lineStyle: {
								// 轴线颜色
								color: '#fff',
								// 轴线宽度
								width: 1,
								// 轴线透明度
								opacity: 1
							}
						},
						// 坐标轴刻度
						axisTick: {},
						// 坐标轴刻度标签
						axisLabel: {},
						// 雷达图的指示器，用来指定雷达图中的多个变量（维度）
						indicator: this.indicatorList,
						splitArea: {
							show: false,
							areaStyle: {
								// 背景颜色
								color: 'rgba(255,0,0,0)'
							}
						},
						splitLine: {
							show: true,
							lineStyle: {
								width: 1.5,
								// 坐标轴网格颜色
								color: '#fff'
							}
						}
					},
					series: [
						// 一个系列
						{
							// 系列名称
							name: '评分雷达',
							// 系列类型 雷达图
							type: 'radar',
							// 拐点的样式
							symbol: 'circle',
							// 拐点大小
							symbolSize: 18,
							// 图形是否不响应和触发鼠标事件，默认为 false，即响应和触发鼠标事件
							silent: false,
							// 初始动画的缓动效果
							animationEasing: 'cubicOut',
							// 初始动画的延迟
							animationDelay: function (idx) {
								// 越往后的数据延迟越大
								return idx * 100 + 100
							},
							// 数据更新动画的时长
							animationDurationUpdate: function (idx) {
								// 越往后的数据延迟越大
								return idx * 100 + 100
							},
							// 当前系列的数据列表
							data: [
								{
									// 数据列表
									value: this.dataList,
									// 数据项名称
									name: '评分列表',
									// 单个数据标记的大小
									symbolSize: 4,
									// 标记相对于原本位置的偏移
									symbolOffset: [0, 0],
									// 图形上的文本标签，可用于说明图形的一些数据信息，比如值，名称等
									label: {
										show: false,
										// 距离图形元素的距离。当 position 为字符描述值（如 'top'、'insideRight'）时候有效
										distance: 0,
										// 标签颜色
										color: 'red',
										fontStyle: 'normal',
										fontWeight: 'bold',
										fontSize: 16
									},
									// 折线拐点标志的样式设置
									itemStyle: {
										color: '#0084ff'
									},
									// 线条样式
									lineStyle: {
										color: '#0084ff',
										width: 1
									},
									// 区域填充样式
									areaStyle: {
										color: '#0084ff'
									},
									// 鼠标悬停高亮
									emphasis: {
										areaStyle: {
											color: 'rgba(5,78,189,0.8)'
										},
										label: {}
									},
									// 鼠标悬停提示框
									tooltip: {
										// 允许点击
										enterable: true,
										// 同时鼠标移动和点击时触发=>'mousemove|click'
										triggerOn: 'mousemove',
										alwaysShowContent: false,
										// 鼠标移动延迟 /s
										transitionDuration: 0.4,
										// 隐藏延迟时间 /ms
										hideDelay: 2000,
										padding: 3,
										textStyle: {
											color: 'black',
											fontWeight: 'bold',
											fontSize: 16
										},
										backgroundColor: 'rgba(255,255,255,0.7)',
										formatter: function () {
											return that.rateDetail()
										}
									}
								}
							]
						}
					]
				}
				// 点击响应事件
				myChart.on('click', function (params) {
					// 点击了选择器
					if (params.componentType === 'radar') {
						that.rateList.forEach(rate => {
							if (params.name === rate.type) {
								// 选择器跳转
								window.open(rate.url)
							}
						})
					} else if (params.componentType === 'series') {
						// 点击了雷达图
					}
				})
				myChart.setOption(option)
			},
			// 视图切换
			changeRateView() {
				if (this.isRadarNow) {
					this.rateRadarClass = 'animate__animated animate__zoomOut'
					setTimeout(() => {
						this.rateListClass = 'animate__animated animate__zoomIn'
						this.rateRadarClass = ''
						this.isRadarNow = false
					}, 450)
				} else {
					this.rateListClass = 'animate__animated animate__zoomOut'
					setTimeout(() => {
						this.rateRadarClass = 'animate__animated animate__zoomIn'
						this.isRadarNow = true
						this.rateListClass = ''
					}, 450)
				}
			},
			// 评分详细信息 html
			rateDetail() {
				let result = `
                    <table style="border-collapse: collapse" frame="void">
                    <tr style="font-size:18px;font-weight:1000">
                    <th style="text-align:center;padding:2px 5px">来源</th>
                    <th>推荐度</th>
                    <th style="text-align:center;padding:2px 5px">评分</th>
                    <th style="text-align:center;padding:2px 5px">评价数</th>
                    `
				if (this.isRadarNow) {
					result += `<th style="text-align:center">说明</th>`
				}
				result += `</tr>`
				this.rateList.forEach(rate => {
					const starStyle =
						'star-base star-' + rate.type + ' star-' + parseInt(rate.score) * 5
					result += `
        <tr>
        <td style="text-align:center;color:${rate.color};padding:2px 5px;font-weight: 600">${
						rate.type
					}</td>
        <td style="color:${
						rate.color
					};padding:2px 5px"><div style="text-align:center" class="${starStyle}"></div></td>
        <td style="color:${rate.color};padding:2px 8px">${rate.score}</td>
        <td style="text-align:right;color:${rate.color};padding:2px 5px">${
						rate.vote === 0
							? ''
							: rate.vote >= 1000
							? parseInt(rate.vote / 1000) + 'k'
							: rate.vote
					}</td>
        `
					if (this.isRadarNow) {
						result += `<td style="padding:2px 5px">${rate.des}</td>`
					}
					result += `</tr>`
				})
				return result + `</table>`
			}
		}
	}
</script>
<style>
	#movie-rate-component {
		width: 300px;
		height: 300px;
		border-radius: 10px;
	}

	#movie-rate-component .change-rate {
		float: right;
		font-weight: bold;
		font-size: 16px;
		color: #fff;
		position: relative;
		z-index: 3;
	}

	#movie-rate-component .award-list {
		border-top: 2px solid rgba(255, 255, 255, 0.2);
		padding-top: 5px;
		max-width: 290px;
		overflow: hidden;
		font-size: 12px;
		font-weight: 600;
	}

	#movie-rate-component .award-list tr {
		height: 22px;
	}

	#movie-rate-component .award-list td {
		padding-bottom: 3px;
		padding-right: 6px;
	}

	#movie-rate-component .award-list .th {
		color: rgba(243, 25, 25, 0.8);
		font-weight: 800;
	}

	#rate-radar {
		width: 300px;
		height: 300px;
	}

	.rate-list {
		width: 300px;
		height: 300px;
	}

	/* 星星种类 */
	.star-base {
		display: inline-block;
		*display: inline;
		zoom: 1;
		width: 75px;
		height: 15px;
		margin: 1px 0 0 0;
		overflow: hidden;
	}

	.star-豆瓣 {
		background: url(/image/stars/douban.png) no-repeat;
		background: -webkit-image-set(url(/image/stars/douban.png) 2x) no-repeat;
		background: -moz-image-set(url(/image/stars/douban.png) 2x) no-repeat;
		background: -o-image-set(url(/image/stars/douban.png) 2x) no-repeat;
		background: -ms-image-set(url(/image/stars/douban.png) 2x) no-repeat;
	}

	.star-IMDB {
		background: url(/image/stars/imdb.png) no-repeat;
		background: -webkit-image-set(url(/image/stars/imdb.png) 2x) no-repeat;
		background: -moz-image-set(url(/image/stars/imdb.png) 2x) no-repeat;
		background: -o-image-set(url(/image/stars/imdb.png) 2x) no-repeat;
		background: -ms-image-set(url(/image/stars/imdb.png) 2x) no-repeat;
	}

	.star-猫眼 {
		background: url(/image/stars/maoyan.png) no-repeat;
		background: -webkit-image-set(url(/image/stars/maoyan.png) 2x) no-repeat;
		background: -moz-image-set(url(/image/stars/maoyan.png) 2x) no-repeat;
		background: -o-image-set(url(/image/stars/maoyan.png) 2x) no-repeat;
		background: -ms-image-set(url(/image/stars/maoyan.png) 2x) no-repeat;
	}

	.star-MTC {
		background: url(/image/stars/mtc.png) no-repeat;
		background: -webkit-image-set(url(/image/stars/mtc.png) 2x) no-repeat;
		background: -moz-image-set(url(/image/stars/mtc.png) 2x) no-repeat;
		background: -o-image-set(url(/image/stars/mtc.png) 2x) no-repeat;
		background: -ms-image-set(url(/image/stars/mtc.png) 2x) no-repeat;
	}

	.star-烂番茄 {
		background: url(/image/stars/tomato.png) no-repeat;
		background: -webkit-image-set(url(/image/stars/tomato.png) 2x) no-repeat;
		background: -moz-image-set(url(/image/stars/tomato.png) 2x) no-repeat;
		background: -o-image-set(url(/image/stars/tomato.png) 2x) no-repeat;
		background: -ms-image-set(url(/image/stars/tomato.png) 2x) no-repeat;
	}

	.star-知乎 {
		background: url(/image/stars/zhihu.png) no-repeat;
		background: -webkit-image-set(url(/image/stars/zhihu.png) 2x) no-repeat;
		background: -moz-image-set(url(/image/stars/zhihu.png) 2x) no-repeat;
		background: -o-image-set(url(/image/stars/zhihu.png) 2x) no-repeat;
		background: -ms-image-set(url(/image/stars/zhihu.png) 2x) no-repeat;
	}

	/* 星星大小 */
	.star-5 {
		background-position: 0 -150px;
	}

	.star-10 {
		background-position: 0 -120px;
	}

	.star-15 {
		background-position: 0 -105px;
	}

	.star-20 {
		background-position: 0 -90px;
	}

	.star-25 {
		background-position: 0 -75px;
	}

	.star-30 {
		background-position: 0 -60px;
	}

	.star-35 {
		background-position: 0 -45px;
	}

	.star-40 {
		background-position: 0 -30px;
	}

	.star-45 {
		background-position: 0 -15px;
	}
</style>