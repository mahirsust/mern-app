/* eslint-disable react/prop-types */
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import {
  Box,
  Text,
  Heading,
  HStack,
  IconButton,
  Image,
  useColorModeValue,
  useToast,
  Modal,
  useDisclosure,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalHeader,
  ModalBody,
  VStack,
  Input,
  ModalFooter,
  Button
} from "@chakra-ui/react";
import { useProductStore } from "../store/product";
import { useState } from "react";

const ProductCard = ({ product }) => {
  const [updatedProduct, setUpdatedProduct] = useState(product);
  const textColor = useColorModeValue("gray.600", "gray.200");
  const bg = useColorModeValue("white", "gray.800");

  const { deleteProduct, updateProduct } = useProductStore();
  const toast = useToast();

  const { isOpen: isEditOpen, onOpen: onEditOpen, onClose: onEditClose } = useDisclosure();
  const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure();

  const handleDeleteProduct = async () => {
    const { success, message } = await deleteProduct(product._id);
    toast({
      title: success ? "Success" : "Error",
      description: message,
      status: success ? "success" : "error",
      duration: 1000,
      isClosable: true,
    });
    onDeleteClose(); // Close the delete confirmation modal
  };

  const handleUpdateProduct = async () => {
    const { success, message } = await updateProduct(product._id, updatedProduct);
    onEditClose(); // Close the edit modal
    toast({
      title: success ? "Success" : "Error",
      description: message,
      status: success ? "success" : "error",
      duration: 1000,
      isClosable: true,
    });
  };

  return (
    <Box
      shadow={"lg"}
      rounded={"lg"}
      overflow={"hidden"}
      transition={"all 0.3s"}
      _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
      bg={bg}
    >
      <Image src={product.image} alt={product.name} h={48} w={"full"} objectFit={"cover"} />

      <Box p={4}>
        <Heading as={"h3"} size={"md"} mb={2}>
          {product.name}
        </Heading>

        <Text fontSize={"xl"} fontWeight={"bold"} color={textColor} mb={4}>
          ${product.price}
        </Text>

        <HStack spacing={2}>
          <IconButton icon={<EditIcon />} onClick={onEditOpen} colorScheme="blue" />
          <IconButton icon={<DeleteIcon />} onClick={onDeleteOpen} colorScheme="red" />
        </HStack>
      </Box>

      {/* Edit Modal */}
      <Modal isOpen={isEditOpen} onClose={onEditClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update a Product</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4} align={"stretch"}>
              <VStack spacing={2} align="start">
                <Text color={useColorModeValue("black", "white")} fontWeight={"bold"} fontSize={"md"}>
                  Product Name:
                </Text>
                <Input
                  placeholder="Product Name"
                  name="name"
                  value={updatedProduct.name}
                  onChange={(e) => setUpdatedProduct({ ...updatedProduct, name: e.target.value })}
                />
              </VStack>
              <VStack spacing={2} align="start">
                <Text color={useColorModeValue("black", "white")} fontWeight={"bold"} fontSize={"md"}>
                  Product Price:
                </Text>
                <Input
                  placeholder="Product Price"
                  name="price"
                  type='number'
                  value={updatedProduct.price}
                  onChange={(e) => setUpdatedProduct({ ...updatedProduct, price: e.target.value })}
                />
              </VStack>

              <VStack spacing={2} align="start">
                <Text color={useColorModeValue("black", "white")} fontWeight={"bold"} fontSize={"md"}>
                  Product Image URL:
                </Text>
                <Input
                  placeholder="Product Image URL"
                  name="image"
                  value={updatedProduct.image}
                  onChange={(e) => setUpdatedProduct({ ...updatedProduct, image: e.target.value })}
                />
              </VStack>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleUpdateProduct}>
              Update
            </Button>
            <Button variant="ghost" onClick={onEditClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal isOpen={isDeleteOpen} onClose={onDeleteClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirm Deletion</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Are you sure you want to delete “{product.name}”?</Text>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={handleDeleteProduct}>
              Yes, Delete
            </Button>
            <Button variant="ghost" onClick={onDeleteClose}>
              No, Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ProductCard;
