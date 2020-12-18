import {Model} from '@vuex-orm/core'
import User from "@/models/User";
import Unite from "@/models/Unite";
import MondeUser from "@/models/MondeUser";
import Scenario from "@/models/Scenario";

export default class Monde extends Model {
    static entity = 'mondes';
    static primaryKey = 'id';

    static fields() {
        return {
            id: this.string('').nullable(),
            code: this.string('').nullable(),
            titre: this.string('').nullable(),
            texte: this.string('').nullable(),
            statDefaults: this.attr([]).nullable(),
            auteurs: this.belongsToMany(User, MondeUser, 'mondeId', 'user_id'),
            unites: this.hasMany(Unite, 'mondeId'),
            scenarios : this.hasMany(Scenario, 'mondeId'),
        }
    }

    static findOneById(id:string){
        return Monde.query().withAllRecursive().where('id', id).first();
    }

}
