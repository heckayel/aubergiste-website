import {Model} from "@vuex-orm/core";
import Reponse from "~/models/Reponse";
import Stat from "~/models/Stat";

export default class Partie extends Model {
    static entity = 'partie';
    static primaryKey = 'id';

    static fields() {
        return {
            id: this.uid(),
            actif:this.boolean(false),
            stats : this.hasMany(Stat, 'partieId'),
        }
    }
}
