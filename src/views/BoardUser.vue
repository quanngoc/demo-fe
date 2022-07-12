<template>
  <div class="col-md-12">
    <div class="card card-container">
      <img
          id="profile-img"
          src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
          class="profile-img-card"/>
      <form name="form" @submit.prevent="handleChangePassword">
        <div v-if="!successful">
          <div class="form-group">
            <label for="username">Username</label>
            <input
                v-model="userModel.username"
                v-validate="'required|min:3|max:20'"
                type="text"
                class="form-control"
                name="username"/>
            <div v-if="submitted && errors.has('username')"
                class="alert-danger">
              {{ errors.first("username") }}
            </div>
          </div>
          <div class="form-group">
            <label for="password">Old Password</label>
            <input
                v-model="userModel.oldPassword"
                v-validate="'required|min:6|max:40'"
                type="password"
                class="form-control"
                name="password"/>
            <div v-if="submitted && errors.has('password')"
                class="alert-danger">
              {{ errors.first("password") }}
            </div>
          </div>
          <div class="form-group">
            <label for="password">New Password</label>
            <input v-model="userModel.newPassword"
                v-validate="'required|min:6|max:40'"
                type="password"
                class="form-control"
                name="password"/>
            <div v-if="submitted && errors.has('password')"
                class="alert-danger">
              {{ errors.first("password") }}
            </div>
          </div>
          <div class="form-group">
            <label for="password">Confirm New Password</label>
            <input v-model="userModel.conNewPassword"
                v-validate="'required|min:6|max:40'"
                type="password"
                class="form-control"
                name="password"/>
            <div v-if="submitted && errors.has('password')"
                class="alert-danger">
              {{ errors.first("password") }}
            </div>
          </div>
          <div class="form-group">
            <button class="btn btn-primary btn-block">Change</button>
          </div>
        </div>
      </form>
      <div v-if="message"
          class="alert"
          :class="successful ? 'alert-success' : 'alert-danger'">
        {{ message }}
      </div>
    </div>
  </div>

</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import UserService from "@/services/user-service";
import {namespace} from "vuex-class";

const Auth = namespace("Auth");

@Component
export default class UserBoard extends Vue {
  private userModel: any = {id: "", username: "", email: "", oldPassword: "", newPassword: "", conNewPassword: ""};
  private submitted: boolean = false;
  private successful: boolean = false;
  private message: string = "";

  @Auth.State("user")
  private currentUser!: any;

  @Auth.Getter
  private isLoggedIn!: boolean;


  mounted() {
    UserService.getUser(this.currentUser.id).then(
        (response) => {
          this.userModel = response.data;
        },
        (error) => {
          this.userModel =
              (error.response && error.response.data && error.response.data.message) ||
              error.message ||
              error.toString();
          this.$notify.error({
            title: 'Error',
            message: error.message
          });
        }
    );
  }

  handleChangePassword() {
    this.message = "";
    this.submitted = true;

    this.$validator.validate().then((isValid) => {
      if (isValid) {
        console.log(this.userModel);
        UserService.changePassword(this.userModel).then(
            (data) => {
              this.successful = true;
              this.$router.push("/home");
              this.$notify({
                title: 'Success',
                message: 'This is a success message',
                type: 'success'
              });
            },
            (error) => {
              this.message = error.response.data.message;
              this.successful = false;
              this.$notify.error({
                title: 'Error',
                message: error.response.data.message
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
