const router = [
    {
        path: '',
        name: 'user_index',
        meta: {
            title: '首页',
            auth: false,
            check : 'user_index'
        },
        component: (resolve) => require(['@path/views/home/home.vue'], resolve)
    },
    {
        path: 'shopping_cart',
        name: 'user_shopping_cart',
        meta: {
            title: '我的购物车',
            auth: false,
            check : 'user_shopping_cart'
        },
        component: (resolve) => require(['@path/views/home/innerpage/shoppingCart.vue'], resolve)
    },
    {
        path: 'reward_art',
        name: 'user_reward_art',
        meta: {
            title: '打赏文章',
            auth: false,
            check : 'user_reward_art'
        },
        component: (resolve) => require(['@path/views/home/innerpage/rewardArt.vue'], resolve)
    },
    {
        path: 'find_art',
        name: 'user_find_art',
        meta: {
            title: '发现文章',
            auth: false,
            check : 'user_find_art'
        },
        component: (resolve) => require(['@path/views/home/innerpage/findArt.vue'], resolve)
    },
    {
        path: 'my_wallet',
        name: 'user_my_wallet',
        meta: {
            title: '我的钱包',
            auth: false,
            check : 'user_my_wallet'
        },
        component: (resolve) => require(['@path/views/home/innerpage/myWallet.vue'], resolve)
    },
    {
        path: 'my_activity_order',
        name: 'user_my_activity_order',
        meta: {
            title: '活动订单',
            auth: false,
            check : 'user_my_activity_order'
        },
        component: (resolve) => require(['@path/views/home/innerpage/myActivityOrder.vue'], resolve)
    },
    {
        path: 'my_letter',
        name: 'user_my_letter',
        meta: {
            title: '我的私信',
            auth: false,
            check : 'user_my_letter'
        },
        component: (resolve) => require(['@path/views/home/innerpage/myLetter.vue'], resolve)
    },
    {
        path: 'friends_notice',
        name: 'user_friends_notice',
        meta: {
            title: '好友通知',
            auth: false,
            check : 'user_friends_notice'
        },
        component: (resolve) => require(['@path/views/home/innerpage/friendsNotice.vue'], resolve)
    },
    {
        path: 'system_msg',
        name: 'user_system_msg',
        meta: {
            title: '系统消息',
            auth: false,
            check : 'user_system_msg'
        },
        component: (resolve) => require(['@path/views/home/innerpage/systemMsg.vue'], resolve)
    },
    {
        path: 'account',
        name: 'user_account',
        meta: {
            title: '账号设置',
            auth: false,
            check : 'user_account'
        },
        component: (resolve) => require(['@path/views/home/innerpage/account.vue'], resolve)
    },
    {
        path: 'address',
        name: 'user_address',
        meta: {
            title: '收货地址',
            auth: false,
            check : 'user_address'
        },
        component: (resolve) => require(['@path/views/home/innerpage/address.vue'], resolve)
    },
    {
        path: 'follow_activity',
        name: 'user_follow_activity',
        meta: {
            title: '关注活动',
            auth: false,
            check : 'user_follow_activity'
        },
        component: (resolve) => require(['@path/views/home/innerpage/followActivity.vue'], resolve)
    },
    {
        path: 'shop_order',
        name: 'user_shop_order',
        meta: {
            title: '我的订单',
            auth: false,
            check : 'user_shop_order'
        },
        component: (resolve) => require(['@path/views/home/innerpage/myShopOrder.vue'], resolve)
    },
    {
        path: 'Logistics',
        name: 'user_shop_Logistics',
        meta: {
            title: '查看物流',
            auth: false,
            check : 'user_shop_order'
        },
        component: (resolve) => require(['@path/views/home/innerpage/Logistics.vue'], resolve)
    }
];
export default router;