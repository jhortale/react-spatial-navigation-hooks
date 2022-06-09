import * as React from 'react'
import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect';
import { FocusContext, useFocusable, init } from '@noriginmedia/norigin-spatial-navigation'
import { ContentRow } from './ContentRow'
import { assets } from './__mocks__/rows';

init({
  debug: false,
  visualDebug: false,
})

function Wrapper({ children }: { children: React.ReactNode }) {
  const { focusKey, focusSelf } = useFocusable();

  React.useEffect(() => {
    focusSelf()
  }, [])

  return (
    <FocusContext.Provider value={focusKey}>
      {children}
    </FocusContext.Provider>
  )
}
describe('ContentRow', () => {
  it('should render ContentRow correctly', () => {
    const onAssetPress = jest.fn()
    const onFocus = jest.fn()
    render((
      <ContentRow
        assets={assets}
        title="ContentRow 1"
        onAssetPress={onAssetPress}
        onFocus={onFocus}
      />
    ))

    const title = screen.getByText('ContentRow 1')
    expect(title).toBeInTheDocument()
  })

  it('should ContentRow be focusable', async() => {
    const onAssetPress = jest.fn()
    const onRowFocus = jest.fn()

    const {container} = render((
      <ContentRow
        assets={assets}
        title="ContentRow 1"
        onAssetPress={onAssetPress}
        onFocus={onRowFocus}
      />
    ), {wrapper: Wrapper})

    fireEvent.keyDown(container, { key: 'Enter', code: 13, keyCode: 13 })

    await waitFor(() => {
      expect(onAssetPress).toHaveBeenCalledTimes(1)
    })
    
    fireEvent.keyDown(container, { key: 'ArrowDown', code: 40, keyCode: 40 })

    await waitFor(() => {
      expect(onRowFocus).toHaveBeenCalledTimes(1)
    })
  })
})