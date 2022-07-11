<template>
  <div>
    <header style="text-align: center ; background-color: rgb(203 222 241);">
      <img src="https://assets.topdev.vn/images/2022/06/21/TopDev-logo2-HienLeMinh-1655775044.png">
    </header>
    <div >
      <h1 style="text-align: center">Welcome to newwave</h1>
    </div>
    <div class="container">
      <div class="row">
        <div class="col-sm-6">
          <div class="office-item">
            <div class="img-office">
              <img src="https://newwave.vn/wp-content/uploads/2022/02/office-hanoi.jpg" alt="HaNoi Newwave Solutions">
            </div>
          </div>
        </div>
        <div class="col-sm-6" style="text-align: right;">
          <div class="office-item">
            <div class="img-office">
              <img src="https://newwave.vn/wp-content/uploads/2022/02/office-tokyo.jpg" alt="Tokyo Newwave Solutions">
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import UserService from "@/services/UserService";

@Component
export default class Home extends Vue {
  private content = "Welcome to newwave";
  mounted() {}
}
</script>
<style scoped>
label {
  display: block;
  margin-top: 10px;
}

.row {
  display: flex;
  flex-wrap: wrap;
  margin-right: -15px;
  margin-left: -15px;
}
.our-offices-contact {
  padding: 5.625rem 0;
  font-size: 1rem;
  line-height: 1.5rem;
}

.our-offices-contact .office-address {
  margin-left: -10px;
  margin-right: -10px;
}
our-offices-contact .office-address .office-item {
  padding-left: 10px;
  padding-right: 10px;
  position: relative;
}
.our-offices-contact .office-address .img-office {
  border-radius: 4px;
  overflow: hidden;
}

.our-offices-contact .office-address .group-text-ft {
  position: absolute;
  font-size: 14px;
  line-height: 17px;
  font-weight: 700;
  bottom: 1.75rem;
  left: 0;
  right: 0;
}
</style>
