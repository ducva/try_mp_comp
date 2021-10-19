import * as React from 'react';
import classNames from "classnames";

export enum AvatarShape {
    "rounded" = "rounded",
    "circular" = "circular"
}
export enum AvatarSize {
    "small" = "small",
    "regular" = "regular",
    "large" = "large"
}
export type AvatarProps = {
    /**
     * Image source
     */
    src?: string;
    /**
     * Size
     */
    size?: AvatarSize,
    /**
     * Shape
     */
    shape?: AvatarShape;
    /**
     * alt text
     */
    alt?: string;

    hasNotification?: boolean;
    notificationPosition?: "top" | 'bottom';
} & React.HTMLAttributes<HTMLDivElement>

const theme = {
    avatar: {
        base: 'inline-block relative overflow-hidden',
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
            base: "bg-gray-100"
        },
        notification: {
            base: 'absolute block rounded-full ring-2 ring-white bg-green-400 h-2.5 w-2.5',
            position: {
                top: 'top-0 right-0 ',
                bottom: 'bottom-0 right-0'
            }
        }
    }
}
export const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(function Avatar(props, ref) {
    const {size = AvatarSize.regular, shape = AvatarShape.rounded, src, alt, className, hasNotification=false, notificationPosition="top", ...other} = props
    const {avatar} = theme;
    const baseStyle = avatar.base
    const sizeStyles = {
        [AvatarSize.large]: avatar.size.large,
        [AvatarSize.regular]: avatar.size.regular,
        [AvatarSize.small]: avatar.size.small,
    }

    const shapeStyles = {
        [AvatarShape.rounded]: avatar.shape.rounded,
        [AvatarShape.circular]: avatar.shape.circular
    }

    const notificationPositionStyles = {
        top: avatar.notification.position.top,
        bottom: avatar.notification.position.bottom
    }

    const cls = classNames(baseStyle, sizeStyles[size], shapeStyles[shape], className, !src && avatar.placeholder.base)
    const imageCls = classNames("object-cover", shapeStyles[shape])
    const notificationCls = classNames(avatar.notification.base, notificationPositionStyles[notificationPosition] )
    return (
        <span className={cls} ref={ref} {...other}>
            {src && (
                <img className={imageCls} src={src} alt={alt} loading="lazy"/>
            )}
            {!src && (
                <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
            )}
            {hasNotification && (
                <span className={notificationCls} />
            )}
        </span>
    )
})
export default Avatar;