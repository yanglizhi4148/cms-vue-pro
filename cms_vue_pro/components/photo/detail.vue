<template>
    <div class='tmpl'>
        <go-back-header title='图文详情'></go-back-header>
        <div class="photo-title">
            <p>{{info.title}}</p>
            <span>发起日期:{{info.add_time|convertTime}}</span>
            <span>{{info.click}}次浏览</span>
            <span>分类：民生经济</span>
        </div>
        <ul class="mui-table-view mui-grid-view mui-grid-9">
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"
            v-for='(item,index) in imgs' :key='index'>
                <img class='preview-img' :src="item.src" height='100' @click='$preview.open(index,imgs)'>
            </li>
        </ul>
        <div class="photo-desc">
            <p v-html='info.content'></p>
        </div>
        <comment :commentId='pid'></comment>
    </div>
</template>
<script type="text/ecmascript-6">
    export default {
        data(){
            return {
                //声明这个info
                info:{},
                imgs:[],
                pid:''
            }
        },created(){
            //1.获取参数id
            let id=this.$route.params.id;
            this.pid=id;
            //2.将id作为参数来发起请求
            this.getInfo(id);

            //2.2获取缩略图
            this.getImgs(id);
        },methods:{
            getInfo(id){
                this.$http.get(`${this.config.apiPath}/api/getnew/${id}`)
                    .then(res=>{
                        //2.1获取图文详情
                        this.info=res.body.message[0];//返回的是一个数组
                    },res=>{
                        console.log('出异常了');
                    });
            },getImgs(id){
                this.$http.get(`${this.config.apiPath}/api/getthumimages/${id}`)
                    .then(res=>{
                        this.imgs=res.body.message;//数组，我们全要
                        //此时的CSS几乎没有效果
                        this.imgs.forEach(function(img){
                            img.w=80;
                            img.h=80;
                        });
                        //3.将各种数据响应到页面
                    },res=>{
                        console.log('出异常了');
                    });
            }
        }
    }
</script>
<style>
    li{
        list-style:none;
    }
    ul{
        margin: 0;
        padding: 0;
    }
    .photo-title{
        overflow: hidden;
    }
    .photo-title,
    .photo-desc{
        border-bottom:1px solid rgba(0,0,0,0.2);
        padding-bottom: 5px;
        margin-bottom: 5px;
        padding-left: 5px;
    }
    .photo-title p{
        color:#13c2f7;
        font-size:20px;
        font-weight:bold;
    }
    .photo-title span{
        margin-right: 20px;
    }
    .mui-table-view.mui-grid-view.mui-grid-9{
        background-color: white;
        border:0;
    }
    .mui-table-view.mui-grid-view.mui-grid-9 li{
        border: 0;
    }
    .photo-desc p{
        font-size:18px;
    }
    .mui-table-view-cell.mui-media.mui-col-xs-4.mui-col-sm-3{
        padding: 2px 2px;
    }
</style>
