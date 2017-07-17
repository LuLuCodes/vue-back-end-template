<template>
  <div class="createPost-container">
    <el-form class="form-container" :model="postForm" :rules="rules" ref="postForm">
      <sticky :className="'sub-navbar published'">
        <el-button v-loading="loading" style="margin-left: 10px;" type="success" @click="submitForm()">保存
        </el-button>
        <el-button type="warning" @click="cancel()">取消</el-button>
      </sticky>
      
      <div class="createPost-main-container">
        <el-form-item label="轮播图名称" prop="name">
          <el-col :span="11">
            <el-input v-model="postForm.name"></el-input>
          </el-col>
        </el-form-item>
  
        <el-form-item label="轮播图链接" prop="linkType">
          <el-col :span="11" >
            <el-select v-model="postForm.linkType" placeholder="请选择轮播图链接类型"  >
              <el-option label="列表广告" :value="1"></el-option>
              <el-option label="单品广告" :value="2"></el-option>
              <el-option label="外部链接" :value="3"></el-option>
            </el-select>
          </el-col>
        </el-form-item>
  
        <el-form-item label="轮播图设置" prop="linkType">
          <el-col :span="24" >
            <crop-and-upload v-model="postForm.image_uri" :preview-size="{width: 720, height: 288}"></crop-and-upload>
          </el-col>
        </el-form-item>
        
      </div>
    </el-form>
  
  </div>
</template>

<script>
  import Sticky from '../../components/Sticky/index.vue';
  import {CropAndUpload} from '../../components/ImageUpload';
  
  export default {
    name: 'add-swiper',
    components: {
      Sticky,
      CropAndUpload
    },
    data() {
      return {
        postForm: {
          name: '',
          linkType: '',
          image_uri: ''
        },
        rules: {
          name: [
            { required: true, message: '请输入轮播图名称', trigger: 'blur' },
            { min: 5, max: 20, message: '长度在 5 到 20 个字符', trigger: 'blur' }
          ],
          linkType: [
            { required: true, message: '请选择轮播图链接类型', trigger: 'blur' }
          ],
          image_uri: [
            { required: true, message: '请设置轮播图', trigger: 'blur' }
          ]
        },
        loading: false
      };
    },
    computed: {},
    created() {
    },
    methods: {
      submitForm() {
      },
      cancel() {
        this.$emit('changView', 'list');
      }
    }
  };
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  @import "../../assets/css/mixin.scss";
  
  .title-prompt {
    position: absolute;
    right: 0px;
    font-size: 12px;
    top: 10px;
    color: #ff4949;
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

