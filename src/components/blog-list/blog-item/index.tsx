'use client'
import { TBlog } from "@/lib/types"
import { useCallback } from "react"

export const BlogItem = ({ blog, onClick }: { blog: TBlog, onClick: (id: number) => void }) => {
    const handleClick = useCallback(() => {
        onClick(blog.id)
    },[blog.id, onClick])

    return (
        <div
            onClick={handleClick}
            className="bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg p-4 shadow cursor-pointer"
        >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">{blog.title}</h3>
            <p className="text-sm text-gray-700 dark:text-gray-300">{blog.body}</p>
        </div>
    )
}
