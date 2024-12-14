import { TBlog } from "@/lib/types";

const URL = 'https://jsonplaceholder.typicode.com/posts';

export const getBlogsListApi = async () => {
    const response = await fetch(URL);
    
    if (!response.ok) {
        throw new Error();
    }
    
    const data: TBlog[] = await response.json();
    return data;
}

export const getBlogApi = async (id: string) => {
    const response = await fetch(`${URL}/${id}`);
    
    if (!response.ok) {
        throw new Error();
    }
    
    const data: TBlog = await response.json();
    return data;
}
