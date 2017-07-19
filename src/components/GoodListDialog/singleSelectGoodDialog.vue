<template>
  <el-dialog :title="tableTitle" :visible="showDialog" :close-on-click-modal="false" :close-on-press-escape="false"
             :show-close="false" size="large" top="3%" @open="openDialog" @close="closeDialog">
    <div class="filter-container">
      <el-row>
        <el-col :span="14" :offset="12">
          <el-input @keyup.enter.native="handleFilter" style="width: 220px;" class="filter-item" placeholder="商品编码"
                    v-model="listQuery.id" size="small">
          </el-input>
          <el-input @keyup.enter.native="handleFilter" style="width: 220px;" class="filter-item" placeholder="商品名称"
                    v-model="listQuery.title" size="small">
          </el-input>
          <el-select clearable style="width: 100px" class="filter-item" v-model="listQuery.status" placeholder="状态"
                     size="small">
            <el-option v-for="item in goodStatus" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
          <el-button class="filter-item" type="primary" v-waves icon="search" @click="handleFilter" size="small">搜索
          </el-button>
        </el-col>
      </el-row>
    
    </div>
    
    <el-table :data="list" height="450" v-loading="listLoading" element-loading-text="拼命加载中" fit highlight-current-row style="width: 100%;" highlight-current-row
              @current-change="handleTableCurrentChange">
      <el-table-column align="center" width="240px" label="商品主图">
        <template scope="scope">
          <img :src="scope.row.url" style="width: 100px;height: 100px;padding-top: 5px;"/>
        </template>
      </el-table-column>
      
      <el-table-column align="center" prop="title" min-width="200px" label="商品名称" show-overflow-tooltip>
      </el-table-column>
      
      <el-table-column align="center" prop="id" label="商品编码">
      </el-table-column>
      
      <el-table-column align="center" prop="stock" label="库存">
      </el-table-column>
      
      <el-table-column align="center" label="状态" width="100">
        <template scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{scope.row.status ? '可售' : '停售'}}</el-tag>
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
    
    <div slot="footer" class="dialog-footer">
      <el-button @click="closeDialog">取 消</el-button>
      <el-button type="primary" @click="submitGood">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  const testData = [
    {
      id: 100001,
      title: '商品1',
      auditor: 'leyi',
      timestamp: '2017-07-17 12:12:12',
      url: 'http://img1.imgtn.bdimg.com/it/u=4024981923,3433833314&fm=26&gp=0.jpg',
      status: 1,
      stock: 1000
    },
    {
      id: 100002,
      title: '商品2',
      auditor: 'leyi',
      timestamp: '2017-07-17 12:12:12',
      url: 'http://img1.imgtn.bdimg.com/it/u=4024981923,3433833314&fm=26&gp=0.jpg',
      status: 1,
      stock: 1000
    },
    {
      id: 100003,
      title: '商品3',
      auditor: 'leyi',
      timestamp: '2017-07-17 12:12:12',
      url: 'http://img1.imgtn.bdimg.com/it/u=4024981923,3433833314&fm=26&gp=0.jpg',
      status: 0,
      stock: 1000
    },
    {
      id: 100004,
      title: '商品4',
      auditor: 'leyi',
      timestamp: '2017-07-17 12:12:12',
      url: 'http://img1.imgtn.bdimg.com/it/u=4024981923,3433833314&fm=26&gp=0.jpg',
      status: 1,
      stock: 1000
    },
    {
      id: 100005,
      title: '商品5',
      auditor: 'leyi',
      timestamp: '2017-07-17 12:12:12',
      url: 'http://img1.imgtn.bdimg.com/it/u=4024981923,3433833314&fm=26&gp=0.jpg',
      status: 1,
      stock: 1000
    },
    {
      id: 100006,
      title: '商品6',
      auditor: 'leyi',
      timestamp: '2017-07-17 12:12:12',
      url: 'http://img1.imgtn.bdimg.com/it/u=4024981923,3433833314&fm=26&gp=0.jpg',
      status: 1,
      stock: 1000
    },
    {
      id: 100007,
      title: '商品7',
      auditor: 'leyi',
      timestamp: '2017-07-17 12:12:12',
      url: 'http://img1.imgtn.bdimg.com/it/u=4024981923,3433833314&fm=26&gp=0.jpg',
      status: 1,
      stock: 1000
    },
    {
      id: 100008,
      title: '商品8',
      auditor: 'leyi',
      timestamp: '2017-07-17 12:12:12',
      url: 'http://img1.imgtn.bdimg.com/it/u=4024981923,3433833314&fm=26&gp=0.jpg',
      status: 0,
      stock: 1000
    },
    {
      id: 100009,
      title: '商品9',
      auditor: 'leyi',
      timestamp: '2017-07-17 12:12:12',
      url: 'http://img1.imgtn.bdimg.com/it/u=4024981923,3433833314&fm=26&gp=0.jpg',
      status: 1,
      stock: 1000
    },
    {
      id: 100010,
      title: '商品10',
      auditor: 'leyi',
      timestamp: '2017-07-17 12:12:12',
      url: 'http://img1.imgtn.bdimg.com/it/u=4024981923,3433833314&fm=26&gp=0.jpg',
      status: 1,
      stock: 1000
    },
    {
      id: 100011,
      title: '商品11',
      auditor: 'leyi',
      timestamp: '2017-07-17 12:12:12',
      url: 'http://img1.imgtn.bdimg.com/it/u=4024981923,3433833314&fm=26&gp=0.jpg',
      status: 1,
      stock: 1000
    },
    {
      id: 100012,
      title: '商品12',
      auditor: 'leyi',
      timestamp: '2017-07-17 12:12:12',
      url: 'http://img1.imgtn.bdimg.com/it/u=4024981923,3433833314&fm=26&gp=0.jpg',
      status: 1,
      stock: 1000
    },
    {
      id: 100013,
      title: '商品13',
      auditor: 'leyi',
      timestamp: '2017-07-17 12:12:12',
      url: 'http://img1.imgtn.bdimg.com/it/u=4024981923,3433833314&fm=26&gp=0.jpg',
      status: 1,
      stock: 1000
    },
    {
      id: 100014,
      title: '商品14',
      auditor: 'leyi',
      timestamp: '2017-07-17 12:12:12',
      url: 'http://img1.imgtn.bdimg.com/it/u=4024981923,3433833314&fm=26&gp=0.jpg',
      status: 1,
      stock: 1000
    },
    {
      id: 100015,
      title: '商品15',
      auditor: 'leyi',
      timestamp: '2017-07-17 12:12:12',
      url: 'http://img1.imgtn.bdimg.com/it/u=4024981923,3433833314&fm=26&gp=0.jpg',
      status: 1,
      stock: 1000
    },
    {
      id: 100016,
      title: '商品16',
      auditor: 'leyi',
      timestamp: '2017-07-17 12:12:12',
      url: 'http://img1.imgtn.bdimg.com/it/u=4024981923,3433833314&fm=26&gp=0.jpg',
      status: 1,
      stock: 1000
    },
    {
      id: 100017,
      title: '商品17',
      auditor: 'leyi',
      timestamp: '2017-07-17 12:12:12',
      url: 'http://img1.imgtn.bdimg.com/it/u=4024981923,3433833314&fm=26&gp=0.jpg',
      status: 1,
      stock: 1000
    },
    {
      id: 100018,
      title: '商品18',
      auditor: 'leyi',
      timestamp: '2017-07-17 12:12:12',
      url: 'http://img1.imgtn.bdimg.com/it/u=4024981923,3433833314&fm=26&gp=0.jpg',
      status: 1,
      stock: 1000
    },
    {
      id: 100019,
      title: '商品19',
      auditor: 'leyi',
      timestamp: '2017-07-17 12:12:12',
      url: 'http://img1.imgtn.bdimg.com/it/u=4024981923,3433833314&fm=26&gp=0.jpg',
      status: 1,
      stock: 1000
    },
    {
      id: 100020,
      title: '商品20',
      auditor: 'leyi',
      timestamp: '2017-07-17 12:12:12',
      url: 'http://img1.imgtn.bdimg.com/it/u=4024981923,3433833314&fm=26&gp=0.jpg',
      status: 1,
      stock: 1000
    },
    {
      id: 100021,
      title: '商品21',
      auditor: 'leyi',
      timestamp: '2017-07-17 12:12:12',
      url: 'http://img1.imgtn.bdimg.com/it/u=4024981923,3433833314&fm=26&gp=0.jpg',
      status: 1,
      stock: 1000
    },
    {
      id: 100022,
      title: '商品22',
      auditor: 'leyi',
      timestamp: '2017-07-17 12:12:12',
      url: 'http://img1.imgtn.bdimg.com/it/u=4024981923,3433833314&fm=26&gp=0.jpg',
      status: 1,
      stock: 1000
    },
    {
      id: 100023,
      title: '商品23',
      auditor: 'leyi',
      timestamp: '2017-07-17 12:12:12',
      url: 'http://img1.imgtn.bdimg.com/it/u=4024981923,3433833314&fm=26&gp=0.jpg',
      status: 1,
      stock: 1000
    },
    {
      id: 100024,
      title: '商品24',
      auditor: 'leyi',
      timestamp: '2017-07-17 12:12:12',
      url: 'http://img1.imgtn.bdimg.com/it/u=4024981923,3433833314&fm=26&gp=0.jpg',
      status: 1,
      stock: 1000
    },
    {
      id: 100025,
      title: '商品25',
      auditor: 'leyi',
      timestamp: '2017-07-17 12:12:12',
      url: 'http://img1.imgtn.bdimg.com/it/u=4024981923,3433833314&fm=26&gp=0.jpg',
      status: 1,
      stock: 1000
    },
    {
      id: 100026,
      title: '商品26',
      auditor: 'leyi',
      timestamp: '2017-07-17 12:12:12',
      url: 'http://img1.imgtn.bdimg.com/it/u=4024981923,3433833314&fm=26&gp=0.jpg',
      status: 1,
      stock: 1000
    },
    {
      id: 100027,
      title: '商品27',
      auditor: 'leyi',
      timestamp: '2017-07-17 12:12:12',
      url: 'http://img1.imgtn.bdimg.com/it/u=4024981923,3433833314&fm=26&gp=0.jpg',
      status: 1,
      stock: 1000
    },
    {
      id: 100028,
      title: '商品28',
      auditor: 'leyi',
      timestamp: '2017-07-17 12:12:12',
      url: 'http://img1.imgtn.bdimg.com/it/u=4024981923,3433833314&fm=26&gp=0.jpg',
      status: 1,
      stock: 1000
    },
    {
      id: 100029,
      title: '商品29',
      auditor: 'leyi',
      timestamp: '2017-07-17 12:12:12',
      url: 'http://img1.imgtn.bdimg.com/it/u=4024981923,3433833314&fm=26&gp=0.jpg',
      status: 1,
      stock: 1000
    },
    {
      id: 100030,
      title: '商品30',
      auditor: 'leyi',
      timestamp: '2017-07-17 12:12:12',
      url: 'http://img1.imgtn.bdimg.com/it/u=4024981923,3433833314&fm=26&gp=0.jpg',
      status: 1,
      stock: 1000
    }
  ];

  export default {
    name: 'SingleSelectGoodDialog',
    components: {},
    props: {
      showDialog: {
        type: Boolean,
        default: false
      },
      tableTitle: {
        type: String,
        default: '商品列表'
      }
    },
    computed: {
    },
    filters: {
      statusFilter(status) {
        const statusMap = ['danger', 'success'];
        return statusMap[status];
      }
    },
    data() {
      return {
        selectGood: null,
        listLoading: false,
        list: null,
        total: null,
        goodStatus: [{label: '可售', value: 1}, {label: '停售', value: 0}],
        listQuery: {
          page: 1,
          limit: 20,
          id: undefined,
          title: undefined,
          status: undefined
        }
      };
    },
    methods: {
      closeDialog() {
        this.$emit('closeDialog');
      },
      openDialog() {
        this.listQuery = {
          page: 1,
          limit: 20,
          id: undefined,
          title: undefined,
          status: undefined
        };
        this.listLoading = false;
        this.list = null;
        this.total = null;
        this.getList();
      },
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
      handleTableCurrentChange(currentRow) {
        this.selectGood = currentRow;
      },
      submitGood() {
        this.$emit('submitSelectGood', this.selectGood);
        this.$emit('closeDialog');
      }
    }
  };
</script>