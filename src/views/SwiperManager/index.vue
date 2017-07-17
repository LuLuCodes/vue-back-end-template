<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-row>
        <el-col :span="12">
          <el-button-group>
            <el-button size="small" type="success" icon="plus">新增</el-button>
            <el-button size="small" type="info" icon="arrow-up">发布</el-button>
            <el-button size="small" type="warning" icon="arrow-down">撤下</el-button>
            <el-button size="small" type="danger" icon="delete">删除</el-button>
          </el-button-group>
        </el-col>
        <el-col :span="9" :offset="3">
          <el-input @keyup.enter.native="handleFilter" style="width: 230px;" class="filter-item" placeholder="名称" v-model="listQuery.title" size="small">
          </el-input>
  
          <el-select clearable style="width: 100px" class="filter-item" v-model="listQuery.status" placeholder="状态" size="small">
            <el-option v-for="item in importanceOptions" :key="item" :label="item" :value="item">
            </el-option>
          </el-select>
          <el-button class="filter-item" type="primary" v-waves icon="search" @click="handleFilter" size="small">搜索</el-button>
        </el-col>
      </el-row>
      
    </div>
    
    <el-table :data="list" v-loading.body="listLoading" height="580" fit highlight-current-row style="width: 100%">
      <el-table-column
        type="index"
        width="50">
      </el-table-column>
      
      <el-table-column type="expand">
        <template scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="时间">
              <span>{{props.row.id}}</span>
            </el-form-item>
            <el-form-item label="时间">
              <span>{{props.row.timestamp | parseTime('{y}-{m}-{d} {h}:{i}')}}</span>
            </el-form-item>
            <el-form-item label="创建人">
              <span>{{ props.row.auditor }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
  
      
      
      <el-table-column min-width="200px" label="名称">
        <template scope="scope">
          <span class="link-type" @click="handleUpdate(scope.row)">{{scope.row.title}}</span>
        </template>
      </el-table-column>
  
      <el-table-column min-width="150px" label="名称">
        <template scope="scope">
          <img :src="scope.row.url" style="width: 240px;height: 120px;padding-top: 5px;"/>
        </template>
      </el-table-column>
      
      <el-table-column class-name="status-col" label="状态" width="90">
        <template scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{scope.row.status ? '已发布':'已撤下'}}</el-tag>
        </template>
      </el-table-column>
      
      <el-table-column align="center" label="操作" width="150">
        <template scope="scope">
          <el-button v-if="scope.row.status!='published'" size="small" type="success" @click="handleModifyStatus(scope.row,'published')">发布
          </el-button>
          <el-button v-if="scope.row.status!='draft'" size="small" @click="handleModifyStatus(scope.row,'draft')">草稿
          </el-button>
          <el-button v-if="scope.row.status!='deleted'" size="small" type="danger" @click="handleModifyStatus(scope.row,'deleted')">删除
          </el-button>
        </template>
      </el-table-column>
    
    </el-table>
    
    <div v-show="!listLoading" class="pagination-container">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.page"
                     :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import { parseTime } from '../../assets/js/tool';
  
  const testData = [
    {id: 100001, title: '轮播图1', auditor: 'leyi', timestamp: '2017-07-17 12:12:12', url: 'http://img1.imgtn.bdimg.com/it/u=4024981923,3433833314&fm=26&gp=0.jpg', status: 1},
    {id: 100002, title: '轮播图2', auditor: 'leyi', timestamp: '2017-07-17 12:12:12', url: 'http://img1.imgtn.bdimg.com/it/u=4024981923,3433833314&fm=26&gp=0.jpg', status: 1},
    {id: 100003, title: '轮播图3', auditor: 'leyi', timestamp: '2017-07-17 12:12:12', url: 'http://img1.imgtn.bdimg.com/it/u=4024981923,3433833314&fm=26&gp=0.jpg', status: 0},
    {id: 100004, title: '轮播图4', auditor: 'leyi', timestamp: '2017-07-17 12:12:12', url: 'http://img1.imgtn.bdimg.com/it/u=4024981923,3433833314&fm=26&gp=0.jpg', status: 1},
    {id: 100005, title: '轮播图5', auditor: 'leyi', timestamp: '2017-07-17 12:12:12', url: 'http://img1.imgtn.bdimg.com/it/u=4024981923,3433833314&fm=26&gp=0.jpg', status: 1},
    {id: 100006, title: '轮播图6', auditor: 'leyi', timestamp: '2017-07-17 12:12:12', url: 'http://img1.imgtn.bdimg.com/it/u=4024981923,3433833314&fm=26&gp=0.jpg', status: 1},
    {id: 100007, title: '轮播图7', auditor: 'leyi', timestamp: '2017-07-17 12:12:12', url: 'http://img1.imgtn.bdimg.com/it/u=4024981923,3433833314&fm=26&gp=0.jpg', status: 1},
    {id: 100008, title: '轮播图8', auditor: 'leyi', timestamp: '2017-07-17 12:12:12', url: 'http://img1.imgtn.bdimg.com/it/u=4024981923,3433833314&fm=26&gp=0.jpg', status: 0},
    {id: 100009, title: '轮播图9', auditor: 'leyi', timestamp: '2017-07-17 12:12:12', url: 'http://img1.imgtn.bdimg.com/it/u=4024981923,3433833314&fm=26&gp=0.jpg', status: 1},
    {id: 100010, title: '轮播图10', auditor: 'leyi', timestamp: '2017-07-17 12:12:12', url: 'http://img1.imgtn.bdimg.com/it/u=4024981923,3433833314&fm=26&gp=0.jpg', status: 1},
    {id: 100011, title: '轮播图11', auditor: 'leyi', timestamp: '2017-07-17 12:12:12', url: 'http://img1.imgtn.bdimg.com/it/u=4024981923,3433833314&fm=26&gp=0.jpg', status: 1},
    {id: 100012, title: '轮播图12', auditor: 'leyi', timestamp: '2017-07-17 12:12:12', url: 'http://img1.imgtn.bdimg.com/it/u=4024981923,3433833314&fm=26&gp=0.jpg', status: 1},
    {id: 100013, title: '轮播图13', auditor: 'leyi', timestamp: '2017-07-17 12:12:12', url: 'http://img1.imgtn.bdimg.com/it/u=4024981923,3433833314&fm=26&gp=0.jpg', status: 1},
    {id: 100014, title: '轮播图14', auditor: 'leyi', timestamp: '2017-07-17 12:12:12', url: 'http://img1.imgtn.bdimg.com/it/u=4024981923,3433833314&fm=26&gp=0.jpg', status: 1},
    {id: 100015, title: '轮播图15', auditor: 'leyi', timestamp: '2017-07-17 12:12:12', url: 'http://img1.imgtn.bdimg.com/it/u=4024981923,3433833314&fm=26&gp=0.jpg', status: 1},
    {id: 100016, title: '轮播图16', auditor: 'leyi', timestamp: '2017-07-17 12:12:12', url: 'http://img1.imgtn.bdimg.com/it/u=4024981923,3433833314&fm=26&gp=0.jpg', status: 1},
    {id: 100017, title: '轮播图17', auditor: 'leyi', timestamp: '2017-07-17 12:12:12', url: 'http://img1.imgtn.bdimg.com/it/u=4024981923,3433833314&fm=26&gp=0.jpg', status: 1},
    {id: 100018, title: '轮播图18', auditor: 'leyi', timestamp: '2017-07-17 12:12:12', url: 'http://img1.imgtn.bdimg.com/it/u=4024981923,3433833314&fm=26&gp=0.jpg', status: 1},
    {id: 100019, title: '轮播图19', auditor: 'leyi', timestamp: '2017-07-17 12:12:12', url: 'http://img1.imgtn.bdimg.com/it/u=4024981923,3433833314&fm=26&gp=0.jpg', status: 1},
    {id: 100020, title: '轮播图20', auditor: 'leyi', timestamp: '2017-07-17 12:12:12', url: 'http://img1.imgtn.bdimg.com/it/u=4024981923,3433833314&fm=26&gp=0.jpg', status: 1},
    {id: 100021, title: '轮播图21', auditor: 'leyi', timestamp: '2017-07-17 12:12:12', url: 'http://img1.imgtn.bdimg.com/it/u=4024981923,3433833314&fm=26&gp=0.jpg', status: 1},
    {id: 100022, title: '轮播图22', auditor: 'leyi', timestamp: '2017-07-17 12:12:12', url: 'http://img1.imgtn.bdimg.com/it/u=4024981923,3433833314&fm=26&gp=0.jpg', status: 1},
    {id: 100023, title: '轮播图23', auditor: 'leyi', timestamp: '2017-07-17 12:12:12', url: 'http://img1.imgtn.bdimg.com/it/u=4024981923,3433833314&fm=26&gp=0.jpg', status: 1},
    {id: 100024, title: '轮播图24', auditor: 'leyi', timestamp: '2017-07-17 12:12:12', url: 'http://img1.imgtn.bdimg.com/it/u=4024981923,3433833314&fm=26&gp=0.jpg', status: 1},
    {id: 100025, title: '轮播图25', auditor: 'leyi', timestamp: '2017-07-17 12:12:12', url: 'http://img1.imgtn.bdimg.com/it/u=4024981923,3433833314&fm=26&gp=0.jpg', status: 1},
    {id: 100026, title: '轮播图26', auditor: 'leyi', timestamp: '2017-07-17 12:12:12', url: 'http://img1.imgtn.bdimg.com/it/u=4024981923,3433833314&fm=26&gp=0.jpg', status: 1},
    {id: 100027, title: '轮播图27', auditor: 'leyi', timestamp: '2017-07-17 12:12:12', url: 'http://img1.imgtn.bdimg.com/it/u=4024981923,3433833314&fm=26&gp=0.jpg', status: 1},
    {id: 100028, title: '轮播图28', auditor: 'leyi', timestamp: '2017-07-17 12:12:12', url: 'http://img1.imgtn.bdimg.com/it/u=4024981923,3433833314&fm=26&gp=0.jpg', status: 1},
    {id: 100029, title: '轮播图29', auditor: 'leyi', timestamp: '2017-07-17 12:12:12', url: 'http://img1.imgtn.bdimg.com/it/u=4024981923,3433833314&fm=26&gp=0.jpg', status: 1},
    {id: 100030, title: '轮播图30', auditor: 'leyi', timestamp: '2017-07-17 12:12:12', url: 'http://img1.imgtn.bdimg.com/it/u=4024981923,3433833314&fm=26&gp=0.jpg', status: 1}
  ];

  export default {
    name: 'swiper-manager',
    data() {
      return {
        list: null,
        total: null,
        listLoading: true,
        listQuery: {
          page: 1,
          limit: 20,
          title: undefined,
          status: [0]
        },
        importanceOptions: [1, 2, 3],
        sortOptions: [{ label: '按ID升序列', key: '+id' }, { label: '按ID降序', key: '-id' }],
        statusOptions: ['published', 'draft', 'deleted'],
        dialogFormVisible: false,
        dialogStatus: '',
        textMap: {
          update: '编辑',
          create: '创建'
        },
        dialogPvVisible: false,
        pvData: [],
        showAuditor: false,
        tableKey: 0
      };
    },
    created() {
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
      handleModifyStatus(row, status) {
        this.$message({
          message: '操作成功',
          type: 'success'
        });
        row.status = status;
      },
      handleUpdate(row) {
        this.temp = Object.assign({}, row);
        this.dialogStatus = 'update';
        this.dialogFormVisible = true;
      },
      handleDelete(row) {
        this.$notify({
          title: '成功',
          message: '删除成功',
          type: 'success',
          duration: 2000
        });
        const index = this.list.indexOf(row);
        this.list.splice(index, 1);
      }
    }
  };
</script>
