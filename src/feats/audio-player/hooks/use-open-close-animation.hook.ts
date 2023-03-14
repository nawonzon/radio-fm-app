import { animate, useMotionValue } from "framer-motion"

function useOpenCloseAnimation() {
  const animatedValue = useMotionValue(0)

  const startAnimation = (action: 'open' | 'close') => {
    animate(animatedValue, action === 'open' ? 100 : 0, {
      type: 'tween',
      duration: 0.6
    })
  }

  return {
    animatedValue,
    startAnimation
  }
}

export default useOpenCloseAnimation