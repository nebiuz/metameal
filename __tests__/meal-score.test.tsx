import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import MealScore from '@/components/simulation/meal-score'

describe('MealScore Component', () => {
  it('renders the correct score and labels', () => {
    render(
      <MealScore 
        score={85} 
        totalCalories={450} 
        satietyDuration={180} 
        hydrationImpact={10} 
      />
    )
    expect(screen.getByText('85')).toBeTruthy()
    expect(screen.getByText('Excellent')).toBeTruthy()
    expect(screen.getByText('450')).toBeTruthy()
    expect(screen.getByText('3h')).toBeTruthy()
    expect(screen.getByText('+10%')).toBeTruthy()
  })
})
