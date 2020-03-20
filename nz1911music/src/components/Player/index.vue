<template>
  <div class="player" v-if="songList.length">

    <div v-if="fullScreen" class="big">
      <div class="playerSong">
        <span @click="changeScreen(false)">﹀</span>
        {{currentSong.songname}}
      </div>

      <div class="bg">
        <img :src="currentSong.albumUrl" />
      </div>

      <p class="playerSinger">{{currentSong.singer[0].name}}</p>
      <div class="img">
        <img :src="currentSong.albumUrl"  :class="cd" />
      </div>

      <Lyric :startTime='startTime' :play='play' class="playLyric"></Lyric>
      <Progress :startTime='startTime'
      :endTime='endTime'
      @seek='seekcy' class="playProgress"
      >
      </Progress>

      <div class="playBtns">
      <span @click='changeLoop' class="changeSpan">{{loops[loop]}}</span>
      <button @click="prev" class="prevBtn">上一曲</button>
      <button @click="togglePlay" v-if="!play" class="playBtn">播放</button>
      <button @click="togglePlay" v-else-if="play" class="playBtn">暂停</button>
      <button @click="next" class="nextBtn">下一曲</button>
      <button class='likeBtn' v-if="!collect" @click="collection">关注</button>
      <button class='dislikeBtn' v-else-if="collect" @click="collection">取消</button>
      </div>
      <!-- <button class="collectBtn"></button> -->
      <!-- 播放器 -->
      <audio :src='currentSong.audioUrl' 
      ref='audio' 
      @canplay='canplay' 
      @ended="ended"
      @timeupdate="timeupdate"
      ></audio>

    </div>


    <div v-else-if="!fullScreen" class="small" >
      <div class="smallRotate" @click="changeScreen(true)">
        <img :src="currentSong.albumUrl" :class="cd">
      </div>
      <div class="singMessage" @click="changeScreen(true)">
        <p class="smallSongname">{{currentSong.songname}}</p>
        <p class="smallSingername">{{currentSong.singer[0].name}}</p>
      </div>
      <button class="smallPlay" v-if="!play" @click="togglePlay">播放</button>
      <button class="smallPause" v-else-if="play" @click="togglePlay">暂停</button>
      <button class="smallCollection">列表</button>

      <audio :src='currentSong.audioUrl' 
      ref='audio' 
      @canplay='canplay' 
      @ended="ended"
      @timeupdate="timeupdate"
      ></audio>
      <Progress :startTime='startTime'
      :endTime='endTime'
      @seek='seekcy' class="playProgress"
      >
      </Progress>
       <Lyric :startTime='startTime' :play='play' class="playLyric"></Lyric>


    </div>

  </div>
</template>

<script>
import Progress from 'components/Progress'
import Lyric from 'components/Lyric'
import { mapState, mapMutations, mapGetters } from "vuex";
export default {
  components:{Progress,Lyric},
  data() {
    return {
      startTime:0,
      endTime:0,
      play: false,
      loops:['正常','单曲','顺序','随机'],
      collect:false,
    };
  },
  computed: {
    ...mapState(["songList", "fullScreen","loop"]),
    ...mapGetters(["currentSong"]),
    cd() {
        return this.play?'cd':'cd paused';
    }
  },
  methods: {
    ...mapMutations(["changeScreen","nextCurrentIndex","prevCurrentIndex","changeCurrentIndex","changeLoop"]),
    collection(){
        this.collect=!this.collect;
    },
    togglePlay(){
        this.play=!this.play;
        if(this.audio){
          this.audio.play()
        }
    },
    timeupdate(e){
      this.startTime=e.target.currentTime;
    },
    canplay(){
      this.audio=this.$refs.audio;
      this.audio.play();
      this.play=true;
      // console.log('keyibofangle')
      // console.log(this.audio.__proto__)
      this.endTime=this.audio.duration;
    },
    seekcy(s){
      if(!this.audio){return false}
      this.audio.currentTime = s;
    },
    ended(){
      this.play=false
      switch (this.loop) {
        case 1:
          this.play=true;
          this.audio.play();
          break;
        case 2:
          this.nextCurrentIndex()
          break;
        case 3:
          let count=this.songList.length
          let index = parseInt(Math.random()*count)
          this.changeCurrentIndex(index);
          break;
        default:
          break;
      }
    },
    next(){
      this.nextCurrentIndex();
    },
    prev(){
      this.prevCurrentIndex();
    }
  },
  watch:{
    play(newValue,oldValue){
      if(!this.audio) {
        return false
      }
      if(newValue){
        this.audio.play()
      }else {
        this.audio.pause()
      }
    },
    // currentSong(newValue,oldValue){
    //   if(!this.audio){
    //     return false
    //   }

    // }
  }
};
</script>

<style lang="less" scoped>
@import "~style/index.less";
.player {
  .big {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: #222;
    audio{
      visibility: hidden;
    }
    .playLyric{
      position: absolute;
      bottom: 240px;
    }
    .playProgress{
      position: absolute;
      bottom: 100px;
    }
    .playBtns{
      width: 90%;
      height:40px;
      position: absolute;
      left: 5%;
      bottom: 50px;
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      .playBtn{
        font-size: 20px;
      }
      span{
        flex-grow: 1;
        color: @yellow;
        text-align: center;
        font-style: italic;
        height: 30px;
        line-height: 30px;
        font-size: 14px;
        opacity: 0.8;
      }
      button{
        outline: none;
        font-style: italic;
        flex-grow: 1;
        text-align: center;
        color: @yellow;
        height: 30px;
        font-size: 14px;
        background-color: transparent;
        opacity: 0.8;
      }
    }
            .playerSong{
            width: 70%;
            height: 40px;
            margin: 0 auto;
            text-align: center;
            line-height: 40px;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
            font-size: 18px;
            color: #ffffff;
            span{
                position: absolute;
                width: 40px;
                height: 40px;
                top: 10px;
                left: 10px;
                font-size: 30px;
                line-height: 40px;
                color: @yellow;
                z-index: 50;
                text-align: center;
            }
        }
        .playerSinger{
            width: 100%;
            text-align: center;
            font-size: 14px;
            color: #ffffff;
        }

    .bg{
        position: absolute;
        z-index: -9;
        top: 0;
        width: 100%;
        height: 100%;
        filter: blur(10px);
        img{
            width: 100%;
            height: 100%;
        }
    }
    .img {
      text-align: center;
      .w(375);
      position: fixed;
      top: 80px;
      bottom: 170px;
      z-index: -1;
      img {
        width: 75%;
        border-radius: 50%;
        border: 10px solid #999999;
      }
      .cd {
        animation: rotate 10s linear infinite;
      }
      & .paused {
        animation-play-state: paused;
      }
    }
  }
  .small {
    position: fixed;
    bottom: 0px;
    left: 0;
    right: 0;
    height: 80px;
    background-color: #333;
    box-sizing: border-box;
    padding: 10px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    audio{
      visibility: hidden;
    }
    .playProgress{
      position: absolute;
        visibility: hidden;    
    }
    .playLyric{
      position: absolute;
      visibility: hidden;
    }
    .smallRotate{
      width: 40px;
      height:40px;
      border-radius:50%;
      img{
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
      .cd {
        animation: rotate 10s linear infinite;
      }
      & .paused {
        animation-play-state: paused;
      }
    }
    .singMessage{
      margin-left: 10px;
      width: 180px;
      height: 40px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      .smallSongname{
        height: 20px;
        font-size: 14px;
        color: #ffffff;
      }
      .smallSingername{
        height: 20px;
        font-size: 12px;
        color: hsla(0,0%,100%,.3);
      }
    }
    .smallPlay{
      width: 50px;
      height: 34px;
      line-height: 34px;
      text-align: center;
      font-size: 14px;
      color: @yellow;
      background-color: transparent;
      outline: none;
      font-style: italic;
    }
    .smallPause{
      width: 50px;
      height: 34px;
      line-height: 34px;
      text-align: center;
      font-size: 14px;
      color: @yellow;
      background-color: transparent;
      outline: none;
      font-style: italic;
    }
    .smallCollection{
      width: 50px;
      height: 34px;
      line-height: 34px;
      text-align: center;
      font-size: 14px;
      color: @yellow;
      background-color: transparent;
      outline: none;
      font-style: italic;
    }
  }
  @keyframes rotate {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
}
</style>
