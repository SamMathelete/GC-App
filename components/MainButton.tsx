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
          <Text>{children}</Text>
        </View>
      </Pressable>
    </View>
  );
};

export default MainButton;

const styles = StyleSheet.create({
  outerContainer: {
    width: 250,
    height: 50,
    marginBottom: 100,
    backgroundColor: "white",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
});
