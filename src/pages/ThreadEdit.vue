<template>
<div class="col-full push-top">
  <h1>Editing <i>{{ thread.title }}</i></h1>
  <ThreadEditor @save="save" @cancel="cancel" />
</div>
</template>

<script>
import ThreadEditor from '../components/ThreadEditor'

export default {
  name: 'ThreadCreate',
  components: { ThreadEditor },
  props: {
    threadId: { type: String, required: true }
  },
  computed: {
    thread () {
      return this.$store.state.thread.find(thread => thread.id === this.threadId)
    },
    text () {
      return this.$store.state.post.find(
        post => post.id === this.thread.post[0]
      )
    }
  },
  methods: {
    async save ({ title, text }) {
      const thread = await this.$store.dispatch('createThread', {
        forumId: this.forum.id,
        title,
        text
      })
      this.$router.push({ name: 'ThreadShow', params: { id: thread.id } })
    },
    cancel () {
      this.$router.push({ name: 'Forum', params: { id: this.forum.id } })
    }
  }
}
</script>

<style scoped>

</style>
