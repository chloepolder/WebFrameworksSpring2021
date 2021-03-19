"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postArray = exports.Posts = void 0;
class Posts {
    constructor(postId, createdDate, title, content, userId, headerImage, lastUpdated) {
        this.postId = postId;
        this.createdDate = createdDate;
        this.title = title;
        this.content = content;
        this.userId = userId;
        this.headerImage = headerImage;
        this.lastUpdated = lastUpdated;
    }
}
exports.Posts = Posts;
const postArray = [];
exports.postArray = postArray;
//# sourceMappingURL=posts.js.map