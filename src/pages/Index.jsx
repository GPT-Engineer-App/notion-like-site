import React, { useState } from "react";
import { Box, Button, Input, Textarea, VStack, Image, useToast, IconButton, Flex, Text } from "@chakra-ui/react";
import { FaPlus, FaImage, FaPaperPlane } from "react-icons/fa";

const Index = () => {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [image, setImage] = useState(null);
  const toast = useToast();

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleAddComment = () => {
    if (comment.trim() === "") {
      toast({
        title: "Error",
        description: "Comment can't be empty",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    setComments([...comments, { text: comment, img: image }]);
    setComment("");
    setImage(null);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <VStack spacing={4} p={5}>
      <Box w="100%" p={4} borderWidth="1px" borderRadius="lg">
        <Textarea placeholder="Write a comment..." value={comment} onChange={handleCommentChange} />
        {image && <Image src={image} alt="Uploaded image" boxSize="100px" objectFit="cover" />}
        <Flex justify="space-between" align="center" mt={2}>
          <IconButton icon={<FaImage />} onClick={() => document.getElementById("file-upload").click()} aria-label="Upload image" />
          <Input id="file-upload" type="file" accept="image/*" onChange={handleImageUpload} hidden />
          <Button rightIcon={<FaPaperPlane />} colorScheme="blue" onClick={handleAddComment}>
            Comment
          </Button>
        </Flex>
      </Box>
      <VStack spacing={4} align="stretch" w="100%">
        {comments.map((comment, index) => (
          <Box key={index} p={4} borderWidth="1px" borderRadius="lg">
            <Text>{comment.text}</Text>
            {comment.img && <Image src={comment.img} alt="Comment image" boxSize="100px" objectFit="cover" />}
          </Box>
        ))}
      </VStack>
    </VStack>
  );
};

export default Index;
