class Posts{
    postId: number;
    createdDate: String;
    title: String;
    content: String;
    userId: String;
    headerImage: String;
    lastUpdated: String;

    constructor(postId: number, createdDate: String, title: String, content: String, userId: String, headerImage: String, lastUpdated: String){
        this.postId = postId;
        this.createdDate = createdDate;
        this.title = title;
        this.content = content;
        this.userId = userId;
        this.headerImage = headerImage;
        this.lastUpdated = lastUpdated;
    }
}
const postArray:Posts[]=[];
export{Posts, postArray}
