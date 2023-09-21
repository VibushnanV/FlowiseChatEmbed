import { onCleanup, onMount } from 'solid-js'

type Props = {
  botContainer: HTMLDivElement | undefined
  poweredByTextColor?: string
  badgeBackgroundColor?: string
}

const defaultTextColor = '#303235'

export const Badge = (props: Props) => {
  let liteBadge: HTMLAnchorElement | undefined
  let observer: MutationObserver | undefined
const imageSrc=undefined
  const appendBadgeIfNecessary = (mutations: MutationRecord[]) => {
    mutations.forEach((mutation) => {
      mutation.removedNodes.forEach((removedNode) => {
        if (
          'id' in removedNode &&
          liteBadge &&
          removedNode.id == 'lite-badge'
        ) {
          console.log("Sorry, you can't remove the brand 😅")
          props.botContainer?.append(liteBadge)
        }
      })
    })
  }

  onMount(() => {
    if (!document || !props.botContainer) return
    observer = new MutationObserver(appendBadgeIfNecessary)
    observer.observe(props.botContainer, {
      subtree: false,
      childList: true,
    })
  })

  onCleanup(() => {
    if (observer) observer.disconnect()
  })

  return (
    <span style={{
      "font-size": '13px',
      position: 'absolute',
      bottom: '-14px',
      padding: '10px',
      margin: 'auto',
      display: 'flex',
      "text-align": 'center',
      color: props.poweredByTextColor ?? defaultTextColor,
      "background-color": props.badgeBackgroundColor ?? '#595959'
    }}>Powered by 
    {
    imageSrc? <img
    style={{"object-fit":"contain","height":"auto","width":"70px"}}
    src={imageSrc}
/>: <span  style= {{
      "font-size": '13px',
      position: 'absolute',
      bottom: '-14px',
      "text-align": 'center',
      color: props.poweredByTextColor ?? defaultTextColor,
      "background-color": props.badgeBackgroundColor ?? '#595959'
    }}> Industry.AI </span>
    }
    
          
    </span>
  )
}
