import React from 'react'

export interface ActiveComponentProps {
    data: any
}

const ActiveComponent = (props: ActiveComponentProps) => {

  return (
    <div>{props.data.name}</div>
  )
}

export default ActiveComponent