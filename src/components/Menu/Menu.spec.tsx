import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect';
import { Menu } from './Menu'
import menuItems from './__mocks__/menuItems'

describe('Menu', () => {
  it('should render Menu correctly', () => {
    render(<Menu focusKey='MENU' items={menuItems} />)

    const items = screen.getAllByTestId('menu-item')
    
    expect(items).toHaveLength(10)
  })
  
  it('should be focused', async() => {
    const { container } = render( <Menu focusKey='MENU' items={menuItems} />)
         
    const items = screen.getAllByTestId('menu-item')

    expect(items[0]).toHaveStyle('border-width: 6px')

    fireEvent.keyDown(container, { key: 'ArrowDown', code: 40, keyCode: 40 })

    await waitFor(() => {
      expect(items[1]).toHaveStyle('border-width: 0px')
    })
    items.forEach(item => {
      console.log(item.style.borderWidth)
    })
  })
})