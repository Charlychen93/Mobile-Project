<template>
    <div>
        <h1>这里是less 案例</h1>
        <hr>
        <div class="demo">

        </div>
        <div class="test">
            <p>
                <span></span>
            </p>
        </div>
    </div>
</template>
<script>
export default {
    
}
</script>
<style lang="less" scoped>
@import '../../../style/index.less';
.demo {
    .w(187.5);
    height: 100px;
    background: pink;
}
    @color:green;
    @height:@width + 100px;
    @width:100px;
    .test {
        background: @color;
        width: @width;
        height: @height;
        .hehe(15px,blue);
    }
    //mixin 混合
    .hehe(@w,@borderColor) {
        // background: @borderColor;
        border: 2px solid red;
        border-radius: 30px;
        border-width: @w;
    }
</style>