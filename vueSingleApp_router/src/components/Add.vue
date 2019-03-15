<template>
    <div>
        <p>标题: </p>
        <input type="text" v-model="title">
        <p>内容: </p>
        <input type="text" v-model="content">
        <div>
            <button class="btn" @click="add()">添加</button>
        </div>
    </div>
</template>

<script>
import store from "@/store"
export default {
    name: "Add",
    data(){
        return{
            title: '',
            content: '',
        }
    },
    methods: {
        add(){
            store.commit('addItem', {
                title: this.title,
                content: this.content,
            });
            this.title = '';
            this.content='';
            this.$router.push('/home/list')
        }
    }
}
</script>

<style lang="scss" scoped>
    p{
        text-align: center;
    }
    input, .btn{
        display: block;
        margin: 0 auto;
    }
    .btn{
        margin-top: 20px; 
    }

</style>

