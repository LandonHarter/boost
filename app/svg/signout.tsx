export default function SignOutSVG({ className, pathClassName }: { className?: string, pathClassName?: string }) {
    return (
        <svg fill="#000000" width="800px" height="800px" viewBox="0 0 24 24" id="sign-out-left-2" data-name="Flat Line" xmlns="http://www.w3.org/2000/svg" className={className}>
            <polyline id="primary" points="6 15 3 12 6 9" className={pathClassName}></polyline>
            <line id="primary-2" data-name="primary" x1="3" y1="12" x2="17" y2="12" className={pathClassName}></line>
            <path id="primary-3" data-name="primary" d="M10,8V5a1,1,0,0,1,1-1h9a1,1,0,0,1,1,1V19a1,1,0,0,1-1,1H11a1,1,0,0,1-1-1V16" className={pathClassName}></path>
        </svg>
    );
}