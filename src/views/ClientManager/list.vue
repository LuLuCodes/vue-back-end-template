<template>
  <div class="app-container calendar-list-container">
    <el-tabs type="border-card">
      <el-tab-pane>
        <span slot="label">
          全部客户
          <el-badge :value="allClientCount" :max="99" class="badge">
          </el-badge>
        </span>
        <all-client-pane @updateCount="updateAllCount" @goToDetial="goToDetial"></all-client-pane>
      </el-tab-pane>
      <el-tab-pane>
        <span slot="label">
          启用客户
          <el-badge :value="enableClientCount" :max="99" class="badge">
          </el-badge>
        </span>
        <enable-client-pane @updateCount="updateEnableCount" @goToDetial="goToDetial"></enable-client-pane>
      </el-tab-pane>
      <el-tab-pane>
        <span slot="label">
          禁用客户
          <el-badge :value="disableClientCount" :max="99" class="badge">
          </el-badge>
        </span>
        <disable-client-pane @updateCount="updateDisableCount" @goToDetial="goToDetial"></disable-client-pane>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import AllClientPane from './allClientPane.vue';
  import EnableClientPane from './enableClientPane.vue';
  import DisableClientPane from './disableClientPane.vue';

  export default {
    name: 'ClientList',
    data() {
      return {
        allClientCount: 0,
        enableClientCount: 0,
        disableClientCount: 0
      };
    },
    components: {
      AllClientPane,
      EnableClientPane,
      DisableClientPane
    },
    created() {
    },
    filters: {},
    methods: {
      updateAllCount(val) {
        this.allClientCount = val;
      },
      updateEnableCount(val) {
        this.enableClientCount = val;
      },
      updateDisableCount(val) {
        this.disableClientCount = val;
      },
      goToDetial(id) {
        this.jump({path: '/client/edit-client', query: { id }});
      }
    }
  };
</script>

<style scoped=>
  .badge {
    margin-top: 10px;
    margin-right: 40px;
  }
</style>
