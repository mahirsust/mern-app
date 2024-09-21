import { Box, Heading, Input, VStack, HStack, useColorModeValue, Button, Container, useToast, Text } from "@chakra-ui/react";
import { useState } from "react";
import { useProductStore } from "../store/product";
import { Link } from "react-router-dom";

const CreatePage = () => {

  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: "",
  });

  const toast = useToast();
  const {createProduct} = useProductStore();

  const handleAddProduct = async() => {
    const {success, message} = await createProduct(newProduct);
    if(!success) {
      toast({
        title: "Error",
        description: message,
        status: "error",
        isClosable: true
      });
    } else {
      toast({
        title: "Success",
        description: message,
        status: "success",
        isClosable: true
      });
    }
    setNewProduct({name: "", price: "", image: ""});
  };

  return <Container maxW={"container.sm"}>
      <VStack 
        spacing={8}
      >
        
        <Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8}>
          Create New Product
        </Heading>

        <Box 
          w={"full"} bg={useColorModeValue("white", "gray.800")} 
          p={6} rounded={"lg"} shadow={"md"}
        >
          <VStack spacing={4} align="stretch">
            
            <VStack spacing={2} align="start">
              <Text color={useColorModeValue("black", "white")} fontWeight={"bold"} fontSize={"md"}>
                Product Name:
              </Text>
              
              <Input
                placeholder="Product Name"
                name="name"
                value={newProduct.name}
                onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
              />
            </VStack>
            <VStack spacing={2} align="start">
              <Text color={useColorModeValue("black", "white")} fontWeight={"bold"} fontSize={"md"}>
                Product Price:
              </Text>
              <Input
                placeholder="Product Price"
                name="price"
                value={newProduct.price}
                onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
              />
            </VStack>
            <VStack spacing={2} align="start">
              <Text color={useColorModeValue("black", "white")} fontWeight={"bold"} fontSize={"md"}>
                Product Image URL:
              </Text>
              <Input
                placeholder="Product Image URL"
                name="image"
                value={newProduct.image}
                onChange={(e) => setNewProduct({...newProduct, image: e.target.value})}
              />
            </VStack>

            <HStack spacing={4}>
              <Button
                colorScheme="blue"
                onClick={handleAddProduct} w={"full"}>
                Add Product
              </Button>
              <Link to={"/"}>
                <Button colorScheme="gray" w={"full"}>
                  Cancel
                </Button>
              </Link>
            </HStack>
          </VStack>
        </Box> 
      </VStack>
    </Container>;
};

export default CreatePage;