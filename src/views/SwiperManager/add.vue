<template>
  <div class="createPost-container">
    <el-form class="form-container" :model="postForm" :rules="rules" ref="postForm">
      <sticky :className="'sub-navbar published'">
        <el-button v-loading="loading" style="margin-left: 10px;" type="success" @click="submitForm()">保存
        </el-button>
        <el-button v-loading="loading" type="warning" @click="cancel()">取消</el-button>
      
      </sticky>
    </el-form>
  
  </div>
</template>

<script>
  import Sticky from '../../components/Sticky/index.vue';
  export default {
    name: 'add-swiper',
    components: {
      Sticky
    },
    data() {
      return {
      };
    },
    computed: {
    },
    created() {
    },
    methods: {
      submitForm() {},
      cancel() {
        this.$emit('changView', 'list');
      }
    }
  };
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  @import "../../assets/css/mixin.scss";
  .title-prompt{
    position: absolute;
    right: 0px;
    font-size: 12px;
    top:10px;
    color:#ff4949;
  }
  .createPost-container {
    position: relative;
    .createPost-main-container {
      padding: 40px 45px 20px 50px;
      .postInfo-container {
        position: relative;
        @include clearfix;
        margin-bottom: 10px;
        .postInfo-container-item {
          float: left;
        }
      }
      .editor-container {
        min-height: 500px;
        margin: 0 0 30px;
        .editor-upload-btn-container {
          text-align: right;
          margin-right: 10px;
          .editor-upload-btn {
            display: inline-block;
          }
        }
      }
    }
    .word-counter {
      width: 40px;
      position: absolute;
      right: -10px;
      top: 0px;
    }
  }
</style>

