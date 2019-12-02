<template>
  <div>
    <the-header show-back title="User detail"/>
    <article
      class="user__detail"
      v-if="user && Object.keys(user).length > 0">
      <div class="user__detail--favorite" @click="setFavorite">
        <i v-show="userIsFavorite" class="material-icons">favorite</i>
        <i v-show="!userIsFavorite" class="material-icons">favorite_border</i>
      </div>
      <img
        class="user__detail--image"
        :src="user.picture.large"
        :alt="user.name.first"
      />
      <h3>{{ user.name.title }} {{ user.name.first }} {{ user.name.last }}</h3>
      <p>{{ user.email }}</p>

      <p>{{ user.location.street.name }}, {{ user.location.street.number }}, {{ user.location.city }}</p>

      <p>{{ user.phone }}</p>
      <p>{{ user.cell }}</p>

      <div id="map"></div>
    </article>
  </div>
</template>

<script>
import TheHeader from '@/components/TheHeader.vue'
import { users } from '@/data/users'

export default {
  name: 'User',
  components: {
    TheHeader
  },
  data () {
    return {
      users: users.results,
      user: {},
      username: '',
      userIsFavorite: false,
      favoriteUsers: []
    }
  },
  mounted () {
    this.username = this.$route.params.username
    this.user = this.getUser()

    if (localStorage.getItem('users')) {
      try {
        this.favoriteUsers = JSON.parse(localStorage.getItem('users'));
        const userIsFavorite = this.favoriteUsers.find(user => user.login.username === this.username)
        this.userIsFavorite = userIsFavorite;
      } catch(e) {
        localStorage.removeItem('users');
      }
    }

    this.$nextTick(() => {
      const { location } = this.user
      this.createMap(location.coordinates.latitude, location.coordinates.longitude)
    })
  },
  methods: {
    getUser () {
      return this.users.find(user => user.login.username === this.username)
    },
    createMap (latitude, longitude) {
      if ('google' in window) {
        const center = new google.maps.LatLng(latitude, longitude)
        const mapOptions = {
          zoom: 15,
          center,
          mapTypeId: 'roadmap',
          tileSize: new google.maps.Size(256, 256),
        }
        const element = this.$el.querySelector('#map')
        if (element) {
          const map = new google.maps.Map(
            element,
            mapOptions
          )
          this.createMapMarker(center, map)
        }
      }
    },
    createMapMarker (center, map) {
      if ('google' in window) {
        return new google.maps.Marker({
          position: center,
          map: map
        })
      }
    },
    setFavorite () {
      this.userIsFavorite = !this.userIsFavorite

      if (this.userIsFavorite) {
        this.favoriteUsers.push(this.user)
      } else {
        const userToRemove = this.favoriteUsers.find(user => user.login.username === this.username)
        this.favoriteUsers.splice(userToRemove, 1)
      }
      this.setDataInLocalStorage()
    },

    setDataInLocalStorage () {
      const parsed = JSON.stringify(this.favoriteUsers)
      localStorage.setItem('users', parsed)
    }
  }
}
</script>

<style lang="scss" scoped>
#map {
  height: 300px;
  margin-top: 16px;
}
.user__detail {
  border: 1px solid #ececec;
  border-radius: 20px;
  margin: 16px;
  padding: 16px;
  position: relative;

  &--image {
    border-radius: 100%;
    height: 100px;
    width: 100px;
  }

  &--favorite {
    position: absolute;
    right: 16px;
  }

  h3, p {
    margin: 0;
  }
}
</style>
