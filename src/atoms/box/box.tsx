import classNames from 'classnames';
import * as React from 'react';

export interface BoxProps {
    /**
     * padding content
     */
    padding?: 1 | 2 | 3 | 4 | 5 | 6 | 7;
    children?: React.ReactNode;
}

const boxTheme = {
    base: 'container mx-auto',
};
export const Box = ({ children, padding }: BoxProps) => {
    const paddingCls = padding ? `px-${padding}` : "";
    const cls = classNames(boxTheme.base, paddingCls);
    return (
        <div className={cls}>{children}</div>
    );
};

export default Box;