<template>
  <div class="createPost-container">
    <el-form v-loading="infoLoading" element-loading-text="拼命加载中" class="form-container"
             :model="baseInfo" ref="baseInfo" label-position="right" label-width="110px">
      <div class="createPost-main-container">
        <el-row>
          <el-col :span="8">
            <el-form-item label="客户编码：" prop="id">
              <el-input v-model="baseInfo.id" style="width: 300px;" size="small" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          
          <el-col :span="8">
            <el-form-item label="昵称/姓名：" prop="name">
              <el-input v-model="baseInfo.name" style="width: 300px;" size="small" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          
          <el-col :span="6">
            <el-form-item label="状态：" prop="status">
              <el-tag :type="baseInfo.status | statusFilter">{{baseInfo.status ? '启用' : '禁用'}}</el-tag>
            </el-form-item>
          </el-col>
        </el-row>
        
        <el-row>
          <el-col :span="8">
            <el-form-item label="注册时间：" prop="timestamp">
              <el-date-picker
                v-model="baseInfo.timestamp"
                type="datetime"
                placeholder="选择日期时间" size="small" disabled style="width: 300px;">
              </el-date-picker>
            </el-form-item>
          </el-col>
          
          <el-col :span="8">
            <el-form-item label="下单时间：" prop="ordertime">
              <el-date-picker
                v-model="baseInfo.ordertime"
                type="datetime"
                placeholder="选择日期时间" size="small" disabled style="width: 300px;">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        
        <el-row>
          <el-col :span="8">
            <el-form-item label="手机号码：" prop="phone">
              <el-input v-model="baseInfo.phone" style="width: 300px;" size="small" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          
          <el-col :span="8">
            <el-form-item label="省市区：" prop="pcdCodes">
              <el-cascader
                :options="pcdList"
                v-model="baseInfo.pcdCodes"
                :disabled="true"
                style="width: 300px;">
              </el-cascader>
            </el-form-item>
          </el-col>
        </el-row>
  
        <el-row>
          <el-col :span="10">
            <el-form-item label="详细地址：" prop="address">
              <el-input
                type="textarea"
                :rows="3"
                placeholder="请输入内容"
                v-model="baseInfo.address" :disabled="true"
                style="width: 600px;">
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
      
      </div>
    </el-form>
  </div>
</template>

<script>
  export default {
    name: 'BaseInfoPane',
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
      clientId: {
        type: Number,
        default: 0
      }
    },
    computed: {},
    created() {
      this.getBaseInfo();
    },
    mounted() {
      console.log('mounted' + this.clientId);
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
      margin: 20px;
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