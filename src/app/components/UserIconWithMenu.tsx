import React from "react";
import { IconButton, Menu, MenuItem } from "@mui/material";

const UserIconWithMenu: React.FC = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (action: string) => {
    console.log(`${action} clicked`);
    handleClose();
  };

  // Import the PNG image
  const defaultUserIcon = "./default-user-icon.png"; // No need to change this line

  return (
    <div>
      <IconButton
        onClick={handleClick}
        size="large"
        aria-label="user account"
        color="inherit"
      >
        <img
          src={defaultUserIcon}
          style={{ width: 40, height: 40 }} // Adjust size as needed
        />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
          },
        }}
      >
        <MenuItem onClick={() => handleMenuItemClick("Account Settings")}>
          Account Settings
        </MenuItem>
        <MenuItem onClick={() => handleMenuItemClick("Logout")}>
          Logout
        </MenuItem>
      </Menu>
    </div>
  );
};

export default UserIconWithMenu;
