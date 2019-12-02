<template>
  <div class="home">
    <the-header title="User Management"/>
    <app-filter
      :ages="ages"
      :genders="genders"
      :nationalities="nationalities"
      @selected-gender="handleFilterGender"
      @selected-age="handleFilterAge"
      @selected-nationality="handleFilterNationality" />
    <div v-if="filteredResult.length">
      <users-list :users="filteredResult" />
    </div>
    <div class="app__noresults" v-else>
      <p>We don't have users with the filters that you selected</p>
    </div>
  </div>
</template>

<script>
import AppFilter from '@/components/AppFilter.vue'
import TheHeader from '@/components/TheHeader.vue'
import UsersList from '@/components/UsersList.vue'

import { users } from '@/data/users'
import { ages } from '@/data/ages'

export default {
  name: 'home',
  components: {
    AppFilter,
    TheHeader,
    UsersList
  },
  data () {
    return {
      initialUsers: users.results,
      filteredUsers: [],
      genders: [],
      nationalities: [],
      ages,
      selectedGender: '',
      selectedAge: '',
      selectedNationality: ''
    }
  },
  mounted () {
    this.filteredUsers = this.initialUsers
    this.genders = this.getGenders()
    this.nationalities = this.getNationalities()
  },
  computed: {
    filteredResult ({ selectedGender, selectedAge, selectedNationality }) {
      const filtered = this.initialUsers.filter((user) => {
        const conditions = []
        if (selectedGender) {
          conditions.push(user.gender === selectedGender)
        }

        if (selectedAge) {
          const values = selectedAge.split('-')
          conditions.push(user.dob.age >= values[0] && user.dob.age <= values[1])
        }

        if (selectedNationality) {
          conditions.push(user.nat === selectedNationality)
        }

        return conditions.every(condition => Boolean(condition))
      })

      return filtered.length ? filtered : []
    }
  },
  methods: {
    getGenders () {
      const genders = this.initialUsers.reduce((acc, user) => {
        if (!acc.includes(user.gender)) {
          acc.push(user.gender)
        }
        return acc
      }, [])
      return genders
    },
    getNationalities () {
      const nationalities = this.initialUsers.reduce((acc, user) => {
        if (!acc.includes(user.nat)) {
          acc.push(user.nat)
        }
        return acc
      }, [])
      return nationalities
    },
    handleFilterGender (value) {
      this.selectedGender = value
    },
    handleFilterAge (value) {
      this.selectedAge = value
    },
    handleFilterNationality (value) {
      this.selectedNationality = value
    }
  }
}
</script>

<style scoped>
.app__noresults {
  padding: 16px;
}
</style>
