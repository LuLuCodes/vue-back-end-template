<template>
  <div class="createPost-container">
    <sticky :className="'sub-navbar published'">
      <el-button type="warning" @click="goBack()">返回</el-button>
    </sticky>
    
    <el-tabs>
      <el-tab-pane label="订单详情">
        <order-detail-pane :order-id="orderId"></order-detail-pane>
      </el-tab-pane>
      <el-tab-pane label="物流信息">
      
      </el-tab-pane>
      <el-tab-pane label="操作日志">
      
      </el-tab-pane>
    </el-tabs>
  
  </div>
</template>

<script>
  import Sticky from '../../components/Sticky/index.vue';
  import OrderDetailPane from './orderDetailPane.vue';
  
  export default {
    name: 'EditOrder',
    components: {
      Sticky,
      OrderDetailPane
    },
    data() {
      return {
        orderId: undefined
      };
    },
    props: {
    },
    computed: {},
    created() {
    },
    mounted() {
      this.orderId = parseInt(this.$route.query.id);
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