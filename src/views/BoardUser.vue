<template>
  <div class="col-md-12">
    <div class="card card-container">
      <img
          id="profile-img"
          src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
          class="profile-img-card"/>
      <BaseForm formname="detail"></BaseForm>
    </div>
  </div>

</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import BaseForm from "@/components/BaseForm.vue";

@Component({
  components: {
    BaseForm
  }
})
export default class UserBoard extends Vue {

}
</script>

<style scoped>
label {
  display: block;
  margin-top: 10px;
}

.card-container.card {
  max-width: 430px !important;
  padding: 40px 40px;
}
</style>
