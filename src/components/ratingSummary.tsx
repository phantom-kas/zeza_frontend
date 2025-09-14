
export default function RatingSummary({
    ratingSumaryString,
    totalReviews,
    rating,
    
}: {
    ratingSumaryString: string;
    totalReviews: number;
    rating:string|number;
   
}) {
    let reviewsParsed: Record<string, number> = {};
    try {
        if (ratingSumaryString) {
            reviewsParsed = JSON.parse(ratingSumaryString);
        }
    } catch (e) {
        reviewsParsed = {};
    }

    return (
        <div className="w-full space-y-2">
            {[5, 4, 3, 2, 1].map((star) => {
                const count = reviewsParsed[star] || 0;
                const percent =
                    totalReviews > 0 ? Math.round((count / totalReviews) * 100) : 0;

                return (
                    <div key={star} className="w-full flex gap-2 items-center">
                        <span className="text-sm w-4">{star}</span>
                        <div className="w-full relative flex shadow-sm bg-neutral-200 dark:bg-neutral-600 rounded-sm h-4">
                            <span
                                style={{ width: `${percent}%` }}
                                className="h-full bg-amber-400 rounded-sm transition-all duration-300"
                            ></span>
                        </div>
                        <span className="text-xs w-10 text-right">{count}</span>
                    </div>
                );
            })}
        </div>
    );
}
