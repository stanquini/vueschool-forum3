<template>
  <the-navbar />
  <div class="container">
    <router-view />
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import TheNavbar from '@/components/TheNavbar'

export default {
  name: 'App',

  components: { TheNavbar },

  created () {
    this.fetchAuthUser({ id: this.$store.state.authUser })
  },

  methods: {
    ...mapActions(['fetchAuthUser'])
  }

}
</script>

<style>
@import "assets/style.css";
</style>
