import { useForm } from 'react-hook-form';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import CancelIcon from '@mui/icons-material/Cancel';
import {toast} from 'sonner';
import axios from 'axios'
const url = import.meta.env.VITE_bACKEND_URL;


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 450,
  maxHeight: '75vh',
  overflowY: 'auto',
  bgcolor: 'background.paper',
  border: '1px solid #e0e0e0',
  borderRadius: '12px',
  boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
  p: 2.5,
};

const ModalCommon = ({ open, handleClose , userId }) => {
  // Get today's date in YYYY-MM-DD format for default value
  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // Initialize React Hook Form
  const {register,handleSubmit,reset,watch,setValue,trigger,formState: { errors, isSubmitting, isValid }} = useForm({
    mode: 'onChange', defaultValues: { title: '',description: '',category: '',amount: 0,date: getTodayDate()}
  });

  // Watch form values for character counts
  const titleValue = watch('title', '');
  const descriptionValue = watch('description', '');

  // Handle form submission
  const onSubmit = async (data) => {
    try {
      const {title,description,date,category,amount} = data;
      
      const res = await axios.post(`${url}addexpense`,{userId,title,description,category,amount,date});
      if(res.status===201){
      toast.success("success")
      reset();
      handleClose();
      }
    } catch (err) {
      console.error('Error adding expense:', err);
      toast.error(err?.response?.data?.error || 'Failed to add expense');
    }
  };

  // Handle reset
  const handleReset = () => { reset({ title: '',description: '',category: '',amount: 0,date: getTodayDate() }); };

  const handleAmountChange = (e) => {
    const value = e.target.value;
    if (parseFloat(value) < 0) { setValue('amount', 0); }
    trigger('amount'); // Trigger validation
  };

  const handleAmountKeyDown = (e) => {
    if (['-', 'e', 'E', '+'].includes(e.key)) { e.preventDefault(); }
  };

  return (
    <Modal open={open} onClose={handleClose} aria-labelledby="add-expense-modal" aria-describedby="add-expense-modal-description" >
      <Box sx={style}>
        <div style={{ display: "flex", alignItems: "center", marginBottom: "16px" }}>
          <div style={{ fontSize: "1.25rem", fontWeight: "600", color: "#1976d2" }}>
            Add New Expense
          </div>
          <div style={{ marginLeft: "auto", cursor: "pointer" }}>
            <CancelIcon onClick={handleClose} style={{color: "#666",fontSize: "24px"}} />
          </div>
        </div>
        
        <form onSubmit={handleSubmit(onSubmit)}>
          <div style={{ display: 'grid', gap: '12px' }}>
            {/* Title Field */}
            <div>
              <label style={{ 
                display: 'block', 
                marginBottom: '6px', 
                fontWeight: '500',
                fontSize: '14px',
                color: errors.title ? '#f44336' : '#444'
              }}>
                Expense Title *
              </label>
              <input
                type="text"
                placeholder="Enter expense title"
                {...register('title', {
                  required: 'Title is required',
                  maxLength: {
                    value: 100,
                    message: 'Title must be less than 100 characters'
                  }
                })}
                style={{ 
                  width: "94%", 
                  padding: "10px 12px", 
                  borderRadius: "6px",
                  border: errors.title ? "1px solid #f44336" : "1px solid #ddd",
                  fontSize: "14px",
                  backgroundColor: "#f9f9f9"
                }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2px' }}>
                {errors.title && (
                  <div style={{ color: '#f44336', fontSize: '11px' }}>
                    {errors.title.message}
                  </div>
                )}
                <div style={{ fontSize: '11px', color: '#666', marginLeft: 'auto' }}>
                  {titleValue.length}/100
                </div>
              </div>
            </div>
            
            {/* Date Field */}
            <div>
              <label style={{ 
                display: 'block', 
                marginBottom: '6px', 
                fontWeight: '500',
                fontSize: '14px',
                color: errors.date ? '#f44336' : '#444'
              }}>
                Date *
              </label>
              <input 
                type="date"
                max={getTodayDate()}
                {...register('date', {
                  required: 'Date is required',
                  validate: (value) => {
                    const selectedDate = new Date(value);
                    const today = new Date();
                    today.setHours(23, 59, 59, 999);
                    return selectedDate <= today || 'Date cannot be in the future';
                  }
                })}
                style={{ 
                  width: "94%", 
                  padding: "10px 12px", 
                  borderRadius: "6px",
                  border: errors.date ? "1px solid #f44336" : "1px solid #ddd",
                  fontSize: "14px",
                  backgroundColor: "#f9f9f9",
                  color: watch('date') ? "#333" : "#999"
                }}
              />
              {errors.date && (
                <div style={{ color: '#f44336', fontSize: '11px', marginTop: '2px' }}>
                  {errors.date.message}
                </div>
              )}
            </div>
            
            {/* Category Field */}
            <div>
              <label style={{ 
                display: 'block', 
                marginBottom: '6px', 
                fontWeight: '500',
                fontSize: '14px',
                color: errors.category ? '#f44336' : '#444'
              }}>
                Category *
              </label>
              <select 
                {...register('category', {
                  required: 'Category is required'
                })}
                style={{ 
                  width: "100%", 
                  padding: "10px 12px", 
                  borderRadius: "6px",
                  border: errors.category ? "1px solid #f44336" : "1px solid #ddd",
                  fontSize: "14px",
                  backgroundColor: "#f9f9f9",
                  color: watch('category') ? "#333" : "#999",
                  height: '42px'
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
                <div style={{ color: '#f44336', fontSize: '11px', marginTop: '2px' }}>
                  {errors.category.message}
                </div>
              )}
            </div>
            
            {/* Amount Field */}
            <div>
              <label style={{ 
                display: 'block', 
                marginBottom: '6px', 
                fontWeight: '500',
                fontSize: '14px',
                color: errors.amount ? '#f44336' : '#444'
              }}>
                Amount *
              </label>
              <div style={{ position: 'relative' }}>
                <span style={{
                  position: 'absolute',
                  left: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  fontSize: '14px',
                  color: '#666',
                  zIndex: 1
                }}>
                  ₹
                </span>
                <input 
                  type="number"
                  placeholder="0"
                  onKeyDown={handleAmountKeyDown}
                  min={0}
                  step={1}
                  {...register('amount', {
                    required: 'Amount is required',
                    validate: {
                      positive: (value) => parseFloat(value) > 0 || 'Amount must be greater than 0',
                      maxAmount: (value) => parseFloat(value) <= 1000000 || 'Amount is too large'
                    },
                    onChange: handleAmountChange
                  })}
                  style={{ 
                    width: "91%", 
                    padding: "10px 12px 10px 28px", 
                    borderRadius: "6px",
                    border: errors.amount ? "1px solid #f44336" : "1px solid #ddd",
                    fontSize: "14px",
                    backgroundColor: "#f9f9f9"
                  }}
                />
              </div>
              {errors.amount && (
                <div style={{ color: '#f44336', fontSize: '11px', marginTop: '2px' }}>
                  {errors.amount.message}
                </div>
              )}
            </div>
            
            {/* Description Field */}
            <div>
              <label style={{ 
                display: 'block', 
                marginBottom: '6px', 
                fontWeight: '500',
                fontSize: '14px',
                color: errors.description ? '#f44336' : '#444'
              }}>
                Description (Optional)
              </label>
              <textarea
                placeholder="Enter description"
                rows={2}
                {...register('description', {
                  maxLength: {
                    value: 500,
                    message: 'Description must be less than 500 characters'
                  }
                })}
                style={{ 
                  width: "94%", 
                  padding: "10px 12px", 
                  borderRadius: "6px",
                  border: errors.description ? "1px solid #f44336" : "1px solid #ddd",
                  fontSize: "14px",
                  backgroundColor: "#f9f9f9",
                  resize: "none",
                  minHeight: '60px'
                }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2px' }}>
                {errors.description && (
                  <div style={{ color: '#f44336', fontSize: '11px' }}>
                    {errors.description.message}
                  </div>
                )}
                <div style={{ fontSize: '11px', color: '#666', marginLeft: 'auto' }}>
                  {descriptionValue.length}/500
                </div>
              </div>
            </div>
          </div>
          
          {/* Buttons */}
          <div style={{display: 'flex',gap: '8px',marginTop: '20px'}}>
            <button type="button"
              style={{ 
                flex: 1,
                padding: "10px", 
                backgroundColor: "#f5f5f5", 
                color: "#666", 
                border: "1px solid #ddd", 
                borderRadius: "6px",
                fontSize: "14px",
                fontWeight: "500",
                cursor: "pointer",
                transition: "all 0.2s"
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = "#e0e0e0"}
              onMouseOut={(e) => e.target.style.backgroundColor = "#f5f5f5"}
              onClick={handleReset} disabled={isSubmitting} >
              Reset
            </button>
            
            <button type="submit"
              style={{ 
                flex: 1,
                padding: "10px", 
                backgroundColor: isSubmitting ? "#90caf9" : "#1976d2", 
                color: "white", 
                border: "none", 
                borderRadius: "6px",
                fontSize: "14px",
                fontWeight: "500",
                cursor: isSubmitting ? "not-allowed" : "pointer",
                transition: "background-color 0.2s"
              }}
              onMouseOver={(e) => { if (!isSubmitting) { e.target.style.backgroundColor = "#1565c0"; } }}
              onMouseOut={(e) => { if (!isSubmitting) { e.target.style.backgroundColor = "#1976d2"; } }}
              disabled={isSubmitting} >
              {isSubmitting ? 'Adding...' : 'Add Expense'}
            </button>
          </div>
        </form>
      </Box>
    </Modal>
  );
};

export default ModalCommon;