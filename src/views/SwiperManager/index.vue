<template>
  <div>
    <transition name="component-fade" mode="out-in">
      <keep-alive>
        <component :is="currentView" @changeView="changeView">
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
    name: 'swiper-manager',
    data() {
      return {
        currentView: 'list'
      };
    },
    components: {
      list,
      add
    },
    methods: {
      changeView(view) {
        this.currentView = view;
      }
    }
  };
</script>
