import { NavLink, NavLinkProps } from "react-router-dom";

interface SideBarProps extends NavLinkProps {
    title: string;
    badgeCount?: number;
    icon?: JSX.Element;
}

const SideBarItem = (props: SideBarProps) => {
    const { icon, title, badgeCount, ...otherProps } = props;

    return (
        <li>
            <NavLink
                style={({ isActive }) => {
                    return {
                        fontWeight: isActive ? "bold" : "normal",
                    };
                }}
                {...otherProps}
                className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
            >
                <span className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white">
                    {icon}
                </span>
                <span className="ml-3 whitespace-nowrap flex-1">{title}</span>
                {badgeCount && (
                    <span className="inline-flex items-center justify-center w-3 h-3 p-3 ml-3 text-sm font-medium text-blue-600 bg-blue-200 rounded-full dark:bg-blue-900 dark:text-blue-200">
                        {badgeCount}
                    </span>
                )}
            </NavLink>
        </li>
    );
};

export default SideBarItem;
