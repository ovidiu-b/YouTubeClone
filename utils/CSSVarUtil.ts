export default class CSSVarUtil {
    private static readonly root = document.documentElement;
    private static readonly computedStyle: CSSStyleDeclaration = getComputedStyle(CSSVarUtil.root);

    private constructor() {}

    /* START GETTERS*/

    static getNavigationWidthCollapsed() {
        return CSSVarUtil.computedStyle.getPropertyValue("--navigation-width-collapsed");
    }

    static getNavigationPaddingTopCollapsed() {
        return CSSVarUtil.computedStyle.getPropertyValue("--navigation-padding-top-collapsed");
    }

    static getNavigationWidthExtended() {
        return CSSVarUtil.computedStyle.getPropertyValue("--navigation-width-extended");
    }

    static getNavigationPaddingTopExtended() {
        return CSSVarUtil.computedStyle.getPropertyValue("--navigation-padding-top-extended");
    }

    static getIndexColumnMaxWidth2Columns() {
        return CSSVarUtil.computedStyle.getPropertyValue("--index-column-max-width-2-columns");
    }

    static getIndexColumnMaxWidth3Columns() {
        return CSSVarUtil.computedStyle.getPropertyValue("--index-column-max-width-3-columns");
    }

    static getIndexColumnMaxWidth456Columns() {
        return CSSVarUtil.computedStyle.getPropertyValue("--index-column-max-width-456-columns");
    }

    /* END GETTERS */

    /* START SETTERS */

    static setNavigationWidth(width: string) {
        CSSVarUtil.root.style.setProperty("--navigation-width", width);
    }

    static setNavigationPaddingTop(padding: string) {
        CSSVarUtil.root.style.setProperty("--navigation-padding-top", padding);
    }

    /* END SETTERS */
}
