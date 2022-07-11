<template>
  <div class="container">
    <span >Username</span>
    <input
        v-model="params.userName"
        type="text"
        name="username"
        style="width: 250px; border-radius: 6px;margin-right: 10px;margin-top: 10px;margin-left: 10px;"
    />

    <span >Email</span>
    <input
        v-model="params.email"
        type="text"
        name="email"
        style="width: 250px; border-radius: 6px;margin-right: 10px;margin-top: 10px;margin-left: 10px;"
    />
    <button type="submit" @click="search"  style="background-color: #3c93f1;border-radius: 5px;border: 1px;width: 90px">Search</button>



    <div>
      <button class="modal-default-button" @click="exportExcel" style="background-color: #f7cd50;border-radius: 5px;border: 1px;">
        Export Excel
      </button>
    </div>

    <div>
      <table class="table" id="datatable">
        <thead>
        <tr>
          <th>ID</th>
          <th>UserName</th>
          <th>Email</th>
          <th></th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="item in content" :key="item.id">
          <td>{{ item.id }}</td>
          <td>{{ item.username }}</td>
          <td>{{ item.email }}</td>
          <td>
            <div class="h3 mb-0">
            <b-dropdown id="dropdown-1" text="Action" class="m-md-2">
              <b-dropdown-item id="show-btn" @click="showModal(item)">Reset Password</b-dropdown-item>
              <b-dropdown-item  id="show-btn" @click="showDetail(item)">View Detail</b-dropdown-item>
              <b-dropdown-item  id="show-btn" @click="showRoles(item)" >Update Role</b-dropdown-item>
              <b-dropdown-item  id="show-btn" @click="exportPDF(item)" >Export PDF</b-dropdown-item>
            </b-dropdown>
          </div>
          </td>
        </tr>
        </tbody>
      </table>
    </div>


    <div v-if="showModel">
      <transition name="modal">
        <div class="modal-mask">
          <div class="modal-wrapper">
            <div class="modal-container">

              <div class="modal-header">
                <slot name="header">
                  Bạn có đồng ý đặt lại mật khẩu mặc định ?
                </slot>
              </div>

              <div class="modal-footer">
                <slot name="footer">
                  <button class="modal-default-button" @click="hideModal" style="background-color: #f70b0b;border-radius: 5px;border: 1px;">
                    Close
                  </button>
                </slot>
                <slot name="footer">
                  <button class="modal-default-button" @click="submitResetpassword" style="background-color: #2c8df5;border-radius: 5px;border: 1px;">
                    OK
                  </button>
                </slot>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>

    <div v-if="viewDetail">
      <transition name="modal">
        <div class="modal-mask">
          <div class="modal-wrapper">
            <div class="modal-container">

              <div >
                <span style="padding-right: 70px;">ID is:</span>
                <input style="margin-block: 10px;" v-model="userModel.id" disabled/><br>
                <span style="padding-right: 10px;">UserName is:</span>
                <input style="margin-block: 10px;" v-model="userModel.username" disabled/><br>
                <span style="padding-right: 47px;" >Email is:</span>
                <input style="margin-block: 10px;" v-model="userModel.email" disabled/><br>
              </div>

              <div class="modal-footer">
                <slot name="footer">
                  <button class="modal-default-button" @click="hideModal" style="background-color: #f70b0b;border-radius: 5px;border: 1px;">
                    Close
                  </button>
                </slot>
                <slot name="footer">
                  <button class="modal-default-button" @click="hideModal" style="background-color: #2c8df5;border-radius: 5px;border: 1px;">
                    OK
                  </button>
                </slot>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>

    <div v-if="showRole">
      <transition name="modal">
        <div class="modal-mask">
          <div class="modal-wrapper">
            <div class="modal-container">

              <div >
                <span style="padding-right: 70px;">ID is:</span>
                <input style="margin-block: 10px;" v-model="userModel.id"  disabled/><br>
                <span style="padding-right: 10px;">UserName is:</span>
                <input style="margin-block: 10px;" v-model="userModel.username" disabled/><br>
                <span style="padding-right: 47px;" >Email is:</span>
                <input style="margin-block: 10px;" v-model="userModel.email"  disabled/><br>
                <span style="padding-right: 70px;">Role is:</span>
                <select class="form-control" :required="true">
                  <option
                      v-for="option in roles"
                      v-bind:value="option.name"
                  >{{ option.name }}</option>
                </select>
                <input style="margin-block: 10px;" v-model="userModel.roles" placeholder="edit me" /><br>
                <select class="form-control" v-model="selected" >
                  <option v-for="item in roles" :value="item" :key="item.name">
                    {{ item.name }}
                  </option>
                </select>
              </div>

              <div class="modal-footer">
                <slot name="footer">
                  <button class="modal-default-button" @click="hideModal" style="background-color: #f70b0b;border-radius: 5px;border: 1px;">
                    Close
                  </button>
                </slot>
                <slot name="footer">
                  <button class="modal-default-button" @click="hideModal" style="background-color: #2c8df5;border-radius: 5px;border: 1px;">
                    OK
                  </button>
                </slot>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>

  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import UserService from "@/services/UserService";
import "bootstrap/dist/css/bootstrap.min.css";
import {namespace} from "vuex-class";
const Auth = namespace("Auth");

@Component
export default class AdminBoard extends Vue {
  private content = "";
  private showModel = false;
  private viewDetail = false;
  private showRole = false;
  private userModel: any = { id:"", username: "", email: "", password: "", roles: "" };
  private roles: any = [{name:"ROLE_USER"},{name:"ROLE_ADMIN"}]
  pageSize: number = 20;
  params: any = {
    userName: null,
    email: null,
    page: 0
  };
  @Auth.Action
  private signOut!: () => void;

  @Auth.State("user")
  private currentUser!: any;

  mounted() {
    UserService.getAdminBoard().then(
        (response) => {
          this.content = response.data.content;
        },
        (error) => {
          this.content =
              (error.response && error.response.data && error.response.data.message) ||
              error.message ||
              error.toString();
        }
    );
  }

  showModal(item:any) {
    this.showModel = true;
    this.userModel = item;
  }

  showDetail(item:any) {
    this.viewDetail = true;
    this.userModel = item;
  }

  showRoles(item:any) {
    this.showRole = true;
    this.userModel = item;
  }

  hideModal() {
    this.showModel = false;
    this.viewDetail = false;
    this.showRole = false;
  }

  submitResetpassword() {
    this.showModel = false;
    console.log(this.userModel);
    UserService.resetPassword(this.userModel.id).then(
        (response) => {
          this.content = response.data.content;
          if (this.userModel.id != this.currentUser.id) {
            this.$router.push("/home");
          } else {
            this.signOut();
            this.$router.push("/login");
          }
          this.userModel = null;
        },
        (error) => {
          this.content =
              (error.response && error.response.data && error.response.data.message) ||
              error.message ||
              error.toString();
        }
    );
  }

  exportPDF(data:any) {
  UserService.downloadFilePDF(data.id);

  }

  exportExcel() {
    UserService.downloadFileExcel();
  }

  search() {
    let query = Object.assign({}, this.params);
    Object.keys(query).forEach(key => {
      if (query[key] == null || query[key] == '') {
        delete query[key];
      }
    });
    query['page'] = query['page'] - 1;

    UserService.search(this.params).then(
        (response) => {
          this.content = response.data.content;
        },
        (error) => {
          this.content =
              (error.response && error.response.data && error.response.data.message) ||
              error.message ||
              error.toString();
        }
    );
  }
}
</script>

<style>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 500px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
  border-radius: 10px;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-default-button {
  float: right;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

</style>
