import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { FC, useRef, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import Carousel, { Pagination } from "react-native-snap-carousel";
import Card from "../components/UI/CarouselCard";
import { DUMMY_CAROUSEL_DATA } from "../data/carousel_data";

type RootParamsList = {
  HomeScreen: undefined;
};

type Props = BottomTabScreenProps<RootParamsList, "HomeScreen">;

const HomeScreen: FC<Props> = ({ navigation }) => {
  const [index, setIndex] = useState(0);
  const isCarousel = useRef<any>(null);

  const Dimensions = useWindowDimensions();
  const windowWidth = Dimensions.width;
  return (
    <ScrollView style={styles.rootContainer}>
      <View style={styles.cardContainer}>
        <Carousel
          layout="default"
          data={DUMMY_CAROUSEL_DATA}
          renderItem={Card}
          sliderWidth={windowWidth - 10}
          itemWidth={windowWidth + 10}
          inactiveSlideShift={0}
          useScrollView={true}
          vertical={false}
          ref={isCarousel}
          onSnapToItem={(index) => setIndex(index)}
        />
        <Pagination
          dotsLength={DUMMY_CAROUSEL_DATA.length}
          activeDotIndex={index}
          carouselRef={isCarousel}
          dotStyle={{
            width: 10,
            height: 10,
            borderRadius: 5,
            marginHorizontal: 0,
            backgroundColor: "rgba(0, 0, 0, 0.92)",
            marginVertical: 0,
          }}
          inactiveDotOpacity={0.4}
          inactiveDotScale={0.6}
          tappableDots={true}
        />
      </View>
      <View style={styles.mainScreen}>
        <Text>The Home Screen</Text>
      </View>
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
  cardContainer: {
    flex: 1,
    backgroundColor: "#fc4103",
    justifyContent: "center",
    alignItems: "center",
  },
  mainScreen: {},
});
