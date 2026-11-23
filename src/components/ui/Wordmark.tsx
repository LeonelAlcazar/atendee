// The logo: "atende" in the text color and the dot in coral. No badge.
export function Wordmark({ className = '' }: { className?: string }) {
  return (
    <span className={`font-semibold leading-none tracking-[-0.05em] ${className}`}>
      atende<span className="text-coral">.</span>
    </span>
  );
}
