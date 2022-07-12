<template>
  <div class="hello">
    <label>
      {{ label }}
      <input
          :type="type"
          :placeholder="placeholder"
      >
    </label>
  </div>
</template>

<script>
export default {
  name: "BaseInput",
  props: {
    label: String,
    type: String,
    placeholder: String
  }
};
</script>
