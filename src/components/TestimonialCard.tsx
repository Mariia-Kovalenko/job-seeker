import { useTheme } from "../context/ThemeContext";

interface TestimonialCardProps {
    text: string;
    name: string;
    position: string;
  }
  
export default function TestimonialCard({ text, name, position }: TestimonialCardProps) {
    const {theme} = useTheme();
    return (
      <div className={`flex flex-col min-w-[320px] max-w-[340px] md:max-w-[400px] border ${theme =="dark" ? "bg-[rgba(255,255,255,0.05)] border-neutral-200 text-white" : "bg-white border-neutral-200 text-gray-900"} rounded-2xl p-6 shadow-md`}>
        <div className="text-primary text-[80px] leading-[30px] mt-2">“</div>
  
        <p className="text-sm md:text-lg h-full mb-6">
          {text}
        </p>
  
        <div>
          <p className="text-sm font-medium">
            {name}
          </p>
          <p className="text-xs opacity-80">{position}</p>
        </div>
      </div>
    );
  }
  