<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogVisible"
    size="tiny"
    :show-close="false"
    :close-on-press-escape="false"
    :close-on-click-modal="false"
    :before-close="handleClose">
    <span v-if="content">{{content}}</span>
    <slot></slot>
    <span slot="footer" class="dialog-footer">
      <el-button @click="cancel">取 消</el-button>
      <el-button type="primary" @click="confirm">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
  export default {
    name: 'SimpleConfirmDialog',
    components: {},
    data() {
      return {};
    },
    props: {
      title: {
        type: String,
        default: '提示'
      },
      content: {
        type: String,
        default: ''
      },
      dialogVisible: {
        type: Boolean,
        default: false
      }
    },
    computed: {},
    created() {
    },
    filters: {},
    methods: {
      cancel() {
        this.dialogVisible = false;
      },
      confirm() {
        this.dialogVisible = false;
        this.$emit('confirm');
      }
    }
  };
</script>
<style scoped>

</style>