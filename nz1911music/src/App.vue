<template>
  <div id="app">
   <!-- <LessDemo> </LessDemo> -->
   <Header></Header>
   <Tab></Tab>

   <keep-alive include="a,b,c">
   <router-view></router-view>
   </keep-alive>
   <!-- 播放器组件 -->
  <Player></Player>
  </div>
</template>

<script>
import Player from './components/Player'
import Header from './components/Header';
import Tab from './components/Tab';


// import LessDemo from './demo/less/LessDemo/index'
export default {
  // components:{ LessDemo }
  components:{Header,Tab,Player}
}
</script>

<style lang="less" scoped>
@import './style/index.less'; 
#app {
  background-color: @colorBg;
  .w(375);
  height: 100vh;
}
</style>
