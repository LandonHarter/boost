export default function ChatSVG({ className, pathClassName }: { className?: string, pathClassName?: string }) {
    return (
        <svg fill="#000000" height="800px" width="800px" version="1.1" id="XMLID_270_" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" className={className}
            viewBox="0 0 24 24" enableBackground="new 0 0 24 24" xmlSpace="preserve">
            <g id="chat">
                <g>
                    <path d="M2,24v-4H0V7h8V0h16v13h-2v4l-5.8-4H16v7H7.8L2,24z M2,18h2v2.1L7.2,18H14V9H2V18z M16,11h0.8l3.2,2.1V11h2V2H10v5h6V11z" className={pathClassName}
                    />
                </g>
            </g>
        </svg>
    );
}