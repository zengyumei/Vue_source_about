<template>
    <div>
        
        <div>User {{ $route.params.id }}</div>
        <router-link :to="{name: 'add'}">添加你的个人事件</router-link>
    </div>
</template>
<script>
export default {
    name: "User",
    data(){
        return {
            isHome: false
        }
    },
}
</script>

<style lang="scss" scoped>

</style>
