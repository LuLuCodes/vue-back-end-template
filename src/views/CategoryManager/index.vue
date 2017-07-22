<template>
  <div class="app-container calendar-list-container">
    <el-tree
      :data="data2"
      :props="defaultProps"
      node-key="value"
      default-expand-all
      :expand-on-click-node="false"
      :render-content="renderContent">
    </el-tree>
  
    <el-dialog :title="isNewCategoryDialog? '新增分类':'编辑分类'" :visible.sync="showNewOrEditDialog">
      <el-form :model="category">
        <el-form-item label="分类名称" label-width="120px">
          <el-input v-model="category.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="上级分类" label-width="120px">
          <el-cascader
            expand-trigger="hover"
            :options="data2"
            v-model="category.parent"
            @change="handleChangeParentCategory">
          </el-cascader>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showNewOrEditDialog = false">取 消</el-button>
        <el-button type="primary" @click="showNewOrEditDialog = false">确 定</el-button>
      </div>
    </el-dialog>
    
    <simple-confirm-dialog :content="confirmContent" :show-dialog="showConfrmDialog" @closeDialog="showConfrmDialog = false" @confirm="showConfrmDialog = false">
      <span style="color: red">{{'你确定要删除分类吗？'}}</span>
    </simple-confirm-dialog>
  </div>
</template>

<script type="text/jsx">
  import {SimpleConfirmDialog} from '../../components/ConfirmDialog';
  
  export default {
    name: 'CategoryManager',
    components: {
      SimpleConfirmDialog
    },
    data() {
      return {
        category: {
          name: '',
          parent: undefined
        },
        isNewCategoryDialog: false,
        confirmContent: '',
        showNewOrEditDialog: false,
        showConfrmDialog: false,
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
        defaultProps: {
          children: 'children',
          label: 'label'
        }
      };
    },
    props: {},
    computed: {},
    created() {
    },
    filters: {},
    methods: {
      renderContent(h, {node, data, store}) {
        return (
          <span>
            <span>
              <span>{node.label}</span>
            </span>
            <span style="float: right; margin-right: 20px">
              <el-button-group>
                <el-button size="mini" type="info" icon="plus" on-click={() => this.append(store, data)}>新增</el-button>
                <el-button size="mini" type="warning" icon="edit" on-click={() => this.edit(store, data)}>编辑</el-button>
                <el-button size="mini" type="danger" icon="delete" on-click={() => this.remove(store, data)}>删除</el-button>
              </el-button-group>
            </span>
          </span>
        );
      },
      append() {
        this.isNewCategoryDialog = true;
        this.showNewOrEditDialog = true;
      },
      edit() {
        this.isNewCategoryDialog = false;
        this.showNewOrEditDialog = true;
      },
      remove(store, data) {
        // this.confirmContent = `你确定要删除分类${data.label}吗？`;
        this.showConfrmDialog =true;
      },
      handleChangeParentCategory() {
      }
    }
  };
</script>
<style scoped>

</style>