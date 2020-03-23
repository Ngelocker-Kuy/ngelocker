import React from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  Button,
  FlatList
} from "react-native";

const DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "First Item"
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "Second Item"
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "Third Item"
  }
];

function DummyList() {
  const arr = [];

  for (let i = 0; i < 30; i++) {
    arr.push({
      id: i,
      text: `Text ${i}`
    });
  }

  return arr;
}

function Item({ title }) {
  return (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

function ListRequestScreen({ navigation }) {
  // return (
  //   <View style={styles.container}>
  //     {/* {DummyList().map(item => (
  //       <FlatList style={styles.item} key={item.id}>
  //         <Text style={{ fontSize: 32 }}>{item.text} asdf</Text>
  //       </FlatList>
  //     ))} */}
  //     {/* <Button
  //       onPress={() => navigation.navigate("guest")}
  //       title="Go to notifications"
  //     /> */}
  //   </View>
  // );

  return (
    <SafeAreaView style={styles.container}>
      <View style={{...styles.container, alignItems: "center"}}>
        <Text style={styles.logo}>Request</Text>
      </View>
      <FlatList
        data={DummyList()}
        renderItem={({ item }) => <Item title={item.text} />}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#003f5c",
    justifyContent: "center"
  },
  logo: {
    fontWeight: "bold",
    fontSize: 50,
    color: "#fb5b5a",
    marginBottom: 40
  },
  item: {
    backgroundColor: "#f12711",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16
  },
  title: {
    fontSize: 32,
    color: "snow"
  }
});

export default ListRequestScreen;
