<template>
  <div class="wrap">
    <div class="content">
      <div class="search-top">
        <div class="left">
          <el-select v-model="value" placeholder="정렬">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="right">
          <div class="search-wrap">
            <form @submit.prevent="onClickListSearch">
              <el-input v-model="search" placeholder=""></el-input>
              <button type="submit" class="btn search-btn">
                <i class="el-icon-search"></i>
              </button>
            </form>
          </div>
        </div>
      </div>
      <div v-if="list">
        <ul class="thumb-list">
          <li v-for="(v,i) in QUIZ.GAME_LIST" :key="i" class="thumb-list--item" @click="onClickIsModal(v.idx, v.qz_name)">
            <div class="thumb">
              <img v-if="v.is_img" :src="v.is_img" alt="" />
              <img v-else src="../static/images/Thumbnail.svg" alt="" />
            </div>
            <div class="text">
              <div class="tit">{{ v.qz_name }}</div>
              <!-- <div class="info">설명</div> -->
            </div>
          </li>
        </ul>
      </div>
      <div v-else class="nodata">
        <img src="../static/images/nodata.svg" alt="" />
        퀴즈가 없어요.
      </div>
    </div>
    <div class="modal" v-bind:class="{ show: modalShow }">
      <div class="modal-dim" @click="modalShow = false"></div>
      <div class="modal-con center">
         <button type="button" class="btn btn-close" @click="modalShow = false">&times;</button>
         <div class="btn-list">
          <el-button type="primary" @click="onClickIsLimit(10)">10개풀기</el-button>
          <el-button type="primary" @click="onClickIsLimit(20)">20개풀기</el-button>
          <el-button type="primary" @click="onClickIsLimit(30)">30개풀기</el-button>
         </div>
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
      search: '',
      isLimit: 10,
      isStart: true,
      isNow: 0,
      list: true,

      options: [{
        value: '인기순',
        label: '인기순'
      }, {
        value: '최신순',
        label: '최신순'
      }],
      value: '인기순',
      
      modalShow: false,
      startOption: {
        cate : null,
        title: null,
        limit: null
      }
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
    this.ACTION_GAME_LIST()

  },
  mounted() {
  },
  unmounted() {
    // document.removeEventListener('scroll', this.handlerScrollEvents);
  },
  methods: {
    ...mapMutations([]),
    ...mapActions(['ACTION_QUIZ_LIST', 'ACTION_GAME_START', 'ACTION_GAME_IMAGE_SAVE', 'ACTION_GAME_LIST']),
    onClickIsModal(i, v) {
      this.modalShow = true
      this.startOption = {
        cate: i,
        title: v,
      }
    },
    onClickIsLimit(v) {
      this.startOption.limit = v
      this.$router.push(`/quiz?cate=${this.startOption.cate}&title=${this.startOption.title}&limit=${this.startOption.limit}`)
    },
    onClickGameStart() {
      const params = {
        cate: this.$route.query.cate,
        title: encodeURI(this.$route.query.title),
        limit: this.isLimit
      }
      this.ACTION_QUIZ_LIST(params);

    },

  }
}
</script>

<style lang="scss"></style>
