import { getBlogApi } from "@/server/api"
import Link from "next/link";

export default async function Page({ params }: { params: { id: string } }) {
    const {id} = await params;
    const data = await getBlogApi(id);

    return (
        <div className="min-h-screen bg-gray-300 dark:bg-black text-foreground p-10">
                <Link
                    className="px-4 mb-4 py-2 bg-gray-100 dark:bg-gray-800 text-white rounded hover:dark:bg-gray-700 transition hover:bg-gray-200 text-gray-800 dark:text-gray-300"
                    href={'/'}
                >
                    Go Back
                </Link>
            <h3 className="text-2xl mt-6 font-semibold text-gray-900 dark:text-gray-100 mb-2">{data.title}</h3>
            <p className="text-lg text-gray-700 dark:text-gray-300">{data.body}</p>
        </div>
    )
}