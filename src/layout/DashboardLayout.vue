<template>
  <div class="wrapper">
    <side-bar>
      <mobile-menu slot="content"></mobile-menu>
      <sidebar-link to="/overview/">
        <i class="nc-icon nc-chart-pie-35"></i>
        <p>Dashboard</p>
      </sidebar-link>
      <sidebar-link to="/movie/">
        <i class="nc-icon nc-button-play"></i>
        <p>Movies</p>
      </sidebar-link>
      <sidebar-link to="/movie/detail/">
        <i class="nc-icon nc-circle-09"></i>
        <p>Movie Detail</p>
      </sidebar-link>
      <sidebar-link to="/books/">
        <i class="nc-icon nc-notes"></i>
        <p>Books</p>
      </sidebar-link>
      <sidebar-link to="/analysis/">
        <i class="nc-icon nc-bell-55"></i>
        <p>Analysis</p>
      </sidebar-link>
      <sidebar-link to="/analysis/detail/">
        <i class="nc-icon nc-paper-2"></i>
        <p>Analysis Detail</p>
      </sidebar-link>
      <sidebar-link to="/icons/">
        <i class="nc-icon nc-atom"></i>
        <p>Icons</p>
      </sidebar-link>
      <sidebar-link to="/notifications/">
        <i class="nc-icon nc-bell-55"></i>
        <p>Notifications</p>
      </sidebar-link>
      <sidebar-link to="/comments/">
        <i class="nc-icon nc-bell-55"></i>
        <p>Comments</p>
      </sidebar-link>

      <template slot="bottom-links">
        <sidebar-link class="active"
                      to="/upgrade">
          <i class="nc-icon nc-alien-33"></i>
          <p>Upgrade to PRO</p>
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
  export default {
    components: {
      TopNavbar,
      ContentFooter,
      DashboardContent,
      MobileMenu
    },
    methods: {
      toggleSidebar () {
        if (this.$sidebar.showSidebar) {
          this.$sidebar.displaySidebar(false)
        }
      }
    }
  }

</script>
