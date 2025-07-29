import { render, screen, fireEvent } from '@testing-library/react';
import CategoryFilter from './CategoryFilter';

describe('CategoryFilter', () => {
  const categories = ['all', 'electronics', 'clothing'];

  it('renders dropdown with correct categories', () => {
    render(
      <CategoryFilter
        categories={categories}
        selected="electronics"
        onSelectCategory={() => {}}
      />
    );

    // Verify all options are present
    categories.forEach((category) => {
      const optionText = category.charAt(0).toUpperCase() + category.slice(1);
      expect(screen.getByRole('option', { name: optionText })).toBeInTheDocument();
    });

    // Verify selected option is correct
    expect(screen.getByDisplayValue('Electronics')).toBeInTheDocument();
  });

  it('calls onSelectCategory when a new option is selected', () => {
    const mockSelect = jest.fn();

    render(
      <CategoryFilter
        categories={categories}
        selected="all"
        onSelectCategory={mockSelect}
      />
    );

    fireEvent.change(screen.getByRole('combobox'), {
      target: { value: 'clothing' },
    });

    expect(mockSelect).toHaveBeenCalledWith('clothing');
  });
});