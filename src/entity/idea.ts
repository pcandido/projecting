
export class Idea {
    constructor(
        public readonly id:string, 
        public readonly title:string, 
        public readonly repository:string, 
        public readonly description:string, 
        public readonly readme: string, 
        public readonly author: string
    ){        
    }           
}