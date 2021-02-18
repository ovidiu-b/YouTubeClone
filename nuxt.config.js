export default {
    // Target: https://go.nuxtjs.dev/config-target
    target: "server",

    ssr: false,

    // Global page headers: https://go.nuxtjs.dev/config-head
    head: {
        title: "YouTube Clone",
        htmlAttrs: {
            lang: "en"
        },
        meta: [
            { charset: "utf-8" },
            { name: "viewport", content: "width=device-width, initial-scale=1" },
            { hid: "description", name: "description", content: "" }
        ],
        link: [
            { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
            { rel: "stylesheet", href: "https://fonts.googleapis.com/icon?family=Material+Icons" },
            { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Roboto:wght@400;500&display=swap" }
        ]
    },

    // Global CSS: https://go.nuxtjs.dev/config-css
    css: [],

    // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
    plugins: ["@/plugins/axios.ts", "@/plugins/filter.ts"],

    // Auto import components: https://go.nuxtjs.dev/config-components
    components: true,

    // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
    buildModules: [
        // https://go.nuxtjs.dev/typescript
        "@nuxt/typescript-build",
        // https://go.nuxtjs.dev/tailwindcss
        "@nuxtjs/tailwindcss"
    ],

    // Modules: https://go.nuxtjs.dev/config-modules
    modules: ["@nuxtjs/axios", "@nuxtjs/proxy"],

    axios: {
        proxy: true
    },

    proxy: {
        "/api/": { target: "https://youtube.googleapis.com/youtube/v3", pathRewrite: { "^/api/": "" } }
    },

    // Build Configuration: https://go.nuxtjs.dev/config-build
    build: {}
};
