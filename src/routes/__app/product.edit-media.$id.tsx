import { useQuery, useQueryClient } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import axios from 'axios'
import { EllipsisIcon, Expand, ImageIcon, Pencil, Trash2, VideoIcon } from 'lucide-react'
import { getImageUrl } from '../../composabels/utils'
import { Dropdown } from '../../components/dopDown'
import { BlueButton } from '../../components/ButtonBlue'
import FullscreenOverlay from '../../components/FullscreenOverlay'
import { ImageCropper } from '../../components/forms/imagePicker'
import { useState } from 'react'
import { VideoPicker } from '../../components/VideoPicker'
import ToolTip from '../../components/toolTip'
import ConfirmCOmponent from '../../components/confirmCOmponent'

export const Route = createFileRoute('/__app/product/edit-media/$id')({
  component: RouteComponent,
})

const qFn = async (id: string | number) => {
  const res = await axios.get(`/products/${id}/media`)
  return res.data.data.media
}
function RouteComponent() {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenVideo, setIsOpenVideo] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [brand, setBrand] = useState('');
  const [showConf, setshowConf] = useState(false);
  const [cropperImage, setCropperImage] = useState<{ [key: string]: object }>({});
  const [description, setDescription] = useState({});

  const [uploadProgress, setUploadProgress] = useState(0);
  const [image, setImage] = useState<string | null>(null);
  const [selected, setSeleted] = useState<{}>({});
  const { id } = Route.useParams()

  let uploadMedia: any
  const queryClient = useQueryClient();

  const { isPending, error, data } = useQuery({
    queryKey: ['mediaData' + id],
    queryFn: async () => {
      let m = await qFn(id)
      console.log(m);
      return m
    }
  })
  if (isPending) return 'Loading...'

  if (error) return 'An error has occurred: ' + error.message


  const handelCrop = (e) => {
    console.log(e.img)
    // const objectUrl = URL.createObjectURL(e.img);
    // setImage(objectUrl);
    // setCropperImage(e.img)
    uploadMedia = e.img
    setIsOpen(false)
    handelUpload()
  }


  const handelDelete = async () => {
    setshowConf(false)
    await axios.delete('/product/' + id + '/media/delete', { data: { index: selected } }).then(res => {
      if (res.data.status != 'success') return

      queryClient.setQueryData(['mediaData' + id], (oldData: any) => {
        if (!oldData) return oldData; // nothing cached yet

        // remove item at index
        const newData = oldData.filter((_: any, i: number) => i !== selected);

        return newData;
      });
    })
  }

  const handelVideoUpload = (e) => {
    console.log(e)
    uploadMedia = e.video;
    setIsOpenVideo(false)
    handelUpload()
  }

  const handelUpload = async () => {
    let url = '/product/addMedia/' + id;
    let data: any = { media: uploadMedia }
    if (selected != -1) {
      url = '/product/' + id + '/media/update'
      data.index = selected
    }
    setIsLoading(true)
    await axios.post(url, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (progressEvent) => {
        if (progressEvent.total) {
          const percent = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          )
          setUploadProgress(percent)
        }
      },
      _showAllMessages: true
    }).finally(() => {
      setUploadProgress(0)

    })
      .then(res => {
        if (res.data.status != 'success') return

        // data = res.data.data

        queryClient.setQueryData(['mediaData' + id], res.data.data.media)


      });




    setIsLoading(false)
  }
  return <><div className=' w-max1200 flex flex-col px-6 pt-10 mx-auto pb-30'>
    <div className=' w-full flex items-start justify-start'>
      <Dropdown
        options={[
          { label: "Image", icon: <ImageIcon size={20} />, emit: "addImage" },
          { label: "Video", emit: "addVideo", icon: <VideoIcon size={20} /> },
        ]}
        mainIcon={<BlueButton label=' Add ' >

        </BlueButton>}
        onAction={(emit) => { setSeleted(-1); emit == 'addImage' ? setIsOpen(true) : emit == 'addVideo' ? setIsOpenVideo(true) : '' }}
      />
    </div>
    <div className=' w-full   grid grid-cols-4 max-lg:grid-cols-2 max-sm:grid-cols-1 gap-6 mt-4'>
      {
        data.map((item: { [key: string]: string }, index: number) => {
          return <div key={item.url} className=' flex relative theme1cont justify-center items-center p-1 not-dark:border-neutral-400 not-dark:border flex-col'>
            {item.type == 'image' ? <>  <img alt='' className=' max-w-full max-h-full my-auto' src={getImageUrl(item.url)} />
            </> : <video className=' max-w-full max-h-full my-auto' controls src={getImageUrl(item.url)} />}
            <div className=' w-full mt-auto flex justify-end items-center'>
              <ToolTip className=' flex items-center justify-center' TooltipContent="Delete">
                <button onClick={() => { setSeleted(index); item.type == 'image' || index == 0 ? setIsOpen(true) : setIsOpenVideo(true) }} className=' flex justify-center items-center w-11 h-11 p-1 rounded-full ha'>
                  <Pencil />
                </button>
                <button onClick={() => { setSeleted(index), setshowConf(true) }} className=' flex justify-center items-center w-11 h-11 p-1 rounded-full ha'>
                  <Trash2 />
                </button>
              </ToolTip>
            </div>
          </div>
        })}


    </div>
  </div>
    <FullscreenOverlay className=' bg-black p-3 theme1cont w-max1000' isOpen={isOpen} onClose={() => setIsOpen(false)}>
      <ImageCropper onCrop={(e) => { handelCrop(e) }} />
    </FullscreenOverlay>
    <FullscreenOverlay className=' bg-black p-3 theme1cont w-max1000' isOpen={isOpenVideo} onClose={() => setIsOpenVideo(false)}>
      <VideoPicker onSelect={e => handelVideoUpload(e)} />
    </FullscreenOverlay>
    <FullscreenOverlay className=' bg-black p-3 theme1cont w-max1000' isOpen={uploadProgress != null && uploadProgress != 0} onClose={() => { }}>
      <div className=' w-full flex items-start justify-start h-6'>
        <div className=' bg-blue w-[20%] h-full rounded-3xl' style={{ width: `${uploadProgress}%` }}></div>
      </div>
    </FullscreenOverlay>
    <ConfirmCOmponent onOk={handelDelete} isOpen={showConf} onClose={() => setshowConf(false)} cancel={() => setshowConf(false)} >

    </ConfirmCOmponent>
  </>
}
