import Vue from "vue";
import { TimeUtils } from "@/utils/module";

const second_milli = 1000;
const minute_milli = 60 * second_milli;
const hour_milli = 60 * minute_milli;
const day_milli = 24 * hour_milli;
const month_milli = 30 * day_milli;
const year_milli = 365 * day_milli;

function formatViewCount(value: string, showExactly: boolean = false, kindOfValue: string = "visualizaciones"): string {
    if (value != undefined) {
        const count = formatCount(value, showExactly);

        let result = count;

        if (value.length <= 6) {
            result = `${count} ${kindOfValue}`;
        } else {
            result = `${count} de ${kindOfValue}`;
        }

        return result;
    }

    /* let result = value;

    if (result != undefined) {
        const digits = value.length;
        const valueSplitted = value.split("");

        if (showExactly) {
            const viewCuntFormatted: string[] = [];

            valueSplitted.reverse().forEach((digit, index) => {
                if (index != 0 && index % 3 == 0) {
                    viewCuntFormatted.push(".");
                }

                viewCuntFormatted.push(digit);
            });

            result = `${viewCuntFormatted.reverse().join("")} ${kindOfValue}`;
        } else {
            if (digits >= 4 && digits <= 6) {
                valueSplitted.splice(digits - 3, 0, ".");
            }

            if (digits == 7) {
                // 1.000.000
                const secondDigit = valueSplitted[1];

                if (Number(secondDigit) != 0) {
                    valueSplitted.splice(1, 0, ",");
                    valueSplitted.splice(3, 5);
                } else {
                    valueSplitted.splice(1, 6);
                }
            } else if (digits == 8) {
                // 10.000.000
                valueSplitted.splice(2, 6);
            } else if (digits == 9) {
                // 100.000.000
                valueSplitted.splice(3, 6);
            }

            if (digits <= 6) {
                result = `${valueSplitted.join("")} ${kindOfValue}`;
            } else {
                result = `${valueSplitted.join("")} M de ${kindOfValue}`;
            }
        }
    }

    return result; */
}

function formatSubscribeCount(value: string): string {
    return formatViewCount(value, false, "suscriptores");
}

function formatCount(value: string, showExactly: boolean = false): string {
    let result = value;

    if (result != undefined) {
        const digits = value.length;
        const valueSplitted = value.split("");

        if (showExactly) {
            const viewCuntFormatted: string[] = [];

            valueSplitted.reverse().forEach((digit, index) => {
                if (index != 0 && index % 3 == 0) {
                    viewCuntFormatted.push(".");
                }

                viewCuntFormatted.push(digit);
            });

            result = viewCuntFormatted.reverse().join("");
        } else {
            if (digits >= 4 && digits <= 6) {
                valueSplitted.splice(digits - 3, 0, ".");
            }

            if (digits == 7) {
                // 1.000.000
                const secondDigit = valueSplitted[1];

                if (Number(secondDigit) != 0) {
                    valueSplitted.splice(1, 0, ",");
                    valueSplitted.splice(3, 5);
                } else {
                    valueSplitted.splice(1, 6);
                }
            } else if (digits == 8) {
                // 10.000.000
                valueSplitted.splice(2, 6);
            } else if (digits == 9) {
                // 100.000.000
                valueSplitted.splice(3, 6);
            }

            if (digits > 6) {
                result = `${valueSplitted.join("")} M`;
            } else {
                result = valueSplitted.join("");
            }
        }
    }

    return result;
}

function formatTimeElapsed(value: string, showDate: boolean): string {
    let result = value;

    if (result != undefined) {
        if (showDate) {
            const videoUploadDate = new Date(value);

            const day = videoUploadDate.getDate();
            const month = videoUploadDate.getUTCMonth() + 1;
            const year = videoUploadDate.getUTCFullYear();

            result = `${day} ${TimeUtils.convertMonthNumberToString(month)} ${year}`;
        } else {
            let diff = Date.now() - new Date(value).getTime();
            let days = diff / day_milli;

            if (days < 1) {
                const hours = diff / hour_milli;

                if (hours < 1) {
                    const minutes = diff / minute_milli;

                    if (minutes < 1) {
                        // show seconds
                        const diffInSeconds = diff / second_milli;
                        result = `hace ${diffInSeconds} secundos`;
                    } else {
                        // show minutes
                        result = `hace ${minutes} minutos`;
                    }
                } else {
                    // show hours
                    const hoursInt = hours.toString()[0];
                    let hoursLabel = "hora";

                    if (Number(hoursInt) > 1) {
                        hoursLabel = "horas";
                    }

                    result = `hace ${hoursInt} ${hoursLabel}`;
                }
            } else {
                if (days < 30) {
                    if (days < 7) {
                        // Show days
                        const daysInt = days.toString()[0];
                        let daysLabel = "día";

                        if (Number(daysInt) > 1) {
                            daysLabel = "días";
                        }

                        result = `hace ${daysInt} ${daysLabel}`;
                    } else {
                        if (days < 14) {
                            // show 1 week
                            result = "hace 1 semana";
                        } else if (days < 21) {
                            // show 2 weeks
                            result = "hace 2 semanas";
                        } else {
                            // show 3 weeks
                            result = "hace 3 semanas";
                        }
                    }
                } else {
                    const months = diff / month_milli;

                    if (months < 12) {
                        // show months
                        const monthsInt = months.toString()[0];
                        let monthLabel = "mes";

                        if (Number(monthsInt) > 1) {
                            monthLabel = "meses";
                        }

                        result = `hace ${monthsInt} ${monthLabel}`;
                    } else {
                        // show years
                        const years = diff / year_milli;
                        const yearsInt = years.toString()[0];
                        let yearLabel = "año";

                        if (Number(yearsInt) > 1) {
                            yearLabel = "años";
                        }

                        result = `hace ${yearsInt} ${yearLabel}`;
                    }
                }
            }
        }
    }

    return result;
}

function formatDuration(value: string): string {
    const ptIndex = value.indexOf("PT") + 1;

    if (value.includes("H")) {
        const hoursIndex = value.indexOf("H");
        const minutesIndex = value.indexOf("M");
        const secondsIndex = value.indexOf("S");

        const hours = value.substring(ptIndex + 1, hoursIndex);
        const minutes = value.substring(hoursIndex + 1, minutesIndex);
        const seconds = value.substring(minutesIndex + 1, secondsIndex);

        return `${hours}:${getDurationTimeFormatted(minutes)}:${getDurationTimeFormatted(seconds)}`;
    } else if (value.includes("M")) {
        const minutesIndex = value.indexOf("M");
        const secondsIndex = value.indexOf("S");

        const minutes = value.substring(ptIndex + 1, minutesIndex);
        const seconds = value.substring(minutesIndex + 1, secondsIndex);

        return `${minutes}:${getDurationTimeFormatted(seconds)}`;
    } else {
        const secondsIndex = value.indexOf("S");

        const seconds = value.substring(ptIndex + 1, secondsIndex);

        return `0:${getDurationTimeFormatted(seconds)}`;
    }
}

/* START HELPERS */

function getDurationTimeFormatted(value: string): string {
    if (Number(value) < 10) {
        return `0${value}`;
    }

    return value;
}

/* END HELPERS */

Vue.filter("formatViewCount", formatViewCount);
Vue.filter("formatTimeElapsed", formatTimeElapsed);
Vue.filter("formatDuration", formatDuration);
Vue.filter("formatSubscribeCount", formatSubscribeCount);
Vue.filter("formatCount", formatCount);
