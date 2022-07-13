<template>
  <div class="col-md-12">
    <div class="card card-container">
      <img
          id="profile-img"
          src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
          class="profile-img-card"/>
      <BaseForm formname="login"></BaseForm>
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import {namespace} from "vuex-class";
import BaseForm from "@/components/BaseForm.vue";

const Auth = namespace("Auth");

@Component({
  components: {
    BaseForm
  }
})
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
  }
}
</script>

<style scoped>

label {
  display: block;
  margin-top: 10px;
}

.card-container.card {
  max-width: 430px !important;
  padding: 40px 40px;
}
</style>
