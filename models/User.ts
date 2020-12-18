import {Model} from "@vuex-orm/core";
import MondeUser from "@/models/MondeUser";
import Monde from "@/models/Monde";

export default class User extends Model {
    static entity = 'users';
    static primaryKey = 'id';

    static fields() {
        return {
            id: this.uid(),
            username: this.string(''),
            mondes: this.belongsToMany(Monde, MondeUser, 'user_id', 'mondeId')
        }
    }
}
