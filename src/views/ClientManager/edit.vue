<template>
  <div class="createPost-container">
    <sticky :className="'sub-navbar published'">
      <el-button type="warning" @click="goBack()">返回</el-button>
    </sticky>
  </div>
</template>

<script>
  import Sticky from '../../components/Sticky/index.vue';
  
  export default {
    name: '',
    components: {
      Sticky
    },
    data() {
      return {};
    },
    props: {
      clientId: {
        type: Number,
        default: 0
      }
    },
    computed: {},
    created() {
    },
    filters: {},
    methods: {
      goBack() {
        this.$emit('changeView', {view: 'list'});
      }
    }
  };
</script>
<style scoped>

</style>