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

function Signup() {
  const [userName, setUserName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [isAlert, setIsAlert] = useState(false);
  const [alertValue, setAlertValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const setUser = useAuthStore((store) => store.setUser);
  const history = useHistory();

  const handleSignup = async () => {
    setIsLoading(true);
    try {
      const user = await client.signup({
        username: userName,
        password: password,
        firstname: firstName,
        lastname: lastName,
      });
      setUser(user);
      setUserName("");
      setFirstName("");
      setLastName("");
      setPassword("");
      setIsLoading(false);
      history.push("/");
    } catch (err) {
      console.log(err);
      setAlertValue(err.message);
      setIsLoading(false);
    }
  };

  return (
    <Container mt="32">
      {isAlert && (
        <Alert status="error">
          <AlertIcon />
          <AlertTitle mr={2}>{alertValue}</AlertTitle>
          <CloseButton position="absolute" right="8px" top="8px" />
        </Alert>
      )}
      <Flex
        direction="column"
        align="start"
        border="2px"
        borderColor="gray.500"
        p="10"
        borderRadius="2xl"
      >
        <FormControl id="firstname" mb="6">
          <FormLabel>First Name</FormLabel>
          <Input
            placeholder="First Name"
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
            value={firstName}
          ></Input>
        </FormControl>
        <FormControl id="lastname" mb="6">
          <FormLabel>Last Name</FormLabel>
          <Input
            placeholder="Last Name"
            onChange={(e) => {
              setLastName(e.target.value);
            }}
            value={lastName}
          ></Input>
        </FormControl>
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
        <Button colorScheme="blue" isLoading={isLoading} onClick={handleSignup}>
          Submit
        </Button>
      </Flex>
    </Container>
  );
}

export default Signup;
