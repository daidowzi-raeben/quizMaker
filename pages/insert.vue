<template>
  <div class="wrap">
    <div class="insert-wrap">
      엔터로 구분합니다. 최소 30개 이상 등록해야 함
      <div>
        <el-input placeholder="카테고리" v-model="cate"></el-input>
        <el-input placeholder="제목" v-model="title"></el-input>
        <el-input placeholder="이름" v-model="maker"></el-input>
      </div>
      <div>
        <el-input
          v-model="listText"
          type="textarea"
          :autosize="{ minRows: 5, maxRows: 10 }"
          placeholder="Please input"
        >
        </el-input>
      </div>
      <div>
        <template v-for="(v, i) in listTag">
          <el-tag v-if="v" :key="i">{{ v }}</el-tag>
        </template>
      </div>
      <div class="btn-wrap">
        <el-button type="primary" @click="onSubmitList">저장</el-button>
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
      listText: '',
      cate: '',
      title: '',
      maker: '',
      listTag: [],
      actionUrl: '',
    }
  },
  head() {
    return {
      title: '퀴즈',
    }
  },
  computed: {
    ...mapState(['QUIZ']),
  },
  watch: {
    listText: {
      handler(value) {
        if (value) {
          this.listTag = value.split('\n')
        }
      },
    },
  },
  created() {},
  mounted() {
    this.actionUrl = process.env.VUE_APP_API
  },
  unmounted() {
    // document.removeEventListener('scroll', this.handlerScrollEvents);
  },
  methods: {
    ...mapMutations([]),
    ...mapActions(['ACTION_QUIZ_INSERT']),
    onChangeIsList({ target }) {
      console.log(target)
      // this.listText = target.value
    },
    onSubmitList() {
      if (this.listTag.length < 30) return alert('최소 30개 입력해야 합니다.')
      if (!this.listText || !this.cate || !this.title || !this.maker)
        return alert('모든 사항을 입력해주세요')
      const params = {
        cate: this.cate,
        title: this.title,
        maker: this.maker,
        list: this.listText.replaceAll('\n', '||'),
        mode: 'insert',
      }
      this.ACTION_QUIZ_INSERT(params)
    },
  },
}
</script>

<style lang="scss"></style>
