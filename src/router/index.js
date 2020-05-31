import Vue from 'vue'
import VueRouter from 'vue-router'
// view
import HomeMovie from '../views/Home'
import Subject from '../views/Subject'
import People from '../views/People'
import Celebrity from '../views/Celebrity'
import Scene from '../views/mocation/Scene'
import About from '../views/About'
import Place from '../views/mocation/Place'
import Song from '../views/music/Song'
import Playlist from '../views/music/Playlist'
import Album from '../views/music/Album'
import Tag from "../views/Tag";
import HomeMocation from "../views/mocation/Home";
import HomeMusic from "../views/music/Home";
import Message from "../views/Message"

Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		component: HomeMovie
	},
	{
		path: '/about',
		component: About
	},
	{
		path: '/message',
		component: Message
	},
	{
		path: '/search',
		component: About
	},
	{
		path: '/subject/:movieId',
		component: Subject
	},
	{
		path: '/subject/:movieId/**',
		component: Subject
	},
	{
		path: '/celebrity/:celebrityId',
		component: Celebrity
	},
	{
		path: '/scene/:movieId',
		component: Scene
	},
	{
		path: '/people/:userId',
		component: People,
		meta: {
			requireAuth: true
		}
	},
	{
		path: '/tag',
		component: Tag
	},
	// scene
	{
		path: '/mocation',
		component: HomeMocation
	},
	{
		path: '/scene/:sceneId',
		component: Scene
	},
	{
		path: '/place/:placeId',
		component: Place
	},
	// music
	{
		path: '/music',
		component: HomeMusic
	},
	{
		path: '/song/:songId',
		component: Song
	},
	{
		path: '/playlist/:playlistId',
		component: Playlist
	},
	{
		path: '/album/:albumId',
		component: Album
	},
]

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes,
	scrollBehavior(to, from, savedPosition) {
		return {
			x: 0,
			y: 0
		}
	}
})


export default router