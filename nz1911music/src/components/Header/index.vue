<template>
    <div class="header">
        <img src="/favicon.ico" alt="">
      <span>Cy's Music</span>
      <div class="header-my">我的</div>
    </div>
</template>
<script>
export default {
    
}
</script>

<style lang="less" scoped>
@import '../../style/index.less';
.header {
    color:@yellow;
    font-size:@fs-l;
    display:flex;
    justify-content: center;
    align-items: center;
    .w(375);
    height: 44px;
    position: relative;
    .header-my{
        height: 30px;
        width: 50px;
        text-align: center;
        line-height: 30px;
        position: absolute;
        top: 12px;
        right: 10px;
        font-size: 14px;
        font-style: italic;
    }
    img{
        width: 18px;
        height: 18px;
    }
}
</style>