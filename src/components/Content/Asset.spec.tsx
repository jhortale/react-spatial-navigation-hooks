import * as React from 'react'
import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event'
import {FocusContext, useFocusable, init} from '@noriginmedia/norigin-spatial-navigation'
import { Asset } from './Asset'

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
    const onEnterPress = jest.fn()
    const onFocus = jest.fn()
    render((
      <Asset
        title="Asset 1" 
        color='blue' 
        onEnterPress={onEnterPress} 
        onFocus={onFocus} 
      />
    ))
         
    const title = screen.getByText('Asset 1')
    const assetBox = screen.getByTestId('asset-box')
    expect(title).toBeInTheDocument()
    expect(assetBox).toHaveStyle('background-color: blue')
  })

  it('should Asset be focusable', async () => {
    const onEnterPress = jest.fn()
    const onFocus = jest.fn()
    
    render((
      <Asset
        title="Asset 1" 
        color='blue' 
        onEnterPress={onEnterPress} 
        onFocus={onFocus} 
      />
    ), {
      wrapper: Wrapper
    })
         
    const assetBox = screen.getByTestId('asset-box')

    expect(onFocus).toHaveBeenCalledTimes(1)
    expect(assetBox).toHaveStyle('border-width: 6px')

    fireEvent.keyDown(document, { key: 'Enter', code: 13, keyCode: 13 })
    await waitFor(() => {
      expect(onEnterPress).toHaveBeenCalledTimes(1)
    })
  })
})