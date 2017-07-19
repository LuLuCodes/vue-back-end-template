<template>
  <div>
    <div class="filter-container">
      <el-row>
        <el-col :span="12">
          <el-button-group>
            <el-button size="small" type="warning" icon="check">启用</el-button>
            <el-button size="small" type="danger" icon="delete">删除</el-button>
          </el-button-group>
        </el-col>
        <el-col :span="12">
          <el-input @keyup.enter.native="handleFilter" style="width: 230px;" class="filter-item" placeholder="客户编码"
                    v-model="listQuery.id" size="small">
          </el-input>
          <el-input @keyup.enter.native="handleFilter" style="width: 230px;" class="filter-item" placeholder="客户姓名"
                    v-model="listQuery.name" size="small">
          </el-input>
          <el-button class="filter-item" type="primary" v-waves icon="search" @click="handleFilter" size="small">搜索
          </el-button>
        </el-col>
      </el-row>
    </div>
    
    <el-table :data="list" v-loading="listLoading" element-loading-text="拼命加载中" :height="tableHeight" border fit highlight-current-row style="width: 100%"
              :default-sort = "{prop: 'id', order: 'descending'}">
      <el-table-column align="center"
                       type="selection"
                       width="55">
      </el-table-column>
      
      <el-table-column align="center" min-width="200" label="姓名" sortable>
        <template scope="scope">
          <span class="link-type" @click="handleDetail(scope.row)">{{scope.row.name}}</span>
        </template>
      </el-table-column>
      
      <el-table-column align="center" width="150" label="手机号" prop="phone" sortable>
      </el-table-column>
      
      <el-table-column align="center" width="150" label="账户余额" prop="money" sortable>
      </el-table-column>
      
      <el-table-column align="center" label="状态" width="120" sortable>
        <template scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{scope.row.status ? '启用' : '禁用'}}</el-tag>
        </template>
      </el-table-column>
      
      <el-table-column align="center" width="120" label="注册时间" prop="timestamp" sortable>
      </el-table-column>
      
      <el-table-column align="center" label="操作" width="150">
        <template scope="scope">
          <el-button v-if="scope.row.status === 0" size="small" type="info" @click="handleModifyStatus(scope.row, 1)">启用
          </el-button>
          <el-button v-if="scope.row.status === 1" size="small" type="warning"
                     @click="handleModifyStatus(scope.row, 0)">禁用
          </el-button>
          <el-button size="small" type="danger" @click="handleDelete(scope.row)">删除
          </el-button>
        </template>
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
  import {parseTime} from '../../assets/js/tool';

  const testData = [
    {id: 100001, name: 'leyi19', timestamp: '2017-07-17 12:12:12', status: 0, phone: '13758087094', money: '20.4'},
    {id: 100002, name: 'leyi9', timestamp: '2017-07-18 12:12:12', status: 0, phone: '13758087094', money: '20.4'},
    {id: 100003, name: 'leyi8', timestamp: '2017-07-19 12:12:12', status: 0, phone: '13758087094', money: '20.4'},
    {id: 100004, name: 'leyi7', timestamp: '2017-07-20 12:12:12', status: 0, phone: '13758087094', money: '20.4'},
    {id: 100005, name: 'leyi6', timestamp: '2017-07-21 12:12:12', status: 0, phone: '13758087094', money: '20.4'},
    {id: 100006, name: 'leyi5', timestamp: '2017-07-22 12:12:12', status: 0, phone: '13758087094', money: '20.4'},
    {id: 100007, name: 'leyi', timestamp: '2017-07-23 12:12:12', status: 0, phone: '13758087099', money: '20.4'},
    {id: 100008, name: 'leyi', timestamp: '2017-07-24 12:12:12', status: 0, phone: '13758087098', money: '20.4'},
    {id: 100009, name: 'leyi', timestamp: '2017-07-25 12:12:12', status: 0, phone: '13758087097', money: '20.4'},
    {id: 100010, name: 'leyi', timestamp: '2017-07-26 12:12:12', status: 0, phone: '13758087096', money: '20.4'},
    {id: 100011, name: 'leyi', timestamp: '2017-07-27 12:12:12', status: 0, phone: '13758087095', money: '20.4'},
    {id: 100012, name: 'leyi', timestamp: '2017-07-28 12:12:12', status: 0, phone: '13758087094', money: '20.4'},
    {id: 100013, name: 'leyi', timestamp: '2017-07-29 12:12:12', status: 0, phone: '13758087093', money: '20.4'},
    {id: 100014, name: 'leyi', timestamp: '2017-07-30 12:12:12', status: 0, phone: '13758087092', money: '20.4'},
    {id: 100015, name: 'leyi', timestamp: '2017-07-17 12:12:12', status: 0, phone: '13758087091', money: '20.4'},
    {id: 100016, name: 'leyi', timestamp: '2017-07-17 12:12:12', status: 0, phone: '13758087094', money: '20.4'},
    {id: 100017, name: 'leyi', timestamp: '2017-07-17 12:12:12', status: 0, phone: '13758087094', money: '20.4'},
    {id: 100018, name: 'leyi', timestamp: '2017-07-17 12:12:12', status: 0, phone: '13758087094', money: '20.4'},
    {id: 100019, name: 'leyi', timestamp: '2017-07-17 12:12:12', status: 0, phone: '13758087094', money: '20.4'},
    {id: 100020, name: 'leyi', timestamp: '2017-07-17 12:12:12', status: 0, phone: '13758087094', money: '20.4'},
    {id: 100021, name: 'leyi', timestamp: '2017-07-17 12:12:12', status: 0, phone: '13758087094', money: '20.4'},
    {id: 100022, name: 'leyi', timestamp: '2017-07-17 12:12:12', status: 0, phone: '13758087094', money: '20.4'},
    {id: 100023, name: 'leyi', timestamp: '2017-07-17 12:12:12', status: 0, phone: '13758087094', money: '20.4'},
    {id: 100024, name: 'leyi', timestamp: '2017-07-17 12:12:12', status: 0, phone: '13758087094', money: '20.4'},
    {id: 100025, name: 'leyi', timestamp: '2017-07-17 12:12:12', status: 0, phone: '13758087094', money: '20.4'},
    {id: 100026, name: 'leyi', timestamp: '2017-07-17 12:12:12', status: 0, phone: '13758087094', money: '20.4'},
    {id: 100027, name: 'leyi', timestamp: '2017-07-17 12:12:12', status: 0, phone: '13758087094', money: '20.4'},
    {id: 100028, name: 'leyi', timestamp: '2017-07-17 12:12:12', status: 0, phone: '13758087094', money: '20.4'},
    {id: 100029, name: 'leyi', timestamp: '2017-07-17 12:12:12', status: 0, phone: '13758087094', money: '20.4'},
    {id: 100030, name: 'leyi', timestamp: '2017-07-17 12:12:12', status: 0, phone: '13758087094', money: '20.4'}
  ];
  export default {
    name: 'EnableClientPane',
    data() {
      return {
        tableHeight: 0,
        list: null,
        total: null,
        listLoading: false,
        listQuery: {
          page: 1,
          limit: 20,
          id: undefined,
          name: undefined
        },
        swiperStatus: [{label: '启用', value: 1}, {label: '禁用', value: 0}]
      };
    },
    created() {
      this.tableHeight = document.documentElement.clientHeight - (50 + 21 + 42 + 15 + 150);
      $(window).resize(() => {
        this.tableHeight = document.documentElement.clientHeight - (50 + 21 + 42 + 15 + 150);
      });
      this.getList();
    },
    filters: {
      parseTime(time) {
        return parseTime(time);
      },
      statusFilter(status) {
        const statusMap = ['danger', 'success'];
        return statusMap[status];
      }
    },
    methods: {
      getList() {
        this.listLoading = true;
        setTimeout((items, total) => {
          this.list = testData.slice(((this.listQuery.page - 1) * this.listQuery.limit), this.listQuery.page * this.listQuery.limit);
          this.total = testData.length;
          this.listLoading = false;
          this.$emit('updateCount', this.total);
        }, 2000);
      },
      handleSizeChange(val) {
        this.listQuery.limit = val;
        this.getList();
      },
      handleCurrentChange(val) {
        this.listQuery.page = val;
        this.getList();
      },
      handleFilter() {
        this.getList();
      },
      handleDetail(client) {
        this.$emit('goToDetial', client.id);
      }
    }
  };
</script>

