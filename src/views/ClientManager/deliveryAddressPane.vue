<template>
  <div class="app-container calendar-list-container">
    <el-table :data="list" v-loading="listLoading" element-loading-text="拼命加载中" height="500"
              border fit highlight-current-row style="width: 100%">
      
      <el-table-column align="center" min-width="150" label="收货人姓名" prop="name">
      </el-table-column>
    
      <el-table-column align="center" width="150" label="收货人手机号" prop="phone">
      </el-table-column>
    
      <el-table-column align="center" width="200" label="省市区" prop="pcdDes">
      </el-table-column>
  
      <el-table-column align="center" min-width="200" label="详细地址" prop="address">
      </el-table-column>
      
      <el-table-column align="center" label="是否默认" width="100" prop="isDefault">
        <template scope="scope">
          <el-tag :type="scope.row.isDefault | statusFilter">{{scope.row.isDefault ? '是' : '否'}}</el-tag>
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
  const testData = [
    {name: 'leyi19', phone: '13758087094', pcdDes: '浙江省嘉兴市南湖区', address: '富润路300号', isDefault: true},
    {name: 'leyi19', phone: '13758087094', pcdDes: '浙江省嘉兴市南湖区', address: '富润路300号', isDefault: false},
    {name: 'leyi19', phone: '13758087094', pcdDes: '浙江省嘉兴市南湖区', address: '富润路300号', isDefault: false},
    {name: 'leyi19', phone: '13758087094', pcdDes: '浙江省嘉兴市南湖区', address: '富润路300号', isDefault: false},
    {name: 'leyi19', phone: '13758087094', pcdDes: '浙江省嘉兴市南湖区', address: '富润路300号', isDefault: false},
    {name: 'leyi19', phone: '13758087094', pcdDes: '浙江省嘉兴市南湖区', address: '富润路300号', isDefault: false},
    {name: 'leyi19', phone: '13758087094', pcdDes: '浙江省嘉兴市南湖区', address: '富润路300号', isDefault: false},
    {name: 'leyi19', phone: '13758087094', pcdDes: '浙江省嘉兴市南湖区', address: '富润路300号', isDefault: false},
    {name: 'leyi19', phone: '13758087094', pcdDes: '浙江省嘉兴市南湖区', address: '富润路300号', isDefault: false},
    {name: 'leyi19', phone: '13758087094', pcdDes: '浙江省嘉兴市南湖区', address: '富润路300号', isDefault: false},
    {name: 'leyi19', phone: '13758087094', pcdDes: '浙江省嘉兴市南湖区', address: '富润路300号', isDefault: false},
    {name: 'leyi19', phone: '13758087094', pcdDes: '浙江省嘉兴市南湖区', address: '富润路300号', isDefault: false},
    {name: 'leyi19', phone: '13758087094', pcdDes: '浙江省嘉兴市南湖区', address: '富润路300号', isDefault: false},
    {name: 'leyi19', phone: '13758087094', pcdDes: '浙江省嘉兴市南湖区', address: '富润路300号', isDefault: false},
    {name: 'leyi19', phone: '13758087094', pcdDes: '浙江省嘉兴市南湖区', address: '富润路300号', isDefault: false},
    {name: 'leyi19', phone: '13758087094', pcdDes: '浙江省嘉兴市南湖区', address: '富润路300号', isDefault: false},
    {name: 'leyi19', phone: '13758087094', pcdDes: '浙江省嘉兴市南湖区', address: '富润路300号', isDefault: false},
    {name: 'leyi19', phone: '13758087094', pcdDes: '浙江省嘉兴市南湖区', address: '富润路300号', isDefault: false},
    {name: 'leyi19', phone: '13758087094', pcdDes: '浙江省嘉兴市南湖区', address: '富润路300号', isDefault: false},
    {name: 'leyi19', phone: '13758087094', pcdDes: '浙江省嘉兴市南湖区', address: '富润路300号', isDefault: false},
    {name: 'leyi19', phone: '13758087094', pcdDes: '浙江省嘉兴市南湖区', address: '富润路300号', isDefault: false},
    {name: 'leyi19', phone: '13758087094', pcdDes: '浙江省嘉兴市南湖区', address: '富润路300号', isDefault: false},
    {name: 'leyi19', phone: '13758087094', pcdDes: '浙江省嘉兴市南湖区', address: '富润路300号', isDefault: false},
    {name: 'leyi19', phone: '13758087094', pcdDes: '浙江省嘉兴市南湖区', address: '富润路300号', isDefault: false},
    {name: 'leyi19', phone: '13758087094', pcdDes: '浙江省嘉兴市南湖区', address: '富润路300号', isDefault: false},
    {name: 'leyi19', phone: '13758087094', pcdDes: '浙江省嘉兴市南湖区', address: '富润路300号', isDefault: false},
    {name: 'leyi19', phone: '13758087094', pcdDes: '浙江省嘉兴市南湖区', address: '富润路300号', isDefault: false},
    {name: 'leyi19', phone: '13758087094', pcdDes: '浙江省嘉兴市南湖区', address: '富润路300号', isDefault: false},
    {name: 'leyi19', phone: '13758087094', pcdDes: '浙江省嘉兴市南湖区', address: '富润路300号', isDefault: false},
    {name: 'leyi19', phone: '13758087094', pcdDes: '浙江省嘉兴市南湖区', address: '富润路300号', isDefault: false},
    {name: 'leyi19', phone: '13758087094', pcdDes: '浙江省嘉兴市南湖区', address: '富润路300号', isDefault: false},
    {name: 'leyi19', phone: '13758087094', pcdDes: '浙江省嘉兴市南湖区', address: '富润路300号', isDefault: false},
    {name: 'leyi19', phone: '13758087094', pcdDes: '浙江省嘉兴市南湖区', address: '富润路300号', isDefault: false},
    {name: 'leyi19', phone: '13758087094', pcdDes: '浙江省嘉兴市南湖区', address: '富润路300号', isDefault: false},
    {name: 'leyi19', phone: '13758087094', pcdDes: '浙江省嘉兴市南湖区', address: '富润路300号', isDefault: false},
    {name: 'leyi19', phone: '13758087094', pcdDes: '浙江省嘉兴市南湖区', address: '富润路300号', isDefault: false},
    {name: 'leyi19', phone: '13758087094', pcdDes: '浙江省嘉兴市南湖区', address: '富润路300号', isDefault: false}
  ];
  
  export default {
    name: 'DeliveryAddressPane',
    components: {},
    data() {
      return {
        list: null,
        total: null,
        listLoading: false,
        listQuery: {
          page: 1,
          limit: 20
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
        return status ? 'success' : 'danger';
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