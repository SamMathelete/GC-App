import { FC } from "react";
import { Pressable, StyleSheet, Text } from "react-native";

interface Props {
  children: React.ReactNode;
  onPress: () => void;
}

const SideButton: FC<Props> = ({ children, onPress }) => {
  return (
    <Pressable style={styles.outerContainer} onPress={onPress}>
      <Text style={styles.buttonText}>{children}</Text>
    </Pressable>
  );
};

export default SideButton;

const styles = StyleSheet.create({
  outerContainer: {
    width: 275,
    height: 60,
    marginBottom: 20,
    borderColor: "white",
    borderWidth: 2,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 20,
    color: "white",
  },
});
