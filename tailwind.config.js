module.exports = {
    purge: [
        "./modules/**/*.{vue,js}",
        "./components/**/*.{vue,js}",
        "./layouts/**/*.vue",
        "./pages/**/*.vue",
        "./plugins/**/*.{js,ts}",
        "./nuxt.config.{js,ts}"
    ],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {},
        screens: {
            twoColumnsNavigationHidden: "530px",
            twoColumnsNavigationCollapsed: "809px",
            threeColumnsNavigationCollapsed: "889px",
            fourColumnsNavigationCollapsed: "1145px",
            fourColumnsNavigationExtended: "1330px",
            fiveColumnsNavigationCollapsed: "1802px",
            fiveColumnsNavigationExtended: "1921px",
            sixColumnsNavigationCollapsed: "2137px",
            sixColumnsNavigationExtended: "2290px",

            toolbarHideSearch: { max: "656px" },
            maxWidthSmallNavigationCollapsed: "870px",
            maxWidthNormalNavigationCollapsed: "2001px",

            textLarge: "1634px",

            twoColumnsWatchVideo: "1016px",
            watchVideoEnableMarginLeft: "1768px"
        }
    },
    variants: {
        extend: {}
    },
    plugins: []
};
