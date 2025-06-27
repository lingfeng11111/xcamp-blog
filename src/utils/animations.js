import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { TextPlugin } from 'gsap/TextPlugin';

// 注册GSAP插件
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, TextPlugin);

/**
 * 从底部向上滑入动画
 * @param {string|Element} targets - 目标元素选择器或DOM元素
 * @param {Object} options - 动画选项
 */
export function fadeInUp(targets, options = {}) {
  const elements = typeof targets === 'string' ? document.querySelectorAll(targets) : targets;
  if (!elements || elements.length === 0) return null;
  
  return gsap.from(elements, {
    y: 50,
    opacity: 0,
    duration: options.duration || 0.8,
    stagger: options.stagger || 0.2,
    ease: options.ease || 'power2.out',
    scrollTrigger: options.scrollTrigger || {
      trigger: elements,
      start: 'top 80%',
      toggleActions: 'play none none none'
    },
    ...options
  });
}

/**
 * 从左侧滑入动画
 * @param {string|Element} targets - 目标元素选择器或DOM元素
 * @param {Object} options - 动画选项
 */
export function fadeInLeft(targets, options = {}) {
  const elements = typeof targets === 'string' ? document.querySelectorAll(targets) : targets;
  if (!elements || elements.length === 0) return null;
  
  return gsap.from(elements, {
    x: -50,
    opacity: 0,
    duration: options.duration || 0.8,
    stagger: options.stagger || 0.2,
    ease: options.ease || 'power2.out',
    scrollTrigger: options.scrollTrigger || {
      trigger: elements,
      start: 'top 80%',
      toggleActions: 'play none none none'
    },
    ...options
  });
}

/**
 * 从右侧滑入动画
 * @param {string|Element} targets - 目标元素选择器或DOM元素
 * @param {Object} options - 动画选项
 */
export function fadeInRight(targets, options = {}) {
  const elements = typeof targets === 'string' ? document.querySelectorAll(targets) : targets;
  if (!elements || elements.length === 0) return null;
  
  return gsap.from(elements, {
    x: 50,
    opacity: 0,
    duration: options.duration || 0.8,
    stagger: options.stagger || 0.2,
    ease: options.ease || 'power2.out',
    scrollTrigger: options.scrollTrigger || {
      trigger: elements,
      start: 'top 80%',
      toggleActions: 'play none none none'
    },
    ...options
  });
}

/**
 * 渐显动画
 * @param {string|Element} targets - 目标元素选择器或DOM元素
 * @param {Object} options - 动画选项
 */
export function fadeIn(targets, options = {}) {
  const elements = typeof targets === 'string' ? document.querySelectorAll(targets) : targets;
  if (!elements || elements.length === 0) return null;
  
  return gsap.from(elements, {
    opacity: 0,
    duration: options.duration || 0.8,
    stagger: options.stagger || 0.2,
    ease: options.ease || 'power2.out',
    scrollTrigger: options.scrollTrigger || {
      trigger: elements,
      start: 'top 85%',
      toggleActions: 'play none none none'
    },
    ...options
  });
}

/**
 * 缩放显示动画
 * @param {string|Element} targets - 目标元素选择器或DOM元素
 * @param {Object} options - 动画选项
 */
export function scaleIn(targets, options = {}) {
  const elements = typeof targets === 'string' ? document.querySelectorAll(targets) : targets;
  if (!elements || elements.length === 0) return null;
  
  return gsap.from(elements, {
    scale: options.scale || 0.8,
    opacity: 0,
    duration: options.duration || 0.8,
    stagger: options.stagger || 0.2,
    ease: options.ease || 'back.out(1.7)',
    scrollTrigger: options.scrollTrigger || {
      trigger: elements,
      start: 'top 85%',
      toggleActions: 'play none none none'
    },
    ...options
  });
}

/**
 * 视差滚动效果
 * @param {string|Element} targets - 目标元素选择器或DOM元素
 * @param {Object} options - 动画选项
 */
export function parallax(targets, options = {}) {
  const elements = typeof targets === 'string' ? document.querySelectorAll(targets) : targets;
  if (!elements || elements.length === 0) return null;
  
  // 修复trigger选择器问题
  let trigger;
  if (options.trigger) {
    trigger = typeof options.trigger === 'string' 
      ? document.querySelector(options.trigger) 
      : options.trigger;
  } else {
    trigger = elements[0] || elements;
  }
  
  if (!trigger) {
    console.warn('Parallax trigger not found:', options.trigger);
    return null;
  }
  
  return gsap.to(elements, {
    y: options.distance || -100,
    ease: options.ease || 'none',
    scrollTrigger: {
      trigger: trigger,
      start: 'top bottom',
      end: 'bottom top',
      scrub: options.scrub || 0.5,
      markers: options.debug || false,
      ...options.scrollTrigger
    },
    ...options
  });
}

/**
 * 创建滚动进度指示器
 */
export function createScrollProgress() {
  const indicator = document.querySelector('.scroll-indicator');
  if (!indicator) return null;
  
  return gsap.to(indicator, {
    width: '100%',
    ease: 'none',
    scrollTrigger: {
      trigger: 'body',
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.3
    }
  });
}

/**
 * 创建平滑滚动到锚点的功能
 */
export function setupSmoothScrolling() {
  // 获取所有带有href属性的锚标记
  const anchors = document.querySelectorAll('a[href^="#"]');
  
  anchors.forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      
      if (targetId === '#') return;
      
      const target = document.querySelector(targetId);
      
      if (target) {
        gsap.to(window, {
          duration: 1,
          scrollTo: {
            y: target,
            offsetY: 50
          },
          ease: 'power2.inOut'
        });
      }
    });
  });
}

/**
 * 创建文本逐字显示动画
 * @param {string|Element} target - 目标元素选择器或DOM元素
 * @param {Object} options - 动画选项
 */
export function typeText(target, options = {}) {
  const element = typeof target === 'string' ? document.querySelector(target) : target;
  if (!element) {
    console.warn('TypeText target not found:', target);
    return null;
  }
  
  const text = options.text || element.textContent;
  const duration = options.duration || 2;
  const delay = options.delay || 0;
  
  // 清空文本内容
  element.textContent = '';
  
  // 直接使用TextPlugin
  return gsap.to(element, {
    text: {
      value: text,
      delimiter: ''
    },
    duration: duration,
    delay: delay,
    ease: 'none',
    scrollTrigger: options.scrollTrigger,
    onComplete: options.onComplete
  });
}

/**
 * 初始化所有页面动画
 */
export function initPageAnimations() {
  // 确保DOM已完全加载
  setTimeout(() => {
    console.log('初始化页面动画...');
    
    try {
      // 创建滚动进度指示器
      const indicator = document.querySelector('.scroll-indicator');
      if (indicator) {
        console.log('初始化滚动指示器');
        createScrollProgress();
      }
      
      // 设置平滑滚动
      console.log('设置平滑滚动');
      setupSmoothScrolling();
      
      // 检查选择器是否存在，然后应用动画
      const upElements = document.querySelectorAll('.animate-up');
      if (upElements.length > 0) {
        console.log('应用向上动画，元素数量:', upElements.length);
        fadeInUp('.animate-up');
      }
      
      const leftElements = document.querySelectorAll('.animate-left');
      if (leftElements.length > 0) {
        console.log('应用向左动画，元素数量:', leftElements.length);
        fadeInLeft('.animate-left');
      }
      
      const rightElements = document.querySelectorAll('.animate-right');
      if (rightElements.length > 0) {
        console.log('应用向右动画，元素数量:', rightElements.length);
        fadeInRight('.animate-right');
      }
      
      const fadeElements = document.querySelectorAll('.animate-fade');
      if (fadeElements.length > 0) {
        console.log('应用淡入动画，元素数量:', fadeElements.length);
        fadeIn('.animate-fade');
      }
      
      const scaleElements = document.querySelectorAll('.animate-scale');
      if (scaleElements.length > 0) {
        console.log('应用缩放动画，元素数量:', scaleElements.length);
        scaleIn('.animate-scale');
      }
      
      // 视差效果
      const parallaxBg = document.querySelectorAll('.parallax-bg');
      const parallaxContainer = document.querySelector('.parallax-container');
      if (parallaxBg.length > 0) {
        if (parallaxContainer) {
          console.log('应用视差效果，元素数量:', parallaxBg.length);
          parallax('.parallax-bg', { 
            trigger: '.parallax-container',
            debug: false
          });
        } else {
          console.warn('未找到视差容器，尝试使用默认容器');
          parallax('.parallax-bg');
        }
      }
      
      console.log('页面动画初始化完成');
    } catch (error) {
      console.error('初始化动画时出错:', error);
    }
  }, 300); // 给DOM渲染更多时间
}

export default {
  fadeInUp,
  fadeInLeft,
  fadeInRight,
  fadeIn,
  scaleIn,
  parallax,
  createScrollProgress,
  setupSmoothScrolling,
  typeText,
  initPageAnimations
}; 