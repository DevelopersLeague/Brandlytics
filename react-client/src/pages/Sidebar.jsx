import React from "react";
import { useState } from "react";
import { Container } from "@chakra-ui/react";
import { Link, useHistory } from "react-router-dom";
import { Flex, Spacer, Button, Heading, Text } from "@chakra-ui/react";
import {
  SearchIcon,
  StarIcon,
  ExternalLinkIcon,
  UnlockIcon,
} from "@chakra-ui/icons";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import Search from "./Search";
import { useAuthStore } from "../stores";

function Sidebar() {
  const history = useHistory();
  const path = history.location.pathname;
  const store = useAuthStore();
  const isHome = path.includes("home");
  const isSearch = path.includes("search");
  const isSave = path.includes("save");
  return (
    <>
      <Flex direction="column" p="3" width="72">
        <Heading
          lineHeight={1.1}
          fontWeight={600}
          fontSize={{ base: "3xl", sm: "2xl", lg: "3xl" }}
        >
          <Text>
            Brandl
            <Text as="span" insetInline="auto" color="purple.700">
              ytics
            </Text>
          </Text>
        </Heading>
        <Flex direction="column" mt="12">
          <Button
            boxShadow="md"
            colorScheme="pink"
            variant="outline"
            width="100%"
            borderTopRightRadius="2xl"
            size={"lg"}
            fontWeight={"normal"}
            px={6}
            onClick={() => {
              history.push("/");
            }}
            isActive={isHome}
            leftIcon={<ExternalLinkIcon />}
          >
            Home
          </Button>
          <Button
            mt="2"
            boxShadow="md"
            colorScheme="pink"
            variant="outline"
            width="100%"
            borderTopRightRadius="2xl"
            size={"lg"}
            fontWeight={"normal"}
            px={6}
            onClick={() => {
              history.push("/search");
            }}
            isActive={isSearch}
            leftIcon={<SearchIcon />}
          >
            Search
          </Button>

          <Button
            boxShadow="md"
            mt="2"
            colorScheme="pink"
            variant="outline"
            width="100%"
            borderTopRightRadius="2xl"
            size={"lg"}
            fontWeight={"normal"}
            px={6}
            onClick={()=>{
              history.push('/saved')
            }}
            isActive={isSave}
            leftIcon={<StarIcon />}
          >
            Saved
          </Button>
        </Flex>
        <Flex mt="auto">
          <Button
            boxShadow="md"
            mt="2"
            colorScheme="gray"
            variant="outline"
            width="100%"
            borderTopRightRadius="2xl"
            size={"lg"}
            fontWeight={"normal"}
            px={6}
            onClick={() => {
              store.setUser(null);
              localStorage.removeItem("token");
              history.push("/login");
            }}
            leftIcon={<UnlockIcon />}
          >
            Logout
          </Button>
        </Flex>
      </Flex>
    </>
  );
}

export default Sidebar;
