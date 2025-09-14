import { useInfiniteQuery } from "@tanstack/react-query"
import axios from "../../lib/axios"
import React from "react"
import Compnent from '../compnent'
import { Dropdown } from "../dopDown";
import { LucideLoaderCircle, Pencil, Trash2 } from "lucide-react";


type ListProps = {
  Headeritems?: { titleLabel: string, valueKey: string }[];
  showLoadMore?: boolean
  className?: string,
  qKey: string,
  is?: React.ElementType,
  url: string,
  perpage?: number,
  params?: { [key: string]: string | number },
  query?: { [key: string]: any },
  renderItem?: <T>(item: T, index: number) => React.ReactNode;
  dropDownOptions?: { [key: string]: unknown }[]
};
// eslint-disable-next-line react-refresh/only-export-components
export default ({ className, showLoadMore = true, query, dropDownOptions, Headeritems, renderItem, url, qKey, params, is = 'table', perpage = undefined }: ListProps) => {
  const fetchProjects = async ({ pageParam }: { pageParam: number | string }) => {
    const res = await axios.get(url, { params: { cursor: pageParam, perpage, ...params, ...query } })
    console.log(res.data.data)
    return res.data.data
  }

  const effectiveRenderItem = renderItem ? renderItem
    : (item: any, index: number) => defaultRenderItem(item, index, Headeritems, dropDownOptions)
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: [qKey],
    queryFn: fetchProjects,
    initialPageParam: 1,
    getNextPageParam: (lastPage, _pages, lastPageParam) => { console.log(lastPage); if (lastPage.length > 0) { return lastPageParam + 1 } { return null } },
  })
  console.log(data)

  const isTable = is == 'table'
  return status === 'pending' ? (
    <p>Loading...</p>
  ) : status === 'error' ? (
    <p>Error: {error.message}</p>
  ) : data && (
    <><Compnent className={isTable ? 'w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400' : '' + className} as={is}>
      {
        (Headeritems && is == 'table') &&
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            {
              Headeritems.map(t => {
                return <th className=" p-4">
                  {t.titleLabel}
                </th>
              })
            }
            {
              dropDownOptions && <th></th>
            }
          </tr>
        </thead>
      }
      {data.pages.map((group, i) => (
        <React.Fragment key={i}>
          {group.map((item, index) => (
            effectiveRenderItem(item, index)
          ))}
        </React.Fragment>
      ))}
    </Compnent>
      <div>
        {showLoadMore && <button className=" w-full text-center opacity-40 p-4"
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage || isFetching}
        >
          {isFetchingNextPage
            ? ''
            : hasNextPage
              ? 'Load More'
              : 'Nothing more to load'}
        </button>}
      </div>
      <div className="w-full flex items-center justify-center opacity-75">{(isFetching || isFetchingNextPage) && <LucideLoaderCircle className="animate-spin" size={28} />}</div>
    </>
  )
}


const defaultRenderItem = (
  item: any,
  index: number,
  Headeritems?: { titleLabel: string, valueKey: string }[],
  dropDownOptions?: []
) => (
  <tr key={index} className=" border-b  dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-neutral-950 cursor-context-menu">
    {Headeritems?.map((col, i) => (
      <td key={i} className=" p-4">{item[col.valueKey] ?? ""}</td>
    ))}
    {dropDownOptions &&
      <td className=" w-4"><Dropdown dropClasses=" theme1cont" options={dropDownOptions} /></td>
    }
  </tr>
)