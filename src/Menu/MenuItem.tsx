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
  margin-bottom: 37px;
`;

export function MenuItem({ focusKey: focusKeyParam }: { focusKey: string }) {
  const { ref, focused } = useFocusable({
    focusKey: focusKeyParam
  });

  return <MenuItemBox ref={ref} focused={focused} />;
}
