<template>
  <div class="col-large push-top">
    <h1>
      {{ thread.title }}
      <router-link
        :to="{ name: 'ThreadEdit', id: this.id }"
        class="btn-green btn-small"
        tag="button"
      >
        Edit Thread
      </router-link>
    </h1>
    <p>
      By <a href="#" class="link-unstyled">{{thread.author?.name}}</a>, <AppDate :timestamp="thread.publishedAt" />.
      <span
        style="float:right; margin-top: 2px;"
        class="hide-mobile text-faded text-small"
        >{{thread.repliesCount}} replies by {{thread.contributorsCount}} contributors</span
      >
    </p>

    <post-list :posts="threadPosts" />

    <post-editor @save="addPost" />
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import PostList from '@/components/PostList'
import PostEditor from '@/components/PostEditor'
export default {
  name: 'ThreadShow',

  components: {
    PostList,
    PostEditor
  },

  props: {
    id: {
      required: true,
      type: String
    }
  },

  computed: {
    threads () {
      return this.$store.state.threads
    },

    posts () {
      return this.$store.state.posts
    },

    thread () {
      return this.$store.getters.thread(this.id)
    },

    threadPosts () {
      return this.posts.filter(post => post.threadId === this.id)
    }
  },

  async created () {
    // fetch the thread
    const thread = await this.$store.dispatch('fetchThread', { id: this.id })

    // fetch the user
    this.fetchUser({ id: thread.userId })

    // fetch the posts
    const posts = await this.fetchPosts({ ids: thread.posts })
    // fetch the users associated with the posts
    const users = posts.map(post => post.userId).concat(thread.userId)
    this.fetchUsers({ ids: users })
  },

  methods: {
    ...mapActions(['fetchPosts', 'fetchThread', 'fetchUser', 'createPost', 'fetchUsers']),

    addPost (eventData) {
      const post = {
        ...eventData.post,
        threadId: this.id
      }
      this.createPost(post)
    }
  }
}
</script>
