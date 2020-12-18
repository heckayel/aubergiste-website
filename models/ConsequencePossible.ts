import {Model} from '@vuex-orm/core'

export default class ConsequencePossible extends Model {
    static entity = 'consequence-possibles';
    static primaryKey = 'id';

    static fields() {
        return {
            id: this.uid(),
            poids: this.number(0),
            etapeSuivanteId:this.string(null).nullable(),
            reponseId: this.string(null).nullable(),
        }
    }
}
