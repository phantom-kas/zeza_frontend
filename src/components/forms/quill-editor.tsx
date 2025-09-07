import React, { useEffect, useRef } from "react"
import Quill, { type QuillOptions } from "quill"
import "quill/dist/quill.snow.css"

interface QuillEditorProps {
  title?: string
  placeholder?: string
  value?: string | null
  onInputed?: (html: string) => void
}

const QuillEditor: React.FC<QuillEditorProps> = ({
  title = "Title",
  placeholder = "Placeholder",
  value = null,
  onInputed,
}) => {
  const quillEl = useRef<HTMLDivElement | null>(null)
  const quillInstance = useRef<Quill | null>(null)

  // ✅ initialize quill ONCE
  useEffect(() => {
    if (!quillEl.current || quillInstance.current) return

    const toolbarOptions = [
      ["bold", "italic", "underline", "strike"],
      ["blockquote", "code-block"],
      ["link", "image", "video", "formula"],
      [{ header: 1 }, { header: 2 }],
      [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
      [{ script: "sub" }, { script: "super" }],
      [{ indent: "-1" }, { indent: "+1" }],
      [{ direction: "rtl" }],
      [{ size: ["small", false, "large", "huge"] }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [
        { color: ["red", "yellow", "#ff9999"] },
        { background: ["blue", "red", "yellow", "#ff9999"] },
      ],
      [{ font: [] }],
      [{ align: [] }],
      ["clean"],
    ]

    const options: QuillOptions = {
      debug: false,
      modules: { toolbar: toolbarOptions },
      placeholder,
      theme: "snow",
    }

    const quill = new Quill(quillEl.current, options)
    quillInstance.current = quill

    // handle changes
    quill.on("text-change", () => {
      if (onInputed) {
        onInputed(quill.root.innerHTML)
      }
    })

    // disable image upload
    const toolbar = quill.getModule("toolbar") as any
    toolbar.addHandler("image", () => {
      window.alert("Image upload not supported")
    })
  }, [placeholder]) // only depends on placeholder

  // ✅ update content when `value` changes
  useEffect(() => {
    if (value && quillInstance.current) {
      const delta = quillInstance.current.clipboard.convert({ html: value })
      quillInstance.current.setContents(delta, "silent")
    }
  }, [value])

  return (
    <div className="w-full mt-4 p-1 rounded-lg inputel">
      <div className="w-full">
        <div ref={quillEl} className="quill w-full p-1" />
      </div>
    </div>
  )
}

 export default React.memo(QuillEditor)
