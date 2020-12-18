import {Model} from "@vuex-orm/core";

export default class MondeUser extends Model {
    static entity = 'MondeUser';
    static primaryKey = ['mondeId', 'user_id'];

    static fields() {
        return {
            mondeId: this.string(null).nullable(),
            user_id: this.string(null).nullable()
        };
    };
}
