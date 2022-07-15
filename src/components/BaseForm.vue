<template>
  <el-form :model="userForm" :rules="rules" status-icon ref="userForm" label-width="120px">
    <el-form-item v-if="this.formname != DETAIL"
                  label="User Name"
                  prop="username">
      <el-input type="text" v-model.number="userForm.username" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item v-if="this.formname == REGISTER"
                  label="Email"
                  prop="email">
      <el-input type="text" v-model.number="userForm.email" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item v-if="this.formname == REGISTER"
                  label="Name"
                  prop="name">
      <el-input type="text" v-model.number="userForm.name" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item v-if="this.formname != DETAIL"
                  label="Password"
                  prop="password">
      <el-input type="password" v-model.number="userForm.password" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item v-if="this.formname == DETAIL"
                  label="Old Password"
                  prop="oldPassword">
      <el-input type="password" v-model.number="userForm.oldPassword" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item v-if="this.formname == DETAIL"
                  label="New Password"
                  prop="newPassword">
      <el-input type="password" v-model.number="userForm.newPassword" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item v-if="this.formname != LOGIN"
                  label="Confirm"
                  prop="conNewPassword">
      <el-input type="password" v-model.number="userForm.conNewPassword" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item v-if="this.formname == REGISTER"
                  label="Age"
                  prop="age">
      <el-input type="text" v-model.number="userForm.age" autocomplete="off"></el-input>
    </el-form-item>
    <el-button class="button-width" v-if="this.formname == DETAIL" type="primary" @click="handleChangePassword()">Change
    </el-button>
    <el-button class="button-width" v-if="this.formname == LOGIN" type="primary" @click="handleLogin()">Login
    </el-button>
    <el-button class="button-width" v-if="this.formname == REGISTER" type="primary" @click="handleRegister()">Register
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

  userForm = {username: "", email: "", password: "", oldPassword: "", newPassword: "", conNewPassword: "",name:"",age:"", id: ""}

  rules = {
    username: [{ required: true, message: 'user name is required', trigger: 'blur'}],
    email: [{ required: true, message: 'email is required', trigger: 'blur'}],
    name: [{ required: true, message: 'name is required', trigger: 'blur'}],
    password: [{ required: true, message: 'password is required', trigger: 'blur'}],
    oldPassword: [{ required: true, message: 'old password is required', trigger: 'blur'}],
    newPassword: [{ required: true, message: 'new password is required', trigger: 'blur'}],
    conNewPassword: [{ required: true, message: 'confirm password is required', trigger: 'blur'}],
    // name: [
    //   { required: true, message: 'Please input Activity name', trigger: 'blur' },
    //   { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' }
    // ],
    // region: [
    //   { required: true, message: 'Please select Activity zone', trigger: 'change' }
    // ],
    // date1: [
    //   { type: 'date', required: true, message: 'Please pick a date', trigger: 'change' }
    // ],
    // date2: [
    //   { type: 'date', required: true, message: 'Please pick a time', trigger: 'change' }
    // ],
    // type: [
    //   { type: 'array', required: true, message: 'Please select at least one activity type', trigger: 'change' }
    // ],
    // resource: [
    //   { required: true, message: 'Please select activity resource', trigger: 'change' }
    // ],
    // desc: [
    //   { required: true, message: 'Please input activity form', trigger: 'blur' }
    // ]
  }

  handleRegister() {
    (this.$refs.userForm as any).validate((valid: any) => {
      if (valid) {
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
      } else {
        return false;
      }
    });
  }

  handleChangePassword() {
    (this.$refs.userForm as any).validate((valid: any) => {
      if (valid) {
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
      } else {
        return false;
      }
    });
  }


  handleLogin() {
    (this.$refs.userForm as any).validate((valid: any) => {
      if (valid) {
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
      } else {
        return false;
      }
    });
  }
}
</script>
<style scoped>
.button-width {
  width: 100%;
}
</style>
