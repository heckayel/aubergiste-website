import {Model} from "@vuex-orm/core";
import Unite from "~/models/Unite";

export default class Stat extends Model {
    static entity = 'stat';
    static primaryKey = 'id';

    static fields() {
        return {
            id: this.uid(),
            quantite: this.number(0),
            texte: this.string(null).nullable(),
            partieId : this.string(null).nullable(),
            unite:this.belongsTo(Unite, 'uniteId'),
            uniteId : this.string(null).nullable(),
        }
    }
}
