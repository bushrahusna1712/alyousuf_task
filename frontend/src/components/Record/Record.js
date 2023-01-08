import React from 'react'
import Button from '../Button/Button'

import './style.css'

function Record({ record, onClick = () => { } }) {
  return (
    <div className='common_record'>
      <div>
        <h3><span className='record_title'>Title:&nbsp;</span>{record?.title}</h3>
        <h4><span className='record_title'>Division:&nbsp;</span>{record?.division}</h4>
        <h5><span className='record_title'>Date:&nbsp;</span>{record?.date?.slice(0, 10)}</h5>
        <h3><span className='record_title'>Notes:&nbsp;</span>{record?.notes}</h3>
      </div>
      <div className='record_delete'>
        <Button label='Delete' ternary flex={0} onClick={() => onClick(record._id)} />
        {record?.bunting && <div className='bunting'><h6>Bunting</h6></div>}
        {!record?.bunting && <div className='no_bunting'><h6>No Bunting</h6></div>}
      </div>
    </div>
  )
}

export default Record