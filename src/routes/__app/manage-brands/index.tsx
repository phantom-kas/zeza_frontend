import { createFileRoute, useNavigate } from '@tanstack/react-router'
import InfiniteLoad from '../../../components/list/infiniteLoad';
import { ArrowUpRightFromSquareIcon, BoxesIcon, IdCardLanyardIcon, Pencil, Share2, Trash2 } from 'lucide-react';
import FullscreenOverlay from '../../../components/FullscreenOverlay';
import { useState } from 'react';
import InputField from '../../../components/forms/input2';
import CloseRow from '../../../components/closeRow';
import { BlueButton } from '../../../components/ButtonBlue';
import QuillEditor from '../../../components/forms/quill-editor';
import axios from '../../../lib/axios';
import { useQueryClient } from '@tanstack/react-query';
import { apiBase, handleShare } from '../../../composabels/utils';

export const Route = createFileRoute('/__app/manage-brands/')({
  component: RouteComponent,
})

function RouteComponent() {
  const queryClient = useQueryClient()
      const navigate = useNavigate()

  const [isOpen, setIsOpen] = useState(false)
  const [isLoading2, setLoading] = useState(false)

  const [productCount, setproductCount] = useState('')
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [id, setId] = useState('')

  const handelSub = async (e) => {
    
    e.preventDefault()
    setLoading(true)
    await axios.post('/brand/update/' + id, { name, description, num_products: productCount }, { _showAllMessages: true }).finally(() => {
      setLoading(false)
    }).then(res => {
      if (res.data.status != 'success') {
        return
      }
      queryClient.setQueryData(["brands"], (oldData: any) => {
        if (!oldData) return oldData

        return {
          ...oldData,
          pages: oldData.pages.map((page: any) =>
            page.map((p: any) =>
              p.id === id
                ? { ...p, name, description, num_products: productCount }
                : p
            )
          ),
        }
      })
    })
    setIsOpen(false)

  }

  const handleDroplick = (e, i) => {
    if (e == 'edit') {
      setDescription(i.description)
      setName(i.name)
      setId(i.id)
      setproductCount(i.num_products)
      setIsOpen(true)
    }
    else if(e==='share'){
      handleShare(apiBase+'/brand/'+i.name+'-'+i.id,i.name,i.name)
    }
    
    else if (e == 'to') {
      navigate({ to: '/shop', search: { brand: [i.name] } });
    }
  }
  return <> <div className=" relative @container grow pt-10 pb-20">
    <InfiniteLoad onAction={handleDroplick} dropDownOptions={[
      { label: 'Edit Brand', emit: 'edit', icon: <Pencil size={16} /> },
      { label: 'Delete', emit: 'edit', icon: <Trash2 size={16} />, },
      // { label: 'Share', emit: 'share', icon: <Share2 size={16} />, },
      { label: 'View Products', emit: 'to', icon: <ArrowUpRightFromSquareIcon size={16} />, },
    ]} Headeritems={[
      { titleLabel: 'Name', valueKey: 'name' },
      { titleLabel: 'Number Of Products', valueKey: 'num_products' },
      { titleLabel: 'Created At', valueKey: 'created_at' },
    ]} className='w-full' is='table' qKey={'brands'} url='/brands'
    />
  </div>

    <FullscreenOverlay className=' p-3  w-max500 theme1cont blurbg2' isOpen={isOpen} onClose={() => { setIsOpen(false) }}>
      {/* <div className=' mx-auto  p-4 w-max500 '> */}
      <div className='flex flex-col gap-4 '>
        <CloseRow onclick={() => setIsOpen(false)} />
        <form onSubmit={handelSub} className=" w-full flex flex-col gap-6">
          <InputField onInput={e => setName(e.value)} val={name} name={"email"} label="Name" className=" theme2cont" icon={<IdCardLanyardIcon />} />
          <InputField onInput={e => setproductCount(e.value)} val={productCount} name={"phone"} label="Product count" icon={<BoxesIcon />} />
          {/* {data}- */}
          <QuillEditor value={description} />
          <BlueButton loading={isLoading2} label="submit" />
        </form>
      </div>
      {/* </div> */}
    </FullscreenOverlay></>
}


