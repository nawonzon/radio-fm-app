import { IonIcon, IonLabel } from '@ionic/react'
import { HTMLMotionProps, motion } from 'framer-motion'
import React from 'react'
import styled from 'styled-components'
import radioDefaultImg from './../assets/images/radio-default-image.jpeg'

export const Container = styled.div<{
  display?: 'flex' | 'grid'
}>`
  display: ${(props) => props.display || 'flex'};
`
export const TouchableOpacity = styled(
  ({ onClick, ...props }: HTMLMotionProps<'div'>) => (
    <motion.div
      onClick={(evt) => {
        evt.stopPropagation()
        onClick?.(evt)
      }}
      {...props}
      whileTap={{ scale: 0.95, opacity: 0.2 }}
    />
  )
)({})
export const Text = styled(IonLabel)``
export const StyledIcon = styled(IonIcon)({})

export const Image = styled(({ ...restProps }) => (
  <motion.img
    {...restProps}
    onError={(evt) => ((evt.target as HTMLImageElement).src = radioDefaultImg)}
  />
))({})
