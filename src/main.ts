
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import { createVuestic } from "vuestic-ui";
import "vuestic-ui/css";
import "./styles.css";
import "material-design-icons-iconfont/dist/material-design-icons.min.css";

import VueCookies from 'vue-cookies';


const app = createApp(App)

app.use(VueCookies, {expires: '1d'})

app.use(createPinia())
app.use(router)
app.use(createVuestic({
    config: {
        colors: {
            presets: {
                dark: {
                    primary: "#cf4f4f",
                    secondary: "#818992",
                    success: "#61c328",
                    info: "#259df4",
                    danger: "#cc3224",
                    warning: "#ddbf2c",
                    backgroundPrimary: "#4a4a4a",
                    backgroundSecondary: "#c4c4c4",
                    backgroundElement: "#2e2e2e",
                    backgroundBorder: "#3D4C58",
                    textPrimary: "#F1F1F1",
                    textInverted: "#0B121A",
                    shadow: "rgba(255, 255, 255, 0.12)",
                    focus: "#49A8FF",
                    transparent: "rgba(0, 0, 0, 0)",
                    backgroundLanding: "#070d14",
                    backgroundLandingBorder: "rgba(43, 49, 56, 0.8)"
                }
            }
        },
    },
}))




app.mount('#app')
