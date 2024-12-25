
<!-- 到頂端按鈕 -->

<template>
  <div class="scroll-top" @click="scrollTop">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      class="topsvg"
      viewBox="0 0 16 16"
    >
      <path
        d="M16 8A8 8 0 1 0 0 8a8 8 0 0 0 16 0m-7.5 3.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707z"
      />
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

.topsvg {
  width: 2em; /* 控制圖標大小 */
  height: 2em; /* 控制圖標大小 */
  fill:grey; /*#ff8000 橘色*/

}

.topsvg :hover{
  fill:rgb(130, 130, 130, 0.7); 

}

.scroll-top svg {
  display: block;
}

</style>

 
