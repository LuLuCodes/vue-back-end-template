<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
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
  </div>
</template>

<script>
  import {parseTime} from '../../assets/js/tool';
  import keepAliveList from '../keepAliveList';

  const testData = [];


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
        orderStatus: [{label: '待付款', value: 1}, {label: '待发货', value: 2}, {label: '已发货', value: 3}, {label: '已完成', value: 4}, {label: '已取消', value: 5}],
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
        }
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
      handleCreate() {
        this.jump({path: '/good/add-good'});
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
</style>
