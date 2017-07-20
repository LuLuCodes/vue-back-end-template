<template>
  <div class="createPost-container">
    <el-form class="form-container" :model="postForm" :rules="rules" ref="postForm" label-width="100px" label-position="right">
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
  
        <el-form-item label="轮播图设置" prop="image_uri">
          <el-col :span="24" >
            <crop-and-upload v-model="postForm.image_uri" :preview-size="{width: 720, height: 288}"></crop-and-upload>
          </el-col>
        </el-form-item>
        
      </div>
    </el-form>
  
    <el-tabs v-show="postForm.linkType === 1" type="border-card" style="margin: 20px;">
      <el-tab-pane label="多个商品选择">
        <div class="filter-container">
          <el-row>
            <el-col :span="12">
              <el-button-group>
                <el-button size="small" type="success" icon="plus" @click="showMultiSelectGoodListDialog = true">新增</el-button>
                <el-button size="small" type="danger" icon="delete">删除</el-button>
              </el-button-group>
            </el-col>
          </el-row>
  
          <el-table :data="goodMultiList" height="400" fit highlight-current-row style="width: 100%;margin-top: 10px;">
            <el-table-column  align="center"
                              type="selection"
                              width="55">
            </el-table-column>
  
            <el-table-column align="center" width="120" label="商品主图">
              <template scope="scope">
                <img :src="scope.row.url" style="width: 120px;height: 100px;padding-top: 5px;"/>
              </template>
            </el-table-column>
            
            <el-table-column align="center" min-width="200" label="商品名称">
              <template scope="scope">
                <span class="link-type">{{scope.row.title}}</span>
              </template>
            </el-table-column>
  
            <el-table-column align="center" width="200" label="商品编码">
              <template scope="scope">
                <span class="link-type">{{scope.row.id}}</span>
              </template>
            </el-table-column>
    
            <el-table-column align="center" label="状态" width="100">
              <template scope="scope">
                <el-tag :type="scope.row.status | statusFilter">{{scope.row.status ? '可售':'停售'}}</el-tag>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-tab-pane>
    </el-tabs>
  
    <el-tabs v-show="postForm.linkType === 2" type="border-card" style="margin: 20px;">
      <el-tab-pane label="单个商品选择">
        <div class="filter-container">
          <el-row>
            <el-col :span="12">
              <el-button-group>
                <el-button size="small" type="success" icon="plus" @click="showSingleSelectGoodDialogDialog = true">新增</el-button>
                <el-button size="small" type="danger" icon="delete">删除</el-button>
              </el-button-group>
            </el-col>
          </el-row>
      
          <el-table :data="goodSingleList" height="400" fit highlight-current-row style="width: 100%;margin-top: 10px;">
            <el-table-column align="center" width="120" label="商品主图">
              <template scope="scope">
                <img :src="scope.row.url" style="width: 120px;height: 100px;padding-top: 5px;"/>
              </template>
            </el-table-column>
        
            <el-table-column align="center" min-width="200" label="商品名称">
              <template scope="scope">
                <span class="link-type">{{scope.row.title}}</span>
              </template>
            </el-table-column>
        
            <el-table-column align="center" width="200" label="商品编码">
              <template scope="scope">
                <span class="link-type">{{scope.row.id}}</span>
              </template>
            </el-table-column>
        
            <el-table-column align="center" label="状态" width="100">
              <template scope="scope">
                <el-tag :type="scope.row.status | statusFilter">{{scope.row.status ? '可售':'停售'}}</el-tag>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-tab-pane>
    </el-tabs>
  
    <el-tabs v-show="postForm.linkType === 3" type="border-card" style="margin: 20px;">
      <el-tab-pane label="外部链接">外部链接</el-tab-pane>
    </el-tabs>
    
    <multi-select-good-list-dialog :selected-good-list ="goodMultiList" :show-dialog="showMultiSelectGoodListDialog" @closeDialog="showMultiSelectGoodListDialog = false" @submitSelectGood="submitMutliSelectGood"></multi-select-good-list-dialog>
    <single-select-good-dialog :show-dialog="showSingleSelectGoodDialogDialog" @closeDialog="showSingleSelectGoodDialogDialog = false" @submitSelectGood="submitSingleSelectGood"></single-select-good-dialog>
  
    <el-tooltip placement="top" content="回到顶部">
      <back-to-top transitionName="fade" :visibilityHeight="300" :backPosition="50"></back-to-top>
    </el-tooltip>
  </div>
</template>

<script>
  import BackToTop from '../../components/BackToTop/index.vue';
  import Sticky from '../../components/Sticky/index.vue';
  import {CropAndUpload} from '../../components/ImageUpload';
  import {SingleSelectGoodDialog, MultiSelectGoodListDialog} from '../../components/GoodListDialog/index';
  
  export default {
    name: 'AddSwiper',
    components: {
      Sticky,
      CropAndUpload,
      MultiSelectGoodListDialog,
      SingleSelectGoodDialog,
      BackToTop
    },
    data() {
      return {
        showMultiSelectGoodListDialog: false,
        showSingleSelectGoodDialogDialog: false,
        goodMultiList: [],
        goodSingleList: [],
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
    filters: {
      statusFilter(status) {
        const statusMap = ['danger', 'success'];
        return statusMap[status];
      }
    },
    methods: {
      submitForm() {
        this.$router.go(-1);
      },
      cancel() {
        this.$router.go(-1);
      },
      submitMutliSelectGood(selectGoodList) {
        this.goodMultiList.splice(0, this.goodMultiList.length, ...selectGoodList);
      },
      submitSingleSelectGood(selectGood) {
        this.goodSingleList.splice(0, this.goodMultiList.length, selectGood);
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

