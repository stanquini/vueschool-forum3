<template>
  <h1 >{{ category.name }}</h1>
  <ForumList
    :title="category.name"
    :forums="getForumsForCategory(category)"
  />
</template>

<script>
import { mapActions } from 'vuex'

import ForumList from '@/components/ForumList'
import { findById } from '@/helpers'

export default {
  components: { ForumList },

  props: {
    id: {
      required: true,
      type: String
    }
  },

  async created () {
    const category = await this.fetchCategory({ id: this.id })
    this.fetchForums({ ids: category.forums })
  },

  computed: {
    category () {
      return findById(this.$store.state.categories, this.id) || {}
    }
  },

  methods: {
    ...mapActions(['fetchCategory', 'fetchForums']),

    getForumsForCategory (category) {
      return this.$store.state.forums.filter(forum => forum.categoryId === category.id)
    }
  }
}
</script>
