import { User } from "../utils/types";

type AvatarProps = {
    user?: User;
    companyName?: string;
    size?: string;
};

export default function Avatar({ user, companyName, size = "16px" }: AvatarProps) {
    const getAvatarContent = (user?: User, companyName?: string) => {
        const comp = companyName || user?.company;
        const initial = comp?.charAt(0).toUpperCase() || "";
        const colors = [
            "#3b82f6",
            "#8b5cf6",
            "#ec4899",
            "#6366f1",
            "#06b6d4",
            "#10b981",
            "#f59e0b",
            "#f97316",
            "#f43f5e",
            "#a855f7",
        ];
        // Deterministic color based on the email/name
        const charCodeSum = (user?.email || "")
            .split("")
            .reduce((acc, char) => acc + char.charCodeAt(0), 0);
        const bgColor = colors[charCodeSum % colors.length];

        return { initial, bgColor };
    };

    const { initial, bgColor } = getAvatarContent(user, companyName);
    return (
        <div style={{background: bgColor}} className={`rounded-full w-${size} h-${size} flex items-center justify-center text-white text-xl md:text-2xl font-semibold shrink-0`}>
            {initial || (
                <img
                    src="/default-logo.png"
                    alt="Company"
                    className="w-12 h-12 rounded-full border-none"
                />
            )}
        </div>
    );
}
