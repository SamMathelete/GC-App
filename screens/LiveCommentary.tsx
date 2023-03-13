import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { FC, useEffect, useState } from "react";
import Football from "../components/SportsUpdateCards/Football";
import Cricket from "../components/SportsUpdateCards/Cricket";
import Tennis from "../components/SportsUpdateCards/Tennis";
import TableTennis from "../components/SportsUpdateCards/TableTennis";
import Badminton from "../components/SportsUpdateCards/Badminton";
import Basketball from "../components/SportsUpdateCards/Basketball";
import Volleyball from "../components/SportsUpdateCards/Volleyball";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  View,
} from "react-native";
import { IconButton, TextInput } from "react-native-paper";
import { onSnapshot, doc, setDoc, Timestamp } from "firebase/firestore";
import { db } from "../firestoreConfig";
import { AuthContext } from "../store/google-auth";
import { useContext } from "react";
import { StyleSheet } from "react-native";

type RootParamList = {
  LiveCommentary: { event: any };
};

type Props = NativeStackScreenProps<RootParamList, "LiveCommentary">;

const LiveCommentary: FC<Props> = ({ route }) => {
  const event = route.params.event;
  const type = event.type;
  const { email } = useContext(AuthContext);

  const [comments, setComments] = useState<any[]>([]);
  const [commenter, setCommenter] = useState<string>("");

  let card;
  switch (type) {
    case "Football":
      card = (
        <Football
          key={event.id}
          matchName={event.matchName}
          team1={{
            teamName: event.team1,
            score: event.score1,
            penaltyScore: event.penaltyscore1,
            logo: event.team1Logo,
          }}
          team2={{
            teamName: event.team2,
            score: event.score2,
            penaltyScore: event.penaltyscore2,
            logo: event.team2Logo,
          }}
          isPenalty={event.isPenalty}
          time={event.matchTime}
          venue={event.venue}
        />
      );
      break;
    case "Cricket":
      card = (
        <Cricket
          key={event.id}
          matchName={event.matchName}
          team1={{
            teamName: event.team1,
            logo: event.team1Logo,
          }}
          team1Score={parseInt(event.score1)}
          team1Wickets={parseInt(event.wickets1)}
          team2={{
            teamName: event.team2,
            logo: event.team2Logo,
          }}
          team2Score={parseInt(event.score2)}
          team2Wickets={parseInt(event.wickets2)}
          venue={event.venue}
          striker={{
            playerName: event.striker,
            runs: parseInt(event.strikerScore),
            balls: parseInt(event.strikerBalls),
          }}
          nonStriker={{
            playerName: event.nonStriker,
            runs: parseInt(event.nonStrikerScore),
            balls: parseInt(event.nonStrikerBalls),
          }}
          bowler={{
            playerName: event.bowler,
            runs: parseInt(event.bowlerRuns),
            wickets: parseInt(event.bowlerWickets),
          }}
          overs={parseFloat(event.overs)}
          battingTeam={event.battingTeam}
        />
      );
      break;
    case "Tennis":
      card = (
        <Tennis
          key={event.id}
          matchName={event.matchName}
          team1={{
            teamName: event.team1,
            score: event.score1,
            setScore: event.setscore1,
            logo: event.team1Logo,
          }}
          team2={{
            teamName: event.team2,
            score: event.score2,
            setScore: event.setscore2,
            logo: event.team2Logo,
          }}
          time={event.matchTime}
          venue={event.venue}
        />
      );
      break;
    case "Table Tennis":
      card = (
        <TableTennis
          key={event.id}
          matchName={event.matchName}
          team1={{
            teamName: event.team1,
            score: event.score1,
            setScore: event.setscore1,
            logo: event.team1Logo,
          }}
          team2={{
            teamName: event.team2,
            score: event.score2,
            setScore: event.setscore2,
            logo: event.team2Logo,
          }}
          time={event.matchTime}
          venue={event.venue}
        />
      );
      break;
    case "Badminton":
      card = (
        <Badminton
          key={event.id}
          matchName={event.matchName}
          team1={{
            teamName: event.team1,
            score: event.score1,
            setScore: event.setscore1,
            logo: event.team1Logo,
          }}
          team2={{
            teamName: event.team2,
            score: event.score2,
            setScore: event.setscore2,
            logo: event.team2Logo,
          }}
          time={event.matchTime}
          venue={event.venue}
        />
      );
      break;
    case "Basketball":
      card = (
        <Basketball
          key={event.id}
          matchName={event.matchName}
          team1={{
            teamName: event.team1,
            score: event.score1,
            // penaltyScore: event.penaltyscore1,
            logo: event.team1Logo,
          }}
          team2={{
            teamName: event.team2,
            score: event.score2,
            // penaltyScore: event.penaltyscore2,
            logo: event.team2Logo,
          }}
          // isPenalty={event.isPenalty}
          time={event.matchTime}
          venue={event.venue}
        />
      );
      break;
    case "Volleyball":
      card = (
        <Volleyball
          key={event.id}
          matchName={event.matchName}
          team1={{
            teamName: event.team1,
            score: event.score1,
            // penaltyScore: event.penaltyscore1,
            logo: event.team1Logo,
          }}
          team2={{
            teamName: event.team2,
            score: event.score2,
            // penaltyScore: event.penaltyscore2,
            logo: event.team2Logo,
          }}
          // isPenalty={event.isPenalty}
          time={event.matchTime}
          venue={event.venue}
        />
      );
      break;
    default:
      card = (
        <View>
          <Text>Not Found</Text>
        </View>
      );
  }

  const sendHandler = async () => {
    const comment = {
      name: email,
      comment: commenter,
      timestamp: Date.now(),
    };
    setCommenter("");
    const docRef = doc(db, "sportsCommentary", event.id);
    await setDoc(docRef, { comments: [...comments, comment] });
  };

  useEffect(() => {
    const unsubscribe = onSnapshot(
      doc(db, "sportsCommentary", event.id),
      (doc) => {
        setComments(doc.data().comments ? doc.data().comments : []);
      }
    );
  }, []);

  comments.sort((a, b) => {
    return a.timestamp - b.timestamp > 0 ? -1 : 1;
  });

  return (
    <ScrollView>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.rootContainer}
      >
        {card}
        <View style={styles.commentsArea}>
          <View style={styles.commentControls}>
            <TextInput
              label="Comment"
              mode="outlined"
              multiline={true}
              numberOfLines={4}
              style={styles.commentInput}
              value={commenter}
              onChangeText={(text) => setCommenter(text)}
            />
            <IconButton
              icon="send"
              iconColor="white"
              size={30}
              style={styles.commentButton}
              onPress={sendHandler}
            />
          </View>
          <View style={styles.commentsBox}>
            {comments.map((comment, index) => (
              <View style={styles.commentCard} key={index}>
                <Text style={styles.commentName}>{comment.name}</Text>
                <Text style={styles.commentComment}>{comment.comment}</Text>
              </View>
            ))}
          </View>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default LiveCommentary;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: "white",
  },
  commentsArea: {
    flex: 1,
    backgroundColor: "white",
    padding: 10,
  },
  commentsBox: {
    flex: 1,
    backgroundColor: "white",
    padding: 10,
  },
  commentCard: {
    backgroundColor: "white",
    padding: 15,
    marginVertical: 5,
    borderRadius: 10,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  commentName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#3f51b5",
    marginBottom: 5,
  },
  commentComment: {
    fontSize: 14,
  },
  commentControls: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  commentInput: {
    flex: 1,
    marginRight: 10,
  },
  commentButton: {
    backgroundColor: "#3f51b5",
  },
});
