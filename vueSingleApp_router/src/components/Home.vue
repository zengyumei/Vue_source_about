<template>
<div>
    <router-view />

    <div class="home" v-if="isHome">你的个人主页</div>
    <ul class="footer">
        <li class="icon"><router-link :to="{name: 'list'}">新闻列表</router-link></li>
        <li class="icon"><router-link :to="{name: 'user'}">个人中心</router-link></li>
    </ul>
</div>
</template>

<script>
export default {
    name: "Home",
    data(){
        return {
            isHome: true
        }
    },
}
</script>

<style lang="scss" scoped>
    .home{
        text-align: center;
    }
    li{
        list-style: none;
    }
    .footer{
        position: absolute;
        width: 100%;
        height: 60px;
        line-height: 60px;
        left: 0;
        bottom: 0;
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-around;
    }
    .icon{
        font-size: 16px;
        flex: 1;
        text-align: center;
        border-top: 1px solid #ccc;
        a{
            color: #42b983;
            display: block;
            &.active{
                color: #fff;
                background: #42b983;
            }
        }
    }

</style>