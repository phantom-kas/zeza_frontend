import ToastItem from "./toastItem"
import { useToastStore } from "../../store/toast"
// eslint-disable-next-line react-refresh/only-export-components
export default () => {
  const toasts = useToastStore((s) => s.toasts)

  const removeToast = useToastStore((s) => s.removeToast)




  return (



    <div className="fixed top-0 right-4 space-y-2  w-64  z-[9999999]">
      {toasts.map((t) => (
        <ToastItem
          key={t.id}
          id={t.id}
          msg={t.message}
          status={t.status}
          onRemove={removeToast}
        />
      ))}
    </div>

  )
}
