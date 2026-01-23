import { useTheme } from "../context/ThemeContext";

export default function JobPageSkeleton() {
    const { theme } = useTheme();
    const shimmerClass = "animate-shimmer rounded-md";

    return (
        <div
            className={`p-1 md:p-2 rounded-xl border mb-4 md:mb-8 ${
                theme === "dark"
                    ? "bg-[#1E1E20] border-lighterGrey/50"
                    : "bg-[#f4f4f4] border-gray-300"
            }`}
        >
            <div
                className={`flex flex-col rounded-xl gap-3 p-4 border ${
                    theme === "dark"
                        ? "bg-[rgba(255,255,255,0.05)] border-lighterGrey/50"
                        : "bg-white border-gray-300"
                }`}
            >
                {/* Header: Logo, Title, Time */}
                <div className="flex gap-4 w-full">
                    <div className={`w-12 h-12 rounded-full flex-shrink-0 ${shimmerClass}`}></div>
                    <div className="flex flex-col w-full gap-2">
                        <div className="flex justify-between items-center w-full">
                            <div className={`h-6 w-3/4 ${shimmerClass}`}></div>
                            <div className={`h-4 w-16 hidden sm:block ${shimmerClass}`}></div>
                        </div>
                        <div className={`h-4 w-1/2 ${shimmerClass}`}></div>
                    </div>
                </div>

                {/* Categories */}
                <div className="flex gap-2 w-full mt-2">
                    <div className={`h-6 w-20 rounded-full ${shimmerClass}`}></div>
                    <div className={`h-6 w-24 rounded-full ${shimmerClass}`}></div>
                </div>

                {/* Salary & WorkType */}
                <div className="flex gap-2 items-center w-full mt-2">
                    <div className={`h-8 w-32 ${shimmerClass}`}></div>
                    <div className={`h-4 w-20 ${shimmerClass}`}></div>
                </div>

                <div className={`h-4 w-20 sm:hidden mt-1 ${shimmerClass}`}></div>

                {/* Divider */}
                <div className={`w-full h-[1px] my-2 ${theme === "dark" ? "bg-lighterGrey/30" : "bg-gray-200"}`}></div>

                {/* Sections */}
                <div className="w-full space-y-6 mt-2">
                    {/* About the job */}
                    <div className="space-y-2">
                        <div className={`h-5 w-32 ${shimmerClass}`}></div>
                        <div className="space-y-1">
                            <div className={`h-3 w-full ${shimmerClass}`}></div>
                            <div className={`h-3 w-5/6 ${shimmerClass}`}></div>
                        </div>
                    </div>

                    {/* Stack */}
                    <div className="space-y-2">
                        <div className={`h-5 w-20 ${shimmerClass}`}></div>
                        <div className={`h-3 w-2/3 ${shimmerClass}`}></div>
                    </div>

                    {/* Full Description */}
                    <div className="space-y-2">
                        <div className={`h-5 w-36 ${shimmerClass}`}></div>
                        <div className="space-y-1">
                            <div className={`h-3 w-full ${shimmerClass}`}></div>
                            <div className={`h-3 w-full ${shimmerClass}`}></div>
                            <div className={`h-3 w-4/5 ${shimmerClass}`}></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
