<template>
  <div id="app">
    <nav class="navbar navbar-expand navbar-dark " style="background-color: #0b78e5!important;">
      <a href class="navbar-brand" @click.prevent>Newwave</a>
      <div class="navbar-nav mr-auto">
        <li class="nav-item">
          <router-link to="/home" class="nav-link">
            <font-awesome-icon icon="home" /> Home
          </router-link>
        </li>
        <li v-if="showAdminBoard" class="nav-item">
          <router-link to="/admin" class="nav-link">Admin Board</router-link>
        </li>
        <li class="nav-item">
          <router-link v-if="currentUser" to="/user" class="nav-link"
          >User</router-link
          >
        </li>
      </div>

      <div v-if="!currentUser" class="navbar-nav ml-auto">
        <li class="nav-item">
          <router-link to="/register" class="nav-link">
            <font-awesome-icon icon="user-plus" /> Sign Up
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/login" class="nav-link">
            <font-awesome-icon icon="sign-in-alt" /> Login
          </router-link>
        </li>
      </div>

      <div v-if="currentUser" class="navbar-nav ml-auto">
        <li class="nav-item">
          <router-link to="/profile" class="nav-link">
            <font-awesome-icon icon="user" />
            {{ currentUser.username }}
          </router-link>
        </li>
        <li class="nav-item">
          <a class="nav-link" href @click.prevent="logOut">
            <font-awesome-icon icon="sign-out-alt" /> LogOut
          </a>
        </li>
      </div>
    </nav>

    <div style="max-width: 100%">
      <router-view />
    </div>
    <el-footer  class="footer-page" style="background-color: #0b78e5!important; height: 200px">
      <el-row>
        <el-col :span="8"><div class="grid-content ">
          footer 1
        </div></el-col>
        <el-col :span="8"><div class="grid-content ">
          footer 2
        </div></el-col>
        <el-col :span="8"><div class="grid-content ">
          footer 3
        </div></el-col>
      </el-row>
    </el-footer>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";
import { BootstrapVue} from "bootstrap-vue"
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
.footer-page .image-bg-footer {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
