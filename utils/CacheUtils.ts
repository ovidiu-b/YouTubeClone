import { TimeUtils } from "@/utils/module";

export default class CacheUtils {
    static readonly isCacheEnabled = false;

    static hasCacheTimeLimitExpired(key: string, limitTime: Number): boolean {
        const cacheLastSaveTime = localStorage.getItem(key);

        if (cacheLastSaveTime == null || cacheLastSaveTime == undefined) {
            return true;
        } else {
            const cacheLastSaveTimeSeconds = Number(cacheLastSaveTime);
            const currentTimeSeconds = TimeUtils.getCurrentTimeInSeconds();

            return currentTimeSeconds - cacheLastSaveTimeSeconds >= limitTime;
        }
    }
}
