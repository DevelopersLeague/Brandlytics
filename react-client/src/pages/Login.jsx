import React from "react";
import { Container } from "@chakra-ui/react";
import { Flex, Spacer, Button } from "@chakra-ui/react";
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
} from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";
import { useState } from "react";
import { client } from "../apiclient";
import { useAuthStore } from "../stores";
import { useHistory } from "react-router-dom";

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
      history.push("/");
    } catch (err) {
      console.log(err);
      setIsAlert(true);
      setAlertValue(err.message);
      setIsLoading(false);
    }
  };

  return (
    <>
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
      <Container mt="32">
        <Flex
          direction="column"
          align="start"
          border="2px"
          borderColor="gray.500"
          p="10"
          borderRadius="2xl"
          as="form"
        >
          <FormControl id="username" mb="6">
            <FormLabel>UserName</FormLabel>
            <Input
              placeholder="UserName"
              onChange={(e) => {
                setUserName(e.target.value);
              }}
              value={userName}
            ></Input>
          </FormControl>
          <FormControl id="password" mb="6">
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              placeholder="Password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              value={password}
            ></Input>
          </FormControl>
          <Button
            type="submit"
            colorScheme="blue"
            isLoading={isLoading}
            onClick={handleLogin}
          >
            Submit
          </Button>
        </Flex>
      </Container>
    </>
  );
}

export default Login;
