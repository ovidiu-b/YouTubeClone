export default class TimeUtils {
    static getCurrentTimeInSeconds() {
        return Math.round(new Date().getTime() / 1000);
    }
}
