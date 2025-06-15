import React from 'react';
import { Form } from 'react-bootstrap';

interface Props {
  categories: string[];
  selected: string;
  onChange: (category: string) => void;
}

const CategoryFilter: React.FC<Props> = ({ categories, selected, onChange }) => {
  return (
    <Form.Select value={selected} onChange={(e) => onChange(e.target.value)}>
      {categories.map((cat) => (
        <option key={cat} value={cat}>
          {cat.toUpperCase()}
        </option>
      ))}
    </Form.Select>
  );
};

export default CategoryFilter;