import classNames from 'classnames';
import * as React from 'react';
import { ReactNode } from 'react';

type IconType =
    | string
    | React.FunctionComponent<{ className: string; 'aria-hidden': boolean; }>
    | React.ComponentClass<{ className: string; 'aria-hidden': boolean; }>;

export interface Props {
    children?: React.ReactNode;
    /**
     * Defines if the button is disabled
     */
    disabled?: boolean;
    /**
     * The size of the button
     */
    size?: 'larger' | 'large' | 'regular' | 'small';
    /**
     * Shows only one icon inside the button; defaults to left
     */
    icon?: IconType;
    /**
     * Shows an icon inside the button, left aligned
     */
    iconLeft?: IconType;
    /**
     * Shows an icon inside the button, right aligned
     */
    iconRight?: IconType;
    /**
     * The style of the button
     */
    variant?: 'outline' | 'link' | 'primary';
    /**
     * Shows the button as a block (full width)
     */
    block?: boolean;
}

export interface ButtonAsButtonProps extends Props, React.ButtonHTMLAttributes<HTMLButtonElement> {
    /**
     * The element that should be rendered as a button
     */
    tag?: 'button';
    /**
     * The native HTML button type
     */
    type?: 'button' | 'submit' | 'reset';
}

export interface ButtonAsAnchorProps extends Props, React.AnchorHTMLAttributes<HTMLAnchorElement> {
    tag: 'a';
}

export interface ButtonAsOtherProps extends Props, React.AnchorHTMLAttributes<HTMLAnchorElement> {
    tag: string;
}

export type ButtonProps = ButtonAsButtonProps | ButtonAsAnchorProps | ButtonAsOtherProps;

type Ref = ReactNode | HTMLElement | string;

const theme = {
    button: {
        base: 'inline-flex items-center border border-transparent',
        block: '',
        disabled: '',
        variant: {
            primary: {
                base: 'rounded shadow-sm text-white bg-indigo-600',
                active: 'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500',
                hover: 'hover:bg-indigo-700',
                disabled: ''
            },
            outline: {
                base: '',
                active: '',
                hover: '',
                disabled: ''
            },
            link: {
                base: '',
                active: '',
                hover: '',
                disabled: ''
            }
        },
        size: {
            larger: '',
            large: '',
            regular: 'px-3 py-2',
            small: 'px-2.5 py-1.5 text-xs font-medium'
        },
        iconSize: {
            larger: '',
            large: '',
            regular: '',
            small: ''
        }
    }
};
export const Button = React.forwardRef<Ref, ButtonProps>(function Button(props, ref) {
    const {
        tag = 'button',
        // Fix https://github.com/estevanmaito/windmill-react-ui/issues/7
        type = tag === 'button' ? 'button' : undefined,
        disabled = false,
        size = 'regular',
        variant = 'primary',
        block = false,
        icon,
        iconLeft,
        iconRight,
        className,
        children,
        ...other
    } = props;
    const { button } = theme;

    function hasIcon() {
        return !!icon || !!iconLeft || !!iconRight;
    }

    const IconLeft = iconLeft || icon;
    const IconRight = iconRight;

    const baseStyle = button.base;
    const blockStyle = button.block;
    const sizeStyles = {
        larger: button.size.larger,
        large: button.size.large,
        regular: button.size.regular,
        small: button.size.small,
    };
    const iconSizeStyles = {
        larger: button.iconSize.larger,
        large: button.iconSize.large,
        regular: button.iconSize.regular,
        small: button.iconSize.small,
        pagination: button.iconSize.regular,
    };
    const iconStyle = button.iconSize[size];
    const variantStyles = {
        primary: button.variant.primary.base,
        outline: button.variant.outline.base,
        link: button.variant.link.base,
    };
    const activeStyles = {
        primary: button.variant.primary.active,
        outline: button.variant.outline.active,
        link: button.variant.link.active,
    };
    const disabledStyles = {
        primary: button.variant.primary.disabled,
        outline: button.variant.outline.disabled,
        link: button.variant.link.disabled,
    };

    const buttonStyles = classNames(
        baseStyle,
        // has icon but no children
        hasIcon() && !children && iconSizeStyles[size],
        // has icon and children
        hasIcon() && children && sizeStyles[size],
        // does not have icon
        !hasIcon() && sizeStyles[size],
        variantStyles[variant],
        disabled ? disabledStyles[variant] : activeStyles[variant],
        block ? blockStyle : null,
        className
    );

    const iconLeftStyles = classNames(iconStyle);
    const iconRightStyles = classNames(iconStyle);

    return React.createElement(
        tag,
        {
            className: buttonStyles,
            ref,
            disabled,
            type,
            ...other,
        },
        IconLeft
            ? React.createElement(IconLeft, { className: iconLeftStyles, 'aria-hidden': true })
            : null,
        children,
        IconRight
            ? React.createElement(IconRight, { className: iconRightStyles, 'aria-hidden': true })
            : null
    );
});

export default Button;