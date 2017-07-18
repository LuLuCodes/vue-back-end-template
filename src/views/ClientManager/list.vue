<template>
  <div class="app-container calendar-list-container">
    <el-tabs type="border-card">
      <el-tab-pane>
        <span slot="label">
          全部客户
        </span>
        <all-client-pane></all-client-pane>
      </el-tab-pane>
      <el-tab-pane>
        <span slot="label">
          启用客户
          <el-badge :value="200" :max="99" class="badge">
          </el-badge>
        </span>
        <enable-client-pane></enable-client-pane>
      </el-tab-pane>
      <el-tab-pane>
        <span slot="label">
          禁用客户
          <el-badge :value="200" :max="99" class="badge">
          </el-badge>
        </span>
        <disable-client-pane></disable-client-pane>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import AllClientPane from './allClientPane.vue';
  import EnableClientPane from './enableClientPane.vue';
  import DisableClientPane from './disableClientPane.vue';

  export default {
    name: 'client-list',
    data() {
      return {};
    },
    components: {
      AllClientPane,
      EnableClientPane,
      DisableClientPane
    },
    created() {
    },
    filters: {},
    methods: {}
  };
</script>

<style scoped=>
  .badge {
    margin-top: 10px;
    margin-right: 40px;
  }
</style>
