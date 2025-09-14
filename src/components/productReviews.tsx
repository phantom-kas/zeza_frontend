import { useQuery, useQueryClient } from "@tanstack/react-query";
import RatingSummary from "./ratingSummary"
import axios from "axios";
import InfiniteLoad from "./list/infiniteLoad";
import Avatar from "./avatar/avatarWithImage";
import { getImageUrl } from "../composabels/utils";
import DOMPurify from "dompurify"

export default ({ id }: { id: string | number }) => {
    const queryClient = useQueryClient();
    const { isPending, error, data } = useQuery({
        queryKey: ['mediaData' + id],
        queryFn: async () => {
            let r = await axios.get('/product/' + id + '/review-data')

            return r.data.data

        }
    })
    return <><div className=" mt-10"></div>{data && <RatingSummary ratingSumaryString={data.review_sumary} totalReviews={data.total_reviews} rating={data.review} />}
        <InfiniteLoad is={'div'} className="flex flex-col gap-4 mt-10 " qKey={"product-reviews" + id} url={"/review/product-reviews/" + id} renderItem={(item: any) => {
            return <div className=" w-full theme2cont p-3">
                <div className=" flex justify-start items-center">
                    <Avatar url={getImageUrl(item.image)} /> {item.name}
                </div>
                <p  dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(item.review) }}>
                </p>
                <div className=" text-xs text-right">
                    {item.created_at}
                </div>
            </div>
        }} />
    </>
}