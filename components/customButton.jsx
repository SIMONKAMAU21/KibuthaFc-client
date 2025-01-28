import { Text } from "react-native";
import React from "react";
import { Button } from "react-native-paper";

const CustomButton = ({
  title,
  handlePress,
  isLoading,
  containerStyles,
  textStyles,
  disabled
}) => {
  return (
   <>
    <Button
    mode="outlined"
    style={{ width: "100%", ...containerStyles }}
    onPress={handlePress}
    activeOpacity={0.7}
    disabled={disabled}
    loading={isLoading}
    >
      <Text className={`${textStyles}`}>{title}</Text>
    </Button>
    </>
    
  );
};

export default CustomButton;