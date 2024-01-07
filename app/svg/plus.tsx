export default function PlusSVG({ className, pathClassName }: { className?: string, pathClassName?: string }) {
    return (
        <svg width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
            <path d="M4 12H20M12 4V20" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={pathClassName} />
        </svg>
    );
}