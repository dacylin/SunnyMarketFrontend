<template>
    <div>
        <Header />
        <router-view></router-view>
        <!-- <TopButton /> -->
        <Footer />
    </div>   
</template>


<script setup>
// import HelloWorld from './components/HelloWorld.vue'
// import TheWelcome from './components/TheWelcome.vue'
import Header from './components/Header.vue'
// import TopButton from './components/TopButton.vue'
import Footer from './components/Footer.vue';
</script>

<style scoped>
</style>