<template>
  <div class="singer">
    <!-- {{quickData}} -->
    <div class="wrapper" ref="singerWrapper">
      <div class="content">
        <ul>
          <li v-for="(item,index) in singers" :key="index"
          :ref='item.Findex'>
            <h3>{{item.Findex}}</h3>
            <ol>
              <li v-for="(sItem,sIndex) in item.list" :key="sIndex"
              @click='goDetail(sItem.Fsinger_mid)'>
                <img v-lazy="sItem.avator" alt />
                <span>{{sItem.Fsinger_name}}</span>
              </li>
            </ol>
          </li>
        </ul>
      </div>
    </div>
    <!-- 快速列表 -->
    <div class="quicklist">
      <ul @touchstart = 'touchStart'
      @touchmove = 'touchMove'
      @touchend = 'touchEnd'>
        <li v-for="(item,index) in quickData" :key=index 
        @click='quickJunp(item)'
        :class='selFindex==item?"sel":""'>{{item}}</li>
      </ul>
    </div>
    
    <transition 
    enter-active-class="animated slideInRight"
    leave-active-class="animated slideOutRight">
    <router-view></router-view>
    </transition>
    
  </div>
</template>
<script>
import {Indicator} from 'mint-ui';
import BS from "better-scroll";
import jsonp from "jsonp";
import { getSingerData } from "api/api.js";
import { normalData } from "./index";
export default {
  name:'b',
  data() {
    return {
      singers: [],
      selFindex:'hot'
    };
  },
  methods: {
    goDetail(Fsinger_mid){
      this.$router.push(`/singer/${Fsinger_mid}`)
    },
    touchStart(e){
      console.log(e);
      console.log(this);
      let y =e.touches[0].pageY;
      let startCount=parseInt((y-140)/18)
      this.touch.y=y;
      this.touch.startCount=startCount;
      // console.log('按下')
    },  
    touchMove(e){
      let movey =e.touches[0].pageY;
      let moveDis=movey-this.touch.y;
      let count=parseInt(moveDis/18);
      // console.log('移动'+count)
      let moveIndex =this.touch.startCount+count;
      if(moveIndex<0 || moveIndex>this.quickData.length-1){
        return false
      }
      let moveFindex = this.quickData[moveIndex];
      this.quickJunp(moveFindex)
    },  
    touchEnd(e){
      // let y =e.touches[0].pageY;
      console.log('结束')
    },
    quickJunp(item){
      // console.log(this.$refs);
      // console.log(item);
      let dom = this.$refs[item][0];
      this.Bs.scrollToElement(dom);
    },
    initBs() {
      let wrapper = this.$refs.singerWrapper;
      this.Bs = new BS(wrapper, {probeType:3,click:true});
      console.log(this.$refs);
      let distance = [];
      for (const key in this.$refs) {
        if (key !== 'singerWrapper') {
         distance.push(this.$refs[key][0].offsetTop)
        }
      }
      this.Bs.on('scroll',(pos)=>{
        let y = Math.abs(pos.y);
        let scrollIndex = 0;
        for (let index = 0; index < distance.length; index++) {
         if(y>=distance[index] && y <distance[index+1]){
           scrollIndex=index;
         }else if(y>=distance[distance.length-1]){
           scrollIndex=distance.length-1;
         }
        }
        this.selFindex = this.quickData[scrollIndex];
      })
  // console.log(distance);
    }
  },
  computed:{
    quickData(){
      let result=this.singers.map((item)=>{
        return item.Findex;
      })
      return result;
    }
  },
  created() {
    this.touch={y:0};
    Indicator.open();
    getSingerData().then(res => {
      let data = normalData(res.data.list);
      console.log(data);
    Indicator.close();
      this.singers = data;
      this.$nextTick(()=>{
      this.initBs();
      })
    }); 
  }
};
</script>

<style lang="less" scoped>
@import "~style/index.less";
.singer {
  position: fixed;
  top: 88px;
  bottom: 0;
  left: 0;
  right: 0;
  .wrapper {
    height: 100%;
    overflow: hidden;
    .content {
      width: 100%;
      h3 {
        height: 30px;
        padding-left: 25px;
        line-height: 30px;
        color: rgba(255, 255, 255, 0.5);
        font-size: @fs-s;
        background-color: #333;
      }
      ol {
        li {
          .w(375);
          height: 70px;
          box-sizing: border-box;
          padding: 20px 0 0 30px;
          display: flex;
          align-items: center;
          img {
            width: 50px;
            height: 50px;
            border-radius: 50%;
          }
          span {
            padding-left: 20px;

            display: inline-block;
            height: 50px;
            line-height: 50px;
            font-size: @fs-s;
            color: rgba(255, 255, 255, 0.5);
          }
        }
      }
    }
  }
  .quicklist{
    position: absolute;
    right: 10px;
    top: 40px;
    width: 20px;
    background: rgba(0, 0, 0, 0.3);
    font-size:12px;;
    padding: 20px 0 20px;
    color: rgba(255, 255, 255, 0.5);
    text-align: center;
    border-radius: 10px;
    ul{
      li{
        width: 20px;
        height: 18px;
      }
      .sel{
        color: @yellow;
      }
    }
  }
}
</style>
