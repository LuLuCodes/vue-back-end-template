<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-row>
        <el-col :span="10">
          <el-button-group>
            <el-button size="small" type="success" icon="plus" @click="handleCreate">新增</el-button>
            <el-button size="small" type="info" icon="arrow-up">上架</el-button>
            <el-button size="small" type="warning" icon="arrow-down">下架</el-button>
            <el-button size="small" type="danger" icon="delete">删除</el-button>
          </el-button-group>
        </el-col>
        <el-col :span="14">
          <el-input @keyup.enter.native="handleFilter" style="width: 230px;" class="filter-item"
                    placeholder="请输入商品名称/编码/规格/关键字" v-model="listQuery.title" size="small">
          </el-input>
  
          <el-cascader class="filter-item"
            expand-trigger="hover"
            :options="data2"
            :show-all-levels="false"
            size="small">
          </el-cascader>
          <el-select clearable style="width: 100px" class="filter-item" v-model="listQuery.status" placeholder="状态"
                     size="small">
            <el-option v-for="item in goodStatus" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
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
                    <el-input size="small" placeholder="请输入商品名称/编码/规格/关键字" style="width: 300px;"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="商品分类">
                    <el-cascader
                      expand-trigger="hover"
                      :options="data2"
                      :show-all-levels="false"
                      size="small">
                    </el-cascader>
                  </el-form-item>
                </el-col>
              </el-row>
  
              <el-row>
                <el-col :span="24">
                  <el-form-item label="商品标签">
                    <el-checkbox size="small" :indeterminate="isIndeterminateTag" v-model="checkAllTag" @change="handleCheckAllTagChange">全选</el-checkbox>
                    <el-checkbox-group v-model="checkedTags" @change="handleCheckedTagsChange" style="display: inline-block;margin-left: 15px;">
                      <el-checkbox size="small" v-for="tag in tags" :label="tag.id" :key="tag.id">{{tag.name}}</el-checkbox>
                    </el-checkbox-group>
                  </el-form-item>
                </el-col>
              </el-row>
  
              <el-row>
                <el-col :span="24">
                  <el-form-item label="商品状态">
                    <el-checkbox size="small" :indeterminate="isIndeterminateStatus" v-model="checkAllStatus" @change="handleCheckAllStatusChange">全选</el-checkbox>
                    <el-checkbox-group v-model="checkedStatuss" @change="handleCheckedStatusChange" style="display: inline-block;margin-left: 15px;">
                      <el-checkbox size="small" v-for="status in goodStatus" :label="status.value" :key="status.value">{{status.label}}</el-checkbox>
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
    
    <el-table :data="list" v-loading="listLoading" element-loading-text="拼命加载中" height="580" border stripe fit
              highlight-current-row style="width: 100%">
      <el-table-column align="center"
                       type="selection"
                       width="55">
      </el-table-column>
      
      <el-table-column align="center" width="100px" label="商品图片">
        <template scope="scope">
          <img :src="scope.row.url" style="width: 64px;height: 64px;padding-top: 5px;"/>
        </template>
      </el-table-column>
      
      <el-table-column align="center" width="100px" label="商品编码" prop="id">
      </el-table-column>
      
      <el-table-column align="center" min-width="200px" label="商品名称">
        <template scope="scope">
          <span class="link-type" @click="handleUpdate(scope.row)">{{scope.row.title}}</span>
        </template>
      </el-table-column>
      
      <el-table-column align="center" width="100px" label="商品规格" prop="sku">
      </el-table-column>
      
      <el-table-column align="center" width="80px" label="单位" prop="unit">
      </el-table-column>
      
      <el-table-column align="center" width="100px" label="市场价" prop="marketPrice">
      </el-table-column>
      
      <el-table-column align="center" width="100px" label="成本价" prop="costPrice">
      </el-table-column>
      
      <el-table-column align="center" width="100px" label="库存" prop="stock">
      </el-table-column>
      
      <el-table-column align="center" width="150px" label="新增时间" prop="createTime">
      </el-table-column>
      
      <el-table-column align="center" width="150px" label="修改时间" prop="modifyTime">
      </el-table-column>
      
      <el-table-column align="center" label="状态" width="100">
        <template scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{scope.row.status ? '已上架' : '待上架'}}</el-tag>
        </template>
      </el-table-column>
      
      <el-table-column align="center" label="" width="40" fixed="right">
        <template scope="scope">
          <el-popover
            ref="optionMenu"
            placement="bottom-end"
            width="40px"
            popper-class="good-manage-list menu-popper-class"
            trigger="hover"
            :visible-arrow="false">
            <el-row style="margin-bottom: 3px;">
              <el-button v-if="scope.row.status === 0" size="small" type="info"
                         @click="handleModifyStatus(scope.row, 1)">上架
              </el-button>
            </el-row>
            <el-row style="margin-bottom: 3px;">
              <el-button v-if="scope.row.status === 1" size="small" type="warning"
                         @click="handleModifyStatus(scope.row, 0)">下架
              </el-button>
            </el-row>
            <el-row style="margin-bottom: 3px;">
              <el-button size="small" type="danger" @click="handleDelete(scope.row )">删除
              </el-button>
            </el-row>
          </el-popover>
          <span v-popover:optionMenu>...</span>
        </template>
      </el-table-column>
      
      <!--<el-table-column align="center" label="操作" width="150">-->
      <!--<template scope="scope">-->
      <!--<el-button v-if="scope.row.status === 0" size="small" type="info" @click="handleModifyStatus(scope.row, 1)">发布-->
      <!--</el-button>-->
      <!--<el-button v-if="scope.row.status === 1" size="small" type="warning" @click="handleModifyStatus(scope.row, 0)">撤下-->
      <!--</el-button>-->
      <!--<el-button size="small" type="danger" @click="handleDelete(scope.row )">删除-->
      <!--</el-button>-->
      <!--</template>-->
      <!--</el-table-column>-->
    
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
    {
      id: 100001,
      title: '轮播图1',
      auditor: 'leyi',
      timestamp: '2017-07-17 12:12:12',
      url: 'http://img1.imgtn.bdimg.com/it/u=4024981923,3433833314&fm=26&gp=0.jpg',
      status: 1
    },
    {
      id: 100002,
      title: '轮播图2',
      auditor: 'leyi',
      timestamp: '2017-07-17 12:12:12',
      url: 'http://img1.imgtn.bdimg.com/it/u=4024981923,3433833314&fm=26&gp=0.jpg',
      status: 1
    },
    {
      id: 100003,
      title: '轮播图3',
      auditor: 'leyi',
      timestamp: '2017-07-17 12:12:12',
      url: 'http://img1.imgtn.bdimg.com/it/u=4024981923,3433833314&fm=26&gp=0.jpg',
      status: 0
    },
    {
      id: 100004,
      title: '轮播图4',
      auditor: 'leyi',
      timestamp: '2017-07-17 12:12:12',
      url: 'http://img1.imgtn.bdimg.com/it/u=4024981923,3433833314&fm=26&gp=0.jpg',
      status: 1
    },
    {
      id: 100005,
      title: '轮播图5',
      auditor: 'leyi',
      timestamp: '2017-07-17 12:12:12',
      url: 'http://img1.imgtn.bdimg.com/it/u=4024981923,3433833314&fm=26&gp=0.jpg',
      status: 1
    },
    {
      id: 100006,
      title: '轮播图6',
      auditor: 'leyi',
      timestamp: '2017-07-17 12:12:12',
      url: 'http://img1.imgtn.bdimg.com/it/u=4024981923,3433833314&fm=26&gp=0.jpg',
      status: 1
    },
    {
      id: 100007,
      title: '轮播图7',
      auditor: 'leyi',
      timestamp: '2017-07-17 12:12:12',
      url: 'http://img1.imgtn.bdimg.com/it/u=4024981923,3433833314&fm=26&gp=0.jpg',
      status: 1
    },
    {
      id: 100008,
      title: '轮播图8',
      auditor: 'leyi',
      timestamp: '2017-07-17 12:12:12',
      url: 'http://img1.imgtn.bdimg.com/it/u=4024981923,3433833314&fm=26&gp=0.jpg',
      status: 0
    },
    {
      id: 100009,
      title: '轮播图9',
      auditor: 'leyi',
      timestamp: '2017-07-17 12:12:12',
      url: 'http://img1.imgtn.bdimg.com/it/u=4024981923,3433833314&fm=26&gp=0.jpg',
      status: 1
    },
    {
      id: 100010,
      title: '轮播图10',
      auditor: 'leyi',
      timestamp: '2017-07-17 12:12:12',
      url: 'http://img1.imgtn.bdimg.com/it/u=4024981923,3433833314&fm=26&gp=0.jpg',
      status: 1
    },
    {
      id: 100011,
      title: '轮播图11',
      auditor: 'leyi',
      timestamp: '2017-07-17 12:12:12',
      url: 'http://img1.imgtn.bdimg.com/it/u=4024981923,3433833314&fm=26&gp=0.jpg',
      status: 1
    },
    {
      id: 100012,
      title: '轮播图12',
      auditor: 'leyi',
      timestamp: '2017-07-17 12:12:12',
      url: 'http://img1.imgtn.bdimg.com/it/u=4024981923,3433833314&fm=26&gp=0.jpg',
      status: 1
    },
    {
      id: 100013,
      title: '轮播图13',
      auditor: 'leyi',
      timestamp: '2017-07-17 12:12:12',
      url: 'http://img1.imgtn.bdimg.com/it/u=4024981923,3433833314&fm=26&gp=0.jpg',
      status: 1
    },
    {
      id: 100014,
      title: '轮播图14',
      auditor: 'leyi',
      timestamp: '2017-07-17 12:12:12',
      url: 'http://img1.imgtn.bdimg.com/it/u=4024981923,3433833314&fm=26&gp=0.jpg',
      status: 1
    },
    {
      id: 100015,
      title: '轮播图15',
      auditor: 'leyi',
      timestamp: '2017-07-17 12:12:12',
      url: 'http://img1.imgtn.bdimg.com/it/u=4024981923,3433833314&fm=26&gp=0.jpg',
      status: 1
    },
    {
      id: 100016,
      title: '轮播图16',
      auditor: 'leyi',
      timestamp: '2017-07-17 12:12:12',
      url: 'http://img1.imgtn.bdimg.com/it/u=4024981923,3433833314&fm=26&gp=0.jpg',
      status: 1
    },
    {
      id: 100017,
      title: '轮播图17',
      auditor: 'leyi',
      timestamp: '2017-07-17 12:12:12',
      url: 'http://img1.imgtn.bdimg.com/it/u=4024981923,3433833314&fm=26&gp=0.jpg',
      status: 1
    },
    {
      id: 100018,
      title: '轮播图18',
      auditor: 'leyi',
      timestamp: '2017-07-17 12:12:12',
      url: 'http://img1.imgtn.bdimg.com/it/u=4024981923,3433833314&fm=26&gp=0.jpg',
      status: 1
    },
    {
      id: 100019,
      title: '轮播图19',
      auditor: 'leyi',
      timestamp: '2017-07-17 12:12:12',
      url: 'http://img1.imgtn.bdimg.com/it/u=4024981923,3433833314&fm=26&gp=0.jpg',
      status: 1
    },
    {
      id: 100020,
      title: '轮播图20',
      auditor: 'leyi',
      timestamp: '2017-07-17 12:12:12',
      url: 'http://img1.imgtn.bdimg.com/it/u=4024981923,3433833314&fm=26&gp=0.jpg',
      status: 1
    },
    {
      id: 100021,
      title: '轮播图21',
      auditor: 'leyi',
      timestamp: '2017-07-17 12:12:12',
      url: 'http://img1.imgtn.bdimg.com/it/u=4024981923,3433833314&fm=26&gp=0.jpg',
      status: 1
    },
    {
      id: 100022,
      title: '轮播图22',
      auditor: 'leyi',
      timestamp: '2017-07-17 12:12:12',
      url: 'http://img1.imgtn.bdimg.com/it/u=4024981923,3433833314&fm=26&gp=0.jpg',
      status: 1
    },
    {
      id: 100023,
      title: '轮播图23',
      auditor: 'leyi',
      timestamp: '2017-07-17 12:12:12',
      url: 'http://img1.imgtn.bdimg.com/it/u=4024981923,3433833314&fm=26&gp=0.jpg',
      status: 1
    },
    {
      id: 100024,
      title: '轮播图24',
      auditor: 'leyi',
      timestamp: '2017-07-17 12:12:12',
      url: 'http://img1.imgtn.bdimg.com/it/u=4024981923,3433833314&fm=26&gp=0.jpg',
      status: 1
    },
    {
      id: 100025,
      title: '轮播图25',
      auditor: 'leyi',
      timestamp: '2017-07-17 12:12:12',
      url: 'http://img1.imgtn.bdimg.com/it/u=4024981923,3433833314&fm=26&gp=0.jpg',
      status: 1
    },
    {
      id: 100026,
      title: '轮播图26',
      auditor: 'leyi',
      timestamp: '2017-07-17 12:12:12',
      url: 'http://img1.imgtn.bdimg.com/it/u=4024981923,3433833314&fm=26&gp=0.jpg',
      status: 1
    },
    {
      id: 100027,
      title: '轮播图27',
      auditor: 'leyi',
      timestamp: '2017-07-17 12:12:12',
      url: 'http://img1.imgtn.bdimg.com/it/u=4024981923,3433833314&fm=26&gp=0.jpg',
      status: 1
    },
    {
      id: 100028,
      title: '轮播图28',
      auditor: 'leyi',
      timestamp: '2017-07-17 12:12:12',
      url: 'http://img1.imgtn.bdimg.com/it/u=4024981923,3433833314&fm=26&gp=0.jpg',
      status: 1
    },
    {
      id: 100029,
      title: '轮播图29',
      auditor: 'leyi',
      timestamp: '2017-07-17 12:12:12',
      url: 'http://img1.imgtn.bdimg.com/it/u=4024981923,3433833314&fm=26&gp=0.jpg',
      status: 1
    },
    {
      id: 100030,
      title: '轮播图30',
      auditor: 'leyi',
      timestamp: '2017-07-17 12:12:12',
      url: 'http://img1.imgtn.bdimg.com/it/u=4024981923,3433833314&fm=26&gp=0.jpg',
      status: 1
    }
  ];

  const tags = [{id: 1, name: '新品上架'}, {id: 2, name: '热卖促销'}, {id: 3, name: '新客优惠'}];

  export default {
    components: {},
    name: 'good-list',
    data() {
      return {
        list: null,
        total: null,
        listLoading: false,
        listQuery: {
          page: 1,
          limit: 20,
          title: undefined,
          status: undefined
        },
        goodStatus: [{label: '上架', value: 1}, {label: '下架', value: 0}],
        data2: [{
          value: 1,
          label: '一级 1',
          children: [{
            value: 4,
            label: '二级 1-1',
            children: [{
              value: 9,
              label: '三级 1-1-1'
            }, {
              value: 10,
              label: '三级 1-1-2'
            }]
          }]
        }, {
          value: 2,
          label: '一级 2',
          children: [{
            value: 5,
            label: '二级 2-1'
          }, {
            value: 6,
            label: '二级 2-2'
          }]
        }, {
          value: 3,
          label: '一级 3',
          children: [{
            value: 7,
            label: '二级 3-1'
          }, {
            value: 8,
            label: '二级 3-2'
          }]
        }],
        checkAllTag: true,
        checkedTags: [1, 2],
        tags: tags,
        isIndeterminateTag: true,
        checkAllStatus: true,
        checkedStatuss: [0, 1],
        isIndeterminateStatus: false,
        showAdvancedSearchPopover: false
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
      handleCheckAllTagChange(event) {
        let tags = [];
        for (let tag of this.tags) {
          tags.push(tag.id);
        }
        this.checkedTags = event.target.checked ? tags : [];
        this.isIndeterminateTag = false;
      },
      handleCheckedTagsChange(value) {
        let checkedCount = value.length;
        this.checkAllTag = checkedCount === this.tags.length;
        this.isIndeterminateTag = checkedCount > 0 && checkedCount < this.tags.length;
      },
      handleCheckAllStatusChange(event) {
        let statuss = [];
        for (let tag of this.goodStatus) {
          statuss.push(tag.value);
        }
        this.checkedStatuss = event.target.checked ? statuss : [];
        this.isIndeterminateStatus = false;
      },
      handleCheckedStatusChange(value) {
        let checkedCount = value.length;
        this.checkAllStatus = checkedCount === this.goodStatus.length;
        this.isIndeterminateStatus = checkedCount > 0 && checkedCount < this.goodStatus.length;
      },
      handleCreate() {
        this.$emit('changeView', 'add');
      }
    }
  };
</script>

<style>
  .good-manage-list.menu-popper-class {
    min-width: 60px !important;
  }
</style>
