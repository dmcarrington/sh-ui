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
  Image,
} from "@chakra-ui/react";

const DashboardCard = ({ title, content, background }) => {
  return (
    <Card
      bg={useColorModeValue("rgba(255,255,255,0.8)", "rgba(0,0,0,0.25)")}
      borderColor="black"
      shadow="lg"
      rounded="md"
      minW="100px"
      maxW="350px"
      minH="100px"
      maxH="400px"
    >
      <CardHeader>
        <Heading size="xs" textTransform="uppercase">
          {title}
        </Heading>
      </CardHeader>
      <CardBody>{content}</CardBody>
      <Image src={background} objectFit="cover"></Image>
    </Card>
  );
};

export default DashboardCard;
