<template>
  <div class="createPost-container">
    <el-form class="form-container" :model="baseInfo" ref="baseInfo">
      <div class="createPost-main-container">
        <el-row>
          <el-col :span="5">
            <el-form-item label="客户编码：" prop="id">
              <el-input v-model="baseInfo.id" style="width: 150px;" size="small" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
  
          <el-col :span="6">
            <el-form-item label="昵称/姓名：" prop="name">
              <el-input v-model="baseInfo.name" style="width: 190px;" size="small" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
  
          <el-col :span="8">
            <el-form-item label="状态：" prop="status">
              <el-tag :type="baseInfo.status | statusFilter">{{baseInfo.status ? '启用' : '禁用'}}</el-tag>
            </el-form-item>
          </el-col>
        </el-row>
  
        <el-row>
          <el-col :span="5">
            <el-form-item label="手机号码：" prop="phone">
              <el-input v-model="baseInfo.phone" style="width: 150px;" size="small" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
    
          <el-col :span="6">
            <el-form-item label="注册时间：" prop="timestamp">
              <el-date-picker
                v-model="baseInfo.timestamp"
                type="datetime"
                placeholder="选择日期时间" size="small" :disabled="true">
              </el-date-picker>
            </el-form-item>
          </el-col>
  
          <el-col :span="7">
            <el-form-item label="最后下单时间：" prop="ordertime">
              <el-date-picker
                v-model="baseInfo.ordertime"
                type="datetime"
                placeholder="选择日期时间" size="small" :disabled="true">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        
      </div>
    </el-form>
  </div>
</template>

<script>
  export default {
    name: '',
    components: {},
    data() {
      return {
        infoLoading: false,
        baseInfo: {}
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
    },
    activated() {
      // 当组件在 <keep-alive> 内被切换，它的 activated 和 deactivated 这两个生命周期钩子函数将会被对应执行
      // 数据加载应该放在此处
      this.getBaseInfo();
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
            pcdDes: '浙江省-嘉兴市-南湖区',
            address: '富润路300号嘉兴麦云科技',
            timestamp: '2017-07-17 12:12:12',
            ordertime: '2017-07-17 12:12:12',
            status: 1
          };
          this.infoLoading = false;
        }, 2000);
      },
      goBack() {}
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