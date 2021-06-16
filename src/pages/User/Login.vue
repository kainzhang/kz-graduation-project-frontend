<template>
  <div class="content">
    <div class="container-fluid auth-container"
         :style="authStyle"
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

            <form class="auth-content" @submit.prevent="handleLogin">
              <div class="form-group auth-form-group">
                  <label for="login-username">Username</label>
                  <input type="text" class="form-control" id="login-username" v-model="username">
                  <small class="auth-help form-text">{{ usernameInfo }}</small>
              </div>
              <div class="form-group auth-form-group">
                  <label for="login-password">Password</label>
                  <input type="password" class="form-control" id="login-password" v-model="password">
                  <small class="auth-help form-text">{{ passwordInfo }}</small>
              </div>

              <small class="auth-router-link-msg">没有账号？
                <router-link to="/register">创建一个！</router-link>
              </small>
              <button type="submit" class="auth-btn btn btn-round btn-fill btn-primary">Login</button>
            </form>

          </card>
        </div>

      </div>

    </div>
  </div>
</template>


<script>
import Card from 'src/components/Cards/Card.vue'
import axios from 'axios' 

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
      authStyle () {
        return {
          backgroundImage: `url(${this.backgroundImage})`
        }
      }
    },
    data() {
      return {
        username: '',
        password: '',
        usernameInfo: '\u00a0',
        passwordInfo: '\u00a0'
      }
    },
    methods: {
      async handleLogin() {
        this.usernameInfo = (this.username === '' ? '\u00a0请输入用户名！': '\u00a0')
        this.passwordInfo = (this.password === '' ? '\u00a0请输入密码！' : '\u00a0');

        if (this.username === '' || this.password === '') return;

        const res = await axios.post('api-token-auth/', {
          username: this.username,
          password: this.password
        }).catch(err => {
          console.log(err);
          this.passwordInfo = '\u00a0用户名或密码错误！'
        });
        
        console.log(res)

        localStorage.setItem('token', res.data.token);
        localStorage.setItem('user', JSON.stringify(res.data.user));
        this.$store.dispatch('user', res.data.user)
        this.$router.push('/');
      }
    }
}
</script>

<style type="text/css">

  .auth-container {
    height: 1000px;
  }

  .login-card {
    margin-top: 200px;
    padding: 12px;
  }

  .auth-content {
    width: 380px;
    padding: 0 25px;
  }

  .auth-form-group {
    margin-top: 10px;
  }

  .auth-help {
    color: red;
  }

  .auth-btn {
    margin: 20px 0;
    width: 100px;
    float: right;
  }

  .auth-router-link-msg {
    float: left;
    display: block;
    line-height: 20px;
    margin: 30px 0 30px 4px;
  }

</style>