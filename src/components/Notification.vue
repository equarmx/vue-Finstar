<template>
  <div class="notification_wrapper">
    <span class="notification_wrapper__text"> Список пока что пуст, нажмите на кнопку ;) </span>
  </div>
</template>

<script>
export default {
  name: "Notification",
};
</script>

<style lang="scss" scoped>
.notification_wrapper {
  background: #ffebeb;
  padding: 15px 18px;
  border-radius: 10px;
  &__text {
    font-size: 1.2em;
    font-weight: 600;
    color: #ff5252;
  }
}
</style>
