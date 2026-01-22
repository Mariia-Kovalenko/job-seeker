import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, FreeMode } from 'swiper/modules';
import { Job } from "../utils/types";
import { useTheme } from "../context/ThemeContext";

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/free-mode';
import { Link } from 'react-router-dom';

export default function JobRecommendations({ relatedJobs }: { relatedJobs: Job[] }) {
    const { theme } = useTheme();

    if (!relatedJobs || relatedJobs.length === 0) return null;

    return (
        <div className="w-full mb-8 mt-4 overflow-hidden">
            <div className="flex justify-between items-baseline max-w-4xl px-4 mx-auto ">
                <h3 className={`text-lg font-bold mb-5 ${theme === 'dark' ? 'text-white' : 'text-darkBackground'}`}>
                    Similar Jobs
                </h3>

                <Link to="/jobs" className='text-primary text-sm underline font-semibold'>View All</Link>
            </div>
            
            <Swiper
                modules={[Navigation, FreeMode]}
                spaceBetween={16}
                slidesPerView={1.2}
                freeMode={true}
                grabCursor={true}
                observer={true}
                observeParents={true}
                className="jobs-swiper !pb-12"
                breakpoints={{
                    480: {
                        slidesPerView: 1.5,
                    },
                    640: {
                        slidesPerView: 2.2,
                    },
                    768: {
                        slidesPerView: 2.5,
                    },
                    960: {
                        slidesPerView: 3,
                    }
                }}
            >
                {relatedJobs.map((job) => (
                    <SwiperSlide key={job._id} className="!h-auto">
                        <a 
                            href={`/jobs/${job._id}`} 
                            className={`my-1 p-5 rounded-2xl border transition-all duration-300 flex flex-col justify-between h-44 hover:-translate-y-1 ${
                                theme === 'dark' 
                                ? 'bg-[#1E1E20] text-white border-lighterGrey/30 hover:border-lighterGrey/60 hover:shadow-2xl hover:shadow-white/5' 
                                : 'bg-white text-darkBackground border-gray-200 hover:border-gray-300 shadow-sm hover:shadow-xl'
                            }`}
                        >
                            <div className="flex flex-col gap-2">
                                <div className="flex justify-between items-start">
                                    <div className="w-10 h-10 rounded-full bg-gray-500/10 flex items-center justify-center overflow-hidden">
                                         <img
                                            src="/default-logo.png"
                                            alt="Company"
                                            className="w-full h-full object-cover opacity-80"
                                        />
                                    </div>
                                    <span className="text-sm font-medium opacity-40">
                                        {job.location}
                                    </span>
                                </div>
                                <div className="mt-2">
                                    <h4 className="text-md font-bold truncate leading-snug">{job.title}</h4>
                                    <p className="text-xs opacity-60 mt-1 truncate">{job.company}</p>
                                </div>
                            </div>
                            
                            <div className="flex items-center justify-between mt-4">
                                <span className={`text-xs px-2 py-1 rounded-full font-semibold capitalize ${
                                    theme === 'dark' 
                                    ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' 
                                    : 'bg-blue-50 text-blue-700 border border-blue-100'
                                }`}>
                                    {job.workType || 'Full-time'}
                                </span>
                                <span className="text-primary text-xs font-semibold">
                                    {job.salaryRange ? `${job.salaryRange}/mo` : 'Competitive'}
                                </span>
                            </div>
                        </a>
                    </SwiperSlide>
                ))}
            </Swiper>

            <style>{`
                .jobs-swiper .swiper-pagination-bullet {
                    background: ${theme === 'dark' ? '#fff' : '#000'};
                    opacity: 0.2;
                }
                .jobs-swiper .swiper-pagination-bullet-active {
                    background: #3b82f6;
                    opacity: 1;
                }
            `}</style>
        </div>
    );
}
