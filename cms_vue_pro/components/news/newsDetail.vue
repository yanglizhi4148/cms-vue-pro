<template>
    <div class="tmpl">
        <go-back-header :title='title'></go-back-header>
        <div class="news-title">
            <p v-text="news.title"></p>
            <div>
                <span>{{news.click}}次点击</span>
                <span>分类:民生经济</span>
                <span>添加时间:{{news.add_time | convertTime}}</span>
            </div>
        </div>
        <div class="news-content" v-html="news.content"></div>
    </div>
</template>
<script type="text/ecmascript-6">
    export default {
        data(){
            return {
                news:{},
                title:''
            }
        },created(){
            //接收从商品详情过来的title
            this.title=this.$route.query.title||'新闻详情';
            //1.接收数据
            let id=this.$route.params.id;
            //2.发起请求，获取数据
            this.$http.get(this.config.apiPath+'/api/getnew/'+id)
                .then(res=>{
                    this.news=res.body.message[0];
                },res=>{
                    console.log('新闻详情出现异常');
                });
        }
    }
</script>
<style>
    .news-title p{
        color:#0a87f8;
        font-size:20px;
        font-weight:bold;
    }
    .news-title span{
        margin-right: 30px;
    }
    .news-title{
        margin-top: 5px;
        border-bottom:1px solid rgba(0,0,0,0.2);
    }
    /*主体文章左右距离*/
    .news-content{
        padding: 10px 5px;
    }
</style>
