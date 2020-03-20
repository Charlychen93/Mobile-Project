<template>
  <div class="rankdetail">
    <div class="top">
      <span @click="goback" class="back">&lt;back</span>
      <h1 class="rankname">{{listName}}</h1>
    </div>
    <!-- 头像 -->
    <div class="avator" :style="{'background-image':`url(${avator})`}" ref="img">
      <div class="shadow"></div>
      <div class="randomPlay" @click="randomSong">随机播放全部</div>
    </div>
    <!-- 歌曲列表 -->
    <div class="songlist" ref="wrapper">
      <div class="content">
        <ul>
          <li v-for="(item,index) in ranklist" :key="index" @click="openPlayer(index)">
            <h2>{{item.songname}}</h2>
            <p>{{item.singer[0].name}}·{{item.albumname}}</p>
          </li>
        </ul>
      </div>
    </div>

  </div>
</template>

<script>
import BS from 'better-scroll'
import {mapMutations} from 'vuex';
import {getRankByTopId,getSongUrlByMid} from "api/api.js";
export default {
  data(){
    return{
      ranklist:[],
      listName:'暂无数据',
      avator:"",
    }
  },
  methods:{
    ...mapMutations(['addSongList','changeCurrentIndex','changeScreen']),
    goback(){
      this.$router.go(-1);
    },
    randomSong(){
      // console.log(this.list)
      let randomNum=parseInt(Math.random()*this.ranklist.length)
        this.addSongList(this.ranklist)
        this.changeCurrentIndex(randomNum)
        this.changeScreen(true)
      // this.changeScreen(true)
    },
    openPlayer(index){
        // console.log(this.ranklist)
        this.addSongList(this.ranklist)
        this.changeCurrentIndex(index)
        this.changeScreen(true)
    },
    initBs() {
      let img = this.$refs.img;
      let imgH = img.clientHeight;
      let wrapper = this.$refs.wrapper;
      this.bs = new BS(wrapper, { probeType: 3,click:true});
      this.bs.on("scroll", ({ y }) => {
        if (y >= 0) {
          let precent =1+(y/imgH)
          img.style.transform=`scale(${precent})`
          img.style.zIndex=1
        } else {
          if (Math.abs(y) > imgH - 40) {
            img.style.zIndex = 1;
            img.style.paddingTop = "0%";
            img.style.height = "40px";
          } else {
            img.style.zIndex = -1;
            img.style.paddingTop = "70%";
            img.style.height = 0;
          }
        }
      });
    },
    handleList(list){
      let result=[]
      let mids=[]
      result=list.map((item,index)=>{
        let{
          albummid,
          albumname,
          singer,
          songmid,
          songname
        }=item.data;
        let albumUrl=`https://y.gtimg.cn/music/photo_new/T002R300x300M000${albummid}.jpg?max_age=2592000`;
        mids.push(songmid);
        // this.avator=albumUrl;
        // this.singername=singer[0].name;
        return {
           albummid,
          albumname,
          singer,
          songmid,
          songname,
          albumUrl
        }
      })
      return {result,mids};
    }
  },
  async created() {
    let {rankdetail} =this.$route.params;
    let data =await getRankByTopId(rankdetail)
    // console.log(data)
    let {result,mids} = this.handleList(data.songlist);
    let {urls}=await getSongUrlByMid(mids);
    let finalData=[]
    for (let index = 0; index < result.length; index++) {
      result[index].audioUrl=urls[index];
      if(urls[index]){
        finalData.push(result[index]);
      }
    }
    // console.log(finalData)
      this.ranklist = finalData;
      this.avator=`https://y.gtimg.cn/music/photo_new/T002R300x300M000${finalData[0].albummid}.jpg?max_age=2592000`;
      // console.log(this.ranklist)
      this.listName=data.topinfo.ListName;
      this.$nextTick(() => {
        this.initBs();
      });
  },
    beforeRouteEnter(to,from,next){
    next()
  },
  async beforeRouteUpdate(to,from,next){
    // console.log(from,to)
    next()

    let data =await getRankByTopId(rankdetail)
    // console.log(data)
    let {result,mids} = this.handleList(data.songlist);
    let {urls}=await getSongUrlByMid(mids);
    let finalData=[]
    for (let index = 0; index < result.length; index++) {
      result[index].audioUrl=urls[index];
      if(urls[index]){
        finalData.push(result[index]);
      }
    }
    // console.log(finalData)
      this.ranklist=finalData;
      // console.log(finalData[0])
      this.avator=`https://y.gtimg.cn/music/photo_new/T002R300x300M000${finalData[0].albummid}.jpg?max_age=2592000`;
      this.listName=data.topinfo.ListName;
      this.$nextTick(() => {
        this.initBs();
      });
  }
}
</script>

<style lang="less" scoped>
@import "../../style/index.less";
.rankdetail {
  background-color: #222;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
    .top {
    position: absolute;
    top: 0;
    width: 100%;
    height: 40px;
    z-index: 40;
    .back {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 50;
      font-size: 18px;
      font-style:italic;
      text-align: center;
      color: @yellow;
      width: 20%;
      height: 22px;
      padding: 5px 10px 10px;
    }
    .rankname {
      position: absolute;
      top: 0;
      left: 20%;
      z-index: 50;
      width: 60%;
      overflow: hidden;
      text-overflow: ellipsis;
      text-align: center;
      white-space: nowrap;
      line-height: 40px;
      font-size: 18px;
      color: #ffffff;
    }
  }
  .avator {
    width: 100%;
    padding-top: 70%;
    transform-origin: 50% 0;
    background-size: cover;
    position: absolute;
    top: 0;
    z-index: -1;
    .randomPlay{
      position: absolute;
      bottom: 30px;
      left: 50%;
      transform: translateX(-50%);
      z-index: 50;
      color: @yellow;
      opacity: 0.8;
      width: 100px;
      height: 32px;
      border-radius: 16px;
      border: 2px solid @yellow;
      font-size: 12px;
      line-height: 32px;
      text-align: center;
    }
    .shadow {
      position: absolute;
      top: 0;
      left: 0;
      // z-index: 7;
      background: rgba(7, 17, 27, 0.4);
      width: 100%;
      height: 100%;
    }
  }

  .songlist {
    position: fixed;
    background-color: #222;
    // overflow: hidden;
    top: 263px;
    bottom: 0;
    left: 0;
    right: 0;
    .content {
      padding: 10px 30px;
      background-color: #222;
      li {
        color: #fff;
        height: 61px;
        h2 {
          height: 20px;
          font-size: @fs-s;
        }
        p {
          font-size: @fs-s;
          margin-top: 5px;
          height: 20px;
          color: hsla(0, 0%, 100%, 0.3);
        }
      }
    }
  }

}
</style>