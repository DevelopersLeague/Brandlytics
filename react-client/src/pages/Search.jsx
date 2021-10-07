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
import { useAuthStore } from "../stores";

function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSearched, setIsSearched] = useState(false);
  const [todayResult, setTodayResult] = useState(false);
  const [sentimentData, setSentimentData] = useState(Array);
  const user = useAuthStore((store) => store.user);
  const history = useHistory();

  console.log(history.location.search);

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

  const data = [
    {
      name: "Page A",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Page B",
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "Page C",
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: "Page D",
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: "Page E",
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: "Page F",
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: "Page G",
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];

  return (
    <>
      <Container
        // bg="#fbfcfe"
        // borderRadius="3xl"
        p="3"
        maxW="7xl"
        display="flex"
        justifyContent="center"
        alignItems="center"
        marginTop="10"
        marginBottom="10"
      >
        <Flex direction="row">
          {/* <Flex direction="column" p="3" width="72">
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
          </Flex> */}
          <Flex
            direction="column"
            bg="#f0f3ff"
            width="6xl"
            p="5"
            borderRadius="lg"
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
              boxShadow="md"
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
                boxShadow="md"
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
                boxShadow="md"
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
                {/* <Button ml="2" colorScheme="blue">
                  Save <StarIcon ml="2" />
                </Button>
                <Button ml="2" colorScheme="blue" color="white">
                  Download <DownloadIcon ml="2" />
                </Button> */}
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
                boxShadow="2xl"
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
