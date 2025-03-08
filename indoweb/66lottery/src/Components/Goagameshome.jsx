import React, { useState, useRef,useEffect ,useCallback, memo} from 'react';
import { Box, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import {
  Typography,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { domain } from "./config";
import axios from "axios";
import { styled } from "@mui/material/styles";
import { sub } from 'date-fns';
// import { Grid } from '@mui/system';

// Styled components remain the same
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
  backgroundColor: "#4781ff",
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
}));

// Separate RechargeDialog component with memo
const RechargeDialog = memo(({ open, onClose, onConfirm, selectedGame }) => {
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
          style={{ backgroundColor: "#4781ff", color: "white" }}
        >
          Recharge Now
        </StyledButton>
      </StyledDialogActions>
    </StyledDialog>
  );
});

RechargeDialog.displayName = 'RechargeDialog';
const TabLayout = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [flashPage, setFlashPage] = useState(0);
  const [slotPage, setSlotPage] = useState(0);
  const [sportsPage, setSportsPage] = useState(0);
  const [casinoPage, setCasinoPage] = useState(0);
  const [cardsPage, setCardsPage] = useState(0);
  const [dicePage, setDicePage] = useState(0);
  const [bingoPage, setBingoPage] = useState(0);
  const tabsRef = useRef(null);


  const tabs = [
    {id: 'sports', label: 'Popular', img: 'https://ossimg.goa999.vip/GoaGame/gamecategory/gamecategory_20240127134718aedk.png', bgImage:"url(https://goagameb.com/assets/png/lottery_bg-1edd950a.png)" },
    
    {id: 'lobby', label: 'Lottry', img: 'https://ossimg.goa999.vip/GoaGame/gamecategory/gamecategory_20240127134331wkt7.png',bgImage:"url(https://goagameb.com/assets/png/lottery_bg-1edd950a.png)" },
    {id: 'slot', label: 'Slots', img: 'https://ossimg.goa999.vip/GoaGame/gamecategory/gamecategory_20240127160211wyu9.png', bgImage:"rgb(87,199,221)" },
    { id: 'cards', label: 'Sport', img: 'https://ossimg.goa999.vip/GoaGame/gamecategory/gamecategory_20240127171151ol6s.png', bgcolor: "transparent" },
    {id: 'casino', label: 'Casino', img: 'https://ossimg.goa999.vip/GoaGame/gamecategory/gamecategory_20240127160544mw56.png', bgcolor: "transparent" },
    {id: 'flash', label: 'Rummy', img: 'https://ossimg.goa999.vip/GoaGame/gamecategory/gamecategory_20240127140618epu3.png', bgcolor: "linear-gradient(to bottom, #fbb2ff, #e27bd1)" },
    { id: 'dice', label: 'Fishing', img: 'https://ossimg.goa999.vip/GoaGame/gamecategory/gamecategory_20240306120644tfcu.png', bgcolor: "rgb(253,177,107)" },
    { id: 'original', label: "Original", img: "https://ossimg.goa999.vip/GoaGame/gamecategory/gamecategory_2023071018441674yw.png", bgcolor: "rgb(245,144,193)" },
  ]

  const lotteryGames = [
    { 
      id: 'wingo', 
      title: 'Win Go',
      subtitle: 'Guess the number',
      desc: 'Green/Purple/Red to win', 
      img: '/assets/banners/wingo.png',
      path: "/timer/30sec" 
    },
    { 
      id: 'k3', 
      title: 'K3',
      subtitle: 'Guess the number',
      desc: 'high/low/odd/even', 
      img: '/assets/banners/k3.png',
      path: "/k3/1min"
    },
    { 
      id: '5d', 
      title: '5D',
      subtitle: 'Guess the number',
      desc: 'high/low/odd/even', 
      img: '/assets/banners/5d.png',
      path: "/5d/1min"
    },
    { 
      id: 'trxwin', 
      title: 'Trx Win',
      subtitle: 'Guess the number',
      desc: 'Green/Purple/Red to win', 
      img: '/assets/banners/trx.png',
      path: "/trx/1min"
    },
    { 
      id: 'racing', 
      title: 'Racing',
      subtitle: 'Guess the number',
      desc: 'Big/Small/odd/even', 
      img: 'https://in.piccdn123.com/static/_template_/orange/img/home/saiche.png',
      path: "/racing-game"
    }
  ];
  const gamesByTab = {
    flash: [
      { id: 'popular-1', title: 'Popular 1', gameId: 903, img: '/assets/flash/800.jpg' },
      { id: 'popular-2', title: 'Popular 2', gameId: 801, img: '/assets/flash/801.jpg' },
      { id: 'popular-3', title: 'Popular 3', gameId: 903, img: '/assets/flash/903.png' },
      { id: 'popular-9', title: 'Popular 9', gameId: 102, img: '/assets/flash/102.jpg' },
      { id: 'popular-10', title: 'Popular 10', gameId: 103, img: '/assets/flash/103.jpg' },
      { id: 'popular-11', title: 'Popular 11', gameId: 104, img: '/assets/flash/104.jpg' },
      { id: 'popular-12', title: 'Popular 12', gameId: 105, img: '/assets/flash/105.jpg' },
      { id: 'popular-13', title: 'Popular 13', gameId: 106, img: '/assets/flash/106.jpg' },
      { id: 'popular-3', title: 'Popular 3', gameId: 202, img: '/assets/flash/802.jpg' },
      { id: 'popular-4', title: 'Popular 4', gameId: 803, img: '/assets/flash/803.jpg' },
      { id: 'popular-7', title: 'Popular 7', gameId: 100, img: '/assets/flash/100.jpg' },
      { id: 'popular-8', title: 'Popular 8', gameId: 101, img: '/assets/flash/101.jpg' },
      { id: 'popular-14', title: 'Popular 14', gameId: 107, img: '/assets/flash/107.jpg' },
      { id: 'popular-15', title: 'Popular 15', gameId: 900, img: '/assets/flash/900.jpg' },
      { id: 'popular-16', title: 'Popular 16', gameId: 109, img: '/assets/flash/109.jpg' },
      { id: 'popular-17', title: 'Popular 17', gameId: 110, img: '/assets/flash/110.jpg' },
      { id: 'popular-18', title: 'Popular 18', gameId: 111, img: '/assets/flash/111.jpg' },
      { id: 'popular-19', title: 'Popular 19', gameId: 112, img: '/assets/flash/112.jpg' },
      { id: 'popular-20', title: 'Popular 20', gameId: 810, img: '/assets/flash/810.jpg' },
      
      
    ],
    popular: [
      { id: 'slot-1', title: 'Slot 1', gameId: '229', img: '/assets/flash/229.png' },
      { id: 'slot-2', title: 'Slot 2', gameId: '224', img: '/assets/flash/224.png' },
      { id: 'slot-3', title: 'Slot 3', gameId: '232', img: '/assets/flash/232.png' },
      { id: 'slot-4', title: 'Slot 4', gameId: '233', img: '/assets/flash/233.png' },
      { id: 'slot-5', title: 'Slot 5', gameId: '235', img: '/assets/flash/235.png' },
      { id: 'slot-6', title: 'Slot 6', gameId: '236', img: '/assets/flash/236.png' },

    ],
    slot: [
      { id: 'slot1', title: 'Slot Magic', gameId: '223', img: 'https://ossimg.goa999.vip/GoaGame/vendorlogo/vendorlogo_20230710184642yw3q.png' ,bgColor:'rgb(77,144,254)'},
      { id: 'slot2', title: 'Super Slots', gameId: '240', img: 'https://ossimg.goa999.vip/GoaGame/vendorlogo/vendorlogo_202307101846164xab.png',bgColor:'rgb(77,144,254)' },
      { id: 'slot3', title: 'Slot Magic', gameId: '180', img: 'https://ossimg.goa999.vip/GoaGame/vendorlogo/vendorlogo_20230710184633b9w1.png',bgColor:'rgb(77,144,254)'},
      { id: 'slot4', title: 'Super Slots', gameId: '300', img: 'https://ossimg.goa999.vip/GoaGame/vendorlogo/vendorlogo_20230724124135ypq8.png',bgColor:'rgb(77,144,254)' },
      { id: 'slot5', title: 'Slot Magic', gameId: '223', img: 'https://ossimg.goa999.vip/GoaGame/vendorlogo/vendorlogo_20230710184550vu9q.png' ,bgColor:'rgb(77,144,254)'},
      { id: 'slot6', title: 'Super Slots', gameId: '240', img: 'https://ossimg.goa999.vip/GoaGame/vendorlogo/vendorlogo_20241017050424j8it.png',bgColor:'rgb(77,144,254)' },
      { id: 'slot7', title: 'Slot Magic', gameId: '180', img: 'https://ossimg.goa999.vip/GoaGame/vendorlogo/vendorlogo_20240508124035qn6t.png ',bgColor:'rgb(77,144,254)'},
      { id: 'slot8', title: 'Super Slots', gameId: '300', img: 'https://ossimg.goa999.vip/GoaGame/vendorlogo/vendorlogo_20230710184642yw3q.png',bgColor:'rgb(77,144,254)' },
    ],
    sports: [
      { id: 'football_sports', title: 'Football', gameId: '403', img: 'https://ossimg.goa999.vip/GoaGame/vendorlogo/vendorlogo_202312301253295lr5.png',subtitle:"Football",desc:"" },
      { id: 'cricket_sports', title: 'Cricket', gameId: '389', img: 'https://ossimg.goa999.vip/GoaGame/vendorlogo/vendorlogo_20230724124223a1c6.png',subtitle:"Cricket",desc:"" },
    ],
    casino: [
      { id: 'roulette_casino', title: 'Roulette Game', gameId: 'EVOLIVE_pv2zgy42anvdwk3l', img: '/assets/evolution/EVOLIVE_pv2zgy42anvdwk3l.png' ,subtitle:"Roulette",desc:""},

    ],
    cards: [
      { id: 'poker_cards', title: 'Poker', gameId: 'EVOLIVE_TRPTable00000001', img: '/assets/evolution/EVOLIVE_TRPTable00000001.png',subtitle:"Poker",desc:"365" },
      { id: 'baccarat_cards', title: 'Baccarat', gameId: 'EVOLIVE_Always8baccarat0', img: '/assets/evolution/EVOLIVE_Always8baccarat0.png' ,subtitle:"Baccarat",desc:"365"},
    ],
    dice: [
      { img: "/assets/games/jili/JL_260x380_GameID464_en-US.png", gameId: "464" },
      { img: "/assets/games/jili/JL_260x380_GameID404_en-US.png", gameId: "404" },
      { img: "/assets/games/jili/JL_260x380_GameID259_en-US.png", gameId: "259" },
      { img: "/assets/games/jili/JL_260x380_GameID427_en-US.png", gameId: "427" },
      { img: "/assets/games/jili/JL_260x380_GameID441_en-US.png", gameId: "441" },
      { img: "/assets/games/jili/JL_260x380_GameID439_en-US.png", gameId: "439" },
      { img: "/assets/games/jili/JL_260x380_GameID439_en-US.png", gameId: "439" },
      { img: "/assets/games/jili/JL_260x380_GameID439_en-US.png", gameId: "439" },
      { img: "/assets/games/jili/JL_260x380_GameID372_en-US.png", gameId: "372" },
      { img: "/assets/games/jili/JL_260x380_GameID440_en-US.png", gameId: "440" },
      { img: "/assets/games/jili/JL_260x380_GameID302_en-US.png", gameId: "302" },
      { img: "/assets/games/jili/JL_260x380_GameID400_en-US.png", gameId: "400" },
      { img: "/assets/games/jili/JL_260x380_GameID407_en-US.png", gameId: "407" },
      { img: "/assets/games/jili/JL_260x380_GameID399_en-US.png", gameId: "399" },
      { img: "/assets/games/jili/JL_260x380_GameID301_en-US.png", gameId: "301" },
      { img: "/assets/games/jili/JL_260x380_GameID258_en-US.png", gameId: "258" },
      { img: "/assets/games/jili/JL_260x380_GameID420_en-US.png", gameId: "420" },
      { img: "/assets/games/jili/JL_260x380_GameID074_en-US.png", gameId: "074" },
      { img: "/assets/games/jili/JL_260x380_GameID223_en-US.png", gameId: "223" },
      { img: "/assets/games/jili/JL_260x380_GameID240_en-US.png", gameId: "240" },
      { img: "/assets/games/jili/JL_260x380_GameID180_en-US.png", gameId: "180" },
    ],
    bingo: [
      { img: "/assets/games/jili/JL_260x380_GameID464_en-US.png", gameId: "464" },
      { img: "/assets/games/jili/JL_260x380_GameID397_en-US.png", gameId: "397" },
      { img: "/assets/games/jili/JL_260x380_GameID299_en-US.png", gameId: "299" },
      { img: "/assets/games/jili/JL_260x380_GameID464_en-US.png", gameId: "464" },
      { img: "/assets/games/jili/JL_260x380_GameID264_en-US.png", gameId: "264" },
      { img: "/assets/games/jili/JL_260x380_GameID263_en-US.png", gameId: "263" },
      { img: "/assets/games/jili/260x380_EN_GAMEID_300.png", gameId: "300" },
      { img: "/assets/games/jili/260x380_EN_GAMEID_252.png", gameId: "252" },
      { img: "/assets/games/jili/GAMEID_231_EN_260x380.png", gameId: "231" },
      { img: "/assets/games/jili/260x380_EN_GAMEID_114.png", gameId: "114" },
      { img: "/assets/games/jili/260x380_EN_GAMEID_153.png", gameId: "153" },
      { img: "/assets/games/jili/260x380_EN_GAMEID_253.png", gameId: "253" },
      { img: "/assets/games/jili/260x380_EN_GAMEID_259.png", gameId: "259" },
      { img: "/assets/games/jili/260x380_EN_GAMEID_301.png", gameId: "301" },
      { img: "/assets/games/jili/260x380_EN_GAMEID_220.png", gameId: "220" },
      { img: "/assets/games/jili/260x380_EN_GAMEID_226.png", gameId: "226" },
      { img: "/assets/games/jili/GAMEID_132_EN_260x380.png", gameId: "132" },
      { img: "/assets/games/jili/260x380_EN_GAMEID_298.png", gameId: "298" },
      { img: "/assets/games/jili/260x380_EN_GAMEID_209.png", gameId: "209" },
      { img: "/assets/games/jili/260x380_EN_GAMEID_238.png", gameId: "238" },
      { img: "/assets/games/jili/260x380_EN_GAMEID_208.png", gameId: "208" },
      { img: "/assets/games/jili/260x380_EN_GAMEID_254.png", gameId: "254" },
      { img: "/assets/games/jili/260x380_EN_GAMEID_211.png", gameId: "211" },
    ]
  };

  const [firstDepositMade, setFirstDepositMade] = useState(true);
  const [needToDepositFirst, setNeedToDepositFirst] = useState(false);
  const [phoneUserUid, setPhoneUserUid] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedGame, setSelectedGame] = useState(null);
  const [gameType, setGameType] = useState("");
  const [isDepositCheckLoading, setIsDepositCheckLoading] = useState(true);
  const [hasDeposit, setHasDeposit] = useState(false);
  
  const scrollToMiddle = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight / 2,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const checkDepositStatus = async () => {
      setIsDepositCheckLoading(true);
      try {
        const token = sessionStorage.getItem("token"); // Assuming the token is stored in sessionStorage
        const userResponse = await axios.get(`${domain}/user`, {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const depositResponse = await axios.get(`${domain}/need-to-deposit-first`, {
          withCredentials: true,
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

  const handleCloseDialog = useCallback(() => {
    setOpenDialog(false);
  }, []);

  const navigate = useNavigate();
  const handleConfirmRecharge = () => {
    // Navigate to recharge page or trigger recharge process
    window.location.href = "/recharge"; // Adjust this path as needed
  };

  const allgame = () => {
    // Navigate to recharge page or trigger recharge process
    window.location.href = "/all-games"; // Adjust this path as needed
  };

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



   const [isLoading, setIsLoading] = useState(true);
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


const handleItemClick = useCallback((path) => {
  
  if (!hasDeposit && !isDepositCheckLoading) {
    setSelectedGame({ game: path.split('/').pop() });
    setOpenDialog(true);
    return;
  }

  if (!path) {
    console.error('No path provided for navigation');
    return;
  }

  try {
    console.log('Navigating to:', path);
    navigate(path);
  } catch (error) {
    console.error('Navigation error:', error);
  }
}, [hasDeposit, isDepositCheckLoading, navigate]);
  


  const contentRef = useRef(null);

const handleTabClick = (index) => {
  setActiveTab(index);
  
  if (contentRef.current) {
    contentRef.current.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  }
};
  
  const SectionHeading = ({ title }) => (
<Box
    sx={{
      fontSize: '15px',
      fontWeight: 800,
      fontFamily: 'Arial, sans-serif',
      color: '#333',
      mb: 5,
      borderLeft: '3px solid #4D8FFF',
      pl: 2, // Add padding to the left
      lineHeight: '1.5', // Adjust line height to control border height
      width: 'fit-content'
    }}
  >
    {title}
  </Box>
);

  const LotteryItem = ({ title, subtitle, desc, img,onClick }) => (
    <Box
    onClick={onClick}
      sx={{
        height: '95px',
        bgcolor: 'rgb(255,142,41)',
        borderRadius: '16px',
        p: 1,
        mb: 2,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'stretch',
        color: 'white',
        cursor: 'pointer',
        transition: '0.3s',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
        }
      }}
    >
      <Box sx={{ textAlign: 'left', flex: 1 }}>
        <Box sx={{ fontSize: '19px', fontWeight: 700, mb: 1,fontFamily: "Arial, sans-serif" }}>
          {title}
        </Box>
        <Box sx={{ fontSize: '12px', fontWeight: 400, opacity: 0.9, mb: 0.5,fontFamily: "Arial, sans-serif" }}>
          {subtitle}
        </Box>
        <Box sx={{ fontSize: '12px', fontWeight: 400, opacity: 0.9, mb: 0.5,fontFamily: "Arial, sans-serif" }}>
          {desc}
        </Box>
      </Box>
      <Box //This is for the wingo tab
        component="img"
        src={img}
        alt={title}
        sx={{ 
          width: '110px',
          height: 'calc(100% + -10px)',
          objectFit: 'cover',
          borderRadius: '8px',
          ml: 2,
          mt: 1,
          mb: 1,
        }}
      />
    </Box>
  );

 // ...existing code...
 const GameGrid = ({ games, currentPage, setPage, onGameClick }) => {
  const itemsPerPage = 15;
  const currentItems = games.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);
  const totalPages = Math.ceil(games.length / itemsPerPage);

  return (
    
    <Box sx={{ position: 'relative' }}>
      <Box sx={{ 
        display: 'grid', 
        gridTemplateColumns: {
          xs: 'repeat(2, 1fr)', // 2 columns for extra small screens (below 600px, which includes your 300px requirement)
          sm: 'repeat(3, 1fr)', // 3 columns for small screens and above
          md: 'repeat(4, 1fr)', // 4 columns for medium screens and above
        },
        gap: 1,
        mb: 2
      }}>
        {currentItems.map((game) => (
         <Box
           key={game.id}
           onClick={() => onGameClick(game.gameId)}
           sx={{
             width: { xs: '100%', sm: 118 }, // Full width on extra small screens, fixed width on larger screens
             height: 140,
             marginRight: 0,
             bgcolor: '#4D8FFF',
             borderRadius: '16px',
             overflow: 'hidden',
             cursor: 'pointer',
             transition: '0.3s',
             '&:hover': {
               transform: 'scale(1.05)'
             }
           }}
         >
           <Box
             component="img"
             src={game.img}
             alt={game.title}
             sx={{
               width: '100%',
               height: '100%',
               objectFit: 'cover',
             }}
           />
         </Box>
        ))}
      </Box>
      
      {totalPages > 1 && (
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'flex-end',
          gap: 1,
          mt: 2
        }}>
          <Box 
            onClick={() => setPage(Math.max(0, currentPage - 1))}
            sx={{
              width: 32,
              height: 32,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              bgcolor: '#4D8FFF',
              borderRadius: '8px',
              cursor: 'pointer',
              color: '#fff',
              '&:hover': { bgcolor: '#4D8FFF' }
            }}
          >
            {'<'}
          </Box>
          <Box
            onClick={() => setPage(Math.min(totalPages - 1, currentPage + 1))}
            sx={{
              width: 32,
              height: 32,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              bgcolor: 'rgb(255,142,41)',
              borderRadius: '8px',
              cursor: 'pointer',
              color: '#fff',
              '&:hover': { bgcolor: '#4D8FFF' }
            }}
          >
            {'>'}
          </Box>
        </Box>
      )}
    </Box>
  );
};
// ...existing code...

  return (
    <Box sx={{ width: '100%', maxWidth: '4xl', margin: 'auto' }}>
      <Box sx={{ position: 'relative', px: 1 }}>
        <Box 
          sx={{
            display: 'flex',
            overflowX: 'hidden',
            scrollBehavior: 'smooth',
            position: 'relative',
            '&::-webkit-scrollbar': { display: 'none' },
            msOverflowStyle: 'none',
            scrollbarWidth: 'none',
          }}
        >
          
          <Grid 
  container 
  spacing={2} 
  sx={{ 
    mt: 0,
    maxWidth: '150%',
    '& .MuiGrid-item': {
      display: 'flex',
      justifyContent: 'center'
    }
  }} 
  label
>
  {/* First Row (3 items with background images) */}
  {tabs.slice(0, 3).map((tab, index) => (
    <Grid item xs={4} key={tab.id}>
      <Box
        ref={contentRef}
        onClick={() => handleTabClick(index)}
        sx={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          borderRadius: 3,
          p: 2,
          width: '100%',
          minHeight: {
            xs: '60px', 
            sm: '80px'
          },
          cursor: "pointer",
          transition: "all 0.3s",
          background: tab.bgImage,
          backgroundSize: "130% 130%",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          color: "white",
          boxShadow: activeTab === index
            ? "0px 4px 10px rgba(0, 0, 0, 0.1)"
            : "0px 2px 5px rgba(0, 0, 0, 0.1)",
          "&:hover": { transform: "scale(1.05)" },

          // Background overlay for first box
          ...(index === 0 && {
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgb(104,150,234)",
              opacity: 0.6,
              borderRadius: "inherit",
            },
          }),
        }}
      >
        {/* Larger Image Positioned Above the Box - Increased sizes */}
        <Box
          component="img"
          src={tab.img}
          alt={tab.label}
          sx={{
            width: { xs: 75, sm: 110 },  // Increased from 60/100
            height: { xs: 75, sm: 110 }, // Increased from 60/100
            objectFit: "contain",
            position: "absolute",
            top: { xs: "-18px", sm: "-25px" }, // Adjusted for larger images
            zIndex: 3,
          }}
        />
        
        {/* Text below image to keep the box size */}
        <span style={{ 
          fontWeight: "bold", 
          fontSize: "1rem", 
          marginTop: "60px", // Push text lower to maintain box height
          position: "relative", 
          zIndex: 1 
        }}>
          {tab.label}
        </span>
      </Box>
    </Grid>
  ))}

  {/* Second Row (Gradient background with dividers) */}
  <Grid item xs={12}>
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        p: 0,
        borderRadius: 3,
        position: "relative", // Needed for overlay positioning
        background: "rgb(246,148,114)",
        overflow: "hidden",
        width: '100%',

        // Adding Overlay
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(180, 170, 170, 0)",
          borderRadius: "inherit",
        },
      }}
    >
      {tabs.slice(3, 6).map((tab, index) => (
        <Box
          key={tab.id}
          onClick={() => handleTabClick(index + 3)}
          sx={{
            flex: 1,
            textAlign: "center",
            cursor: "pointer",
            transition: "all 0.3s",
            color: "white",
            zIndex: 1, // Keeps text and images above overlay
            "&:hover": { transform: "scale(1.05)" },
            position: "relative",
            py: { xs: 1, sm: 2 }, // Responsive padding

            // Vertical divider except for last item
            "&::after":
              index < 2
                ? {
                    content: '""',
                    position: "absolute",
                    right: 0,
                    top: "10%",
                    width: "2px",
                    height: "80%",
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                  }
                : {},
          }}
        >
          <Box
            component="img"
            src={tab.img}
            alt={tab.label}
            sx={{ 
              width: { xs: 50, sm: 70 },  // Increased from 40/60
              height: { xs: 50, sm: 70 }, // Increased from 40/60
              objectFit: "contain", 
              mb: 1 
            }}
          />
          <br />
          <span style={{ 
            fontWeight: "bold", 
            fontSize: { xs: "0.8rem", sm: "1rem" } 
          }}>
            {tab.label}
          </span>
        </Box>
      ))}
    </Box>
  </Grid>

  {/* Third Row (2 items with solid background colors) */}
  {tabs.slice(6, 8).map((tab, index) => (
    <Grid item xs={6} key={tab.id}>
      <Box
        onClick={() => handleTabClick(index + 6)}
        sx={{
          width: { xs: '100%', sm: 165 },
          height: { xs: 50, sm: 65 },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          borderRadius: 3,
          p: 1,
          cursor: "pointer",
          transition: "all 0.3s",
          background: tab.bgcolor,
          color: "white",
          boxShadow: activeTab === index + 6
            ? "0px 4px 10px rgba(0, 0, 0, 0.3)"
            : "0px 2px 5px rgba(0, 0, 0, 0.1)",
          "&:hover": { transform: "scale(1.05)" },
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center", // Aligns items vertically
            justifyContent: "space-between", // Centers content horizontally
            gap: 1, // Adds space between image and text
            width: '100%'
          }}
        >
          <Box
            component="img"
            src={tab.img}
            alt={tab.label}
            sx={{ 
              width: { xs: 50, sm: 75 },  // Increased from 40/65
              height: { xs: 55, sm: 80 }, // Increased from 45/70
              objectFit: "contain" 
            }}
          />
          <span style={{ 
            fontWeight: "bold", 
            fontSize: { xs: "0.8rem", sm: "1rem" } 
          }}>
            {tab.label}
          </span>
        </Box>
      </Box>
    </Grid>
  ))}
</Grid>

        </Box>
      </Box>

      <Box sx={{ mt: 3, px: 2 }}>
        {activeTab === 1 && (
          <Box>
            <SectionHeading title="Lottery" />
            {lotteryGames.map((game) => (
              <LotteryItem
                key={game.id}
                title={game.title}
                subtitle={game.subtitle}
                desc={game.desc}
                img={game.img}
                onClick={() => handleItemClick(game.path)}
              />
            ))}
          </Box>
        )}
        


{activeTab === 0 && (
  <Box sx={{ width: '100%', overflow: 'hidden' }}>
  <SectionHeading title="Platform Recommended Games" />
  <Box
    sx={{
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: 1,
      mb: 4,
      width: '100%',
      '& > *': {
        width: '100%',
        minWidth: 0,
      }
    }}
  >
    {gamesByTab.flash.slice(0, 30).map((game, index) => (
      <Box 
        key={index}
        onClick={() => {
          if (!hasDeposit && !isDepositCheckLoading) {
            setSelectedGame({ game: 'Flash Game' });
            setOpenDialog(true);
            return;
          }
          topbet(game.gameId);
        }}
        sx={{
          cursor: 'pointer',
          transition: 'transform 0.2s',
          '&:hover': { transform: 'scale(1.02)' },
        }}
      >
        <img 
          src={game.img} 
          alt={game.title}
          style={{ 
            width: '100%', 
            height: 'auto',
            borderRadius: '8px',
          }} 
        />
       
      </Box>
    ))}
  </Box>
  
  <SectionHeading title="Popular Games" />
  <Box
    sx={{
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: 1,
      mb: 4,
      width: '100%',
      '& > *': {
        width: '100%',
        minWidth: 0,
      }
    }}
  >
    {gamesByTab.popular.slice(0, 30).map((game, index) => (
      <Box 
        key={index}
        onClick={() => {
          if (!hasDeposit && !isDepositCheckLoading) {
            setSelectedGame({ game: 'Flash Game' });
            setOpenDialog(true);
            return;
          }
          jili(game.gameId);
        }}
        sx={{
          cursor: 'pointer',
          transition: 'transform 0.2s',
          '&:hover': { transform: 'scale(1.02)' },
        }}
      >
        <img 
          src={game.img} 
          alt={game.title}
          style={{ 
            width: '100%', 
            height: 'auto',
            borderRadius: '8px',
          }} 
        />
       
      </Box>
    ))}
  </Box>
</Box>
)}

{activeTab === 2 && (
  <Box>
    <SectionHeading title="Slot Games" />
    <GameGrid 
      games={gamesByTab.slot}
      currentPage={slotPage}
      setPage={setSlotPage}
      onGameClick={(gameId) => {
        if (!hasDeposit && !isDepositCheckLoading) {
          setSelectedGame({ game: 'Slot Game' });
          setOpenDialog(true);
          return;
        }
        allgame();
      }}
    />
  </Box>
)}


{activeTab === 4 && (
          <Box>
            <SectionHeading title="Casino" />
            {gamesByTab.casino.map((game) => (
              <LotteryItem
                key={game.id}
                title={game.title}
                subtitle={game.subtitle}
                desc={game.desc}
                img={game.img}
              
              />
            ))}
          </Box>
 )}

{activeTab === 3 && (
  <Box>
    <SectionHeading title="Sports Games" />
    {gamesByTab.sports.map((game) => (
              <LotteryItem
                key={game.id}
                title={game.title}
                subtitle={game.subtitle}
                desc={game.desc}
                img={game.img}
               
              />
            ))}
  </Box>
)}

{/* {activeTab === 4 && (
  <Box>
    <SectionHeading title="Casino Games" />
    <GameGrid 
      games={gamesByTab.casino}
      currentPage={casinoPage}
      setPage={setCasinoPage}
      onGameClick={(gameId) => {
        if (!hasDeposit && !isDepositCheckLoading) {
          setSelectedGame({ game: 'Casino Game' });
          setOpenDialog(true);
          return;
        }
        jili(gameId);
      }}
    />
  </Box>
)} */}

{activeTab === 5 && (
  <Box>
    <SectionHeading title="Card Games" />
    {gamesByTab.cards.map((game) => (
              <LotteryItem
                key={game.id}
                title={game.title}
                subtitle={game.subtitle}
                desc={game.desc}
                img={game.img}
               
              />
            ))}
  </Box>
)}

{activeTab === 6 && (
  <Box>
    <SectionHeading title="Dice Games" />
    <GameGrid 
      games={gamesByTab.dice}
      currentPage={dicePage}
      setPage={setDicePage}
      onGameClick={(gameId) => {
        if (!hasDeposit && !isDepositCheckLoading) {
          setSelectedGame({ game: 'Dice Game' });
          setOpenDialog(true);
          return;
        }
        jili(gameId);
      }}
    />
  </Box>
)}

{activeTab === 7 && (
  <Box>
    <SectionHeading title="Bingo Games" />
    <GameGrid 
      games={gamesByTab.bingo}
      currentPage={bingoPage}
      setPage={setBingoPage}
      onGameClick={(gameId) => {
        if (!hasDeposit && !isDepositCheckLoading) {
          setSelectedGame({ game: 'Bingo Game' });
          setOpenDialog(true);
          return;
        }
        jili(gameId);
      }}
    />
  </Box>
)}
      </Box>
      <RechargeDialog
    open={openDialog}
    onClose={handleCloseDialog}
    onConfirm={handleConfirmRecharge}
    selectedGame={selectedGame}
  />
    </Box>
  );
};

export default TabLayout;