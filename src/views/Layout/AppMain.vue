<template>
  <section class="app-main" style="min-height: 100%">
    <transition name="fade" mode="out-in">
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive">
          <!-- 这里是会被缓存的视图组件！ -->
        </router-view>
      </keep-alive>
  
      <router-view v-if="!$route.meta.keepAlive">
        <!-- 这里是不被缓存的视图组件！ -->
      </router-view>
    </transition>
  </section>
</template>

<script>
  export default {
    name: 'AppMain',
    computed: {
      key() {
        return this.$route.name !== undefined ? this.$route.name + +new Date() : this.$route + +new Date();
      }
    }
  };
</script>