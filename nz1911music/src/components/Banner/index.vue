<template>
  <div class="banner">
    <div class="swiper-container">
    <div class="swiper-wrapper">
        <div class="swiper-slide" v-for ='(item,index) in banners' :key='index'>
          <img :src="item.picUrl" alt="">
        </div>
    </div>
</div>
  </div>
</template>
<script>
import Swiper from 'swiper'
export default {
  props:{
    'banners':{type:Array,default:[]}
  },
  methods:{
      initBanner(){
        new Swiper('.swiper-container',{})
      }
    },
    watch:{
      banners(){
        this.$nextTick(()=>{
          this.initBanner()
        })
      }
    }
    // mounted(){
    //   this.initBanner()
    // }
}
</script>
<style lang="less" scoped>
@import '../../style/index.less';
@import '~swiper/css/swiper.min.css';
.swiper-container {
  .w(375);
  height: 150px;
  background-color: green;
  img{
    .w(375);
    height: 150px;
  }
}

</style>
