<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-row>
        <el-col :span="12">
          <el-input @keyup.enter.native="handleFilter" style="width: 230px;" class="filter-item" placeholder="订单编码"
                    v-model="listQuery.id" size="small">
          </el-input>
  
          <el-date-picker
            class="filter-item"
            @keyup.enter.native="handleFilter"
            v-model="listQuery.timestamp"
            type="datetime"
            placeholder="选择日期时间"
            align="right"
            :picker-options="datePickerOptions"
            size="small">
          </el-date-picker>
          
          <el-button class="filter-item" type="primary" v-waves icon="search" @click="handleFilter" size="small">搜索
          </el-button>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'historyOrderPane',
    components: {},
    data() {
      return {
        list: null,
        total: null,
        listLoading: false,
        listQuery: {
          page: 1,
          limit: 20,
          id: undefined,
          timestamp: undefined
        },
        datePickerOptions: {
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          }, {
            text: '昨天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          }, {
            text: '一周前',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            }
          }]
        }
      };
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
      getList() {
      },
      handleFilter() {
        this.getList();
      }
    }
  };
</script>
<style scoped>

</style>