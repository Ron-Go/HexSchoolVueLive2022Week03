import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.26/vue.esm-browser.min.js';

const app = createApp({
    data() {
        return {
            api: {
                url: 'https://vue3-course-api.hexschool.io/v2',
                path: 'vue2022ron',
            },
            tempProducts:{},
        }
    },
    created(){
        // 取得存在cookie的token資訊
        const token = document.cookie.replace(/(?:(?:^|.*;\s*)myToken\s*\=\s*([^;]*).*$)|^.*$/,"$1");
        // 把token加入axios的headers授權資料
        axios.defaults.headers.common["Authorization"] = token;
        this.checkLogin();
        
    },
    methods: {
        // 檢查是否登入
        checkLogin(){
            axios.post(`${this.api.url}/api/user/check`)
            .then((res) => {
                console.log(res.data);
                // 檢查登入狀態，成功的話取得商品資料
                this.getData();
            })
            .catch((err) => {
                alert('token資訊取得錯誤');
                window.location = 'login.html';
            })
        },
        // 取得遠端資料
        getData(){
            axios.get(`${this.api.url}/api/${this.api.path}/admin/products`)
            .then((res) => {
                console.log(res.data.products);
                // 取得api商品資料，存放tempProducts，準備渲染畫面
                this.tempProducts = res.data.products;
            })
            .catch((err) => {
                alert("取得資料失敗");
            })
        },
    },
});

app.mount('#app');