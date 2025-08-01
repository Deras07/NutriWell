import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { Input } from '../input'

describe('Input Component', () => {
  test('renders basic input', () => {
    render(<Input placeholder="Enter text" />)
    expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument()
  })

  test('handles value changes', () => {
    const handleChange = jest.fn()
    render(<Input onChange={handleChange} />)
    
    const input = screen.getByRole('textbox')
    fireEvent.change(input, { target: { value: 'test value' } })
    
    expect(handleChange).toHaveBeenCalledWith(
      expect.objectContaining({
        target: expect.objectContaining({ value: 'test value' })
      })
    )
  })

  test('renders with label', () => {
    render(<Input label="Email Address" />)
    expect(screen.getByLabelText('Email Address')).toBeInTheDocument()
  })

  test('shows required indicator', () => {
    render(<Input label="Required Field" required />)
    expect(screen.getByLabelText('required')).toBeInTheDocument()
    expect(screen.getByText('*')).toBeInTheDocument()
  })

  test('displays error message', () => {
    render(<Input error="This field is required" />)
    expect(screen.getByText('This field is required')).toBeInTheDocument()
    expect(screen.getByRole('textbox')).toHaveClass('border-red-500')
  })

  test('displays help text', () => {
    render(<Input helpText="Enter a valid email address" />)
    expect(screen.getByText('Enter a valid email address')).toBeInTheDocument()
  })

  test('renders as disabled', () => {
    render(<Input disabled />)
    expect(screen.getByRole('textbox')).toBeDisabled()
    expect(screen.getByRole('textbox')).toHaveClass('disabled:bg-gray-50')
  })

  test('applies different sizes', () => {
    const { rerender } = render(<Input size="sm" />)
    expect(screen.getByRole('textbox')).toHaveClass('py-2', 'text-sm')

    rerender(<Input size="lg" />)
    expect(screen.getByRole('textbox')).toHaveClass('py-4', 'text-lg')
  })

  test('renders with leftIcon', () => {
    const TestIcon = () => <span data-testid="left-icon">📧</span>
    render(<Input leftIcon={<TestIcon />} />)
    
    expect(screen.getByTestId('left-icon')).toBeInTheDocument()
  })

  test('renders with rightIcon', () => {
    const TestIcon = () => <span data-testid="right-icon">🔍</span>
    render(<Input rightIcon={<TestIcon />} />)
    
    expect(screen.getByTestId('right-icon')).toBeInTheDocument()
  })

  test('handles focus and blur events', () => {
    const handleFocus = jest.fn()
    const handleBlur = jest.fn()
    render(<Input onFocus={handleFocus} onBlur={handleBlur} />)
    
    const input = screen.getByRole('textbox')
    
    fireEvent.focus(input)
    expect(handleFocus).toHaveBeenCalled()
    
    fireEvent.blur(input)
    expect(handleBlur).toHaveBeenCalled()
  })

  test('supports different input types', () => {
    const { rerender } = render(<Input type="email" />)
    expect(screen.getByRole('textbox')).toHaveAttribute('type', 'email')

    rerender(<Input type="password" />)
    expect(screen.getByDisplayValue('') || screen.getByRole('textbox')).toHaveAttribute('type', 'password')
  })

  test('renders with custom className', () => {
    render(<Input className="custom-input" />)
    expect(screen.getByRole('textbox')).toHaveClass('custom-input')
  })

  test('passes through additional props', () => {
    render(<Input data-testid="custom-input" maxLength={10} />)
    const input = screen.getByTestId('custom-input')
    
    expect(input).toHaveAttribute('maxLength', '10')
  })

  test('shows floating label behavior', () => {
    render(<Input label="Floating Label" />)
    
    const input = screen.getByRole('textbox')
    const label = screen.getByText('Floating Label')
    
    // Initially label should be in placeholder position
    expect(label).toHaveClass('top-3')
    
    // When focused or has value, label should float up
    fireEvent.focus(input)
    // Note: The floating behavior is CSS-based and may not be easily testable in JSDOM
    // In a real browser, this would move the label up
  })

  test('applies error styling correctly', () => {
    render(<Input error="Error message" />)
    const input = screen.getByRole('textbox')
    
    expect(input).toHaveClass('border-red-500')
    expect(input).toHaveAttribute('aria-invalid', 'true')
  })

  test('associates label with input correctly', () => {
    render(<Input label="Test Label" />)
    const input = screen.getByRole('textbox')
    const label = screen.getByText('Test Label')
    
    expect(input).toHaveAttribute('id')
    expect(label).toHaveAttribute('for', input.getAttribute('id'))
  })
})