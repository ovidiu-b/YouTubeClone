export default class NavigationItemModel {
    private constructor(title: string, destination: string, icon?: string, iconSize?: string, imageSrc?: string) {
        this.title = title;
        this.icon = icon;
        this.iconSize = iconSize;
        this.imageSrc = imageSrc;
        this.destination = destination;
    }

    readonly title: string;
    readonly destination: string;
    readonly icon?: string | undefined;
    readonly iconSize?: string | undefined;
    readonly imageSrc?: string | undefined;

    static withImage(title: string, destination: string, imageSrc: string) {
        return new NavigationItemModel(title, destination, undefined, undefined, imageSrc);
    }

    static withIcon(title: string, destination: string, icon: string, iconSize: string) {
        return new NavigationItemModel(title, destination, icon, iconSize, undefined);
    }
}
