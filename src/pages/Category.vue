<template>
  <h1 >{{ category.name }}</h1>
  <ForumList
    :title="category.name"
    :forums="getForumsForCategory(category)"
  />
</template>

<script>
import ForumList from '@/components/ForumList'

export default {
  components: { ForumList },
  props: {
    id: {
      required: true,
      type: String
    }
  },
  computed: {
    category () {
      return this.$store.state.categories.find(category => category.id === this.id) || {}
    }
  },
  async created () {
    const category = await this.$store.dispatch('fetchCategory', { id: this.id })
    this.$store.dispatch('fetchForums', { ids: category.forums })
  },
  methods: {
    getForumsForCategory (category) {
      return this.$store.state.forums.filter(forum => forum.categoryId === category.id)
    }
  }
}
</script>
