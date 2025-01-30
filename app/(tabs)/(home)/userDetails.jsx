import React, { useState } from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Toast from 'react-native-toast-message';
import { router, useLocalSearchParams } from 'expo-router';
import CustomButton from '../../../components/customButton';
import Inputs from '../../../components/customInput';
import { useUpdateUser } from '../../(auth)/data';
import { Dropdown } from '../../../components/dropDown';

const UserDetails = () => {
  const { user } = useLocalSearchParams();
  const parsedUser = user ? JSON.parse(user) : {};

  const [formData, setFormData] = useState({
    name: parsedUser?.name,
    id: parsedUser?._id, // Ensure ID is included
    email: parsedUser?.email,
    phone: parsedUser?.phone,
    role: parsedUser?.role,
  });
  const updateUserMutation = useUpdateUser()

  const handleUpdate = () => {
    updateUserMutation.mutate(formData, {
      onSuccess: (data) => {
        console.log("user updated succefully", data)
        setFormData((prev) => ({
          ...prev,
          ...data
        }))
        Toast.show({
          type: "success",
          text1: "success",
          text2: data.message || "user updated"
        })
        router.push('/(home)')
      },
      onError: (error) => {
        console.log("error", error)
      }
    })
    console.log('Updated User:', formData);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <Image
          source={{ uri: parsedUser?.photoUrl }}
          style={styles.profileImage}
        />
        <Text style={styles.title}>Update User Details</Text>
        {/* <Text style={styles.title}>{formData?.id}</Text> */}

        <Inputs
          // style={styles.input}
          value={formData.name}
          onChangeText={(text) => setFormData({ ...formData, name: text })}
          placeholder="Name"
        />
        <Inputs
          // style={styles.input}
          value={formData.email}
          onChangeText={(text) => setFormData({ ...formData, email: text })}
          placeholder="Email"
          keyboardType="email-address"
        />
        <Inputs
          // style={styles.input}
          value={formData.phone}
          onChangeText={(text) => setFormData({ ...formData, phone: text })}
          placeholder="Phone"
          keyboardType="phone-pad"
        />
        {/* <Inputs
          // style={styles.input}
          value={formData.role}
          onChangeText={(text) => setFormData({ ...formData, role: text })}
          placeholder="Role"
        /> */}
        <Dropdown
          label=""
          name="Role"
          options={[
            { label: 'Admin', value: "admin" },
            { label: 'Prayer', value: "prayer" },
            { label: 'Fun', value: "fun" }
          ]}
          width="100%"
          placeholder="Select Role"
          onValueChange={(option) => setFormData({ ...formData, role:option?.value })} // ✅ Update role state
          containerStyle={{
            backgroundColor: "#202C33",
            width: "100%",
            position: "absolute",
            borderWidth: 1,
            borderColor: "red",
            color: "white",
          }}
        />
        <CustomButton containerStyles={{ marginTop: 10 }}
          title="Update User" handlePress={handleUpdate} />
      </View>
    </SafeAreaView>
  );
};

export default UserDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#1c1a18',
  },
  card: {
    backgroundColor: '#000',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignSelf: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: "white"
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    marginVertical: 10,
  },
});
