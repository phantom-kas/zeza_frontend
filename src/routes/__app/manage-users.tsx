import { createFileRoute } from '@tanstack/react-router'
import InfiniteLoad from '../../components/list/infiniteLoad'
import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react'
import StatusBadge from '../../components/statusBadge'
import MediaImage from '../../components/mediaImage'
import { anyCurrency, getImageUrl } from '../../composabels/utils'
import { useState } from 'react'
import Avatar from '../../components/avatar/avatarWithImage'
import FullscreenOverlay from '../../components/FullscreenOverlay'
import CloseRow from '../../components/closeRow'
import axios from 'axios'
import { useQueryClient } from '@tanstack/react-query'

export const Route = createFileRoute('/__app/manage-users')({
  component: RouteComponent,
})




function RouteComponent() {
  const queryClient = useQueryClient()
  const [expandedOrders, setExpandedOrders] = useState<Record<number, boolean>>({})
  const [selected, setSelect] = useState(0)
  const [isOpen, setIsOpen] = useState(false)

  const toggleShowMore = (id: number) => {
    setExpandedOrders(prev => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  const handleRoleUpdate = async (role) => {

    await axios.patch('/user/role/' + selected, { role }).then(res => {

      queryClient.setQueryData(["users"], (oldData: any) => {
        if (!oldData) return oldData
        return {
          ...oldData,
          pages: oldData.pages.map((page: any) =>
            page.map((p: any) =>
              p.id === selected ? { ...p, role: role } : p
            )
          ),
        }
      })
    })
    setIsOpen(false)
  }
  return <><InfiniteLoad qKey={'users'} is='div' className=' w-max1200 mx-auto sm-px-6 px-2 mt-20 flex flex-col gap-7' url={'/users'} renderItem={((item: any) => {
    const isExpanded = !!expandedOrders[item.id]
    return <div key={item.id} className=' w-full flex flex-col theme2cont py-2 sm:px-4 px-2'>
      <div className=' w-full grid gap-4 grid-cols-1 sm:grid-cols-3 lg:grid-cols-5'>
        <Atom label={'ID'} className='sm:w-max50 ' value={item.id} />

        <Atom label={'User'} className='sm:w-max200 ' value={<div className=' flex items-start flex-col text-xs'><Avatar url={getImageUrl(item.image)} /> <span>{item.name}</span>  <span>{item.email}</span><span>{item.phone}</span></div>} />

        <Atom label={'Date Registered'} className=' ' value={item.created_at} />
        <Atom onClick={() => { setSelect(item.id); setIsOpen(true) }} label={'Role'} className=' ha cursor-pointer' value={item.role} />

        <div className='flex gap-3  items-center'>

          <StatusBadge status={item.status} />
          <button onClick={() => toggleShowMore(item.id)} className=' flex items-center cursor-pointer'>
            <span className='  mr-2 text-white2 not-dark:text-neutral-800 text-xs'>Edit Status</span>
            <button className=' ha items-center flex  justify-center size-7 p-1 theme2cont rounded-xl cursor-pointer'>
              {!isExpanded ? <ChevronDownIcon /> : <ChevronUpIcon />}
            </button>
          </button>
        </div>
      </div>
      {isExpanded && <div className=' w-full bg-neutral-100 dark:bg-neutral-950 p-2 sm:p-4 rounded-xl mt-0.5 '>
        <MediaImage className=' w-max100' media={item.media} />
        <div className='flex flex-col text-xs'>
          <div className=' flex gap-3'>
            <span className=' not-dark:text-[#0977e6] dark:text-[#348aee] '>{anyCurrency(item.amount)}</span>
            <span className='  flex items-center gap-1'> ({item.quantity ?? 0})</span>
          </div>
          {item.pdtname}
        </div>
      </div>}
    </div>
  })} />
    <FullscreenOverlay className=' bg-black p-3 theme1cont w-max600' isOpen={isOpen} onClose={() => { setIsOpen(false) }}>
      <div className=' w-full flex items-center justify-start flex-col gap-6'>
        <CloseRow onclick={() => { setIsOpen(false) }} />
        <button onClick={() => handleRoleUpdate('admin')} className=' cursor-pointer theme2cont rounded-2xl ha p-3 w-max100'>Admin</button>
        <button onClick={() => handleRoleUpdate('user')} className=' cursor-pointer theme2cont rounded-2xl ha p-3 w-max100'>User</button>
        <button onClick={() => handleRoleUpdate('super_admin')} className=' cursor-pointer theme2cont rounded-2xl ha p-3 w-max100'>Super Admin</button>
      </div>
    </FullscreenOverlay>
  </>
}


const Atom = ({ label, value, className = '', onClick = () => { } }: { onClick?: () => void; className?: string, label: string, value: React.ReactNode }) => {
  return <div onClick={onClick} className={'flex sm:flex-col items-start justify-between sm:justify-start ' + className}>
    <span className=' text-sm text-white3 font-[600] '>{label}:</span>
    <span>{value}</span>
  </div>
}


const products = () => {

}