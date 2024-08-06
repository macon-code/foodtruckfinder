import { Mail, Notifications } from "@mui/icons-material";
import {
  AppBar,
  Avatar,
  Badge,
  Box,
  Grid,
  InputBase,
  Menu,
  MenuItem,
  styled,
  Toolbar,
  Typography,
} from "@mui/material";
import TuneIcon from "@mui/icons-material/Tune";
import React, { useState } from "react";
import type User from "./User";
import Link from "next/link";
import FormDialog from "./FilterModal";

const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
  backgroundColor: "#4F7942",
});

const Search = styled("div")(({ theme }) => ({
  backgroundColor: "white",
  padding: "0 10px",
  borderRadius: theme.shape.borderRadius,
  width: "40%",
}));

const Icons = styled(Box)(({ theme }) => ({
  display: "none",
  alignItems: "center",
  gap: "20px",
  [theme.breakpoints.up("sm")]: {
    display: "flex",
  },
}));

const UserBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "10px",
  [theme.breakpoints.up("sm")]: {
    display: "none",
  },
}));

interface Props {
  user: User;
}

const Navbar = ({ user }: Props) => {
  const [openAccountMenu, setOpenAccountMenu] = useState(false);
  const [openFilterModal, setOpenFilterModal] = useState(false);
  return (
    <AppBar position="sticky">
      <StyledToolbar>
        <Avatar src={"logo.png"} sx={{ width: 50, height: 50 }} alt="logo" />
        <Typography
          ml={4}
          mr={4}
          align="left"
          variant="h6"
          sx={{ display: { xs: "none", sm: "block" } }}
        >
          Who Wants this Dog?
        </Typography>
        <Search sx={{ flexGrow: 1 }}>
          <InputBase placeholder="Search..." />
        </Search>
        <Icons ml={2}>
          <TuneIcon onClick={() => setOpenFilterModal(true)}></TuneIcon>
        </Icons>
        <Icons ml={4}>
          <Badge badgeContent={4} color="error">
            <Mail />
          </Badge>
          <Badge badgeContent={2} color="error">
            <Notifications />
          </Badge>
          <Avatar
            sx={{ width: 30, height: 30 }}
            src={user.image}
            onClick={() => setOpenAccountMenu(true)}
          />
        </Icons>
        <UserBox onClick={() => setOpenAccountMenu(true)}>
          <Typography component="span">{user.username}</Typography>
        </UserBox>
      </StyledToolbar>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        open={openAccountMenu}
        onClose={() => setOpenAccountMenu(false)}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Link href={"/profile"} passHref legacyBehavior>
          <MenuItem>Profile</MenuItem>
        </Link>
        <Link href={"/settings"} passHref legacyBehavior>
          <MenuItem>My account</MenuItem>
        </Link>
        <MenuItem>Logout</MenuItem>
      </Menu>
      <FormDialog
        showModal={openFilterModal}
        closeModal={setOpenFilterModal}
      ></FormDialog>
    </AppBar>
  );
};

export default Navbar;
