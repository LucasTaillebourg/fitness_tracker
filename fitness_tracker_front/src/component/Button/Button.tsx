import React, { ReactNode } from 'react'
import styles from './Button.module.scss'

export interface ButtonProps {
  onClick: () => void
  children: ReactNode
}

export const Button = ({ onClick, children }: ButtonProps) => {
  return (
    <button className={styles.button} onClick={onClick}>
      {children}
    </button>
  )
}
