<template>
  <div class="app-container calendar-list-container">
    <transition name="component-fade" mode="out-in">
      <div class="filter-container" v-if="!selectOrders.length">
        <el-row>
          <el-col :span="14">
            <el-select clearable style="width: 100px" class="filter-item" v-model="listQuery.status" placeholder="状态"
                       size="small">
              <el-option v-for="item in orderStatus" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
        
            <el-input @keyup.enter.native="handleFilter" style="width: 230px;" class="filter-item"
                      placeholder="请输入订单号" v-model="listQuery.orderId" size="small">
            </el-input>
        
        
            <el-button class="filter-item" type="primary" v-waves icon="search" @click="handleFilter" size="small">搜索
            </el-button>
        
            <!--高级搜索popover-->
            <el-popover
              ref="advancedSearchPopover"
              placement="top-start"
              width="1000"
              trigger="click"
              v-model="showAdvancedSearchPopover">
              <el-form label-width="80px" label-position="right">
                <el-row>
                  <el-col :span="10">
                    <el-form-item label="关键词">
                      <el-input size="small" placeholder="请输入订单号" style="width: 300px;"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="下单时间">
                      <el-date-picker
                        type="datetimerange"
                        :picker-options="dateTimePickerOptions"
                        placeholder="选择时间范围"
                        clearable
                        align="right">
                      </el-date-picker>
                    </el-form-item>
                  </el-col>
                </el-row>
            
                <el-row>
                  <el-col :span="10">
                    <el-form-item label="收货人信息">
                      <el-input size="small" placeholder="请输入收货人/收货电话" style="width: 300px;"></el-input>
                    </el-form-item>
                  </el-col>
              
                  <el-col :span="10">
                    <el-form-item label="商品信息">
                      <el-input size="small" placeholder="请输入商品名称/编码" style="width: 300px;"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
            
                <el-row>
                  <el-col :span="24">
                    <el-form-item label="订单状态">
                      <el-checkbox size="small" :indeterminate="isIndeterminateStatus" v-model="checkAllStatus"
                                   @change="handleCheckAllStatusChange">全选
                      </el-checkbox>
                      <el-checkbox-group v-model="checkedStatuss" @change="handleCheckedStatusChange"
                                         style="display: inline-block;margin-left: 15px;">
                        <el-checkbox size="small" v-for="status in orderStatus" :label="status.value" :key="status.value">
                          {{status.label}}
                        </el-checkbox>
                      </el-checkbox-group>
                    </el-form-item>
                  </el-col>
                </el-row>
            
                <el-form-item>
                  <el-button type="primary" size="small">确定</el-button>
                  <el-button size="small" @click="showAdvancedSearchPopover = false">取消</el-button>
                </el-form-item>
              </el-form>
            </el-popover>
            <el-button class="filter-item" type="primary" v-waves icon="menu" v-popover:advancedSearchPopover size="small"
                       style="margin-left: 0;">高级搜索
            </el-button>
          </el-col>
        </el-row>
      </div>
      <div class="filter-container order-operation-meun" v-else>
        <el-row>
          <el-col :span="2">
            已选中<span style="color: #13c19f">{{selectOrders.length}}</span>项
          </el-col>
          <el-col :span="1">
            |
          </el-col>
          <el-col :span="2">
            <i class="fa fa-truck fa-lg"></i> 确认发货
          </el-col>
          <el-col :span="2">
            <i class="fa fa-trash fa-lg"></i> 取消订单
          </el-col>
        </el-row>
      </div>
    </transition>
    
  
    <el-table :data="list" v-loading="listLoading" element-loading-text="拼命加载中" :height="tableHeight" border stripe fit
              highlight-current-row style="width: 100%" @select="handleSelection" @select-all="handleSelectionAll">
      <el-table-column align="center"
                       type="selection"
                       width="55">
      </el-table-column>
    
      <el-table-column align="center" min-width="100px" label="订单号" show-overflow-tooltip>
        <template scope="scope">
          <span class="link-type" @click="handleDetail(scope.row)">{{scope.row.orderId}}</span>
        </template>
      </el-table-column>
  
      <el-table-column align="center" min-width="150px" label="订单编码" show-overflow-tooltip>
        <template scope="scope">
          <span class="link-type" @click="handleDetail(scope.row)">{{scope.row.orderCode}}</span>
        </template>
      </el-table-column>
    
      <el-table-column align="center" width="180px" label="下单时间" prop="timestamp" sortable>
      </el-table-column>
  
      <el-table-column align="center" min-width="200px" label="收货人" prop="receiver" sortable show-overflow-tooltip>
      </el-table-column>
    
      <el-table-column align="center" width="200px" label="金额" prop="money">
      </el-table-column>
    
      <el-table-column align="center" label="状态" width="100">
        <template scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{scope.row.status | statusFilterTip}}</el-tag>
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
  import keepAliveList from '../keepAliveList';

  const testData = [
    {orderId: 95601, orderCode: 'DH-O-20170721-095606', timestamp: '2017-07-21 12:45:32', receiver: 'leyi', money: '45.34', status: 1},
    {orderId: 95601, orderCode: 'DH-O-20170721-095601', timestamp: '2017-07-21 12:45:32', receiver: 'leyi', money: '45.34', status: 2},
    {orderId: 95601, orderCode: 'DH-O-20170721-095602', timestamp: '2017-07-21 12:45:32', receiver: 'leyi', money: '45.34', status: 3},
    {orderId: 95601, orderCode: 'DH-O-20170721-095603', timestamp: '2017-07-21 12:45:32', receiver: 'leyi', money: '45.34', status: 4},
    {orderId: 95601, orderCode: 'DH-O-20170721-095604', timestamp: '2017-07-21 12:45:32', receiver: 'leyi', money: '45.34', status: 5},
    {orderId: 95601, orderCode: 'DH-O-20170721-095605', timestamp: '2017-07-21 12:45:32', receiver: 'leyi', money: '45.34', status: 1},
    {orderId: 95601, orderCode: 'DH-O-20170721-095607', timestamp: '2017-07-21 12:45:32', receiver: 'leyi', money: '45.34', status: 1},
    {orderId: 95601, orderCode: 'DH-O-20170721-095608', timestamp: '2017-07-21 12:45:32', receiver: 'leyi', money: '45.34', status: 2},
    {orderId: 95601, orderCode: 'DH-O-20170721-095601', timestamp: '2017-07-21 12:45:32', receiver: 'leyi', money: '45.34', status: 2},
    {orderId: 95601, orderCode: 'DH-O-20170721-095606', timestamp: '2017-07-21 12:45:32', receiver: 'leyi', money: '45.34', status: 2},
    {orderId: 95601, orderCode: 'DH-O-20170721-095606', timestamp: '2017-07-21 12:45:32', receiver: 'leyi', money: '45.34', status: 3},
    {orderId: 95601, orderCode: 'DH-O-20170721-095606', timestamp: '2017-07-21 12:45:32', receiver: 'leyi', money: '45.34', status: 4},
    {orderId: 95601, orderCode: 'DH-O-20170721-095606', timestamp: '2017-07-21 12:45:32', receiver: 'leyi', money: '45.34', status: 5},
    {orderId: 95601, orderCode: 'DH-O-20170721-095606', timestamp: '2017-07-21 12:45:32', receiver: 'leyi', money: '45.34', status: 5},
    {orderId: 95601, orderCode: 'DH-O-20170721-095606', timestamp: '2017-07-21 12:45:32', receiver: 'leyi', money: '45.34', status: 4},
    {orderId: 95601, orderCode: 'DH-O-20170721-095606', timestamp: '2017-07-21 12:45:32', receiver: 'leyi', money: '45.34', status: 2},
    {orderId: 95601, orderCode: 'DH-O-20170721-095606', timestamp: '2017-07-21 12:45:32', receiver: 'leyi', money: '45.34', status: 3},
    {orderId: 95601, orderCode: 'DH-O-20170721-095606', timestamp: '2017-07-21 12:45:32', receiver: 'leyi', money: '45.34', status: 1},
    {orderId: 95601, orderCode: 'DH-O-20170721-095606', timestamp: '2017-07-21 12:45:32', receiver: 'leyi', money: '45.34', status: 2},
    {orderId: 95601, orderCode: 'DH-O-20170721-095606', timestamp: '2017-07-21 12:45:32', receiver: 'leyi', money: '45.34', status: 3},
    {orderId: 95601, orderCode: 'DH-O-20170721-095606', timestamp: '2017-07-21 12:45:32', receiver: 'leyi', money: '45.34', status: 4},
    {orderId: 95601, orderCode: 'DH-O-20170721-095606', timestamp: '2017-07-21 12:45:32', receiver: 'leyi', money: '45.34', status: 5},
    {orderId: 95601, orderCode: 'DH-O-20170721-095606', timestamp: '2017-07-21 12:45:32', receiver: 'leyi', money: '45.34', status: 2},
    {orderId: 95601, orderCode: 'DH-O-20170721-095606', timestamp: '2017-07-21 12:45:32', receiver: 'leyi', money: '45.34', status: 5},
    {orderId: 95601, orderCode: 'DH-O-20170721-095606', timestamp: '2017-07-21 12:45:32', receiver: 'leyi', money: '45.34', status: 1},
    {orderId: 95601, orderCode: 'DH-O-20170721-095606', timestamp: '2017-07-21 12:45:32', receiver: 'leyi', money: '45.34', status: 1},
    {orderId: 95601, orderCode: 'DH-O-20170721-095606', timestamp: '2017-07-21 12:45:32', receiver: 'leyi', money: '45.34', status: 1},
    {orderId: 95601, orderCode: 'DH-O-20170721-095606', timestamp: '2017-07-21 12:45:32', receiver: 'leyi', money: '45.34', status: 1},
    {orderId: 95601, orderCode: 'DH-O-20170721-095606', timestamp: '2017-07-21 12:45:32', receiver: 'leyi', money: '45.34', status: 1},
    {orderId: 95601, orderCode: 'DH-O-20170721-095606', timestamp: '2017-07-21 12:45:32', receiver: 'leyi', money: '45.34', status: 1},
    {orderId: 95601, orderCode: 'DH-O-20170721-095606', timestamp: '2017-07-21 12:45:32', receiver: 'leyi', money: '45.34', status: 1},
    {orderId: 95601, orderCode: 'DH-O-20170721-095606', timestamp: '2017-07-21 12:45:32', receiver: 'leyi', money: '45.34', status: 1},
    {orderId: 95601, orderCode: 'DH-O-20170721-095606', timestamp: '2017-07-21 12:45:32', receiver: 'leyi', money: '45.34', status: 1},
    {orderId: 95601, orderCode: 'DH-O-20170721-095606', timestamp: '2017-07-21 12:45:32', receiver: 'leyi', money: '45.34', status: 1},
    {orderId: 95601, orderCode: 'DH-O-20170721-095606', timestamp: '2017-07-21 12:45:32', receiver: 'leyi', money: '45.34', status: 1}
  ];


  export default {
    components: {},
    name: 'OrderList',
    data() {
      return {
        tableHeight: 0,
        list: null,
        total: null,
        listLoading: false,
        listQuery: {
          page: 1,
          limit: 20,
          orderId: undefined,
          status: undefined
        },
        orderStatus: [{label: '待付款', value: 1}, {label: '待发货', value: 2}, {label: '已发货', value: 3}, {label: '已取消', value: 4}, {label: '已完成', value: 5}],
        checkAllStatus: true,
        checkedStatuss: [0, 1],
        isIndeterminateStatus: false,
        showAdvancedSearchPopover: false,
        dateTimePickerOptions: {
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
        },
        selectOrders: []
      };
    },
    created() {
      this.tableHeight = document.documentElement.clientHeight - (50 + 20 + 50 + 70);
      $(window).resize(() => {
        this.tableHeight = document.documentElement.clientHeight - (50 + 20 + 50 + 70);
      });
      this.getList();
    },
    filters: {
      parseTime(time) {
        return parseTime(time);
      },
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
        this.listLoading = true;
        setTimeout((items, total) => {
          this.list = testData.slice(((this.listQuery.page - 1) * this.listQuery.limit), this.listQuery.page * this.listQuery.limit);
          this.total = testData.length;
          this.listLoading = false;
        }, 2000);
      },
      handleFilter() {
        this.getList();
      },
      handleSizeChange(val) {
        this.listQuery.limit = val;
        this.getList();
      },
      handleCurrentChange(val) {
        this.listQuery.page = val;
        this.getList();
      },
      handleCheckAllStatusChange(event) {
        let statuss = [];
        for (let tag of this.orderStatus) {
          statuss.push(tag.value);
        }
        this.checkedStatuss = event.target.checked ? statuss : [];
        this.isIndeterminateStatus = false;
      },
      handleCheckedStatusChange(value) {
        let checkedCount = value.length;
        this.checkAllStatus = checkedCount === this.orderStatus.length;
        this.isIndeterminateStatus = checkedCount > 0 && checkedCount < this.orderStatus.length;
      },
      handleDetail() {
        this.jump({path: '/order/edit-order?id=95606'});
      },
      handleSelection(selection, row) {
        this.selectOrders = selection;
      },
      handleSelectionAll(selection) {
        this.selectOrders = selection;
      }
    },
    beforeRouteEnter (to, from, next) {
      next(vm => {
        // 通过 `vm` 访问组件实例
        if (keepAliveList.indexOf(from.path) !== -1) {
          vm.listQuery.page = 1;
          vm.listQuery.limit = 20;
          vm.listQuery.title = undefined;
          vm.listQuery.status = undefined;
          vm.getList();
        }
      });
    }
  };
</script>

<style>
  .order-manage-list.menu-popper-class {
    min-width: 60px !important;
  }
  
  .order-operation-meun {
    font-size: 14px;
    color: #97a8be;
  }
</style>
