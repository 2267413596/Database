import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import QuestionView from '../views/QuestionView.vue'
import UserView from '../views/UserView.vue'
import UserViewInfo from '../views/UserViewInfo.vue'
import UserViewCollection from '../views/UserViewCollection.vue'
import UserViewhistory from '../views/UserViewHistory.vue'
import UserViewList from '../views/UserViewList.vue'
import UserViewMessage from '../views/UserViewMessage.vue'

const routes = [
  {
    path: '/',
    name: 'Login',
    component: LoginView
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: ()=>import('../views/SignUpView.vue')
  },
  {
    path: '/administrator',
    name: 'Administrator',
    redirect: '/administrator/comment',
    component: () => import('../views/Administrator.vue'),
    children: [
      {
        path: 'comment',
        name: 'commentCheck',
        component: () => import('../views/CommentCheck.vue')
      },
      {
        path: 'question',
        name: 'questionCheck',
        component: () => import('../views/QuestionCheck.vue')
      },
      {
        path: 'checkLog',
        name: 'checkLog',
        component: () => import('../views/CheckLog.vue')
      },
      {
        path: 'edit',
        name: 'edit',
        component: () => import('../views/EditQuestion.vue')
      },
      {
        path: 'users',
        name: 'users',
        component: () => import('../views/Users.vue')
      },
    ]
  },
  {
    path: '/home',
    name: 'HomeView',
    component: () => import('../views/HomeView.vue')
  },
  {
    path: '/QuestionView',
    name: 'Question',
    component: QuestionView
  },
  {
    path: '/UserView' ,
    name: 'UserPage' ,
    component: UserView
  },
  {
    path: '/UserView/userinfo',
    name: 'UserInfo',
    component: UserViewInfo
  },
  {
    path: '/UserView/collection',
    name: 'UserViewcol',
    component: UserViewCollection
  },
  {
    path: '/UserView/submitHistory',
    name: 'UserViewhistory',
    component: UserViewhistory
  },
  {
    path: '/UserView/mylist',
    name: 'UserViewmylist',
    component: UserViewList
  },
  {
    path: '/UserView/sysmessage',
    name: 'UserViewmessage',
    component: UserViewMessage
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
