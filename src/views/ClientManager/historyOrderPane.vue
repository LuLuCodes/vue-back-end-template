<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-row>
        <el-col :span="20">
          <el-input @keyup.enter.native="handleFilter" style="width: 230px;" class="filter-item" placeholder="订单编码"
                    v-model="listQuery.id" size="small">
          </el-input>
          
          <el-date-picker
            class="filter-item"
            type="datetimerange"
            @keyup.enter.native="handleFilter"
            v-model="listQuery.timestamp"
            placeholder="选择日期时间"
            align="right"
            :picker-options="datePickerOptions"
            clearable
            size="small">
          </el-date-picker>
          
          <el-select class="filter-item" v-model="listQuery.status" multiple placeholder="请选择订单状态" size="small">
            <el-option
              v-for="item in orderStatus"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          
          <el-button class="filter-item" type="primary" v-waves icon="search" @click="handleFilter" size="small">搜索
          </el-button>
        </el-col>
      </el-row>
    </div>
    
    <el-table :data="list" v-loading="listLoading" element-loading-text="拼命加载中" height="500"
              border fit highlight-current-row style="width: 100%">
      
      <el-table-column align="center" min-width="150" label="订单编码" prop="id">
        <template scope="scope">
          <span class="link-type" @click="handleOrder(scope.row)">{{scope.row.id}}</span>
        </template>
      </el-table-column>
      
      <el-table-column align="center" width="180" label="时间" prop="timestamp">
      </el-table-column>
      
      <el-table-column align="center" width="100" label="状态" prop="status">
        <template scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{scope.row.status | statusFilterTip}}</el-tag>
        </template>
      </el-table-column>
      
      <el-table-column align="center" width="200" label="金额" prop="money">
      </el-table-column>
      
      <el-table-column align="center" width="200" label="收货人" prop="name">
      </el-table-column>
    
    </el-table>
    
    <div v-show="!listLoading" class="pagination-container">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                     :current-page.sync="listQuery.page"
                     :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit"
                     layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  const testData = [
    {name: 'leyi19', id: 1234567890, money: 23.5, timestamp: '2017-07-21 12:23:32', status: 1},
    {name: 'leyi19', id: 1234567890, money: 23.5, timestamp: '2017-07-21 12:23:32', status: 1},
    {name: 'leyi19', id: 1234567890, money: 23.5, timestamp: '2017-07-21 12:23:32', status: 2},
    {name: 'leyi19', id: 1234567890, money: 23.5, timestamp: '2017-07-21 12:23:32', status: 3},
    {name: 'leyi19', id: 1234567890, money: 23.5, timestamp: '2017-07-21 12:23:32', status: 4},
    {name: 'leyi19', id: 1234567890, money: 23.5, timestamp: '2017-07-21 12:23:32', status: 5},
    {name: 'leyi19', id: 1234567890, money: 23.5, timestamp: '2017-07-21 12:23:32', status: 1},
    {name: 'leyi19', id: 1234567890, money: 23.5, timestamp: '2017-07-21 12:23:32', status: 1},
    {name: 'leyi19', id: 1234567890, money: 23.5, timestamp: '2017-07-21 12:23:32', status: 2},
    {name: 'leyi19', id: 1234567890, money: 23.5, timestamp: '2017-07-21 12:23:32', status: 3},
    {name: 'leyi19', id: 1234567890, money: 23.5, timestamp: '2017-07-21 12:23:32', status: 4},
    {name: 'leyi19', id: 1234567890, money: 23.5, timestamp: '2017-07-21 12:23:32', status: 5},
    {name: 'leyi19', id: 1234567890, money: 23.5, timestamp: '2017-07-21 12:23:32', status: 1},
    {name: 'leyi19', id: 1234567890, money: 23.5, timestamp: '2017-07-21 12:23:32', status: 1},
    {name: 'leyi19', id: 1234567890, money: 23.5, timestamp: '2017-07-21 12:23:32', status: 1},
    {name: 'leyi19', id: 1234567890, money: 23.5, timestamp: '2017-07-21 12:23:32', status: 1},
    {name: 'leyi19', id: 1234567890, money: 23.5, timestamp: '2017-07-21 12:23:32', status: 1},
    {name: 'leyi19', id: 1234567890, money: 23.5, timestamp: '2017-07-21 12:23:32', status: 1},
    {name: 'leyi19', id: 1234567890, money: 23.5, timestamp: '2017-07-21 12:23:32', status: 1},
    {name: 'leyi19', id: 1234567890, money: 23.5, timestamp: '2017-07-21 12:23:32', status: 1},
    {name: 'leyi19', id: 1234567890, money: 23.5, timestamp: '2017-07-21 12:23:32', status: 1},
    {name: 'leyi19', id: 1234567890, money: 23.5, timestamp: '2017-07-21 12:23:32', status: 1},
    {name: 'leyi19', id: 1234567890, money: 23.5, timestamp: '2017-07-21 12:23:32', status: 1},
    {name: 'leyi19', id: 1234567890, money: 23.5, timestamp: '2017-07-21 12:23:32', status: 1},
    {name: 'leyi19', id: 1234567890, money: 23.5, timestamp: '2017-07-21 12:23:32', status: 1},
    {name: 'leyi19', id: 1234567890, money: 23.5, timestamp: '2017-07-21 12:23:32', status: 1},
    {name: 'leyi19', id: 1234567890, money: 23.5, timestamp: '2017-07-21 12:23:32', status: 1},
    {name: 'leyi19', id: 1234567890, money: 23.5, timestamp: '2017-07-21 12:23:32', status: 1},
    {name: 'leyi19', id: 1234567890, money: 23.5, timestamp: '2017-07-21 12:23:32', status: 1},
    {name: 'leyi19', id: 1234567890, money: 23.5, timestamp: '2017-07-21 12:23:32', status: 1},
    {name: 'leyi19', id: 1234567890, money: 23.5, timestamp: '2017-07-21 12:23:32', status: 1},
    {name: 'leyi19', id: 1234567890, money: 23.5, timestamp: '2017-07-21 12:23:32', status: 1},
    {name: 'leyi19', id: 1234567890, money: 23.5, timestamp: '2017-07-21 12:23:32', status: 1},
    {name: 'leyi19', id: 1234567890, money: 23.5, timestamp: '2017-07-21 12:23:32', status: 1},
    {name: 'leyi19', id: 1234567890, money: 23.5, timestamp: '2017-07-21 12:23:32', status: 1},
    {name: 'leyi19', id: 1234567890, money: 23.5, timestamp: '2017-07-21 12:23:32', status: 1},
    {name: 'leyi19', id: 1234567890, money: 23.5, timestamp: '2017-07-21 12:23:32', status: 1}
  ];

  export default {
    name: 'HistoryOrderPane',
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
          timestamp: undefined,
          status: []
        },
        orderStatus: [
          {value: 1, label: '待付款'},
          {value: 2, label: '待发货'},
          {value: 3, label: '已发货'},
          {value: 4, label: '已完成'},
          {value: 5, label: '已取消'}
        ],
        datePickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
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
      this.getList();
    },
    activated() {
      // 当组件在 <keep-alive> 内被切换，它的 activated 和 deactivated 这两个生命周期钩子函数将会被对应执行
      // 数据加载应该放在此处
    },
    deactivated() {
      // 当组件在 <keep-alive> 内被切换，它的 activated 和 deactivated 这两个生命周期钩子函数将会被对应执行
      // 数据加载应该放在此处
    },
    filters: {
      statusFilter(status) {
        const statusMap = ['primary', 'success', 'warning', 'danger', 'gray'];
        return statusMap[status - 1];
      },
      statusFilterTip(status) {
        const statusMap = ['待付款', '待发货', '已发货', '已取消', '已完成'];
        return statusMap[status - 1];
      }
    },
    methods: {
      getList() {
        setTimeout((items, total) => {
          this.list = testData.slice(((this.listQuery.page - 1) * this.listQuery.limit), this.listQuery.page * this.listQuery.limit);
          this.total = testData.length;
          this.listLoading = false;
          this.$emit('updateCount', this.total);
        }, 2000);
      },
      handleFilter() {
        this.getList();
      },
      handleOrder() {
      },
      handleSizeChange(val) {
        this.listQuery.limit = val;
        this.getList();
      },
      handleCurrentChange(val) {
        this.listQuery.page = val;
        this.getList();
      }
    }
  };
</script>
<style scoped>

</style>