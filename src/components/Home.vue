<template>
  <div class="title-content">
    <!--    <header style="text-align: center ; background-color: rgb(203 222 241);">-->
    <!--      <img src="https://assets.topdev.vn/images/2022/06/21/TopDev-logo2-HienLeMinh-1655775044.png">-->
    <!--    </header>-->
    <p class="text-top"></p>
    <el-row :gutter="10">
      <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1">
        <div class="grid-content "></div>
      </el-col>
      <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11">
        <div>
          <h2>
            <span class="text-top">Chào Mừng Bạn Đến Với </span><br>
            <span class="black-text">Newwave Solutions</span>
          </h2>
          <div class="info-recruit">
            <p>
              Newwave Solutions là một trong những công ty IT outsourcing hàng đầu cung cấp các dịch vụ công nghệ thông
              tin với
              <b>10+ năm kinh nghiệm</b> và
              <b>300+ nhân viên </b>
            </p>
            <p>
              Với tầm nhìn cung cấp những giải pháp phát triển phần mềm và chuyển đổi số để tối ưu hoá quy trình sản
              xuất,
              kinh doanh của các công ty, doanh nghiệp trên toàn thế giới với chi phí hợp lý và hiệu quả cao, chúng tôi
              cung cấp đa dạng các dịch vụ như:
            </p>
            <p>- Phát triển ứng dụng trên di động (Mobile Apps Development)</p>
            <p>- Phát triền phần mềm (Software Development)</p>
            <p>- Kiểm thử phần mềm (QA & Testing)</p>
            <p>- Bảo trì phần mềm (Software Maintenance)</p>
            <p>- Thiết kế UI & UX</p>
            <p>- Nghiên cứu & phát triển sản phẩm (R&D)</p>
            <p>- Phát triển các sản phẩm Game ( Game Development)</p>
          </div>
        </div>
      </el-col>
      <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11">
        <div class="grid-content ">
          <div class="image-content">
            <img src="https://tuyendung.newwave.vn/storage/1651848003_fnIIGsAC4r.svg" alt="Recruit Image"></div>
        </div>
      </el-col>
      <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1">
        <div class="grid-content"></div>
      </el-col>
    </el-row>
    <el-footer class="footer-page" style="background-color: #f7fbfd!important; height: 250px; margin-top: 150px">
      <el-row>
        <el-col :span="8">
          <div class="grid-content " style="text-align: center">
            <h2 class="text-style">About</h2>
            <p><a href="https://newwave.vn/contact/" target="_blank">- Contact</a></p>
            <p><a href="https://github.com/quanngoc/newwave-fe" target="_blank">- GitHub</a></p>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content ">
            <h2 class="text-style">Contact Us</h2>
            <p><a href="https://newwave.vn/contact/" target="_blank">- Contact</a></p>
            <p><a href="https://newwave.vn/blog/" target="_blank">- Blog</a></p>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content ">
          </div>
        </el-col>
      </el-row>
    </el-footer>
  </div>

</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";

@Component
export default class Home extends Vue {
  private content = "Welcome to newwave";

  mounted() {
  }
}
</script>
<style scoped>
label {
  display: block;
  margin-top: 10px;
}

.info-recruit {
  margin-bottom: 2.1875rem;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}

.black-text {
  font-size: 2.75rem;
  text-transform: capitalize;
  font-weight: 500;
  line-height: 130%;
  color: #003e83;
}

.text-top {
  font-weight: 700;
  font-size: 16px;
  line-height: 24px;
  text-transform: uppercase;
  background: linear-gradient(45deg, #01c0ea 30%, #2991f7 100%, #9fd0ff 20%);
  background: -webkit-linear-gradient(45deg, #01c0ea 30%, #2991f7 100%, #9fd0ff 20%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  width: max-content;
}

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
