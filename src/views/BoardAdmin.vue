<template>
  <div class="container">
    <div>
      <el-input placeholder="User Name" type="text"
                name="username" v-model="params.userName"
                class="text-search">
      </el-input>
      <el-input placeholder="Email" type="text"
                name="username" v-model="params.email"
                class="text-search">

      </el-input>
      <el-button type="primary" @click="searchUser">Search</el-button>
      <el-button type="warning" @click="exportExcel" class="export-excel">Export Excel</el-button>
    </div>
    <br>
    <el-table :data="this.content" class="table-width">
      <el-table-column fixed prop="id" label="ID"/>
      <el-table-column label="PDF">
        <template #default="scope">
          <el-tooltip content="Export PDF" placement="top">
            <i class="el-icon-picture icons-size" @click="exportPDF(scope.row)"></i>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column prop="username" label="User Name"/>
      <el-table-column prop="email" label="Email"/>
      <el-table-column fixed="right" label="Operations">
        <template #default="scope">
          <el-tooltip content="View Detail" placement="top">
            <i class="el-icon-user icons-size" @click="showDetail(scope.row)"></i>
          </el-tooltip>
          <el-tooltip content="Reset Password" placement="top">
            <i class="el-icon-refresh-left icon-tooltip" @click="showModal(scope.row)"></i>
          </el-tooltip>
          <el-tooltip v-if="scope.row.roles[0] != ROLE_ADMIN" content="Update Role" placement="top">
            <i class="el-icon-edit icons-size" @click="editRole(scope.row)"></i>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <br>
    <el-pagination background layout=" prev, pager, next" :current-page="this.currentPage"
        @current-change="handleCurrentChange"
        :total=this.totalElements>
    </el-pagination>
    <el-dialog :visible.sync="resetPassword" width="30%" center>
      <div class="text-reset-pass">
        Bạn có đồng ý đặt lại mật khẩu mặc định ?
      </div>
      <div class="modal-footer">
        <slot name="footer">
          <el-button @click="hideModal" type="danger">Close</el-button>
        </slot>
        <slot name="footer">
          <el-button type="success" @click="submitResetPassword">OK</el-button>
        </slot>
      </div>
    </el-dialog>

    <el-dialog title="View Detail" :visible.sync="viewDetail" width="30%" center>
      <div class="user-form">
        <span class="user-id">ID is:</span>
        <el-input placeholder="user name" type="text" disabled
                  name="username" v-model="userModel.id"
                  class="user-id-input"></el-input>
        <span class="user-name">UserName is:</span>
        <el-input placeholder="user name" type="text" disabled
                  name="username" v-model="userModel.username"
                  class="user-name-input"></el-input>
        <span class="user-email">Email is:</span>
        <el-input placeholder="user name" type="text" disabled
                  name="username" v-model="userModel.email"
                  class="user-email-input"></el-input>
      </div>
      <br>
      <div class="modal-footer">
        <slot name="footer">
          <el-button @click="hideModal" type="danger">Close</el-button>
        </slot>
        <slot name="footer">
          <el-button type="success" @click="hideModal">OK</el-button>
        </slot>
      </div>
    </el-dialog>

    <el-dialog title="Update Role" :visible.sync="showRole" width="30%" center>
      <div class="user-form">
        <span class="user-id">ID is:</span>
        <el-input class="user-id-input" placeholder="id" type="text" disabled
                  name="id" v-model="userModel.id"></el-input>
        <span class="user-name">UserName is:</span>
        <el-input class="user-name-input" placeholder="user name" type="text" disabled
                  name="username" v-model="userModel.username"></el-input>
        <span class="user-email">Email is:</span>
        <el-input class="user-email-input" placeholder="user name" type="text" disabled
                  name="username" v-model="userModel.email"></el-input>
        <span class="user-role">Role is:</span>
        <el-select class="user-role-select" v-model="value" placeholder="Select">
          <el-option
              v-for="item in this.roles"
              :key="item.value"
              :value="item.value">
          </el-option>
        </el-select>
      </div>
      <br>
      <div class="modal-footer">
        <slot name="footer">
          <el-button @click="hideModal" type="danger">Close</el-button>
        </slot>
        <slot name="footer">
          <el-button type="success" @click="updateRole">OK</el-button>
        </slot>
      </div>
    </el-dialog>

  </div>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import UserService from "@/services/user-service";
import "bootstrap/dist/css/bootstrap.min.css";
import {namespace} from "vuex-class";

const Auth = namespace("Auth");

@Component
export default class AdminBoard extends Vue {
  private content = [];
  private resetPassword = false;
  private viewDetail = false;
  private showRole = false;
  private userModel: any = {id: "", username: "", email: "", password: "", role: ""};
  private totalElements = null;
  roles: any = [{value: "ROLE_USER"}, {value: "ROLE_ADMIN"}];
  value = "";
  ROLE_ADMIN = "ROLE_ADMIN";

  params: any = {
    userName: null,
    email: null,
    page: 0
  };
  currentPage = 1;

  @Auth.Action
  private signOut!: () => void;

  @Auth.State("user")
  private currentUser!: any;


  mounted() {
    this.searchUser();
  }

  showModal(item: any) {
    this.resetPassword = true;
    this.userModel = item;
  }

  showDetail(item: any) {
    this.viewDetail = true;
    this.userModel = item;
  }

  editRole(item: any) {
    this.showRole = true;
    this.userModel = item;
    this.value = item.roles[0];
  }

  hideModal() {
    this.resetPassword = false;
    this.viewDetail = false;
    this.showRole = false;
  }

  submitResetPassword() {
    this.resetPassword = false;
    UserService.resetPassword(this.userModel.id).then(
        (response) => {
          this.content = response.data.content;
          if (this.userModel.id != this.currentUser.id) {
            this.$router.push("/home");
            this.$notify({
              title: 'Success',
              message: 'This is a success message',
              type: 'success'
            });
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
          this.$notify.error({
            title: 'Error',
            message: error.response.data.message
          });
        }
    );
  }

  exportPDF(data: any) {
    UserService.downloadFilePDF(data.id, data.username);
  }

  exportExcel() {
    UserService.downloadFileExcel();
  }

  handleCurrentChange(val: any) {
    let query = Object.assign({}, this.params);
    Object.keys(query).forEach(key => {
      if (query[key] == null || query[key] == '') {
        delete query[key];
      }
    });
    query['page'] = query['page'] - 1;
    this.params.page = val - 1;
    this.search();

  }

  search() {
    this.$router.push({ path: "/admin", query: this.params });
    UserService.search(this.params).then(
        (response) => {
          this.content = response.data.content;
          this.totalElements = response.data.totalElements;
        },
        (error) => {
          this.content =
              (error.response && error.response.data && error.response.data.message) ||
              error.message ||
              error.toString();
          this.$notify.error({
            title: 'Error',
            message: error.response.data.message
          });
        }
    );
  }

  updateRole() {
    this.userModel.role = this.value;
    UserService.updateRole(this.userModel).then(
        (response) => {
          this.content = response.data.content;
          this.$router.push("/home");
          this.$notify({
            title: 'Success',
            message: 'This is a success message',
            type: 'success'
          });
        },
        (error) => {
          this.content =
              (error.response && error.response.data && error.response.data.message) ||
              error.message ||
              error.toString();
          this.$notify.error({
            title: 'Error',
            message: error.response.data.message
          });
        }
    );
  }

  searchUser() {
    let query = Object.assign({}, this.params);
    Object.keys(query).forEach(key => {
      if (query[key] == null || query[key] == '') {
        delete query[key];
      }
    });
    this.params = query;
    this.search();
  }
}
</script>

<style>
.text-search {
  width: 250px;
  border-radius: 6px;
  margin-right: 10px;
  margin-top: 10px;
  margin-left: 10px;
}

.export-excel {
  float: right;
  margin-top: 12px
}

.table-width {
  width: 100%;
  max-height: 1250px
}

.icons-size {
  margin-right: 20px;
  font-size: 20px
}

.user-form .user-id {
  padding-right: 123px;
}

.user-form .user-id-input {
  width: 250px;
  border-radius: 6px;
  margin-right: 105px;
  margin-top: 10px;
  margin-left: 10px;
}

.user-form .user-name {
  padding-right: 46px;
}

.user-form .user-name-input {
  width: 250px;
  border-radius: 6px;
  margin-right: 107px;
  margin-top: 10px;
  margin-left: 35px;
}

.user-form .user-email {
  padding-right: 103px;
}

.user-form .user-email-input {
  width: 250px;
  border-radius: 6px;
  margin-right: 103px;
  margin-top: 10px;
  margin-left: 10px;
}

.user-form .user-role {
  padding-right: 85px;
  margin-left: 5px;
}

.user-form .user-role-select {
  width: 252px;
  margin-top: 7px;
  margin-left: 27px;
}

.icon-tooltip {
  margin-right: 20px;
  font-size: 20px
}

.text-reset-pass {
  margin-bottom: 20px
}
</style>
