import {Model} from "@vuex-orm/core";

export default class Unite extends Model {
    static entity = 'unites';
    static primaryKey = 'id';

    static fields() {
        return {
            id: this.uid(),
            libelle: this.string(''),
            code: this.string(''),
            description: this.string(''),
            mondeId: this.string(null).nullable(),
        }
    }
}
