import { useState } from "react";
import { useForm } from "react-hook-form";
import {Container,Paper,TextField,Button,Typography,Box,InputAdornment,Alert,CircularProgress,Link,Fade,Grid,FormControl,InputLabel,
  OutlinedInput} from "@mui/material";
import { Email, Person, AttachMoney } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import {toast} from 'sonner'
const url = import.meta.env.VITE_bACKEND_URL;


const SignupPage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate()

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    defaultValues: {name: "", email: "", monthlyBudget: 0}
  });

  const onSubmit = async (data) => {
    setError("");
    setLoading(true);

    try{
      const res = await axios.post(`${url}createuser`,{name:data.name,email:data.email,budget:data.monthlyBudget})
      if(res?.status===201){
        setLoading(false)
        toast.success(res?.data?.message || "user created successfully");
        navigate('/login')
      }
      
    }
    catch(err){
      toast.error(err?.response?.data?.error);
      setLoading(false)
    }
  };

  return (
    <Container maxWidth="lg" sx={{display:"flex",justifyContent:"center"}}>
      <Grid container sx={{ minHeight: "80vh" }}>
        {/* Signup Form */}
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            p: { xs: 1, sm: 4, md: 6 },
          }}
        >
          <Paper
            elevation={0}
            sx={{
              width: "100%",
              maxWidth: 500,
              p: { xs: 3, sm: 4 },
              borderRadius: 2,
              border: "1px solid #e0e0e0",
            }}
          >
            <Box sx={{ textAlign: "center", mb: 4 }}>
              <Typography
                variant="h4"
                fontWeight="bold"
                color="primary"
                gutterBottom
              >
                Expense Tracker
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Create your account
              </Typography>
            </Box>

            {error && (
              <Fade in={!!error}>
                <Alert
                  severity="error"
                  sx={{ mb: 3 }}
                  onClose={() => setError("")}
                >
                  {error}
                </Alert>
              </Fade>
            )}

            <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
              {/* Name Field */}
              <TextField
                fullWidth
                label="Full Name"
                {...register("name", {
                  required: "Name is required",
                  minLength: {
                    value: 2,
                    message: "Name must be at least 2 characters"
                  },
                  maxLength: {
                    value: 50,
                    message: "Name must not exceed 50 characters"
                  },
                  pattern: {
                    value: /^[A-Za-z\s]+$/,
                    message: "Name can only contain letters and spaces"
                  }
                })}
                margin="normal"
                required
                disabled={loading}
                error={!!errors.name}
                helperText={errors.name?.message}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Person color="action" />
                    </InputAdornment>
                  ),
                }}
                sx={{ mb: 2 }}
              />

              {/* Email Field */}
              <TextField
                fullWidth
                label="Email Address"
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Please enter a valid email address"
                  }
                })}
                margin="normal" required disabled={loading} error={!!errors.email}
                helperText={errors.email?.message}
                InputProps={{
                  startAdornment: (<InputAdornment position="start"><Email color="action" /></InputAdornment>),
                }}
                sx={{ mb: 2 }}
              />

              {/* Monthly Budget Field */}
              <FormControl fullWidth margin="normal" error={!!errors.monthlyBudget}>
                <InputLabel htmlFor="monthly-budget">Monthly Budget *</InputLabel>
                <OutlinedInput
                  id="monthly-budget"
                  label="Monthly Budget"
                  {...register("monthlyBudget", {
                    required: "Monthly budget is required",
                    min: {value: 0,message: "Budget must be 0 or greater"},
                    max: {value: 1000000,message: "Budget is too high"},
                    pattern: {value: /^\d+(\.\d{1,2})?$/,message: "Enter a valid amount (max 2 decimal places)"}
                  })}
                  startAdornment={<InputAdornment position="start">₹</InputAdornment>}
                  type="number"
                  inputProps={{step: 1,min: 0,max: 1000000,placeholder: 0}}
                  disabled={loading}
                />
                {errors.monthlyBudget && (
                  <Typography variant="caption" color="error" sx={{ mt: 1, ml: 2 }}>
                    {errors.monthlyBudget.message}
                  </Typography>
                )}
                <Typography variant="caption" color="text.secondary" sx={{ mt: 1, ml: 2, display: 'block' }}>
                  Set your monthly spending limit (can be changed later)
                </Typography>
              </FormControl>


              <Button
                fullWidth
                type="submit"
                variant="contained"
                size="large"
                disabled={loading}
                sx={{
                  py: 1.5,
                  mt:2,
                  mb: 3,
                  borderRadius: 2,
                  fontWeight: "bold",
                  fontSize: "1rem",
                }}
              >
                {loading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  "Create Account"
                )}
              </Button>

              <Box sx={{ textAlign: "center" }}>
                <Typography variant="body2" color="text.secondary">
                  Already have an account?{" "}
                  <Link
                    sx={{ fontWeight: "bold", textDecoration: "none" }}
                    onClick={() => navigate('/login')}
                  >
                    Sign in
                  </Link>
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default SignupPage;