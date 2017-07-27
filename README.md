# vue-back-end-template #
**本项目的定位是后台集成方案，主要针对电商行业，包括了官网设置、客户管理、商品管理、订单管理等模块**

## 参考项目
本项目是基于[vue-element-admin](https://github.com/PanJiaChen/vue-element-admin)上，实现了具体的业务功能

## 功能
- 官网管理
- 客户管理
- 商品管理
- 订单管理

## 模块
- 登录/注销
- 权限验证
- 侧边栏
- 面包屑
- 富文本编辑器
- Sticky
- echarts图表
- 401，401错误页面
- table
- 动态侧边栏（支持多级路由
- screenfull


## 开发
```bash
    # 克隆项目
    https://github.com/LuLuCodes/vue-back-end-template

    # 安装依赖
    npm install

    # 本地开发 开启服务
    npm run dev
```
浏览器访问 http://localhost:8080

```

## 目录结构
```shell
├── build                      // 构建相关  
├── config                     // 配置相关
├── src                        // 源代码
│   ├── assets                 // 主题 字体等静态资源
│   ├── components             // 全局公用组件
│   ├── directive              // 全局指令
│   ├── filtres                // 全局filter
│   ├── router                 // 路由
│   ├── store                  // 全局store管理
│   ├── view                   // view
│   ├── App.vue                // 入口页面
│   └── main.js                // 入口 加载组件 初始化等
├── static                     // 第三方不打包资源
├── .babelrc                   // babel-loader 配置
├── eslintrc.js                // eslint 配置项
├── .gitignore                 // git 忽略项
├── favicon.ico                // favicon图标
├── index.html                 // html模板
└── package.json               // package.json

```

## 效果图

###

![轮播图管理](https://github.com/LuLuCodes/vue-back-end-template/blob/master/gif/swiper.gif?raw=true)

#### 

![商品管理](https://github.com/LuLuCodes/vue-back-end-template/blob/master/gif/good.gif?raw=true)

MIT
