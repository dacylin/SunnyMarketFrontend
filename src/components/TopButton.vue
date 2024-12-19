<template>
  <div class="scroll-top" @click="scrollTop">
    <svg xmlns="http://www.w3.org/2000/svg" 
    fill="none" 
    viewBox="0 0 24 24" 
    stroke-width="1" 
    stroke="red"  
    class="top-svg"
    >
    <circle cx="12.5" 
    cy="12.5" 
    r="9" 
    stroke="grey" 
    stroke-width="1" 
    fill="transparent" />
  <path stroke-linecap="round" 
  stroke-linejoin="round" 
  d="m15 11.25-3-3m0 0-3 3m3-3v7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
</svg>

  </div>
</template>


<script>

export default {
  name: "ScrollTopBtn",
  methods: {
    scrollTop() {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    },
  },
};
</script>

<style>
.scroll-top {
  position: fixed;
  right: 2em;  
  bottom: 2em; 
  cursor: pointer; 
}

.top-svg {
  width: 5em; /* 控制圖標大小 */
  height: 5em; /* 控制圖標大小 */
}

.scroll-top svg {
  display: block;
}
</style> 
