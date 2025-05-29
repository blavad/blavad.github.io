import IconMap from '~/config/icons';

export type BlavadIconProps = {
    name: string;
    [key: string]: any;
};

function BlavadIcon({ name, ...props }: BlavadIconProps) {
    const IconComponent = IconMap[name];

    return <IconComponent {...props} />;
}

export default BlavadIcon;
