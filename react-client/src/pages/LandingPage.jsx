import React from "react";
import {
  Container,
  Stack,
  Flex,
  Box,
  Heading,
  Text,
  Button,
  Image,
  Icon,
  IconButton,
  createIcon,
  IconProps,
  useColorModeValue,
  Skeleton,
} from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import logo from "../images/Brandlytics.png";
import { Link, useHistory } from "react-router-dom";
import GitHubButton from "react-github-btn";
import { useAuthStore } from "../stores";

function LandingPage() {
  const history = useHistory();
  const user = useAuthStore((store) => store.user);
  return (
    <>
      <Container maxW={"7xl"}>
        <Flex
          bg="#f6f7fb"
          p="3"
          borderRadius="3xl"
          borderTopRadius="0"
          shadow="md"
          justifyContent="space-between"
          pos="fixed"
          width="89%"
          zIndex="9999"
        >
          <Link to="/">
            <Image src={logo} alt="Segun Adebayo" height="10" />
          </Link>
          {!user ? (
            <Button
              rounded={"full"}
              size={"lg"}
              fontWeight={"normal"}
              px={6}
              colorScheme={"red"}
              bg={"black"}
              _hover={{ bg: "red.500" }}
              onClick={() => {
                history.push("/login");
              }}
            >
              Login
            </Button>
          ) : (
            <Button
              rounded={"full"}
              size={"lg"}
              fontWeight={"normal"}
              px={6}
              colorScheme={"red"}
              bg={"black"}
              _hover={{ bg: "red.500" }}
              onClick={() => {
                history.push("/login");
              }}
            >
              Logout
            </Button>
          )}
        </Flex>
        <Stack
          align={"center"}
          spacing={{ base: 8, md: 10 }}
          py={{ base: 20, md: 28 }}
          direction={{ base: "column", md: "row" }}
        >
          <Stack flex={1} spacing={{ base: 5, md: 10 }} mt="14">
            <Heading
              lineHeight={1.1}
              fontWeight={600}
              fontSize={{ base: "3xl", sm: "4xl", lg: "6xl" }}
            >
              <Text
                as={"span"}
                position={"relative"}
                _after={{
                  content: "''",
                  width: "full",
                  height: "30%",
                  position: "absolute",
                  bottom: 1,
                  left: 0,
                  bg: "red.400",
                  zIndex: -1,
                }}
              >
                Brandlytics,
              </Text>
              <br />
              <Text as={"animateTransform"} color={"red.400"}>
                Your Analysis Partner!
              </Text>
            </Heading>
            <Text color={"gray.500"}>
              Snippy is a rich coding snippets app that lets you create your own
              code snippets, categorize them, and even sync them in the cloud so
              you can use them anywhere. All that is free!
            </Text>
            <Stack
              spacing={{ base: 4, sm: 6 }}
              direction={{ base: "column", sm: "row" }}
            >
              <Button
                rounded={"full"}
                size={"lg"}
                fontWeight={"normal"}
                px={6}
                rightIcon={<ArrowForwardIcon h={4} w={4} color={"gray.500"} />}
                onClick={() => {
                  history.push("/signup");
                }}
              >
                Register
              </Button>
            </Stack>
          </Stack>
          <Flex
            flex={1}
            justify={"center"}
            align={"center"}
            position={"relative"}
            w={"full"}
          >
            <Blob
              w={"150%"}
              h={"150%"}
              position={"absolute"}
              top={"-20%"}
              left={0}
              zIndex={-1}
              color={useColorModeValue("red.50", "red.400")}
            />
            <Box
              position={"relative"}
              height={"300px"}
              rounded={"3xl"}
              boxShadow={"2xl"}
              width={"90%"}
              overflow={"hidden"}
              _hover={{ boxShadow: "7xl" }}
            >
              <Image
                alt={"Hero Image"}
                fit={"cover"}
                align={"center"}
                w={"100%"}
                h={"100%"}
                src={
                  "https://image.freepik.com/free-vector/flat-hand-drawn-people-analyzing-growth-charts_52683-56516.jpg"
                }
              />
            </Box>
          </Flex>
        </Stack>

        <Stack
          align={"center"}
          spacing={{ base: 8, md: 10 }}
          py={{ base: 20, md: 28 }}
          direction={{ base: "column", md: "row" }}
          borderRadius="3xl"
          bg="gray.100"
          p="4"
          shadow="2xl"
        >
          <Flex
            flex={1}
            justify={"center"}
            align={"center"}
            position={"relative"}
            w={"full"}
          >
            <Blob
              w={"150%"}
              h={"150%"}
              position={"absolute"}
              top={"-20%"}
              left={0}
              zIndex={1}
              color={useColorModeValue("teal.50", "teal.400")}
            />
            <Box
              zIndex={999}
              position={"relative"}
              height={"300px"}
              rounded={"3xl"}
              boxShadow={"2xl"}
              width={"90%"}
              overflow={"hidden"}
              _hover={{ boxShadow: "7xl" }}
            >
              <Image
                alt={"Hero Image"}
                fit={"cover"}
                align={"center"}
                w={"100%"}
                h={"100%"}
                src={
                  "https://image.freepik.com/free-vector/bloggers-attracting-audience-getting-money-influencers-generating-new-leads-cartoon-illustration_74855-14290.jpg"
                }
              />
            </Box>
          </Flex>
          <Stack flex={1} spacing={{ base: 5, md: 10 }}>
            <Heading
              lineHeight={1.1}
              fontWeight={600}
              fontSize={{ base: "3xl", sm: "4xl", lg: "6xl" }}
            >
              <Text
                as={"span"}
                position={"relative"}
                _after={{
                  content: "''",
                  width: "full",
                  height: "30%",
                  position: "absolute",
                  bottom: 1,
                  left: 0,
                  bg: "red.400",
                  zIndex: -1,
                }}
              >
                Filtered Results!
              </Text>
              <br />
            </Heading>
            <Text color={"gray.500"}>
              Snippy is a rich coding snippets app that lets you create your own
              code snippets, categorize them, and even sync them in the cloud so
              you can use them anywhere. All that is free!
            </Text>
            <Stack
              spacing={{ base: 4, sm: 6 }}
              direction={{ base: "column", sm: "row" }}
            >
              <Button
                rounded={"full"}
                size={"lg"}
                fontWeight={"normal"}
                px={6}
                rightIcon={<ArrowForwardIcon h={4} w={4} color={"gray.500"} />}
                onClick={() => {
                  history.push("/login");
                }}
              >
                Get Started
              </Button>
            </Stack>
          </Stack>
        </Stack>

        <Stack
          align={"center"}
          spacing={{ base: 8, md: 10 }}
          py={{ base: 20, md: 28 }}
          direction={{ base: "column", md: "row" }}
          borderRadius="3xl"
          bg="gray.100"
          p="4"
          shadow="2xl"
          mt="20"
        >
          <Stack flex={1} spacing={{ base: 5, md: 10 }}>
            <Heading
              lineHeight={1.1}
              fontWeight={600}
              fontSize={{ base: "3xl", sm: "4xl", lg: "6xl" }}
            >
              <Text
                as={"span"}
                position={"relative"}
                _after={{
                  content: "''",
                  width: "full",
                  height: "30%",
                  position: "absolute",
                  bottom: 1,
                  left: 0,
                  bg: "red.400",
                  zIndex: -1,
                }}
              >
                Save, Download!
              </Text>
              <br />
            </Heading>
            <Text color={"gray.500"}>
              Snippy is a rich coding snippets app that lets you create your own
              code snippets, categorize them, and even sync them in the cloud so
              you can use them anywhere. All that is free!
            </Text>
            <Stack
              spacing={{ base: 4, sm: 6 }}
              direction={{ base: "column", sm: "row" }}
            >
              <Button
                rounded={"full"}
                size={"lg"}
                fontWeight={"normal"}
                px={6}
                rightIcon={<ArrowForwardIcon h={4} w={4} color={"gray.500"} />}
                onClick={() => {
                  history.push("/login");
                }}
              >
                Get Started
              </Button>
            </Stack>
          </Stack>
          <Flex
            flex={1}
            justify={"center"}
            align={"center"}
            position={"relative"}
            w={"full"}
          >
            <Blob
              w={"150%"}
              h={"150%"}
              position={"absolute"}
              top={"-20%"}
              left={0}
              zIndex={1}
              color={useColorModeValue("teal.50", "teal.400")}
            />
            <Box
              zIndex={999}
              position={"relative"}
              height={"300px"}
              rounded={"3xl"}
              boxShadow={"2xl"}
              width={"90%"}
              overflow={"hidden"}
              _hover={{ boxShadow: "7xl" }}
            >
              <Image
                alt={"Hero Image"}
                fit={"cover"}
                align={"center"}
                w={"100%"}
                h={"100%"}
                src={
                  "https://image.freepik.com/free-vector/document-with-sales-schedule-statistics-rise-report-sheet-clipboard-with-work-done-page-list-profit-analysis-magnifier-check-mark-blue_249405-23.jpg"
                }
              />
            </Box>
          </Flex>
        </Stack>

        <Stack
          align={"center"}
          spacing={{ base: 8, md: 10 }}
          py={{ base: 20, md: 28 }}
          direction={{ base: "column", md: "row" }}
          borderRadius="3xl"
          bg="gray.100"
          p="4"
          shadow="2xl"
          mt="20"
        >
          <Flex
            flex={1}
            justify={"center"}
            align={"center"}
            position={"relative"}
            w={"full"}
          >
            <Blob
              w={"150%"}
              h={"150%"}
              position={"absolute"}
              top={"-20%"}
              left={0}
              zIndex={1}
              color={useColorModeValue("teal.50", "teal.400")}
            />
            <Box
              zIndex={999}
              position={"relative"}
              height={"300px"}
              rounded={"3xl"}
              boxShadow={"2xl"}
              width={"90%"}
              overflow={"hidden"}
              _hover={{ boxShadow: "7xl" }}
            >
              <Image
                alt={"Hero Image"}
                fit={"cover"}
                align={"center"}
                w={"100%"}
                h={"100%"}
                src={
                  "https://image.freepik.com/free-vector/digital-device-mockup-set_53876-89367.jpg"
                }
              />
            </Box>
          </Flex>
          <Stack flex={1} spacing={{ base: 5, md: 10 }}>
            <Heading
              lineHeight={1.1}
              fontWeight={600}
              fontSize={{ base: "3xl", sm: "4xl", lg: "6xl" }}
            >
              <Text
                as={"span"}
                position={"relative"}
                _after={{
                  content: "''",
                  width: "full",
                  height: "30%",
                  position: "absolute",
                  bottom: 1,
                  left: 0,
                  bg: "red.400",
                  zIndex: -1,
                }}
              >
                Mobile Responsive!
              </Text>
              <br />
            </Heading>
            <Text color={"gray.500"}>
              Snippy is a rich coding snippets app that lets you create your own
              code snippets, categorize them, and even sync them in the cloud so
              you can use them anywhere. All that is free!
            </Text>
            <Stack
              spacing={{ base: 4, sm: 6 }}
              direction={{ base: "column", sm: "row" }}
            >
              <Button
                rounded={"full"}
                size={"lg"}
                fontWeight={"normal"}
                px={6}
                rightIcon={<ArrowForwardIcon h={4} w={4} color={"gray.500"} />}
                onClick={() => {
                  history.push("/login");
                }}
              >
                Get Started
              </Button>
            </Stack>
          </Stack>
        </Stack>
        <Flex
          mt="10"
          bg="black"
          p="3"
          borderRadius="3xl"
          borderBottomRadius="0"
          shadow="dark-lg"
          justifyContent="center"
          zIndex="9999"
          direction="column"
          alignItems="center"
        >
          <GitHubButton
            href="https://github.com/DevelopersLeague/Brandlytics"
            data-size="large"
            data-show-count="true"
            aria-label="Star EverHustle on GitHub ❤"
            type="stargazers"
            className="px-4 mx-0"
          ></GitHubButton>
          <Text color="white" fontSize="2xl">
            Star Brandlytics on GitHub ❤
          </Text>
        </Flex>
      </Container>
    </>
  );
}

const PlayIcon = createIcon({
  displayName: "PlayIcon",
  viewBox: "0 0 58 58",
  d: "M28.9999 0.562988C13.3196 0.562988 0.562378 13.3202 0.562378 29.0005C0.562378 44.6808 13.3196 57.438 28.9999 57.438C44.6801 57.438 57.4374 44.6808 57.4374 29.0005C57.4374 13.3202 44.6801 0.562988 28.9999 0.562988ZM39.2223 30.272L23.5749 39.7247C23.3506 39.8591 23.0946 39.9314 22.8332 39.9342C22.5717 39.9369 22.3142 39.8701 22.0871 39.7406C21.86 39.611 21.6715 39.4234 21.5408 39.1969C21.4102 38.9705 21.3421 38.7133 21.3436 38.4519V19.5491C21.3421 19.2877 21.4102 19.0305 21.5408 18.8041C21.6715 18.5776 21.86 18.3899 22.0871 18.2604C22.3142 18.1308 22.5717 18.064 22.8332 18.0668C23.0946 18.0696 23.3506 18.1419 23.5749 18.2763L39.2223 27.729C39.4404 27.8619 39.6207 28.0486 39.7458 28.2713C39.8709 28.494 39.9366 28.7451 39.9366 29.0005C39.9366 29.2559 39.8709 29.507 39.7458 29.7297C39.6207 29.9523 39.4404 30.1391 39.2223 30.272Z",
});

export const Blob = (props) => {
  return (
    <Icon
      width={"100%"}
      viewBox="0 0 578 440"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M239.184 439.443c-55.13-5.419-110.241-21.365-151.074-58.767C42.307 338.722-7.478 282.729.938 221.217c8.433-61.644 78.896-91.048 126.871-130.712 34.337-28.388 70.198-51.348 112.004-66.78C282.34 8.024 325.382-3.369 370.518.904c54.019 5.115 112.774 10.886 150.881 49.482 39.916 40.427 49.421 100.753 53.385 157.402 4.13 59.015 11.255 128.44-30.444 170.44-41.383 41.683-111.6 19.106-169.213 30.663-46.68 9.364-88.56 35.21-135.943 30.551z"
        fill="currentColor"
      />
    </Icon>
  );
};

export default LandingPage;
