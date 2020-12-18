import {Model} from "@vuex-orm/core";

export default class DiscordGuildPartie extends Model {
    static entity = 'DiscordGuildPartie';
    static primaryKey = ['discordGuildId', 'partieId'];

    static fields() {
        return {
            discordGuildId: this.string(null).nullable(),
            partieId: this.string(null).nullable()
        };
    };
}
