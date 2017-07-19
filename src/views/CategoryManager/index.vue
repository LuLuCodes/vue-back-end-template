<template>
  <div class="app-container calendar-list-container">
    <el-tree
      :data="data2"
      :props="defaultProps"
      node-key="id"
      default-expand-all
      :expand-on-click-node="false"
      :render-content="renderContent">
    </el-tree>
    
    <simple-confirm-dialog :content="confirmContent" :dialog-visible="dialogVisible">
      <span style="color: red">{{'你确定要删除分类吗？'}}</span>
    </simple-confirm-dialog>
  </div>
</template>

<script type="text/jsx">
  import {SimpleConfirmDialog} from '../../components/ConfirmDialog';
  
  export default {
    name: '',
    components: {
      SimpleConfirmDialog
    },
    data() {
      return {
        confirmContent: '',
        dialogVisible: false,
        data2: [{
          id: 1,
          label: '一级 1',
          children: [{
            id: 4,
            label: '二级 1-1',
            children: [{
              id: 9,
              label: '三级 1-1-1'
            }, {
              id: 10,
              label: '三级 1-1-2'
            }]
          }]
        }, {
          id: 2,
          label: '一级 2',
          children: [{
            id: 5,
            label: '二级 2-1'
          }, {
            id: 6,
            label: '二级 2-2'
          }]
        }, {
          id: 3,
          label: '一级 3',
          children: [{
            id: 7,
            label: '二级 3-1'
          }, {
            id: 8,
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
      append() {},
      edit() {},
      remove(store, data) {
        // this.confirmContent = `你确定要删除分类${data.label}吗？`;
        this.dialogVisible =true;
      }
    }
  };
</script>
<style scoped>

</style>