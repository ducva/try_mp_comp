import * as React from 'react';
import classNames from "classnames";

export enum AvatarShape {
    "rounded" = "rounded",
    "circular" = "circular"
}
export type AvatarProps = {
    /**
     * Image source
     */
    src?: string;
    /**
     * Size
     */
    size?: "small" | "regular" | "large";
    /**
     * Shape
     */
    shape?: AvatarShape;
    /**
     * alt text
     */
    alt?: string;
} & React.HTMLAttributes<HTMLDivElement>

const theme = {
    avatar: {
        base: 'inline-block relative',
        size: {
            small:  'h-6 w-6',
            regular: 'h-8 w-8',
            large: 'h-10 w-10',
        },
        shape: {
            rounded: 'rounded-md',
            circular: 'rounded-full'
        },
        placeholder: {
            base: "bg-gray-100 overflow-hidden"
        }
    }
}
export const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(function Avatar(props, ref) {
    const {size = 'regular', shape = AvatarShape.rounded, src, alt, className, ...other} = props
    const {avatar} = theme;
    const baseStyle = avatar.base
    const sizeStyles = {
        large: avatar.size.large,
        regular: avatar.size.regular,
        small: avatar.size.small,
    }

    const shapeStyles = {
        [AvatarShape.rounded]: avatar.shape.rounded,
        [AvatarShape.circular]: avatar.shape.circular
    }

    const cls = classNames(baseStyle, sizeStyles[size], className)
    const imageCls = classNames("object-cover", shapeStyles[shape])
    const placeholderCls = classNames(baseStyle, avatar.placeholder.base, sizeStyles[size], shapeStyles[shape])

    return (
        <>
        {src && (
            <div className={cls} ref={ref} {...other}>
                {src && (
                    <img className={imageCls} src={src} alt={alt} loading="lazy"/>
                )}
            </div>
        )}
        {!src && (
            <span className={placeholderCls}>
                <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
            </span>
        )}
        </>
    )
})
export default Avatar;