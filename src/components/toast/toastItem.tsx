import { useEffect } from "react"
import { Check, InfoIcon, TriangleAlertIcon, XIcon } from "lucide-react"


export type ToastStatus = "success" | "error" | "warning" | "info"

interface ToastItemProps {
  id: string
  msg: string
  status?: ToastStatus
  onRemove: (id: string) => void
  duration?: number
}

export default function ToastItem({
  id,
  msg,
  status = "success",
  onRemove,
  duration = 10000,
}: ToastItemProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onRemove(id)
    }, duration)
    return () => clearTimeout(timer)
  }, [id, onRemove, duration])

  const icon =
    status === "info"
      ? <InfoIcon />
      : status === "warning"
        ? <TriangleAlertIcon />
        : status === "success"
          ? <Check />
          : <XIcon />

  return (
    <div
      className={`toast ${status} text-white flex flex-row justify-between items-start gap-4 p-2 rounded-md shadow-md relative`}
    >
      <div className="flex items-center justify-center w-8 h-8 rounded">
        {icon}
      </div>

      <div
        className="message leading-4 flex-1"
        dangerouslySetInnerHTML={{ __html: msg }}
      />

      <button
        onClick={() => onRemove(id)}
        className="ml-auto text-white hover:text-gray-200"
      >
        <XIcon />
      </button>
    </div>
  )
}
