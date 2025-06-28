import React from "react";

interface CategoryFilterProps {
  categories: string[];
  selected: string;
  onSelectCategory: (category: string) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  selected,
  onSelectCategory,
}) => {
  return (
    <div className="mb-3">
      <select
        value={selected}
        onChange={(e) => onSelectCategory(e.target.value)}
        className="form-select"
      >
        {categories.map((category) => (
          <option key={category} value={category}>
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CategoryFilter;