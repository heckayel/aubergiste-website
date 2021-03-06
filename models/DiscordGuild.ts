import {Model} from "@vuex-orm/core";
import Partie from "~/models/Partie";
import DiscordGuildPartie from "~/models/DiscordGuildPartie";

export default class DiscordGuild extends Model {
    static entity = 'discord-guild';
    static primaryKey = 'id';

    static fields() {
        return {
            id: this.uid(),
            guildId:this.string(''),
            name: this.string(''),
            prefix: this.string(null).nullable(),
            icon: this.string(''),
            parties: this.belongsToMany(
                Partie,
                DiscordGuildPartie,
                'discordGuildId',
                'partieId'
            ),
        }
    }

    static findOneById(id:string){
        return DiscordGuild.query().withAllRecursive().where('id', id).first();
    }

    static findAllRecursive(){
        return DiscordGuild.query().withAllRecursive().all();
    }

}
