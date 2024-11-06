<template>
  <div id="app">
    <nav>
      <router-link to="/drinks">Drinks</router-link>
      <router-link to="/games">Games</router-link>
      <router-link to="/workers">Workers</router-link>
    </nav>
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
};
</script>

<style>
nav {
  display: flex;
  gap: 15px;
  background-color: #f3f3f3;
  padding: 10px;
}
</style>
