<template>
    <div class="monde-creation">
        <h1>Création d'un monde</h1>
        <v-form v-model="valid" class="container">
            <v-row>
                <v-col cols="2">
                    <v-text-field v-model="monde.code" label="Code" required outlined />
                </v-col>
                <v-col cols="10">
                    <v-text-field v-model="monde.titre" label="Titre" required outlined />
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <v-textarea v-model="monde.texte" label="Texte" outlined />
                </v-col>
            </v-row>
            <v-row>
                <v-col align="center">
                    <v-btn @click="save">Enregistrer</v-btn>
                </v-col>
            </v-row>
        </v-form>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";
    import {Action} from "nuxt-class-component";

    @Component({
        components: {}
    })
    export default class Creation extends Vue {
        valid: boolean = false;
        monde: any = {};

        @Action('monde/post') postMonde:any;

        async save(){
            const data = await this.postMonde({monde : this.monde});
            await this.$router.push(`/mondes/${data.id}`);
        }
    }
</script>
