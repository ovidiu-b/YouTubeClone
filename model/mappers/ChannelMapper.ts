import { ChannelDTO } from "@/google-api/youtube-api/types/dtos/module";
import { ChannelBO } from "@/model/module";

export default class ChannelMapper {
    static dtoToBo(channelDTO: ChannelDTO): ChannelBO {
        return new ChannelBO(channelDTO.id, channelDTO.title, channelDTO.thumbnail, channelDTO.subscriberCount);
    }
}
