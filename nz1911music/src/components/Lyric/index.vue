<template>
    <div class="lyric">
        {{text}}
    </div>
</template>

<script>
import {getLyricByMid} from 'api/api.js'
import Lyric from 'lyric-parser'
import {Base64} from 'js-base64'
import { mapGetters,mapState } from 'vuex'
export default {
    data(){
        return{
            text:'歌词加载中'
        }
    },
        methods:{
        getLyric(songmid){
            getLyricByMid(songmid).then((res)=>{
                // console.log(res)
                let lyricString =Base64.decode(res.lyric)
                // console.log(lyricString)
                if(this.lyricObj){
                    this.lyricObj.stop()
                    this.lyricObj=null
                }
                this.lyricObj =new Lyric(lyricString,({txt})=>{
                    console.log('歌词'+txt)
                    this.text=txt;
                })
                this.lyricObj.play()
                console.log('歌词项',this.lyricObj)
            })
        }

    } ,
    props:['startTime','play'],
    computed:{
        ...mapGetters(['currentSong'])
    },
    watch:{
        startTime(newValue,oldValue){
            if(this.play){
            this.lyricObj.seek(newValue*1000)
            }
        },
        play(newValue,oldValue){
            console.log(newValue,this.lyricObj)
            if(this.lyricObj){
            this.lyricObj.togglePlay();
            }
        },
        currentSong(newData,oldData){
            let {songmid} =newData
            this.getLyric(songmid,1)
        },
    },  
    mounted(){
            let {songmid} =this.currentSong
            this.getLyric(songmid,0)
    },
}
</script>

<style lang="less" scoped>
@import '~style/index.less';
.lyric{
   width: 100%;
    height: 20px;
    font-size: @fs-s;
    color: hsla(0,0%,100%,.5);
    text-align: center;
}
</style>
