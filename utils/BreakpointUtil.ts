import tailwindConfig from "@/tailwind.config.js";

const BreakpointUtil = {
    twoColumnsNavigationHidden: Number(tailwindConfig.theme.screens.twoColumnsNavigationHidden.replace("px", "")),
    twoColumnsNavigationCollapsed: Number(tailwindConfig.theme.screens.twoColumnsNavigationCollapsed.replace("px", "")),
    threeColumnsNavigationCollapsed: Number(tailwindConfig.theme.screens.threeColumnsNavigationCollapsed.replace("px", "")),
    fourColumnsNavigationCollapsed: Number(tailwindConfig.theme.screens.fourColumnsNavigationCollapsed.replace("px", "")),
    fourColumnsNavigationExtended: Number(tailwindConfig.theme.screens.fourColumnsNavigationExtended.replace("px", "")),
    fiveColumnsNavigationExtended: Number(tailwindConfig.theme.screens.fiveColumnsNavigationExtended.replace("px", ""))
};

export default BreakpointUtil;
