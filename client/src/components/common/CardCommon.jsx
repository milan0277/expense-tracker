import { useForm } from 'react-hook-form';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Box, TextField, InputAdornment } from '@mui/material';
import CardHeader from '@mui/material/CardHeader';
import {toast} from 'sonner'
import { useState,useEffect } from 'react';
import {getStoredData} from '../../utils/helper'
const url = import.meta.env.VITE_bACKEND_URL;



const CardCommon = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
    setError,
    setValue
  } = useForm({
    defaultValues: {
      newBudget: 0
    }
  });

   const userId = getStoredData()?._id;
  const [budget,setBudget]=useState(0)

  const getBudget = async()=>{
    try{
      const cbudgte = await axios.post(`${url}getbudget`,{userId})
      if(cbudgte.status===200){
        setBudget(cbudgte?.data?.monthlybudget)
      }
    }
    catch(err){
      console.log("error",err)
    }
  }

  useEffect(()=>{
    getBudget()
  },[])

  const onSubmit = async (data) => {
    try {
      const res = await axios.put(`${url}updatebudget`, {
        userId: userId,
        newBudget: data.newBudget 
      });
      
      if (res.status===201) {
        toast.success(res?.data?.message);
        setBudget(res?.data?.data?.monthlybudget)
        reset({ newBudget: 0 }); 
      } else {
        throw new Error(res.data.message || "Failed to update budget");
      }
      
    } catch (error) {
      console.error("Error updating budget:", error);
      
      if (error.response) {
        setError('newBudget', {
          type: 'manual',
          message: error.response.data.message || 'Server error occurred'
        });
      } else if (error.request) {
        setError('newBudget', {
          type: 'manual',
          message: 'No response from server. Please check your connection.'
        });
      } else {
        setError('newBudget', {
          type: 'manual',
          message: error.message || 'Failed to update budget'
        });
      }
    }
  };

  const handleCancel = () => { reset({ newBudget: 0 }); };
  const newBudgetValue = watch('newBudget');

  const handleBudgetChange = (e) => {
    const value = e.target.value;
    
    // If empty, set to 0
    if (value === '') {  setValue('newBudget', 0); return; }
    
    // Convert to number
    const numValue = Number(value);
    
    // Prevent negative values
    if (numValue < 0) {
      setValue('newBudget', 0);
      return;
    }
    
    // Set the numeric value
    setValue('newBudget', numValue, { shouldValidate: true });
  };

  // For display, we need to handle the number properly
  const displayBudget = newBudgetValue === 0 ? '' : newBudgetValue;

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Card sx={{ width: 500, maxWidth: 600, mt: "5rem" }}>
        <CardHeader title="Update Budget" sx={{ textAlign: "center" }} />

        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent>
            {/* Current Budget Display */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle2" gutterBottom>
                Current Budget
              </Typography>
              <TextField 
                type="number" 
                fullWidth 
                disabled 
                value={budget}
                InputProps={{
                  startAdornment: <InputAdornment position="start">₹</InputAdornment>,
                  readOnly: true
                }}
                sx={{
                  '& .MuiInputBase-input.Mui-disabled': {
                    WebkitTextFillColor: '#000000',
                  },
                }}
              />
            </Box>

            {/* New Budget Input Section */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle2" gutterBottom>
                New Budget Amount *
              </Typography>
              <TextField
                type="number"
                fullWidth
                placeholder="Enter new budget amount"
                value={displayBudget}
                onChange={handleBudgetChange}
                error={!!errors.newBudget}
                helperText={errors.newBudget?.message}
                InputProps={{
                  startAdornment: <InputAdornment position="start">₹</InputAdornment>,
                  inputProps: { 
                    min: 0, 
                    step: "0.01",
                    onKeyDown: (e) => {
                      if (['-', 'e', 'E', '+'].includes(e.key)) {
                        e.preventDefault();
                      }
                    }
                  }
                }}
              />
              <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                Enter the updated budget amount
              </Typography>
              
              {/* Show difference if value entered */}
              {newBudgetValue > 0 && !errors.newBudget && !isNaN(newBudgetValue) && (
                <Typography variant="caption" sx={{ 
                  mt: 1, 
                  display: 'block',
                  color: newBudgetValue > budget? 'green' : 'red',
                  fontWeight: 'medium'
                }}>
                  {newBudgetValue > budget
                    ? `Increase by ₹${(newBudgetValue - budget).toFixed(2)}` 
                    : `Decrease by ₹${(budget- newBudgetValue).toFixed(2)}`}
                </Typography>
              )}
            </Box>
          </CardContent>

          <CardActions sx={{ justifyContent: "flex-end", gap: 1, p: 2 }}>
            <Button 
              size="small" 
              onClick={handleCancel}
              disabled={isSubmitting}
              variant="outlined"
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              size="small"
              color="primary"
              type="submit"
              disabled={isSubmitting || !!errors.newBudget || newBudgetValue === 0 || newBudgetValue === budget}
              sx={{ minWidth: '120px' }}
            >
              {isSubmitting ? 'Updating...' : 'Update Budget'}
            </Button>
          </CardActions>
        </form>
      </Card>
    </div>
  );
}

export default CardCommon;