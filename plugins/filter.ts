import Vue from "vue";

const second_milli = 1000;
const minute_milli = 60 * second_milli;
const hour_milli = 60 * minute_milli;
const day_milli = 24 * hour_milli;
const month_milli = 30 * day_milli;
const year_milli = 365 * day_milli;

function formatViewCount(value: string): string {
    let result = value;

    if (result != undefined) {
        const digits = value.length;
        const valueSplitted = value.split("");

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
            result = `${valueSplitted.join("")} visualizaciones`;
        } else {
            result = `${valueSplitted.join("")} M de visualizaciones`;
        }
    }

    return result;
}

function formatTimeElapsed(value: string): string {
    let result = value;

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

    return result;
}

Vue.filter("formatViewCount", formatViewCount);
Vue.filter("formatTimeElapsed", formatTimeElapsed);
