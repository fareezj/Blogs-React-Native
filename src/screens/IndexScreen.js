import React, { useContext, useEffect } from "react";
import {
 View,
 Text,
 StyleSheet,
 FlatList,
 Button,
 TouchableOpacity,
} from "react-native";
import { Context } from "../context/BlogContext";
import { Feather } from "@expo/vector-icons";

const IndexScreen = ({ navigation }) => {
 const { state, deleteBlogPost, getBlogPosts } = useContext(Context);

 useEffect(() => {
  getBlogPosts();

  const listener = navigation.addListener("didFocus", () => {
   getBlogPosts();
  });

  return () => {
   listener.remove();
  };
 }, []);

 return (
  <View>
   <Text>Index hello Screen</Text>
   <FlatList
    data={state}
    keyExtractor={(blogPost) => blogPost.title}
    renderItem={({ item }) => {
     return (
      <TouchableOpacity
       onPress={() => navigation.navigate("Show", { id: item.id })}
      >
       <View style={styles.row}>
        <Text>Feature A Cherry Picked</Text>
        <Text style={styles.title}>
         {item.title} - {item.id}
        </Text>
        <TouchableOpacity onPress={() => deleteBlogPost(item.id)}>
         <Feather style={styles.icon} name="trash" />
        </TouchableOpacity>
       </View>
      </TouchableOpacity>
     );
    }}
   />
  </View>
 );
};

IndexScreen.navigationOptions = ({ navigation }) => {
 return {
  headerRight: () => (
   <TouchableOpacity onPress={() => navigation.navigate("Create")}>
    <Feather name="plus" size={30} />
   </TouchableOpacity>
  ),
 };
};

const styles = StyleSheet.create({
 row: {
  flexDirection: "row",
  justifyContent: "space-between",
  paddingVertical: 20,
  borderWidth: 1,
  borderColor: "gray",
  marginVertical: 5,
  paddingHorizontal: 10,
 },
 title: {
  fontSize: 18,
 },
 icon: {
  fontSize: 23,
 },
});

export default IndexScreen;
