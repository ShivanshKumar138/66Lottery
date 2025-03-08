import React from "react";
import Mobile from "../Components/Mobile";
import IconButton from "@mui/material/IconButton";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { Box, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

function USDTBonus({ children }) {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <div>
      <Mobile>
        <Box
          display="flex"
          flexDirection="column"
          height="calc(var(--vh, 1vh) * 100)"
          position="relative"
        >
          {/* Top Bar with Back Button and Title */}
          <Grid
            container
            alignItems="center"
            justifyContent="center"
            sx={{
              position: "sticky",
              top: 0,
              zIndex: 1000,
              background: "linear-gradient(90deg, rgb(255,142,41) 0%, #FF952A 100%)",
              padding: "10px 16px",
              color: "white",
            }}
          >
            <Grid
              item
              xs={12}
              container
              alignItems="center"
              justifyContent="center"
            >
              <IconButton
                sx={{ color: "white", position: "absolute", left: 0 }}
                onClick={handleBackClick}
              >
                <ArrowBackIosNewIcon />
              </IconButton>
              <Box sx={{ textAlign: "center", fontSize:"20px" }}>
                <span>Activity Details</span>
              </Box>
            </Grid>
          </Grid>

          {/* Content Area with Only Images */}
          <Box sx={{ padding: 2, flexGrow: 1 }}>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: 2 }}>
              <img src="/assets/20240830_124037.jpg" alt="Top Banner" style={{ width: 400, height: 'auto', marginBottom: 5, marginTop: -15 }} />
            </Box>
            <Typography sx={{color:"black", fontWeight:"bold",marginBottom:1}}>Damini USDT Bonus</Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: 2 }}>
              <img src="/assets/20240907_125159.jpg" alt="Bottom Banner" style={{ width: 370, height: 'auto' }} />
            </Box>
          </Box>

          {children}
        </Box>
      </Mobile>
    </div>
  );
}

export default USDTBonus;