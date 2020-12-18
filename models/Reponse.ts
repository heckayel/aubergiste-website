import {Model} from '@vuex-orm/core'
import ConsequencePossible from "./ConsequencePossible";

export default class Reponse extends Model {
    static entity = 'reponses';
    static primaryKey = 'id';

    static fields() {
        return {
            id: this.uid(),
            libelle: this.string(''),
            titre: this.string(''),
            texte: this.string(''),
            etapeId: this.string(null).nullable(),
            consequencePossibles: this.hasMany(ConsequencePossible, 'reponseId'),

        }
    }
}
