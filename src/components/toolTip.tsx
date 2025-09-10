import type React from "react"

interface props {
    children: React.ReactNode
    TooltipContent: React.ReactNode
    className?: string
    toolTipclassName?: string
}
export default ({ toolTipclassName = '', children, className = '', TooltipContent }: props) => <div className={"relative group " + className}>
    <div className={"absolute z-10 invisible group-hover:visible group-hover:opacity-100 inline-block px-3 py-2 text-xs text-center font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-xs opacity-0 tooltip dark:bg-gray-700 bottom-[100%] mb-2" + toolTipclassName}>
        {TooltipContent}
    </div>
    {children}
</div>