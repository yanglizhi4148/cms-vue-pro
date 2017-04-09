<template>
    <div class='tmpl'>

            <go-back-header :title='title'></go-back-header>


            <ul class="mui-table-view">
                <li class="mui-table-view-cell mui-media" v-for='item in newsList' :key='item.id'>
                    <router-link :to='{name:"news.detail",params:{id:item.id} }'>
                        <img class="mui-media-object mui-pull-left" :src="item.img_url">
                        <div class="mui-media-body">
                            <span>{{item.title}}</span>
                            <div class="news-desc">
                                <p>点击数:{{item.click}}</p>
                                <p>发表时间:{{item.add_time|convertTime}}</p>
                            </div>
                        </div>
                    </router-link>
                </li>
            </ul>
        </div>

</template>
<script type="text/ecmascript-6">
    export default {
        data(){
            return {
                newsList:[],
                title:'新闻列表'
            }
        },created(){
            this.$http.get(this.config.apiPath+'/api/getnewslist')
                .then(res=>{
                    this.newsList=res.body.message;
                },res=>{
                    console.log('出错了');
                })
        }
    }
</script>
<style>
    .mui-media-body p{
        color:#0bb0f5;
    }
    .news-desc p:nth-child(1){
        float: left;
    }
    .news-desc p:nth-child(2){
        float: right;
    }
</style>
