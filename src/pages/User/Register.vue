<template>
  <div class="content">
    <div class="container-fluid auth-container"
         :style="authStyle"
         :data-image="backgroundImage">

      <div class="row justify-content-md-center">

        <div class="col-md-auto">
          <card class="register-card strpied-tabled-with-hover"
          body-classes="table-full-width table-responsive"
          >
            <template slot="header">
              <h2 class="card-title">注册</h2>
              <p class="card-category">Please sign up.</p>
            </template>

            <form class="auth-content" @submit.prevent="handleRegister">
              <div class="form-group auth-form-group">
                  <label for="register-username">Username</label>
                  <input type="text" class="form-control" id="register-username" v-model="username">
                  <small id="register-username-help" class="auth-help form-text">{{ usernameInfo }}</small>
              </div>
              <div class="form-group auth-form-group">
                  <label for="register-firstname">First Name</label>
                  <input type="text" class="form-control" id="register-firstname" v-model="firstName">
              </div>
              <div class="form-group auth-form-group">
                  <label for="register-lastname">Last Name</label>
                  <input type="text" class="form-control" id="register-lastname" v-model="lastName">
              </div>
              <div class="form-group auth-form-group">
                <label for="register-email">Email address</label>
                <input type="email" class="form-control" id="register-email" placeholder="name@example.com" v-model="email">
                <small class="auth-help form-text">{{ emailInfo }}</small>
              </div>
              <div class="form-group auth-form-group">
                  <label for="register-password">Password</label>
                  <input type="password" class="form-control" id="register-password" v-model="password" minlength="8" maxlength="16">
                  <small class="auth-help form-text">{{ passwordInfo }}</small>
              </div>
              <div class="form-group auth-form-group">
                  <label for="register-confirm-password">Confirm Password</label>
                  <input type="password" class="form-control" id="register-confirm-password" v-model="confirmPassword">
                  <small class="auth-help form-text">{{ confirmPasswordInfo }}</small>
              </div>

              <small id="" class="auth-router-link-msg">已有账号？
                <router-link to="/login">立即登录！</router-link>
              </small>
              <button type="submit" class="auth-btn btn btn-round btn-fill btn-primary">Register</button>
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
        notificationType: ['', 'info', 'success', 'warning', 'danger'],
        username: '',
        password: '',
        confirmPassword: '',
        firstName: '',
        lastName: '',
        email: '',
        usernameInfo: '\u00a0',
        passwordInfo: '\u00a0',
        confirmPasswordInfo: '\u00a0',
        emailInfo: '\u00a0',
      }
    },
    methods: {
      async handleRegister() {
        this.usernameInfo = (this.username === '' ? '\u00a0请输入用户名！': '\u00a0');
        this.passwordInfo = (this.password === '' ? '\u00a0请输入密码！' : '\u00a0');
        this.emailInfo = (this.email === '' ? '\u00a0请输入邮箱地址！' : '\u00a0');

        if (this.confirmPassword === '') {
          this.confirmPasswordInfo = '\u00a0请输入确认密码！';
        } else if (this.confirmPassword !== this.password) {
          this.confirmPasswordInfo = '\u00a0两次密码输入不一致！'
        } else {
          this.confirmPasswordInfo = '\u00a0';
        }

        if (this.username === '' || this.password === '' || this.confirmPassword === '') return;

        const data = {
          username: this.username,
          password: this.password,
          email: this.email,
          first_name: this.firstName,
          last_name: this.lastName
        }

        const res = await axios.post('user/', data).catch(err => {
          this.usernameInfo = '\u00a0用户名已存在！';
          console.log(err);
        });

        console.log(res);
        if (res.status == 201) {
          this.notifyVue('top', 'right', '<span>Congrats!! 注册成功！</span>');
          this.$router.push('/login');
        }
      },
      notifyVue(verticalAlign, horizontalAlign, message) {
        this.$notifications.notify(
          {
            message: message,
            icon: 'nc-icon nc-app',
            horizontalAlign: horizontalAlign,
            verticalAlign: verticalAlign,
            type: this.notificationType[2]
          })
      },
    }
}
</script>

<style type="text/css">

  .register-card {
    margin-top: 50px;
    padding: 12px;
  }

</style>