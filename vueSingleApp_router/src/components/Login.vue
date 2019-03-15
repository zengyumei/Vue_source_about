<template>
    <div>
        <form action="" v-if="!isReg" >
            <div>用户名：</div>
            <input type="text" placeholder="name" v-model="name">
            <div>密码：</div>
            <input type="password" v-model="password">
            <div>
                <button type="button" @click="login()">登录</button>
                <button type="button" @click="reg()">注册</button>
            </div>
        </form>
        <form action="" v-else>
            <div>用户名：</div>
            <input type="text" placeholder="name" v-model="name">
            <div>密码：</div>
            <input type="password" v-model="password">
            <div>再次输入密码：</div>
            <input type="password" v-model="repeat">
            <div>
                <button type="button" @click="addUser()">确定</button>
                <button type="button" @click="cancel()">取消</button>
            </div>
        </form>
    </div>
</template>
<script>
export default {
    name: "Login",
    data(){
        return {
            isReg: false
        }
    },
    methods: {
        login(){
            if(localStorage.getItem("name") == this.name && localStorage.getItem("password") == this.password){
                this.name = '';
                this.password = '';
                this.$router.push('/home/list'); // 字符串,对象,命名的路由
            } else{
                alert("用户名密码不正确");   
            }
        },
        reg(){
            this.isReg = true;
        },
        addUser(){
            if(this.password === this.repeat){
                localStorage.setItem("name", this.name);
                localStorage.setItem("password", this.password);
                this.name = '';
                this.password = '';
                this.isReg = false;
            } else {
                alert("两次密码不匹配");
            }
            
        },
        cancel(){
            this.isReg = false;
        }
    }
}
</script>

<style lang="scss" scoped>

</style>



