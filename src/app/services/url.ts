export class urlDetermination{
    url="https://localhost:44303/api/"
    Geturls(){
        return "https://localhost:44303/api/";
    }
   
}

export abstract class MyClass {         
    // public static myProp = 'https://localhost:5001/api/';
    public static myProp = 'https://localhost:44303/api/';

   
}
// export namespace Library {
//     export const BOOK_SHELF_NONE: string = 'https://localhost:44303/api/';
// }