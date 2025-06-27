<template>
  <section class="hero" id="hero">
    <div class="hero__bg parallax-bg">
      <div class="hero__overlay"></div>
    </div>
    <div class="container parallax-container">
      <div class="hero__content">
        <div class="hero__text-container">
          <h1 class="hero__title animate-up">
            <span class="hero__title-main">Xcamp</span>
          </h1>
        </div>
        <p class="hero__subtitle animate-fade" ref="heroSubtitle">创新技术，引领未来</p>
        <div class="hero__buttons animate-scale" ref="heroButtons">
          <a href="#projects" class="button button--primary">探索项目</a>
          <a href="#contact" class="button button--outline">联系我们</a>
        </div>
      </div>
    </div>
    <div class="hero__scroll-indicator animate-fade">
      <span class="hero__scroll-text">向下滚动</span>
      <span class="hero__scroll-arrow"></span>
    </div>
  </section>
</template>

<script>
import { gsap } from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';
import { typeText } from '../utils/animations';

// 确保TextPlugin已注册
gsap.registerPlugin(TextPlugin);

export default {
  name: 'Hero',
  mounted() {
    this.initAnimation();
  },
  methods: {
    initAnimation() {
      // 设置初始状态
      const heroTitle = document.querySelector('.hero__title');
      const heroSubtitle = this.$refs.heroSubtitle;
      const heroButtons = this.$refs.heroButtons;

      if (!heroTitle || !heroSubtitle || !heroButtons) {
        console.error('Hero animation elements not found');
        return;
      }

      gsap.set(heroTitle, { opacity: 0, y: 30 });
      gsap.set(heroSubtitle, { opacity: 0 });
      gsap.set(heroButtons, { opacity: 0, y: 20 });
      
      // 创建动画时间线
      const tl = gsap.timeline({ delay: 0.5 });
      
      // 添加动画序列
      tl.to(heroTitle, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out'
      })
      .to(heroSubtitle, {
        opacity: 1,
        duration: 0.1
      })
      .to(heroSubtitle, {
        text: {
          value: '创新技术，引领未来',
          delimiter: ''
        },
        duration: 1.5,
        ease: 'none'
      })
      .to(heroButtons, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out'
      }, '-=0.5');
      
      // 视差滚动效果
      gsap.to('.hero__bg', {
        y: '30%',
        ease: 'none',
        scrollTrigger: {
          trigger: '.hero',
          start: 'top top',
          end: 'bottom top',
          scrub: true
        }
      });
    }
  }
};
</script>

<style lang="scss">
@import '../styles/variables.scss';

.hero {
  height: 100vh;
  min-height: 600px;
  position: relative;
  display: flex;
  align-items: center;
  overflow: hidden;
  
  &__bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, $color-secondary 0%, #000000 100%);
    z-index: -1;
    transform: translateY(0);
    
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100" height="100" fill="none"/><path d="M0,0 L100,100 M100,0 L0,100" stroke="%234CAF50" stroke-width="0.5" stroke-opacity="0.15"/></svg>');
      background-size: 30px 30px;
      opacity: 0.3;
    }
  }
  
  &__overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(ellipse at center, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.5) 100%);
  }
  
  &__content {
    max-width: 800px;
    margin: 0 auto;
    text-align: center;
    padding: $spacing-xl 0;
    position: relative;
    z-index: 1;
  }
  
  &__title {
    font-size: 4rem;
    font-weight: 800;
    color: $color-light;
    margin-bottom: $spacing-md;
    letter-spacing: 2px;
    text-transform: uppercase;
    text-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
    
    @media (min-width: $breakpoint-md) {
      font-size: 6rem;
    }
    
    &::first-letter {
      color: $color-primary;
    }
  }
  
  &__subtitle {
    font-size: 1.3rem;
    color: $color-light;
    margin-bottom: $spacing-xl;
    letter-spacing: 1px;
    opacity: 0.9;
    position: relative;
    display: inline-block;
    min-height: 1.5em;
    
    @media (min-width: $breakpoint-md) {
      font-size: 1.8rem;
    }
  }
  
  &__buttons {
    display: flex;
    justify-content: center;
    gap: $spacing-md;
    flex-wrap: wrap;
    
    .button {
      min-width: 150px;
    }
  }
  
  &__scroll-indicator {
    position: absolute;
    bottom: $spacing-xl;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    color: $color-light;
    opacity: 0.7;
    transition: opacity $transition-normal;
    
    &:hover {
      opacity: 1;
    }
  }
  
  &__scroll-text {
    font-size: 0.8rem;
    margin-bottom: $spacing-xs;
    text-transform: uppercase;
    letter-spacing: 1px;
  }
  
  &__scroll-arrow {
    width: 20px;
    height: 20px;
    border-right: 2px solid $color-primary;
    border-bottom: 2px solid $color-primary;
    transform: rotate(45deg);
    animation: scrollArrow 2s infinite;
  }
}

@keyframes scrollArrow {
  0% {
    transform: rotate(45deg) translate(-5px, -5px);
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    transform: rotate(45deg) translate(5px, 5px);
    opacity: 0;
  }
}
</style> 