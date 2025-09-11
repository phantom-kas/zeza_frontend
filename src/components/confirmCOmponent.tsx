import FullscreenOverlay from "./FullscreenOverlay"

export default ({ text = 'Are you sure you want to proceed?',isOpen=false, onOk = (() => { }), cancel = (() => { }) , onClose = (() => { }) }) => {
    return <FullscreenOverlay className=' p-3  w-max1000' isOpen={isOpen} onClose={onClose}>
        <div className=' mx-auto theme1cont dark:bg-black not-dark:bg-white p-4 w-max500 '>
            <div className='flex flex-col'>
                <div>
                    {text}
                </div>
                <div className=' w-full flex justify-end gap-4 text-white'>
                    <button type="button" onClick={onOk} className=' px-4 py-2 bg-blue hover:bg-blue-500  rounded-sm'>Ok</button>
                    <button type="button" onClick={cancel} className=' px-4 py-2 bg-red-800 hover:bg-red-600 rounded-sm'>Cancel</button>
                </div>
            </div>
        </div>
    </FullscreenOverlay>
}