<script setup lang="ts">
import { field, getErrorMessage, logger } from "@celeris/utils";
import { message } from "ant-design-vue";
import type { Rule } from "ant-design-vue/es/form";
import { useUserStore } from "~/store/modules/user";

// 登录表单数据
import type { LoginFromType } from "~/pages/login/types";

const loginFormModel: LoginFromType = reactive<LoginFromType>({
  username: "kirklin",
  password: "123456",
});
const loginRules: Record<string, Rule[]> = reactive({
  username: [{ required: true, message: "please input your username", trigger: "blur" }],
  password: [{ required: true, message: "please input your password", trigger: "blur" }],
});

const loading = ref<boolean>(false);
const loginFormRef = shallowRef();

/**
 * This function handles the login process
 */
const login = async () => {
  try {
    // Validate the login form
    await loginFormRef.value?.validate();

    loading.value = true;
    // Login the user
    const userInfo = await useUserStore().login({
      ...unref(loginFormModel),
      remember: true,
      errorMessageMode: "modal",
    });

    if (userInfo) {
      message.success("Login Success");
    }
  } catch (error) {
    logger.error("Login Error", field("error", getErrorMessage(error)));
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <AForm ref="loginFormRef" :model="loginFormModel" layout="vertical" :rules="loginRules" size="large" class="mt-8 space-y-6">
    <div>
      <AFormItem name="username" :label-wrap="true" label="Your username">
        <AInput v-model:value="loginFormModel.username" placeholder="input username" />
      </AFormItem>
    </div>
    <div>
      <AFormItem name="password" label="Your password">
        <AInput v-model:value="loginFormModel.password" type="password" placeholder="••••••••" show-password-on="click" @keydown.enter="login" />
      </AFormItem>
    </div>
    <!--    <div class="flex items-start"> -->
    <!--      <div class="flex h-5 items-center"> -->
    <!--        <input id="remember" aria-describedby="remember" name="remember" type="checkbox" class="focus:ring-3 focus:ring-primary-300 dark:focus:ring-primary-600 h-4 w-4 rounded border-gray-300 bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800" required=""> -->
    <!--      </div> -->
    <!--      <div class="ml-3 text-sm"> -->
    <!--        <label for="remember" class="font-medium text-gray-900 dark:text-white">Remember me</label> -->
    <!--      </div> -->
    <!--      <a href="#" class="text-primary-700 dark:text-primary-500 ml-auto text-sm hover:underline">Lost Password?</a> -->
    <!--    </div> -->
    <AButton type="primary" :loading="loading" @click="login">
      Login to your account
    </AButton>
    <!--    <div class="text-sm font-medium text-gray-500 dark:text-gray-400"> -->
    <!--      Not registered? <a class="text-primary-700 dark:text-primary-500 hover:underline">Create account</a> -->
    <!--    </div> -->
  </AForm>
</template>

<style scoped>

</style>
