import { Plugin } from "@nuxt/types";
import { initializeAxios } from "@/utils/api";

const accessor: Plugin = ({ $axios }) => {
    $axios.onRequest((config) => {
        config.params = config.params || {};
        config.params["key"] = "AIzaSyAlVg9FRmGvzi8EUvUwtI5Q7umN0mSZANw";

        return config;
    });

    initializeAxios($axios);
};

export default accessor;
