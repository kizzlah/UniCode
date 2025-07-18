import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CodeEditor } from '../../components/CodeEditor';

// Mock clipboard API
Object.assign(navigator, {
  clipboard: {
    writeText: vi.fn(() => Promise.resolve()),
  },
});

describe('CodeEditor', () => {
  const defaultProps = {
    value: '',
    onChange: vi.fn(),
    language: 'javascript',
    placeholder: 'Enter code here...',
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render with placeholder text', () => {
    render(<CodeEditor {...defaultProps} />);
    expect(screen.getByPlaceholderText('Enter code here...')).toBeInTheDocument();
  });

  it('should display the provided value', () => {
    render(<CodeEditor {...defaultProps} value="console.log('test')" />);
    expect(screen.getByDisplayValue("console.log('test')")).toBeInTheDocument();
  });

  it('should call onChange when text is entered', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    
    render(<CodeEditor {...defaultProps} onChange={onChange} />);
    
    const textarea = screen.getByRole('textbox');
    await user.type(textarea, 'test code');
    
    expect(onChange).toHaveBeenCalled();
  });

  it('should be read-only when readOnly prop is true', () => {
    render(<CodeEditor {...defaultProps} readOnly />);
    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveAttribute('readonly');
  });

  it('should copy text to clipboard when copy button is clicked', async () => {
    const user = userEvent.setup();
    
    render(<CodeEditor {...defaultProps} value="test code" />);
    
    const copyButton = screen.getByTitle('Copy to clipboard');
    await user.click(copyButton);
    
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('test code');
  });

  it('should show check icon after successful copy', async () => {
    const user = userEvent.setup();
    
    render(<CodeEditor {...defaultProps} value="test code" />);
    
    const copyButton = screen.getByTitle('Copy to clipboard');
    await user.click(copyButton);
    
    await waitFor(() => {
      expect(screen.getByRole('button')).toContainHTML('Check');
    });
  });

  it('should apply dark theme classes', () => {
    render(<CodeEditor {...defaultProps} theme="dark" />);
    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveClass('bg-gray-900', 'text-gray-100');
  });

  it('should apply light theme classes by default', () => {
    render(<CodeEditor {...defaultProps} />);
    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveClass('bg-white', 'text-gray-900');
  });
});