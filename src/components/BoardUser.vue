<template>
  <div class="col-md-12">
    <div class="card card-container">
      <img
          id="profile-img"
          src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
          class="profile-img-card"
      />

      <form name="form" @submit.prevent="handleChangePassword">
        <div v-if="!successful">
          <div class="form-group">
            <label for="username">Username</label>
            <input
                v-model="userModel.username"
                v-validate="'required|min:3|max:20'"
                type="text"
                class="form-control"
                name="username"
            />
            <div
                v-if="submitted && errors.has('username')"
                class="alert-danger"
            >
              {{ errors.first("username") }}
            </div>
          </div>
          <!--          <div class="form-group">-->
          <!--            <label for="email">Email</label>-->
          <!--            <input-->
          <!--                v-model="user.email"-->
          <!--                v-validate="'required|email|max:50'"-->
          <!--                type="email"-->
          <!--                class="form-control"-->
          <!--                name="email"-->
          <!--            />-->
          <!--            <div v-if="submitted && errors.has('email')" class="alert-danger">-->
          <!--              {{ errors.first("email") }}-->
          <!--            </div>-->
          <!--          </div>-->
          <div class="form-group">
            <label for="password">Old Password</label>
            <input
                v-model="userModel.oldPassword"
                v-validate="'required|min:6|max:40'"
                type="password"
                class="form-control"
                name="password"
            />
            <div
                v-if="submitted && errors.has('password')"
                class="alert-danger"
            >
              {{ errors.first("password") }}
            </div>
          </div>
          <div class="form-group">
            <label for="password">New Password</label>
            <input
                v-model="userModel.newPassword"
                v-validate="'required|min:6|max:40'"
                type="password"
                class="form-control"
                name="password"
            />
            <div
                v-if="submitted && errors.has('password')"
                class="alert-danger"
            >
              {{ errors.first("password") }}
            </div>
          </div>
          <div class="form-group">
            <label for="password">Confirm New Password</label>
            <input
                v-model="userModel.conNewPassword"
                v-validate="'required|min:6|max:40'"
                type="password"
                class="form-control"
                name="password"
            />
            <div
                v-if="submitted && errors.has('password')"
                class="alert-danger"
            >
              {{ errors.first("password") }}
            </div>
          </div>
          <div class="form-group">
            <button class="btn btn-primary btn-block">Change</button>
          </div>
        </div>
      </form>

      <div
          v-if="message"
          class="alert"
          :class="successful ? 'alert-success' : 'alert-danger'"
      >
        {{ message }}
      </div>
    </div>
  </div>

</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import UserService from "@/services/UserService";
import {namespace} from "vuex-class";

const Auth = namespace("Auth");

@Component
export default class UserBoard extends Vue {
  private userModel: any = {id: "", username: "", email: "", oldPassword: "", newPassword: "", conNewPassword: ""};

  @Auth.State("user")
  private currentUser!: any;

  private submitted: boolean = false;
  private successful: boolean = false;
  private message: string = "";

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
            },
            (error) => {
              this.message = error.response.data.message;
              this.successful = false;
            }
        );
      }
    });
  }
}
</script>
<style scoped>

.container-user {
  text-align: center;
  width: 500px;
}

.modal-default-button {
  float: right;
}

label {
  display: block;
  margin-top: 10px;
}

.card-container.card {
  max-width: 350px !important;
  padding: 40px 40px;
}

.card {
  background-color: #f7f7f7;
  padding: 20px 25px 30px;
  margin: 0 auto 25px;
  margin-top: 50px;
  -moz-border-radius: 2px;
  -webkit-border-radius: 2px;
  border-radius: 2px;
  -moz-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  -webkit-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
}

.profile-img-card {
  width: 96px;
  height: 96px;
  margin: 0 auto 10px;
  display: block;
  -moz-border-radius: 50%;
  -webkit-border-radius: 50%;
  border-radius: 50%;
}
</style>
