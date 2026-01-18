import { useState } from "react";
import { useForm } from "react-hook-form";
import {Container,Paper,TextField,Button,Typography,Box,IconButton,InputAdornment,Alert,CircularProgress,Link,Fade,Grid } from 
"@mui/material";
import { Email } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import {toast} from 'sonner'
import {isAuth,storeData} from '../../utils/helper';
const url = import.meta.env.VITE_bACKEND_URL;

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate()

  const { register, handleSubmit, formState: { errors }, reset } = useForm({ defaultValues: { email: "" } });

  const onSubmit = async (data) => {
    setError("");
    setLoading(true);
    try{
      const res = await axios.post(`${url}login`,data)
      if(res?.status===200){
        toast.success(res?.data?.message)
        storeData(res?.data?.user)
        setLoading(false);
        navigate('/')
      }
    }
    catch(err){
      toast.error(err?.response?.data?.error);
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="lg" sx={{display:"flex",justifyContent:"center"}}>
      <Grid container sx={{ minHeight: "80vh" }}>
        {/* Login Form */}
        <Grid item xs={12} md={6}
          sx={{display: "flex",flexDirection: "column",justifyContent: "center",alignItems: "center",p: { xs: 1, sm: 4, md: 6 },}} >
          <Paper
            elevation={0}
            sx={{
              width: "100%",
              maxWidth: 450,
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
                Sign in to your account
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
                margin="normal"
                required
                disabled={loading}
                error={!!errors.email}
                helperText={errors.email?.message}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Email color="action" />
                    </InputAdornment>
                  ),
                }}
                sx={{ mb: 2 }}
              />

              <Button
                fullWidth
                type="submit"
                variant="contained"
                size="large"
                disabled={loading}
                sx={{
                  py: 1.5,
                  mb: 3,
                  borderRadius: 2,
                  fontWeight: "bold",
                  fontSize: "1rem",
                }}
              >
                {loading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  "Sign In"
                )}
              </Button>

              <Box sx={{ textAlign: "center" }}>
                <Typography variant="body2" color="text.secondary">
                  Don't have an account?{" "}
                  <Link
                    sx={{ fontWeight: "bold", textDecoration: "none" }}
                    onClick={() => navigate('/signin')}
                  >
                    Sign up
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

export default LoginPage;