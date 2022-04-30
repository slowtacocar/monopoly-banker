import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Pusher from "pusher-js/react-native";
import bent from "bent";
import nacl from "tweetnacl";

const { publicKey, secretKey } = nacl.sign.keyPair();

const pusher = new Pusher("60c1a31d88a4027bb74e", {
  cluster: "mt1",
  authorizer(channel) {
    return {
      authorize(socketId, callback) {
        bent("json", "POST")(
          "https://monopoly-banker.vercel.app/api/pusher/auth",
          {
            socket_id: socketId,
            channel_name: channel.name,
            publicKey,
          }
        )
          .then((data) => {
            callback(null, data);
          })
          .catch((err) => {
            callback(err, {
              auth: "",
            });
          });
      },
    };
  },
});

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
