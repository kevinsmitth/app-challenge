<script setup lang="ts">
import actions from "~/actions";

const authStore = useAuthStore();

</script>

<template>
    <div class="bg-gray-100 min-h-screen">
        <div class="container mx-auto p-4">
            <slot />
        </div>
    </div>
</template>