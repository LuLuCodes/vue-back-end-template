<template>
  <div class="createPost-container">
    <div class="createPost-main-container" v-loading="infoLoading">
      <div class="filter-container">
        <el-row>
          <el-col :span="3">
            <span style="font-size: 25px;color: #f96b6b;">待付款</span>
          </el-col>
          <el-col :span="8">
            <span style="font-size: 14px;color: #98a8b8;">订单号：{{orderId}} &nbsp;&nbsp;&nbsp;&nbsp; 订单编码：DH-O-20170721-095606</span>
          </el-col>
          <el-col :span="5" :push="8">
            <!--发货popover-->
            <el-popover
              ref="sendGoodsPopover"
              placement="top-start"
              width="1000"
              trigger="click"
              v-model="showSendGoodsPopover">
              <el-form label-width="80px" label-position="right">
                <el-row>
                  <el-col :span="8">
                    <el-row>
                      <el-col>
                        <el-form-item label="发货日期">
                          <el-date-picker
                            type="datetime"
                            placeholder="选择日期时间"
                            clearable
                            size="small">
                          </el-date-picker>
                        </el-form-item>
                      </el-col>
                      <el-col>
                        <el-form-item label="物流公司">
                          <el-select v-model="selectLogisticsCompany" clearable placeholder="请选择" size="small">
                            <el-option
                              v-for="item in logisticsCompany"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value">
                            </el-option>
                          </el-select>
                        </el-form-item>
                      </el-col>
                      <el-col>
                        <el-form-item label="物流单号">
                          <el-input
                            size="small"
                            placeholder="请输入内容"></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="物流备注">
                      <el-input
                        type="textarea"
                        :rows="5"
                        placeholder="请输入内容"
                        size="small">
                      </el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
      
                <el-form-item>
                  <el-button type="primary" size="small">确定</el-button>
                  <el-button size="small" @click="showSendGoodsPopover = false">取消</el-button>
                </el-form-item>
              </el-form>
            </el-popover>
            <el-button class="filter-item" type="info" v-waves v-popover:sendGoodsPopover>发货
            </el-button>
            
            <el-button class="filter-item" type="danger" v-waves>取消
            </el-button>
            
            <el-button class="filter-item" type="success" v-waves>审核
            </el-button>
          </el-col>
        </el-row>
      </div>
      <el-table ref="goodTable" :data="goodList" element-loading-text="拼命加载中" fit highlight-current-row style="width: 100%;"
                show-summary :summary-method="getSummaries">
        <el-table-column align="center" width="100px" label="商品主图">
          <template scope="scope">
            <img :src="scope.row.url" style="width: 60px;height: 60px;padding-top: 5px;"/>
          </template>
        </el-table-column>
    
        <el-table-column align="center" prop="title" min-width="200px" label="商品名称" show-overflow-tooltip>
        </el-table-column>
    
        <el-table-column align="center" min-width="150px" prop="id" label="商品编码">
        </el-table-column>
    
        <el-table-column align="center" width="150px" prop="sku" label="规格">
        </el-table-column>
  
        <el-table-column align="center" width="100px" prop="quantity" label="数量">
        </el-table-column>
  
        <el-table-column align="center" width="100px" prop="unit" label="单位">
        </el-table-column>
        
        <el-table-column align="center" width="100px" prop="unitPrice" label="单价">
        </el-table-column>
  
        <el-table-column align="center" width="100px" prop="total" label="金额小计">
        </el-table-column>
      </el-table>
      <div class="receive-container">
        <el-row class="receive-container-item">
          <el-col>
            <span style="color: #98a8b8;">收货信息&nbsp;&nbsp;&nbsp;&nbsp;</span>
            <span>收货人: 乐毅&nbsp;&nbsp;&nbsp;&nbsp;</span>
            <span>联系方式: 13758087094&nbsp;&nbsp;&nbsp;&nbsp;</span>
            <span>收货地址: 嘉兴市南湖区富路润300号嘉兴电子商务产业园3号园嘉兴麦云科技&nbsp;&nbsp;&nbsp;&nbsp;</span>
          </el-col>
        </el-row>
        <el-row class="receive-container-item">
          <el-col>
            <span style="color: #98a8b8;">发货时间&nbsp;&nbsp;&nbsp;&nbsp;</span>
            <el-date-picker
              type="datetime"
              placeholder="选择日期时间"
              disabled
              size="small">
            </el-date-picker>
          </el-col>
        </el-row>
        <el-row class="receive-container-item">
          <el-col :span="2">
            <span style="color: #98a8b8;">备注说明&nbsp;&nbsp;&nbsp;&nbsp;</span>
            <i class="el-icon-plus" @click.prevent.stop="addRemark"></i>
          </el-col>
          <el-col :span="22">
            <el-row class="remark-item">
              备注说明备注说明备注说明备注说明备注说明备注说明备注说明备注说明备注说明备注说明
            </el-row>
            <el-row class="remark-item">
              备注说明备注说明备注说明备注说明备注说明备注说明备注说明备注说明备注说明备注说明
            </el-row>
            <el-row class="remark-item">
              备注说明备注说明备注说明备注说明备注说明备注说明备注说明备注说明备注说明备注说明
            </el-row>
            <el-row class="remark-item">
              备注说明备注说明备注说明备注说明备注说明备注说明备注说明备注说明备注说明备注说明备注说明
            </el-row>
          </el-col>
        </el-row>
      </div>
    </div>
    
    <remark-dialog :show-dialog="showRemarkDialog" @closeDialog="showRemarkDialog = false"></remark-dialog>
  </div>
</template>

<script>
  import RemarkDialog from '../../components/RemarkDialog/index.vue';
  export default {
    name: 'OrderDetailPane',
    components: {
      RemarkDialog
    },
    data() {
      return {
        infoLoading: false,
        showRemarkDialog: false,
        showSendGoodsPopover: false,
        logisticsCompany: [{label: '顺丰快递', value: 0}, {label: '圆通快递', value: 1}],
        selectLogisticsCompany: undefined,
        pcdList: [
          {
            value: 100001,
            label: '浙江省',
            children: [
              {
                value: 110001,
                label: '杭州市',
                children: [
                  {
                    value: 111001,
                    label: '西湖区'
                  },
                  {
                    value: 111002,
                    label: '上城区'
                  }
                ]
              },
              {
                value: 120001,
                label: '嘉兴市',
                children: [
                  {
                    value: 121001,
                    label: '南湖区'
                  },
                  {
                    value: 121002,
                    label: '秀洲区'
                  }
                ]
              }
            ]
          }
        ],
        goodList: [
          {
            id: 100001,
            title: '商品1',
            url: 'http://img1.imgtn.bdimg.com/it/u=4024981923,3433833314&fm=26&gp=0.jpg',
            sku: '100kg',
            unit: '袋',
            unitPrice: 10.00,
            quantity: 10,
            total: 100
          },
          {
            id: 100002,
            title: '商品2',
            url: 'http://img1.imgtn.bdimg.com/it/u=4024981923,3433833314&fm=26&gp=0.jpg',
            status: 1,
            sku: '一箱',
            unit: '箱',
            unitPrice: 100.00,
            quantity: 20,
            total: 2000
          }
        ]
      };
    },
    props: {
      orderId: {
        type: Number,
        default: 0
      }
    },
    computed: {},
    created() {
      this.getBaseInfo();
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
        const statusMap = ['danger', 'success'];
        return statusMap[status];
      }
    },
    methods: {
      getBaseInfo() {
        this.infoLoading = true;
        setTimeout(() => {
          this.infoLoading = false;
        }, 2000);
      },
      getSummaries(param) {
        let { columns, data } = param;
        let sums = [];
        let excludeCol = [0, 1, 2, 3, 5];
        columns.forEach((column, index) => {
          if (index === 0) {
            sums[index] = '应付金额';
            return;
          }
          if (excludeCol.indexOf(index) !== -1) {
            sums[index] = '';
            return;
          }
          const values = data.map(item => Number(item[column.property]));
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr);
            if (!isNaN(value)) {
              return prev + curr;
            } else {
              return prev;
            }
          }, 0);
        });

        return sums;
      },
      addRemark() {
        this.showRemarkDialog = true;
      }
    }
  };
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  @import "../../assets/css/mixin.scss";
  
  .title-prompt {
    position: absolute;
    right: 0px;
    font-size: 12px;
    top: 10px;
    color: #ff4949;
  }
  
  .createPost-container {
    position: relative;
    .createPost-main-container {
      margin: 0 20px;
      .receive-container {
        margin-top: 20px;
        font-size: 14px;
        color: #415161;
        .receive-container-item {
          .remark-item {
            margin: 5px 0;
            word-break: break-all;
          }
          margin: 20px 0;
        }
      }
      .postInfo-container {
        position: relative;
        @include clearfix;
        margin-bottom: 10px;
        .postInfo-container-item {
          float: left;
        }
      }
      .editor-container {
        min-height: 500px;
        margin: 0 0 30px;
        .editor-upload-btn-container {
          text-align: right;
          margin-right: 10px;
          .editor-upload-btn {
            display: inline-block;
          }
        }
      }
    }
    .word-counter {
      width: 40px;
      position: absolute;
      right: -10px;
      top: 0px;
    }
  }
</style>