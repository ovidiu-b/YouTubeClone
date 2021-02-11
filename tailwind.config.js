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
            fiveColumnsNavigationExtended: "1921px",
            sixColumnsNavigationExtended: "2290px",

            toolbarHideSearch: { max: "656px" },
            maxWidthNavigationCollapsed: "2001px"
        }
    },
    variants: {
        extend: {}
    },
    plugins: []
};
