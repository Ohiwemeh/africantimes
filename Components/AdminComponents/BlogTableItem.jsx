import { assets } from '@/Assets/assets'
import Image from 'next/image'
import React from 'react'

const BlogTableItem = ({ authorImg, title, author, date, id, onDelete }) => {
  return (
    <tr className='bg-white border-b'>
      <th scope='row' className='items-center gap-3 hidden sm:flex px-6 py-4 font-medium text-gray-900 whitespace-nowrap'>
        <Image 
          src={authorImg ? authorImg : assets.profile_icon}
          alt="Author"
          width={40}
          height={40}
          className="rounded-full"
        />
        <p>{author?author:"No Author"}</p>
      </th>
      <td className='px-6 py-4'>
        {title ? title : "No title"}
      </td>
      <td className='px-6 py-4'>
        {date ? date : "14 June 2025"}
      </td>
      <td className='px-6 py-4'>
        <button 
          onClick={() => onDelete && onDelete(id)}
          className="text-red-500 hover:text-red-700 font-bold cursor-pointer"
          aria-label="Delete blog post"
        >
          ×
        </button>
      </td>
    </tr>
  )
}

export default BlogTableItem