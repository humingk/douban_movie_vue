<template>
	<div id="message-view">
		<div class="message-add">
			<el-input :autosize="{ minRows: 4, maxRows: 4}"
								:maxlength="500"
								autofocus="autofocus"
								class="add-content"
								placeholder=" 聊天吹水提建议，欢迎加入豆瓣电影Plus交流群 476584154 口令 doubans"
								type="textarea"
								v-model="content"/>
			<div class="add-form">
				<el-input
					:maxlength="50"
					@keyup.enter.native="addMessage('',nickname,content)"
					class="add-author"
					placeholder="尊姓大名"
					v-model="nickname"/>
				<el-button @click="addMessage('',nickname,content)" class="add-submit hvr-grow" type="primary">留言
				</el-button>
			</div>
		</div>
		<el-radio-group v-model="sort">
			<el-radio label="create_time">按时间排序</el-radio>
			<el-radio label="agree">按热度排序</el-radio>
		</el-radio-group>
		<!--		:element-loading-background="loadingBg"-->
		<!--		:element-loading-text="randomMovieLineShort()"-->
		<!--		v-loading="messageList.length===0"-->
		<div class="message-list">
			<el-timeline class="message-timeline" v-show="messageList.length!==0">
				<el-timeline-item :color="colorList[index%colorList.length]"
													:key="message.id"
													:timestamp="message.createTime+' from '+message.ip"
													placement="top"
													size="large"
													v-for="(message,index) in messageList">
					<el-card>
						<div class="message-card">
							<div class="message-main">
								<div class="message-content">
									{{message.content}}
								</div>
								<div class="message-author hvr-grow">
									<el-link :href="douban+(message.idUser===''?'':'/people/')+message.idUser" target="_blank">
										——— {{message.nickname}}
									</el-link>
								</div>
							</div>
							<div :style="isAgreed(message.id)" @click="messageAgree(message.id)" class="message-agree hvr-grow">
								👍 {{message.agree}}
							</div>
						</div>
					</el-card>
				</el-timeline-item>
			</el-timeline>
		</div>
	</div>
</template>
<script>
	import domain from "../request/domain";
	import {mapActions, mapState} from 'vuex'

	export default {
		name: 'message-view',
		components: {},
		data() {
			return {
				// 总数
				amount: 0,
				// 当前页列表
				messageList: [],
				// 排序依据
				sort: 'create_time',
				// 已赞同id列表
				agreeList: ['top'],
				// 是否可以加载更多
				loadmore: true,
				// 留言
				content: '',
				nickname: '',
				// 默认参数
				order: 'create_time',
				offset: 0,
				limit: 10,
				douban: domain.douban,
				loadingBg: "rgba(0, 0, 0, 0)",
				nickList: [
					'断水流',
					'武状元',
					'唐三藏',
					'包龙星',
					'何金银',
					'唐伯虎',
					'9527',
					'鲁迅',
					'何志武',
					'至尊宝',
					'凌凌漆',
					'牛夫人',
					'酱爆',
				],
				colorList: [
					'chartreuse',
					'aqua',
					'red',
					'darkturquoise',
					'fuchsia',
					'greenyellow',
					'lightseagreen',
					'cyan',
					'gold',
					'saddlebrown',
					'orange',
					'springgreen',
					'tomato',
				]
			}
		},
		computed: {
			...mapState({
				movieLinesShort: 'movieLinesShort',
				isBottom: 'isBottom'
			})
		},
		watch: {
			sort() {
				if (this.sort !== this.order) {
					this.order = this.sort
					this.offset = 0
					this.loadmore = true
					this.getMessageList(this.order, this.offset, this.limit)
					document.body.scrollTop = 0
					document.documentElement.scrollTop = 0
					this.messageList = []
				}
			},
			'isBottom': function () {
				// 允许加载+够加载+初次加载/再次加载
				if (this.loadmore && this.offset <= this.amount && (this.offset === 0 || this.isBottom)) {
					this.getMessageList(this.order, this.offset, this.limit)
				}
			}
		},
		mounted() {
			this.update({key: 'isBgClear', value: false})
			this.nickname = this.nickList[Math.floor(Math.random() * this.nickList.length)]
			this.getMessageList(this.order, this.offset, this.limit)
		},
		filters: {
			date(datetime) {
				let list = datetime.split(' ')
				return list.length === 2 ? list[0] : ''
			}
		},
		methods: {
			// 获取留言列表
			getMessageList(order, offset, limit) {
				this.loadmore = false
				this.$api.message.messageList({order: order, offset: offset, limit: limit}).then(res => {
					this.amount = res.amount
					this.offset = offset + limit
					this.messageList.push.apply(this.messageList, res.messageList)
					this.update({key: 'isBgClear', value: false})
					this.loadmore = true
				}).catch(error => {
				})
			},
			// 赞同
			messageAgree(id) {
				// 未赞同
				if (this.agreeList.indexOf(id) === -1) {
					this.agreeList.push(id)
					for (let i = 0; i < this.messageList.length; i++) {
						if (this.messageList[i].id === id) {
							this.messageList[i].agree += 1
							break
						}
					}
					this.$api.message.messageAgree({id: id}).then(res => {

					}).catch(error => {
						for (let i = 0; i < this.messageList.length; i++) {
							if (this.messageList[i].id === id) {
								this.messageList[i].agree -= 1
								break
							}
						}
						this.agreeFail()
					})
				} else {
					this.agreeFail()
				}
			},
			agreeFail() {
				this.$notify.warning({
					title: '你点了个寂寞',
					position: 'bottom-right',
					duration: 2000,
					showClose: false
				});
			},
			// 留言
			addMessage(idUser, nickname, content) {
				if (this.nickname !== '' && this.content !== '') {
					this.$api.message.messageAdd({idUser: idUser, nickname: nickname, content: content}).then(res => {
						this.messageList.splice(0, 0, res)
						this.nickname = ''
						this.content = ''
						this.amount += 1
					}).catch(error => {

					})
				} else {
					this.$notify.warning({
						title: this.content === '' ? '你留了个寂寞' : (this.nickname === '' ? '敢问大侠尊姓大名？' : ''),
						position: 'bottom-right',
						duration: 2000,
						showClose: false
					});
				}
			},
			// 是否已点赞
			isAgreed(id) {
				if (this.agreeList.indexOf(id) === -1) {
					return ''
				}
				return 'color:red;'
			},
			// 随机电影台词
			randomMovieLineShort() {
				return this.movieLinesShort[Math.floor(Math.random() * this.movieLinesShort.length)]
			},
			...mapActions(['update'])
		},
	}
</script>
<style>
	#message-view {
		width: 100%;
		display: flex;
		flex-direction: column;
	}

	#message-view .message-add {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 20px 10px;
		max-height: 200px;
	}

	#message-view .message-add .add-content {
		padding-bottom: 10px;
	}

	#message-view .message-add textarea::placeholder {
		color: dimgray;
	}

	#message-view .message-add .add-form {
		display: flex;
		flex-direction: row;
		justify-content: space-around;
	}

	#message-view .message-add .add-form .add-author {
		flex: 1;
	}

	#message-view .message-add .add-form textarea::placeholder {
		color: dimgray;
	}

	#message-view .message-add .add-form .add-submit {
		height: 36px;
		margin-left: 10px;
	}

	#message-view .message-list {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding-top: 15px;
		padding-bottom: 10px;
	}

	#message-view .message-list .message-timeline {
		/*height: 500px;*/
	}

	.message-card {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: row;
	}

	.message-card .message-main {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding-right: 20px;
	}

	.message-card .message-agree {
		flex: 0 0 80px;
		display: flex;
		justify-content: center;
		align-items: center;
		font-weight: 500;
		cursor: pointer;
	}

	.message-card .message-main .message-content {
		flex: 1;
		display: flex;
		padding-bottom: 5px;
		white-space: pre-wrap;
		word-wrap: break-word;
		word-break: normal;
		max-width: 814px;
	}

	.message-card .message-main .message-author {
		flex: 20px;
		display: flex;
		align-self: flex-end;
	}

	/*其他*/

	#message-view .el-timeline {
		margin: 0;
		font-size: 16px;
		font-weight: 600;
		list-style: none;
	}

	#message-view .el-timeline-item__timestamp {
		color: #000000;
		line-height: 1;
		font-size: 14px;
	}

	#message-view .el-card {
		border-radius: 15px;
		border: 1px solid rgba(255, 255, 255, 0.2);
		background: rgba(255, 255, 255, 0.8);
		color: #000000;
		-webkit-transition: .3s;
		transition: .3s;
	}

	#message-view .el-radio {
		color: #000000;
		cursor: pointer;
	}

	#message-view .el-radio__label {
		font-size: 14px;
		font-weight: 600;
		border-radius: 6px;
		padding-left: 0;
		margin-left: 10px;
	}

	#message-view .el-radio-group {
		font-size: 0;
		padding-left: 10px;
		padding-right: 10px;
	}

	#message-view .el-radio__inner::after {
		width: 0;
		height: 0;
	}

	/* Grow */
	#message-view .hvr-grow {
		vertical-align: middle;
		-webkit-transform: perspective(1px) translateZ(0);
		transform: perspective(1px) translateZ(0);
		box-shadow: 0 0 1px rgba(0, 0, 0, 0);
		-webkit-transition-duration: 0.3s;
		transition-duration: 0.3s;
		-webkit-transition-property: transform;
		transition-property: transform;
	}

	#message-view .hvr-grow:hover, .hvr-grow:focus, .hvr-grow:active {
		-webkit-transform: scale(1.1);
		transform: scale(1.1);
		z-index: 3;
		color: red;
	}

	#message-view .el-link.el-link--default {
		font-weight: 600;
		color: #000000;

	}

	#message-view .el-link.el-link--default:hover {
		color: red;
	}

	#message-view .el-textarea__inner {
		font-weight: 700;
		color: #000000;
		font-size: 16px;
		background: rgba(255, 255, 255, 0.8);
		border-radius: 10px;
	}

	#message-view .el-input__inner {
		background: rgba(255, 255, 255, 0.8);
		border-radius: 10px;
		font-weight: 700;
		color: #000000;
		font-size: 16px;
	}

	#message-view .el-button {
		display: flex;
		font-size: 18px;
		font-weight: 700;
		color: #000000;
		line-height: 0.7;
		border-radius: 10px;
	}

	#message-view .el-button :hover {
		color: red;
	}

	#message-view .message-list ul {
		padding-inline-start: 10px;
		padding-inline-end: 10px;
	}
</style>
