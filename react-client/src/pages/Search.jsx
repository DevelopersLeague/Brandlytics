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
  Select,
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
} from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";
import {
  StarIcon,
  ChevronRightIcon,
  DownloadIcon,
  InfoOutlineIcon,
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
import { useLocation } from "react-router-dom";
import { useEffect, effect } from "react";
import { useAuthStore } from "../stores";
import Sidebar from "./Sidebar";

function Search() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isModalLoading, setIsModalLoading] = useState(false);
  const [isCategoriesLoading, setIsCategoriesLoading] = useState(false);
  const [isSearched, setIsSearched] = useState(false);
  const [todayResult, setTodayResult] = useState(false);
  const [sentimentData, setSentimentData] = useState(Array);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [inputCategory, setInputCategory] = useState("");
  const user = useAuthStore((store) => store.user);
  const history = useHistory();
  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };
  const query = useQuery();
  useEffect(() => {
    setSearchTerm(query.get("q"));
  }, []);
  const isDropDownDisabled = inputCategory != "" ? true : false;
  const isInputDisabled = selectedCategory != "" ? true : false;
  const currentCategory = isInputDisabled ? selectedCategory : inputCategory;
  // setCategories(client.getCategories());
  // console.log(categories);

  const handleSearch = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTodayResult(false);
    try {
      const sentiments = await client.getSentiment(searchTerm);
      setSentimentData(sentiments.sentiments);
      setIsLoading(false);
      setIsSearched(true);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setIsModalLoading(true);
    try {
      await client.addQuery({ content: searchTerm, category: currentCategory });
      setSelectedCategory("");
      setInputCategory("");
      setIsModalLoading(false);
      onClose();
    } catch (err) {
      console.log(err);
      setIsModalLoading(false);
    }
    const queries = await client.getQueries();
  };

  const handleOnInputCategory = (e) => {
    setInputCategory(e.target.value);
  };

  const handleOnSelectCategory = (e) => {
    setSelectedCategory(e.target.value);
  };

  return (
    <>
      <Container
        bg="#fbfcfe"
        borderRadius="3xl"
        p="3"
        maxW="7xl"
        marginTop="10"
        marginBottom="10"
        boxShadow="xl"
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
                Hi, {user.firstname} {user.lastname} 👋
              </Text>
              <Text fontSize="small" color="gray.500" mt="2">
                Welcome back, nice to see you again!
              </Text>
            </Heading>

            <Box
              mt="8"
              p="3"
              alignSelf="center"
              textAlign="center"
              bg="white"
              borderRadius="2xl"
              width="4xl"
              as="form"
              boxShadow="lg"
            >
              <FormControl id="term" mb="6">
                <FormLabel fontSize="xl">Search Term</FormLabel>
                <Input
                  fontSize="large"
                  placeholder="Enter The Search Term With #"
                  p="3"
                  isDisabled={isLoading}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                  }}
                  value={searchTerm}
                ></Input>
              </FormControl>
              <Button
                type="submit"
                colorScheme="blue"
                isLoading={isLoading}
                onClick={handleSearch}
                width={"full"}
                rightIcon={<StarIcon />}
              >
                Get Sentiment Analysis
              </Button>
            </Box>
            {isSearched && isLoading && (
              <Box
                mt="8"
                p="3"
                alignSelf="center"
                alignContent="center"
                textAlign="center"
                alignItems="center"
                bg="white"
                borderRadius="2xl"
                width="4xl"
                as="form"
                boxShadow="lg"
              >
                <Spinner />
              </Box>
            )}

            {isSearched && !isLoading ? (
              <Box
                mt="8"
                py="8"
                px="3"
                alignSelf="center"
                alignContent="center"
                textAlign="center"
                alignItems="center"
                bg="white"
                borderRadius="2xl"
                width="4xl"
                as="form"
                boxShadow="lg"
              >
                <Heading
                  lineHeight={1.1}
                  fontWeight={600}
                  mb="5"
                  fontSize={{ base: "2xl", sm: "2xl", lg: "2xl" }}
                >
                  <Text>
                    Results <ChevronRightIcon />
                  </Text>
                </Heading>
                <LineChart
                  width={800}
                  height={300}
                  data={sentimentData.map((item) => {
                    return {
                      date: datefns.format(new Date(item.date), "dd MMM yyyy"),
                      positive: parseFloat(
                        ((item.positive * 100) / item.total).toFixed(3)
                      ),
                      negative: parseFloat(
                        ((item.negative * 100) / item.total).toFixed(3)
                      ),
                      total: 100,
                    };
                  })}
                  margin={{ left: 10, top: 10, bottom: 20 }}
                >
                  <XAxis dataKey="date" tickMargin={12} />
                  <YAxis tickFormatter={(val) => val + "%"} />
                  <Tooltip />
                  <Legend />
                  <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                  <Line type="monotone" dataKey="negative" stroke="#f70000" />
                  <Line type="monotone" dataKey="positive" stroke="#82ca9d" />
                </LineChart>
                <Button
                  colorScheme="blue"
                  color="white"
                  onClick={() => {
                    setTodayResult(true);
                  }}
                >
                  Get Todays Analysis <InfoOutlineIcon ml="2" color="white" />
                </Button>
                <Button
                  ml="2"
                  colorScheme="blue"
                  isLoading={isCategoriesLoading}
                  onClick={async () => {
                    setIsCategoriesLoading(true);
                    const categories = await client.getCategories();
                    setCategories(categories);
                    setIsCategoriesLoading(false);
                    onOpen();
                  }}
                >
                  Save <StarIcon ml="2" />
                </Button>
                <Modal isOpen={isOpen} onClose={onClose}>
                  <ModalOverlay />
                  <ModalContent>
                    <ModalHeader>Save Search Term</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                      <FormControl>
                        <FormLabel>Category</FormLabel>
                        <Select
                          placeholder="Select Category"
                          variant="filled"
                          value={selectedCategory}
                          onChange={handleOnSelectCategory}
                          isDisabled={isDropDownDisabled}
                        >
                          {categories.map((category) => {
                            return <option value={category}>{category}</option>;
                          })}
                        </Select>
                        <Input
                          placeholder="Create New Category"
                          mt="3"
                          isDisabled={isInputDisabled}
                          onChange={handleOnInputCategory}
                        />
                      </FormControl>
                    </ModalBody>

                    <ModalFooter>
                      <Button
                        colorScheme="blue"
                        mr={3}
                        isLoading={isModalLoading}
                        onClick={handleSave}
                      >
                        Save
                      </Button>
                      <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                  </ModalContent>
                </Modal>
                <Button
                  ml="2"
                  colorScheme="blue"
                  color="white"
                  as="a"
                  href={client.getDownloadUrl({ term: searchTerm })}
                  download={true}
                  target="_blank"
                >
                  Download <DownloadIcon ml="2" />
                </Button>
              </Box>
            ) : null}
            {todayResult ? (
              <Box
                mt="8"
                p="3"
                alignSelf="center"
                alignContent="center"
                textAlign="center"
                alignItems="center"
                bg="white"
                borderRadius="2xl"
                width="4xl"
                boxShadow="lg"
              >
                <Heading
                  lineHeight={1.1}
                  fontWeight={600}
                  fontSize={{ base: "2xl", sm: "2xl", lg: "2xl" }}
                >
                  <Text>
                    Todays Results
                    <ChevronRightIcon />
                  </Text>
                </Heading>
                <BarChart
                  width={850}
                  height={300}
                  data={[
                    // {
                    //   date: "1",
                    //   negative: sentimentData[6].negative,
                    //   positive: sentimentData[6].positive,
                    //   total: sentimentData[6].total,
                    // },
                    {
                      date: datefns.format(
                        new Date(sentimentData[6].date),
                        "dd MMM yyyy"
                      ),
                      positive: parseFloat(
                        (
                          (sentimentData[6].positive * 100) /
                          sentimentData[6].total
                        ).toFixed(3)
                      ),
                      negative: parseFloat(
                        (
                          (sentimentData[6].negative * 100) /
                          sentimentData[6].total
                        ).toFixed(3)
                      ),
                      total: 100,
                    },
                  ]}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="negative" fill="#f70000" />
                  <Bar dataKey="positive" fill="#82ca9d" />
                </BarChart>
              </Box>
            ) : (
              ""
            )}
          </Flex>
        </Flex>
      </Container>
    </>
  );
}

export default Search;
