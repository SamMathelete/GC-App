import { FC } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

interface Props {
  children: React.ReactNode;
  onPress: () => void;
}

const MainButton: FC<Props> = ({ children, onPress }) => {
  return (
    <View style={styles.outerContainer}>
      <Pressable onPress={onPress}>
        <View>
          <Text style={styles.buttonText}>{children}</Text>
        </View>
      </Pressable>
    </View>
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
