import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, beforeEach } from 'vitest'
import App from './App'

describe('App', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('renders the app title', () => {
    render(<App />)
    expect(screen.getByText("My Today's list")).toBeInTheDocument()
  })

  it('shows empty message when no todos', () => {
    render(<App />)
    expect(screen.getByText('No tasks yet. Add one above!')).toBeInTheDocument()
  })

  it('adds a new todo', async () => {
    const user = userEvent.setup()
    render(<App />)

    const input = screen.getByPlaceholderText('Add a new task...')
    await user.type(input, 'Buy groceries')
    await user.click(screen.getByText('Add'))

    expect(screen.getByText('Buy groceries')).toBeInTheDocument()
    expect(screen.queryByText('No tasks yet. Add one above!')).not.toBeInTheDocument()
  })

  it('does not add empty todo', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.click(screen.getByText('Add'))

    expect(screen.getByText('No tasks yet. Add one above!')).toBeInTheDocument()
  })

  it('toggles todo completion', async () => {
    const user = userEvent.setup()
    render(<App />)

    const input = screen.getByPlaceholderText('Add a new task...')
    await user.type(input, 'Test todo')
    await user.click(screen.getByText('Add'))

    const checkbox = screen.getByRole('checkbox')
    expect(checkbox).not.toBeChecked()

    await user.click(checkbox)
    expect(checkbox).toBeChecked()

    await user.click(checkbox)
    expect(checkbox).not.toBeChecked()
  })

  it('deletes a todo', async () => {
    const user = userEvent.setup()
    render(<App />)

    const input = screen.getByPlaceholderText('Add a new task...')
    await user.type(input, 'Delete me')
    await user.click(screen.getByText('Add'))

    expect(screen.getByText('Delete me')).toBeInTheDocument()

    await user.click(screen.getByText('Delete'))

    expect(screen.queryByText('Delete me')).not.toBeInTheDocument()
    expect(screen.getByText('No tasks yet. Add one above!')).toBeInTheDocument()
  })

  it('toggles theme', async () => {
    const user = userEvent.setup()
    render(<App />)

    const themeButton = screen.getByRole('button', { name: /dark/i })
    expect(themeButton).toBeInTheDocument()

    await user.click(themeButton)

    expect(screen.getByRole('button', { name: /light/i })).toBeInTheDocument()
    expect(localStorage.getItem('todo-app-theme')).toBe('dark')
  })
})
