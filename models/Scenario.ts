import {Model} from '@vuex-orm/core'
import Etape from "./Etape";

export default class Scenario extends Model {
    static entity = 'scenarios';
    static primaryKey = 'id';

    static fields() {
        return {
            id: this.uid(),
            titre: this.string(''),
            actif: this.boolean(false),
            premiereEtape: this.string(''),
            mondeId: this.string(null).nullable(),
            etapes: this.hasMany(Etape, 'scenarioId'),
        }
    }

    static findOneById(id:string){
        return Scenario.query().withAllRecursive().where('id', id).first();
    }

}
