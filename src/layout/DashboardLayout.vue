<template>
  <div class="wrapper">

    <side-bar>
      <mobile-menu slot="content"></mobile-menu>
      <sidebar-link to="/overview/">
        <i class="fa fa-tachometer"></i>
        <p>Dashboard</p>
      </sidebar-link>
      <sidebar-link to="/movie/">
        <i class="fa fa-film"></i>
        <p>Movie</p>
      </sidebar-link>
      <!-- <sidebar-link to="/movie/detail/">
        <i class="fa fa-film"></i>
        <p>Movie Detail</p>
      </sidebar-link> -->
      <sidebar-link to="/book/">
        <i class="fa fa-newspaper-o"></i>
        <p>Book</p>
      </sidebar-link>
      <!-- <sidebar-link to="/book/detail/">
        <i class="fa fa-newspaper-o"></i>
        <p>Book Detail</p>
      </sidebar-link> -->
      <sidebar-link to="/analysis/">
        <i class="fa fa-file-text-o"></i>
        <p>Analysis</p>
      </sidebar-link>
      <!-- <sidebar-link to="/analysis/detail/">
        <i class="fa fa-file-text-o"></i>
        <p>Analysis Detail</p>
      </sidebar-link> -->
      <sidebar-link to="/comment/">
        <i class="fa fa-comments-o"></i>
        <p>Comment</p>
      </sidebar-link>
      <sidebar-link to="#">
        <i class="fa fa-bell-o"></i>
        <p>Notification</p>
      </sidebar-link>

      <template slot="bottom-links">
        <sidebar-link class="active"
                      to="/admin">
          <i class="fa fa-superpowers"></i>
          <p>Administration</p>
        </sidebar-link>
      </template>
    </side-bar>
    <div class="main-panel">
      <top-navbar></top-navbar>

      <dashboard-content @click="toggleSidebar">

      </dashboard-content>

      <content-footer></content-footer>
    </div>
  </div>
</template>

<style lang="scss">

</style>
<script>
  import TopNavbar from './TopNavbar.vue'
  import ContentFooter from './ContentFooter.vue'
  import DashboardContent from './Content.vue'
  import MobileMenu from './MobileMenu.vue'
  import {mapGetters} from 'vuex'

  export default {
    components: {
      TopNavbar,
      ContentFooter,
      DashboardContent,
      MobileMenu
    },
    computed: {
      ...mapGetters(['user'])
    },
    methods: {
      toggleSidebar () {
        if (this.$sidebar.showSidebar) {
          this.$sidebar.displaySidebar(false)
        }
      }
    },
    async created() {
      var user = localStorage.getItem('user');
      this.$store.dispatch('user', JSON.parse(user))
    }
  }

</script>
