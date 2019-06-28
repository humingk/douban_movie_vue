<template>
  <div id="celebrityCom">
    <div id="wrapper">
      <div id="content">
        <h1>
          <span v-if="actorAllApi.name">{{actorAllApi.name}}</span>
          <span v-if="actorAllApi.name_en">{{actorAllApi.name_en}}</span>
        </h1>
        <div class="grid-16-8 clearfix">
          <div class="article">
            <div id="headline" class="item">
              <div class="pic" v-if="actorAllApi.avatars.medium">
                <a class="nbg" v-if="actorAllApi.avatars.medium" :href="actorAllApi.avatars.large" title="点击查看大图">
                  <img :src="actorAllApi.avatars.medium"/>
                </a>
              </div>
              <div class="info">
                <ul class>
                  <li>
                    <span class="set_font" v-if="actorAllApi.gender">性别：</span>
                    <span>{{actorAllApi.gender}}</span>
                  </li>
                  <li>
                    <span class="set_font" v-if="actorAllApi.constellation">星座：</span>
                    <span>{{actorAllApi.constellation}}</span>
                  </li>
                  <li>
                    <span class="set_font" v-if="actorAllApi.birthday">出身日期：</span>
                    <span>{{actorAllApi.birthday}}</span>
                  </li>
                  <li>
                    <span class="set_font" v-if="actorAllApi.born_place.length">出生地：</span>
                    <span>{{actorAllApi.born_place}}</span>
                  </li>
                  <li>
                    <span class="set_font" v-if="actorAllApi.professions.length">职业：</span>
                    <span v-for="(item,index) in actorAllApi.professions">{{item}}{{index===actorAllApi.professions.length-1 ? "":"/"}}</span>
                  </li>
                  <li>
                    <span class="set_font" v-if="actorAllApi.aka_en.length">更多外文名：</span>
                    <span v-for="(item,index) in actorAllApi.aka_en">{{item}}{{index===actorAllApi.aka_en.length-1 ? "":"/"}}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div id="intro" class="mod">
          <div class="hd">
            <h2>
              影人简介 · · · · · ·
            </h2>
          </div>
          <div class="bd">
            <span class="short" v-if="actorAllApi.summary">
              　　{{actorAllApi.summary}}
             </span>
          </div>
        </div>
        <div id="photos" class="mod">
          <div class="hd">
            <h2>
              影人图片· · · · · ·(
              <span>
                <a v-if="actorAllApi.photos.length" :href="'https://movie.douban.com/celebrity/'+actorAllApi.id+'/photos/'">
                  全部{{actorAllApi.photos.length}}张
                </a>
              </span>
              )
            </h2>
          </div>
          <ul class="pic-col5">
            <li>
              <a v-if="actorAllApi.photos[0].cover":href="actorAllApi.photos[0].alt">
                <img :src="actorAllApi.photos[0].cover"/>
              </a>
            </li>
            <li>
              <a v-if="actorAllApi.photos[1].cover":href="actorAllApi.photos[0].alt">
                <img :src="actorAllApi.photos[1].cover"/>
              </a>
            </li>
            <li>
              <a v-if="actorAllApi.photos[2].cover":href="actorAllApi.photos[0].alt">
                <img :src="actorAllApi.photos[2].cover"/>
              </a>
            </li>
            <li>
              <a v-if="actorAllApi.photos[3].cover":href="actorAllApi.photos[0].alt">
                <img :src="actorAllApi.photos[3].cover"/>
              </a>
            </li>
            <li>
              <a v-if="actorAllApi.photos[4].cover":href="actorAllApi.photos[0].alt">
                <img :src="actorAllApi.photos[4].cover"/>
              </a>
            </li>
          </ul>
        </div>
        <div id="best_movies" class="mod">
          <div class="hd">
            <h2>
              最受好评的作品· · · · · ·
            </h2>
            <div class="bd">
              <ul class="list-s">
                <li class v-for="iterm in actorAllApi.works">
                  <h3>{{iterm.subject.year}}</h3>
                  <div class="pic">
                    <a  v-if="iterm.subject.images" :href="iterm.subject.images.small">
                      <img :src="iterm.subject.images.large" rel="noreferrer">
                    </a>
                  </div>
                  <div class="info">
                    <a target="_blank"
                       :href="'/subject/'+iterm.subject.id">{{iterm.subject.title}}
                    </a>
                    {{iterm.subject.rating.average}}
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div id="recent_movies" class="mod">
          <div class="hd">
            <h2>
              最近的作品· · · · · ·
            </h2>
          </div>
          <div class="bd">
            <ul class="list-s">
              <li class v-for="(item,index) in actorWorksApi.works" v-if="index<6">
                <h3>{{item.subject.year}}</h3>
                <div class="pic">
                  <a  v-if="item.subject.images" :href="item.subject.images.small">
                    <img :src="item.subject.images.large" rel="noreferrer"></a>
                </div>
                <div class="info">
                  <a target="_blank" :href="'/subject/'+item.subject.id">{{item.subject.title}}</a>
                  {{item.subject.rating.average}}
                </div>
              </li>
            </ul>
            <ul class="list-s">
              <li class v-for="(item,index) in actorWorksApi.works" v-if="index>=6 && index<12">
                <h3>{{item.subject.year}}</h3>
                <div class="pic">
                  <a  v-if="item.subject.images" :href="item.subject.images.small">
                    <img :src="item.subject.images.large" rel="noreferrer"></a>
                </div>
                <div class="info">
                  <a target="_blank" :href="'/subject/'+item.subject.id">{{item.subject.title}}</a>
                  {{item.subject.rating.average}}
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>   
</template>
<script>
  import{
    apikey_api_douban,url_api_douban
  } from '../config.js'
  import YearTable from "element-ui/packages/date-picker/src/basic/year-table";

  export default {
    name: "celebrity",
    components: {YearTable},
    data() {
      return {
        actorAllApi:{},
        actorWorksApi:{},
        workStart:0,
        workCount:18
      }
    },
    created() {
      this.getActorAllApi(this.$route.params.actorId);
      this.getActorWorksApi(this.$route.params.actorId,this.workStart,this.workCount);
    },
    methods:{
      // 通过豆瓣API调取演员信息
      getActorAllApi: function (actorId) {
        this.$jsonp(url_api_douban + "/v2/movie/celebrity/" + actorId + "?apikey=" + apikey_api_douban).then(responseApi => {
          if (responseApi.id) {
            console.log("actor douban API :");
            console.log(responseApi);
            this.actorAllApi = responseApi;
          }else {
            console.log("get actor douban api fail....(server error)")
          }
        }).catch(error => {
          console.log("during get actor douban api fail...");
          console.log(error);
        });
      },
      // 通过豆瓣API调取演员作品信息
      getActorWorksApi: function (actorId,start,count) {
        this.$jsonp(url_api_douban + "/v2/movie/celebrity/" + actorId + "/works?start="+start+"&count="+count+"&apikey=" + apikey_api_douban).then(responseApi => {
          if (responseApi.total && responseApi.total.length!=0) {
            console.log("actor works douban API :");
            console.log(responseApi);
            this.actorWorksApi = responseApi;
          }else {
            console.log("get actor works douban api fail....(server error)")
          }
        }).catch(error => {
          console.log("during get actor works douban api fail...");
          console.log(error);
        });
      }
    }
  }
</script>
<style>
  @import "../../static/douban/css/celebrityCom.css";
</style>