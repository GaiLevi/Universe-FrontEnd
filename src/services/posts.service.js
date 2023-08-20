import { httpService } from "./http.service";

async function addPost(post){
    try {
        return await httpService.post("/posts", post);
    } catch (error) {
        console.log(error);
    }
}
export const postService = {
    addPost
}