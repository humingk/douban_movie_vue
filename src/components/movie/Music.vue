<template>
	<div id="movie-music-component">
		<div class="music-item border" v-if="players.songList.length!==0 ">
			<div :element-loading-background="loadingBg"
					 :element-loading-text="randomMovieLineShort()"
					 class="comment"
					 v-loading="isGettingSongComent">
				<swiper
					:options="commentSwiperOption"
					class="swiper"
					v-if="comments.hasOwnProperty(currentSongId)">
					<swiper-slide :key="item.commentId"
												class="comment-detail"
												v-for="item in comments[currentSongId]">
						<span class="content">{{item.content}}</span>
						<span class="comment-footer">
							<span class="like">
								<span class="symbol">👍</span>
								<span class="vote">{{item.likedCount}}</span>
							</span>
								<span class="author">
								<span>———</span>
								<el-link :href="neteaseMusic+'/#/user/home?id='+item.user.userId" target="_blank">
								<span>{{item.user.nickname}}</span>
								</el-link>
							</span>
						</span>
					</swiper-slide>
				</swiper>
			</div>
			<div class="player">
				<aPlayer :list="players.songList"
								 :music="players.songList[0]"
								 preload="none"
								 ref="song"/>
			</div>
		</div>
		<div class="music-item border" v-if="players.playlistSongList.length!==0 ">
			<div :element-loading-background="loadingBg"
					 :element-loading-text="randomMovieLineShort()"
					 class="comment"
					 v-loading="isGettingPlaylistSongComent">
				<swiper :options="commentSwiperOption"
								class="swiper"
								v-if="comments.hasOwnProperty(currentPlaylistSongId)">
					<swiper-slide :key="item.commentId"
												class="comment-detail"
												v-for="item in comments[currentPlaylistSongId]">
						<span class="content">{{item.content}}</span>
						<span class="comment-footer">
							<span class="like">
								<span class="symbol">👍</span>
								<span class="vote">{{item.likedCount}}</span>
							</span>
							<span class="author">
								<span>———</span>
								<el-link :href="neteaseMusic+'/#/user/home?id='+item.user.userId" target="_blank">
								<span>{{item.user.nickname}}</span>
								</el-link>
							</span>
						</span>
					</swiper-slide>
				</swiper>
			</div>
			<div class="player">
				<aPlayer :autoplay="true"
								 :list="players.playlistSongList"
								 :music="players.playlistSongList[0]"
								 preload="none"
								 ref="playlist"
								 repeat="repeat-all"/>
			</div>
		</div>
		<div class="music-item" v-if="players.albumSongList.length!==0 ">
			<div :element-loading-background="loadingBg"
					 :element-loading-text="randomMovieLineShort()"
					 class="comment"
					 v-loading="isGettingAlbumSongComent">
				<Swiper :options="commentSwiperOption"
								class="swiper"
								v-if="comments.hasOwnProperty(currentAlbumSongId)">
					<SwiperSlide :key="item.commentId"
											 class="comment-detail"
											 v-for="item in comments[currentAlbumSongId]">
						<span class="content">{{item.content}}</span>
						<span class="comment-footer">
							<span class="like">
								<span class="symbol">👍</span>
								<span class="vote">{{item.likedCount}}</span>
							</span>
								<span class="author">
								<span>———</span>
								<el-link :href="neteaseMusic+'/#/user/home?id='+item.user.userId" target="_blank">
								<span>{{item.user.nickname}}</span>
								</el-link>
							</span>
						</span>
					</SwiperSlide>
				</Swiper>
			</div>
			<div class="player">
				<aPlayer :autoplay="true"
								 :list="players.albumSongList"
								 :music="players.albumSongList[0]"
								 preload="none"
								 ref="album"
								 repeat="repeat-all"/>
			</div>
		</div>
	</div>
</template>
<script>
	import aPlayer from 'vue-aplayer'
	import 'swiper/css/swiper.css'
	import {Swiper, SwiperSlide} from 'vue-awesome-swiper'
	import domain from "../../request/domain";
	import {mapActions, mapState} from "vuex";


	aPlayer.disableVersionBadge = true
	export default {
		name: 'movieMusicComponent',
		components: {
			aPlayer,
			Swiper,
			SwiperSlide
		},
		props: {
			keyword: String
		},
		data() {
			return {
				neteaseMusic: domain.neteaseMusic,
				// 加载动画背景
				loadingBg: "rgba(0, 0, 0, 0)",
				// 是否正在获取评论
				isGettingSongComent: false,
				isGettingAlbumSongComent: false,
				isGettingPlaylistSongComent: false,
				// player获取情况
				isSongPlayerOk: false,
				isAlbumPlayerOk: false,
				isPlaylistPlayerOk: false,
				// 网易云音乐 限制数
				nmSongsLimit: 5,
				nmPlaylistLimit: 1,
				nmAlbumLimit: 1,
				nmPlaylistSongsLimit: 5,
				nmAlbumSongsLimit: 5,
				nmCommentLimit: 8,
				// 评论同步刷新时间
				commentFlushInterval: 500,
				// 当前播放歌曲ID
				currentSongId: 0,
				currentAlbumSongId: 0,
				currentPlaylistSongId: 0,
				// 播放列表
				players: {
					songList: [],
					albumSongList: [],
					playlistSongList: []
				},
				// 评论列表 id:{}
				comments: {},
				// swiper
				commentSwiperOption: {
					// 起始图片
					// initialSlide: 2,
					// 切换速度
					speed: 300,
					// 默认为true，Swiper会强制加载所有图片
					preloadImages: false,
					// 设置slider容器能够同时显示的slides数量
					slidesPerView: 'auto',
					// 设定为true时，active slide会居中，而不是默认状态下的居左。
					centeredSlides: true,
					// 在loop模式下使用slidesPerview:'auto'，还需使用该参数设置所要用到的loop个数(一般设置大于可视slide个数2个即可)
					loopedSlides: 2,
					// loop模式下会在slides前后复制若干个slide,，前后复制的个数不会大于原总个数
					loopAdditionalSlides: 1,
					// 在carousel mode下定义slides的数量多少为一组
					// slidesPerGroup: 1,
					// 间距 /px
					// spaceBetween: 10,
					// 鼠标样式
					grabCursor: true,
					// 自由滚动
					freeMode: false,
					// 设置为true则点击slide会过渡到这个slide
					slideToClickedSlide: true,
					// 滚动持续时间
					freeModeMomentumRatio: 1,
					// 滚动自动贴合边缘
					// freeModeSticky: true,
					// 循环
					loop: true,
					// 自动切换
					autoplay: {
						delay: 7000,
						// 用户操作swiper之后，是否禁止autoplay。默认为true：停止
						disableOnInteraction: true
					},
					// 切换效果
					effect: 'coverflow',
					// 动态检查,自动更新
					observer: true,
				}
			}
		},
		computed: {
			...mapState([
				'movieLinesShort'
			])
		},
		watch: {},
		mounted() {
			this.initNeteaseMusic(this.keyword)
		},
		methods: {
			// 初始化网易云音乐播放
			initNeteaseMusic(keyword) {
				if (keyword !== '') {
					this.initNeteaseSong(keyword)
					this.initNeteaseAlbum(keyword)
					this.initNeteasePlaylist(keyword)
				}
			},
			// 初始化歌曲
			initNeteaseSong(keyword) {
				// 获取相关歌曲搜索结果
				this.$api.music.neteaseMusicTips({
					keywords: keyword,
					offset: 0,
					limit: this.nmSongsLimit,
					type: 1
				}).then(res => {
					if (res.result.songCount !== 0 && res.result.songs.length !== 0) {
						res.result.songs.forEach(song => {
							this.players.songList.push(this.initPlayer(
								parseInt(song.id),
								song.name,
								song.artists.length !== 0 ? song.artists[0].name : 'unknown',
								song.artists.length !== 0 ? song.artists[0].img1v1Url : null
							))
						})
						//  定时刷新当前歌曲评论
						this.commentFlush('song')
					}
					this.isSongPlayerOk = true
					this.updateIsNmOkNow()
				}).catch(error => {
					this.isSongPlayerNone = true
					this.updateIsNmOkNow()
				})
			},
			// 初始化专辑
			initNeteaseAlbum(keyword) {
				// 获取相关专辑搜索结果
				this.$api.music.neteaseMusicTips({
					keywords: keyword,
					offset: 0,
					limit: this.nmAlbumLimit,
					type: 10
				}).then(searchRes => {
					if (searchRes.result.albumCount !== 0 && searchRes.result.albums.length !== 0) {
						searchRes.result.albums.forEach(album => {
							// 获取专辑详情
							this.$api.music.neteaseMusicAlbum({id: album.id}).then(detailRes => {
								if (detailRes.code === 200 && detailRes.album && detailRes.songs.length !== 0) {
									const songList = detailRes.songs
									for (let i = 0; i < this.nmAlbumSongsLimit && i < songList.length; i++) {
										this.players.albumSongList.push(this.initPlayer(
											parseInt(songList[i].id),
											songList[i].name,
											songList[i].ar.length !== 0 ? songList[i].ar[0].name : 'unknown',
											detailRes.album.picUrl
										))
									}
									//  定时刷新当前歌曲评论
									this.commentFlush('album')
								}
								this.isAlbumPlayerOk = true
								this.updateIsNmOkNow()
							}).catch(error => {
								this.isAlbumPlayerOk = true
								this.updateIsNmOkNow()
							})
						})
					}
				}).catch(error => {
					this.isAlbumPlayerOk = true
					this.updateIsNmOkNow()
				})
			},
			// 初始化歌单
			initNeteasePlaylist(keyword) {
				// 获取歌单搜索结果
				this.$api.music.neteaseMusicTips({
					keywords: keyword,
					offset: 0,
					limit: this.nmPlaylistLimit,
					type: 1000
				}).then(searchRes => {
					if (searchRes.result.playlistCount !== 0 && searchRes.result.playlists.length !== 0) {
						searchRes.result.playlists.forEach(playlist => {
							// 获取歌单详情
							this.$api.music.neteaseMusicPlaylistDetails({id: playlist.id}).then(detailRes => {
								if (detailRes.code === 200 && detailRes.playlist && detailRes.playlist.tracks.length !== 0) {
									const songList = detailRes.playlist.tracks
									for (let i = 0; i < this.nmPlaylistSongsLimit && i < songList.length; i++) {
										this.players.playlistSongList.push(this.initPlayer(
											parseInt(songList[i].id),
											songList[i].name,
											songList[i].ar.length !== 0 ? songList[i].ar[0].name : 'unknown',
											detailRes.playlist.coverImgUrl
										))
									}
									//  定时刷新当前歌曲评论
									this.commentFlush('playlist')
								}
								this.isPlaylistPlayerOk = true
								this.updateIsNmOkNow()
							}).catch(error => {
								this.isPlaylistPlayerOk = true
								this.updateIsNmOkNow()
							})
						})
					}
				}).catch(error => {
					this.isPlaylistPlayerOk = true
					this.updateIsNmOkNow()
				})
			},
			// 定时刷新当前歌曲评论
			commentFlush(ref) {
				setInterval(() => {
					if (this.$refs[ref]) {
						const currentMusic = this.$refs[ref].currentMusic
						if (currentMusic && currentMusic.src) {
							const currentMusicId = this.parseIdFromUrl(currentMusic.src)
							switch (ref) {
								case 'song':
									if (currentMusicId !== this.currentSongId) {
										this.initSongCommentList(currentMusicId, ref)
									}
									break
								case 'album':
									if (currentMusicId !== this.currentAlbumSongId) {
										this.initSongCommentList(currentMusicId, ref)
									}
									break
								case 'playlist':
									if (currentMusicId !== this.currentPlaylistSongId) {
										this.initSongCommentList(currentMusicId, ref)
									}
									break
								default:
									break
							}
						}
					}
				}, this.commentFlushInterval)
			},
			// 初始化歌曲评论
			initSongCommentList(id, fromType) {
				if (!this.isGettingComment(fromType)) {
					this.preGetComment(fromType)
					// 未获取此歌曲的评论
					if (!this.comments.hasOwnProperty(id)) {
						// 获取歌曲热评
						this.$api.music.neteaseMusicHotComment({
							id: id,
							type: 0,
							offset: 0,
							limit: this.nmCommentLimit
						}).then(hotCommentRes => {
							if (hotCommentRes.code === 200 && hotCommentRes.total !== 0 && hotCommentRes.hotComments.length !== 9) {
								this.$set(this.comments, id, hotCommentRes.hotComments)
								this.updateCommentDisplay(id, fromType)
								this.finishGetComment(fromType)
							} else {
								// 获取歌曲普通评论
								this.$api.music.neteaseMusicSongComment({
									id: id,
									offset: 0,
									limit: this.nmCommentLimit
								}).then(commentRes => {
									if (commentRes.code === 200 && commentRes.total !== 0 && commentRes.comments.length !== 0) {
										this.$set(this.comments, id, commentRes.comments)
										this.updateCommentDisplay(id, fromType)
										this.finishGetComment(fromType)
									}
								}).catch(error => {
									this.finishGetComment(fromType)
								})
							}
						})
					} else {
						// 已获取此歌曲评论,直接更新
						this.updateCommentDisplay(id, fromType)
						this.finishGetComment(fromType)
					}
				}
			},
			// 更新展示评论列表ID
			updateCommentDisplay(id, type) {
				switch (type) {
					case 'song':
						this.currentSongId = id
						break
					case 'album':
						this.currentAlbumSongId = id
						break
					case 'playlist':
						this.currentPlaylistSongId = id
						break
					default:
						break
				}
			},

			// 初始化player歌曲
			initPlayer(id, title, artist, pic) {
				return {
					src: domain.neteaseMusic + '/song/media/outer/url?id=' + id + '.mp3',
					title: title,
					artist: artist,
					pic: pic
				}
			},
			// 解析url中的id
			parseIdFromUrl(url) {
				let res = /id=([\d+]*)/.exec(url)
				if (res && res.length === 2) {
					return parseInt(res[1])
				}
				return 0
			},
			// 是否正在获取评论
			isGettingComment(type) {
				switch (type) {
					case 'song':
						return this.isGettingSongComent
					case 'album':
						return this.isGettingAlbumSongComent
					case 'playlist':
						return this.isGettingPlaylistSongComent
					default:
						return false
				}
			},
			// 准备获取评论
			preGetComment(type) {
				switch (type) {
					case 'song':
						this.currentSongId = 0
						this.isGettingSongComent = true
						break
					case 'album':
						this.currentAlbumSongId = 0
						this.isGettingAlbumSongComent = true
						break
					case 'playlist':
						this.currentPlaylistSongId = 0
						this.isGettingPlaylistSongComent = true
						break
					default:
						break
				}
			},
			// 结束获取评论
			finishGetComment(type) {
				switch (type) {
					case 'song':
						this.isGettingSongComent = false
						break
					case 'album':
						this.isGettingAlbumSongComent = false
						break
					case 'playlist':
						this.isGettingPlaylistSongComent = false
						break
					default:
						break
				}
			},
			// 更新isNmOk
			updateIsNmOkNow() {
				if (this.isSongPlayerOk && this.isAlbumPlayerOk && this.isPlaylistPlayerOk) {
					this.updateSubject({key: 'isNmDone', value: true})
				}
			},
			// 随机电影台词
			randomMovieLineShort() {
				return this.movieLinesShort[Math.floor(Math.random() * this.movieLinesShort.length)]
			},
			...mapActions(['updateSubject'])
		},
	}
</script>
<style>
	#movie-music-component {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
	}

	#movie-music-component .music-item {
		flex: 0 0 240px;
		width: 100%;
		display: flex;
		flex-direction: row;
		padding-top: 12px;
		padding-bottom: 10px;
	}

	#movie-music-component .music-item.border {
		border-bottom: 2px solid rgba(255, 255, 255, 0.2);
	}

	#movie-music-component .music-item .comment {
		flex: 1;
		height: 240px;
		padding-right: 10px;
		align-self: flex-start;
	}


	#movie-music-component .music-item .player {
		flex: 0 0 300px;
		max-width: 300px;
		align-self: flex-end;
		border-left: 2px solid rgba(255, 255, 255, 0.2);
	}

	/*comment*/
	.music-item .comment .swiper {
		width: 714px;
		height: 240px;
		background-color: rgba(255, 255, 255, 0);
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}

	.music-item .comment .swiper .swiper-slide {

	}

	.comment-detail {
		width: 260px;
		min-height: 240px;
		border-radius: 10px;
		background-color: rgba(255, 255, 255, 0.5);
		overflow: auto;
		overflow: -moz-scrollbars-none;
		-ms-overflow-style: none;
		display: flex;
		flex-direction: column;
		/* 当子容器大于父容器,且使用justify-content,顶部超出部分不可见 */
		/*justify-content: center;*/
		align-items: center;
	}

	.comment-detail::-webkit-scrollbar {
		display: none;
	}


	.comment-detail .content {
		/* 垂直居中效果 */
		margin-top: auto;
		padding: 10px 15px 0 15px;
		font-weight: 500;
		font-size: 16px;
		line-height: 1.45;
	}

	.comment-detail .comment-footer {
		width: 230px;
		margin-bottom: auto;
		padding: 20px 15px 0 15px;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}

	.comment-detail .comment-footer .like {
		display: flex;
		flex-direction: row;
		align-items: flex-end;
		flex-wrap: nowrap;
		padding-right: 20px;
	}

	.comment-detail .comment-footer .like .symbol {
		font-size: 24px;
		font-weight: 500;
	}

	.comment-detail .comment-footer .like .vote {
		font-size: 14px;
		font-weight: 500;
		padding-bottom: 5px;
	}

	.comment-detail .comment-footer .author {
		font-size: 14px;
		font-weight: 500;
		display: flex;
		flex-direction: row;
		align-items: flex-end;
		align-self: center;
	}

	.comment-detail .comment-footer .author span {
		padding-right: 5px;
	}

	/*	其他 */
	.player .aplayer {
		background-color: rgba(255, 255, 255, 0.5);
		border-radius: 10px;
		margin: 0 10px;
		height: 240px;
		width: 280px;
	}

	.player .aplayer-list ol li {
		border-top: 1px solid rgba(255, 255, 255, 0);
	}

	.player .aplayer.aplayer-withlist .aplayer-body .aplayer-info {
		border-bottom: 1px solid rgba(255, 255, 255, 0);
	}

	.player .aplayer .aplayer-body .aplayer-info .aplayer-music .aplayer-title {
		font-size: 16px;
		font-weight: 600;
	}

	.player .aplayer-list ol li {
		font-weight: 600;
		font-size: 13px;
	}

	.player .aplayer .aplayer-body .aplayer-info .aplayer-music .aplayer-author {
		font-size: 12px;
		font-weight: 600;
		color: #2c2c2c;
	}

	.player .aplayer-controller .aplayer-time {
		color: #000;
	}

	.player .aplayer-list ol li.aplayer-list-light, .aplayer-list ol li:hover {
		background: rgba(255, 255, 255, 0.6);
	}

	.el-loading-spinner .path {
		stroke: #054ebd;
	}

	.el-loading-spinner .el-loading-text {
		color: #054ebd;
		font-size: 18px;
		font-weight: 500;
	}

	.swiper .swiper-slide .el-link.el-link--default {
		color: #000;
	}

	.swiper .swiper-slide .el-link.el-link--default:hover {
		color: #f31919;
	}
</style>
