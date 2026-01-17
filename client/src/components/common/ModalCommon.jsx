import { useState } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import CancelIcon from '@mui/icons-material/Cancel';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  maxHeight: '80vh',
  overflowY: 'auto',
  bgcolor: 'background.paper',
  border: '2px solid #f1e8e8',
  borderRadius: '20px',
  boxShadow: 24,
  p: 3,
};

const ModalCommon = ({ open, handleClose }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    amount: ''
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Special handling for amount field
    if (name === 'amount') {
      // Only allow positive numbers
      if (value < 0) {
        setFormData(prev => ({ ...prev, [name]: '' }));
        return;
      }
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleKeyDown = (e) => {
    // Prevent negative sign, 'e', and other non-numeric characters for amount field
    if (e.target.name === 'amount' && ['-', 'e', 'E', '+'].includes(e.key)) {
      e.preventDefault();
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    } else if (formData.title.length > 100) {
      newErrors.title = 'Title must be less than 100 characters';
    }
    
    if (formData.description && formData.description.length > 500) {
      newErrors.description = 'Description must be less than 500 characters';
    }
    
    if (!formData.category) {
      newErrors.category = 'Category is required';
    }
    
    if (!formData.amount) {
      newErrors.amount = 'Amount is required';
    } else if (parseFloat(formData.amount) <= 0) {
      newErrors.amount = 'Amount must be greater than 0';
    } else if (parseFloat(formData.amount) > 1000000) {
      newErrors.amount = 'Amount is too large';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddExpense = () => {
    if (!validateForm()) {
      return;
    }
    
    console.log("Add expense clicked", {
      title: formData.title,
      description: formData.description,
      category: formData.category,
      amount: parseFloat(formData.amount)
    });
    
    // Reset form and close modal
    setFormData({
      title: '',
      description: '',
      category: '',
      amount: ''
    });
    setErrors({});
    handleClose();
  };

  const handleReset = () => {
    setFormData({
      title: '',
      description: '',
      category: '',
      amount: ''
    });
    setErrors({});
  };

  return (
    <Modal 
      open={open} 
      onClose={handleClose} 
      aria-labelledby="add-expense-modal"
      aria-describedby="add-expense-modal-description"
    >
      <Box sx={style}>
        <div style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
          <div style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#1976d2" }}>
            Add New Expense
          </div>
          <div style={{ marginLeft: "auto", cursor: "pointer" }}>
            <CancelIcon 
              onClick={handleClose} 
              style={{ 
                color: "#666",
                fontSize: "28px"
              }} 
            />
          </div>
        </div>
        
        <div>
          {/* Title Field */}
          <div style={{ marginBottom: '15px' }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '8px', 
              fontWeight: 'bold',
              color: errors.title ? '#f44336' : '#333'
            }}>
              Expense Title *
            </label>
            <input
              type="text"
              name="title"
              placeholder="Enter expense title (e.g., Grocery Shopping)"
              value={formData.title}
              onChange={handleChange}
              maxLength="100"
              style={{ 
                width: "94%", 
                padding: "12px", 
                borderRadius: "8px",
                border: errors.title ? "1px solid #f44336" : "1px solid #ddd",
                fontSize: "16px",
                backgroundColor: "#f9f9f9"
              }}
            />
            {errors.title && (
              <div style={{ color: '#f44336', fontSize: '12px', marginTop: '4px' }}>
                {errors.title}
              </div>
            )}
            <div style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}>
              {formData.title.length}/100 characters
            </div>
          </div>
          
          {/* Description Field */}
          <div style={{ marginBottom: '15px' }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '8px', 
              fontWeight: 'bold',
              color: errors.description ? '#f44336' : '#333'
            }}>
              Description (Optional)
            </label>
            <textarea
              name="description"
              placeholder="Enter description"
              value={formData.description}
              onChange={handleChange}
              maxLength="500"
              rows="3"
              style={{ 
                width: "94%", 
                padding: "12px", 
                borderRadius: "8px",
                border: errors.description ? "1px solid #f44336" : "1px solid #ddd",
                fontSize: "16px",
                backgroundColor: "#f9f9f9",
                resize: "vertical",
                fontFamily: "inherit"
              }}
            />
            {errors.description && (
              <div style={{ color: '#f44336', fontSize: '12px', marginTop: '4px' }}>
                {errors.description}
              </div>
            )}
            <div style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}>
              {formData.description.length}/500 characters
            </div>
          </div>
          
          {/* Category Field */}
          <div style={{ marginBottom: '15px' }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '8px', 
              fontWeight: 'bold',
              color: errors.category ? '#f44336' : '#333'
            }}>
              Category *
            </label>
            <select 
              name="category"
              value={formData.category}
              onChange={handleChange}
              style={{ 
                width: "100%", 
                padding: "12px", 
                borderRadius: "8px",
                border: errors.category ? "1px solid #f44336" : "1px solid #ddd",
                fontSize: "16px",
                backgroundColor: "#f9f9f9",
                color: formData.category ? "#333" : "#999"
              }}
            >
              <option value="">Select Category</option>
              <option value="food">Food & Dining</option>
              <option value="transport">Transportation</option>
              <option value="shopping">Shopping</option>
              <option value="entertainment">Entertainment</option>
              <option value="bills">Bills & Utilities</option>
              <option value="health">Health & Fitness</option>
              <option value="education">Education</option>
              <option value="travel">Travel</option>
              <option value="home">Home & Living</option>
              <option value="other">Other</option>
            </select>
            {errors.category && (
              <div style={{ color: '#f44336', fontSize: '12px', marginTop: '4px' }}>
                {errors.category}
              </div>
            )}
          </div>
          
          {/* Amount Field */}
          <div style={{ marginBottom: '15px' }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '8px', 
              fontWeight: 'bold',
              color: errors.amount ? '#f44336' : '#333'
            }}>
              Amount *
            </label>
            <div style={{ position: 'relative' }}>
              <span style={{
                position: 'absolute',
                left: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                fontSize: '16px',
                color: '#666',
                zIndex: 1
              }}>
                ₹
              </span>
              <input 
                type="number"
                name="amount"
                placeholder="0.00"
                value={formData.amount}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                min="0"
                step="0.01"
                max="1000000"
                style={{ 
                  width: "90%", 
                  padding: "12px 12px 12px 30px", 
                  borderRadius: "8px",
                  border: errors.amount ? "1px solid #f44336" : "1px solid #ddd",
                  fontSize: "16px",
                  backgroundColor: "#f9f9f9"
                }}
              />
            </div>
            {errors.amount && (
              <div style={{ color: '#f44336', fontSize: '12px', marginTop: '4px' }}>
                {errors.amount}
              </div>
            )}
          </div>
          
          {/* Buttons */}
          <div style={{ 
            display: 'flex', 
            gap: '10px', 
            marginTop: '25px' 
          }}>
            <button 
              type="button"
              style={{ 
                flex: 1,
                padding: "14px", 
                backgroundColor: "#f5f5f5", 
                color: "#666", 
                border: "1px solid #ddd", 
                borderRadius: "8px",
                fontSize: "16px",
                fontWeight: "bold",
                cursor: "pointer",
                transition: "all 0.2s"
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = "#e0e0e0"}
              onMouseOut={(e) => e.target.style.backgroundColor = "#f5f5f5"}
              onClick={handleReset}
            >
              Reset
            </button>
            
            <button 
              type="button"
              style={{ 
                flex: 1,
                padding: "14px", 
                backgroundColor: "#1976d2", 
                color: "white", 
                border: "none", 
                borderRadius: "8px",
                fontSize: "16px",
                fontWeight: "bold",
                cursor: "pointer",
                transition: "background-color 0.2s"
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = "#1565c0"}
              onMouseOut={(e) => e.target.style.backgroundColor = "#1976d2"}
              onClick={handleAddExpense}
            >
              Add Expense
            </button>
          </div>
        </div>
      </Box>
    </Modal>
  );
};

export default ModalCommon;