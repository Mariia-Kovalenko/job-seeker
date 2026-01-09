import { useTheme } from "../context/ThemeContext";

export default function JobRecommendationSkeleton() {
    const { theme } = useTheme();
    const shimmerClass = "animate-shimmer rounded-md";

    return (
        <div className="w-full mb-8 mt-4 overflow-hidden">
            {/* Title & View All Link */}
            <div className="flex justify-between items-baseline max-w-4xl px-4 mx-auto mb-5">
                <div className={`h-6 w-32 ${shimmerClass}`}></div>
                <div className={`h-4 w-16 ${shimmerClass}`}></div>
            </div>

            {/* Skeleton Cards Container */}
            <div className="flex gap-4 overflow-hidden px-4 md:px-[calc(((100%-896px)/2)+16px)]">
                {[1, 2, 3].map((item) => (
                    <div
                        key={item}
                        className={`min-w-[280px] md:min-w-[320px] p-5 rounded-2xl border flex flex-col justify-between h-44 ${
                            theme === 'dark'
                                ? 'bg-[#1E1E20] border-lighterGrey/30'
                                : 'bg-white border-gray-200 shadow-sm'
                        }`}
                    >
                        <div className="flex flex-col gap-2">
                            <div className="flex justify-between items-start">
                                {/* Logo */}
                                <div className={`w-10 h-10 rounded-full ${shimmerClass}`}></div>
                                {/* Location */}
                                <div className={`h-4 w-16 ${shimmerClass}`}></div>
                            </div>
                            <div className="mt-2 space-y-2">
                                {/* Title */}
                                <div className={`h-5 w-3/4 ${shimmerClass}`}></div>
                                {/* Company */}
                                <div className={`h-3 w-1/2 ${shimmerClass}`}></div>
                            </div>
                        </div>

                        <div className="flex items-center justify-between mt-4">
                            {/* Work Type Badge */}
                            <div className={`h-6 w-20 rounded-full ${shimmerClass}`}></div>
                            {/* Salary */}
                            <div className={`h-4 w-24 ${shimmerClass}`}></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
