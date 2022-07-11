<template>
  <div class="auth_wrapper flex flex-col justify-center items-center mx-15">
    <div class="auth_wrapper__container">
      <form class="auth_wrapper__container__form">
        <div class="mb-6">
          <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >Введите email</label
          >
          <input
            type="email"
            id="email"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="name@flowbite.com"
            required
          />
        </div>
        <div class="mb-6">
          <label
            for="password"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >Введите пароль</label
          >
          <input
            type="password"
            id="password"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
        </div>
        <Button
          class="text-white bg-black hover:bg-black/80"
          @clickEvent="getData"
          :variant="variantBtn"
          type="submit"
        >
          Войти
        </Button>
      </form>
    </div>
  </div>
</template>

<script>
import Button from "../components/Button";
import { Component, Vue } from "vue-property-decorator";
@Component({
  name: "Login",
  components: { Button },
})
export default class Login extends Vue {}
</script>

<style lang="scss" scoped>
@import "src/assets/styles/auth";
</style>
