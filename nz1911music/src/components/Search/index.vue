<template>
  <div class="search">
    <div class="searchTop">
      🔍
      <input
        type="text"
        placeholder="搜索歌曲、歌手"
        class="searchInput"
        @keydown="doSearch"
        v-model="inputValue"
        ref="searchInput"
      />
      <span v-if="searchState" @click="closeSearch">x</span>
    </div>

    <div class="searchBox" v-if="!searchState">
      <div class="hot-search">
        <p>热门搜索</p>
        <ul>
          <li v-for="(item, index) in hotList" :key="index" @click="pushIntoSearch(item.k)">{{ item.k }}</li>
        </ul>
      </div>
      <div class="search-history">
        <p>
          搜索历史
          <span class="searchCloseBtn" v-show="searchHistoryList.length?true:false" @click="removeHistoryList">X</span>
        </p>
        <ul>
          <li v-for="(item,index) in searchHistoryList" :key="index" >
            <span class="search-save" @click="pushIntoSearch(item)">
                {{item}}</span>
            <span class="searchCloseBtn" @click.stop="delHistory(item)">X</span>
          </li>
        </ul>
      </div>
    </div>

    <div class="searchContent" v-else-if="searchState" ref="searchContent">
      <ul>
        <li
          v-for="(item, index) in searchList"
          :key="index"
          @click="openPlayer(index)"
        >
          <span>{{ index + 1 }}</span>
          .{{ item.songname }}-{{ item.singer[0].name }}
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import BS from "better-scroll";
import { getSearchHot, getSearchResult, getSongUrlByMid } from "api/api.js";
import {mapMutations} from 'vuex'
export default {
  name: "e",
  data() {
    return {
      hotList: [],
      searchList: [],
      searchState: false,
      inputValue: "",
      result: [],
      mids: [],
      searchHistoryList:[],
      delpass:true
    };
  },
  watch: {
    delpass(newvalue,oldValue){
      this.delpass=true
    },
    inputValue(newValue, oldValue) {
      if (!newValue) {
        this.searchState = false;
      } else {
        this.searchState = true;
      }
      getSearchResult(newValue).then(res => {
        let searchData = res.data.song.list;
        let { result, mids } = this.handleList(searchData);
        this.result = result;
        this.mids = mids;
        this.doSearch();
      });
    }
  },
  methods: {
    ...mapMutations(["addSongList", "changeCurrentIndex", "changeScreen"]),
    removeHistoryList(){
        localStorage.removeItem('searchList')
        this.searchHistoryList=[];
    },

    delHistory(item){
     let _arr=localStorage.getItem('searchList').split(',').slice(0,4);
     for (let index = 0; index < _arr.length; index++) {
       console.log(_arr[index]==item)
       if (_arr[index]==item){
         _arr.splice(index, 1);
       }
     }
     console.log(_arr)
    localStorage.setItem('searchList',_arr);
    // this.searchHistoryList=_arr;
    
    },

    pushIntoSearch(value){
        this.inputValue=value
    },
    initBs() {
      let wrapper = this.$refs.searchContent;
      this.bs = new BS(wrapper, { probeType: 3, click: true });
    },
    openPlayer(index) {
      this.addSongList(this.searchList);
      this.changeCurrentIndex(index);
      this.changeScreen(true);
      if(this.searchHistoryList.length<6 && this.inputValue !== this.searchHistoryList[0]){
          let list=[this.inputValue]
        this.searchHistoryList=list.concat(this.searchHistoryList);
      }else{
        this.searchHistoryList.splice(4,1)
      }
    localStorage.setItem('searchList',this.searchHistoryList)
    },
    async doSearch() {
      //   this.searchState = true;
      let { urls } = await getSongUrlByMid(this.mids);
      if(finalData){
          let finalData = null
      }
      let finalData = [];
      for (let index = 0; index < this.result.length; index++) {
        this.result[index].audioUrl = urls[index];
        if (urls[index]) {
          finalData.push(this.result[index]);
        }
      }
    //   console.log(finalData);
      this.searchList = finalData;
      if (this.searchState) {
        this.$nextTick(() => {
          this.initBs();
        });
      }
    },
    handleList(list) {
      let result = [];
      let mids = [];
      result = list.map((item, index) => {
        let { albummid, albumname, singer, songmid, songname } = item;
        let albumUrl = `https://y.gtimg.cn/music/photo_new/T002R300x300M000${albummid}.jpg?max_age=2592000`;
        mids.push(songmid);
        // console.log(mids)
        return {
          albummid,
          albumname,
          singer,
          songmid,
          songname,
          albumUrl
        };
      });
      return { result, mids };
    },
    closeSearch() {
      this.searchState = false;
      this.inputValue=''
    }
  },
  mounted(){
    if(localStorage.getItem('searchList')){
        let str=localStorage.getItem('searchList');
        this.searchHistoryList=str.split(',').slice(0,4);
    }
  },
  async created() {
    let result = await getSearchHot();
    // console.log(result);
    for (let index = 0; index < 10; index++) {
      this.hotList.push(result.data.hotkey[index]);
    }
    // console.log(this.hotList);
    if(localStorage.getItem('searchList')){
        let str=localStorage.getItem('searchList');
        this.searchHistoryList=str.split(',');
    }
  }
};
</script>
<style lang="less" scoped>
@import "~style/index.less";
.search {
  .searchTop {
    width: 335px;
    height: 40px;
    margin: 20px;
    border-radius: 6px;
    background-color: #333;
    font-size: 20px;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    .searchInput {
      width: 70%;
      height: 100%;
      background-color: #333;
      outline: none;
      font-size: 14px;
      color: #cccccc;
    }
    span {
      width: 16px;
      height: 16px;
      border-radius: 50%;
      color: #333;
      background-color: #111;
      font-size: 12px;
      text-align: center;
      line-height: 16px;
    }
  }
  .searchBox {
    width: 100%;
    height: 100%;
    // background-color: tomato;
    .hot-search {
      width: 335px;
      height: 170px;
      margin: 0 auto 20px;
      p {
        margin-bottom: 20px;
        height: 14px;
        font-size: 14px;
        color: hsla(0, 0%, 100%, 0.5);
      }
      ul {
        height: 136px;
        overflow: hidden;
        // white-space: pre-line;
        li {
          padding: 2px 10px;
          margin: 0 20px 10px 0;
          font-size: 14px;
          background-color: #333;
          border-radius: 6px;
          float: left;
          color: #999;
        }
      }
    }
    .search-history {
      width: 335px;
      height: 280px;
      margin: 0 20px 20px;
      p {
        margin-bottom: 20px;
        height: 14px;
        font-size: 14px;
        color: hsla(0, 0%, 100%, 0.5);
        display: flex;
        justify-content: space-between;
        align-items: center;
        span {
          height: 100%;
          width: 50px;
          text-align: right;
          line-height: 14px;
        }
      }
      ul {
        li {
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 16px;
          color: rgba(255, 255, 255, 0.5);
          .search-save{
              width: 100px;
          }
          .searchCloseBtn{
              width: 50px;
              text-align: right;
          }
        }
      }
    }
  }
  .searchContent {
    height: 490px;
    overflow: hidden;
    ul {
      padding: 0 30px 0;
      li {
        height: 16px;
        padding-bottom: 20px;
        font-size: 14px;
        line-height: 16px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        color: rgba(255, 255, 255, 0.3);
        span {
          color: @yellow;
          font-style: italic;
        }
      }
    }
  }
}
</style>
