import React, { useState , useEffect,useCallback} from "react";
import { AppBar, Tabs, Tab, Grid, Box ,} from "@mui/material";
import {
  Typography,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { domain } from "../Components/config";
import axios from "axios";
import { styled } from "@mui/material/styles";
import jdb from "../../public/tabsIcon/JDB.svg";
import jilli from "../../public/tabsIcon/JILLI.svg";
import TopBet from "../../public/tabsIcon/TopBet.svg";
import {TextField, InputAdornment, Toolbar } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
const TabPanel = ({ children, value, index }) => {
  return (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
};

const App = () => {

  const navigate=useNavigate();
  const navigateToPage = () => {
    navigate("/home"); // Replace '/path-to-page' with the actual path
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);


    // setTimeout(() => {
    //   setTabValue((prev) => (prev + 1));
    // }, 800); // Adjust delay as needed
  };
  const [tabValue, setTabValue] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [firstDepositMade, setFirstDepositMade] = useState(true);
  const [needToDepositFirst, setNeedToDepositFirst] = useState(false);
  const [phoneUserUid, setPhoneUserUid] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedGame, setSelectedGame] = useState(null);
  const [gameType, setGameType] = useState("");
  const [isDepositCheckLoading, setIsDepositCheckLoading] = useState(true);
  const [hasDeposit, setHasDeposit] = useState(false);
  // const totalTabs = 10; // Change this to the actual number of tabs
  
 
  const tabsRef = useRef(null);

  const StyledDialog = styled(Dialog)(({ theme }) => ({
    "& .MuiDialog-paper": {
      width: "70%",
      maxWidth: "330px",
      borderRadius: "15px",
      overflow: "hidden",
      boxShadow: "0 8px 32px rgba(0, 0, 0, 0.15)",
    },
  }));

  const StyledDialogTitle = styled(DialogTitle)(({ theme }) => ({
    backgroundColor: "#4c8eff",
    color: "white",
    padding: theme.spacing(1.5),
  }));

  const StyledDialogContent = styled(DialogContent)(({ theme }) => ({
    padding: theme.spacing(2.5),
  }));

  const StyledDialogActions = styled(DialogActions)(({ theme }) => ({
    padding: theme.spacing(2, 3),
    backgroundColor: "#f5f5f5",
  }));

  const StyledButton = styled(Button)(({ theme }) => ({
    borderRadius: "10px",
    padding: theme.spacing(1, 2),
    textTransform: "none",
    // fontWeight: "bold",
  }));
const RechargeDialog = ({ open, onClose, onConfirm, selectedGame }) => {
  return (
    <StyledDialog open={open} onClose={onClose}>
      <StyledDialogTitle>
        <Typography variant="h6" component="div" fontWeight="bold">
          Recharge Required
        </Typography>
      </StyledDialogTitle>
      <StyledDialogContent>
        <Typography sx={{ marginTop: "0.5rem" }} variant="body1" gutterBottom>
          To enter{" "}
          <Box component="span" fontWeight="bold">
            {selectedGame?.game}
          </Box>
          , you need to make a deposit first.
        </Typography>
        <Typography variant="body2" color="text.secondary" mt={2}>
          Recharging your account will allow you to enjoy all the exciting
          features of our games!
        </Typography>
      </StyledDialogContent>
      <StyledDialogActions>
        <StyledButton onClick={onClose} color="inherit">
          Cancel
        </StyledButton>
        <StyledButton
          onClick={onConfirm}
          variant="contained"
          style={{ backgroundColor: "#4c8eff", color: "white" }}
        >
          Recharge Now
        </StyledButton>
      </StyledDialogActions>
    </StyledDialog>
  );
};




useEffect(() => {
  const checkDepositStatus = async () => {
    setIsDepositCheckLoading(true);
    try {
      const token = sessionStorage.getItem('token'); // Assuming the token is stored in localStorage
      const userResponse = await axios.get(`${domain}/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const depositResponse = await axios.get(`${domain}/need-to-deposit-first`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      const hasFirstDeposit = userResponse?.data?.user?.firstDepositMade;
      const needsDeposit = depositResponse?.data?.data?.needToDepositFirst;

      setFirstDepositMade(hasFirstDeposit);
      setNeedToDepositFirst(needsDeposit);
      setHasDeposit(!needsDeposit || hasFirstDeposit);
    } catch (error) {
      console.error("Error checking deposit status:", error);
      // Default to requiring deposit on error
      setHasDeposit(false);
    } finally {
      setIsDepositCheckLoading(false);
    }
  };

  checkDepositStatus();
}, []);
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  
  const flashGames = [
    { imageSrc: "/assets/games/jili/JL_260x380_GameID464_en-US.png", gameId: "464" },
    { imageSrc: "/assets/games/jili/JL_260x380_GameID404_en-US.png", gameId: "404" },
    { imageSrc: "/assets/games/jili/JL_260x380_GameID259_en-US.png", gameId: "259" },
    { imageSrc: "/assets/games/jili/JL_260x380_GameID427_en-US.png", gameId: "427" },
    { imageSrc: "/assets/games/jili/JL_260x380_GameID441_en-US.png", gameId: "441" },
    { imageSrc: "/assets/games/jili/JL_260x380_GameID439_en-US.png", gameId: "439" },
    { imageSrc: "/assets/games/jili/JL_260x380_GameID439_en-US.png", gameId: "439" },
    { imageSrc: "/assets/games/jili/JL_260x380_GameID439_en-US.png", gameId: "439" },
    { imageSrc: "/assets/games/jili/JL_260x380_GameID372_en-US.png", gameId: "372" },
    { imageSrc: "/assets/games/jili/JL_260x380_GameID440_en-US.png", gameId: "440" },
    { imageSrc: "/assets/games/jili/JL_260x380_GameID302_en-US.png", gameId: "302" },
    { imageSrc: "/assets/games/jili/JL_260x380_GameID400_en-US.png", gameId: "400" },
    { imageSrc: "/assets/games/jili/JL_260x380_GameID407_en-US.png", gameId: "407" },
    { imageSrc: "/assets/games/jili/JL_260x380_GameID399_en-US.png", gameId: "399" },
    { imageSrc: "/assets/games/jili/JL_260x380_GameID301_en-US.png", gameId: "301" },
    { imageSrc: "/assets/games/jili/JL_260x380_GameID258_en-US.png", gameId: "258" },
    { imageSrc: "/assets/games/jili/JL_260x380_GameID420_en-US.png", gameId: "420" },
    { imageSrc: "/assets/games/jili/JL_260x380_GameID074_en-US.png", gameId: "074" },
    { imageSrc: "/assets/games/jili/JL_260x380_GameID223_en-US.png", gameId: "223" },
    { imageSrc: "/assets/games/jili/JL_260x380_GameID240_en-US.png", gameId: "240" },
    { imageSrc: "/assets/games/jili/JL_260x380_GameID180_en-US.png", gameId: "180" },
    { imageSrc: "/assets/games/jili/JL_260x380_GameID300_en-US.png", gameId: "300" },
    { imageSrc: "/assets/games/jili/JL_260x380_GameID262_en-US.png", gameId: "262" },
    { imageSrc: "/assets/games/jili/JL_260x380_GameID403_en-US.png", gameId: "403" },
    { imageSrc: "/assets/games/jili/JL_260x380_GameID389_en-US.png", gameId: "389" },
    { imageSrc: "/assets/games/jili/JL_260x380_GameID464_en-US.png", gameId: "464" },
    { imageSrc: "/assets/games/jili/JL_260x380_GameID397_en-US.png", gameId: "397" },
    { imageSrc: "/assets/games/jili/JL_260x380_GameID299_en-US.png", gameId: "299" },
    { imageSrc: "/assets/games/jili/JL_260x380_GameID464_en-US.png", gameId: "464" },
    { imageSrc: "/assets/games/jili/JL_260x380_GameID264_en-US.png", gameId: "264" },
    { imageSrc: "/assets/games/jili/JL_260x380_GameID263_en-US.png", gameId: "263" },
    { imageSrc: "/assets/games/jili/260x380_EN_GAMEID_300.png", gameId: "300" },
    { imageSrc: "/assets/games/jili/260x380_EN_GAMEID_252.png", gameId: "252" },
    { imageSrc: "/assets/games/jili/GAMEID_231_EN_260x380.png", gameId: "231" },
    { imageSrc: "/assets/games/jili/260x380_EN_GAMEID_114.png", gameId: "114" },
    { imageSrc: "/assets/games/jili/260x380_EN_GAMEID_153.png", gameId: "153" },
    { imageSrc: "/assets/games/jili/260x380_EN_GAMEID_253.png", gameId: "253" },
    { imageSrc: "/assets/games/jili/260x380_EN_GAMEID_259.png", gameId: "259" },
    { imageSrc: "/assets/games/jili/260x380_EN_GAMEID_301.png", gameId: "301" },
    { imageSrc: "/assets/games/jili/260x380_EN_GAMEID_220.png", gameId: "220" },
    { imageSrc: "/assets/games/jili/260x380_EN_GAMEID_226.png", gameId: "226" },
    { imageSrc: "/assets/games/jili/GAMEID_132_EN_260x380.png", gameId: "132" },
    { imageSrc: "/assets/games/jili/260x380_EN_GAMEID_298.png", gameId: "298" },
    { imageSrc: "/assets/games/jili/260x380_EN_GAMEID_209.png", gameId: "209" },
    { imageSrc: "/assets/games/jili/260x380_EN_GAMEID_238.png", gameId: "238" },
    { imageSrc: "/assets/games/jili/260x380_EN_GAMEID_208.png", gameId: "208" },
    { imageSrc: "/assets/games/jili/260x380_EN_GAMEID_254.png", gameId: "254" },
    { imageSrc: "/assets/games/jili/260x380_EN_GAMEID_211.png", gameId: "211" },
];

const slotGames= [
{ imageSrc: "/assets/jdb/JDB_0_14095.png", gameId: "JDB_0_14095" },
{ imageSrc: "/assets/jdb/JDB_0_14093.png", gameId: "JDB_0_14093" },
{ imageSrc: "/assets/jdb/JDB_0_14094.png", gameId: "JDB_0_14094" },
{ imageSrc: "/assets/jdb/JDB_0_14092.png", gameId: "JDB_0_14092" },
{ imageSrc: "/assets/jdb/JDB_0_14088.png", gameId: "JDB_0_14088" },
{ imageSrc: "/assets/jdb/JDB_0_14091.png", gameId: "JDB_0_14091" },
{ imageSrc: "/assets/jdb/JDB_7_7008.png", gameId: "JDB_7_7008" },
{ imageSrc: "/assets/jdb/JDB_9_9019.png", gameId: "JDB_9_9019" },
{ imageSrc: "/assets/jdb/JDB_0_14090.png", gameId: "JDB_0_14090" },
{ imageSrc: "/assets/jdb/JDB_9_9018.png", gameId: "JDB_9_9018" },
{ imageSrc: "/assets/jdb/JDB_7_7009.png", gameId: "JDB_7_7009" },
{ imageSrc: "/assets/jdb/JDB_0_14089.png", gameId: "JDB_0_14089" },
{ imageSrc: "/assets/jdb/JDB_0_14087.png", gameId: "JDB_0_14087" },
{ imageSrc: "/assets/jdb/JDB_0_14086.png", gameId: "JDB_0_14086" },
{ imageSrc: "/assets/jdb/JDB_7_7007.png", gameId: "JDB_7_7007" },
{ imageSrc: "/assets/jdb/JDB_7_7006.png", gameId: "JDB_7_7006" },
{ imageSrc: "/assets/jdb/JDB_7_7005.png", gameId: "JDB_7_7005" },
{ imageSrc: "/assets/jdb/JDB_7_7004.png", gameId: "JDB_7_7004" },
{ imageSrc: "/assets/jdb/JDB_7_7003.png", gameId: "JDB_7_7003" },
{ imageSrc: "/assets/jdb/JDB_7_7002.png", gameId: "JDB_7_7002" },
{ imageSrc: "/assets/jdb/JDB_7_7001.png", gameId: "JDB_7_7001" },
{ imageSrc: "/assets/jdb/JDB_9_9012.png", gameId: "JDB_9_9012" },
{ imageSrc: "/assets/jdb/JDB_0_14085.png", gameId: "JDB_0_14085" },
{ imageSrc: "/assets/jdb/JDB_9_9011.png", gameId: "JDB_9_9011" },
{ imageSrc: "/assets/jdb/JDB_9_9010.png", gameId: "JDB_9_9010" },
{ imageSrc: "/assets/jdb/JDB_9_9009.png", gameId: "JDB_9_9009" },
{ imageSrc: "/assets/jdb/JDB_9_9008.png", gameId: "JDB_9_9008" },
{ imageSrc: "/assets/jdb/JDB_9_9007.png", gameId: "JDB_9_9007" },
{ imageSrc: "/assets/jdb/JDB_9_9006.png", gameId: "JDB_9_9006" },
{ imageSrc: "/assets/jdb/JDB_9_9004.png", gameId: "JDB_9_9004" },
{ imageSrc: "/assets/jdb/JDB_9_9003.png", gameId: "JDB_9_9003" },
{ imageSrc: "/assets/jdb/JDB_9_9002.png", gameId: "JDB_9_9002" },
{ imageSrc: "/assets/jdb/JDB_9_9001.png", gameId: "JDB_9_9001" },
{ imageSrc: "/assets/jdb/JDB_0_14084.png", gameId: "JDB_0_14084" },
{ imageSrc: "/assets/jdb/JDB_0_14083.png", gameId: "JDB_0_14083" },
{ imageSrc: "/assets/jdb/JDB_0_14082.png", gameId: "JDB_0_14082" },
{ imageSrc: "/assets/jdb/JDB_0_14080.png", gameId: "JDB_0_14080" },
{ imageSrc: "/assets/jdb/JDB_0_14081.png", gameId: "JDB_0_14081" },
{ imageSrc: "/assets/jdb/JDB_0_14079.png", gameId: "JDB_0_14079" },
{ imageSrc: "/assets/jdb/JDB_0_14077.png", gameId: "JDB_0_14077" },
{ imageSrc: "/assets/jdb/JDB_0_14075.png", gameId: "JDB_0_14075" },
{ imageSrc: "/assets/jdb/JDB_0_14070.png", gameId: "JDB_0_14070" },
{ imageSrc: "/assets/jdb/JDB_0_14068.png", gameId: "JDB_0_14068" },
{ imageSrc: "/assets/jdb/JDB_0_14067.png", gameId: "JDB_0_14067" },
{ imageSrc: "/assets/jdb/JDB_0_14065.png", gameId: "JDB_0_14065" },
{ imageSrc: "/assets/jdb/JDB_0_14064.png", gameId: "JDB_0_14064" },
{ imageSrc: "/assets/jdb/JDB_0_14063.png", gameId: "JDB_0_14063" },
{ imageSrc: "/assets/jdb/JDB_0_14061.png", gameId: "JDB_0_14061" },
{ imageSrc: "/assets/jdb/JDB_0_14060.png", gameId: "JDB_0_14060" },
{ imageSrc: "/assets/jdb/JDB_0_14059.png", gameId: "JDB_0_14059" },
{ imageSrc: "/assets/jdb/JDB_0_14058.png", gameId: "JDB_0_14058" },
{ imageSrc: "/assets/jdb/JDB_0_14055.png", gameId: "JDB_0_14055" },
{ imageSrc: "/assets/jdb/JDB_0_14054.png", gameId: "JDB_0_14054" },
{ imageSrc: "/assets/jdb/JDB_0_14053.png", gameId: "JDB_0_14053" },
{ imageSrc: "/assets/jdb/JDB_0_14052.png", gameId: "JDB_0_14052" },
{ imageSrc: "/assets/jdb/JDB_0_14051.png", gameId: "JDB_0_14051" },
{ imageSrc: "/assets/jdb/JDB_0_14050.png", gameId: "JDB_0_14050" },
{ imageSrc: "/assets/jdb/JDB_0_14048.png", gameId: "JDB_0_14048" },
{ imageSrc: "/assets/jdb/JDB_0_14047.png", gameId: "JDB_0_14047" },
{ imageSrc: "/assets/jdb/JDB_0_14046.png", gameId: "JDB_0_14046" },
{ imageSrc: "/assets/jdb/JDB_0_14045.png", gameId: "JDB_0_14045" },
{ imageSrc: "/assets/jdb/JDB_0_14044.png", gameId: "JDB_0_14044" },
{ imageSrc: "/assets/jdb/JDB_0_14043.png", gameId: "JDB_0_14043" },
{ imageSrc: "/assets/jdb/JDB_0_14042.png", gameId: "JDB_0_14042" },
{ imageSrc: "/assets/jdb/JDB_0_14041.png", gameId: "JDB_0_14041" },
{ imageSrc: "/assets/jdb/JDB_0_14040.png", gameId: "JDB_0_14040" },
{ imageSrc: "/assets/jdb/JDB_0_14039.png", gameId: "JDB_0_14039" },
{ imageSrc: "/assets/jdb/JDB_0_14038.png", gameId: "JDB_0_14038" },
{ imageSrc: "/assets/jdb/JDB_0_14036.png", gameId: "JDB_0_14036" },
{ imageSrc: "/assets/jdb/JDB_0_14035.png", gameId: "JDB_0_14035" },
{ imageSrc: "/assets/jdb/JDB_0_14034.png", gameId: "JDB_0_14034" },
{ imageSrc: "/assets/jdb/JDB_0_14033.png", gameId: "JDB_0_14033" },
{ imageSrc: "/assets/jdb/JDB_0_14030.png", gameId: "JDB_0_14030" },
{ imageSrc: "/assets/jdb/JDB_0_14029.png", gameId: "JDB_0_14029" },
{ imageSrc: "/assets/jdb/JDB_0_14027.png", gameId: "JDB_0_14027" },
{ imageSrc: "/assets/jdb/JDB_0_14025.png", gameId: "JDB_0_14025" },
{ imageSrc: "/assets/jdb/JDB_0_14022.png", gameId: "JDB_0_14022" },
{ imageSrc: "/assets/jdb/JDB_0_14021.png", gameId: "JDB_0_14021" },
{ imageSrc: "/assets/jdb/JDB_0_14018.png", gameId: "JDB_0_14018" },
{ imageSrc: "/assets/jdb/JDB_0_14016.png", gameId: "JDB_0_14016" },
{ imageSrc: "/assets/jdb/JDB_0_14012.png", gameId: "JDB_0_14012" },
{ imageSrc: "/assets/jdb/JDB_0_14010.png", gameId: "JDB_0_14010" },
{ imageSrc: "/assets/jdb/JDB_0_14008.png", gameId: "JDB_0_14008" },
{ imageSrc: "/assets/jdb/JDB_0_14007.png", gameId: "JDB_0_14007" },
{ imageSrc: "/assets/jdb/JDB_0_14006.png", gameId: "JDB_0_14006" },
{ imageSrc: "/assets/jdb/JDB_0_14005.png", gameId: "JDB_0_14005" },
{ imageSrc: "/assets/jdb/JDB_0_14003.png", gameId: "JDB_0_14003" },
{ imageSrc: "/assets/jdb/JDB_0_15012.png", gameId: "JDB_0_15012" },
{ imageSrc: "/assets/jdb/JDB_0_15010.png", gameId: "JDB_0_15010" },
{ imageSrc: "/assets/jdb/JDB_0_15005.png", gameId: "JDB_0_15005" },
{ imageSrc: "/assets/jdb/JDB_0_15002.png", gameId: "JDB_0_15002" },
{ imageSrc: "/assets/jdb/JDB_0_15001.png", gameId: "JDB_0_15001" },
{ imageSrc: "/assets/jdb/JDB_0_8051.png", gameId: "JDB_0_8051" },
{ imageSrc: "/assets/jdb/JDB_0_8050.png", gameId: "JDB_0_8050" },
{ imageSrc: "/assets/jdb/JDB_0_8049.png", gameId: "JDB_0_8049" },
{ imageSrc: "/assets/jdb/JDB_0_8048.png", gameId: "JDB_0_8048" },
{ imageSrc: "/assets/jdb/JDB_0_8047.png", gameId: "JDB_0_8047" },
{ imageSrc: "/assets/jdb/JDB_0_8046.png", gameId: "JDB_0_8046" },
{ imageSrc: "/assets/jdb/JDB_0_8044.png", gameId: "JDB_0_8044" },
{ imageSrc: "/assets/jdb/JDB_0_8035.png", gameId: "JDB_0_8035" },
{ imageSrc: "/assets/jdb/JDB_0_8028.png", gameId: "JDB_0_8028" },
{ imageSrc: "/assets/jdb/JDB_0_8023.png", gameId: "JDB_0_8023" },
{ imageSrc: "/assets/jdb/JDB_0_8022.png", gameId: "JDB_0_8022" },
{ imageSrc: "/assets/jdb/JDB_0_8021.png", gameId: "JDB_0_8021" },
{ imageSrc: "/assets/jdb/JDB_0_8020.png", gameId: "JDB_0_8020" },
{ imageSrc: "/assets/jdb/JDB_0_8019.png", gameId: "JDB_0_8019" },
{ imageSrc: "/assets/jdb/JDB_0_8018.png", gameId: "JDB_0_8018" },
{ imageSrc: "/assets/jdb/JDB_0_8017.png", gameId: "JDB_0_8017" },
{ imageSrc: "/assets/jdb/JDB_0_8014.png", gameId: "JDB_0_8014" },
{ imageSrc: "/assets/jdb/JDB_0_8007.png", gameId: "JDB_0_8007" },
{ imageSrc: "/assets/jdb/JDB_0_8005.png", gameId: "JDB_0_8005" },
{ imageSrc: "/assets/jdb/JDB_0_8004.png", gameId: "JDB_0_8004" },
{ imageSrc: "/assets/jdb/JDB_0_8003.png", gameId: "JDB_0_8003" },
{ imageSrc: "/assets/jdb/JDB_0_8002.png", gameId: "JDB_0_8002" },
{ imageSrc: "/assets/jdb/JDB_0_8001.png", gameId: "JDB_0_8001" },
];

const popularGames = [
{ imageSrc: "/assets/games/800.jpg", gameId: 800 },
{ imageSrc: "/assets/games/801.jpg", gameId: 801 },
{ imageSrc: "/assets/games/802.jpg", gameId: 802 },
{ imageSrc: "/assets/games/902.jpg", gameId: 902 },
{ imageSrc: "/assets/games/904.jpg", gameId: 904 },
{ imageSrc: "/assets/games/905.jpg", gameId: 905 },
{ imageSrc: "/assets/games/111.jpg", gameId: 111 },
{ imageSrc: "/assets/games/100.jpg", gameId: 100 },
{ imageSrc: "/assets/games/103.jpg", gameId: 103 },
{ imageSrc: "/assets/games/810.jpg", gameId: 810 },
{ imageSrc: "/assets/games/115.jpg", gameId: 115 },
{ imageSrc: "/assets/games/101.jpg", gameId: 101 },
{ imageSrc: "/assets/games/104.jpg", gameId: 104 },
{ imageSrc: "/assets/games/108.jpg", gameId: 108 },
{ imageSrc: "/assets/games/900.jpg", gameId: 900 },
{ imageSrc: "/assets/games/105.jpg", gameId: 105 },
{ imageSrc: "/assets/games/102.jpg", gameId: 102 },
{ imageSrc: "/assets/games/109.jpg", gameId: 109 },
{ imageSrc: "/assets/games/114.jpg", gameId: 114 },
{ imageSrc: "/assets/games/112.jpg", gameId: 112 },
{ imageSrc: "/assets/games/113.jpg", gameId: 113 },
];

    const evolution = [
    
      { imageSrc: "/assets/evolution/EVOLIVE_pezjou3ltf6hvzjk.png", gameId: "EVOLIVE_pezjou3ltf6hvzjk" },
      { imageSrc: "/assets/evolution/EVOLIVE_pv2zgy42anvdwk3l.png", gameId: "EVOLIVE_pv2zgy42anvdwk3l" },
      { imageSrc: "/assets/evolution/EVOLIVE_pv2y4kmsanvdvwgy.png", gameId: "EVOLIVE_pv2y4kmsanvdvwgy" },
      { imageSrc: "/assets/evolution/EVOLIVE_easybj0000000001.png", gameId: "EVOLIVE_easybj0000000001" },
      { imageSrc: "/assets/evolution/EVOLIVE_scabetstack00001.png", gameId: "EVOLIVE_scabetstack00001" },
      { imageSrc: "/assets/evolution/EVOLIVE_CrazyBalls000001.png", gameId: "EVOLIVE_CrazyBalls000001" },
      { imageSrc: "/assets/evolution/EVOLIVE_SalPrivBJ0000015.png", gameId: "EVOLIVE_SalPrivBJ0000015" },
      { imageSrc: "/assets/evolution/EVOLIVE_SalPrivBJ0000016.png", gameId: "EVOLIVE_SalPrivBJ0000016" },
      { imageSrc: "/assets/evolution/EVOLIVE_SalPrivBJ0000017.png", gameId: "EVOLIVE_SalPrivBJ0000017" },
      { imageSrc: "/assets/evolution/EVOLIVE_Always8baccarat0.png", gameId: "EVOLIVE_Always8baccarat0" },
      { imageSrc: "/assets/evolution/EVOLIVE_livespins3000000.png", gameId: "EVOLIVE_livespins3000000" },
      { imageSrc: "/assets/evolution/EVOLIVE_livespins2000000.png", gameId: "EVOLIVE_livespins2000000" },
      { imageSrc: "/assets/evolution/EVOLIVE_livespins1000000.png", gameId: "EVOLIVE_livespins1000000" },
      { imageSrc: "/assets/evolution/EVOLIVE_livespins0000000.png", gameId: "EVOLIVE_livespins0000000" },
      { imageSrc: "/assets/evolution/EVOLIVE_lightningsb00001.png", gameId: "EVOLIVE_lightningsb00001" },
      { imageSrc: "/assets/evolution/EVOLIVE_LightningHindi01.png", gameId: "EVOLIVE_LightningHindi01" },
      { imageSrc: "/assets/evolution/EVOLIVE_774SuperSpeedBac.png", gameId: "EVOLIVE_774SuperSpeedBac" },
      { imageSrc: "/assets/evolution/EVOLIVE_sbjfunfun2100001.png", gameId: "EVOLIVE_sbjfunfun2100001" },
      { imageSrc: "/assets/evolution/EVOLIVE_PlatPrivBJ000003.png", gameId: "EVOLIVE_PlatPrivBJ000003" },
      { imageSrc: "/assets/evolution/EVOLIVE_PlatPrivBJ000001.png", gameId: "EVOLIVE_PlatPrivBJ000001" },
      { imageSrc: "/assets/evolution/EVOLIVE_PlatPrivBJ000002.png", gameId: "EVOLIVE_PlatPrivBJ000002" },
      { imageSrc: "/assets/evolution/EVOLIVE_LightningStorm01.png", gameId: "EVOLIVE_LightningStorm01" },
      { imageSrc: "/assets/evolution/EVOLIVE_blackjack.png", gameId: "EVOLIVE_blackjack" },
      { imageSrc: "/assets/evolution/EVOLIVE_roulette.png", gameId: "EVOLIVE_roulette" },
      { imageSrc: "/assets/evolution/EVOLIVE_top_games.png", gameId: "EVOLIVE_top_games" },
      { imageSrc: "/assets/evolution/EVOLIVE_poker.png", gameId: "EVOLIVE_poker" },
      { imageSrc: "/assets/evolution/EVOLIVE_baccarat_sicbo.png", gameId: "EVOLIVE_baccarat_sicbo" },
      { imageSrc: "/assets/evolution/EVOLIVE_game_shows.png", gameId: "EVOLIVE_game_shows" },
      { imageSrc: "/assets/evolution/EVOLIVE_qhhjdnovai4a3a6k.png", gameId: "EVOLIVE_qhhjdnovai4a3a6k" },
      { imageSrc: "/assets/evolution/EVOLIVE_CrazyTime0000002.png", gameId: "EVOLIVE_CrazyTime0000002" },
      { imageSrc: "/assets/evolution/EVOLIVE_HSpeedBac0000002.png", gameId: "EVOLIVE_HSpeedBac0000002" },
      { imageSrc: "/assets/evolution/EVOLIVE_2uxabtm1rwaxcmdm.png", gameId: "EVOLIVE_2uxabtm1rwaxcmdm" },
      { imageSrc: "/assets/evolution/EVOLIVE_q6wo7mqrrnlhuj6b.png", gameId: "EVOLIVE_q6wo7mqrrnlhuj6b" },
      { imageSrc: "/assets/evolution/EVOLIVE_TRPTable00000001.png", gameId: "EVOLIVE_TRPTable00000001" },
      { imageSrc: "/assets/evolution/EVOLIVE_RedDoorRoulette1.png", gameId: "EVOLIVE_RedDoorRoulette1" },
      { imageSrc: "/assets/evolution/EVOLIVE_MonBigBaller0001.png", gameId: "EVOLIVE_MonBigBaller0001" },
      { imageSrc: "/assets/evolution/EVOLIVE_rng-topcard00001.png", gameId: "EVOLIVE_rng-topcard00001" },
      { imageSrc: "/assets/evolution/EVOLIVE_RngSicbo00000001.png", gameId: "EVOLIVE_RngSicbo00000001" },
      { imageSrc: "/assets/evolution/EVOLIVE_rng-rt-european0.png", gameId: "EVOLIVE_rng-rt-european0" },
      { imageSrc: "/assets/evolution/EVOLIVE_RngMegaBall00001.png", gameId: "EVOLIVE_RngMegaBall00001" },
      { imageSrc: "/assets/evolution/EVOLIVE_rng-bj-lightning.png", gameId: "EVOLIVE_rng-bj-lightning" },
      { imageSrc: "/assets/evolution/EVOLIVE_rng-dragontiger0.png", gameId: "EVOLIVE_rng-dragontiger0" },
      { imageSrc: "/assets/evolution/EVOLIVE_RngDealNoDeal001.png", gameId: "EVOLIVE_RngDealNoDeal001" },
      { imageSrc: "/assets/evolution/EVOLIVE_RngCraps00000001.png", gameId: "EVOLIVE_RngCraps00000001" },
      { imageSrc: "/assets/evolution/EVOLIVE_rng-bj-standard0.png", gameId: "EVOLIVE_rng-bj-standard0" },
      { imageSrc: "/assets/evolution/EVOLIVE_FanTan0000000001.png", gameId: "EVOLIVE_FanTan0000000001" },
      { imageSrc: "/assets/evolution/EVOLIVE_XxxtremeLigh0001.png", gameId: "EVOLIVE_XxxtremeLigh0001" },
      { imageSrc: "/assets/evolution/EVOLIVE_wzg6kdkad1oe7m5k.png", gameId: "EVOLIVE_wzg6kdkad1oe7m5k" },
      { imageSrc: "/assets/evolution/EVOLIVE_THBTable00000001.png", gameId: "EVOLIVE_THBTable00000001" },
      { imageSrc: "/assets/evolution/EVOLIVE_SuperSicBo000001.png", gameId: "EVOLIVE_SuperSicBo000001" },
      { imageSrc: "/assets/evolution/EVOLIVE_vctlz20yfnmp1ylr.png", gameId: "EVOLIVE_vctlz20yfnmp1ylr" },
      { imageSrc: "/assets/evolution/EVOLIVE_NoCommBac0000001.png", gameId: "EVOLIVE_NoCommBac0000001" },
      { imageSrc: "/assets/evolution/EVOLIVE_Monopoly00000001.png", gameId: "EVOLIVE_Monopoly00000001" },
      { imageSrc: "/assets/evolution/EVOLIVE_MegaBall00000001.png", gameId: "EVOLIVE_MegaBall00000001" },
      { imageSrc: "/assets/evolution/EVOLIVE_LightningTable01.png", gameId: "EVOLIVE_LightningTable01" },
      { imageSrc: "/assets/evolution/EVOLIVE_LightningDice001.png", gameId: "EVOLIVE_LightningDice001" },
      { imageSrc: "/assets/evolution/EVOLIVE_LightningSbj0001.png", gameId: "EVOLIVE_LightningSbj0001" },
      { imageSrc: "/assets/evolution/EVOLIVE_LightningBac0001.png", gameId: "EVOLIVE_LightningBac0001" },
      { imageSrc: "/assets/evolution/EVOLIVE_InstantRo0000001.png", gameId: "EVOLIVE_InstantRo0000001" },
      { imageSrc: "/assets/evolution/EVOLIVE_7x0b1tgh7agmf6hv.png", gameId: "EVOLIVE_7x0b1tgh7agmf6hv" },
      { imageSrc: "/assets/evolution/EVOLIVE_otctxzr5fjyggijz.png", gameId: "EVOLIVE_otctxzr5fjyggijz" },
      { imageSrc: "/assets/evolution/EVOLIVE_gwbaccarat000001.png", gameId: "EVOLIVE_gwbaccarat000001" },
      { imageSrc: "/assets/evolution/EVOLIVE_FreeBet000000001.png", gameId: "EVOLIVE_FreeBet000000001" },
      { imageSrc: "/assets/evolution/EVOLIVE_TopCard000000001.png", gameId: "EVOLIVE_TopCard000000001" },
      { imageSrc: "/assets/evolution/EVOLIVE_rng-lbaccarat000.png", gameId: "EVOLIVE_rng-lbaccarat000" },
      { imageSrc: "/assets/evolution/EVOLIVE_rng-gwbaccarat00.png", gameId: "EVOLIVE_rng-gwbaccarat00" },
      { imageSrc: "/assets/evolution/EVOLIVE_rng-dreamcatcher.png", gameId: "EVOLIVE_rng-dreamcatcher" },
      { imageSrc: "/assets/evolution/EVOLIVE_rngbaccarat00000.png", gameId: "EVOLIVE_rngbaccarat00000" },
      { imageSrc: "/assets/evolution/EVOLIVE_ETHTable00000001.png", gameId: "EVOLIVE_ETHTable00000001" },
      { imageSrc: "/assets/evolution/EVOLIVE_MOWDream00000001.png", gameId: "EVOLIVE_MOWDream00000001" },
      { imageSrc: "/assets/evolution/EVOLIVE_DragonTiger00001.png", gameId: "EVOLIVE_DragonTiger00001" },
      { imageSrc: "/assets/evolution/EVOLIVE_DoubleBallRou001.png", gameId: "EVOLIVE_DoubleBallRou001" },
      { imageSrc: "/assets/evolution/EVOLIVE_CrazyTime0000001.png", gameId: "EVOLIVE_CrazyTime0000001" },
      { imageSrc: "/assets/evolution/EVOLIVE_Craps00000000001.png", gameId: "EVOLIVE_Craps00000000001" },
      { imageSrc: "/assets/evolution/EVOLIVE_HoldemTable00001.png", gameId: "EVOLIVE_HoldemTable00001" },
      { imageSrc: "/assets/evolution/EVOLIVE_CSPTable00000001.png", gameId: "EVOLIVE_CSPTable00000001" },
      { imageSrc: "/assets/evolution/EVOLIVE_zixzea8nrf1675oh.png", gameId: "EVOLIVE_zixzea8nrf1675oh" },
      { imageSrc: "/assets/evolution/EVOLIVE_k2oswnib7jjaaznw.png", gameId: "EVOLIVE_k2oswnib7jjaaznw" },
      { imageSrc: "/assets/evolution/EVOLIVE_oytmvb9m1zysmc44.png", gameId: "EVOLIVE_oytmvb9m1zysmc44" },
      { imageSrc: "/assets/evolution/EVOLIVE_48z5pjps3ntvqc1b.png", gameId: "EVOLIVE_48z5pjps3ntvqc1b" },
      { imageSrc: "/assets/evolution/EVOLIVE_AmericanTable001.png", gameId: "EVOLIVE_AmericanTable001" },
      { imageSrc: "/assets/evolution/EVOLIVE_DHPTable00000001.png", gameId: "EVOLIVE_DHPTable00000001" }
    ];
  const microgaming = [
       { imageSrc: "/assets/microgaming/MG_SMG_almightyDionysusEmpire.png", gameId: "MG_SMG_almightyDionysusEmpire" },
    { imageSrc: "/assets/microgaming/MG_SMG_luckyTwinsAnd9Lions.png", gameId: "MG_SMG_luckyTwinsAnd9Lions" },
    { imageSrc: "/assets/microgaming/MG_SMG_3AngelsPowerCombo.png", gameId: "MG_SMG_3AngelsPowerCombo" },
    { imageSrc: "/assets/microgaming/MG_SMG_royalThunderRiders.png", gameId: "MG_SMG_royalThunderRiders" },
    { imageSrc: "/assets/microgaming/MG_SMG_moneyDragon.png", gameId: "MG_SMG_moneyDragon" },
    { imageSrc: "/assets/microgaming/MG_SMG_cashBlitz.png", gameId: "MG_SMG_cashBlitz" },
    { imageSrc: "/assets/microgaming/MG_SMG_pongPongMahjongJackpots.png", gameId: "MG_SMG_pongPongMahjongJackpots" },
    { imageSrc: "/assets/microgaming/MG_SMG_gatesOfAsgardPowerCombo.png", gameId: "MG_SMG_gatesOfAsgardPowerCombo" },
    { imageSrc: "/assets/microgaming/MG_SMG_carnavalFiesta.png", gameId: "MG_SMG_carnavalFiesta" },
    { imageSrc: "/assets/microgaming/MG_SMG_frankenstein.png", gameId: "MG_SMG_frankenstein" },
    { imageSrc: "/assets/microgaming/MG_SMG_aztecTripleRichesPowerCombo.png", gameId: "MG_SMG_aztecTripleRichesPowerCombo" },
    { imageSrc: "/assets/microgaming/MG_SMG_goldInfinity.png", gameId: "MG_SMG_goldInfinity" },
    { imageSrc: "/assets/microgaming/MG_SMG_mammothTripleRiches.png", gameId: "MG_SMG_mammothTripleRiches" },
    { imageSrc: "/assets/microgaming/MG_SMG_hadesLostTreasures.png", gameId: "MG_SMG_hadesLostTreasures" },
    { imageSrc: "/assets/microgaming/MG_SMG_bookOfWolves.png", gameId: "MG_SMG_bookOfWolves" },
    { imageSrc: "/assets/microgaming/MG_SMG_siennaSteele.png", gameId: "MG_SMG_siennaSteele" },
    { imageSrc: "/assets/microgaming/MG_SMG_candyRushWilds2.png", gameId: "MG_SMG_candyRushWilds2" },
    { imageSrc: "/assets/microgaming/MG_SMG_almightyAthenaEmpire.png", gameId: "MG_SMG_almightyAthenaEmpire" },
    { imageSrc: "/assets/microgaming/MG_SMG_treasureStacks.png", gameId: "MG_SMG_treasureStacks" },
    { imageSrc: "/assets/microgaming/MG_SMG_3LaughingLionsPowerCombo.png", gameId: "MG_SMG_3LaughingLionsPowerCombo" },
    { imageSrc: "/assets/microgaming/MG_SMG_crazyBobBonanza.png", gameId: "MG_SMG_crazyBobBonanza" },
    { imageSrc: "/assets/microgaming/MG_SMG_MGLiveGrand_Baccarat3.png", gameId: "MG_SMG_MGLiveGrand_Baccarat3" },
    { imageSrc: "/assets/microgaming/MG_SMG_MGLiveGrand_Baccarat2.png", gameId: "MG_SMG_MGLiveGrand_Baccarat2" },
    { imageSrc: "/assets/microgaming/MG_SMG_MGLiveGrand_Baccarat1.png", gameId: "MG_SMG_MGLiveGrand_Baccarat1" },
    { imageSrc: "/assets/microgaming/MG_SMG_luckyTwinsPowerClusters.png", gameId: "MG_SMG_luckyTwinsPowerClusters" },
    { imageSrc: "/assets/microgaming/MG_SMG_mightyPanda.png", gameId: "MG_SMG_mightyPanda" },
    { imageSrc: "/assets/microgaming/MG_SMG_MGLiveGrand_BlackjackVancouver.png", gameId: "MG_SMG_MGLiveGrand_BlackjackVancouver" },
    { imageSrc: "/assets/microgaming/MG_SMG_massiveGold.png", gameId: "MG_SMG_massiveGold" },
    { imageSrc: "/assets/microgaming/MG_SMG_sharkPlatinum.png", gameId: "MG_SMG_sharkPlatinum" },
    { imageSrc: "/assets/microgaming/MG_SMG_MGLiveGrand_SpeedBaccarat12.png", gameId: "MG_SMG_MGLiveGrand_SpeedBaccarat12" },
    { imageSrc: "/assets/microgaming/MG_SMG_MGLiveGrand_SpeedBaccarat11.png", gameId: "MG_SMG_MGLiveGrand_SpeedBaccarat11" },
    { imageSrc: "/assets/microgaming/MG_SMG_MGLiveGrand_SpeedBaccarat10.png", gameId: "MG_SMG_MGLiveGrand_SpeedBaccarat10" },
    { imageSrc: "/assets/microgaming/MG_SMG_MGLiveGrand_SpeedBaccarat9.png", gameId: "MG_SMG_MGLiveGrand_SpeedBaccarat9" },
    { imageSrc: "/assets/microgaming/MG_SMG_MGLiveGrand_SpeedBaccarat8.png", gameId: "MG_SMG_MGLiveGrand_SpeedBaccarat8" },
    { imageSrc: "/assets/microgaming/MG_SMG_MGLiveGrand_SpeedBaccarat7.png", gameId: "MG_SMG_MGLiveGrand_SpeedBaccarat7" },
    { imageSrc: "/assets/microgaming/MG_SMG_MGLiveGrand_SpeedBaccarat6.png", gameId: "MG_SMG_MGLiveGrand_SpeedBaccarat6" },
    { imageSrc: "/assets/microgaming/MG_SMG_MGLiveGrand_BlackjackMontreal.png", gameId: "MG_SMG_MGLiveGrand_BlackjackMontreal" },
    { imageSrc: "/assets/microgaming/MG_SMG_MGLiveGrand_CashWheelCarnival.png", gameId: "MG_SMG_MGLiveGrand_CashWheelCarnival" },
    { imageSrc: "/assets/microgaming/MG_SMG_MGLiveGrand_TurkishRoulette.png", gameId: "MG_SMG_MGLiveGrand_TurkishRoulette" },
    { imageSrc: "/assets/microgaming/MG_SMG_MGLiveGrand_CasinoHoldem.png", gameId: "MG_SMG_MGLiveGrand_CasinoHoldem" },
    { imageSrc: "/assets/microgaming/MG_SMG_MGLiveGrand_DiamondRoulette.png", gameId: "MG_SMG_MGLiveGrand_DiamondRoulette" },
    { imageSrc: "/assets/microgaming/MG_SMG_MGLiveGrand_IstanbulRoulette.png", gameId: "MG_SMG_MGLiveGrand_IstanbulRoulette" },
    { imageSrc: "/assets/microgaming/MG_SMG_MGLiveGrand_WanderlustAdventure.png", gameId: "MG_SMG_MGLiveGrand_WanderlustAdventure" },
    { imageSrc: "/assets/microgaming/MG_SMG_MGLiveGrand_HoloRoulette.png", gameId: "MG_SMG_MGLiveGrand_HoloRoulette" },
    { imageSrc: "/assets/microgaming/MG_SMG_MGLiveGrand_SpeedBlackjack2.png", gameId: "MG_SMG_MGLiveGrand_SpeedBlackjack2" },
    { imageSrc: "/assets/microgaming/MG_SMG_MGLiveGrand_SpeedBlackjack1.png", gameId: "MG_SMG_MGLiveGrand_SpeedBlackjack1" },
    { imageSrc: "/assets/microgaming/MG_SMG_MGLiveGrand_EverplayBlackjack.png", gameId: "MG_SMG_MGLiveGrand_EverplayBlackjack" },
    { imageSrc: "/assets/microgaming/MG_SMG_MGLiveGrand_DragonTiger.png", gameId: "MG_SMG_MGLiveGrand_DragonTiger" },
    { imageSrc: "/assets/microgaming/MG_SMG_MGLiveGrand_CardsChampion.png", gameId: "MG_SMG_MGLiveGrand_CardsChampion" },
    { imageSrc: "/assets/microgaming/MG_SMG_MGLiveGrand_SpeedBaccarat5.png", gameId: "MG_SMG_MGLiveGrand_SpeedBaccarat5" },
    { imageSrc: "/assets/microgaming/MG_SMG_MGLiveGrand_SpeedBaccarat4.png", gameId: "MG_SMG_MGLiveGrand_SpeedBaccarat4" },
    { imageSrc: "/assets/microgaming/MG_SMG_MGLiveGrand_SpeedBaccarat3.png", gameId: "MG_SMG_MGLiveGrand_SpeedBaccarat3" },
    { imageSrc: "/assets/microgaming/MG_SMG_MGLiveGrand_SpeedBaccarat2.png", gameId: "MG_SMG_MGLiveGrand_SpeedBaccarat2" },
    { imageSrc: "/assets/microgaming/MG_SMG_MGLiveGrand_SpeedBaccarat1.png", gameId: "MG_SMG_MGLiveGrand_SpeedBaccarat1" },
    { imageSrc: "/assets/microgaming/MG_SMG_MGLiveGrand_AutoRoulette.png", gameId: "MG_SMG_MGLiveGrand_AutoRoulette" },
    { imageSrc: "/assets/microgaming/MG_SMG_MGLiveGrand_SpeedRoulette.png", gameId: "MG_SMG_MGLiveGrand_SpeedRoulette" },
    { imageSrc: "/assets/microgaming/MG_SMG_MGLiveGrand_AmstelRoulette.png", gameId: "MG_SMG_MGLiveGrand_AmstelRoulette" },
    { imageSrc: "/assets/microgaming/MG_SMG_MGLiveGrand_ClubhouseRoulette.png", gameId: "MG_SMG_MGLiveGrand_ClubhouseRoulette" },
    { imageSrc: "/assets/microgaming/MG_SMG_MGLiveGrand_AirwaveRoulette.png", gameId: "MG_SMG_MGLiveGrand_AirwaveRoulette" },
    { imageSrc: "/assets/microgaming/MG_SMG_MGLiveGrand_Roulette.png", gameId: "MG_SMG_MGLiveGrand_Roulette" },
    { imageSrc: "/assets/microgaming/MG_SMG_MGLiveGrand_BlackjackRiga.png", gameId: "MG_SMG_MGLiveGrand_BlackjackRiga" },
    { imageSrc: "/assets/microgaming/MG_SMG_MGLiveGrand_BlackjackBerlin.png", gameId: "MG_SMG_MGLiveGrand_BlackjackBerlin" },
    { imageSrc: "/assets/microgaming/MG_SMG_MGLiveGrand_BlackjackMonteCarlo.png", gameId: "MG_SMG_MGLiveGrand_BlackjackMonteCarlo" },
    { imageSrc: "/assets/microgaming/MG_SMG_MGLiveGrand_BlackjackMadrid.png", gameId: "MG_SMG_MGLiveGrand_BlackjackMadrid" },
    { imageSrc: "/assets/microgaming/MG_SMG_MGLiveGrand_BlackjackToronto.png", gameId: "MG_SMG_MGLiveGrand_BlackjackToronto" },
    { imageSrc: "/assets/microgaming/MG_SMG_MGLiveGrand_BlackjackManchester.png", gameId: "MG_SMG_MGLiveGrand_BlackjackManchester" },
    { imageSrc: "/assets/microgaming/MG_SMG_MGLiveGrand_BlackjackLondon.png", gameId: "MG_SMG_MGLiveGrand_BlackjackLondon" },
    { imageSrc: "/assets/microgaming/MG_SMG_MGLiveGrand_BlackjackAmsterdam.png", gameId: "MG_SMG_MGLiveGrand_BlackjackAmsterdam" },
    { imageSrc: "/assets/microgaming/MG_SMG_titaniumLiveGames_BaccaratplayboyNC.png", gameId: "MG_SMG_titaniumLiveGames_BaccaratplayboyNC" },
    { imageSrc: "/assets/microgaming/MG_SMG_titaniumLiveGames_Baccarat_Playboy.png", gameId: "MG_SMG_titaniumLiveGames_Baccarat_Playboy" },
    { imageSrc: "/assets/microgaming/MG_SMG_titaniumLiveGames_Roulette.png", gameId: "MG_SMG_titaniumLiveGames_Roulette" },
    { imageSrc: "/assets/microgaming/MG_SMG_titaniumLiveGames_Sicbo.png", gameId: "MG_SMG_titaniumLiveGames_Sicbo" },
    { imageSrc: "/assets/microgaming/MG_SMG_titaniumLiveGames_MP_Baccarat.png", gameId: "MG_SMG_titaniumLiveGames_MP_Baccarat" },
    { imageSrc: "/assets/microgaming/MG_SMG_titaniumLiveGames_Baccarat.png", gameId: "MG_SMG_titaniumLiveGames_Baccarat" },
    { imageSrc: "/assets/microgaming/MG_SMG_titaniumLiveGames_BaccaratNC.png", gameId: "MG_SMG_titaniumLiveGames_BaccaratNC" },
    { imageSrc: "/assets/microgaming/MG_SMG_drWattsUp.png", gameId: "MG_SMG_drWattsUp" },
    { imageSrc: "/assets/microgaming/MG_SMG_luckyLittleDragons.png", gameId: "MG_SMG_luckyLittleDragons" },
    { imageSrc: "/assets/microgaming/MG_SMG_queenOfCairo.png", gameId: "MG_SMG_queenOfCairo" },
    { imageSrc: "/assets/microgaming/MG_SMG_108HeroesWaterMargin.png", gameId: "MG_SMG_108HeroesWaterMargin" },
    { imageSrc: "/assets/microgaming/MG_SMG_almightyZeusWilds.png", gameId: "MG_SMG_almightyZeusWilds" },
    { imageSrc: "/assets/microgaming/MG_SMG_miningPotsOfGold.png", gameId: "MG_SMG_miningPotsOfGold" },
    { imageSrc: "/assets/microgaming/MG_SMG_crazyRichTigers.png", gameId: "MG_SMG_crazyRichTigers" },
    { imageSrc: "/assets/microgaming/MG_SMG_chroniclesOfOlympusIIZeus.png", gameId: "MG_SMG_chroniclesOfOlympusIIZeus" },
    { imageSrc: "/assets/microgaming/MG_SMG_flyX.png", gameId: "MG_SMG_flyX" },
    { imageSrc: "/assets/microgaming/MG_SFG_WDGoldBlastFishing.png", gameId: "MG_SFG_WDGoldBlastFishing" },
    { imageSrc: "/assets/microgaming/MG_SFG_WDFuWaFishing.png", gameId: "MG_SFG_WDFuWaFishing" },
    { imageSrc: "/assets/microgaming/MG_SFG_WDGoldenFortuneFishing.png", gameId: "MG_SFG_WDGoldenFortuneFishing" },
    { imageSrc: "/assets/microgaming/MG_SFG_WDGoldenTyrantFishing.png", gameId: "MG_SFG_WDGoldenTyrantFishing" },
    { imageSrc: "/assets/microgaming/MG_SFG_WDMerryIslandFishing.png", gameId: "MG_SFG_WDMerryIslandFishing" },
    { imageSrc: "/assets/microgaming/MG_SMG_immortalRomanceVideoBingo.png", gameId: "MG_SMG_immortalRomanceVideoBingo" },
    { imageSrc: "/assets/microgaming/MG_SMG_amazingPharaoh.png", gameId: "MG_SMG_amazingPharaoh" },
    { imageSrc: "/assets/microgaming/MG_SMG_pongPongMahjong.png", gameId: "MG_SMG_pongPongMahjong" },
    { imageSrc: "/assets/microgaming/MG_SMG_breakAwayMax.png", gameId: "MG_SMG_breakAwayMax" },
    { imageSrc: "/assets/microgaming/MG_SMG_fishinPotsOfGoldGoldBlitz.png", gameId: "MG_SMG_fishinPotsOfGoldGoldBlitz" },
    { imageSrc: "/assets/microgaming/MG_SMG_9EnchantedBeans.png", gameId: "MG_SMG_9EnchantedBeans" },
    { imageSrc: "/assets/microgaming/MG_SMG_laraCroftTombOfTheSun.png", gameId: "MG_SMG_laraCroftTombOfTheSun" },
    { imageSrc: "/assets/microgaming/MG_SMG_fireAndRosesJollyJoker.png", gameId: "MG_SMG_fireAndRosesJollyJoker" },
    { imageSrc: "/assets/microgaming/MG_SMG_dragonsLoot.png", gameId: "MG_SMG_dragonsLoot" },
    { imageSrc: "/assets/microgaming/MG_SMG_hatchingGoldRoostersRiches.png", gameId: "MG_SMG_hatchingGoldRoostersRiches" },
    { imageSrc: "/assets/microgaming/MG_SMG_reignOfFire.png", gameId: "MG_SMG_reignOfFire" },
    { imageSrc: "/assets/microgaming/MG_SMG_almightyDionysusEmpire.png", gameId: "MG_SMG_almightyDionysusEmpire" },
    { imageSrc: "/assets/microgaming/MG_SMG_luckyTwinsAnd9Lions.png", gameId: "MG_SMG_luckyTwinsAnd9Lions" },
    { imageSrc: "/assets/microgaming/MG_SMG_3AngelsPowerCombo.png", gameId: "MG_SMG_3AngelsPowerCombo" },
    { imageSrc: "/assets/microgaming/MG_SMG_royalThunderRiders.png", gameId: "MG_SMG_royalThunderRiders" },
    { imageSrc: "/assets/microgaming/MG_SMG_moneyDragon.png", gameId: "MG_SMG_moneyDragon" },
    { imageSrc: "/assets/microgaming/MG_SMG_cashBlitz.png", gameId: "MG_SMG_cashBlitz" },
    { imageSrc: "/assets/microgaming/MG_SMG_pongPongMahjongJackpots.png", gameId: "MG_SMG_pongPongMahjongJackpots" },
    { imageSrc: "/assets/microgaming/MG_SMG_gatesOfAsgardPowerCombo.png", gameId: "MG_SMG_gatesOfAsgardPowerCombo" },
    { imageSrc: "/assets/microgaming/MG_SMG_carnavalFiesta.png", gameId: "MG_SMG_carnavalFiesta" },
    { imageSrc: "/assets/microgaming/MG_SMG_frankenstein.png", gameId: "MG_SMG_frankenstein" },
    { imageSrc: "/assets/microgaming/MG_SMG_aztecTripleRichesPowerCombo.png", gameId: "MG_SMG_aztecTripleRichesPowerCombo" },
    { imageSrc: "/assets/microgaming/MG_SMG_goldInfinity.png", gameId: "MG_SMG_goldInfinity" },
    { imageSrc: "/assets/microgaming/MG_SMG_mammothTripleRiches.png", gameId: "MG_SMG_mammothTripleRiches" },
    { imageSrc: "/assets/microgaming/MG_SMG_hadesLostTreasures.png", gameId: "MG_SMG_hadesLostTreasures" },
    { imageSrc: "/assets/microgaming/MG_SMG_bookOfWolves.png", gameId: "MG_SMG_bookOfWolves" },
    { imageSrc: "/assets/microgaming/MG_SMG_siennaSteele.png", gameId: "MG_SMG_siennaSteele" },
    { imageSrc: "/assets/microgaming/MG_SMG_candyRushWilds2.png", gameId: "MG_SMG_candyRushWilds2" },
    { imageSrc: "/assets/microgaming/MG_SMG_almightyAthenaEmpire.png", gameId: "MG_SMG_almightyAthenaEmpire" },
    { imageSrc: "/assets/microgaming/MG_SMG_treasureStacks.png", gameId: "MG_SMG_treasureStacks" },
    { imageSrc: "/assets/microgaming/MG_SMG_3LaughingLionsPowerCombo.png", gameId: "MG_SMG_3LaughingLionsPowerCombo" },
    { imageSrc: "/assets/microgaming/MG_SMG_crazyBobBonanza.png", gameId: "MG_SMG_crazyBobBonanza" },
    { imageSrc: "/assets/microgaming/MG_SMG_MGLiveGrand_Baccarat3.png", gameId: "MG_SMG_MGLiveGrand_Baccarat3" },
    { imageSrc: "/assets/microgaming/MG_SMG_MGLiveGrand_Baccarat2.png", gameId: "MG_SMG_MGLiveGrand_Baccarat2" },
    { imageSrc: "/assets/microgaming/MG_SMG_MGLiveGrand_Baccarat1.png", gameId: "MG_SMG_MGLiveGrand_Baccarat1" },
    { imageSrc: "/assets/microgaming/MG_SMG_luckyTwinsPowerClusters.png", gameId: "MG_SMG_luckyTwinsPowerClusters" },
    { imageSrc: "/assets/microgaming/MG_SMG_mightyPanda.png", gameId: "MG_SMG_mightyPanda" },
    { imageSrc: "/assets/microgaming/MG_SMG_MGLiveGrand_BlackjackVancouver.png", gameId: "MG_SMG_MGLiveGrand_BlackjackVancouver" },
    { imageSrc: "/assets/microgaming/MG_SMG_massiveGold.png", gameId: "MG_SMG_massiveGold" },
    { imageSrc: "/assets/microgaming/MG_SMG_sharkPlatinum.png", gameId: "MG_SMG_sharkPlatinum" },
    { imageSrc: "/assets/microgaming/MG_SMG_MGLiveGrand_SpeedBaccarat12.png", gameId: "MG_SMG_MGLiveGrand_SpeedBaccarat12" },
    { imageSrc: "/assets/microgaming/MG_SMG_MGLiveGrand_SpeedBaccarat11.png", gameId: "MG_SMG_MGLiveGrand_SpeedBaccarat11" },
    { imageSrc: "/assets/microgaming/MG_SMG_MGLiveGrand_SpeedBaccarat10.png", gameId: "MG_SMG_MGLiveGrand_SpeedBaccarat10" },
    { imageSrc: "/assets/microgaming/MG_SMG_MGLiveGrand_SpeedBaccarat9.png", gameId: "MG_SMG_MGLiveGrand_SpeedBaccarat9" },
    { imageSrc: "/assets/microgaming/MG_SMG_MGLiveGrand_SpeedBaccarat8.png", gameId: "MG_SMG_MGLiveGrand_SpeedBaccarat8" },
    { imageSrc: "/assets/microgaming/MG_SMG_MGLiveGrand_SpeedBaccarat7.png", gameId: "MG_SMG_MGLiveGrand_SpeedBaccarat7" },
    { imageSrc: "/assets/microgaming/MG_SMG_MGLiveGrand_SpeedBaccarat6.png", gameId: "MG_SMG_MGLiveGrand_SpeedBaccarat6" },
    { imageSrc: "/assets/microgaming/MG_SMG_MGLiveGrand_BlackjackMontreal.png", gameId: "MG_SMG_MGLiveGrand_BlackjackMontreal" },
    { imageSrc: "/assets/microgaming/MG_SMG_MGLiveGrand_CashWheelCarnival.png", gameId: "MG_SMG_MGLiveGrand_CashWheelCarnival" },
    { imageSrc: "/assets/microgaming/MG_SMG_MGLiveGrand_TurkishRoulette.png", gameId: "MG_SMG_MGLiveGrand_TurkishRoulette" },
    { imageSrc: "/assets/microgaming/MG_SMG_MGLiveGrand_CasinoHoldem.png", gameId: "MG_SMG_MGLiveGrand_CasinoHoldem" },
    { imageSrc: "/assets/microgaming/MG_SMG_MGLiveGrand_DiamondRoulette.png", gameId: "MG_SMG_MGLiveGrand_DiamondRoulette" },
    { imageSrc: "/assets/microgaming/MG_SMG_MGLiveGrand_IstanbulRoulette.png", gameId: "MG_SMG_MGLiveGrand_IstanbulRoulette" },
    { imageSrc: "/assets/microgaming/MG_SMG_MGLiveGrand_WanderlustAdventure.png", gameId: "MG_SMG_MGLiveGrand_WanderlustAdventure" },
    { imageSrc: "/assets/microgaming/MG_SMG_MGLiveGrand_HoloRoulette.png", gameId: "MG_SMG_MGLiveGrand_HoloRoulette" },
    { imageSrc: "/assets/microgaming/MG_SMG_MGLiveGrand_SpeedBlackjack2.png", gameId: "MG_SMG_MGLiveGrand_SpeedBlackjack2" },
    { imageSrc: "/assets/microgaming/MG_SMG_MGLiveGrand_SpeedBlackjack1.png", gameId: "MG_SMG_MGLiveGrand_SpeedBlackjack1" },
    { imageSrc: "/assets/microgaming/MG_SMG_MGLiveGrand_EverplayBlackjack.png", gameId: "MG_SMG_MGLiveGrand_EverplayBlackjack" },
    { imageSrc: "/assets/microgaming/MG_SMG_MGLiveGrand_DragonTiger.png", gameId: "MG_SMG_MGLiveGrand_DragonTiger" },
    { imageSrc: "/assets/microgaming/MG_SMG_MGLiveGrand_CardsChampion.png", gameId: "MG_SMG_MGLiveGrand_CardsChampion" },
    { imageSrc: "/assets/microgaming/MG_SMG_MGLiveGrand_SpeedBaccarat5.png", gameId: "MG_SMG_MGLiveGrand_SpeedBaccarat5" },
    { imageSrc: "/assets/microgaming/MG_SMG_MGLiveGrand_SpeedBaccarat4.png", gameId: "MG_SMG_MGLiveGrand_SpeedBaccarat4" },
    { imageSrc: "/assets/microgaming/MG_SMG_MGLiveGrand_SpeedBaccarat3.png", gameId: "MG_SMG_MGLiveGrand_SpeedBaccarat3" },
    { imageSrc: "/assets/microgaming/MG_SMG_MGLiveGrand_SpeedBaccarat2.png", gameId: "MG_SMG_MGLiveGrand_SpeedBaccarat2" },
    { imageSrc: "/assets/microgaming/MG_SMG_MGLiveGrand_SpeedBaccarat1.png", gameId: "MG_SMG_MGLiveGrand_SpeedBaccarat1" },
    { imageSrc: "/assets/microgaming/MG_SMG_MGLiveGrand_AutoRoulette.png", gameId: "MG_SMG_MGLiveGrand_AutoRoulette" },
    { imageSrc: "/assets/microgaming/MG_SMG_MGLiveGrand_SpeedRoulette.png", gameId: "MG_SMG_MGLiveGrand_SpeedRoulette" },
    { imageSrc: "/assets/microgaming/MG_SMG_MGLiveGrand_AmstelRoulette.png", gameId: "MG_SMG_MGLiveGrand_AmstelRoulette" },
    { imageSrc: "/assets/microgaming/MG_SMG_MGLiveGrand_ClubhouseRoulette.png", gameId: "MG_SMG_MGLiveGrand_ClubhouseRoulette" },
    { imageSrc: "/assets/microgaming/MG_SMG_MGLiveGrand_AirwaveRoulette.png", gameId: "MG_SMG_MGLiveGrand_AirwaveRoulette" },
    { imageSrc: "/assets/microgaming/MG_SMG_MGLiveGrand_Roulette.png", gameId: "MG_SMG_MGLiveGrand_Roulette" },
    { imageSrc: "/assets/microgaming/MG_SMG_MGLiveGrand_BlackjackRiga.png", gameId: "MG_SMG_MGLiveGrand_BlackjackRiga" },
    { imageSrc: "/assets/microgaming/MG_SMG_MGLiveGrand_BlackjackBerlin.png", gameId: "MG_SMG_MGLiveGrand_BlackjackBerlin" },
    { imageSrc: "/assets/microgaming/MG_SMG_MGLiveGrand_BlackjackMonteCarlo.png", gameId: "MG_SMG_MGLiveGrand_BlackjackMonteCarlo" },
    { imageSrc: "/assets/microgaming/MG_SMG_MGLiveGrand_BlackjackMadrid.png", gameId: "MG_SMG_MGLiveGrand_BlackjackMadrid" },
    { imageSrc: "/assets/microgaming/MG_SMG_MGLiveGrand_BlackjackToronto.png", gameId: "MG_SMG_MGLiveGrand_BlackjackToronto" },
    { imageSrc: "/assets/microgaming/MG_SMG_MGLiveGrand_BlackjackManchester.png", gameId: "MG_SMG_MGLiveGrand_BlackjackManchester" },
    { imageSrc: "/assets/microgaming/MG_SMG_MGLiveGrand_BlackjackLondon.png", gameId: "MG_SMG_MGLiveGrand_BlackjackLondon" },
    { imageSrc: "/assets/microgaming/MG_SMG_MGLiveGrand_BlackjackAmsterdam.png", gameId: "MG_SMG_MGLiveGrand_BlackjackAmsterdam" },
    { imageSrc: "/assets/microgaming/MG_SMG_titaniumLiveGames_BaccaratplayboyNC.png", gameId: "MG_SMG_titaniumLiveGames_BaccaratplayboyNC" },
    { imageSrc: "/assets/microgaming/MG_SMG_titaniumLiveGames_Baccarat_Playboy.png", gameId: "MG_SMG_titaniumLiveGames_Baccarat_Playboy" },
    { imageSrc: "/assets/microgaming/MG_SMG_titaniumLiveGames_Roulette.png", gameId: "MG_SMG_titaniumLiveGames_Roulette" },
    { imageSrc: "/assets/microgaming/MG_SMG_titaniumLiveGames_Sicbo.png", gameId: "MG_SMG_titaniumLiveGames_Sicbo" },
    { imageSrc: "/assets/microgaming/MG_SMG_titaniumLiveGames_MP_Baccarat.png", gameId: "MG_SMG_titaniumLiveGames_MP_Baccarat" },
    { imageSrc: "/assets/microgaming/MG_SMG_titaniumLiveGames_Baccarat.png", gameId: "MG_SMG_titaniumLiveGames_Baccarat" },
    { imageSrc: "/assets/microgaming/MG_SMG_titaniumLiveGames_BaccaratNC.png", gameId: "MG_SMG_titaniumLiveGames_BaccaratNC" },
    { imageSrc: "/assets/microgaming/MG_SMG_drWattsUp.png", gameId: "MG_SMG_drWattsUp" },
    { imageSrc: "/assets/microgaming/MG_SMG_luckyLittleDragons.png", gameId: "MG_SMG_luckyLittleDragons" },
    { imageSrc: "/assets/microgaming/MG_SMG_queenOfCairo.png", gameId: "MG_SMG_queenOfCairo" },
    { imageSrc: "/assets/microgaming/MG_SMG_108HeroesWaterMargin.png", gameId: "MG_SMG_108HeroesWaterMargin" },
    { imageSrc: "/assets/microgaming/MG_SMG_almightyZeusWilds.png", gameId: "MG_SMG_almightyZeusWilds" },
    { imageSrc: "/assets/microgaming/MG_SMG_miningPotsOfGold.png", gameId: "MG_SMG_miningPotsOfGold" },
    { imageSrc: "/assets/microgaming/MG_SMG_crazyRichTigers.png", gameId: "MG_SMG_crazyRichTigers" },
    { imageSrc: "/assets/microgaming/MG_SMG_chroniclesOfOlympusIIZeus.png", gameId: "MG_SMG_chroniclesOfOlympusIIZeus" },
    { imageSrc: "/assets/microgaming/MG_SMG_flyX.png", gameId: "MG_SMG_flyX" },
    { imageSrc: "/assets/microgaming/MG_SFG_WDGoldBlastFishing.png", gameId: "MG_SFG_WDGoldBlastFishing" },
    { imageSrc: "/assets/microgaming/MG_SFG_WDFuWaFishing.png", gameId: "MG_SFG_WDFuWaFishing" },
    { imageSrc: "/assets/microgaming/MG_SFG_WDGoldenFortuneFishing.png", gameId: "MG_SFG_WDGoldenFortuneFishing" },
    { imageSrc: "/assets/microgaming/MG_SFG_WDGoldenTyrantFishing.png", gameId: "MG_SFG_WDGoldenTyrantFishing" },
    { imageSrc: "/assets/microgaming/MG_SFG_WDMerryIslandFishing.png", gameId: "MG_SFG_WDMerryIslandFishing" },
    { imageSrc: "/assets/microgaming/MG_SMG_immortalRomanceVideoBingo.png", gameId: "MG_SMG_immortalRomanceVideoBingo" },
    { imageSrc: "/assets/microgaming/MG_SMG_amazingPharaoh.png", gameId: "MG_SMG_amazingPharaoh" },
    { imageSrc: "/assets/microgaming/MG_SMG_pongPongMahjong.png", gameId: "MG_SMG_pongPongMahjong" },
    { imageSrc: "/assets/microgaming/MG_SMG_breakAwayMax.png", gameId: "MG_SMG_breakAwayMax" },
    { imageSrc: "/assets/microgaming/MG_SMG_fishinPotsOfGoldGoldBlitz.png", gameId: "MG_SMG_fishinPotsOfGoldGoldBlitz" },
    { imageSrc: "/assets/microgaming/MG_SMG_9EnchantedBeans.png", gameId: "MG_SMG_9EnchantedBeans" },
    { imageSrc: "/assets/microgaming/MG_SMG_laraCroftTombOfTheSun.png", gameId: "MG_SMG_laraCroftTombOfTheSun" },
    { imageSrc: "/assets/microgaming/MG_SMG_fireAndRosesJollyJoker.png", gameId: "MG_SMG_fireAndRosesJollyJoker" },
    { imageSrc: "/assets/microgaming/MG_SMG_dragonsLoot.png", gameId: "MG_SMG_dragonsLoot" },
  ]


  const jili = useCallback(async (gameId) => {
    console.log('Jili game:', gameId);
    try {
      const token = sessionStorage.getItem("token"); // Get the token from session storage
      const response = await axios.post(
        `${domain}/jilireal-test-login/`,
        { GameId: gameId },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the Authorization header
          },
        }
      );
      const { ErrorCode, Data } = response.data.responseData;
      console.log('Jili game response:', response.data.responseData);
      
      if (ErrorCode === 0) {
        window.location.href = Data;
      }
    } catch (error) {
      console.error('Jili game error:', error);
    }
  }, []);




  const jdbcall = async (app_id) => {
    setIsLoading(true);
    try {
        const token = sessionStorage.getItem('token'); // Changed to sessionStorage
        const response = await axios.post(`${domain}/game/launch/jdb/`, 
        { "gameCode": app_id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const { status, data } = response.data;
       
        console.log(response.data);
  
        if (status === "SC_OK") {
            window.location.href = data.gameUrl;
        }
    } finally {
        setIsLoading(false);
    }
};

const topbet = async (app_id) => {
  console.log("--------->",app_id);
  setIsLoading(true);
  try {
      const token = sessionStorage.getItem("token"); // Get the token from session storage
      const response = await axios.post(
        `${domain}/topbetgaming-login/`,
        { app_id },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the Authorization header
          },
        }
      );
      const { code, url } = response.data;
      console.log(url);
      console.log(response.data);

      if (code === 0) {
          window.location.href = url;
      }
  } finally {
      setIsLoading(false);
  }
};

  const handleConfirmRecharge = () => {
    // Navigate to recharge page or trigger recharge process
    window.location.href = "/recharge"; // Adjust this path as needed
  };
// Update handleBoxClick with strict deposit check
const handleBoxClick = (gameId, type) => {
  console.log(`Clicked gameId: ${gameId}`);
  
  if (isDepositCheckLoading) {
    return; // Prevent clicks while checking deposit status
  }

  if (!hasDeposit) {
    setSelectedGame({ game: gameId });
    setGameType(type);
    setOpenDialog(true);
    return;
  }
    // Only proceed if deposit requirements are met
    switch(type) {
      case "jili":
        jili(gameId);
        break;
      case "topbet": 
      topbet(gameId);
        break;
      case "JDB":
        jdbcall(gameId);
        break;
      default:
        jdbcall(gameId);
    }
  };

const renderGames = (games, type) => {
  return games.map((game, index) => (
    <Grid
      item
      xs={4} // 3 boxes in a row (12/4 = 3)
      sm={4}
      md={4}
      key={index}
      sx={{
        opacity: isDepositCheckLoading ? 0.5 : 1,
        pointerEvents: isDepositCheckLoading ? 'none' : 'auto'
      }}
    >
     <Box
          onClick={() => handleBoxClick(game.gameId, type)}
          sx={{
            width: "100%",
            aspectRatio: "1", // Ensures the box is square
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            border: "1px solid #ddd",
            borderRadius: "8px",
            overflow: "hidden",
            backgroundColor: "#FFFFFF",
            cursor: "pointer",
            transition: "transform 0.2s ease-in-out",
            "&:hover": {
              transform: "scale(1.05)", // Add hover effect
            },
          }}
        >
          <img
            src={game.imageSrc}
            alt={`Game ${index + 1}`}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </Box>
      </Grid>
    ));
  };

return (
  <>
  {/* Thin Header with Search Icon */}
  <AppBar position="sticky" sx={{ background: "#FFFFFF", height: 40, justifyContent: "center",  boxShadow: 'none'}}>
    <Toolbar sx={{ minHeight: "40px !important", display: "flex", justifyContent: "space-between", padding: "0 10px" }}>
    <IconButton style={{ color: "black" }} onClick={navigateToPage}>
                <ArrowBackIosNewIcon />
    </IconButton>
      <h6 style={{ margin: 0, fontSize: "16px", color: "black" }}>Game</h6>
      <IconButton color="black">
        <SearchIcon />
      </IconButton>
    </Toolbar>
  </AppBar>

  {/* Tabs with Images & No Chevron */}
  <Box sx={{ flexGrow: 1 }}>
  <AppBar position="static" color="default" sx={{ backgroundColor: 'transparent', boxShadow: 'none',marginLeft: '10px' }}>
  <Tabs
  value={tabValue}
  onChange={handleTabChange}
  variant="scrollable"
  scrollButtons="false"
  aria-label="game tabs"
  ref={tabsRef}
  sx={{
     boxShadow: 'none',
    '& .MuiTabs-flexContainer': {
      gap: '8px',
      padding: '8px',
    },
    '& .MuiTabs-indicator': {
      display: 'none'
    },
    '& .MuiTab-root': {
      backgroundColor: '#fff',
      borderRadius: '10px',
      minHeight: '65px',
      minWidth: '100px',
      padding: '6px',
      margin: '0',
      '&.Mui-selected': {
        backgroundColor: '#FF952A',
        color: '#fff',
      },
    },
  }}
>
  {[
    { 
      label: "Jili Games", 
      activeImg: "/assets/banners/w2.png", // Active state image
      inactiveImg: "/assets/banners/b2.png" // Inactive state image
    },
    { 
      label: "JDB Games", 
      activeImg:" /assets/banners/w1.png",
      inactiveImg: "/assets/banners/b1.png"
    },
    { 
      label: "CQ9", 
      activeImg: "/assets/banners/w3.png",
      inactiveImg: "/assets/banners/b3.png"
    },
    {
      label: "EVOLUTION",
      activeImg: "/assets/banners/w4.png",
      inactiveImg: "/assets/banners/b4.png"
    },
    {
      label: "MICROGAMING",
      activeImg: "/assets/banners/w5.png",
      inactiveImg: "/assets/banners/b5.png"
    }
    // ... repeat for other tabs
  ].map((tab, index) => (
    <Tab
      key={index}
      label={
        <Box sx={{ 
          display: "flex", 
          flexDirection: "column", 
          alignItems: "center",
          padding: '4px'
        }}>
          <img 
            src={tabValue === index ? tab.activeImg : tab.inactiveImg} 
            alt={tab.label} 
            width="45" 
            height="30"
          />
          <Typography sx={{ 
            fontSize: '14px', 
            marginTop: '2px',
            fontWeight:"400",
            fontFamily:"Helvetica",
            color: tabValue === index ? '#fff' : 'inherit'
          }}>
            {tab.label}
          </Typography>
        </Box>
      }
    />
  ))}
</Tabs>
</AppBar>

    {/* Tab Panels */}
    <TabPanel value={tabValue} index={0}>
      <Grid container spacing={2} justifyContent="center" alignItems="center">
        {renderGames(flashGames, "jili")}
      </Grid>
    </TabPanel>
    <TabPanel value={tabValue} index={1}>
      <Grid container spacing={2} justifyContent="center" alignItems="center">
        {renderGames(slotGames, "JDB")}
      </Grid>
    </TabPanel>
    <TabPanel value={tabValue} index={2}>
      <Grid container spacing={2} justifyContent="center" alignItems="center">
        {renderGames(popularGames, "topbet")}
      </Grid>
    </TabPanel>
    <TabPanel value={tabValue} index={3}>
      <Grid container spacing={2} justifyContent="center" alignItems="center">
        {renderGames(evolution, "evolution")}
      </Grid>
    </TabPanel>
    <TabPanel value={tabValue} index={4}>
      <Grid container spacing={2} justifyContent="center" alignItems="center">
        {renderGames(microgaming, "microgaming")}
      </Grid>
    </TabPanel>
  </Box>
</>
);

};

export default App;

//back icon functionality
