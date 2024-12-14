'use client'
import { useStore } from "@/server/store"
import { ChangeEvent, useCallback, useEffect, useMemo, useState } from "react"
import { BlogItem } from "./blog-item"
import { useRouter } from "next/navigation"

export const BlogList = () => {
    const { search, setSearch, blogs, fetchBlogs, isLoading, isError, visibleCount, loadMoreBlogs } = useStore()
    const [debouncedSearch, setDebouncedSearch] = useState<string>(search)
    const {push} = useRouter();

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setDebouncedSearch(search)
        }, 1000)

        return () => clearTimeout(timeoutId)
    }, [search])

    useEffect(() => {
        fetchBlogs()
    }, [fetchBlogs])

    const filteredPosts = useMemo(() =>
        blogs?.filter(post =>
            post.title.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
            post.body.toLowerCase().includes(debouncedSearch.toLowerCase())
        ),
        [blogs, debouncedSearch]
    )

    const visiblePosts = useMemo(() => filteredPosts.slice(0, visibleCount), [filteredPosts, visibleCount]);

    const handleClick = useCallback((id: number) => {
        push(`/blog/${id}`)
    },[push])

    const content = useMemo(() => {
        if (isLoading) {
            return <div className="text-gray-700 dark:text-gray-300">Loading...</div>
        }
        if (isError) {
            return <p className="text-red-500">There is some error in server, please try later...</p>
        }
        return (
            <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {visiblePosts.map(blog => <BlogItem key={blog.id} blog={blog} onClick={handleClick}/>)}
                </div>
                {visiblePosts.length < filteredPosts.length && (
                    <div className="flex justify-center mt-6">
                        <button
                            onClick={loadMoreBlogs}
                            className="mt-6 px-4 py-2 bg-gray-100 dark:bg-gray-800 text-white rounded hover:dark:bg-gray-700 transition hover:bg-gray-200"
                        >
                            <p className="text-gray-700 dark:text-gray-300"> Load More</p>
                        </button>
                    </div>

                )}
            </>
        )
    }, [isLoading, isError, visiblePosts, filteredPosts.length, loadMoreBlogs, handleClick])

    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => setSearch(e.target.value);

    return (
        <div className="min-h-screen bg-gray-300 dark:bg-black text-foreground p-10">
            <input
                type="text"
                placeholder="Search by title or description..."
                value={search}
                onChange={handleSearch}
                className="border dark:bg-gray-800 border-gray-300 dark:border-gray-600 p-2 mb-6 w-full rounded text-gray-700 dark:text-gray-100"
            />
            {content}
        </div>
    )
}
