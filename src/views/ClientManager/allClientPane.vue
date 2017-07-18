<template>
  <div>
    <div class="filter-container">
      <el-row>
        <el-col :span="12">
          <el-button-group>
            <el-button size="small" type="info" icon="check">启用</el-button>
            <el-button size="small" type="warning" icon="close">禁用</el-button>
          </el-button-group>
        </el-col>
        <el-col :span="12">
          <el-input @keyup.enter.native="handleFilter" style="width: 230px;" class="filter-item" placeholder="客户编码" v-model="listQuery.id" size="small">
          </el-input>
          <el-input @keyup.enter.native="handleFilter" style="width: 230px;" class="filter-item" placeholder="客户姓名" v-model="listQuery.name" size="small">
          </el-input>
          <el-button class="filter-item" type="primary" v-waves icon="search" @click="handleFilter" size="small">搜索</el-button>
        </el-col>
      </el-row>
  
    </div>
  </div>
</template>

<script>
//  const testData = [
//    {id: 100001, name: 'leyi', timestamp: '2017-07-17 12:12:12',  status: 1, phone: '13758087094', money: '20.4'},
//    {id: 100002, name: 'leyi', timestamp: '2017-07-17 12:12:12',  status: 1, phone: '13758087094', money: '20.4'},
//    {id: 100003, name: 'leyi', timestamp: '2017-07-17 12:12:12',  status: 0, phone: '13758087094', money: '20.4'},
//    {id: 100004, name: 'leyi', timestamp: '2017-07-17 12:12:12',  status: 1, phone: '13758087094', money: '20.4'},
//    {id: 100005, name: 'leyi', timestamp: '2017-07-17 12:12:12',  status: 1, phone: '13758087094', money: '20.4'},
//    {id: 100006, name: 'leyi', timestamp: '2017-07-17 12:12:12',  status: 1, phone: '13758087094', money: '20.4'},
//    {id: 100007, name: 'leyi', timestamp: '2017-07-17 12:12:12',  status: 1, phone: '13758087094', money: '20.4'},
//    {id: 100008, name: 'leyi', timestamp: '2017-07-17 12:12:12',  status: 0, phone: '13758087094', money: '20.4'},
//    {id: 100009, name: 'leyi', timestamp: '2017-07-17 12:12:12',  status: 1, phone: '13758087094', money: '20.4'},
//    {id: 100010, name: 'leyi', timestamp: '2017-07-17 12:12:12',  status: 1, phone: '13758087094', money: '20.4'},
//    {id: 100011, name: 'leyi', timestamp: '2017-07-17 12:12:12',  status: 1, phone: '13758087094', money: '20.4'},
//    {id: 100012, name: 'leyi', timestamp: '2017-07-17 12:12:12',  status: 1, phone: '13758087094', money: '20.4'},
//    {id: 100013, name: 'leyi', timestamp: '2017-07-17 12:12:12',  status: 1, phone: '13758087094', money: '20.4'},
//    {id: 100014, name: 'leyi', timestamp: '2017-07-17 12:12:12',  status: 1, phone: '13758087094', money: '20.4'},
//    {id: 100015, name: 'leyi', timestamp: '2017-07-17 12:12:12',  status: 1, phone: '13758087094', money: '20.4'},
//    {id: 100016, name: 'leyi', timestamp: '2017-07-17 12:12:12',  status: 1, phone: '13758087094', money: '20.4'},
//    {id: 100017, name: 'leyi', timestamp: '2017-07-17 12:12:12',  status: 1, phone: '13758087094', money: '20.4'},
//    {id: 100018, name: 'leyi', timestamp: '2017-07-17 12:12:12',  status: 1, phone: '13758087094', money: '20.4'},
//    {id: 100019, name: 'leyi', timestamp: '2017-07-17 12:12:12',  status: 1, phone: '13758087094', money: '20.4'},
//    {id: 100020, name: 'leyi', timestamp: '2017-07-17 12:12:12',  status: 1, phone: '13758087094', money: '20.4'},
//    {id: 100021, name: 'leyi', timestamp: '2017-07-17 12:12:12',  status: 1, phone: '13758087094', money: '20.4'},
//    {id: 100022, name: 'leyi', timestamp: '2017-07-17 12:12:12',  status: 1, phone: '13758087094', money: '20.4'},
//    {id: 100023, name: 'leyi', timestamp: '2017-07-17 12:12:12',  status: 1, phone: '13758087094', money: '20.4'},
//    {id: 100024, name: 'leyi', timestamp: '2017-07-17 12:12:12',  status: 1, phone: '13758087094', money: '20.4'},
//    {id: 100025, name: 'leyi', timestamp: '2017-07-17 12:12:12',  status: 1, phone: '13758087094', money: '20.4'},
//    {id: 100026, name: 'leyi', timestamp: '2017-07-17 12:12:12',  status: 1, phone: '13758087094', money: '20.4'},
//    {id: 100027, name: 'leyi', timestamp: '2017-07-17 12:12:12',  status: 1, phone: '13758087094', money: '20.4'},
//    {id: 100028, name: 'leyi', timestamp: '2017-07-17 12:12:12',  status: 1, phone: '13758087094', money: '20.4'},
//    {id: 100029, name: 'leyi', timestamp: '2017-07-17 12:12:12',  status: 1, phone: '13758087094', money: '20.4'},
//    {id: 100030, name: 'leyi', timestamp: '2017-07-17 12:12:12',  status: 1, phone: '13758087094', money: '20.4'}
//  ];
  export default {
    name: 'allClientPane',
    data() {
      return {
        list: null,
        total: null,
        listLoading: true,
        listQuery: {
          page: 1,
          limit: 20,
          id: undefined,
          name: undefined
        },
        swiperStatus: [{ label: '启用', value: 1 }, { label: '禁用', value: 0 }]
      };
    },
    created() {
    },
    filters: {
    },
    methods: {
      handleFilter() {
      }
    }
  };
</script>
