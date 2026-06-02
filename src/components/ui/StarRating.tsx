import { Star, StarHalf } from "lucide-react";

interface StarRatingProps {
  rating: number;
  size?: number;
  showValue?: boolean;
  count?: number;
}

export default function StarRating({ rating, size = 14, showValue, count }: StarRatingProps) {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (rating >= i) {
      stars.push(<Star key={i} size={size} fill="currentColor" className="text-[var(--gold)]" />);
    } else if (rating >= i - 0.5) {
      stars.push(<StarHalf key={i} size={size} fill="currentColor" className="text-[var(--gold)]" />);
    } else {
      stars.push(<Star key={i} size={size} className="text-[var(--bg2)]" />);
    }
  }

  return (
    <span className="flex items-center gap-1">
      <span className="flex items-center gap-0.5">{stars}</span>
      {showValue && (
        <span className="text-sm font-semibold text-[var(--text)] ml-1">{rating.toFixed(1)}</span>
      )}
      {count !== undefined && (
        <span className="text-xs text-[var(--subtext)]">({count})</span>
      )}
    </span>
  );
}
