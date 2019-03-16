<template>
    <div>
        <ul class="container">
            <li v-for="(item, index) in pageLists" :key="index">
                {{ item.title}} : {{ item.content}}
            </li>
        </ul>
    </div>
</template>

<script>
import store from '@/store'
export default {
    name: "List",
    store,
    computed: {
        pageLists(){
            return store.state.lists;
        }
    }
}
</script>

<style lang="scss" scoped>
    .container{
        font-size: 20px;
        color: #333333;
    }
</style>
