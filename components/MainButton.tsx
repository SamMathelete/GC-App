import { FC } from "react";
import { Pressable, StyleSheet, Text } from "react-native";

interface Props {
  children: React.ReactNode;
  onPress: () => void;
  style?: {};
  styleText?: {};
}

const MainButton: FC<Props> = ({ children, onPress, style, styleText }) => {
  return (
    <Pressable style={[styles.outerContainer, style]} onPress={onPress}>
      <Text style={[styles.buttonText, styleText]}>{children}</Text>
    </Pressable>
  );
};

export default MainButton;

const styles = StyleSheet.create({
  outerContainer: {
    width: 275,
    height: 60,
    marginBottom: 20,
    backgroundColor: "white",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontWeight: "bold",
    fontSize: 20,
  },
});
