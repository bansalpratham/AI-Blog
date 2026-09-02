import React, { useEffect, useState } from 'react'
import { comments_data } from '../../assets/assets'
import CommentTableItem from '../../components/admin/CommentTableItem'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'

function Comments() {

  const [comments, setComments] = useState([])
  const [filter, setFilter] = useState('Not Approved')

  const {axios} = useAppContext()

  const fetchComments = async () => {
    try {
        const {data} = await axios.get('/api/admin/comments')
        data.success ? setComments(data.comments) : toast.error(data.message)
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    fetchComments()
  }, [])

  const filteredComments = comments.filter((comment) => {
    if (filter === 'Approved') {
      return comment.isApproved === true
    }

    return comment.isApproved === false
  })

  return (
    <div className="flex-1 pt-5 px-5 sm:pt-12 sm:pl-16 bg-blue-50/50">

      {/* Header */}
      <div className="flex justify-between items-center max-w-3xl">
        <h1 className="text-xl font-semibold text-gray-800">
          Comments
        </h1>

        <div className="flex gap-4">

          {/* Approved Button */}
          <button
            onClick={() => setFilter('Approved')}
            className={`shadow-custom-sm border rounded-full px-4 py-1 cursor-pointer text-xs transition ${
              filter === 'Approved'
                ? 'text-primary'
                : 'text-gray-700'
            }`}
          >
            Approved
          </button>

          {/* Not Approved Button */}
          <button
            onClick={() => setFilter('Not Approved')}
            className={`shadow-custom-sm border rounded-full px-4 py-1 cursor-pointer text-xs transition ${
              filter === 'Not Approved'
                ? 'text-primary'
                : 'text-gray-700'
            }`}
          >
            Not Approved
          </button>

        </div>
      </div>

      {/* Comments Table */}
      <div className="relative h-4/5 max-w-3xl overflow-x-auto mt-4 bg-white shadow rounded-lg scrollbar-hide">

        <table className="w-full text-sm text-gray-500">

          {/* Table Header */}
          <thead className="text-xs text-gray-700 text-left uppercase border-b">
            <tr>
              <th
                scope="col"
                className="px-6 py-3"
              >
                Blog Title & Comment
              </th>

              <th
                scope="col"
                className="px-6 py-3 max-sm:hidden"
              >
                Date
              </th>

              <th
                scope="col"
                className="px-6 py-3 max-sm:hidden"
              >
                Action
              </th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {filteredComments.length > 0 ? (
              filteredComments.map((comment, index) => (
                <CommentTableItem
                  key={comment._id}
                  comment={comment}
                  index={index + 1}
                  fetchComments={fetchComments}
                />
              ))
            ) : (
              <tr>
                <td
                  colSpan="3"
                  className="px-6 py-8 text-center text-gray-500"
                >
                  No {filter.toLowerCase()} comments found.
                </td>
              </tr>
            )}
          </tbody>

        </table>

      </div>

    </div>
  )
}

export default Comments