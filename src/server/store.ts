import { create } from 'zustand'
import { getBlogsListApi } from './api'
import { TBlog } from '@/lib/types'

type Store = {
    search: string;
    setSearch: (search: string) => void;
    blogs: TBlog[];
    isLoading: boolean;
    isError: boolean;
    visibleCount: number; 
    fetchBlogs: () => void;
    loadMoreBlogs: () => void;
}

export const useStore = create<Store>((set) => ({
    search: '',
    setSearch: (search) => set({ search }),
    blogs: [],
    isLoading: true,
    isError: false,
    visibleCount: 9,
    fetchBlogs: async () => {
        set({ isLoading: true, isError: false })
        try {
            const data = await getBlogsListApi();
            set({ blogs: data, isLoading: false, isError: false })
        } catch {
            set({ blogs: [], isLoading: false, isError: true })
        }
    },
    loadMoreBlogs: () => set((state) => ({ visibleCount: state.visibleCount + 9 }))
}))
