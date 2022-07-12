<template>
  <div class="col-md-12">
    <div class="card card-container">
      <img
          id="profile-img"
          src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
          class="profile-img-card"/>
      <form name="form" @submit.prevent="handleLogin">
        <div class="form-group">
          <label for="username">Username</label>
          <input v-model="user.username"
              v-validate="'required'"
              type="text"
              class="form-control"
              name="username"/>
          <div v-if="errors.has('username')"
              class="alert alert-danger"
              role="alert">
            Username is required!
          </div>
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input v-model="user.password"
              v-validate="'required'"
              type="password"
              class="form-control"
              name="password"/>
          <div v-if="errors.has('password')"
              class="alert alert-danger"
              role="alert">
            Password is required!
          </div>
        </div>
        <div class="form-group">
          <button class="btn btn-primary btn-block" :disabled="loading">
            <span
                v-show="loading"
                class="spinner-border spinner-border-sm"></span>
            <span>Login</span>
          </button>
        </div>
        <div class="form-group">
          <div v-if="message" class="alert alert-danger" role="alert">
            {{ message }}
          </div>
        </div>
      </form>

    </div>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import {namespace} from "vuex-class";

const Auth = namespace("Auth");

@Component
export default class Login extends Vue {
  private user: any = {username: "", password: ""};
  private loading: boolean = false;
  private message: string = "";

  @Auth.Getter
  private isLoggedIn!: boolean;

  @Auth.Action
  private login!: (data: any) => Promise<any>;

  numberValidateForm: any = {
    age: ''
  }

  handleLogin() {
    this.loading = true;
    this.$validator.validateAll().then((isValid) => {
      if (!isValid) {
        this.loading = false;
        return;
      }

      if (this.user.username && this.user.password) {
        this.login(this.user).then(
            (data) => {
              this.$router.push("/home");
            },
            (error) => {
              this.loading = false;
              this.message = "Username Or Password not correct!";
              this.$notify.error({
                title: 'Error',
                message: 'Username Or Password not correct!'
              });
            }
        );
      }
    });
  }
}
</script>

<style scoped>

label {
  display: block;
  margin-top: 10px;
}

.card-container.card {
  max-width: 350px !important;
  padding: 40px 40px;
}
</style>
