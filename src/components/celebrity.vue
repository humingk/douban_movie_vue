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
                        <div id="headline" class="item" v-if="actorAllApi.avatars&&actorAllApi.avatars.medium">
                            <div class="pic">
                                <a class="nbg" :href="actorAllApi.avatars.medium"
                                   title="点击查看大图">
                                    <img :src="actorAllApi.avatars.medium"/>
                                </a>
                            </div>
                            <div class="info">
                                <ul class>
                                    <li v-if="actorAllApi.gender">
                                        <span class="set_font">性别：</span>
                                        <span>{{actorAllApi.gender}}</span>
                                    </li>
                                    <li v-if="actorAllApi.constellation">
                                        <span class="set_font">星座：</span>
                                        <span>{{actorAllApi.constellation}}</span>
                                    </li>
                                    <li v-if="actorAllApi.birthday">
                                        <span class="set_font">出身日期：</span>
                                        <span>{{actorAllApi.birthday}}</span>
                                    </li>
                                    <li v-if="actorAllApi.born_place.length">
                                        <span class="set_font">出生地：</span>
                                        <span>{{actorAllApi.born_place}}</span>
                                    </li>
                                    <li v-if="actorAllApi.professions.length">
                                        <span class="set_font">职业：</span>
                                        <span v-for="(item,index) in actorAllApi.professions">{{item}}{{index===actorAllApi.professions.length-1 ? "":"/"}}</span>
                                    </li>
                                    <li v-if="actorAllApi.aka_en.length">
                                        <span class="set_font">更多外文名：</span>
                                        <span v-for="(item,index) in actorAllApi.aka_en">{{item}}{{index===actorAllApi.aka_en.length-1 ? "":"/"}}</span>
                                    </li>
                                    <li>
                                        <span class="set_font">豆瓣影人:</span>
                                        <span><a target="_blank" :href="url_douban+'/celebrity/'+actorAllApi.id">{{actorAllApi.id}}</a></span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="intro" class="mod">
                    <div class="hd">
                        <h2 v-if="actorAllApi.id">
                            影人简介......
                        </h2>
                    </div>
                    <div class="bd">
            <span class="short" v-if="actorAllApi.summary">
              　　{{actorAllApi.summary}}
             </span>
                    </div>
                </div>
                <div id="photos" class="mod" v-if="actorAllApi.photos && actorAllApi.photos.length!=0">
                    <div class="hd">
                        <h2 v-if="actorAllApi.id">
                            影人图片......(
                            <span>
                <a target="_blank" :href="url_douban+'/celebrity/'+actorAllApi.id+'/photos/'">
                  查看更多
                </a>
              </span>
                            )
                        </h2>
                    </div>
                    <ul class="pic-col5" v-for="(photo,index) in actorAllApi.photos" v-if="index<5">
                        <li>
                            <a v-if="photo.cover" :href="photo.alt">
                                <img :src="photo.cover"/>
                            </a>
                        </li>
                    </ul>
                </div>
                <div id="best_movies" class="mod">
                    <div class="hd">
                        <h2 v-if="actorAllApi.id">
                            最受好评的作品......
                        </h2>
                        <div class="bd">
                            <ul class="list-s" v-if="actorAllApi.works">
                                <li class v-for="item in actorAllApi.works">
                                    <a target="_blank" :href="'/subject/'+item.subject.id">
                                        <div class="pic">
                                            <img :src="item.subject.images.large" rel="noreferrer">
                                        </div>
                                        <div class="info">
                                            <a target="_blank"
                                               :href="'/subject/'+item.subject.id">{{item.subject.title}}
                                            </a>
                                            {{item.subject.rating.average}}
                                        </div>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div id="recent_movies" class="mod">
                    <div class="hd">
                        <h2 v-if="actorAllApi.id">
                            最近的作品......
                        </h2>
                    </div>
                    <div class="bd">
                        <ul class="list-s">
                            <li class v-for="(item,index) in actorWorksApi.works" v-if="index<12">
                                <a target="_blank" :href="'/subject/'+item.subject.id">
                                    <div class="pic">
                                        <img :src="item.subject.images.large" rel="noreferrer">
                                    </div>
                                    <div class="info">
                                        <a target="_blank"
                                           :href="'/subject/'+item.subject.id">{{item.subject.title}}</a>
                                        {{item.subject.rating.average}}
                                    </div>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div id="cooperation_actors" class="mod">
                    <div class="hd">
                        <h2 v-if="cooperationActors.length!=0">
                            合作过的影人......
                        </h2>
                    </div>
                    <div class="bd">
                        <!--                        <el-tree :data="cooperationActors" :-->
                        <!--                                 node-key="id">-->
                        <!--                                  <span class="custom-tree-node" slot-scope="{ node, data }">-->
                        <!--                                          <span>{{ node.label }}</span>-->
                        <!--                                  </span>-->
                        <!---->
                        <!--                        </el-tree>-->

                    </div>
                </div>
            </div>
        </div>
    </div>
       
</template>
<script>
    import axios from 'axios';
    import {
        apikey_api_douban, url_api_douban, url_ssm_base, url_douban
    } from '../config.js';
    import YearTable from "element-ui/packages/date-picker/src/basic/year-table";

    export default {
        name: "celebrity",
        components: {YearTable},
        data() {
            return {
                url_douban: url_douban,
                actorAllApi: {},
                actorWorksApi: {},
                cooperationActors: [],
                workStart: 0,
                workCount: 18
            }
        },
        created() {
            this.getActorAllApi(this.$route.params.actorId);
            this.getActorWorksApi(this.$route.params.actorId, this.workStart, this.workCount);
            this.getCooperationActors(this.$route.params.actorId);
        },
        methods: {
            // 通过豆瓣API调取演员信息
            getActorAllApi: function (actorId) {
                this.$jsonp(url_api_douban + "/v2/movie/celebrity/" + actorId + "?apikey=" + apikey_api_douban).then(responseApi => {
                    if (responseApi.id) {
                        console.log("actor douban API :");
                        console.log(responseApi);
                        this.actorAllApi = responseApi;
                    } else {
                        console.log("get actor douban api fail....(server error)")
                    }
                }).catch(error => {
                    console.log("during get actor douban api fail...");
                    console.log(error);
                });
            },
            // 通过豆瓣API调取演员作品信息
            getActorWorksApi: function (actorId, start, count) {
                this.$jsonp(url_api_douban + "/v2/movie/celebrity/" + actorId + "/works?start=" + start + "&count=" + count + "&apikey=" + apikey_api_douban).then(responseApi => {
                    if (responseApi.total && responseApi.total.length != 0) {
                        console.log("actor works douban API :");
                        console.log(responseApi);
                        this.actorWorksApi = responseApi;
                    } else {
                        console.log("get actor works douban api fail....(server error)")
                    }
                }).catch(error => {
                    console.log("during get actor works douban api fail...");
                    console.log(error);
                });
            },
            // 通过后台服务器获取与演员合作过的电影
            getCooperationActors: function (actorId) {
                axios.get(url_ssm_base + "/celebrity/getCooperationActors?actorId=" + actorId + "&cooperationMin=3").then(response => {
                    if (response.data && response.data.code && response.data.message) {
                        if (response.data.code == 200 && response.data.message == "success") {
                            this.cooperationActors = response.data.data;
                            console.log("cooperation actors: ");
                            console.log(this.cooperationActors);
                        } else if (response.data.message == "fail") {
                            console.log("get cooperation actors fail...(server error)");
                        }
                    } else {
                        console.log("get cooperation actors fail...(connect error)");
                    }
                }).catch(error => {
                    console.log("get cooperation actors fail...");
                    console.log(error);
                });
            }
        }
    }
</script>
<style>
    @import "../../static/douban/css/celebrity.css";
</style>