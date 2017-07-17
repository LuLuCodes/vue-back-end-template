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
  
    <el-tabs type="border-card" style="margin: 20px;">
      <el-tab-pane v-if="postForm.linkType === 1" label="多个商品选择">
        <div class="filter-container">
          <el-row>
            <el-col :span="12">
              <el-button-group>
                <el-button size="small" type="success" icon="plus" @click="showGoodListDialog = true">新增</el-button>
                <el-button size="small" type="danger" icon="delete">删除</el-button>
              </el-button-group>
            </el-col>
          </el-row>
  
          <el-table :data="goodMultiList" height="200" fit highlight-current-row style="width: 100%;margin-top: 10px;">
            <el-table-column  align="center"
                              type="selection"
                              width="55">
            </el-table-column>
  
            <el-table-column align="center" width="240px" label="商品主图">
              <template scope="scope">
                <img :src="scope.row.url" style="width: 240px;height: 120px;padding-top: 5px;"/>
              </template>
            </el-table-column>
            
            <el-table-column align="center" min-width="200px" label="商品名称">
              <template scope="scope">
                <span class="link-type">{{scope.row.title}}</span>
              </template>
            </el-table-column>
  
            <el-table-column align="center" min-width="200px" label="商品编码">
              <template scope="scope">
                <span class="link-type">{{scope.row.id}}</span>
              </template>
            </el-table-column>
    
            <el-table-column align="center" label="状态" width="100">
              <template scope="scope">
                <el-tag :type="scope.row.status | statusFilter">{{scope.row.status ? '已发布':'未发布'}}</el-tag>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-tab-pane>
      <el-tab-pane v-if="postForm.linkType === 2" label="单个商品选择">单个商品选择</el-tab-pane>
      <el-tab-pane v-if="postForm.linkType === 3" label="外部链接">外部链接</el-tab-pane>
    </el-tabs>
    
    <sample-good-list-dialog :show-dialog="showGoodListDialog"></sample-good-list-dialog>
  </div>
</template>

<script>
  import Sticky from '../../components/Sticky/index.vue';
  import {CropAndUpload} from '../../components/ImageUpload';
  import {SampleGoodListDialog} from '../../components/GoodListDialog/index';
  
  export default {
    name: 'add-swiper',
    components: {
      Sticky,
      CropAndUpload,
      SampleGoodListDialog
    },
    data() {
      return {
        showGoodListDialog: false,
        goodMultiList: [],
        postForm: {
          name: '',
          linkType: 1,
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
      margin: 20px;
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

