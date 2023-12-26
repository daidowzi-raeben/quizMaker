import axios from 'axios'
import Vue from 'vue'
import Vuex, { Store } from 'vuex'

import ASEETS_STORE from './modules/assetsStore.js'
import JOIN_STORE from './modules/joinStore.js'
// import LOCATION_DATA from '~/static/json/location.json'
// import TEXT_LIST_DATA from '~/static/json/textList.json'
import { randListAnswer } from '~/js/util'

Vue.use(Vuex)
const instance = axios.create()

// axios.interceptors.request.use(
//   function (config) {
//     console.log('=============요청전==========')
//     config.headers['Authorization'] = 'Bearer '
//     return config
//   },
//   function (error) {
//     return Promise.reject(error)
//   }
// )

instance.interceptors.request.use(
  function (config) {
    console.log('=============요청전==========')
    // 요청 성공 직전 호출됩니다.
    // axios 설정값을 넣습니다. (사용자 정의 설정도 추가 가능)
    // config.headers.Authorization = 'KakaoAK 1f64fd2b5f780ced81e4e045f034fe9c'
    return config
  },
  function (error) {
    // 요청 에러 직전 호출됩니다.
    return Promise.reject(error)
  }
)

// const apiUrl = {
//   apiMain: '/student.php?type=main&smt_idx=1&sms_idx=1',
// }
// const LOCALSTORAGE = localStorage.getItem('STUDENT')
// console.log('LOCALSTORAGE', LOCALSTORAGE)

const createStore = () => {
  return new Store({
    state: {
      IS_LOADING: false,
      QUIZ: {
        COUNT: 0,
        CATEGORY: '',
        LIST: [],
        ANSWER: [],
        ANSWER_LIST: [],
        IMAGE: [],
        GAME_LIST: [],
      },
    },
    getters: {},
    mutations: {
      // ----------- intro

      MUTATIONS_QUIZ_LIST(state, payload) {
        state.QUIZ.LIST = payload.data
        const cnt = 5

        if (state.QUIZ.LIST.length > 0) {
          // randListAnswer(state.QUIZ.LIST.length)

          // Math.floor(Math.random() * cnt - 1)

          for (let i = 0; i < payload.params.limit; i++) {
            const list = {
              answer: null,
              list: [],
            }
            list.answer = Math.floor(Math.random() * cnt)
            list.list = randListAnswer(state.QUIZ.LIST.length, cnt)
            state.QUIZ.ANSWER.push(list)
          }

          // for (let i = 0; i < payload.params.limit; i++) {
          //   isAnswer[i] = {
          //     answer: Math.floor(Math.random() * state.QUIZ.LIST.length),
          //     quiz: [],
          //   }
          //   for (let k = 0; k < 4; k++) {
          //     isAnswer[i].quiz[k] = Math.floor(
          //       Math.random() * state.QUIZ.LIST.length
          //     )
          //   }
          // }

          // for (let k = 0; k < state.QUIZ.LIST.length; k++) {
          //   const isQuiz = Math.floor(Math.random() * state.QUIZ.LIST.length)
          //   for (let t = 0; t < payload.params.limit; t++) {
          //     if (isAnswer[t].answer !== isQuiz) {
          //       isAnswer[t].quiz.push(isQuiz)
          //       if (isAnswer[t].quiz.length === 4) break;
          //     }
          //   }
          // }

          state.QUIZ.CATEGORY = state.QUIZ.LIST[0]?.qc_idx
          // state.QUIZ.ANSWER = lottoNum()
        }
      },
      MUTATIONS_QUIZ_START(state, payload) {
        const list = payload?.documents
        // const listArray = []
        // for (let i = 0; i < list.length; i++) {
        //   if (
        //     list[i]?.display_sitename !== '네이버블로그' &&
        //     list[i]?.display_sitename !== 'Daum카페'
        //   ) {
        //     listArray.push(list[i])
        //     break
        //   }
        // }
        // state.QUIZ.IMAGE = listArray
        state.QUIZ.IMAGE = list
        console.log(payload)
      },
      MUTATIONS_GAME_LIST(state, payload) {
        state.QUIZ.GAME_LIST = payload
        console.log(payload)
      },
    },
    actions: {
      ACTION_QUIZ_LIST({ commit }, params) {
        this.$axios
          .get(
            `${process.env.VUE_APP_API}?mode=list&cate=${params?.cate}&limit=${params?.limit}&title=${params?.title}`,
            params,
            {
              header: {
                'Context-Type': 'multipart/form-data',
              },
            }
          )
          .then((res) => {
            console.log(res.data)
            res.params = params
            commit('MUTATIONS_QUIZ_LIST', res)
          })
          .catch((res) => {
            console.log('AXIOS FALSE', res)
          })
      },
      ACTION_GAME_LIST({ commit }, params) {
        this.$axios
          .get(
            `${process.env.VUE_APP_API}?mode=gameList`,
            { params },
            {
              headers: {
                'Context-Type': 'application/json',
              },
            }
          )
          .then((res) => {
            console.log(res)
            commit('MUTATIONS_GAME_LIST', res.data)
          })
          .catch((res) => {
            console.log('AXIOS FALSE', res)
          })
      },
      ACTION_GAME_START({ commit }, params) {
        this.$axios
          .get(
            `https://dapi.kakao.com/v2/search/image`,
            { params },
            {
              headers: {
                'Context-Type': 'application/json',
              },
            }
          )
          .then((res) => {
            console.log(res)
            commit('MUTATIONS_QUIZ_START', res.data)
          })
          .catch((res) => {
            console.log('AXIOS FALSE', res)
          })
      },
      ACTION_GAME_IMAGE_SAVE({ commit }, params) {
        this.$axios
          .get(
            `${process.env.VUE_APP_API}?mode=save`,
            { params },
            {
              header: {
                'Context-Type': 'multipart/form-data',
              },
            }
          )
          .then((res) => {
            console.log(res.data)
            // commit('MUTATIONS_MAP_LIST', res.data)
          })
          .catch((res) => {
            console.log('AXIOS FALSE', res)
          })
      },
      ACTION_QUIZ_INSERT({ commit }, params) {
        this.$axios
          .get(`${process.env.VUE_APP_API}`, { params })
          .then((res) => {
            console.log(res.data)
          })
          .catch((res) => {
            console.log('AXIOS FALSE', res)
          })
      },
      ACTION_MAP_PLACE_ID({ commit }, params) {
        this.$axios
          .get(
            `${process.env.VUE_APP_API}?mode=getPlaceId&location=${params?.mapy},${params?.mapx}&radius=1&keyword=${params?.title}`,
            params,
            {
              header: {
                'Context-Type': 'multipart/form-data',
              },
            }
          )
          .then((res) => {
            console.log(res.data)
            // commit('MUTATIONS_MAP_PLACE_ID', res.data)
            if (res?.data?.results && res?.data?.results.length > 0) {
              const placeId = res?.data?.results[0]?.place_id

              this.$axios
                .get(
                  `${process.env.VUE_APP_API}?mode=placeId&q=${placeId}&idx=${params?.idx}`,
                  params,
                  {
                    header: {
                      'Context-Type': 'multipart/form-data',
                    },
                  }
                )
                .then((res) => {
                  console.log(res.data)
                  // 라우터 이동
                  this.$router.push(
                    `/festival/detail?place=${params?.secretKey}`
                  )
                  // commit('MUTATIONS_MAP_PLACE_ID', res.data)
                })
                .catch((res) => {
                  console.log('AXIOS FALSE', res)
                })
            } else {
              this.$router.push(`/festival/detail?place=${params?.secretKey}`)
            }
          })
          .catch((res) => {
            console.log('AXIOS FALSE', res)
          })
      },
    },
    modules: {
      foo: {
        namespaced: true,
        modules: {
          assetsStore: ASEETS_STORE,
          joinStore: JOIN_STORE,
        },
      },
    },
  })
}

export default createStore
