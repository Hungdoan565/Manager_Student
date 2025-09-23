import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import React from 'react'
import { ConditionalRender } from './ProtectedRoute'

describe('ConditionalRender', () => {
  it('renders children when condition is true', () => {
    render(
      <ConditionalRender condition={true}>
        <div>OK</div>
      </ConditionalRender>
    )
    expect(screen.getByText('OK')).toBeInTheDocument()
  })

  it('renders fallback when condition is false', () => {
    render(
      <ConditionalRender condition={false} fallback={<span>NO</span>}>
        <div>OK</div>
      </ConditionalRender>
    )
    expect(screen.getByText('NO')).toBeInTheDocument()
  })
})
