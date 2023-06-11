import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  DashboardIcon,
  LaptopIcon,
  SettingsIcon,
  UserIcon,
} from "../../../Assets/Images/Icons/SvgIcons";
import "./Sidebar.scss";

const Sidebar = ({ handleSidebar }: { handleSidebar?: () => void }) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const NavLinks = [
    {
      icon: <DashboardIcon />,
      label: "Dashboard",
      to: "/auth/dashboard",
    },
    {
      icon: <LaptopIcon />,
      label: "Questions",
      to: "/auth/interview-questions",
      hasDropdown: true, // Add this property to the item with dropdown
      dropdownLinks: [
        // Add dropdownLinks property with an array of dropdown items
        {
          label: "Option 1",
          to: "/auth/interview-questions/quest-1",
        },
        {
          label: "TODO AP",
          to: "/auth/interview-questions/quest-2",
        },
      ],
    },
    {
      icon: <LaptopIcon />,
      label: "BuyToken",
      to: "/auth/buy-token",
    },
    {
      icon: <LaptopIcon />,
      label: "Design UI",
      to: "/auth/design-ui",
    },
    {
      icon: <UserIcon />,
      label: "Login",
      to: "/auth/login",
    },
    {
      icon: <SettingsIcon />,
      label: "Settings",
      to: "/auth/settings",
    },
  ];

  return (
    <aside className='sidebar'>
      <ul className='sidebar_inner'>
        {NavLinks.map((item) => (
          <li key={item.label}>
            {!item.hasDropdown && ( // Render regular NavLink for items without dropdown
              <NavLink
                to={item.to}
                className='nav_link'
                onClick={handleSidebar}
              >
                <span className='nav_link_icon'>{item.icon}</span>
                {item.label}
              </NavLink>
            )}
            {item.hasDropdown && ( // Render dropdown menu for items with dropdown
              <>
                <div
                  className='nav_link nav_link_with_dropdown'
                  onClick={toggleDropdown}
                >
                  <span className='nav_link_icon'>{item.icon}</span>
                  {item.label}
                </div>
                {isDropdownOpen && ( // Conditionally render dropdown links based on isDropdownOpen state
                  <ul className='dropdown_menu'>
                    {item.dropdownLinks.map((link) => (
                      <li key={link.label}>
                        <NavLink
                          to={link.to}
                          className='dropdown_link'
                          onClick={handleSidebar}
                        >
                          {link.label}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                )}
              </>
            )}
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
