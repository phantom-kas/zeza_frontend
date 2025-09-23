import { useQuery, useQueryClient } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router'
import axios from '../../lib/axios';
import InputField3 from '../../components/forms/input3';
import FetchSelect from '../../components/forms/fetchSelect';
import { useState } from 'react';
import QuillEditor from '../../components/forms/quill-editor';
import { BlueButton } from '../../components/ButtonBlue';
import SwiperList from '../../components/swiperList';
import { Pencil, Plus, Trash2 } from 'lucide-react';
import FullscreenOverlay from '../../components/FullscreenOverlay';
import CloseRow from '../../components/closeRow';
import ConfirmCOmponent from '../../components/confirmCOmponent';
import { Link } from '@tanstack/react-router';

export const Route = createFileRoute('/__app/product/edit/$id')({
  component: RouteComponent,
})


function RouteComponent() {
  const { id } = Route.useParams()

  const addProdutToCategory = async (e) => {
    e.preventDefault()
    setIsLoadingCat(true)
    await axios.post("product/" + id + '/add-to-category', { category }, { _showAllMessages: true }).then(res => {
      if (res.data.status != 'success') return


      queryClient.setQueryData([`/product/${id}`], (oldData: any) => {
        if (!oldData) return oldData
        // const exists = oldData.categories?.some((cat: any) => cat.id === category)
        // if (exists) return oldData
        // const newCartegroy = (oldData.categories as any[]).find((e) => e.id == category);
        // console.log('newCartegroy')
        // console.log(newCartegroy)
        // console.log('newCartegroy')

        return {
          ...oldData,
          categories: [

            { id: category, name: 'loading...' },
            ...(oldData.categories || []),
          ],
        }
      })

      queryClient.invalidateQueries({ queryKey: [`/product/${id}`] })

    }).catch(() => {
      setIsLoadingCat(false)
    })
    setIsLoadingCat(false)
  }

  const handelDelete = async () => {
    setIsLoadingCatDel(true)
    await axios.delete("product/" + id + '/remove-from-category', { data: { category }, _showAllMessages: true }).then(res => {
      if (res.data.status != 'success') return


      queryClient.setQueryData([`/product/${id}`], (oldData: any) => {
        if (!oldData) return oldData
        // const newCartegroy = (oldData as any[]).find((e) => e.id = category);

        let newcategory = (oldData.categories as any[]).filter((e) => e.id != category)
        console.log(newcategory)
        console.log('ccccccccccccccccccccccccccccccccc')
        return {
          ...oldData,
          categories: newcategory,
        }
      })



    }).catch(() => {
      setIsLoadingCatDel(false)
    })
    setIsLoadingCatDel(false)
    setshowConf(false)
  }
  const [form, setForm] = useState<{ [key: string]: string | number }>({});

  const [showConf, setshowConf] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingCat, setIsLoadingCat] = useState(false);
  const [isLoadingCatDel, setIsLoadingCatDel] = useState(false);
  const [description, setDescription] = useState({});
  const [isOpenAddCat, setIsOpenAddCat] = useState(false);
  const [category, setCategory] = useState('');

  const handelUpdate = async (e) => {
    e.preventDefault();
    setIsLoading(true)
    await axios.put(`/product/${id}/update`, { ...form, brand, description }, { _showAllMessages: true }).then(res => {
      if (res.data.status != 'success') return


      queryClient.setQueryData([`/product/${id}`], (oldData: any) => {
        if (!oldData) return oldData

        return {
          ...oldData,
          product: {
            ...oldData.data,
            name: form.name,
            description: form.description,
            quantity: form.description,
            price: form.description,
          }
        }
      })

    }).catch(() => {
      setIsLoading(false)
    })
    setIsLoading(false)
  }
  const handleChange = (e: { name: string, value: string | number }) => {
    setForm({ ...form, [e.name]: e.value })
    console.log('eeeeeeeeeeeeeeeeeee')
    console.log(form)
    // console.log(e)
  }
  const [brand, setBrand] = useState('');
  const queryClient = useQueryClient();
  const qFn = (id: string | number) => {
    return axios.get(`/product/${id}`).then((res) => {
      let product = res.data.data.product
      setDescription(product.description);
      setForm({ name: product.name, price: parseInt(product.price) / 100, quantity: product.quantity });
      setBrand(res.data.data.brand[0].id)
      return res.data.data
    })
  }
  const { isPending, error, data } = useQuery({
    queryKey: [`/product/${id}`],
    queryFn: async () => {
      let m = await qFn(id)
      // console.log(m);
      return m
    }
  })













  if (isPending) return 'Loading...'

  if (error) return 'An error has occurred: ' + error.message
  return <><div className=' flex w-max1200 gap-8 mx-auto px-4 pt-10 pb-30 max-lg:flex-col'>
    <div className=' flex flex-col w-max600'>
      <h1 className=' font-[600] text-2xl'>Edit Product</h1>


      <form onSubmit={handelUpdate} className=' w-full theme2cont flex flex-col gap-4 p-4 mt-6 rounded-2xl' action="">
        <InputField3 val={data.product.name} className='w-full ' onInput={e => handleChange(e)} name={'name'} />
        <InputField3 val={parseInt((data.product.price / 100) + '')} onInput={e => handleChange(e)} type='number' name={'price'} className=' grow' label='Price (GHS)' />
        <InputField3 val={parseInt(data.product.quantity)} onInput={e => handleChange(e)} type='number' name={'quantity'} className=' grow' label='Quantity' />
        {/* {data.brand[0].id} */}
        <FetchSelect val={data.brand[0].id} onChange={(e) => setBrand(e.value)} label="Brand" loadClassName="grow w-full" className='grow w-full' qKey={'brandselect'} url={'/brands/short'} name={''} />

        <QuillEditor value={'dsadsa'} onInputed={e => setDescription(e)} placeholder='Description' />

        <BlueButton loading={isLoading} label={'Submit'} className=' w-max300' />
      </form>
    </div>
    <div className='flex flex-col gap-4 w-max600  '>

      <div className=' flex justify-between w-full'>
        <h1>
          Categories
        </h1>
        <button onClick={() => setIsOpenAddCat(true)} className=' flex flex-row gap-2  font-[700] text-blue-700 hover:bg-blue-600/20 px-3 rounded-2xl py-1'>
          <Plus />
          Add
        </button>
      </div>
      <div className=' w-full flex flex-wrap gap-4'>
        {data.categories.map((category: any) => <div className='theme2cont flex flex-row gap-2 items-center justify-center  font-[700] text-white3  hover:bg-yellow-600/20 px-3 rounded-2xl py-1'>
          {category.name}
          {/* {category.id} */}
          <button onClick={() => { setCategory(category.id), setshowConf(true) }} className=' flex items-center justify-center w-8 h-8 p-2 ha rounded-full cursor-pointer '>
            <Trash2 />
          </button>
        </div>)}
      </div>



      <div className=' flex justify-between w-full mt-8'>
        <h1>
          Images
        </h1>
        <Link to={"/product/edit-media/"+id} className=' flex flex-row gap-2 justify-center items-center  font-[700] text-blue-700 hover:bg-blue-600/20 px-3 rounded-2xl py-1'>
          <Pencil size={15} />
          Edit
        </Link>
      </div>
      <SwiperList className={" w-full h-70 theme2cont rounded-2xl"} media={data.media} />

    </div>
  </div>


    <FullscreenOverlay className=' themeBg   p-3 theme1cont w-max500' isOpen={isOpenAddCat} onClose={() => setIsOpenAddCat(false)}>
      <form onSubmit={addProdutToCategory} className=' flex items-center flex-col w-full gap-4'>
        <CloseRow onclick={() => setIsOpenAddCat(false)} />
        <FetchSelect onChange={(e) => setCategory(e.value)} label="Category" loadClassName="grow w-full" className='grow w-full' qKey={'categorieselect'} url={'/categories/short'} name={''} />
        <BlueButton loading={isLoadingCat} label={'Submit'} className=' w-full' />
      </form>
    </FullscreenOverlay>


    <ConfirmCOmponent isLoading={isLoadingCatDel} onOk={handelDelete} isOpen={showConf} onClose={() => setshowConf(false)} cancel={() => setshowConf(false)} >

    </ConfirmCOmponent>
  </>
}
