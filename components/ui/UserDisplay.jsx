import React from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { router } from 'expo-router';
import placeholder from '../../assets/icons/placeholder.jpg'

const UserDisplay = ({ data }) => {

    const userDetailes = (user) => {
        router.push({
          pathname: 'userDetails',
          params: { user: JSON.stringify(user) },
        });
      };
      console.log('data', data)
  return (
    <View>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <TouchableOpacity
            key={item._id}
            style={styles.updateCard}
            onPress={() => userDetailes(item)}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={styles.updateText}>{item.name}</Text>
              <Image
                source={{ uri: item.photo || item.photoUrl || "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541"}}
                style={{
                  width: 40,
                  height: 40,
                  borderWidth: 1,
                  borderRadius: 20,
                }}
              />
            </View>
            <Text style={styles.updateText}>{item.email}</Text>
            <Text style={styles.updateText}>{item.phone}</Text>
            <Text style={styles.updateText}>{item.role}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item._id}
      />
    </View>
  );
};

export default UserDisplay;

const styles = StyleSheet.create({
  updateCard: {
    backgroundColor: '#000',
    padding: 10,
    margin: 10,
    borderRadius: 10,
  },
  updateText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
