import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import UploadZone from '@/components/hero/upload-zone'

describe('UploadZone Component', () => {
  it('renders the upload zone hero text correctly', () => {
    render(<UploadZone onImageSelect={vi.fn()} isAnalyzing={false} />)
    expect(screen.getByText(/See what your food/i)).toBeTruthy()
    expect(screen.getByText(/Drop your meal photo here/i)).toBeTruthy()
  })
})
