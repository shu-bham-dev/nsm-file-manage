import { FC, Fragment, ReactNode } from "react";
import { Menu } from "@headlessui/react";
import PopupMenuItem from "./popupMenuItem";

export interface IMenuItem {
  id?: string | number; 
  hidden?: boolean;
  disabled?: boolean;
  as?: any;
  dataTestId?: string;
  icon?: any;
  label?: React.ReactNode;
  labelClassName?: string;
  iconClassName?: string;
  iconWrapperClassName?: string;
  stroke?: string;
  fill?: string;
  onClick?: () => any;
  permissions?: string[];
  className?: string;
}


export interface IPopupMenuProps {
  triggerNode: ReactNode;
  menuItems: IMenuItem[];
  className?: string;
  title?: ReactNode;
  footer?: ReactNode;
  disabled?: boolean;
  controlled?: boolean;
  isOpen?: boolean;
}

const PopupMenu: FC<IPopupMenuProps> = ({
  triggerNode,
  menuItems,
  className,
  title,
  footer,
  disabled = false,
  controlled,
  isOpen,
}) => {
  return (
    <Menu as="div" className="relative inline-block">
      <Menu.Button disabled={disabled} className="menu-trigger">
        {triggerNode}
      </Menu.Button>
      {(controlled ? isOpen : true) && (
        <Menu.Items
          static={controlled}
          className={`bg-white rounded shadow-lg z-[99999] overflow-hidden focus-visible:outline-none ${className}`}
        >
          {title && title}
          {menuItems.map((menuItem: IMenuItem, idx: number) => (
            <Fragment key={`menu-item-${idx}-fragment`}>
              {!menuItem.disabled && (
                <Menu.Item
                  key={`menu-item-${idx}`}
                  as="button"
                  onClick={menuItem?.onClick}
                  className="w-full"
                >
                  {({ active }) => (
                    <PopupMenuItem
                      menuItem={menuItem}
                      border={idx !== menuItems?.length - 1}
                      isActive={active}
                    />
                  )}
                </Menu.Item>
              )}
            </Fragment>
          ))}
          {footer && footer}
        </Menu.Items>
      )}
    </Menu>
  );
};

export default PopupMenu;
