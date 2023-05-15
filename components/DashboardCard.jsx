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
  Card,
  CardHeader,
  CardBody,
  Heading,
} from "@chakra-ui/react";

const DashboardCard = ({ title, content, background }) => {
  return (
    <Card
      bg={useColorModeValue("rgba(255,255,255,0.8)", "rgba(0,0,0,0.25)")}
      backgroundImage={background}
      backgroundSize="contain"
      height="250px"
      width="250px"
      borderColor="black"
      shadow="lg"
      rounded="md"
    >
      <CardHeader>
        <Heading size="xs" textTransform="uppercase">
          {title}
        </Heading>
      </CardHeader>
      <CardBody>{content}</CardBody>
    </Card>
  );
};

export default DashboardCard;
