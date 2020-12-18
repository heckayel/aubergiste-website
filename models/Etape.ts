
import Reponse from "./Reponse";
import {Model} from "@vuex-orm/core";
import Effet from "@/models/Effet";

export default class Etape extends Model {
    static entity = 'etapes';
    static primaryKey = 'id';

    static fields() {
        return {
            id: this.uid(),
            titre: this.string(''),
            texte: this.string(''),
            scenarioId: this.string(null).nullable(),
            effets: this.hasMany(Effet, 'etapeId'),
            reponses: this.hasMany(Reponse, 'etapeId'),
        }
    }

    static findOneById(id:string){
        return Etape.query().withAllRecursive().where('id', id).first();
    }
}
