import React from "react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  CloseButton,
  Center,
  ArrowForwardIcon,
} from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";
import { useState } from "react";
import { client } from "../apiclient";
import { useAuthStore } from "../stores";
import { useHistory } from "react-router-dom";
import {
  Container,
  Stack,
  Flex,
  Box,
  Heading,
  Text,
  Button,
  ButtonGroup,
  Image,
  Icon,
  IconButton,
  createIcon,
  IconProps,
  useColorModeValue,
} from "@chakra-ui/react";

function Login() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [isAlert, setIsAlert] = useState(false);
  const [alertValue, setAlertValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const setUser = useAuthStore((store) => store.setUser);
  const history = useHistory();
  console.log("login rendered");

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const user = await client.login({
        username: userName,
        password: password,
      });
      setUser(user);
      setUserName("");
      setPassword("");
      setIsLoading(false);
      history.push("/search");
    } catch (err) {
      console.log(err);
      setIsAlert(true);
      setAlertValue(err.message);
      setIsLoading(false);
    }
  };

  return (
    <>
      <Container
        maxW={"7xl"}
        boxShadow="2xl"
        p="7"
        borderRadius="3xl"
        bg="#f6f7fb"
        mt="8"
      >
        <Stack
          align={"center"}
          spacing={{ base: 8, md: 10 }}
          py={{ base: 20, md: 1 }}
          direction={{ base: "column", md: "row" }}
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
                Login,
              </Text>
              <br />
              <Text as={"span"} color={"red.400"}>
                Analyze!
              </Text>
            </Heading>
            <Text color={"gray.500"}>
              Brandlytics is a tweets based sentimental analysis app that lets
              you analyze, filter, visualize results from the daily trends. All
              that is free!
            </Text>
            <Stack
              spacing={{ base: 4, sm: 6 }}
              direction={{ base: "column", sm: "row" }}
            >
              <Text color={"gray.500"} fontSize="2xl" mt="2">
                Dont Have An Account?
              </Text>
              <Button
                rounded={"full"}
                size={"lg"}
                fontWeight={"normal"}
                px={6}
                colorScheme={"red"}
                bg={"red.400"}
                _hover={{ bg: "red.500" }}
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
            direction="column"
            borderRadius="2xl"
            as="form"
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
              position={"relative"}
              rounded={"2xl"}
              boxShadow={"2xl"}
              width={"xl"}
              overflow={"hidden"}
              p="10"
              m="20"
              zIndex={999}
              bg="#fefeff"
            >
              {isAlert && (
                <Alert status="error">
                  <AlertIcon />
                  <AlertTitle mr={2}>{alertValue}</AlertTitle>
                  <CloseButton
                    position="absolute"
                    right="8px"
                    top="8px"
                    onClick={() => {
                      setIsAlert(false);
                    }}
                  />
                </Alert>
              )}
              <FormControl id="username" mb="6">
                <FormLabel fontSize="3xl">Username</FormLabel>
                <Input
                  fontSize="xl"
                  placeholder="Enter Your Username"
                  onChange={(e) => {
                    setUserName(e.target.value);
                  }}
                  value={userName}
                  p="7"
                ></Input>
              </FormControl>
              <FormControl id="password" mb="6">
                <FormLabel fontSize="3xl">Password</FormLabel>
                <Input
                  p="7"
                  fontSize="xl"
                  type="password"
                  placeholder="Enter Your Password"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  value={password}
                ></Input>
              </FormControl>
              <Button
                type="submit"
                colorScheme="red"
                isLoading={isLoading}
                onClick={handleLogin}
                width={"full"}
              >
                Submit
              </Button>
            </Box>
          </Flex>
        </Stack>
      </Container>
    </>
  );
}

export default Login;

export const Blob = (props: IconProps) => {
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
