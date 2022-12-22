<template>
    <div>
        <div style="margin-top:-60px;margin-bottom:15px;padding-top:20px;font-size: larger;font-weight: 400;">
            <router-link :to="{ path:'/home',query: {user_id: this.id}}"
                style="text-decoration: none;color:#3498db; margin-left: 10px">
                原题库
            </router-link>
        </div>
        <div class="navMenu">
            <label v-for="navMenu in navMenus">
                <!--只有一级菜单-->
                <el-menu-item v-if="!navMenu.children" :index="navMenu.url" :route="{path: navMenu.url, query: {uid: id, flag:mflag}}">
                    <span slot="title">
                        {{ navMenu.title }}
                    </span>
                </el-menu-item>
                <!--有多级菜单-->
                <el-submenu v-if="navMenu.children" :key="navMenu.url" :index="navMenu.url">
                    <span slot="title">{{ navMenu.title }}</span>
                    <UserViewMenu :navMenus="navMenu.children"></UserViewMenu>
                </el-submenu>
            </label>
        
        </div>
    </div>
</template>

<script>
export default {
    name: 'UserViewMenu',
    props: {
        navMenus: [],
        mflag: String,
        id: String,
    },
    data() {
        return {
            
        }
    },
    methods: {
    }
}
</script>

<style>
</style>