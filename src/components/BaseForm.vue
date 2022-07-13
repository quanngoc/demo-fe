<template>
  <el-form :model="userForm" status-icon ref="userForm" label-width="120px">
    <el-form-item v-if="this.formname != DETAIL"
                  label="User Name"
                  prop="username"
                  :rules="[
      { required: true, message: 'user name is required'}
    ]">
      <el-input type="text" v-model.number="userForm.username" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item v-if="this.formname == REGISTER"
                  label="Email"
                  prop="email"
                  :rules="[
      { required: true, message: 'email is required'}
    ]">
      <el-input type="text" v-model.number="userForm.email" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item v-if="this.formname != DETAIL"
                  label="Password"
                  prop="password"
                  :rules="[
      { required: true, message: 'password is required'}
    ]">
      <el-input type="password" v-model.number="userForm.password" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item v-if="this.formname == DETAIL"
                  label="Old Password"
                  prop="oldPassword"
                  :rules="[
      { required: true, message: 'old password is required'}
    ]">
      <el-input type="password" v-model.number="userForm.oldPassword" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item v-if="this.formname == DETAIL"
                  label="New Password"
                  prop="newPassword"
                  :rules="[
      { required: true, message: 'new password is required'}
    ]">
      <el-input type="password" v-model.number="userForm.newPassword" autocomplete="off"></el-input>
    </el-form-item>

    <el-form-item v-if="this.formname == DETAIL"
                  label="Confirm"
                  prop="conNewPassword"
                  :rules="[
      { required: true, message: 'confirm password is required'}
    ]">
      <el-input type="password" v-model.number="userForm.conNewPassword" autocomplete="off"></el-input>
    </el-form-item>

    <el-button class="button-width" v-if="this.formname == DETAIL" type="primary" @click="handleChangePassword()">
      Change
    </el-button>
    <el-button class="button-width" v-if="this.formname == LOGIN" type="primary" @click="handleLogin()">Login
    </el-button>
    <el-button class="button-width" v-if="this.formname == REGISTER" type="primary" @click="handleRegister()">
      Register
    </el-button>
  </el-form>
</template>
<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator'
import UserService from "@/services/user-service";
import {namespace} from "vuex-class";


const Auth = namespace("Auth");

@Component
export default class BaseForm extends Vue {

  DETAIL = "detail";
  LOGIN = "login";
  REGISTER = "register"
  @Auth.Action
  private login!: (data: any) => Promise<any>;

  @Auth.Action
  private register!: (data: any) => Promise<any>;

  @Auth.State("user")
  private currentUser!: any;

  @Prop(String) readonly formname: any;

  userForm = {username: "", email: "", password: "", oldPassword: "", newPassword: "", conNewPassword: "", id: ""}


  handleRegister() {
    if (!this.userForm.username && !this.userForm.email && !this.userForm.password) {
      return false;
    }

    this.register(this.userForm).then(
        (data) => {
          this.$router.push("/home");
        },
        (error) => {
          this.$notify.error({
            title: 'Error',
            message: error
          });
        }
    );
  }

  handleChangePassword() {
    if (!this.userForm.oldPassword && !this.userForm.newPassword && !this.userForm.conNewPassword) {
      return false;
    }

    this.userForm.id = this.currentUser.id;
    UserService.changePassword(this.userForm).then(
        (data) => {
          this.$router.push("/home");
          this.$notify({
            title: 'Success',
            message: 'This is a success message',
            type: 'success'
          });
        },
        (error) => {
          this.$notify.error({
            title: 'Error',
            message: error.response.data.message
          });
        }
    );
  }


  handleLogin() {
    if (!this.userForm.username && !this.userForm.password) return

    this.login(this.userForm).then(
        (data) => {
          this.$router.push("/home");
        },
        (error) => {
          this.$notify.error({
            title: 'Error',
            message: 'Username Or Password not correct!'
          });
        }
    );
  }

}
</script>

<style scoped>
.button-width {
  width: 100%;
}
</style>
