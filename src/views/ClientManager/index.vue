<template>
  <div>
    <transition name="component-fade" mode="out-in">
      <keep-alive>
        <component :is="currentView" @changeView="changeView" :client-id="clientID">
          <!-- 非活动组件将被缓存！ -->
        </component>
      </keep-alive>
    </transition>
  </div>
</template>

<script>
  import list from './list.vue';
  import edit from './edit.vue';

  export default {
    name: 'client-manager',
    data() {
      return {
        currentView: 'list',
        clientID: 0
      };
    },
    components: {
      list,
      edit
    },
    methods: {
      changeView(view, {clientID} = {}) {
        if (view === 'edit') {
          this.clientID = clientID;
        }
        this.currentView = view;
      }
    }
  };
</script>
