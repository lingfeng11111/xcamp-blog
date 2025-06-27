<template>
  <section id="team" class="team-section">
    <div class="container">
      <h2 class="section-title">我们的团队</h2>
      <div class="team-grid">
        <div class="team-member" 
          v-for="(member, index) in teamMembers" 
          :key="index"
          :class="`member-${index+1}`">
          <div class="member-image-wrapper">
            <div class="member-image-container">
              <img :src="member.avatar" :alt="member.name" class="member-image">
            </div>
          </div>
          <div class="member-info">
            <h3 class="member-name">{{ member.name }}</h3>
            <p class="member-role">{{ member.role }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'TeamSection',
  data() {
    return {
      teamMembers: [
        {
          name: '骆子豪',
          role: '前端工程师',
          avatar: '/author/lzh.png',
          color: '#FF4D4D', // 红色
        },
        {
          name: '李豪',
          role: '算法工程师',
          avatar: '/author/lh.png',
          color: '#FFA64D', // 橙色
        },
        {
          name: '陈克岚',
          role: '前端工程师',
          avatar: '/author/ckl.png',
          color: '#FFDD4A', // 黄色
        },
        {
          name: '曾志翔',
          role: '后端工程师',
          avatar: '/author/zzx.png',
          color: '#4DFF4D', // 绿色
        },
        {
          name: '王斐霓',
          role: '前端工程师',
          avatar: '/author/wfn.png',
          color: '#4DC3FF', // 青色
        },
        {
          name: '王诗琪',
          role: '后端工程师',
          avatar: '/author/wsq.png',
          color: '#9B4DFF', // 紫色
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.team-section {
  padding: $spacing-xl 0;
  background-color: $color-background;
}

.container {
  width: 100%;
  max-width: 100%;
  margin: 0 auto;
  padding: 0 100px;
  
  @media (max-width: $breakpoint-md) {
    padding: 0 $spacing-lg;
  }
  
  @media (max-width: $breakpoint-sm) {
    padding: 0 $spacing-md;
  }
}

.section-title {
  font-size: 2.5rem;
  margin-bottom: $spacing-xl;
  text-align: center;
  color: $color-light;
}

.team-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: $spacing-md;
  position: relative;
  z-index: 1;
  justify-content: center;
  
  @media (min-width: $breakpoint-sm) {
    grid-template-columns: repeat(3, 1fr);
    gap: $spacing-md;
  }
  
  @media (min-width: $breakpoint-md) {
    grid-template-columns: repeat(4, 1fr);
    gap: $spacing-md;
  }
  
  @media (min-width: $breakpoint-lg) {
    grid-template-columns: repeat(6, 1fr);
    gap: $spacing-md;
  }
}

.team-member {
  position: relative;
  border-radius: $border-radius-md;
  overflow: hidden;
  transition: all $transition-normal;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: $spacing-md $spacing-sm;
  box-shadow: $shadow-md;
  height: 340px;
  cursor: pointer;
  background-color: #454545;
  z-index: 1;
  max-width: 180px;
  margin: 0 auto;
  width: 100%;
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: $shadow-lg;
    z-index: 10;
    overflow: visible;
    
    .member-image-container {
      left: -120px;
      filter: grayscale(0);
    }
  }
  
  &.member-1:hover { background-color: #FF4D4D; }
  &.member-2:hover { background-color: #FFA64D; }
  &.member-3:hover { background-color: #FFDD4A; }
  &.member-4:hover { background-color: #4DFF4D; }
  &.member-5:hover { background-color: #4DC3FF; }
  &.member-6:hover { background-color: #9B4DFF; }
}

.member-image-wrapper {
  position: relative;
  width: 100%;
  height: 240px;
  margin-bottom: $spacing-md;
}

.member-image-container {
  position: absolute;
  width: 180px;
  height: 240px;
  left: -90px;
  transition: left 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), filter 0.4s ease;
  background-color: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  filter: grayscale(1);
  z-index: 5;
}

.member-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
  transition: transform $transition-normal;
}

.member-info {
  text-align: center;
  width: 100%;
  z-index: 2;
  position: relative;
}

.member-name {
  font-size: 1.5rem;
  margin-bottom: $spacing-xs;
  color: $color-light;
  font-weight: bold;
}

.member-role {
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.8);
}
</style>
