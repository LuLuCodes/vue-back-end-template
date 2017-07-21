<template>
  <el-dialog
    :title="title"
    :visible.sync="showDialog"
    size="tiny"
    :show-close="false"
    :close-on-press-escape="false"
    :close-on-click-modal="false"
    :open="handleOpen">
    <el-form :model="form">
      <el-form-item>
        <el-input
          type="textarea"
          :rows="10"
          placeholder="请输入内容"
          :maxlength="maxLength"
          v-model="form.name">
        </el-input>
        <span style="font-size: 12px;color: darkgrey;">备注信息最多支持{{maxLength}}字</span>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="showDialog = false">取 消</el-button>
      <el-button type="primary" @click="showDialog = false">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  export default {
    name: 'RemarkDialog',
    components: {},
    data() {
      return {
        form: {
          content: ''
        }
      };
    },
    props: {
      title: {
        type: String,
        default: '添加备注'
      },
      content: {
        type: String,
        default: ''
      },
      showDialog: {
        type: Boolean,
        default: false
      },
      maxLength: {
        type: Number,
        default: 500
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
      },
      handleOpen() {
        this.from.content = this.content;
      }
    }
  };
</script>
<style scoped>

</style>