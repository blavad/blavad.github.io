import { PropsWithChildren } from 'react';
import ReactSelect, { GroupBase, Props } from 'react-select';
import classNames from 'classnames';

import styles from './select.module.css';
import './react-select.css';

/**
 * The props for the select component.
 * @template Option - The type of the options in the select.
 * @template IsMulti - If true, the select will allow multiple selections.
 * @template Group - The type of the groups in the select.
 */
export type SelectProps<Option, IsMulti extends boolean, Group extends GroupBase<Option>> = Props<
    Option,
    IsMulti,
    Group
> & {
    id: string;
    defaultValue?: { [key: string]: string };
    error?: boolean;
    helper?: string;
    containerClassName?: string;
    containerStyle?: React.CSSProperties;
    clearable?: boolean;
    searchable?: boolean;
    disabled?: boolean;
    loading?: boolean;
};

/**
 * A wrapper around react-select to provide a consistent look and feel.
 * @param id - The id of the select element.
 * @param error - If true, the select will be styled as an error.
 * @param helper - A helper message to display below the select.
 * @param containerClassName - Additional classes to apply to the container.
 * @param containerStyle - Additional styles to apply to the container.
 * @param children - The label for the select.
 * @param rest - The props to pass to react-select.
 * @returns The select component.
 * @template Option - The type of the options in the select.
 * @template IsMulti - If true, the select will allow multiple selections.
 * @template Group - The type of the groups in the select.
 * @example
 * ```tsx
 * <Select
 *    id="clientID"
 *   options={clientIDs.map((cl) => ({ value: cl, label: cl }))}
 * ></Select>
 * ```
 * @see https://react-select.com/home
 */
export function Select<Option, IsMulti extends boolean = false, Group extends GroupBase<Option> = GroupBase<Option>>({
    id,
    error,
    helper,
    className,
    containerClassName,
    containerStyle,
    children,
    ...rest
}: PropsWithChildren<SelectProps<Option, IsMulti, Group>>) {
    const containerClasses = classNames(styles.container, containerClassName);
    const labelClasses = classNames(styles.label);
    const helperClasses = classNames(styles.helper, error && styles.helpError);
    const selectClasses = classNames(styles.select, className);

    return (
        <div className={containerClasses} style={containerStyle}>
            {children && (
                <label className={labelClasses} htmlFor={id}>
                    {children}
                </label>
            )}
            <div className={styles.selectContainer}>
                <ReactSelect name={id} className={selectClasses} classNamePrefix="react-select" unstyled {...rest} />
            </div>
            {helper && <p className={helperClasses}>{helper}</p>}
        </div>
    );
}
