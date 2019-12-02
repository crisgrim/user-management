<template>
  <div>
    <the-header show-back title="My Favorites"/>
    <div v-if="favoriteUsers.length">
      <button
        class="app__button"
        type="button"
        @click="downloadFavorites">
        <i class="material-icons">cloud_download</i> Download
      </button>
      <users-list :users="favoriteUsers" />
    </div>
    <p class="app__noresults" v-else>Oops, You don't have a favourite user yet</p>
  </div>
</template>

<script>
import TheHeader from '@/components/TheHeader.vue'
import UsersList from '@/components/UsersList.vue'

export default {
  name: 'MyFavorites',
  components: {
    TheHeader,
    UsersList
  },
  data () {
    return {
      favoriteUsers: []
    }
  },
  mounted () {
    if (localStorage.getItem('users')) {
      try {
        this.favoriteUsers = JSON.parse(localStorage.getItem('users'));
        const userIsFavorite = this.favoriteUsers.find(user => user.login.username === this.username)
        this.userIsFavorite = userIsFavorite;
      } catch(e) {
        localStorage.removeItem('users');
      }
    }
  },
  methods: {
    convertObjectToString (object) {
      const values = Object.values(object)
      return values.join(' ')
    },

    convertToCSV (objArray) {
      const array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray
      return array.reduce((acc, item) => {
        let line = ''
        for (let key in item) {
          if (line != '') line += ','
          const data = typeof item[key] === 'object'
            ? this.convertObjectToString(item[key])
            : item[key]
          line += data
        }
        return acc += line + '\r\n'
      }, '')
    },

    downloadFavorites () {
      const jsonObject = JSON.stringify(this.favoriteUsers)
      const csv = this.convertToCSV(jsonObject)

      const exportName = 'myfavorites.csv'
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })

      if (navigator.msSaveBlob) {
        navigator.msSaveBlob(blob, exportName)
      } else {
        const link = document.createElement('a');
        if (link.download !== undefined) {
          const url = URL.createObjectURL(blob);
          link.setAttribute('href', url);
          link.setAttribute('download', exportName);
          link.style.visibility = 'hidden';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }
      }

    }
  }
}
</script>

<style lang="scss" scoped>
.app__button {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  margin: 16px auto;

  .material-icons {
    margin-right: 8px;
  }

  .app__noresults {
    padding: 16px;
  }
}
</style>
