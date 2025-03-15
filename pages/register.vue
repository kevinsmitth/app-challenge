<script setup lang="ts">
import actions from "~/actions";

definePageMeta({
    layout: 'guest',
    middleware: 'guest'
})

const form = ref<RegisterForm>({
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
})

const handleRegister = async () => {
    await actions.auth.register(form);
    navigateTo('/')
}
</script>

<template>
    <div class="flex justify-center items-center w-full h-screen max-w-md mx-auto">
        <div class="inline-block align-middle mx-auto border border-gray-300 rounded-md p-8 w-full">
            <h1 class="text-2xl font-semibold mb-4">Registrar</h1>
            <form action="" method="post">
                <div class="flex flex-col mt-4">
                    <label class="mb-2" for="name">Nome</label>
                    <input v-model="form.name"
                        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                        id="name" type="name" name="name">
                </div>
                <div class="flex flex-col mt-4">
                    <label class="mb-2" for="email">Email</label>
                    <input v-model="form.email"
                        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                        id="email" type="email" name="email">
                </div>
                <div class="flex flex-col mt-4">
                    <label class="mb-2" for="password">Senha</label>
                    <input v-model="form.password"
                        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                        id="password" type="password" name="password">
                </div>
                <div class="flex flex-col mt-4">
                    <label class="mb-2" for="password_confirmation">Confirmar Senha</label>
                    <input v-model="form.password_confirmation"
                        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                        id="password_confirmation" type="password" name="password_confirmation">
                </div>
                <button type="submit" @click.prevent="handleRegister"
                    class="w-full px-4 py-2 mt-4 text-white bg-indigo-500 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600">
                    Cadastrar
                </button>
            </form>
        </div>
    </div>
</template>