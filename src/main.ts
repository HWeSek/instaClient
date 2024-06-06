
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import { createVuestic } from "vuestic-ui";
import "vuestic-ui/css";
import "material-design-icons-iconfont/dist/material-design-icons.min.css";
const app = createApp(App)



app.use(createPinia())
app.use(router)
app.use(createVuestic({
    config: {
        colors: {
            presets: {
                dark: {
                    primary: "#e84f4f",
                    secondary: "#818992",
                    success: "#61c328",
                    info: "#259df4",
                    danger: "#d41d0c",
                    warning: "#ddbf2c",
                    backgroundPrimary: "#0d0d0d",
                    backgroundSecondary: "#1F262F",
                    backgroundElement: "#131A22",
                    backgroundBorder: "#3D4C58",
                    textPrimary: "#F1F1F1",
                    textInverted: "#0B121A",
                    shadow: "rgba(255, 255, 255, 0.12)",
                    focus: "#775df8",
                    transparent: "rgba(0, 0, 0, 0)",
                    backgroundLanding: "#070d14",
                    backgroundLandingBorder: "rgba(43, 49, 56, 0.8)"
                }
            }
        },
    },
}))




app.mount('#app')
