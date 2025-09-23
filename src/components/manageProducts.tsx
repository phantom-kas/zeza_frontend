import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import axios from '../lib/axios'
import InfiniteLoad from "./list/infiniteLoad";
import ConfirmCOmponent from "./confirmCOmponent";
import { anyCurrency } from "../composabels/utils";
import { ProduCardAdmin } from "./productsAdmin";

export default ({ featured = undefined }: { featured: any }) => {
    const queryClient = useQueryClient()
    const [seletedId, setSeletedId] = useState<string | number>(0);
    const [showConf, setShowConf] = useState(false);
    const [showRConf, setShowRConf] = useState(false);
    const [showConfF, setShowConfF] = useState(false);
    const [showRFConf, setShowRFConf] = useState(false);
    const [loading, setloading] = useState(false);
    const handelDelete = () => {
        setShowConf(false)
        axios.delete('/product/' + seletedId + '/delete', { _showAllMessages: true }).then(res => {
            if (res.data.status != 'success') return
            queryClient.setQueryData(["products" + JSON.stringify(featured)], (oldData: any) => {
                if (!oldData) return oldData

                return {
                    ...oldData,
                    pages: oldData.pages.map((page: any) =>
                        page.map((p: any) =>
                            p.id === seletedId ? { ...p, status: "deleted" } : p
                        )
                    ),
                }
            })
            // queryClient.invalidateQueries({ queryKey: ["products"] })
        })
    }


    const handelRemoveFromFEatured = async () => {
        setloading(true)
        await axios.delete('/product/delete-from-featured/' + seletedId, { _showAllMessages: true }).then(res => {
            setShowRFConf(false)
            // window.alert(res.data.data)
            if (res.data.status != 'success') return
            if (res.data.data < 1) return

            queryClient.setQueryData(['products' + JSON.stringify(featured)], (oldData: any) => {
                if (!oldData) return oldData
                return {
                    ...oldData,
                    pages: oldData.pages.map((page: any) =>
                        page.map((p: any) =>
                            p.id === seletedId ? { ...p, featured_id: undefined } : p
                        )
                    ),
                }
            })
        }).catch(() => {
            setShowRFConf(false)

        })
        setShowRFConf(false)
        setloading(false)
    }



    const handelAddToFEatured = async () => {
        setloading(true)
        await axios.post('/product/add-to-featured/' + seletedId, { _showAllMessages: true }).then(res => {
            setShowConfF(false)
            if (res.data.status != 'success') return
            queryClient.setQueryData(["products" + JSON.stringify(featured)], (oldData: any) => {

                if (!oldData) return oldData
                return {
                    ...oldData,
                    pages: oldData.pages.map((page: any) =>
                        page.map((p: any) =>
                            p.id === seletedId ? { ...p, featured_id: res.data.data } : p
                        )
                    ),
                }
            })
        }).catch(() => {
            setShowConfF(false)
        })
        setShowConfF(false)
        setloading(false)
    }
    const handelRestore = () => {
        setShowRConf(false)
        axios.delete('/product/' + seletedId + '/restore', { _showAllMessages: true }).then(res => {
            if (res.data.status != 'success') return
            // window.alert('pop')
            queryClient.setQueryData(["products" + JSON.stringify(featured)], (oldData: any) => {
                if (!oldData) return oldData
                return {
                    ...oldData,
                    pages: oldData.pages.map((page: any) =>
                        page.map((p: any) =>
                            p.id === seletedId ? { ...p, status: "restored" } : p
                        )
                    ),
                }
            })
            // queryClient.invalidateQueries({ queryKey: ["products"] })

        })
    }
    let f: undefined | { featured: number } = undefined
    if (featured) {
        f = { featured: 1 }
    }
    return <> <div className=" relative @container grow pt-10 pb-20">

        <InfiniteLoad params={f} renderItem={(item: any) => {
            return <> <ProduCardAdmin key={item.id}
                status={item.status}
                featuredId={item.featured_id}
                onRestore={(id) => { setSeletedId(id); setShowRConf(true) }}
                onDelete={(id) => { setSeletedId(id); setShowConf(true) }}
                id={item.id} media={item.media} created_at={item.created_at}
                to={'/product/' + item.id} price={anyCurrency(item.price)}
                className=" w-full @xs:w-max300"
                onAddToFeatured={(id) => { setSeletedId(id); setShowConfF(true) }}
                onRemoveFromFeatured={(id) => { setSeletedId(id); setShowRFConf(true) }}
                title={item.name} describtion='' /></>
        }} className='@container grow grid grid-1 @sm:grid-cols-3 @xs:grid-cols-2 w-full gap-4' is='div' qKey={'products' + JSON.stringify(featured)} url='/products'
        />
    </div>

        <ConfirmCOmponent text='Are you sure you want to delete this product' onOk={handelDelete} isOpen={showConf} onClose={() => setShowConf(false)} cancel={() => setShowConf(false)} >
        </ConfirmCOmponent>


        <ConfirmCOmponent text='Are you sure you want to restore this product' onOk={handelRestore} isOpen={showRConf} onClose={() => setShowRConf(false)} cancel={() => setShowConf(false)} >
        </ConfirmCOmponent>



        <ConfirmCOmponent isLoading={loading} text='Are you sure you want to Add this product to featured.' onOk={handelAddToFEatured} isOpen={showConfF} onClose={() => setShowConfF(false)} cancel={() => setShowConfF(false)} >
        </ConfirmCOmponent>

        <ConfirmCOmponent isLoading={loading} text='Are you sure you want to remove this product from featured.' onOk={handelRemoveFromFEatured} isOpen={showRFConf} onClose={() => setShowRFConf(false)} cancel={() => setShowRFConf(false)} >
        </ConfirmCOmponent>
    </>


}