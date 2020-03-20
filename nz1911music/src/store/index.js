import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        songList: [],
        fullScreen: true,
        currentIndex: -1,
        loop: 3 //表示单曲循环
    },
    mutations: {
        changeScreen(state, screenState) {
            state.fullScreen = screenState
            
        },
        addSongList(state, params) {
            state.songList = params;
            console.log(state.songList);
        },
        changeCurrentIndex(state, index) {
            state.currentIndex = index;
        },
        nextCurrentIndex(state) {
            let count = state.songList.length
            if (state.currentIndex < count - 1) {
                state.currentIndex++
            } else {
                state.currentIndex = 0;
            }
        },
        prevCurrentIndex(state) {
            let count = state.songList.length
            if (state.currentIndex > 0) {
                state.currentIndex--
            } else {
                state.currentIndex = count - 1;
            }
        },
        changeLoop(state) {
            if (state.loop == 3) {
                state.loop = 0
            } else {
                state.loop++
            }
        }
    },
    getters: {
        currentSong(state) {
            return state.songList[state.currentIndex] || null
        }
    }
})

export default store