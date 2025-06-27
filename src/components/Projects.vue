<template>
  <section class="projects section" id="projects">
    <div class="container">
      <h2 class="section__title animate-up">项目展示</h2>
      <p class="section__subtitle animate-up">探索Xcamp团队开发的创新项目</p>
      
      <div class="projects__filter animate-fade">
        <button 
          v-for="category in categories" 
          :key="category"
          class="projects__filter-btn"
          :class="{ 'projects__filter-btn--active': activeCategory === category }"
          @click="filterProjects(category)"
        >
          {{ category }}
        </button>
      </div>
      
      <div v-if="loading" class="projects__loading">
        <div class="projects__loader"></div>
        <p>加载中...</p>
      </div>
      
      <div v-else-if="error" class="projects__error">
        <p>{{ error }}</p>
        <button @click="fetchProjects" class="button button--primary">重试</button>
      </div>
      
      <div v-else class="projects__grid">
        <div 
          v-for="project in filteredProjects" 
          :key="project.id"
          class="projects__item"
        >
          <div class="projects__card">
            <div class="projects__card-image-container">
              <div class="projects__card-image" :style="{ backgroundColor: project.color }">
                <div class="projects__card-icon">{{ project.icon }}</div>
              </div>
            </div>
            <div class="projects__card-content">
              <h3 class="projects__card-title">{{ project.title }}</h3>
              <p class="projects__card-description">{{ project.description }}</p>
              <div class="projects__card-tags">
                <span 
                  v-for="(tag, tagIndex) in project.tags" 
                  :key="tagIndex"
                  class="projects__card-tag"
                >
                  {{ tag }}
                </span>
              </div>
              <a :href="project.link" class="projects__card-link" target="_blank" rel="noopener">
                了解更多
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Projects',
  data() {
    return {
      activeCategory: '全部',
      categories: ['全部', '网站', '应用', '工具', '开源'],
      projects: [],
      loading: false,
      error: null
    };
  },
  computed: {
    filteredProjects() {
      if (this.activeCategory === '全部') {
        return this.projects;
      } else {
        return this.projects.filter(project => project.category === this.activeCategory);
      }
    }
  },
  methods: {
    filterProjects(category) {
      this.activeCategory = category;
    },
    async fetchProjects() {
      this.loading = true;
      this.error = null;
      
      try {
        const response = await fetch('http://localhost:5000/api/projects');
        
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const data = await response.json();
        this.projects = data;
      } catch (error) {
        console.error('获取项目失败:', error);
        this.error = '获取项目数据失败，请稍后再试';
      } finally {
        this.loading = false;
      }
    }
  },
  mounted() {
    this.fetchProjects();
  }
};
</script>

<style lang="scss">
@import '../styles/variables.scss';

.projects {
  background-color: $color-background;
  padding-bottom: $spacing-xxl;
  
  &__filter {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: $spacing-sm;
    margin-bottom: $spacing-xl;
    
    &-btn {
      padding: $spacing-sm $spacing-md;
      border: 1px solid rgba($color-primary, 0.3);
      border-radius: $border-radius-full;
      background-color: transparent;
      color: $color-text;
      font-weight: 500;
      cursor: pointer;
      transition: all $transition-normal;
      
      &:hover {
        background-color: rgba($color-primary, 0.1);
        border-color: $color-primary;
      }
      
      &--active {
        background-color: $color-primary;
        color: $color-light;
        border-color: $color-primary;
      }
    }
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
  
  &__item {
    transition: all 0.5s ease;
  }
  
  &__card {
    background-color: $color-secondary;
    border-radius: $border-radius-lg;
    overflow: hidden;
    box-shadow: $shadow-sm;
    transition: transform $transition-normal, box-shadow $transition-normal;
    height: 100%;
    display: flex;
    flex-direction: column;
    
    &:hover {
      transform: translateY(-10px);
      box-shadow: $shadow-lg;
    }
    
    &-image-container {
      padding: $spacing-md;
      background-color: rgba($color-light, 0.05);
    }
    
    &-image {
      height: 120px;
      width: 100%;
      border-radius: $border-radius-md;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
    }
    
    &-icon {
      font-size: 3rem;
    }
    
    &-content {
      padding: $spacing-lg;
      flex-grow: 1;
      display: flex;
      flex-direction: column;
    }
    
    &-title {
      font-size: 1.4rem;
      font-weight: 600;
      margin-bottom: $spacing-sm;
      color: $color-light;
    }
    
    &-description {
      color: rgba($color-light, 0.8);
      margin-bottom: $spacing-md;
      flex-grow: 1;
    }
    
    &-tags {
      display: flex;
      flex-wrap: wrap;
      gap: $spacing-xs;
      margin-bottom: $spacing-md;
    }
    
    &-tag {
      background-color: rgba($color-primary, 0.2);
      color: $color-primary;
      font-size: 0.8rem;
      padding: calc($spacing-xs / 2) $spacing-xs;
      border-radius: $border-radius-sm;
    }
    
    &-link {
      display: inline-flex;
      align-items: center;
      gap: $spacing-xs;
      color: $color-primary;
      font-weight: 500;
      text-decoration: none;
      margin-top: auto;
      transition: all $transition-normal;
      
      &:hover {
        color: lighten($color-primary, 10%);
        
        svg {
          transform: translateX(3px);
        }
      }
      
      svg {
        transition: transform $transition-normal;
      }
    }
  }
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style> 