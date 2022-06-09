import { useFocusable } from "@noriginmedia/norigin-spatial-navigation";
import styled from "styled-components";

interface MenuItemBoxProps {
  focused: boolean;
}

const MenuItemBox = styled.div<MenuItemBoxProps>`
  width: 171px;
  height: 51px;
  background-color: #b056ed;
  border-color: white;
  border-style: solid;
  border-width: ${({ focused }) => (focused ? "6px" : 0)};
  box-sizing: border-box;
  border-radius: 7px;
  display: flex;
  align-items:  center;
  justify-content: center;
  margin-bottom: 37px;
`;

interface MenuItemProps {
  label: string;
}

export function MenuItem({ label }: MenuItemProps) {
  const { ref, focused } = useFocusable();

  return <MenuItemBox ref={ref} focused={focused} data-testid="menu-item">{label}</MenuItemBox>;
}
