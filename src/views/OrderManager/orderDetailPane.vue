<template>
  <div class="createPost-container">
    <div class="createPost-main-container">
      <div class="filter-container">
        <el-row>
          <el-col :span="3">
            <span style="color: #f96b6b;">待付款</span>
          </el-col>
          <el-col :span="8">
            <span style="font-size: 14px;color: #97a8be;">订单号：{{orderId}} &nbsp;&nbsp;&nbsp;&nbsp; 订单编码：DH-O-20170721-095606</span>
          </el-col>
          <el-col :span="5" :push="8">
            <el-button class="filter-item" type="info" v-waves>发货
            </el-button>
            <el-button class="filter-item" type="danger" v-waves>取消
            </el-button>
            <el-button class="filter-item" type="success" v-waves>审核
            </el-button>
          </el-col>
        </el-row>
      </div>
  
    </div>
  </div>
</template>

<script>
  export default {
    name: 'OrderDetailPane',
    components: {},
    data() {
      return {
        infoLoading: false,
        baseInfo: {},
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
          this.baseInfo = {
            id: this.clientId,
            name: 'leyi',
            head: 'http://img4.imgtn.bdimg.com/it/u=157241173,3207275343&fm=26&gp=0.jpg',
            phone: '13758087094',
            pcdDes: ['浙江省', '嘉兴市', '南湖区'],
            pcdCodes: [100001, 120001, 121001],
            address: '富润路300号嘉兴麦云科技',
            timestamp: '2017-07-17 12:12:12',
            ordertime: '2017-07-17 12:12:12',
            status: 1
          };
          this.infoLoading = false;
        }, 2000);
      },
      goBack() {
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