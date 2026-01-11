import { useState } from 'react'
import { useTheme } from './hooks/useTheme'
import './App.css'

function App() {
  const [todos, setTodos] = useState([])
  const [inputValue, setInputValue] = useState('')
  const { theme, toggleTheme } = useTheme()

  const addTodo = (e) => {
    e.preventDefault()
    if (inputValue.trim() === '') return

    setTodos([
      ...todos,
      { id: Date.now(), text: inputValue, completed: false }
    ])
    setInputValue('')
  }

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  return (
    <div className="app">
      <header className="app-header">
        <nav className="nav-links">
          <a href="/" className="nav-link active">Home</a>
          <a href="/contact" className="nav-link">Contact</a>
        </nav>
        <h1>My List</h1>
        <button onClick={toggleTheme} className="theme-btn">
          {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
        </button>
      </header>

      <form onSubmit={addTodo} className="todo-form">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Add a new task..."
          className="todo-input"
        />
        <button type="submit" className="add-btn">Add</button>
      </form>

      <ul className="todo-list">
        {todos.map(todo => (
          <li key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
            />
            <span className="todo-text">{todo.text}</span>
            <button onClick={() => deleteTodo(todo.id)} className="delete-btn">
              Delete
            </button>
          </li>
        ))}
      </ul>

      {todos.length === 0 && (
        <p className="empty-message">No tasks yet. Add one above!</p>
      )}
    </div>
  )
}

export default App
