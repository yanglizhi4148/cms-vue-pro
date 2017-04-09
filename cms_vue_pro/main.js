/**
 * Created by 琴瑟 on 2017/4/3.
 */
import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import MintUi from 'mint-ui';
import 'mint-ui/lib/style.css';

//引入mui
import  './static/render/mui/dist/css/mui.css';
//引入我们自己的CSS
import './static/css/global.css'

//引入moment
import moment from 'moment';

//引入我们自己的文件
import Home from './components/home/home.vue';
import App from './app.vue';
//引入新闻列表
import NewsList from './components/news/newsList.vue';
//引入在全局中使用的组件
import GoBackHeader from './components/partials/goBackHeader.vue';
//引入新闻详情页
import NewsDetail from './components/news/newsDetail.vue';
//引入轮播图全局组件对象
import MySwipe from './components/commons/mySwipe.vue';
//引入图片分享组件
import PhotoShare from './components/photo/share.vue';
//引入图文详情组件
import PhotoDetail from './components/photo/detail.vue';
//引入评论的全局组件对象
import Comment from './components/commons/comment.vue';
//引入商品展示组件对象
import GoodsList from './components/goods/list.vue';
//引入商品详情组件对象
import GoodsDetail from './components/goods/detail.vue';
//引入商品评论组件对象
import ProdComment from './components/goods/prodComment.vue';
//引入会员组件对象
import Member from './components/member/member.vue';
//引入查找组件对象
import Search from './components/search/search.vue';
//引入购物车组件对象
import ShopCart from './components/shopcart/shopcart.vue';


//引入图片预览插件
import VuePreview from 'vue-preview';
Vue.use(VuePreview);

//安装插件
Vue.use(VueRouter);
Vue.use(VueResource);
Vue.use(MintUi);

//创建路由对象并配置
let router=new VueRouter({
    linkActiveClass:'mui-active',
    routes:[
        {name:'home',path:'/home',component:Home},//显示首页
        {name:'default',path:'/',redirect:'/home'},//匹配默认/的情况下跳转到/home并显示首页
        {name:'news.list',path:'/news/newsList',component:NewsList},
        {name:'news.detail',path:'/news/detail/:id',component:NewsDetail},
        {path:'/photo/share',component:PhotoShare},//图片分享
        {path:'/photo/detail/:id',component:PhotoDetail},//图片详情
        {path:'/goods/goodsList',component:GoodsList},//商品列表
        {path:'/goods/detail/:pid',component:GoodsDetail},//商品详情
        {path:'/goods/comment/:pid',component:ProdComment},//商品评论
        {path:'/member',component:Member},//显示会员页
        {path:'/shopcart',component:ShopCart},//显示购物车
        {path:'/search',component:Search},//显示查找页面
    ]
});

//声明一个全局组件
Vue.component('goBackHeader',GoBackHeader);
Vue.component('comment',Comment);
Vue.component('my-swipe',MySwipe);
//声明一个全局的过滤器
Vue.filter('convertTime',function(add_time){
    return moment(add_time).format('YYYY-MM-DD');
});

//在原型上配置一个属性，供所有的子组件使用
Vue.prototype.config={
    apiPath:'http://webhm.top:8899'
    //子组件中通过this.config能获取到数据
};

//引入GoodsTools
import GoodsTools from './components/goods/GoodsTools.js';
//导入vuex对象
import Vuex from 'vuex';
import shopCart from './modules/shopCart.js';
//安装插件
Vue.use(Vuex);
//构建store实例对象
const store=new Vuex.Store({
    modules:{
        shopCart
    }
});


//创建vue实例对象
new Vue({
    el:'#app',
    router,
    store,
    render:c=>c(App)
});