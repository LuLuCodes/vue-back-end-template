<template>
  <div class="createPost-container">
    <sticky :className="'sub-navbar published'">
      <el-button type="warning" @click="goBack()">返回</el-button>
    </sticky>
  
    <el-tabs>
      <el-tab-pane label="基础信息">
        <base-info-pane :client-id="clientId"></base-info-pane>
      </el-tab-pane>
      <el-tab-pane label="收货地址">
        <delivery-address-pane :client-id="clientId"></delivery-address-pane>
      </el-tab-pane>
      <el-tab-pane label="历史订单">
        <history-order-pane :client-id="clientId"></history-order-pane>
      </el-tab-pane>
      <el-tab-pane label="账户钱包">账户钱包</el-tab-pane>
      <el-tab-pane label="优惠券">优惠券</el-tab-pane>
    </el-tabs>
    
  </div>
</template>

<script>
  import Sticky from '../../components/Sticky/index.vue';
  import BaseInfoPane from './baseInfoPane.vue';
  import DeliveryAddressPane from './deliveryAddressPane.vue';
  import HistoryOrderPane from './historyOrderPane.vue';
  
  export default {
    name: 'ClientManagerEdit',
    components: {
      Sticky,
      BaseInfoPane,
      DeliveryAddressPane,
      HistoryOrderPane
    },
    data() {
      return {
        clientId: undefined
      };
    },
    props: {
    },
    computed: {},
    created() {
      console.log(123123);
      this.clientId = parseInt(this.$route.query.id);
    },
    mounted() {
    },
    activated() {
      // 当组件在 <keep-alive> 内被切换，它的 activated 和 deactivated 这两个生命周期钩子函数将会被对应执行
      // 数据加载应该放在此处
    },
    deactivated() {
      // 当组件在 <keep-alive> 内被切换，它的 activated 和 deactivated 这两个生命周期钩子函数将会被对应执行
      // 数据加载应该放在此处
    },
    filters: {},
    methods: {
      goBack() {
        this.$router.go(-1);
      }
    }
  };
</script>
<style scoped>

</style>