import { createFileRoute } from '@tanstack/react-router'
import InfiniteLoad from '../../../components/list/infiniteLoad';
import { Pencil, Trash2 } from 'lucide-react';

export const Route = createFileRoute('/__app/manage-brands/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div className=" relative @container grow pt-10 pb-20">
    <InfiniteLoad dropDownOptions={[
      { label: 'Edit Brand', icon: <Pencil size={16} /> },
      { label: 'Delete', icon: <Trash2 size={16} />, },
    ]} Headeritems={[
      { titleLabel: 'Name', valueKey: 'name' },
      { titleLabel: 'Number Of Products', valueKey: 'num_products' },
      { titleLabel: 'Created At', valueKey: 'created_at' },
    ]} className='w-full' is='table' qKey={'brands'} url='/brands'
    />

  </div>

}


