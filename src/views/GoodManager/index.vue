<template>
  <div>
    <transition name="component-fade" mode="out-in">
      <keep-alive>
        <component :is="currentView" @changeView="changeView" :good-id="goodId">
          <!-- 非活动组件将被缓存！ -->
        </component>
      </keep-alive>
    </transition>
  </div>
</template>

<script>
  import list from './list.vue';
  import add from './add.vue';

  export default {
    name: 'GoodManager',
    data() {
      return {
        currentView: 'list',
        goodId: 0
      };
    },
    components: {
      list,
      add
    },
    methods: {
      changeView({view, param = null}) {
        if (view === 'edit') {
          this.goodId = param.id;
        }
        this.currentView = view;
      }
    }
  };
</script>
