import { useTheme } from "../context/ThemeContext";

export default function JobSkeleton() {
    const { theme } = useTheme();
    const shimmerClass = "animate-shimmer rounded-md";

    return (
        <div
            className={`p-3 rounded-xl border mb-4 md:mb-8 ${
                theme === "dark"
                    ? "bg-[#1E1E20] border-lighterGrey/50"
                    : "bg-[#f4f4f4] border-gray-300"
            }`}
        >
            <div
                className={`flex flex-col items-center rounded-xl gap-3 p-4 border ${
                    theme === "dark"
                        ? "bg-[rgba(255,255,255,0.05)] border-lighterGrey/50"
                        : "bg-white border-gray-300"
                }`}
            >
                {/* Top: Category & Salary */}
                <div className="flex items-center justify-between w-full">
                    <div className={`h-6 w-24 rounded-full ${shimmerClass}`}></div>
                    <div className={`h-8 w-32 ${shimmerClass}`}></div>
                </div>

                {/* Middle: Logo & Info */}
                <div className="text-left w-full flex gap-4">
                    <div className={`w-12 h-12 rounded-full flex-shrink-0 ${shimmerClass}`}></div>
                    <div className="flex flex-col gap-2 w-full">
                        <div className={`h-6 w-3/4 ${shimmerClass}`}></div>
                        <div className={`h-4 w-1/2 ${shimmerClass}`}></div>
                    </div>
                </div>

                {/* Description */}
                <div className="w-full space-y-2 mt-2">
                    <div className={`h-3 w-full ${shimmerClass}`}></div>
                    <div className={`h-3 w-5/6 ${shimmerClass}`}></div>
                </div>
            </div>

            {/* Bottom: Time & Location/WorkType */}
            <div className="text-sm mt-3 flex items-center gap-6 pl-6">
                <div className={`h-4 w-20 ${shimmerClass}`}></div>
                <div className={`h-4 w-24 ${shimmerClass}`}></div>
            </div>
        </div>
    );
}
