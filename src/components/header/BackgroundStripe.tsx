import React from "react"
export const BackgroundStripe = (props: any) => {
    return (
        <div 
            style={{
                position: 'absolute', 
                background: props.background, 
                left: props.left, 
                height: '100%', 
                width: `${props.width}px`
            }}></div>
    )
}