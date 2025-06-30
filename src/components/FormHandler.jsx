import { useState } from 'react';

const useFormHandler = (initialState = {}) => {
  const [formData, setFormData] = useState(initialState);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return { formData, setFormData, handleChange };
};

export default useFormHandler;
