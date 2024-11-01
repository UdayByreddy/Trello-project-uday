/* eslint-disable no-unused-vars */
import React from 'react'
import Error from '../../assets/404Error.webp'

export default function ErrorContent() {
  return (
    <div
    style={{
        backgroundImage: `url(${Error})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
      }}
    
    >

    </div>
  )
}
