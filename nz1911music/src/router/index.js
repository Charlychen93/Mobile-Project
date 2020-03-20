import Vue from 'vue';
import VueRouter from 'vue-router';
// import Home from '../views/Home.vue'
// import Recommend from '../components/Recommend';
// import Singer from '../components/Singer/index.vue';
// import Rank from '../components/Rank';
// import My from '../components/My';
// import Detail from '../components/Detail'
// import RankDetail from '../components/RankDetail'
// import Search from '../components/Search'
const Recommend=()=>import('../components/Recommend');
const Singer=()=>import('../components/Singer/index.vue');
const Rank=()=>import('../components/Rank');
const My=()=>import('../components/My');
const Detail=()=>import('../components/Detail');
const RankDetail=()=>import('../components/RankDetail');
const Search=()=>import('../components/Search');

Vue.use(VueRouter)

const router = new VueRouter({
    routes: [{
            name:'a',
            path: '/recommend',
            component: Recommend
        }, {
            name:'b',
            path: '/singer',
            component: Singer,
            children: [{
                path: ':singermid',
                name: 'detail',
                component: Detail
            }]
        },
        {
            name:'c',
            path: '/rank',
            component: Rank,
            children: [{
                path: ':rankdetail',
                name: 'rankdetail',
                component: RankDetail
            }]
        },
        {
            name:'d',
            path: '/search',
            component: Search
        }, {
            path: '/',
            redirect: '/recommend'
        }
    ]
})

export default router