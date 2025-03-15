<script setup lang="ts">
</script>

<template>
    <div class="container mx-auto p-4">
        <ul class="flex gap-8 items-center justify-center mt-4 mb-8 font-bold">
            <li>
                <NuxtLink to="/login">Login</NuxtLink>
            </li>
            <li>
                <NuxtLink to="/register">Register</NuxtLink>
            </li>
        </ul>
        <slot />
    </div>
</template>