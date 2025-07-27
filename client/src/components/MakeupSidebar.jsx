// components/MakeupSidebar.jsx

import React, { useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
} from "./ui/sidebar"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible"
import { Sparkle, ChevronDown } from "lucide-react"
import { valideURLConvert } from "../utils/valideURLConvert"

// Sidebar for makeup categories and subcategories
function MakeupSidebar() {
  const loadingCategory = useSelector((state) => state.product.loadingCategory)
  const categoryData = useSelector((state) => state.product.allCategory)
  const subCategoryData = useSelector((state) => state.product.allSubCategory)
  const navigate = useNavigate()

  // Track open category (for collapsible)
  const [openCategory, setOpenCategory] = useState(null)

  // Return subcategories for a category
  const getSubcategoriesForCategory = (categoryId) =>
    subCategoryData.filter(
      (sub) => sub.category && sub.category.some((cat) => cat._id === categoryId)
    )

  // Navigation handler
  const handleRedirectProductListpage = (catId, cat, subCat) => {
    const url = `/${valideURLConvert(cat)}-${catId}/${valideURLConvert(subCat.name)}-${subCat._id}`
    navigate(url)
    // Mobile behavior - close sidebar after selection
    if (window.innerWidth < 1024) {
      setOpenCategory(null)
    }
  }

  return (
    <SidebarProvider>
      <Sidebar 
        collapsible="icon" 
        className="max-w-[260px] h-full sticky top-20 hidden lg:block" 
        aria-label="Makeup Categories Navigation"
      >
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel className="text-base font-semibold flex items-center gap-2">
              <Sparkle className="w-5 h-5 text-pink-500" />
              <span itemScope itemType="https://schema.org/BreadcrumbList">Makeup Categories</span>
            </SidebarGroupLabel>
            <SidebarGroupContent>
              {loadingCategory ? (
                <SidebarMenu>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <SidebarMenuItem key={i}>
                      <SidebarMenuButton>
                        <span className="animate-pulse bg-gray-200 w-2/3 h-4 rounded" />
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              ) : (
                <SidebarMenu>
                  {categoryData.map((category) => {
                    const subcats = getSubcategoriesForCategory(category._id)
                    const isOpen = openCategory === category._id

                    return (
                      <Collapsible
                        key={category._id}
                        open={isOpen}
                        onOpenChange={(open) => setOpenCategory(open ? category._id : null)}
                        className="group/collapsible w-full"
                      >
                        <SidebarMenuItem>
                          <CollapsibleTrigger asChild>
                            <SidebarMenuButton
                              isActive={isOpen}
                              className="flex items-center justify-between w-full hover:bg-pink-50 rounded-md transition-colors"
                            >
                              <span className="flex items-center gap-2 truncate">
                                <Sparkle className="w-4 h-4 flex-shrink-0 text-pink-500" />
                                <span itemProp="name">{category.name}</span>
                              </span>
                              <ChevronDown
                                className={`ml-2 transition-transform flex-shrink-0 ${isOpen ? "rotate-180" : ""}`}
                                size={16}
                              />
                            </SidebarMenuButton>
                          </CollapsibleTrigger>
                        </SidebarMenuItem>
                        <CollapsibleContent>
                          <SidebarMenu>
                            {subcats.length === 0 ? (
                              <SidebarMenuItem>
                                <SidebarMenuButton
                                  asChild
                                  className="text-xs text-muted-foreground pl-8"
                                >
                                  <span>No subcategories</span>
                                </SidebarMenuButton>
                              </SidebarMenuItem>
                            ) : (
                              subcats.map((subCat) => (
                                <SidebarMenuItem key={subCat._id}>
                                  <SidebarMenuButton
                                    asChild
                                    className="pl-8 hover:bg-pink-50 hover:text-pink-700 rounded-md text-sm transition-colors"
                                    onClick={() =>
                                      handleRedirectProductListpage(
                                        category._id,
                                        category.name,
                                        subCat
                                      )
                                    }
                                  >
                                    <span itemProp="name" className="truncate block">{subCat.name}</span>
                                  </SidebarMenuButton>
                                </SidebarMenuItem>
                              ))
                            )}
                          </SidebarMenu>
                        </CollapsibleContent>
                      </Collapsible>
                    )
                  })}
                </SidebarMenu>
              )}
            </SidebarGroupContent>
          </SidebarGroup>
          {/* Schema.org metadata (hidden) */}
          <div style={{ display: 'none' }} itemScope itemType="https://schema.org/SiteNavigationElement">
            {categoryData.map(category => (
              <div key={`schema-${category._id}`}>
                <meta itemProp="name" content={category.name} />
                <meta itemProp="url" content={`https://www.esmakeupstore.com/${valideURLConvert(category.name)}-${category._id}`} />
              </div>
            ))}
          </div>
        </SidebarContent>
      </Sidebar>
    </SidebarProvider>
  )
}

export default MakeupSidebar