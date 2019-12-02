<template>
  <header class="app__header">
    <i
      class="material-icons"
      v-if="showBack"
      @click="handleGoBack"
    >keyboard_backspace</i>
    <h1 class="app__header--title">{{ title }}</h1>
    <router-link class="app__list--item-link" to="/my-favorites">
      <i class="material-icons">favorite</i>
    </router-link>
  </header>
</template>

<script>
export default {
  name: 'UserManagement',
  props: {
    title: {
      type: String,
      default: ''
    },
    showBack: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleGoBack () {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="scss" scoped>
  .app__header {
    background-color: #6200ee;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 8px 12px;
    color: #ffffff;

    &--title {
      font-size: 1.25rem;
      line-height: 2rem;
      font-weight: 500;
      margin: 0;
    }

    a {
      color: #ffffff;
    }
  }
</style>
