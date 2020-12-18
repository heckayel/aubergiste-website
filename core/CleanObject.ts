export class CleanObject {

    static clean$id = (obj:any) => {
        const objConst = {...obj}
        if(objConst["$id"]){
            delete objConst["$id"];
        }

        for(let o in objConst){
            if(objConst[o] instanceof Object){
                objConst[o] = CleanObject.clean$id(objConst[o]);
            }
        }
        return objConst;
    }
}
