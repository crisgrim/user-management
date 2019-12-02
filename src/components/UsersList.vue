<template>
  <ul class="app__list">
    <li
      class="app__list--item"
      v-for="(user, index) in users"
      :key="index">
        <router-link class="app__list--item-link" :to="`/user/${user.login.username}`">
          <img
            class="app__list--item-image"
            :src="user.picture.large"
            :alt="user.name.first"
          />

          <div class="app__list--item-main">
            <h3>{{ user.name.title }} {{ user.name.first }} {{ user.name.last }} {{ user.gender }}</h3>
            <p>{{ user.email }}</p>
            <p>Nationality: {{ user.nat }}</p>
          </div>

          <div class="app__list--item-aditional">
            <p><i class="material-icons">cake</i> {{ new Date(`${user.dob.date}`).toLocaleDateString() }}</p>
            <p><i class="material-icons">supervised_user_circle</i> {{ new Date(`${user.registered.date}`).toLocaleDateString() }}</p>
          </div>
        </router-link>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'UsersList',
  props: {
    users: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style lang="scss" scoped>
.app__list {
  list-style: none;
  margin: 0;
  padding: 8px 0;

  &--item {
    padding: 8px 16px;

    &-link {
      display: flex;
      position: relative;
      align-items: flex-start;
      justify-content: space-between;
      color: #0000008a;
      text-decoration: none;
    }

    &-image {
      border-radius: 100%;
      height: 40px;
      width: 40px;
    }

    &-main,
    &-aditional {
      p {
        margin: 0;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        max-width: 180px;
      }
    }

    &-main {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: center;
      padding: 0 8px;

      h3 {
        color: #000000de;
        margin: 0;
        font-size: 1.1em;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        max-width: 180px;
      }
    }

    &-aditional {
      font-size: 0.8rem;
      p {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-end;
        margin: 0;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        max-width: 180px;
      }
      .material-icons {
        font-size: 20px;
        margin-right: 3px;
      }
    }
  }
}
</style>
