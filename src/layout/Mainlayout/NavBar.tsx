import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

import DropDown from "./DropDown";
import logo from ".././../assets/logo.png";
import { Link } from "react-router-dom";
import DropDownMobile from "./DropDownMobile";
import ModalBox from "@/components/cartModal/ModalBox";
import AuthLogin from "./AuthLogin";
import { Button } from "@/components/ui/button";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

interface NavItemWithPath {
  name: string;
  path: string;
}

interface NavItemWithChild {
  name: string;
  child: {
    name: string;
    path: string;
  }[];
}

export type NavItem = NavItemWithPath | NavItemWithChild;

const NavBar = () => {
  const navUrl: NavItem[] = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "Products",
      path: "/products",
    },
    {
      name: "Dashboard",
      child: [
        { name: "Product Management", path: "/item-management" },
        { name: "All Orders", path: "/allOrder" },
      ],
    },
  ];

  const user = true;
  return (
    <div className="flex bg-green-50 items-center gap-8 w-full relative">
      <div className="text-black w-32  ">
        <Link to={"/"}>
          <img src={logo} alt="" className="w-full h-full" />
        </Link>
      </div>
      <div className="sm:hidden ms-auto">
        <DropDownMobile navUrl={navUrl} user={user}></DropDownMobile>
      </div>
      <ModalBox></ModalBox>
      <div className="w-full hidden sm:inline">
        <div className="  flex items-center justify-between  w-full ">
          <NavigationMenu className="">
            <NavigationMenuList className=" flex gap-2">
              {navUrl.map((item) => {
                if ("path" in item) {
                  return (
                    <NavigationMenuItem key={item.name}>
                      <Link
                        className="font-semibold  hover:text-green-600"
                        to={item.path as string}
                      >
                        {item.name}
                      </Link>
                    </NavigationMenuItem>
                  );
                } else {
                  return (
                    <NavigationMenuItem key={item.name}>
                      <DropDown item={item} />
                    </NavigationMenuItem>
                  );
                }
              })}
            </NavigationMenuList>
          </NavigationMenu>
          <div className=" flex items-center justify-center ">
            {" "}
            <AuthLogin user={user}></AuthLogin>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;

export const AuthLink = ({ classText }: { classText: string }) => {
  return (
    <>
      <Link
        className={`${classText}  font-semibold  hover:text-green-600`}
        to={""}
      >
        <DropdownMenuItem className={classText}>{"Profile"}</DropdownMenuItem>
      </Link>
      <Link
        className={`${classText}  font-semibold  hover:text-green-600`}
        to={""}
      >
        <DropdownMenuItem className={classText}>{"Logout"}</DropdownMenuItem>
      </Link>
    </>
  );
};

export const LoginButton = () => {
  return <Button className="bg-green-600">Login</Button>;
};
