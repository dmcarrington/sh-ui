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
  Link,
  LinkOverlay,
} from "@chakra-ui/react";
import NextLink from "next/link";
import styles from "../styles/DashboardCard.module.css";

const DashboardCard = ({ title, content, background, link }) => {
  return (
    <NextLink href={link}>
      <Card
        bg={useColorModeValue("rgba(255,255,255,0.95)", "rgba(0,0,0,0.95)")}
        borderColor="black"
        shadow="lg"
        rounded="md"
        minW="100px"
        maxW="350px"
        minH="350px"
        maxH="370px"
        className={styles.link}
      >
        <CardHeader>
          <Heading size="s" textTransform="uppercase">
            <b>{title}</b>
          </Heading>
        </CardHeader>
        <CardBody>{content}</CardBody>
        <Image src={background} objectFit="cover"></Image>
      </Card>
    </NextLink>
  );
};

export default DashboardCard;
