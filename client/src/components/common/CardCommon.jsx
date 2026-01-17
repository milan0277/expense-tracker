import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Box, TextField, InputAdornment } from '@mui/material';
import CardHeader from '@mui/material/CardHeader';

const CardCommon = () => {
    return (
        <div style={{ display: "flex", justifyContent: "center" }}>
            <Card sx={{ width: 500, maxWidth: 600, mt: "5rem" }}>
                <CardHeader title="Update Budget" sx={{ textAlign: "center" }} />

                <CardContent>
                    {/* Budget Input Section */}
                    <Box sx={{ mb: 3 }}>
                        <Typography variant="subtitle2" gutterBottom>
                            Current Budget
                        </Typography>
                        <TextField type="number" fullWidth disabled defaultValue={1000}
                            InputProps={{
                                startAdornment: <InputAdornment position="start">₹</InputAdornment>,
                            }}
                            sx={{
                                '& .MuiInputBase-input.Mui-disabled': {
                                    WebkitTextFillColor: '#000000', // Keep text color black when disabled
                                },
                            }}
                        />
                    </Box>

                    {/* New Budget Input Section */}
                    <Box sx={{ mb: 3 }}>
                        <Typography variant="subtitle2" gutterBottom>
                            New Budget Amount
                        </Typography>
                        <TextField
                            type="number"
                            fullWidth
                            placeholder="Enter new budget amount"
                            InputProps={{
                                startAdornment: <InputAdornment position="start">₹</InputAdornment>,
                                inputProps: { min: 0, step: "0.01" }
                            }}
                        />
                        <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                            Enter the updated budget amount
                        </Typography>
                    </Box>
                </CardContent>

                <CardActions sx={{ justifyContent: "flex-end", gap: 1 }}>
                    <Button size="small">Cancel</Button>
                    <Button
                        variant="contained"
                        size="small"
                        color="primary"
                    >
                        Update Budget
                    </Button>
                </CardActions>
            </Card>
        </div>
    )
}

export default CardCommon