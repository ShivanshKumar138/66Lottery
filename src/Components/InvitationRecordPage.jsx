import React from 'react'
import Mobile from './Mobile'
const InvitationRecordPage = () => {
  return (
    <Mobile>
           <div className="bg-white p-4 flex items-center">
        <div className="text-gray-700 cursor-pointer" onClick={()=>{navigate(-1)}}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </div>
        <div className="flex-1 text-center text-lg font-medium text-gray-800">
          Invitation reward rules
        </div>
      </div>
        <div>
            <span>No record now..</span>
        </div>
    </Mobile>
  )
}

export default InvitationRecordPage