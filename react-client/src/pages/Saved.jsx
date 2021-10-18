import React from "react";
import * as datefns from "date-fns";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import {
  FormControl,
  FormLabel,
  Container,
  Flex,
  Box,
  Heading,
  Text,
  Button,
  Spinner,
} from "@chakra-ui/react";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  SkeletonText,
  SkeletonCircle,
} from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";
import {
  StarIcon,
  ChevronRightIcon,
  DownloadIcon,
  InfoOutlineIcon,
  MinusIcon,
  AddIcon,
} from "@chakra-ui/icons";
import { client } from "../apiclient";
import {
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Line,
  BarChart,
  Bar,
  Legend,
} from "recharts";
import { useAuthStore } from "../stores";
import Sidebar from "./Sidebar";
import { useEffect, effect } from "react";
import { useLocation } from "react-router-dom";

function Saved() {
  const colors = ["steelblue", "violet", "red", "teal", "pink", "purple"];
  const [categories, setCategories] = useState([]);
  const [Terms, setTerms] = useState([]);
  const [gotCategories, setGotCategories] = useState(false);
  const user = useAuthStore((store) => store.user);
  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };
  const query = useQuery();

  const helperFunction = async () => {
    const categoriesList = await client.getCategories();
    const searchTerms = await client.getQueries();
    setCategories(categoriesList);
    setTerms(searchTerms);
  };
  useEffect(() => {
    helperFunction();
    setGotCategories(true);
  }, []);
  return (
    <>
      <Container
        bg="#fbfcfe"
        borderRadius="3xl"
        p="3"
        maxW="7xl"
        marginTop="10"
        marginBottom="10"
      >
        <Flex direction="row">
          <Sidebar />
          <Flex
            direction="column"
            bg="#f0f3ff"
            width="6xl"
            p="5"
            borderRadius="lg"
            boxShadow="md"
          >
            <Heading
              lineHeight={1.1}
              fontWeight={600}
              fontSize={{ base: "2xl", sm: "2xl", lg: "2xl" }}
            >
              <Text>
                {user.firstname}'s Saved Terms <StarIcon color="purple" />
              </Text>
              <Text fontSize="small" color="gray.500" mt="2">
                Your Categorised, Search Terms!
              </Text>
            </Heading>

            <Box
              mt="8"
              p="5"
              alignSelf="center"
              textAlign="center"
              bg="white"
              borderRadius="2xl"
              width="4xl"
              as="form"
              boxShadow="lg"
            >
              {" "}
              {gotCategories ? (
                <Accordion
                  allowMultiple
                  padding="2"
                  border="1px"
                  borderColor="pink"
                  borderTopRightRadius="2xl"
                  boxShadow="md"
                >
                  {categories.map((category) => {
                    return (
                      <Box
                        display="inline-flex"
                        m="4"
                        borderTopRightRadius="2xl"
                        borderColor={
                          colors[Math.floor(Math.random() * colors.length)]
                        }
                      >
                        <AccordionItem
                          display="inline"
                          boxShadow="inner"
                          borderTopRightRadius="2xl"
                        >
                          <AccordionButton
                            _expanded={{
                              bg: colors[
                                Math.floor(Math.random() * colors.length)
                              ],
                              borderTopRightRadius: "2xl",
                              color: "white",
                            }}
                          >
                            <Box
                              flex="1"
                              textAlign="left"
                              display="inline"
                              mr="4"
                            >
                              <Text
                                fontSize="2xl"
                                color="gray.900"
                                textTransform="capitalize"
                                textShadow="2xl"
                              >
                                {category}
                              </Text>
                            </Box>
                            <AccordionIcon />
                          </AccordionButton>

                          {Terms.map((searchTerm) => {
                            if (searchTerm.category == category) {
                              return (
                                <AccordionPanel
                                  display="inline-flex"
                                  borderBottomRightRadius="2xl"
                                  p="2"
                                >
                                  <Box
                                    display="inline-flex"
                                    borderColor="black"
                                    borderBottomRightRadius="2xl"
                                  >
                                    <Text
                                      display="inline-flex"
                                      as="a"
                                      href={
                                        "/search?" +
                                        new URLSearchParams([
                                          ["q", searchTerm.content],
                                        ])
                                      }
                                      fontSize="lg"
                                      fontFamily="serif"
                                    >
                                      {searchTerm.content}
                                    </Text>
                                  </Box>
                                </AccordionPanel>
                              );
                            }
                          })}
                        </AccordionItem>
                      </Box>
                    );
                  })}
                </Accordion>
              ) : (
                <>
                  <Spinner
                    thickness="4px"
                    speed="0.65s"
                    emptyColor="gray.200"
                    color="blue.500"
                    size="xl"
                  />
                  <Box padding="6" boxShadow="lg" bg="white">
                    <SkeletonCircle size="10" />
                    <SkeletonText mt="4" noOfLines={4} spacing="4" />
                  </Box>
                </>
              )}
            </Box>
          </Flex>
        </Flex>
      </Container>
    </>
  );
}

export default Saved;
