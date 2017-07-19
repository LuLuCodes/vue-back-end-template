<template>
  <div class="createPost-container">
    <el-form class="form-container" :model="postForm" :rules="rules" ref="postForm" label-width="80px"
             label-position="right">
      <sticky :className="'sub-navbar published'">
        <el-button v-loading="loading" style="margin-left: 10px;" type="success" @click="submitForm()">保存
        </el-button>
        <el-button type="warning" @click="cancel()">取消</el-button>
      </sticky>
      
      <div class="createPost-main-container">
        <h3>基础信息</h3>
        <el-row>
          <el-col :span="12">
            <el-form-item label="商品名称" prop="categoryId">
              <el-input v-model="postForm.categoryId" size="small"></el-input>
            </el-form-item>
          </el-col>
          
          
          <el-col :span="10" :push="1">
            <el-form-item label="商品分类" prop="name">
              <el-cascader
                expand-trigger="hover"
                :options="data2"
                :show-all-levels="false"
                size="small">
              </el-cascader>
            </el-form-item>
          </el-col>
        </el-row>
  
        <el-row>
          <el-col :span="12">
            <el-form-item label="计量单位" prop="unitId">
              <el-select v-model="postForm.unitId" clearable placeholder="请选择" size="small">
                <el-option
                  v-for="item in unitList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
    
    
          <el-col :span="10" :push="1">
            <el-form-item label="商品分类" prop="name">
              <el-cascader
                expand-trigger="hover"
                :options="data2"
                :show-all-levels="false"
                size="small">
              </el-cascader>
            </el-form-item>
          </el-col>
        </el-row>
      
      </div>
    </el-form>
    
    <el-tooltip placement="top" content="回到顶部">
      <back-to-top transitionName="fade" :visibilityHeight="300" :backPosition="50"></back-to-top>
    </el-tooltip>
  </div>
</template>

<script>
  import BackToTop from '../../components/BackToTop/index.vue';
  import Sticky from '../../components/Sticky/index.vue';
  import {CropAndUpload} from '../../components/ImageUpload';

  export default {
    name: 'AddGood',
    components: {
      Sticky,
      CropAndUpload,
      BackToTop
    },
    data() {
      return {
        postForm: {
          name: '',
          categoryId: undefined,
          unitId: undefined,
          tags: []
        },
        rules: {
          name: [
            {required: true, message: '请输入商品名称', trigger: 'blur'}
          ],
          categoryId: [
            {required: true, message: '请选择商品分类', trigger: 'blur'}
          ],
          unitId: [
            {required: true, message: '请选择商品单位', trigger: 'blur'}
          ]
        },
        loading: false,
        data2: [{
          value: 1,
          label: '一级 1',
          children: [{
            value: 4,
            label: '二级 1-1',
            children: [{
              value: 9,
              label: '三级 1-1-1'
            }, {
              value: 10,
              label: '三级 1-1-2'
            }]
          }]
        }, {
          value: 2,
          label: '一级 2',
          children: [{
            value: 5,
            label: '二级 2-1'
          }, {
            value: 6,
            label: '二级 2-2'
          }]
        }, {
          value: 3,
          label: '一级 3',
          children: [{
            value: 7,
            label: '二级 3-1'
          }, {
            value: 8,
            label: '二级 3-2'
          }]
        }],
        unitList: [{label: '件', value: 1}, {label: '袋', value: 0}]
      };
    },
    computed: {},
    created() {
    },
    filters: {},
    methods: {
      submitForm() {
        this.$emit('changeView', {view: 'list'});
      },
      cancel() {
        this.$emit('changeView', {view: 'list'});
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
      margin: 20px;
      h3 {
        color: #03b8cc;
        font-size: inherit;
        font-weight: 400;
        margin-bottom: 10px;
        margin-top: 30px;
      }
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

