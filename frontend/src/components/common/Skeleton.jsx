import React from 'react';

export const BlogSkeleton = () => (
    <div className="animate-pulse flex flex-col h-full">
        <div className="relative aspect-[16/10] rounded-[1.5rem] bg-zinc-800 mb-6"></div>
        <div className="flex flex-col flex-1 space-y-3">
            <div className="h-6 bg-zinc-800 rounded w-3/4"></div>
            <div className="h-4 bg-zinc-800 rounded w-full"></div>
            <div className="h-4 bg-zinc-800 rounded w-5/6"></div>
            <div className="mt-auto flex items-center gap-3 pt-4">
                <div className="w-8 h-8 rounded-full bg-zinc-800"></div>
                <div className="h-3 bg-zinc-800 rounded w-24"></div>
            </div>
        </div>
    </div>
);

export const FeaturedSkeleton = () => (
    <div className="animate-pulse flex flex-col lg:flex-row gap-8 mb-16">
        <div className="flex-[2] relative rounded-3xl bg-zinc-800 aspect-[16/10] lg:aspect-auto h-[300px] md:h-[400px]"></div>
        <div className="flex-1 space-y-6">
            <div className="h-6 bg-zinc-800 rounded w-1/2 mb-6"></div>
            {[1, 2, 3].map((i) => (
                <div key={i} className="flex gap-4">
                    <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-zinc-800 flex-shrink-0"></div>
                    <div className="flex flex-col justify-center gap-2 flex-1">
                        <div className="h-4 bg-zinc-800 rounded w-full"></div>
                        <div className="h-4 bg-zinc-800 rounded w-3/4"></div>
                    </div>
                </div>
            ))}
        </div>
    </div>
);

export const StorySkeleton = () => (
    <div className="animate-pulse bg-zinc-950/50 rounded-[2.5rem] border border-zinc-800 overflow-hidden h-[500px] md:h-[600px] flex flex-col md:flex-row">
        <div className="p-8 md:p-16 flex-1 space-y-6">
            <div className="h-8 bg-zinc-800 rounded w-1/3"></div>
            <div className="space-y-3">
                <div className="h-6 bg-zinc-800 rounded w-full"></div>
                <div className="h-6 bg-zinc-800 rounded w-5/6"></div>
            </div>
            <div className="h-10 bg-zinc-800 rounded w-32"></div>
        </div>
        <div className="md:w-1/2 bg-zinc-800"></div>
    </div>
);

export const StoryDetailSkeleton = () => (
    <div className="animate-pulse min-h-screen bg-black text-white">
        <div className="h-64 md:h-[50vh] bg-zinc-900 w-full mb-12"></div>
        <div className="max-w-5xl mx-auto px-6 space-y-12">
            <div className="h-32 bg-zinc-900 rounded-[2rem] w-full"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="h-48 bg-zinc-900 rounded-[2rem]"></div>
                <div className="h-48 bg-zinc-900 rounded-[2rem]"></div>
            </div>
            <div className="h-64 bg-zinc-900 rounded-[3rem] w-full"></div>
        </div>
    </div>
);

export const StatSkeleton = () => (
    <div className="animate-pulse p-8 rounded-3xl bg-zinc-900/50 border border-zinc-800">
        <div className="h-10 bg-zinc-800 rounded w-24 mb-4"></div>
        <div className="h-6 bg-zinc-800 rounded w-32 mb-3"></div>
        <div className="h-4 bg-zinc-800 rounded w-full"></div>
    </div>
);
