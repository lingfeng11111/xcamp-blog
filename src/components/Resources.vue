<template>
  <section class="resources section" id="resources">
    <div class="container">
      <h2 class="section__title">技术资源</h2>
      <p class="section__subtitle">分享我们精选的技术资源和文章</p>
      
      <div v-if="loading" class="resources__loading">
        <div class="resources__loader"></div>
        <p>加载中...</p>
      </div>
      
      <div v-else-if="error" class="resources__error">
        <p>{{ error }}</p>
        <button @click="fetchResources" class="button button--primary">重试</button>
      </div>
      
      <div v-else class="resources__tabs">
        <div class="resources__tabs-header">
          <button 
            v-for="(category, index) in categories" 
            :key="index"
            class="resources__tab-btn"
            :class="{ 'resources__tab-btn--active': activeTab === category }"
            @click="setActiveTab(category)"
          >
            {{ category }}
          </button>
        </div>
        
        <div class="resources__tabs-body">
          <div class="resources__grid">
            <div 
              v-for="(resource, resourceIndex) in filteredResources" 
              :key="resourceIndex"
              class="resources__item"
              ref="resourceItems"
            >
              <div class="resources__card">
                <div class="resources__card-tag">{{ resource.type }}</div>
                <h3 class="resources__card-title">{{ resource.title }}</h3>
                <p class="resources__card-description">{{ resource.description }}</p>
                <div class="resources__card-meta">
                  <span class="resources__card-date">{{ resource.date }}</span>
                  <span class="resources__card-author">{{ resource.author }}</span>
                </div>
                <a :href="resource.link" class="resources__card-link" target="_blank" rel="noopener">
                  查看资源
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="7" y1="17" x2="17" y2="7"></line>
                    <polyline points="7 7 17 7 17 17"></polyline>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="resources__newsletter">
        <div class="resources__newsletter-content">
          <h3 class="resources__newsletter-title">订阅我们的技术周刊</h3>
          <p class="resources__newsletter-description">获取最新技术资讯、教程和开发工具信息</p>
          <form class="resources__newsletter-form">
            <input type="email" class="resources__newsletter-input" placeholder="您的邮箱地址" required>
            <button type="submit" class="button button--primary resources__newsletter-button">订阅</button>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default {
  name: 'Resources',
  data() {
    return {
      activeTab: '教程',
      categories: ['教程', '工具', '资源'],
      resources: [],
      loading: false,
      error: null
    };
  },
  computed: {
    filteredResources() {
      return this.resources.filter(resource => resource.category === this.activeTab);
    }
  },
  methods: {
    setActiveTab(category) {
      this.activeTab = category;
      
      // 重新触发动画
      this.$nextTick(() => {
        this.animateResources();
      });
    },
    
    async fetchResources() {
      this.loading = true;
      this.error = null;
      
      try {
        const response = await fetch('http://localhost:5000/api/resources');
        
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const data = await response.json();
        this.resources = data;
        
        // 确保有资源数据后设置默认分类
        if (this.resources.length > 0) {
          const availableCategories = [...new Set(this.resources.map(r => r.category))];
          this.categories = availableCategories;
          this.activeTab = this.categories[0];
        }
      } catch (error) {
        console.error('获取资源失败:', error);
        this.error = '获取资源数据失败，请稍后再试';
      } finally {
        this.loading = false;
      }
    },
    
    initAnimation() {
      // 初始化选项卡动画
      gsap.from('.resources__tab-btn', {
        opacity: 0,
        y: 20,
        stagger: 0.1,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.resources__tabs-header',
          start: 'top 80%'
        }
      });
      
      // 初始化资源卡片动画
      this.animateResources();
      
      // 初始化订阅区域动画
      gsap.from('.resources__newsletter', {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.resources__newsletter',
          start: 'top 80%'
        }
      });
    },
    
    animateResources() {
      const cards = document.querySelectorAll('.resources__card');
      if (!cards.length) return;
      
      gsap.fromTo(cards, 
        { 
          opacity: 0, 
          y: 30 
        },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.8,
          ease: 'power2.out'
        }
      );
    }
  },
  mounted() {
    this.fetchResources().then(() => {
      this.$nextTick(() => {
        this.initAnimation();
      });
    });
  }
};
</script>

<style lang="scss">
@import '../styles/variables.scss';

.resources {
  background-color: $color-background;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle at 20% 20%, rgba($color-primary, 0.03) 0%, transparent 40%);
    pointer-events: none;
  }
  
  &__loading,
  &__error {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: $spacing-xxl 0;
    text-align: center;
    
    p {
      margin: $spacing-md 0;
      color: $color-text;
    }
  }
  
  &__loader {
    width: 50px;
    height: 50px;
    border: 3px solid rgba($color-primary, 0.3);
    border-radius: 50%;
    border-top-color: $color-primary;
    animation: spin 1s linear infinite;
  }
  
  &__tabs {
    margin-bottom: $spacing-xxl;
    
    &-header {
      display: flex;
      justify-content: center;
      margin-bottom: $spacing-xl;
      overflow-x: auto;
      padding-bottom: $spacing-sm;
      
      @media (max-width: $breakpoint-sm) {
        justify-content: flex-start;
      }
    }
    
    &-body {
      min-height: 400px;
    }
  }
  
  &__tab-btn {
    padding: $spacing-sm $spacing-lg;
    background: transparent;
    border: none;
    border-bottom: 2px solid rgba($color-text, 0.2);
    color: $color-text;
    font-size: 1.1rem;
    font-weight: 500;
    cursor: pointer;
    transition: all $transition-normal;
    margin: 0 $spacing-sm;
    
    &:hover {
      color: $color-primary;
      border-color: $color-primary;
    }
    
    &--active {
      color: $color-primary;
      border-color: $color-primary;
      font-weight: 600;
    }
    
    @media (max-width: $breakpoint-sm) {
      font-size: 1rem;
      padding: $spacing-xs $spacing-sm;
      margin: 0 $spacing-xs;
    }
  }
  
  &__tab-content {
    display: none;
    animation: fadeIn 0.5s ease forwards;
    
    &--active {
      display: block;
    }
  }
  
  &__grid {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    gap: $spacing-lg;
    
    @media (min-width: $breakpoint-sm) {
      grid-template-columns: repeat(2, 1fr);
    }
    
    @media (min-width: $breakpoint-lg) {
      grid-template-columns: repeat(3, 1fr);
    }
  }
  
  &__card {
    background-color: $color-secondary;
    border-radius: $border-radius-lg;
    padding: $spacing-lg;
    box-shadow: $shadow-sm;
    position: relative;
    height: 100%;
    display: flex;
    flex-direction: column;
    transition: transform $transition-normal, box-shadow $transition-normal;
    
    &:hover {
      transform: translateY(-5px);
      box-shadow: $shadow-md;
    }
    
    &-tag {
      position: absolute;
      top: $spacing-md;
      right: $spacing-md;
      background-color: rgba($color-primary, 0.2);
      color: $color-primary;
      padding: calc($spacing-xs / 2) $spacing-xs;
      border-radius: $border-radius-sm;
      font-size: 0.8rem;
    }
    
    &-title {
      margin-top: $spacing-sm;
      margin-bottom: $spacing-md;
      font-size: 1.3rem;
      font-weight: 600;
      color: $color-light;
    }
    
    &-description {
      color: rgba($color-light, 0.8);
      margin-bottom: $spacing-lg;
      flex-grow: 1;
    }
    
    &-meta {
      display: flex;
      justify-content: space-between;
      margin-bottom: $spacing-md;
      font-size: 0.9rem;
      color: rgba($color-light, 0.6);
    }
    
    &-link {
      display: inline-flex;
      align-items: center;
      gap: $spacing-xs;
      color: $color-primary;
      font-weight: 500;
      text-decoration: none;
      transition: all $transition-normal;
      
      &:hover {
        color: lighten($color-primary, 10%);
        
        svg {
          transform: translateX(3px) translateY(-3px);
        }
      }
      
      svg {
        transition: transform $transition-normal;
      }
    }
  }
  
  &__newsletter {
    background-color: rgba($color-secondary, 0.8);
    backdrop-filter: blur(10px);
    border-radius: $border-radius-lg;
    padding: $spacing-xl;
    box-shadow: $shadow-lg;
    margin-top: $spacing-xxl;
    
    &-content {
      max-width: 600px;
      margin: 0 auto;
      text-align: center;
    }
    
    &-title {
      font-size: 1.5rem;
      font-weight: 600;
      margin-bottom: $spacing-md;
      color: $color-light;
    }
    
    &-description {
      color: rgba($color-light, 0.8);
      margin-bottom: $spacing-lg;
    }
    
    &-form {
      display: flex;
      max-width: 500px;
      margin: 0 auto;
      
      @media (max-width: $breakpoint-sm) {
        flex-direction: column;
        gap: $spacing-sm;
      }
    }
    
    &-input {
      flex-grow: 1;
      padding: $spacing-sm $spacing-md;
      border: 1px solid rgba($color-light, 0.2);
      background-color: rgba($color-light, 0.1);
      border-radius: $border-radius-full;
      color: $color-light;
      outline: none;
      transition: border-color $transition-normal;
      
      @media (min-width: $breakpoint-sm) {
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
      }
      
      &:focus {
        border-color: $color-primary;
      }
      
      &::placeholder {
        color: rgba($color-light, 0.5);
      }
    }
    
    &-button {
      padding: $spacing-sm $spacing-lg;
      
      @media (min-width: $breakpoint-sm) {
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
      }
    }
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style> 