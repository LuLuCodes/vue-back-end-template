<template>
  <div class="createPost-container">
    <el-form class="form-container" :model="postForm" :rules="rules" ref="postForm" label-width="80px"
             label-position="right">
      <sticky :className="'sub-navbar published'" :zIndex="2">
        <el-button v-loading="loading" style="margin-left: 10px;" type="success" @click="submitForm()">保存
        </el-button>
        <el-button type="warning" @click="cancel()">取消</el-button>
      </sticky>
      
      <div class="createPost-main-container">
        <!--基础信息-->
        <h3>基础信息</h3>
        <el-row>
          <el-col :span="12">
            <el-form-item label="商品名称" prop="name">
              <el-input v-model="postForm.name" size="small"></el-input>
            </el-form-item>
          </el-col>
          
          
          <el-col :span="10" :push="1">
            <el-form-item label="商品分类" prop="categoryId">
              <el-cascader
                v-model="postForm.categoryId"
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
        </el-row>
  
        <el-row>
          <el-col :span="12">
            <el-form-item label="商品标签" prop="tags">
              <el-checkbox size="small" :indeterminate="isIndeterminateTag" v-model="checkAllTag"
                           @change="handleCheckAllTagChange">全选
              </el-checkbox>
              <el-checkbox-group v-model="postForm.tags" @change="handleCheckedTagsChange"
                                 style="display: inline-block;margin-left: 15px;">
                <el-checkbox size="small" v-for="tag in tags" :label="tag.id" :key="tag.id">{{tag.name}}
                </el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-col>
        </el-row>
        
        <!--商品规格-->
        <h3>商品规格</h3>
        <div class="filter-container">
          <el-button size="small" type="success" icon="plus" @click="addSku">新增</el-button>
        </div>
        <el-table :data="postForm.skus" border fit highlight-current-row style="width: 100%">
          <el-table-column align="center" min-width="300px" label="规格名称">
            <template scope="scope">
              <el-input size="small" v-model="scope.row.name"></el-input>
            </template>
          </el-table-column>
  
          <el-table-column align="center" width="200px" label="价格">
            <template scope="scope">
              <el-input-number :controls="false" size="small" v-model="scope.row.price" :min="1"></el-input-number>
            </template>
          </el-table-column>
          
          <el-table-column align="center" width="300px" label="库存">
            <template scope="scope">
              <el-input-number size="small" v-model="scope.row.stock" :min="1"></el-input-number>
              <el-checkbox size="small">无限库存</el-checkbox>
            </template>
          </el-table-column>
    
          <el-table-column align="center" label="操作" width="120">
            <template scope="scope">
              <el-button size="small" type="danger" icon="delete">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
  
        <!--商品图片-->
        <h3>商品图片<span style="font-size: 12px;color: darkgrey;">最多20张，默认第一张图片作为主图，可以拖动图片调整</span></h3>
        <el-upload
          action="https://jsonplaceholder.typicode.com/posts/"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handlePictureRemove"
          :before-upload="beforeAvatarUpload"
          :on-success="handlePictureSuccess"
          multiple>
          <i class="el-icon-plus"></i>
        </el-upload>
  
        <el-dialog v-model="showImagePreview" size="tiny">
          <img width="100%" :src="previewImageUrl" alt="">
        </el-dialog>
  
        <!--商品详情-->
        <h3>商品详情</h3>
        <div id="editor">
          <p>请在此编辑商品详情</p>
        </div>
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
  import sortable from 'html5sortable';
  import wangeditor from 'wangeditor';
  
  export default {
    name: 'AddGood',
    components: {
      Sticky,
      CropAndUpload,
      BackToTop
    },
    data() {
      return {
        editor: undefined,
        postForm: {
          name: '',
          categoryId: undefined,
          unitId: undefined,
          tags: [],
          skus: []
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
          ],
          skus: [
            {required: true, message: '请设置商品单位', trigger: 'blur'}
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
        unitList: [{label: '件', value: 1}, {label: '袋', value: 0}],
        tags: [{id: 1, name: '新品上架'}, {id: 2, name: '热卖促销'}, {id: 3, name: '新客优惠'}],
        checkAllTag: true,
        isIndeterminateTag: true,
        showImagePreview: false,
        previewImageUrl: ''
      };
    },
    computed: {},
    created() {
      this.$nextTick(() => {
        sortable('.el-upload-list--picture-card', {
          items: '.el-upload-list__item',
          forcePlaceholderSize: true,
          placeholderClass: 'my-sortable-placeholder'
        });
        sortable('.el-upload-list--picture-card')[0].addEventListener('sortupdate', (e) => {
          // 调整图片顺序后，更新图片列表数组
          console.log(`e.detail.index: ${e.detail.index}`);
          console.log(`e.detail.oldindex: ${e.detail.oldindex}`);
        });
      });
    },
    mounted() {
      this.editor = new wangeditor('#editor');
      this.editor.create();
    },
    filters: {},
    methods: {
      submitForm() {
        this.$router.go(-1);
      },
      cancel() {
        this.$router.go(-1);
      },
      handleCheckAllTagChange(event) {
        let tags = [];
        for (let tag of this.tags) {
          tags.push(tag.id);
        }
        this.postForm.tags = event.target.checked ? tags : [];
        this.isIndeterminateTag = false;
      },
      handleCheckedTagsChange(value) {
        let checkedCount = value.length;
        this.checkAllTag = checkedCount === this.tags.length;
        this.isIndeterminateTag = checkedCount > 0 && checkedCount < this.tags.length;
      },
      addSku() {
        this.postForm.skus.push({name: '', stock: 1, price: 1});
      },
      handlePictureRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        this.previewImageUrl = file.url;
        this.showImagePreview = true;
      },
      beforeAvatarUpload(file) {
//        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

//        if (!isJPG) {
//          this.$message.error('上传头像图片只能是 JPG 格式!');
//        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isLt2M;
      },
      handlePictureSuccess(response, file, fileList) {
        this.$nextTick(() => {
          sortable('.el-upload-list--picture-card', {
            items: '.el-upload-list__item',
            forcePlaceholderSize: true,
            placeholderClass: 'my-sortable-placeholder'
          });
        });
      }
    }
  };
</script>

<style rel="stylesheet/scss" lang="scss">
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
      .my-sortable-placeholder{
        height: 148px;
        display: inline-block;
        width: 148px;
        border: 1px dashed #ccc;
        margin: 0 8px 8px 0;
        border-radius: 6px;
      }
      
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

