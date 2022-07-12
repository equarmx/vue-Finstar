<template>
  <div class="auth_wrapper flex flex-col justify-center items-center mx-15">
    <div class="auth_wrapper__container">
      <form class="auth_wrapper__container__form" action="#">
        <div class="mb-6">
          <label
            for="email"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            :class="classStatusLabel('email')"
            >Введите email</label
          >
          <input
            type="email"
            id="email"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="name@flowbite.com"
            required
            v-model="email"
            :class="classStatusInput('email')"
          />
          <transition name="list">
            <small v-if="validateEmail" :class="classStatusSmall('email')"
              >Необходимо заполнить поле</small
            >
          </transition>
        </div>
        <div class="mb-6">
          <label
            for="password"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            :class="classStatusLabel('password')"
            >Введите пароль</label
          >
          <input
            type="password"
            id="password"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
            v-model="password"
            :class="classStatusInput('password')"
          />
          <transition name="list">
            <small v-if="validatePassword" :class="classStatusSmall('password')"
              >Необходимо заполнить поле</small
            >
          </transition>
        </div>
        <Button
          class="text-white bg-black hover:bg-black/80"
          @clickEvent="login"
          :variant="variantBtn"
          :disabled="btnDisabled"
          type="submit"
        >
          Войти
        </Button>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import Button from "../components/Button";
import { Component, Vue } from "vue-property-decorator";
import Logging from "@/services/logging";

interface StatusClass {
  "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-red-100 dark:border-red-400": boolean;
  "block mb-2 text-sm font-medium text-red-700 dark:text-red-500": boolean;
  "mt-2 text-sm text-red-600 dark:text-red-500": boolean;
}

@Component({
  name: "Login",
  components: { Button },
})
export default class Login extends Vue {
  email = null;
  password = null;
  startCheck = false;

  login(): void {
    this.$store.commit("changeLoadingList", true);
    if (this.validated) {
      const token = Logging.generateToken();
      Logging.setToken(token);
      this.$router.push({ path: "/" });
      this.$store.commit("changeNotification", {
        value: false,
        message: "",
      });
    } else {
      this.startCheck = true;
      this.$store.commit("changeNotification", {
        value: true,
        message: "Ошибка авторизации",
      });
    }
    this.$nextTick(() => {
      this.$store.commit("changeLoadingList", false);
    });
  }

  get validated(): boolean {
    return !!this.email && !!this.password;
  }

  get validateEmail(): boolean {
    return !this.email && this.startCheck;
  }

  get validatePassword(): boolean {
    return !this.password && this.startCheck;
  }

  get variantBtn(): string {
    return this.$store.state.notification.show && !this.validated ? "danger" : "primary";
  }

  get btnDisabled(): boolean {
    return this.$store.state.notification.show && !this.validated;
  }

  classStatusInput(element: string): StatusClass {
    const validationRule = element === "email" ? this.validateEmail : this.validatePassword;
    return {
      // Input
      "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-red-100 dark:border-red-400":
        validationRule,
    };
  }
  classStatusLabel(element: string): StatusClass {
    const validationRule = element === "email" ? this.validateEmail : this.validatePassword;
    return {
      // Label
      "block mb-2 text-sm font-medium text-red-700 dark:text-red-500": validationRule,
    };
  }
  classStatusSmall(element: string): StatusClass {
    const validationRule = element === "email" ? this.validateEmail : this.validatePassword;
    return {
      // Small
      "mt-2 text-sm text-red-600 dark:text-red-500": validationRule,
    };
  }
}
</script>

<style lang="scss" scoped>
@import "src/assets/styles/auth";
.list-item {
  display: inline-block;
  margin-right: 10px;
}
.list-enter-active,
.list-leave-active {
  transition: all 2s;
}
.list-enter,
.list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
</style>
