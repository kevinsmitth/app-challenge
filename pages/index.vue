<script setup lang="ts">
import actions from "~/actions";

definePageMeta({
    middleware: 'auth'
})

const form = ref<Todo[]>({
    title: '',
    description: '',
    color: '#ffffff',
    favorite: false,
    completed: false
})

const todos = ref<Todo[]>([])
const favorites = ref<Todo[]>([])
const search: Ref<string> = ref('');
const editForm = ref<Todo | null>(null);
const isEditing = ref(false);

onMounted(async () => {
    await actions.todos.fetchTodos();

    getTodos();
})

function getTodos() {
    const response = useTodoStore().todos;
    todos.value = response.data

    const responseFavorites = useTodoStore().favorites;
    favorites.value = responseFavorites.data
}

const handleUpdateTodo = async (todo: Todo, event: Event) => {
    if (event) {
        todo.favorite = (event.favorite as boolean);
    }

    await actions.todos.updateTodo(todo);

    getTodos();
}

const handleCreateTodo = async () => {
    await actions.todos.createTodo(form.value);

    getTodos();

    form.value = {
        title: '',
        description: '',
        color: '#ffffff',
        favorite: false,
        completed: false
    }
}

const handleDeleteTodo = async (todo: Todo) => {
    if (confirm("Você deseja excluir essa tarefa?")) {
        await actions.todos.deleteTodo(todo);

        getTodos();
    }
}

const handleSearchTodos = async () => {
    await actions.todos.searchTodos(`title=${search.value}`);

    getTodos();
}

const handleLogout = async () => {
    if (confirm('Deseja realmente sair?')) {
        await actions.auth.logout();
        navigateTo('/login');
    }
}
</script>

<template>
    <div>
        <div
            class='absolute left-0 right-0 top-0 bottom-95.3% bg-white shadow-md h-16 flex items-center text-left w-full gap-4 px-4'>
            <div class='flex items-center gap-4'>
                <img src="" alt="logo" class='w-10 h-10' />
                <h1 class='!text-lg font-bold text-gray-900'>
                    CoreNotes
                </h1>
            </div>
            <form @submit.prevent="handleSearchTodos" method="get" class='flex justify-end items-center relative w-1/2'>
                <input type="text" placeholder="Pesquisar tarefas" v-model="search"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                <button type="submit" class="absolute mr-2 w-4 text-sm text-gray-500">
                    <svg width="13" height="14" viewBox="0 0 13 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M11.8914 13.8464L7.47727 9.12144C7.12695 9.42144 6.72407 9.65894 6.26864 9.83393C5.81321 10.0089 5.32859 10.0964 4.81477 10.0964C3.54191 10.0964 2.46477 9.62469 1.58334 8.68119C0.701445 7.73719 0.260498 6.58394 0.260498 5.22144C0.260498 3.85894 0.701445 2.70569 1.58334 1.76169C2.46477 0.818186 3.54191 0.346436 4.81477 0.346436C6.08764 0.346436 7.16501 0.818186 8.04691 1.76169C8.92834 2.70569 9.36905 3.85894 9.36905 5.22144C9.36905 5.77144 9.28731 6.29019 9.12382 6.77769C8.96033 7.26519 8.73846 7.69644 8.4582 8.07144L12.8723 12.7964L11.8914 13.8464ZM4.81477 8.59644C5.6906 8.59644 6.43516 8.26844 7.04847 7.61244C7.66131 6.95594 7.96773 6.15894 7.96773 5.22144C7.96773 4.28394 7.66131 3.48694 7.04847 2.83044C6.43516 2.17444 5.6906 1.84644 4.81477 1.84644C3.93895 1.84644 3.19439 2.17444 2.58108 2.83044C1.96823 3.48694 1.66181 4.28394 1.66181 5.22144C1.66181 6.15894 1.96823 6.95594 2.58108 7.61244C3.19439 8.26844 3.93895 8.59644 4.81477 8.59644Z"
                            fill="#9E9E9E" />
                    </svg>
                </button>
            </form>
            <div class='ml-auto'>
                <button type="button" @click.prevent="handleLogout">
                    <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M13.4156 2.2405L12.092 0.91687L6.8444 6.16445L1.59682 0.91687L0.273193 2.2405L5.52077 7.48807L0.273193 12.7357L1.59682 14.0593L6.8444 8.8117L12.092 14.0593L13.4156 12.7357L8.16803 7.48807L13.4156 2.2405Z"
                            fill="#51646E" />
                    </svg>
                </button>
            </div>
        </div>
        <div class='container mx-auto pt-32 mb-8 px-8'>
            <form action="" method="post">
                <div class='mx-auto max-w-[530.52px] h-[150px] bg-white px-4 pt-2 pb-4 rounded shadow'>
                    <div class='flex items-center justify-between'>
                        <input v-model="form.title" type="text" placeholder="Título" maxlength="255" required
                            class="w-full px-3 py-2 focus:outline-none focus:border-indigo-500 left-[464.36px] top-[95.31px] font-bold font-family: Inter font-style: normal font-weight: 700 font-size: 14.2px line-height: 17px color: #333333" />
                        <div>
                            <button type="button" @click="form.favorite = !form.favorite">
                                <svg v-if="!form.favorite" width="21" height="19" viewBox="0 0 21 19" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M10.5464 13.2621L6.90811 15.4586L7.86606 11.3171L4.65354 8.53037L8.89174 8.17235L10.5464 4.26314L12.201 8.17235L16.4392 8.53037L13.2267 11.3171L14.1847 15.4586M20.2227 7.31116L13.2654 6.72091L10.5464 0.305542L7.82735 6.72091L0.870117 7.31116L6.14368 11.888L4.56645 18.6905L10.5464 15.0812L16.5263 18.6905L14.9394 11.888L20.2227 7.31116Z"
                                        fill="#455A64" />
                                </svg>
                                <svg v-else width="21" height="19" viewBox="0 0 21 19" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M7.47998 7.50375L2.32617 8.29666L6.88529 11.9638L5.69595 17.5141L9.85865 14.3425L15.0125 17.5141L13.6249 11.9638L17.4903 8.29666L12.2373 7.50375L9.85865 2.34995L7.47998 7.50375Z"
                                        fill="#FFA000" />
                                    <path
                                        d="M9.93823 13.7112L6.29995 15.9077L7.25791 11.7662L4.04538 8.97947L8.28359 8.62145L9.93823 4.71223L11.5929 8.62145L15.8311 8.97947L12.6186 11.7662L13.5765 15.9077M19.6145 7.76026L12.6573 7.17001L9.93823 0.754639L7.2192 7.17001L0.261963 7.76026L5.53553 12.3371L3.9583 19.1396L9.93823 15.5303L15.9182 19.1396L14.3313 12.3371L19.6145 7.76026Z"
                                        fill="#455A64" />
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div class="border-b border-gray-200/70"></div>
                    <div>
                        <input v-model="form.description" type="text" maxLength="255"
                            class="w-full p-2 rounded outline-none focus:outline-none" placeholder="Criar tarefa..."
                            required />
                        <div class='mt-4 flex justify-end'>
                            <button type="submit" @click.prevent="handleCreateTodo"
                                class="bg-green-500 text-white text-sm font-bold rounded py-2 px-4 cursor-pointer hover:bg-green-600">Criar</button>
                        </div>
                    </div>
                </div>
            </form>

            <p class="text-sm font-semibold pb-2 mt-12 ml-4">
                Favoritas
            </p>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 h-full">
                <div v-for="todo in favorites" :key="todo.id"
                    :style="{ backgroundColor: todo.color, border: '1px solid ' + todo.color }"
                    class="flex flex-1 flex-col bg-white p-4 rounded-3xl shadow-lg w-full min-h-56">
                    <form>
                    </form>
                    <div class="flex items-center justify-between">
                        <h3 class="text-lg font-semibold mb-2 contrast-200">
                            {{ todo.title }}
                        </h3>
                        <button @click.prevent="handleUpdateTodo(todo, { favorite: todo.favorite ? false : true })"
                            type="button" class="mb-2 contrast-150">
                            <svg v-if="todo.favorite" width="20" height="20" viewBox="0 0 20 20" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M7.47998 7.50375L2.32617 8.29666L6.88529 11.9638L5.69595 17.5141L9.85865 14.3425L15.0125 17.5141L13.6249 11.9638L17.4903 8.29666L12.2373 7.50375L9.85865 2.34995L7.47998 7.50375Z"
                                    fill="#FFA000" />
                                <path
                                    d="M9.93823 13.7112L6.29995 15.9077L7.25791 11.7662L4.04538 8.97947L8.28359 8.62145L9.93823 4.71223L11.5929 8.62145L15.8311 8.97947L12.6186 11.7662L13.5765 15.9077M19.6145 7.76026L12.6573 7.17001L9.93823 0.754639L7.2192 7.17001L0.261963 7.76026L5.53553 12.3371L3.9583 19.1396L9.93823 15.5303L15.9182 19.1396L14.3313 12.3371L19.6145 7.76026Z"
                                    fill="#455A64" />
                            </svg>
                            <svg v-else width="21" height="19" viewBox="0 0 21 19" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M10.5464 13.2621L6.90811 15.4586L7.86606 11.3171L4.65354 8.53037L8.89174 8.17235L10.5464 4.26314L12.201 8.17235L16.4392 8.53037L13.2267 11.3171L14.1847 15.4586M20.2227 7.31116L13.2654 6.72091L10.5464 0.305542L7.82735 6.72091L0.870117 7.31116L6.14368 11.888L4.56645 18.6905L10.5464 15.0812L16.5263 18.6905L14.9394 11.888L20.2227 7.31116Z"
                                    fill="#455A64" />
                            </svg>
                        </button>
                    </div>
                    <div class="border-b border-gray-200/90"></div>
                    <p v-if="!isEditing" class="text-gray-600 pt-4 contrast-200">{{ todo.description }}</p>
                    <input v-else type="text" v-model="todo.description"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                    <div class="mt-auto flex justify-between">
                        <div class="flex items-center gap-3">
                            <button @click.prevent="isEditing = !isEditing" type="button" class="contrast-150">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M13.9443 9.16667L14.8321 10.0544L6.25656 18.6111H5.38767V17.7422L13.9443 9.16667ZM17.3443 3.5C17.1082 3.5 16.8627 3.59444 16.6832 3.77389L14.9549 5.50222L18.4966 9.04389L20.2249 7.31556C20.5932 6.94722 20.5932 6.33333 20.2249 5.98389L18.0149 3.77389C17.826 3.585 17.5899 3.5 17.3443 3.5ZM13.9443 6.51278L3.49878 16.9583V20.5H7.04045L17.486 10.0544L13.9443 6.51278Z"
                                        fill="#51646E" />
                                </svg>

                            </button>
                            <button type="button" class="contrast-150"
                                v-on:click="$refs['color-' + todo.id][0].click()">
                                <svg width="19" height="18" viewBox="0 0 19 18" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M16.1011 11.5468C16.1011 11.5468 14.1011 13.7168 14.1011 15.0468C14.1011 15.5772 14.3118 16.086 14.6869 16.461C15.062 16.8361 15.5707 17.0468 16.1011 17.0468C16.6316 17.0468 17.1403 16.8361 17.5153 16.461C17.8904 16.086 18.1011 15.5772 18.1011 15.0468C18.1011 13.7168 16.1011 11.5468 16.1011 11.5468ZM2.31113 10.0468L7.10113 5.25681L11.8911 10.0468M13.6611 8.98681L4.72113 0.046814L3.31113 1.45681L5.69113 3.83681L0.541133 8.98681C-0.0488672 9.54681 -0.0488672 10.5168 0.541133 11.1068L6.04113 16.6068C6.33113 16.8968 6.72113 17.0468 7.10113 17.0468C7.48113 17.0468 7.87113 16.8968 8.16113 16.6068L13.6611 11.1068C14.2511 10.5168 14.2511 9.54681 13.6611 8.98681Z"
                                        fill="#51646E" />
                                    <path d="M7.17009 15.0439L2.34009 10H11.9075L7.17009 15.0439Z" fill="#FFA000" />
                                </svg>
                            </button>
                            <div class="hidden">
                                <input :ref="'color-' + todo.id" type="color" class="hidden"
                                    @change="handleUpdateTodo(todo)" v-model="todo.color" :id="'color-' + todo.id"
                                    name="color" value="#ffffff" />
                            </div>
                        </div>
                        <div class="flex items-center gap-3">
                            <button @click.prevent="handleDeleteTodo(todo.id)" type="button" class="contrast-150">
                                <svg width="14" height="15" viewBox="0 0 14 15" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M13.6146 2.29924L12.2909 0.975616L7.04337 6.22319L1.7958 0.975616L0.472168 2.29924L5.71974 7.54682L0.472168 12.7944L1.7958 14.118L7.04337 8.87045L12.2909 14.118L13.6146 12.7944L8.367 7.54682L13.6146 2.29924Z"
                                        fill="#51646E" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <p class="text-sm font-semibold pb-2 mt-12 ml-4">
                Outros(a)
            </p>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 h-full">
                <div v-for="todo in todos" :key="todo.id"
                    :style="{ backgroundColor: todo.color, border: '1px solid ' + todo.color }"
                    class="flex flex-1 flex-col bg-white p-4 rounded-3xl shadow-lg w-full min-h-56">
                    <div class="flex items-center justify-between">
                        <h3 class="text-lg font-semibold mb-2 contrast-200">
                            {{ todo.title }}
                        </h3>
                        <button @click.prevent="handleUpdateTodo(todo, { favorite: todo.favorite ? false : true })"
                            type="button" class="mb-2 contrast-150">
                            <svg v-if="todo.favorite" width="20" height="20" viewBox="0 0 20 20" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M7.47998 7.50375L2.32617 8.29666L6.88529 11.9638L5.69595 17.5141L9.85865 14.3425L15.0125 17.5141L13.6249 11.9638L17.4903 8.29666L12.2373 7.50375L9.85865 2.34995L7.47998 7.50375Z"
                                    fill="#FFA000" />
                                <path
                                    d="M9.93823 13.7112L6.29995 15.9077L7.25791 11.7662L4.04538 8.97947L8.28359 8.62145L9.93823 4.71223L11.5929 8.62145L15.8311 8.97947L12.6186 11.7662L13.5765 15.9077M19.6145 7.76026L12.6573 7.17001L9.93823 0.754639L7.2192 7.17001L0.261963 7.76026L5.53553 12.3371L3.9583 19.1396L9.93823 15.5303L15.9182 19.1396L14.3313 12.3371L19.6145 7.76026Z"
                                    fill="#455A64" />
                            </svg>
                            <svg v-else width="21" height="19" viewBox="0 0 21 19" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M10.5464 13.2621L6.90811 15.4586L7.86606 11.3171L4.65354 8.53037L8.89174 8.17235L10.5464 4.26314L12.201 8.17235L16.4392 8.53037L13.2267 11.3171L14.1847 15.4586M20.2227 7.31116L13.2654 6.72091L10.5464 0.305542L7.82735 6.72091L0.870117 7.31116L6.14368 11.888L4.56645 18.6905L10.5464 15.0812L16.5263 18.6905L14.9394 11.888L20.2227 7.31116Z"
                                    fill="#455A64" />
                            </svg>
                        </button>
                    </div>
                    <div class="border-b border-gray-200/90"></div>
                    <p class="text-gray-600 pt-4 contrast-200">{{ todo.description }}</p>
                    <div class="mt-auto flex justify-between">
                        <div class="flex items-center gap-3">
                            <button type="button" class="contrast-150">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M13.9443 9.16667L14.8321 10.0544L6.25656 18.6111H5.38767V17.7422L13.9443 9.16667ZM17.3443 3.5C17.1082 3.5 16.8627 3.59444 16.6832 3.77389L14.9549 5.50222L18.4966 9.04389L20.2249 7.31556C20.5932 6.94722 20.5932 6.33333 20.2249 5.98389L18.0149 3.77389C17.826 3.585 17.5899 3.5 17.3443 3.5ZM13.9443 6.51278L3.49878 16.9583V20.5H7.04045L17.486 10.0544L13.9443 6.51278Z"
                                        fill="#51646E" />
                                </svg>

                            </button>
                            <button type="button" class="contrast-150"
                                v-on:click="$refs['color-' + todo.id][0].click()">
                                <svg width="19" height="18" viewBox="0 0 19 18" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M16.1011 11.5468C16.1011 11.5468 14.1011 13.7168 14.1011 15.0468C14.1011 15.5772 14.3118 16.086 14.6869 16.461C15.062 16.8361 15.5707 17.0468 16.1011 17.0468C16.6316 17.0468 17.1403 16.8361 17.5153 16.461C17.8904 16.086 18.1011 15.5772 18.1011 15.0468C18.1011 13.7168 16.1011 11.5468 16.1011 11.5468ZM2.31113 10.0468L7.10113 5.25681L11.8911 10.0468M13.6611 8.98681L4.72113 0.046814L3.31113 1.45681L5.69113 3.83681L0.541133 8.98681C-0.0488672 9.54681 -0.0488672 10.5168 0.541133 11.1068L6.04113 16.6068C6.33113 16.8968 6.72113 17.0468 7.10113 17.0468C7.48113 17.0468 7.87113 16.8968 8.16113 16.6068L13.6611 11.1068C14.2511 10.5168 14.2511 9.54681 13.6611 8.98681Z"
                                        fill="#51646E" />
                                    <path d="M7.17009 15.0439L2.34009 10H11.9075L7.17009 15.0439Z" fill="#FFA000" />
                                </svg>
                            </button>
                            <div class="hidden">
                                <input :ref="'color-' + todo.id" type="color" class="hidden"
                                    @change="handleUpdateTodo(todo)" v-model="todo.color" :id="'color-' + todo.id"
                                    name="color" value="#ffffff" />
                            </div>
                        </div>
                        <div class="flex items-center gap-3">
                            <button @click.prevent="handleDeleteTodo(todo.id)" type="button" class="contrast-150">
                                <svg width="14" height="15" viewBox="0 0 14 15" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M13.6146 2.29924L12.2909 0.975616L7.04337 6.22319L1.7958 0.975616L0.472168 2.29924L5.71974 7.54682L0.472168 12.7944L1.7958 14.118L7.04337 8.87045L12.2909 14.118L13.6146 12.7944L8.367 7.54682L13.6146 2.29924Z"
                                        fill="#51646E" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>