<template>
  <div class="wrap">
    <div class="result">
      <div class="score">
        총 <span class="color">10</span>문제중 <span class="color">5</span>문제 맞췄어요!
      </div>
      <div class="text">내 결과를 공유해보세요</div>
      <div class="btn-list">
        <button type="button" class="btn share kakao"></button>
        <button type="button" class="btn share link"></button>
      </div>
      <div class="btn-list">
        <el-button type="primary">다시하기</el-button>
        <el-button type="primary" plain>다른퀴즈</el-button>
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
