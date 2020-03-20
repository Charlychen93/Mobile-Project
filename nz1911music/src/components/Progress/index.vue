<template>
    <div class="progress"> 
    <span>{{startTime | handleTime}}</span>
    <div class="wrapper" @click="clickProgress"
    ref="wrapper">
        <div class="content" ref="content">
        </div>
        <div class="dot" ref="dot" 
        @touchstart="touchStart"
        @touchmove="touchMove"
        @touchend="touchEnd"
        ></div>
    </div>
    <span>{{endTime | handleTime}}</span>
    </div>
</template>
<script>
export default {
    methods:{
        jump(precent){
            let s=this.endTime*precent
            this.$emit('seek',s)
        },
        touchStart(e){
            // console.log('按下')
            this.touch=true
            this.distance=0;
        },
        touchMove(e){
            // console.log('移动')
            // console.log(e)
            let left=this.$refs.wrapper.getBoundingClientRect().left;
            this.distance=e.touches[0].pageX-left;
            
            if(this.distance >= this.$refs.wrapper.clientWidth){
                this.distance = this.$refs.wrapper.clientWidth
            }else if(this.distance <= 0){
                this.distance = 0
            }
            this.offsetMove(this.distance);
        },
        touchEnd(e){
            // console.log('停止')
            this.touch=false
            this.offsetMove(this.distance);
        },

        clickProgress(e){
            let x = e.pageX;
            let left=this.$refs.wrapper.getBoundingClientRect().left;
            let distance = x - left;
            this.offsetMove(distance);
        },
        offsetMove(distance){
            let precent = distance/this.$refs.wrapper.clientWidth;
            this.$refs.dot.style.left= distance-8 + 'px';
            this.$refs.content.style.width=precent*100 + '%';
            if(this.touch){
                return false
            }
            this.jump(precent)
        }
    },
    props:{
    startTime:{type:Number,default:0},
    endTime:{type:Number,default:0}
    },
    filters:{
        handleTime(data){
            let time = parseInt(data)
            let m =parseInt(time/60)
            let s = time%60
            if(s<10){
                s='0'+s
            }
            return m+':'+s
        }
    },
    watch:{
        startTime(newValue,oldValue){
            if(this.touch){return false}
            let precent=this.startTime/this.endTime;
            this.$refs.dot.style.left= 270*precent-8 + 'px';
            this.$refs.content.style.width=precent*100 + '%';
        }
    },
    created(){
    }
}
</script>

<style lang="less" scoped>
@import '~style/index.less';
.progress{
    .w(375);
    height:30px;
    display: flex;
    font-size: @fs-s;
    align-items: center;
    justify-content: center;
    span{
        width: 30px;
        height: 30px;
        font-size: 12px;
        text-align: center;
        line-height: 30px;
        color: #ffffff;
        margin: 0 5px;
    }
    .wrapper{
        margin: 0 2px;
        .w(270);
        height: 4px;
        background-color: rgba(0, 0, 0, .3);
        position: relative;
        .content{
            height: 100%;
            width: 0;
            background-color: @yellow;
        }
        .dot{
            height: 10px;
            width: 10px;
            background-color: @yellow;
            border-radius: 50%;
            border: 3px solid white;
            position: absolute;
            left: -8px;
            top: -6px;
        }
    }
}
</style>