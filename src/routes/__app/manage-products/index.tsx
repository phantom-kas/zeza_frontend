import { createFileRoute } from '@tanstack/react-router'
import { anyCurrency } from '../../../composabels/utils'
import { ProduCardAdmin } from '../../../components/productsAdmin'
import InfiniteLoad from '../../../components/list/infiniteLoad'
import { useState } from 'react'
import ConfirmCOmponent from '../../../components/confirmCOmponent'
import axios from 'axios'
import { useQueryClient } from '@tanstack/react-query'

export const Route = createFileRoute('/__app/manage-products/')({
  component: RouteComponent,
})

function RouteComponent() {
  const queryClient = useQueryClient()
  const [seletedId, setSeletedId] = useState<string | number>(0);
  const [showConf, setShowConf] = useState(false);
  const [showRConf, setShowRConf] = useState(false);

  const handelDelete = () => {
    setShowConf(false)
    axios.delete('/product/' + seletedId + '/delete', { _showAllMessages: true }).then(res => {
      if (res.data.status != 'success') return

      // window.alert('pop')
      queryClient.setQueryData(["products"], (oldData: any) => {
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

  const handelRestore = () => {
    setShowRConf(false)
    axios.delete('/product/' + seletedId + '/restore', { _showAllMessages: true }).then(res => {
      if (res.data.status != 'success') return

      // window.alert('pop')
      queryClient.setQueryData(["products"], (oldData: any) => {
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
  return <> <div className=" relative @container grow pt-10 pb-20">


    <InfiniteLoad renderItem={(item) => {
      return <ProduCardAdmin status={item.status} onRestore={(id) => { setSeletedId(id); setShowRConf(true) }} onDelete={(id) => { setSeletedId(id); setShowConf(true) }} id={item.id} media={item.media} created_at={item.created_at} to={'/product/' + item.id} price={anyCurrency(item.price)} className=" w-full @xs:w-max300" title={item.name} describtion='' />
    }} className='@container grow grid grid-1 @sm:grid-cols-3 @xs:grid-cols-2 w-full gap-4' is='div' qKey={'products'} url='/products'
    />
  </div>

    <ConfirmCOmponent text='Are you sure you want to delete this product' onOk={handelDelete} isOpen={showConf} onClose={() => setShowConf(false)} cancel={() => setShowConf(false)} >
    </ConfirmCOmponent>


    <ConfirmCOmponent text='Are you sure you want to restore this product' onOk={handelRestore} isOpen={showRConf} onClose={() => setShowRConf(false)} cancel={() => setShowConf(false)} >
    </ConfirmCOmponent>
  </>


}
