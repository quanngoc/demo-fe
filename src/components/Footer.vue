<template>
  <div class="title-content">
    <p class="text-top"></p>
    <el-footer class="footer-page">
      <el-row>
        <el-col :span="8">
          <div class="grid-content text-center">
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
export default class Footer extends Vue {

}

</script>
<style scoped>
label {
  display: block;
  margin-top: 10px;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
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
  background-color: #f7fbfd !important;
  height: 250px !important;
  margin-top: 150px;
  padding-top: 3.75rem;
}

.text-style {
  background: linear-gradient(45deg, #01c0ea 20%, #2991f7 100%, #9fd0ff 20%);
  background: -webkit-linear-gradient(45deg, #01c0ea 20%, #2991f7 100%, #9fd0ff 20%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>
