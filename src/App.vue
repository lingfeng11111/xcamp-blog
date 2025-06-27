<template>
  <div class="app">
    <div class="scroll-indicator"></div>
    <Header />
    <main class="main">
      <router-view v-if="false">
        <!-- 将使用默认路由内容，保留此元素以符合Vue Router需求 -->
      </router-view>
      <Hero />
      <Team />
      <Projects />
      <Resources />
    </main>
    <Footer />
  </div>
</template>

<script>
import { onMounted, ref } from 'vue';
import Header from './components/Header.vue';
import Hero from './components/Hero.vue';
import Projects from './components/Projects.vue';
import Resources from './components/Resources.vue';
import Footer from './components/Footer.vue';
import Team from './components/Team.vue';
import { initPageAnimations } from './utils/animations';

export default {
  name: 'App',
  components: {
    Header,
    Hero,
    Projects,
    Resources,
    Footer,
    Team
  },
  setup() {
    const isLoaded = ref(false);

    onMounted(() => {
      // 确保页面完全加载
      window.addEventListener('load', () => {
        isLoaded.value = true;
      });
      
      // 如果页面已经加载完成，直接设置为true
      if (document.readyState === 'complete') {
        isLoaded.value = true;
      }
      
      // 初始化所有页面动画
      setTimeout(() => {
        initPageAnimations();
        console.log('页面初始化完成');
      }, 500);
    });

    return {
      isLoaded
    };
  }
};
</script>

<style lang="scss">
@import './styles/main.scss';

.app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: $color-background;
  color: $color-text;
}

.main {
  flex: 1;
}
</style>
