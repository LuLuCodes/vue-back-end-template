<template>
  <div class="upload-container">
    <vue-core-image-upload
      :crop-ratio="previewSize.width + ':' + previewSize.height"
      :class="['btn', 'btn-upload']"
      crop="local"
      url="http://101.198.151.190/api/upload.php"
      extensions="png,jpeg,jpg"
      text="上传图片"
      compress="20"
      :cropBtn="{ok:'确定','cancel':'取消'}"
      @imageuploaded="crpoServerImageUploaded">
    </vue-core-image-upload>
    <span class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</span>
    <div class="image-preview" :style="{ width: previewSize.width + 'px', height:  previewSize.height + 'px'}">
      <div class="image-preview-wrapper" v-show="imageUrl.length>1">
        <img :src="imageUrl">
        <div class="image-preview-action">
          <i @click="rmImage" class="el-icon-delete"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import VueCoreImageUpload from 'vue-core-image-upload';
  
  export default {
    name: 'CropAndUpload',
    components: {
      VueCoreImageUpload
    },
    props: {
      value: String,
      previewSize: {
        type: Object,
        default: {
          width: 200,
          height: 200
        }
      }
    },
    computed: {
      imageUrl() {
        return this.value;
      }
    },
    data() {
      return {
      };
    },
    methods: {
      rmImage() {
        this.emitInput('');
      },
      emitInput(val) {
        this.$emit('input', val);
      },
      crpoServerImageUploaded(res) {
        if (res.errcode === 0) {
          if (res.data.src) {
            this.emitInput(res.data.src);
          }
        } else {
          this.$message.error(res.errmsg);
        }
      },
      beforeUpload() {
      }
    }
  };
</script>

<style>
 .btn{
    display: inline-block;
    padding: 0 15px;
    height: 32px;
    margin-left: 15px;
    background: #fff;
    border:1px solid #ccc;
    border-radius: 2px;
    font-size: 13px;
    color:#222;
    line-height: 32px;
    transition: all .1s ease-in;
  }
  .btn:hover{
    border:1px solid #777;
    box-shadow: 0 1px 3px rgba(0,0,0,.05);
  }
  .btn:active{
    background: #ddd;
  }
  .btn:disabled{
    background: #eee !important;
    border-color:#ccc;
    cursor: not-allowed;
  }
  .btn-upload{
    background: #27ae60;
    border-color:#27ae60;
    color:#fff;
  }
  .btn-upload:hover{
    background: #2dc26c;
    border-color:#27ae60;
    box-shadow: 0 1px 3px rgba(0,0,0,.05);
  }
</style>
<style rel="stylesheet/scss" lang="scss" scoped>
  @import "../../assets/css/mixin.scss";
  .upload-container {
    width: 100%;
    position: relative;
    @include clearfix;
    .image-uploader {
      width: 35%;
      float: left;
    }
    .image-preview {
      width: 200px;
      height: 200px;
      position: relative;
      border: 1px dashed #d9d9d9;
      margin-left: 15px;
      .image-preview-wrapper {
        position: relative;
        width: 100%;
        height: 100%;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .image-preview-action {
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        cursor: default;
        text-align: center;
        color: #fff;
        opacity: 0;
        font-size: 20px;
        background-color: rgba(0, 0, 0, .5);
        transition: opacity .3s;
        cursor: pointer;
        text-align: center;
        line-height: 200px;
        .el-icon-delete {
          font-size: 36px;
        }
      }
      &:hover {
        .image-preview-action {
          opacity: 1;
        }
      }
    }
    .image-app-preview {
      width: 320px;
      height: 180px;
      position: relative;
      border: 1px dashed #d9d9d9;
      float: left;
      margin-left: 50px;
      .app-fake-conver {
        height: 44px;
        position: absolute;
        width: 100%; // background: rgba(0, 0, 0, .1);
        text-align: center;
        line-height: 64px;
        color: #fff;
      }
    }
  }
</style>
