<template>
  <div>
    <the-header show-back title="Page not found"/>
    <p>Error 404, page not found</p>
  </div>
</template>

<script>
import TheHeader from '@/components/TheHeader.vue'
export default {
  name: 'Error 404',
  components: {
    TheHeader
  }
}
</script>
