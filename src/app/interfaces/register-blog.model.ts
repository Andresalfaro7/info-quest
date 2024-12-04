export class RegisterBlog {
    title:string = "";
    subtitle:string = "";
    author:string = "";
    article:string = "";
    today: Date = new Date();
    id: string = "";

    constructor(id: string, title:string, subtitle:string,  author:string, article:string, today:Date){
        this.id = id;
        this.title = title;
        this.subtitle = subtitle;
        this.author = author;
        this.article = article;
        this.today = today;
    }
}