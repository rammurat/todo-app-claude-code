// Testing library imports for React component testing
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, beforeEach } from 'vitest'
// Component under test
import App from './App'

/**
 * Test suite for the main App component
 * Tests todo functionality, theme switching, and user interactions
 */
describe('App', () => {
  // Clear localStorage before each test to ensure clean state
  beforeEach(() => {
    localStorage.clear()
  })

  // Test: Verify that the main application title renders correctly
  it('renders the app title', () => {
    render(<App />)
    expect(screen.getByText('My List')).toBeInTheDocument()
  })

  // Test: Verify empty state message displays when no todos exist
  it('shows empty message when no todos', () => {
    render(<App />)
    expect(screen.getByText('No tasks yet. Add one above!')).toBeInTheDocument()
  })

  // Test: Verify that new todos can be added successfully
  it('adds a new todo', async () => {
    const user = userEvent.setup()
    render(<App />)

    // Find input field and add a new todo
    const input = screen.getByPlaceholderText('Add a new task...')
    await user.type(input, 'Buy groceries')
    await user.click(screen.getByText('Add'))

    // Verify todo was added and empty message is gone
    expect(screen.getByText('Buy groceries')).toBeInTheDocument()
    expect(screen.queryByText('No tasks yet. Add one above!')).not.toBeInTheDocument()
  })

  // Test: Verify that empty todos are not added to the list
  it('does not add empty todo', async () => {
    const user = userEvent.setup()
    render(<App />)

    // Try to add empty todo by clicking Add without typing
    await user.click(screen.getByText('Add'))

    // Verify empty message still shows (no todo was added)
    expect(screen.getByText('No tasks yet. Add one above!')).toBeInTheDocument()
  })

  // Test: Verify that todo completion status can be toggled
  it('toggles todo completion', async () => {
    const user = userEvent.setup()
    render(<App />)

    // Add a test todo first
    const input = screen.getByPlaceholderText('Add a new task...')
    await user.type(input, 'Test todo')
    await user.click(screen.getByText('Add'))

    // Get the checkbox and verify initial unchecked state
    const checkbox = screen.getByRole('checkbox')
    expect(checkbox).not.toBeChecked()

    // Click to mark as complete
    await user.click(checkbox)
    expect(checkbox).toBeChecked()

    // Click again to mark as incomplete
    await user.click(checkbox)
    expect(checkbox).not.toBeChecked()
  })

  // Test: Verify that todos can be deleted successfully
  it('deletes a todo', async () => {
    const user = userEvent.setup()
    render(<App />)

    // Add a todo to delete
    const input = screen.getByPlaceholderText('Add a new task...')
    await user.type(input, 'Delete me')
    await user.click(screen.getByText('Add'))

    // Verify todo exists
    expect(screen.getByText('Delete me')).toBeInTheDocument()

    // Delete the todo
    await user.click(screen.getByText('Delete'))

    // Verify todo is removed and empty message returns
    expect(screen.queryByText('Delete me')).not.toBeInTheDocument()
    expect(screen.getByText('No tasks yet. Add one above!')).toBeInTheDocument()
  })

  // Test: Verify that theme switching functionality works correctly
  it('toggles theme', async () => {
    const user = userEvent.setup()
    render(<App />)

    // Find theme button (initially shows "Dark" option)
    const themeButton = screen.getByRole('button', { name: /dark/i })
    expect(themeButton).toBeInTheDocument()

    // Click to switch to dark theme
    await user.click(themeButton)

    // Verify button now shows "Light" option and theme is saved
    expect(screen.getByRole('button', { name: /light/i })).toBeInTheDocument()
    expect(localStorage.getItem('todo-app-theme')).toBe('dark')
  })
})
