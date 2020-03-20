<template>
  <div class="rank">
    <div ref="rankWrapper" class="rankWrapperBox">
    <ul class="rank-wrapperUl">
      <li class="rank-wrapperLi" v-for="(item,index) in rankList" :key="index" @click="goRankDetail(item.id)">
        <div class="rank-leftPart">
          <img v-lazy="item.picUrl" alt="">
        </div>
        <ul class="rank-rightPart">
          <li class="rank-innerLi" v-for="(sItem,sIndex) in item.songList" :key="sIndex">
            {{sIndex+1}}{{sItem.songname}}-{{sItem.singername}}
          </li>
        </ul>
      </li>
    </ul>
    </div>

      <!-- <transition 
    enter-active-class="animated slideInRight"
    leave-active-class="animated slideOutRight"> -->
    <router-view></router-view>
    <!-- </transition> -->

  </div>
</template>
<script>
import BS from "better-scroll";
import { getRankMessage } from "api/api.js";
export default {
  name:'c',
  data(){
    return {
      rankList:[]
    }
  },
  methods:{
    goRankDetail(id){
      this.$router.push(`/rank/${id}`)
    },

    initBs() {
      let wrapper = this.$refs.rankWrapper;
      this.Bs = new BS(wrapper, {probeType:3,click:true});
    }

  },
    created() {
    getRankMessage().then(res => {
      console.log(res)
      this.rankList=res.data.topList;
      
      this.$nextTick(()=>{
      this.initBs();
      })
    }); 
  }

}
</script>
<style lang="less" scoped>
@import '~style/index.less';
.rank{
  position: fixed;
  top: 88px;
  bottom: 0;
  left: 0;
  right: 0;
  .rank-wrapperUl{
    padding: 20px 20px 0;
    .rank-wrapperLi{
      height: 100px;
      margin-bottom: 20px;
      display: flex;
      .rank-leftPart{
        width: 100px;
        height: 100px;
        img{
          width: 100%;
          height: 100%;
        }
      }
      .rank-rightPart{
        width: 195px;
        background-color: #333;
        padding: 0 20px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        .rank-innerLi{
          height: 26px;
          line-height: 26px;
          font-size: 12px;
          color: rgba(255, 255, 255, 0.3);
        }
      }
    }
  }
}
.rankWrapperBox{
  height: 100%;
  overflow: hidden;
}
</style>
