import {Model} from '@vuex-orm/core'
import ConsequencePossible from "./ConsequencePossible";
import Unite from "~/models/Unite";

export default class Effet extends Model {
    static entity = 'effets';
    static primaryKey = 'id';

    static fields() {
        return {
            id: this.uid(),
            texte: this.string(null).nullable(),
            quantite: this.number(0),
            type: this.string(''),
            etapeId: this.string(null).nullable(),
            uniteId: this.string(null).nullable(),
            unite: this.belongsTo(Unite,'uniteId')
        }
    }
}
