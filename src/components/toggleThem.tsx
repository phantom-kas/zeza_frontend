import { MoonIcon, SunIcon } from 'lucide-react'
import { useThemeStore } from '../store/themestore'

export function ThemeToggle() {
  const { theme, toggleTheme } = useThemeStore()

  return (
    <button type="button"
      onClick={toggleTheme}
      className="p-2 rounded-full  hover:bg-gray-200 dark:hover:bg-gray-700"
    >
      {theme === 'light' ? <MoonIcon size={20} /> : <SunIcon size={20} />}
    </button>
  )
}
