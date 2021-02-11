export default class NavigationItemModel {
    private constructor(
        title: string,
        destination?: string,
        icon?: string,
        iconSize?: string,
        imageSrc?: string,
        clickMethod?: () => void
    ) {
        this.title = title;
        this.icon = icon;
        this.iconSize = iconSize;
        this.imageSrc = imageSrc;
        this.destination = destination;
        this.clickMethod = clickMethod;
    }

    readonly title: string;
    readonly destination?: string | undefined;
    readonly icon?: string | undefined;
    readonly iconSize?: string | undefined;
    readonly imageSrc?: string | undefined;
    readonly clickMethod?: () => void | undefined;

    static withImage(title: string, destination: string, imageSrc: string) {
        return new NavigationItemModel(title, destination, undefined, undefined, imageSrc, undefined);
    }

    static withIcon(title: string, destination: string, icon: string, iconSize: string) {
        return new NavigationItemModel(title, destination, icon, iconSize, undefined, undefined);
    }

    static withIconAndCallback(title: string, icon: string, iconSize: string, clickMethod?: () => void) {
        return new NavigationItemModel(title, undefined, icon, iconSize, undefined, clickMethod);
    }
}
