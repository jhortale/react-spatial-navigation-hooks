import * as React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event'
import {FocusContext, useFocusable, init} from '@noriginmedia/norigin-spatial-navigation'
import { MenuItem } from './MenuItem'

init({
  debug: false,
  visualDebug: false,
})

function Wrapper({ children }: { children: React.ReactNode }) {
  const { focusKey, focusSelf } = useFocusable();
  React.useEffect(() => {
    focusSelf();
  }, [focusSelf])
  return (
    <FocusContext.Provider value={focusKey}>
      {children}
    </FocusContext.Provider>
  )
}

describe('Asset', () => {
  it('should render Asset correctly', () => {
    render((
      <MenuItem label='Item 1' />
    ))
         
    const label = screen.getByText('Item 1')
    
    expect(label).toBeInTheDocument()
  })
  
  it('should be focused', () => {
    render((
      <MenuItem label='Item 1' />
    ), {wrapper: Wrapper})
         
    const label = screen.getByText('Item 1')

    expect(label).toHaveStyle('border-width: 6px')
  })
  
})