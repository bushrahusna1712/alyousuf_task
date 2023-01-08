import React from 'react'

import './style.css'

function Checkbox({
  value = false,
  onClick = () => { },
  label = 'Is Bunting',
}) {
  return (
    <div className='common_checkbox'>
      <input type='checkbox' checked={value} onClick={e => onClick(e.target.checked)} />
      <label>{label}</label>
    </div>
  )
}

export default Checkbox