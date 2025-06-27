<template>
  <header class="header" :class="{ 'header--scrolled': isScrolled }">
    <div class="container">
      <div class="header__content">
        <div class="header__logo">
          <a href="#" class="header__logo-link">Xcamp</a>
        </div>
        
        <nav class="header__nav" :class="{ 'header__nav--active': isMenuOpen }">
          <ul class="header__nav-list">
            <li class="header__nav-item">
              <a href="#" class="header__nav-link" @click="closeMenu">首页</a>
            </li>
            <li class="header__nav-item">
              <a href="#projects" class="header__nav-link" @click="closeMenu">项目</a>
            </li>
            <li class="header__nav-item">
              <a href="#team" class="header__nav-link" @click="closeMenu">团队</a>
            </li>
            <li class="header__nav-item">
              <a href="#resources" class="header__nav-link" @click="closeMenu">资源</a>
            </li>
            <li class="header__nav-item">
              <a href="#contact" class="header__nav-link" @click="closeMenu">联系我们</a>
            </li>
          </ul>
        </nav>
        
        <button class="header__toggle" :class="{ 'header__toggle--active': isMenuOpen }" @click="toggleMenu" aria-label="Toggle menu">
          <span class="header__toggle-bar"></span>
          <span class="header__toggle-bar"></span>
          <span class="header__toggle-bar"></span>
        </button>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'Header',
  data() {
    return {
      isScrolled: false,
      isMenuOpen: false
    };
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    handleScroll() {
      this.isScrolled = window.scrollY > 50;
    },
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
      document.body.style.overflow = this.isMenuOpen ? 'hidden' : '';
    },
    closeMenu() {
      this.isMenuOpen = false;
      document.body.style.overflow = '';
    }
  }
};
</script>

<style lang="scss">
@import '../styles/variables.scss';

.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  background-color: transparent;
  transition: all $transition-normal;
  padding: $spacing-md 0;
}

.header--scrolled {
  background-color: rgba($color-secondary, 0.95);
  padding: $spacing-sm 0;
  box-shadow: $shadow-md;
  backdrop-filter: blur(10px);
}

.header__content {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.header__logo {
  z-index: 1001;
}

.header__logo-link {
  font-size: 1.8rem;
  font-weight: 700;
  color: $color-light;
  letter-spacing: 1px;
}

.header__logo-link::first-letter {
  color: $color-primary;
}

.header__nav {
  @media (max-width: ($breakpoint-md - 1px)) {
    position: fixed;
    top: 0;
    right: -100%;
    width: 80%;
    max-width: 300px;
    height: 100vh;
    background-color: $color-secondary;
    transition: right $transition-normal ease;
    padding: 80px $spacing-lg $spacing-lg;
    box-shadow: $shadow-lg;
  }
}

.header__nav--active {
  @media (max-width: ($breakpoint-md - 1px)) {
    right: 0;
  }
}

.header__nav-list {
  display: flex;
  
  @media (max-width: ($breakpoint-md - 1px)) {
    flex-direction: column;
  }
}

.header__nav-item {
  margin: 0 $spacing-md;
  
  @media (max-width: ($breakpoint-md - 1px)) {
    margin: $spacing-md 0;
  }
}

.header__nav-link {
  color: $color-light;
  font-weight: 500;
  position: relative;
  padding: $spacing-xs 0;
  transition: color $transition-normal;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 2px;
    background-color: $color-primary;
    transition: width $transition-normal;
  }
  
  &:hover,
  &:focus {
    color: $color-primary;
    
    &::after {
      width: 100%;
    }
  }
  
  @media (max-width: ($breakpoint-md - 1px)) {
    display: block;
    font-size: 1.2rem;
  }
}

.header__toggle {
  display: none;
  flex-direction: column;
  justify-content: space-between;
  width: 30px;
  height: 21px;
  z-index: 1001;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  
  @media (max-width: ($breakpoint-md - 1px)) {
    display: flex;
  }
}

.header__toggle:hover .header__toggle-bar {
  background-color: $color-primary;
}

.header__toggle-bar {
  height: 3px;
  width: 100%;
  background-color: $color-light;
  border-radius: $border-radius-sm;
  transition: all $transition-fast;
}

.header__toggle--active .header__toggle-bar:nth-child(1) {
  transform: translateY(9px) rotate(45deg);
}

.header__toggle--active .header__toggle-bar:nth-child(2) {
  opacity: 0;
}

.header__toggle--active .header__toggle-bar:nth-child(3) {
  transform: translateY(-9px) rotate(-45deg);
}
</style> 