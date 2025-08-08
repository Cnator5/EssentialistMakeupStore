import React from 'react'
import { useTranslation } from 'react-i18next'

const flags = {
  en: '🇬🇧',
  fr: '🇫🇷'
}

export default function LanguageSwitcher() {
  const { i18n } = useTranslation()

  const handleChange = (e) => {
    const lang = e.target.value
    i18n.changeLanguage(lang)
    localStorage.setItem('lang', lang)
  }

  return (
    <select
      onChange={handleChange}
      value={i18n.language}
      className="bg-white text-black px-2 py-1 border rounded"
      aria-label="Select language"
    >
      <option value="en">{flags.en} English</option>
      <option value="fr">{flags.fr} Français</option>
    </select>
  )
}