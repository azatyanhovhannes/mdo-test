<script lang="ts">
export default {
  props: {
    text: {
      type: String,
      required: true
    }
  },
  emits: ['click'],
  methods: {
    handleClick(): void {
      this.$emit('click')
    }
  }
}
</script>

<template>
  <button type="submit" class="button" @click="handleClick">
    {{ text }}
  </button>
</template>

<style scoped>
.button {
  cursor: pointer;
  width: 100%;
  padding: 8px 0;
  text-align: center;
  border-radius: 4px;
  background-color: #50B053;
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  color: #FFFFFF;
  border: none;
}
</style>