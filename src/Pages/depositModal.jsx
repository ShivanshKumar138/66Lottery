import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import {
  Modal,
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  LinearProgress,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import { domain } from "../Components/config";

const DepositModal = ({ open, onClose }) => {
  const [depositBonuses, setDepositBonuses] = React.useState([]);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (open) {
      axios.get(`${domain}/all-deposit-bonuses`).then((response) => {
        setDepositBonuses(response.data);
      }).catch((error) => console.error("Error fetching deposit bonuses:", error));
    }
  }, [open]);

  const handleClose = () => onClose();

  const handleDeposit = () => navigate("/recharge");

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 320,
          bgcolor: "white",
          borderRadius: 2,
          overflow: "hidden",
          boxShadow: 24,
          outline: "none"
        }}
      >
        {/* Header Section */}
        <Box
          sx={{
            position: "relative",
            background: "rgb(245,68,68)",
            padding: "16px",
            textAlign: "center",
            color: "white",
          }}
        >
          <Typography
            sx={{
              fontWeight: "bold",
              fontSize: "18px",
            }}
          >
            Extra first deposit bonus
          </Typography>
          <Typography sx={{ fontSize: "12px", marginTop: "4px" }}>
            Each account can only receive rewards once
          </Typography>
          <IconButton
            onClick={handleClose}
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              color: "white"
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>

        {/* Scrollable Bonuses Section */}
        <Box sx={{ maxHeight: "400px", overflowY: "auto", backgroundColor: "#f9f9f9", padding: "10px" }}>
          {depositBonuses.map((bonus) => (
            <Card
              key={bonus._id}
              sx={{
                mb: 1,
                borderRadius: 2,
                boxShadow: "none",
                border: "1px solid #e0e0e0",
                backgroundColor: "white",
              }}
            >
              <CardContent sx={{ padding: "12px 16px" }}>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={0.5}>
                  <Typography sx={{ fontSize: "14px", fontWeight: "bold" }}>
                    First deposit{" "}
                    <Typography component="span" sx={{ color: "#FF8C00", fontWeight: "bold" }}>
                      ₹{bonus.minimumDeposit}
                    </Typography>
                  </Typography>
                  <Typography sx={{ color: "#FF8C00", fontWeight: "bold", fontSize: "14px" }}>
                    + ₹{bonus.bonus}
                  </Typography>
                </Box>
                <Typography sx={{ fontSize: "12px", color: "#7B7B7B", marginBottom: "8px" }}>
                  Deposit ₹{bonus.minimumDeposit} for the first time and you will receive ₹{bonus.bonus} bonus
                </Typography>
                <Box display="flex" alignItems="center">
                  <LinearProgress
                    variant="determinate"
                    value={0}
                    sx={{
                      flexGrow: 1,
                      height: 6,
                      borderRadius: 3,
                      backgroundColor: "#e0e0e0",
                      "& .MuiLinearProgress-bar": {
                        background: "linear-gradient(90deg, #FF8C00, #FF8C00)",
                      }
                    }}
                  />
                  <Typography sx={{ fontSize: "10px", fontWeight: "bold", color: "#FF8C00", marginLeft: "8px" }}>
                    0/{bonus.minimumDeposit}
                  </Typography>
                  <Button
                    sx={{
                      ml: 2,
                      backgroundColor: "rgb(245,68,68)",
                      color: "white",
                      fontSize: "12px",
                      height: "30px",
                      minWidth: "70px",
                      "&:hover": {
                        backgroundColor: "rgb(245,68,68)",
                      }
                    }}
                    onClick={handleDeposit}
                  >
                    Deposit
                  </Button>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Box>
    </Modal>
  );
};

DepositModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default DepositModal;
