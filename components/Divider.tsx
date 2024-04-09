import React from 'react'

interface DividerProps {
  className?: string
}

const Divider: React.FC<DividerProps> = ({ className }) => {
  return <div className={['h-[1px] w-full border', className].join(' ')}></div>
}

export default Divider
