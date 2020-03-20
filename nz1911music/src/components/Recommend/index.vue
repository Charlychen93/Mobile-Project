<template>
  <div class="recommend">
    <!-- 列表滚动区域 -->
    <div class="wrapper" ref="wrapper">
      <div class="content">
    <banner :banners='list'></banner>
    <div class="title">歌曲列表推荐</div>
        <ul class="list">
          <li v-for='(item,index) in recommendlist' :key='index'>
            <div class="left">
              <!-- <img :src="item.imgurl" alt=""> -->
              <img v-lazy="item.imgurl" alt="">
            </div>
            <div class="right">
              <p class="name">{{item.creator.name}}</p>
              <p class="desc">{{item.dissname}}</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import Banner from '../Banner'
import BS from 'better-scroll'
import { getRecommendBanner,getRecommendData } from '../../api/api.js'
// import axios from '../../utils/axios'
export default {
    name:'a',
    components:{ Banner },
    data(){
      return{
        list:[],
        recommendlist:[]
      }
    },
    methods:{
      // getBannerData(){
      // let url='/xixi/music/api/getTopBanner?g_tk=1928093487&inCharset=utf8&outCharset=utf-8&notice=0&format=json&platform=yqq.json&hostUin=0&needNewCode=0&-=recom35371766036640007&data=%7B%22comm%22:%7B%22ct%22:24%7D,%22category%22:%7B%22method%22:%22get_hot_category%22,%22param%22:%7B%22qq%22:%22%22%7D,%22module%22:%22music.web_category_svr%22%7D,%22recomPlaylist%22:%7B%22method%22:%22get_hot_recommend%22,%22param%22:%7B%22async%22:1,%22cmd%22:2%7D,%22module%22:%22playlist.HotRecommendServer%22%7D,%22playlist%22:%7B%22method%22:%22get_playlist_by_category%22,%22param%22:%7B%22id%22:8,%22curPage%22:1,%22size%22:40,%22order%22:5,%22titleid%22:8%7D,%22module%22:%22playlist.PlayListPlazaServer%22%7D,%22new_song%22:%7B%22module%22:%22newsong.NewSongServer%22,%22method%22:%22get_new_song_info%22,%22param%22:%7B%22type%22:5%7D%7D,%22new_album%22:%7B%22module%22:%22newalbum.NewAlbumServer%22,%22method%22:%22get_new_album_info%22,%22param%22:%7B%22area%22:1,%22sin%22:0,%22num%22:10%7D%7D,%22new_album_tag%22:%7B%22module%22:%22newalbum.NewAlbumServer%22,%22method%22:%22get_new_album_area%22,%22param%22:%7B%7D%7D,%22toplist%22:%7B%22module%22:%22musicToplist.ToplistInfoServer%22,%22method%22:%22GetAll%22,%22param%22:%7B%7D%7D,%22focus%22:%7B%22module%22:%22QQMusic.MusichallServer%22,%22method%22:%22GetFocus%22,%22param%22:%7B%7D%7D%7D';
      // this.$axios.get(url)
      // // axios.get(url)
      // .then((res)=>{
      //   console.log(res);
      //   this.list=res.data.slider
      // })
      // },
      // getRecommendData(){
      //   let url='/xixi/music/api/getDiscList?g_tk=1928093487&inCharset=utf-8&outCharset=utf-8&notice=0&format=json&platform=yqq&hostUin=0&sin=0&ein=29&sortId=5&needNewCode=0&categoryId=10000000&rnd=0.3983624931217431'
      //   this.$axios.get(url).then((res)=>{
      //     this.recommendlist=res.data.list;
      //   })
      // },
      initBs(){
        let wrapper = this.$refs.wrapper;
        this.bs=new BS(wrapper,{
          pullDownRefresh:{
            threshold:50,
            stop:20
          },
          pullUpLoad:{
            threshold:50
          }
          })

          this.bs.on('pullingDown',()=>{
            // console.log('下拉了')
          getRecommendData().then((res)=>{
          this.recommendlist=res.data.list;
          this.bs.finishPullDown();
          });
          })

          this.bs.on('pullingUp',()=>{
            this.bs.finishPullUp();
          })

      }
    },
    mounted(){
      getRecommendBanner().then((res)=>{
        this.list=res.data.slider
      });
      getRecommendData().then((res)=>{
          this.recommendlist=res.data.list;
      });
      // console.log(this)
      // this.getBannerData();
      // this.getRecommendData();
      this.initBs();
    },
    activated(){
      console.log('缓存组件激活')
    },
    deactivated(){
      console.log('缓存组件失活')
    },
    destroyed(){
      console.log('推荐销毁')
    }
}
</script>

<style lang="less" scoped>
@import '../../style/index.less';
  .recommend {
    .wrapper {
      position: fixed;
      top: 88px;
      bottom: 0px;
      left: 0;
      right: 0;
      // border: 1px solid red;
      overflow: hidden;
      .content {
        .w(375);
        .title {
          .w(375);
          height: 65px;
          line-height: 65px;
          text-align: center;
          font-size: @fs-s;
          color:@yellow;
        }
        .list {
          li{
            .w(375);
            height: 82px;
            box-sizing: border-box;
            // background: pink;
            padding: 0 20px 20px 20px;
            display: flex;
            .left {
              width: 82px;
              height: 60px;
              img {
                width: 60px;
                height: 60px;
              }
            }
            .right {
              color: #fff;
              font-size: @fs-s;
            }
          }
        }
      }
    }
  }
</style>
