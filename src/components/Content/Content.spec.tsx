import * as React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event'
import { FocusContext, useFocusable, init } from '@noriginmedia/norigin-spatial-navigation'
import { Content } from './Content'
import { rows } from './__mocks__/rows';

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

describe('Content', () => {
  it('should render Content correctly', () => {
    render(<Content focusKey='CONTENT' rows={rows}/>)
    const heading = screen.getByText('Norigin Spatial Navigation')
    const selectedTitle = screen.getByText('Press "Enter" to select an asset')

    expect(heading).toBeInTheDocument()
    expect(selectedTitle).toBeInTheDocument()
  })

  it('should select an Asset', async() => {
    const { container } = render(<Content focusKey='CONTENT' rows={rows} />, { wrapper: Wrapper })
  
    fireEvent.keyDown(container, { key: 'Enter', code: 13, keyCode: 13 })

    await waitFor(() => {
      expect(screen.getByTestId('selected-title').textContent).toBe('Asset 1')
      expect(screen.getByTestId('selected-box')).toHaveStyle('background-color: #714ADD')
    })
  })
})