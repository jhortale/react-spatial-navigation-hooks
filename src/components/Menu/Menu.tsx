import * as React from "react";
import {
  useFocusable,
  init,
  FocusContext
} from "@noriginmedia/norigin-spatial-navigation";
import styled from "styled-components";
import { MenuItem } from "./MenuItem";

init({
  debug: false,
  visualDebug: false
});

interface MenuWrapperProps {
  hasFocusedChild: boolean;
}

const MenuWrapper = styled.div<MenuWrapperProps>`
  flex: 1;
  max-width: 246px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${({ hasFocusedChild }) =>
    hasFocusedChild ? "#4e4181" : "#362C56"};
  padding-top: 37px;
`;

interface MenuProps {
  focusKey: string;
  items: string[];
}

export function Menu({ focusKey: focusKeyParam, items }: MenuProps) {
  const {
    ref,
    focusSelf,
    hasFocusedChild,
    focusKey
    //setFocus -- to set focus manually to some focusKey
    // navigateByDirection, -- to manually navigate by direction
    // pause, -- to pause all navigation events
    // resume, -- to resume all navigation events
    // updateAllLayouts -- to force update all layouts when needed
  } = useFocusable({
    focusable: true,
    saveLastFocusedChild: false,
    trackChildren: true,
    autoRestoreFocus: true,
    isFocusBoundary: false,
    focusKey: focusKeyParam,
    preferredChildFocusKey: undefined,
    onEnterPress: () => {},
    onEnterRelease: () => {},
    onArrowPress: () => true,
    onFocus: () => {},
    onBlur: () => {},
    extraProps: { foo: "bar" }
  });

  React.useEffect(() => {
    focusSelf();
  }, [focusSelf]);

  return (
    <FocusContext.Provider value={focusKey}>
      <MenuWrapper ref={ref} hasFocusedChild={hasFocusedChild}>
        <h1>Logo</h1>
        {items.map((item) => (
          <MenuItem key={item} label={item} />
        ))}
      </MenuWrapper>
    </FocusContext.Provider>
  );
}
