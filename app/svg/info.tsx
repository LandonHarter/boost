export default function InfoSVG({ className, pathClassName }: { className?: string, pathClassName?: string }) {
    return (
        <svg width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
            <circle cx="12" cy="12" r="10" stroke="#1C274C" strokeWidth="1.5" className={pathClassName} />
            <path d="M12 17V11" stroke="#1C274C" strokeWidth="1.5" strokeLinecap="round" className={pathClassName} />
            <circle cx="1" cy="1" r="1" transform="matrix(1 0 0 -1 11 9)" fill="#1C274C" className={pathClassName} />
        </svg>
    );
}