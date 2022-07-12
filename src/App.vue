<template>
  <div id="app">
    <nav class="navbar navbar-expand navbar-dark " style="background-color: #0b78e5!important;">
      <a href class="navbar-brand" @click.prevent>Newwave</a>
      <div class="navbar-nav mr-auto">
        <li class="nav-item">
          <router-link to="/home" class="nav-link">
            <font-awesome-icon icon="home"/>
            Home
          </router-link>
        </li>
        <li v-if="showAdminBoard" class="nav-item">
          <router-link to="/admin" class="nav-link">Admin Board</router-link>
        </li>
        <li class="nav-item">
          <router-link v-if="currentUser" to="/user" class="nav-link"
          >User
          </router-link
          >
        </li>
      </div>

      <div v-if="!currentUser" class="navbar-nav ml-auto">
        <li class="nav-item">
          <router-link to="/register" class="nav-link">
            <font-awesome-icon icon="user-plus"/>
            Sign Up
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/login" class="nav-link">
            <font-awesome-icon icon="sign-in-alt"/>
            Login
          </router-link>
        </li>
      </div>

      <div v-if="currentUser" class="navbar-nav ml-auto">
        <li class="nav-item">
          <router-link to="/profile" class="nav-link">
            <font-awesome-icon icon="user"/>
            {{ currentUser.username }}
          </router-link>
        </li>
        <li class="nav-item">
          <a class="nav-link" href @click.prevent="logOut">
            <font-awesome-icon icon="sign-out-alt"/>
            LogOut
          </a>
        </li>
      </div>
    </nav>

    <div style="max-width: 100%">
      <router-view/>
    </div>
<!--    <el-footer class="footer-page" style="background-color: #f7fbfd!important; height: 250px; margin-top: 150px">-->
<!--      <el-row>-->
<!--        <el-col :span="8">-->
<!--          <div class="grid-content " style="text-align: center">-->
<!--            <h2 class="text-style">About</h2>-->
<!--            <p><a href="https://newwave.vn/contact/" target="_blank">- Contact</a></p>-->
<!--            <p><a href="https://github.com/quanngoc/newwave-fe" target="_blank">- GitHub</a></p>-->
<!--          </div>-->
<!--        </el-col>-->
<!--        <el-col :span="8">-->
<!--          <div class="grid-content ">-->
<!--            <h2 class="text-style">Contact Us</h2>-->
<!--            <p><a href="https://newwave.vn/contact/" target="_blank">- Contact</a></p>-->
<!--            <p><a href="https://newwave.vn/blog/" target="_blank">- Blog</a></p>-->
<!--          </div>-->
<!--        </el-col>-->
<!--        <el-col :span="8">-->
<!--          <div class="grid-content ">-->
<!--          </div>-->
<!--        </el-col>-->
<!--      </el-row>-->
<!--    </el-footer>-->
  </div>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import {namespace} from "vuex-class";
import {BootstrapVue} from "bootstrap-vue"
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

const Auth = namespace("Auth");

Vue.use(BootstrapVue)
Vue.use(ElementUI);


@Component
export default class App extends Vue {
  @Auth.State("user")
  private currentUser!: any;

  @Auth.Action
  private signOut!: () => void;

  get showAdminBoard(): boolean {
    if (this.currentUser && this.currentUser.roles) {
      return this.currentUser.roles.includes("ROLE_ADMIN");
    }

    return false;
  }

  logOut() {
    this.signOut();
    this.$router.push("/login");
  }
}
</script>
<style>
.footer-page {
  background: #F7F9FC;
  padding-top: 3.75rem;
}

.text-style {
  background: linear-gradient(45deg, #01c0ea 20%, #2991f7 100%, #9fd0ff 20%);
  background: -webkit-linear-gradient(45deg, #01c0ea 20%, #2991f7 100%, #9fd0ff 20%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>
