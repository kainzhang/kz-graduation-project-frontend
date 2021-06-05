<template>
  <div class="content">
    <div class="container-fluid login-container"
         :style="loginStyle"
         :data-image="backgroundImage">

      <div class="row justify-content-md-center">

        <div class="col-md-auto">
          <card class="login-card strpied-tabled-with-hover"
          body-classes="table-full-width table-responsive"
          >
            <template slot="header">
              <h2 class="card-title">登录</h2>
              <p class="card-category">Please sign in.</p>
            </template>

            <div class="login-content">
              <div class="form-group login-form-group">
                  <label for="login-username">Username</label>
                  <input type="text" class="login-input form-control" id="login-username" aria-describedby="loginHelp">
                  <small id="login-username-help" class="login-help form-text">&nbsp;</small>
              </div>
              <div class="form-group login-form-group">
                  <label for="login-password">Password</label>
                  <input type="password" class="login-input form-control" id="login-password">
                  <small id="login-password-help" class="login-help form-text">&nbsp;</small>
              </div>

              <button type="submit" class="login-btn btn btn-round btn-fill btn-primary">Login</button>
            </div>

          </card>
        </div>

      </div>

    </div>
  </div>
</template>


<script>
import Card from 'src/components/Cards/Card.vue'

export default {
    components: {
      Card
    },
    props: {
      backgroundImage: {
        type: String,
        default: 'img/login-bg-6.jpg'
      }
    },
    computed: {
      loginStyle () {
        return {
          backgroundImage: `url(${this.backgroundImage})`
        }
      }
    },
    data() {
      return {
        a: 21,
      }
    },

}
</script>

<style type="text/css">

  .login-container {
    height: 1000px;
  }

  .login-card {
    margin-top: 200px;
    padding: 12px;
  }

  .login-content {
    width: 380px;
    padding: 0 25px;
  }

  .login-form-group {
    margin-top: 10px;
  }

  .login-help {
    color: red;
  }

  .login-btn {
    margin: 25px 0;
    width: 100px;
    float: right;
  }

</style>