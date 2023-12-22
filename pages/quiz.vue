<template>
  <div class="wrap">
    <div class="quiz-wrap">
      <div class="quiz-tit">제목</div>
      <div class="quiz-img">
        <img src="../static/images/Thumbnail.svg" alt="" />
      </div>
      <div class="btn-list">
        <el-button type="primary">1</el-button>
        <el-button type="primary">2</el-button>
        <el-button type="primary">3</el-button>
        <el-button type="primary">4</el-button>
        <el-button type="primary">5</el-button>
      </div>
      <div class="answer">
        <div class="o">
          정답
        </div>
        <div class="x">
          오답
        </div>
        <el-button type="primary">다음</el-button>
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
      isNow: 0,
      list: true,
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
