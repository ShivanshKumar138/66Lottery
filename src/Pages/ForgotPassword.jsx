import {
  Box,
  Typography,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Container,
  InputAdornment,
  Select,
  MenuItem,
  Divider,
  IconButton,
  Drawer,
  Grid,
  Snackbar,
  Alert,
} from "@mui/material"
import {
  ArrowBackIosNew as ArrowBackIosNewIcon,
  Translate as TranslateIcon,
  Flag as FlagIcon,
  Visibility,
  VisibilityOff,
  Email as EmailIcon,
  Lock as LockIcon,
  SupportAgent as SupportAgentIcon,
} from "@mui/icons-material"
import VisibilityIcon from "@mui/icons-material/Visibility"
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff"
import SendToMobileIcon from "@mui/icons-material/SendToMobile"
import GppGoodIcon from "@mui/icons-material/GppGood"
import { useState, useEffect } from "react"
import Mobile from "../Components/Mobile"
import { useNavigate } from "react-router-dom"
import ReactCountryFlag from "react-country-flag"
// Import Firebase authentication
// import { initializeApp } from "firebase/app"
import { 
  getAuth, 
  RecaptchaVerifier, 
  signInWithPhoneNumber, 
  updatePassword,
  PhoneAuthProvider, 
  signInWithCredential 
} from "firebase/auth"

import {app,auth} from "../firebase.config"

const ForgotPassword = () => {
  const navigate = useNavigate()
  // State to manage visibility for each password field
  const [showPassword, setShowPassword] = useState({
    newPassword: false,
    confirmNewPassword: false,
  })
  const [openDrawer, setOpenDrawer] = useState(false)
  const [selectedLanguage, setSelectedLanguage] = useState("")

  // New states for OTP verification
  const [phoneNumber, setPhoneNumber] = useState("")
  const [countryCode, setCountryCode] = useState("+91")
  const [verificationId, setVerificationId] = useState("")
  const [otp, setOtp] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isOtpSent, setIsOtpSent] = useState(false)
  const [otpButtonText, setOtpButtonText] = useState("Send")
  const [countdown, setCountdown] = useState(0)
  const [isVerified, setIsVerified] = useState(false)
  const [agreeTerms, setAgreeTerms] = useState(false)
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    severity: "info"
  })
  // Store confirmation result
  const [confirmationResult, setConfirmationResult] = useState(null)

  // Setup recaptcha verifier
  useEffect(() => {
    window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
      'size': 'invisible',
      'callback': (response) => {
        // reCAPTCHA solved, you can proceed with sending OTP
      }
    });
  }, [])

  // Countdown timer for OTP resend
  useEffect(() => {
    let interval;
    if (countdown > 0) {
      interval = setInterval(() => {
        setCountdown(countdown - 1);
        setOtpButtonText(`Resend (${countdown}s)`);
      }, 1000);
    } else if (isOtpSent) {
      setOtpButtonText("Resend");
    }
    return () => clearInterval(interval);
  }, [countdown, isOtpSent]);

  const handleLanguageSelect = (language) => {
    setSelectedLanguage(language)
    setOpenDrawer(false)
  }

  const handleRedirect = () => {
    navigate("/")
  }

  // Toggle visibility for the new password field
  const toggleNewPasswordVisibility = () => {
    setShowPassword({
      ...showPassword,
      newPassword: !showPassword.newPassword,
    })
  }

  // Toggle visibility for the confirm new password field
  const toggleConfirmNewPasswordVisibility = () => {
    setShowPassword({
      ...showPassword,
      confirmNewPassword: !showPassword.confirmNewPassword,
    })
  }

  // Handle phone number change
  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value)
  }

  // Handle country code change
  const handleCountryCodeChange = (e) => {
    setCountryCode(e.target.value)
  }

  // Handle OTP change
  const handleOtpChange = (e) => {
    setOtp(e.target.value)
  }

  // Handle password change
  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value)
  }

  // Handle confirm password change
  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value)
  }

  // Send OTP
  const sendOtp = async () => {
    if (!phoneNumber) {
      showAlert("Please enter your phone number", "error")
      return
    }

    try {
      const formattedPhoneNumber = `${countryCode}${phoneNumber}`
      const appVerifier = window.recaptchaVerifier
      
      const confirmResult = await signInWithPhoneNumber(auth, formattedPhoneNumber, appVerifier)
      setConfirmationResult(confirmResult)
      setIsOtpSent(true)
      setCountdown(60)
      showAlert("OTP sent successfully", "success")
    } catch (error) {
      console.error("Error sending OTP:", error)
      showAlert(`Error sending OTP: ${error.message}`, "error")
      // Reset recaptcha on error
      window.recaptchaVerifier.render().then(widgetId => {
        grecaptcha.reset(widgetId)
      }).catch(e => console.log("Could not reset recaptcha:", e))
    }
  }

  // Verify OTP
  const verifyOtp = async () => {
    if (!otp) {
      showAlert("Please enter the OTP", "error")
      return
    }

    try {
      // Use the stored confirmation result to confirm the code
      if (confirmationResult) {
        const result = await confirmationResult.confirm(otp)
        if (result.user) {
          setIsVerified(true)
          showAlert("OTP verified successfully", "success")
        }
      } else {
        showAlert("Please send OTP first", "error")
      }
    } catch (error) {
      console.error("Error verifying OTP:", error)
      showAlert(`Error verifying OTP: ${error.message}`, "error")
    }
  }

  // Reset password
  const resetPassword = async () => {
    if (!isVerified) {
      showAlert("Please verify your phone number first", "error")
      return
    }

    if (!newPassword || !confirmPassword) {
      showAlert("Please enter both passwords", "error")
      return
    }

    if (newPassword !== confirmPassword) {
      showAlert("Passwords do not match", "error")
      return
    }

    if (!agreeTerms) {
      showAlert("Please agree to the Privacy Agreement", "error")
      return
    }

    try {
      // Update password
      const user = auth.currentUser
      await updatePassword(user, newPassword)
      
      showAlert("Password reset successfully", "success")
      // Navigate to login page after successful reset
      setTimeout(() => {
        navigate("/")
      }, 2000)
    } catch (error) {
      console.error("Error resetting password:", error)
      showAlert(`Error resetting password: ${error.message}`, "error")
    }
  }

  // Display alert messages
  const showAlert = (message, severity) => {
    setAlert({
      open: true,
      message,
      severity
    })
  }

  // Handle alert close
  const handleAlertClose = () => {
    setAlert({
      ...alert,
      open: false
    })
  }

  return (
    <Mobile>
      <div id="recaptcha-container"></div>
      <Grid
        container
        alignItems="center"
        justifyContent="space-between"
        sx={{
          position: "sticky",
          top: 0,
          zIndex: 1000,
          background: "linear-gradient(90deg, #F95959 0%, #F95959 100%)",
          padding: "8px 16px",
          color: "black",
        }}
      >
        <Grid item xs={4} textAlign="left">
          <IconButton sx={{ color: "white" }} onClick={handleRedirect}>
            <ArrowBackIosNewIcon sx={{ fontSize: "20px" }} />
          </IconButton>
        </Grid>
        <Grid item xs={4} textAlign="center">
          <img
            src="assets/genzwinlogo.png"
            alt="logo"
            style={{ width: "120px", height: "40px" }}
          />
        </Grid>
        <Grid item xs={4} textAlign="right">
          <IconButton onClick={() => setOpenDrawer(true)} color="inherit">
            <TranslateIcon sx={{ color: "white" }} />
            {selectedLanguage && (
              <>
                {selectedLanguage === "EN" && (
                  <FlagIcon
                    component="span"
                    fontSize="small"
                    sx={{ marginLeft: "4px" }}
                  />
                )}
                {selectedLanguage === "HN" && (
                  <FlagIcon
                    component="span"
                    fontSize="small"
                    sx={{ marginLeft: "4px" }}
                  />
                )}
                <span>{selectedLanguage}</span>
              </>
            )}
          </IconButton>
        </Grid>
      </Grid>

      <Drawer
        anchor="bottom"
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
      >
        <Grid
          container
          justifyContent="space-around"
          alignItems="center"
          sx={{ padding: "10px" }}
        >
          <Button onClick={() => handleLanguageSelect("EN")}>
            <ReactCountryFlag countryCode="US" svg />
            EN
          </Button>
          <Button onClick={() => handleLanguageSelect("HN")}>
            <ReactCountryFlag countryCode="IN" svg />
            HN
          </Button>
        </Grid>
      </Drawer>

      <Box
        container
        justifyContent="flex-start"
        alignItems="flex-start"
        sx={{
          background: "linear-gradient(90deg, #F95959 0%, #F95959 100%)",
          padding: "16px",
          color: "white",
          minHeight: "fit-content",
          textAlign: "left"
        }}
        direction="column"
      >
        <Typography variant="h5">Reset Password</Typography>
        <Typography variant="subtitle2">
          Enter your phone number to reset your password
        </Typography>
      </Box>

      <Container
        disableGutters
        maxWidth="xs"
        sx={{
          bgcolor: "#f5f5f5",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box sx={{ mx: 2, mt: 1 }}>
          <Box sx={{ textAlign: "center", mb: 2 }}>
            <SendToMobileIcon sx={{ color: "#F95959" }} />
            <Typography variant="body1" sx={{ color: "#F95959" }}>
              Phone reset
            </Typography>
          </Box>

          <Divider sx={{ bgcolor: "#F95959", mb: 2 }} />

          <Box sx={{ display: "flex", mb: 1 }}>
            <SendToMobileIcon sx={{ color: "#F95959", mr: 1 }} />
            <Typography variant="body2" sx={{ color: "black", fontSize: 17 }}>
              Phone number
            </Typography>
          </Box>

          <Box sx={{ display: "flex" }}>
            <TextField
              variant="outlined"
              value={countryCode}
              onChange={handleCountryCodeChange}
              sx={{
                width: "25%",
                bgcolor: "white",
                borderRadius: 4,
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#f5f5f5",
                  },
                },
                "& ::placeholder": {
                  color: "gray",
                },
              }}
            />
            <TextField
              variant="outlined"
              placeholder="Please enter the phone number"
              value={phoneNumber}
              onChange={handlePhoneNumberChange}
              sx={{
                width: "75%",
                marginLeft: "10px",
                bgcolor: "#fff",
                borderRadius: 4,
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": {
                    borderColor: "#F95959",
                  },
                  "&:hover fieldset": {
                    borderColor: "#fff",
                  },
                  "& fieldset": {
                    borderColor: "#fff",
                    border: "none",
                  },
                },
              }}
            />
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", mb: 1, mt: 2 }}>
            <GppGoodIcon sx={{ mr: 1, color: "#F95959" }} />
            <Typography variant="body2" sx={{ color: "black", fontSize: 17 }}>
              Verification Code
            </Typography>
          </Box>

          <TextField
            fullWidth
            variant="outlined"
            placeholder="Please enter the confirmation code"
            value={otp}
            onChange={handleOtpChange}
            sx={{
              mb: 2,
              bgcolor: "#fff",
              borderRadius: 4,
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": {
                  borderColor: "#F95959",
                },
                "&:hover fieldset": {
                  borderColor: "#fff",
                },
                "& fieldset": {
                  borderColor: "#fff",
                  border: "none",
                },
              },
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Button
                    variant="contained"
                    size="medium"
                    onClick={isOtpSent && countdown === 0 ? sendOtp : isOtpSent ? null : sendOtp}
                    disabled={isOtpSent && countdown > 0}
                    sx={{
                      bgcolor: "#F95959",
                      color: "white",
                      borderRadius: 50,
                      textTransform: "capitalize",
                      px: 4,
                      py: 1,
                      "&.Mui-disabled": {
                        bgcolor: "#ffa9a9",
                        color: "white",
                      },
                    }}
                  >
                    {otpButtonText}
                  </Button>
                </InputAdornment>
              ),
            }}
          />

          <Button
            variant="contained"
            fullWidth
            onClick={verifyOtp}
            disabled={!isOtpSent || isVerified}
            sx={{
              mb: 3,
              bgcolor: isVerified ? "#4CAF50" : "#F95959",
              color: "white",
              borderRadius: 50,
              textTransform: "capitalize",
              "&:hover": { bgcolor: isVerified ? "#45a049" : "#F95959" },
              "&.Mui-disabled": {
                bgcolor: "#ffa9a9",
                color: "white",
              },
            }}
          >
            {isVerified ? "Verified ✓" : "Verify OTP"}
          </Button>

          <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
            <LockIcon sx={{ mr: 1, color: "#F95959" }} />
            <Typography variant="body2" sx={{ color: "black", fontSize: 17 }}>
              A new password
            </Typography>
          </Box>

          <TextField
            fullWidth
            variant="outlined"
            type={showPassword.newPassword ? "text" : "password"}
            placeholder="A new password"
            value={newPassword}
            onChange={handleNewPasswordChange}
            disabled={!isVerified}
            sx={{
              mb: 2,
              bgcolor: "#fff",
              borderRadius: 4,
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": {
                  borderColor: "#F95959",
                },
                "&:hover fieldset": {
                  borderColor: "#fff",
                },
                "& fieldset": {
                  borderColor: "#fff",
                  border: "none",
                },
                "&.Mui-disabled": {
                  bgcolor: "#f0f0f0",
                  "& fieldset": {
                    borderColor: "#e0e0e0",
                  },
                },
              },
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment
                  position="end"
                  onClick={isVerified ? toggleNewPasswordVisibility : null}
                  style={{ cursor: isVerified ? "pointer" : "default" }}
                >
                  {showPassword.newPassword ? (
                    <VisibilityIcon color={isVerified ? "action" : "disabled"} />
                  ) : (
                    <VisibilityOffIcon color={isVerified ? "action" : "disabled"} />
                  )}
                </InputAdornment>
              ),
            }}
          />

          <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
            <LockIcon sx={{ mr: 1, color: "#F95959" }} />
            <Typography variant="body2" sx={{ color: "black", fontSize: 17 }}>
              Confirm new password
            </Typography>
          </Box>

          <TextField
            fullWidth
            variant="outlined"
            type={showPassword.confirmNewPassword ? "text" : "password"}
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            disabled={!isVerified}
            sx={{
              mb: 2,
              bgcolor: "#fff",
              borderRadius: 4,
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": {
                  borderColor: "#F95959",
                },
                "&:hover fieldset": {
                  borderColor: "#fff",
                },
                "& fieldset": {
                  borderColor: "#fff",
                  border: "none",
                },
                "&.Mui-disabled": {
                  bgcolor: "#f0f0f0",
                  "& fieldset": {
                    borderColor: "#e0e0e0",
                  },
                },
              },
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment
                  position="end"
                  onClick={isVerified ? toggleConfirmNewPasswordVisibility : null}
                  style={{ cursor: isVerified ? "pointer" : "default" }}
                >
                  {showPassword.confirmNewPassword ? (
                    <VisibilityIcon color={isVerified ? "action" : "disabled"} />
                  ) : (
                    <VisibilityOffIcon color={isVerified ? "action" : "disabled"} />
                  )}
                </InputAdornment>
              ),
            }}
          />

          <Box sx={{ display: "flex", flexDirection: "column", mt: 3, gap: 2 }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  disabled={!isVerified}
                  sx={{
                    borderRadius: "50%",
                    width: 24,
                    height: 24,
                    ml: 2,
                    mr: 1,
                    color: "#F95959", // Default color for the checkbox
                    "&.Mui-checked": {
                      color: "#F95959", // Color when the checkbox is checked
                    },
                    "&.Mui-disabled": {
                      color: "#ffa9a9",
                    },
                  }}
                />
              }
              label={
                <Typography variant="body2" sx={{ color: isVerified ? "black" : "#a0a0a0" }}>
                  I have read and agree{" "}
                  <span style={{ color: isVerified ? "red" : "#ffa9a9" }}>[Privacy Agreement]</span>
                </Typography>
              }
            />

            <Box
              sx={{ width: "100%", display: "flex", justifyContent: "center" }}
            >
              <Button
                variant="contained"
                onClick={resetPassword}
                disabled={!isVerified || !newPassword || !confirmPassword || !agreeTerms}
                sx={{
                  width: "60%",
                  bgcolor: "#F95959",
                  color: "white",
                  textTransform: "capitalize",
                  borderRadius: 50,
                  "&:hover": { bgcolor: "#F95959" },
                  "&.Mui-disabled": {
                    bgcolor: "#ffa9a9",
                    color: "white",
                  },
                }}
              >
                Reset
              </Button>
            </Box>
          </Box>
        </Box>
      </Container>

      {/* Alert for notifications */}
      <Snackbar 
        open={alert.open} 
        autoHideDuration={6000} 
        onClose={handleAlertClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleAlertClose} 
          severity={alert.severity} 
          sx={{ width: '100%' }}
        >
          {alert.message}
        </Alert>
      </Snackbar>
    </Mobile>
  )
}

export default ForgotPassword