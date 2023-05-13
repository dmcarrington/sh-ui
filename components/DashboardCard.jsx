import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  Button,
  Box,
  useColorModeValue,
  SimpleGrid,
} from "@chakra-ui/react";

const DashboardCard = ({ title, content, background }) => {
  const backgroundImg = {
    height: "100%",
    width: "100%",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundAttachment: "fixed",
    backgroundImage: "satoshis_hive_logo.png",
    position: "relative",
    zIndex: "999",
  };
  const satoshisHiveLogo = require("../public/satoshis_hive_logo.png");

  return (
    <>
      <Box display="grid" justifyContent="center" height="150px">
        <Box sx={backgroundImg}></Box>

        <Box
          gridArea="1 / 1"
          border="1px"
          width="100%"
          height="100%"
          borderColor="black"
          marginY="15px"
          shadow="lg"
          rounded="md"
          bg={useColorModeValue("rgba(255,255,255,0.8)", "rgba(0,0,0,0.25)")}
        >
          My Dashboard card
        </Box>
      </Box>
    </>
  );
};

export default DashboardCard;
