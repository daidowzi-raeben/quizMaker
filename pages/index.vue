<template>
  <div class="wrap">
    <div v-if="isStart">
      <el-button type="primary" @click="onClickGameStartInit">시작하기</el-button>
    </div>
    <div v-else>
      <div>
        <img :src="QUIZ.IMAGE && QUIZ.IMAGE.length > 0 && QUIZ.IMAGE[0]?.image_url ? QUIZ.IMAGE[0]?.image_url : ''"
          width="100%" />
      </div>
      <div>
        <ul v-if="QUIZ.ANSWER && QUIZ.ANSWER.length > 0">
          <li v-for="(v, i) in QUIZ.ANSWER[isNow - 1].list" :key="i">
            <el-button type="primary" @click="onClickGameStartInit(i, QUIZ.ANSWER[isNow - 1]?.answer)">
              {{ v }} <br>
              {{ QUIZ.LIST[v]?.qz_title }}
            </el-button>
          </li>
        </ul>

      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'

// import imgpath from '~/static/images/logo.svg';

export default {
  name: 'MainPage',
  layout: 'index',
  data() {
    return {
      isLimit: 10,
      isStart: true,
      isNow: 0
    }
  },
  head() {
    return {
      title: '퀴즈'
    }
  },
  computed: {
    ...mapState(['QUIZ']),
  },
  created() {
    this.onClickGameStart()

  },
  mounted() {
  },
  unmounted() {
    // document.removeEventListener('scroll', this.handlerScrollEvents);
  },
  methods: {
    ...mapMutations([]),
    ...mapActions(['ACTION_QUIZ_LIST', 'ACTION_GAME_START', 'ACTION_GAME_IMAGE_SAVE']),
    onClickGameStart() {
      const params = {
        cate: this.$route.query.cate,
        title: encodeURI(this.$route.query.title),
        limit: this.isLimit
      }
      this.ACTION_QUIZ_LIST(params);

    },
    onClickGameStartInit(v, i) {
      console.log(v, i)
      this.isStart = false
      const isAnswer = this.QUIZ.ANSWER[this.isNow]?.answer
      const arrayOnce = this.QUIZ.ANSWER[this.isNow]?.list[isAnswer]

      console.log(isAnswer, arrayOnce, this.isNow)

      const params = {
        query: this.QUIZ.LIST[arrayOnce]?.qz_title,
        page: 1,
        size: 5,
      }

      if (v === i) {
        console.log('정답')
        const saveParams = {
          idx : this.QUIZ.LIST[arrayOnce]?.idx,
          image: this.QUIZ.IMAGE[0]?.image_url,
          mode:'save'
        }
        this.ACTION_GAME_IMAGE_SAVE(saveParams)
      }


      if (this.isLimit === this.isNow) return alert('끝')

      this.ACTION_GAME_START(params)
      this.isNow++
    }
  }
}
</script>

<style lang="scss"></style>
