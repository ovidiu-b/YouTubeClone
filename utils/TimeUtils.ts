export default class TimeUtils {
    static getCurrentTimeInSeconds() {
        return Math.round(new Date().getTime() / 1000);
    }

    static convertMonthNumberToString(month: Number) {
        switch (month) {
            case 1:
                return "ene";
            case 2:
                return "feb";
            case 3:
                return "mar";
            case 4:
                return "abr";
            case 5:
                return "may";
            case 6:
                return "jun";
            case 7:
                return "jul";
            case 8:
                return "ago";
            case 9:
                return "sep";
            case 10:
                return "oct";
            case 11:
                return "nov";
            case 12:
                return "dic";
        }
    }
}
