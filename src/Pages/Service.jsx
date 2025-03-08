import React from 'react';
import { 
  Box, 
  Typography, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText, 
  Paper, 
  Button, 
  AppBar, 
  Toolbar,
  Container,
  Divider,
  useTheme,
  IconButton,
} from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import ErrorIcon from '@mui/icons-material/Error';
import LockIcon from '@mui/icons-material/Lock';
import PersonIcon from '@mui/icons-material/Person';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import ReceiptIcon from '@mui/icons-material/Receipt';
import HelpIcon from '@mui/icons-material/Help';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import CheckIcon from '@mui/icons-material/Check';
import { Link, useNavigate } from 'react-router-dom';
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

function SelfServiceCenter() {
  const theme = useTheme();
  const navigate=useNavigate();
  const menuItems = [
    { icon: <LockIcon />, text: "Change ID Login Password", color: "#8A2BE2" ,link: "/changePassword"},
    { icon: <PersonIcon />, text: "Change bank name", color: "#3CB371",link: "/retrieve" },
    { icon: <HelpIcon />, text: "Game Problems", color: "#DC143C" ,link: "/problems" },
  ];

  return (
    <Box sx={{ flexGrow: 1, bgcolor: '#f0f2f5', minHeight: '100vh' }}>
      {/* Header/AppBar */}
      <AppBar position="static" sx={{ bgcolor: '#3a86ff' }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
        <IconButton edge="start">
            <ArrowBackIcon sx={{ color: "white" }}  onClick={()=>navigate(-1)}/>
          </IconButton>
          <Typography variant="h6">Self Service Center</Typography>
          <Button color="inherit" size="small" variant="outlined" sx={{ borderRadius: 4 }}>
            English
          </Button>
        </Toolbar>
      </AppBar>
      
      {/* Welcome Banner */}
      <Box 
        sx={{ 
          bgcolor: '#2c3e50', 
          color: 'white', 
          p: 2, 
          backgroundImage: 'linear-gradient(to right, #2c3e50, #4b6cb7)',
          position: 'relative',
          height: '100px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center'
        }}
      >
        <Typography variant="h6" fontWeight="bold">
          Welcome to the Self Service
        </Typography>
        <Typography variant="h6" fontWeight="bold">
          Customer Service Center
        </Typography>
        
        {/* Small circle with character */}
        <Box 
          sx={{ 
            position: 'absolute', 
            right: 20, 
            top: '50%',
            transform: 'translateY(-50%)',
            width: 70, 
            height: 70, 
            borderRadius: '50%', 
            bgcolor: '#4b6cb7',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: 3
          }}
        >
          <Typography variant="h5" color="white" fontWeight="bold">CS</Typography>
        </Box>
      </Box>

      {/* Menu List */}
      <Container maxWidth="sm" sx={{ py: 2 }}>
 
        <Paper elevation={1} sx={{ borderRadius: 2, overflow: 'hidden' }}>
          <List disablePadding>
            {menuItems.map((item, index) => (
              <React.Fragment key={index}>
                 <Link to={item.link} style={{textDecoration:"none"}}>
                <ListItem button sx={{ py: 1.5 }}>
                 
                  <ListItemIcon>
                    <Box 
                      sx={{ 
                        bgcolor: item.color, 
                        color: 'white', 
                        width: 36, 
                        height: 36, 
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      {item.icon}
                    </Box>
                  </ListItemIcon>
                  
                  <ListItemText primary={item.text} />
                  
                  <ArrowForwardIosIcon fontSize="small" sx={{ color: '#aaa', fontSize: 14 }} />
                </ListItem>
                </Link>
                {index < menuItems.length - 1 && <Divider component="li" />}
              </React.Fragment>
            ))}
          </List>
        </Paper>
        
        {/* Footer Notes */}
        <Box sx={{ mt: 2, px: 2, color: '#666', fontSize: '0.85rem' }}>
          <Typography variant="body2" gutterBottom>
            <strong>KINDLY NOTE</strong>
          </Typography>
          <Typography variant="body2" sx={{ fontSize: '0.8rem', mb: 0.5 }}>
            • Please ensure that you input valid information when submitting the request. After submission, the system will automatically verify the information.
          </Typography>
          <Typography variant="body2" sx={{ fontSize: '0.8rem', mb: 0.5 }}>
            • Providing false information may result in your account being restricted.
          </Typography>
          <Typography variant="body2" sx={{ fontSize: '0.8rem', mb: 2 }}>
            • After submitting for a refund, you can use Shopstream to progress to application and receive real-time updates of the ticket status/responses.
          </Typography>
        </Box>
        
        {/* Submit Button */}
        <Box sx={{ px: 2, mb: 4 }}>
          <Button 
            variant="contained" 
            fullWidth 
            sx={{ 
              bgcolor: '#f9ca24', 
              color: 'black', 
              borderRadius: 6,
              textTransform: 'none',
              py: 1,
              '&:hover': {
                bgcolor: '#f0b70f',
              },
            }}
          >
            Request query
          </Button>
        </Box>
      </Container>
    </Box>
  );
}

export default SelfServiceCenter;