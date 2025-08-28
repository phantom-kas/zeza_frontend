import React from "react"
import { Search } from "lucide-react"

interface SearchInputProps {
  onInput?: (value: string) => void
  placeholder?: string
  name?: string
}

export const SearchInput: React.FC<SearchInputProps> = ({
  onInput,
  placeholder = "Search Track",
  name = "search",
}) => {
  return (
    <label className="bg-white flex flex-row items-center pl-4 shadow-md rounded-2xl theme1cont">
      <Search className="text-[#7F7E83]" size={20} />
      <input
        name={name}
        placeholder={placeholder}
        onInput={(e) => onInput?.((e.target as HTMLInputElement).value)}
        className="grow h-full px-2 rounded-lg focus:ring-blue-500 focus:border-blue-500 outline-none p-2.5 text-[18px] placeholder:text-[#7F7E83]"
      />
    </label>
  )
}

export default SearchInput
